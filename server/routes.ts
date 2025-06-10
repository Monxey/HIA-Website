import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import OpenAI from "openai";
import { storage } from "./storage";
import { insertContactSchema, insertDonationSchema } from "@shared/schema";
import { z } from "zod";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing required OpenAI API key: OPENAI_API_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-11-20.acacia",
});

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ success: true, contact });
    } catch (error: any) {
      res.status(400).json({ 
        message: "Error submitting contact form: " + error.message 
      });
    }
  });

  // Get contact submissions (admin use)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error: any) {
      res.status(500).json({ 
        message: "Error fetching contacts: " + error.message 
      });
    }
  });

  // Create payment intent for donations
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, donorEmail, donorName, isRecurring } = req.body;
      
      if (!amount || amount < 50) { // Minimum $0.50
        return res.status(400).json({ 
          message: "Donation amount must be at least $0.50" 
        });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        metadata: {
          donorEmail: donorEmail || '',
          donorName: donorName || '',
          isRecurring: isRecurring ? 'true' : 'false'
        }
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res.status(500).json({ 
        message: "Error creating payment intent: " + error.message 
      });
    }
  });

  // Handle successful donation webhook (for production)
  app.post("/api/donation-success", async (req, res) => {
    try {
      const { paymentIntentId, amount, donorEmail, donorName, isRecurring } = req.body;
      
      const donation = await storage.createDonation({
        amount: Math.round(amount * 100),
        donorEmail,
        donorName,
        stripePaymentIntentId: paymentIntentId,
        isRecurring: isRecurring || false
      });

      res.json({ success: true, donation });
    } catch (error: any) {
      res.status(500).json({ 
        message: "Error recording donation: " + error.message 
      });
    }
  });

  // Get donation statistics
  app.get("/api/donation-stats", async (req, res) => {
    try {
      const donations = await storage.getDonations();
      const totalAmount = await storage.getTotalDonations();
      
      res.json({
        totalDonations: donations.length,
        totalAmount: totalAmount / 100, // Convert back to dollars
        recentDonations: donations.slice(-10)
      });
    } catch (error: any) {
      res.status(500).json({ 
        message: "Error fetching donation stats: " + error.message 
      });
    }
  });

  // AI Census Assistant endpoint
  app.post("/api/ai-census", async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ 
          message: "Message is required" 
        });
      }

      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are a Census Data Assistant specializing in food and material insecurity data across the United States. 

Your role is to provide accurate, up-to-date information about:
- Food insecurity rates by geographic location (state, county, city)
- SNAP (food stamps) participation rates
- Material insecurity indicators (housing, utilities, transportation)
- Demographics most affected by food insecurity
- College student hunger statistics
- Underserved community identification
- Poverty rates and economic indicators related to food access

Always cite data sources when possible (USDA, Census Bureau, Bureau of Labor Statistics, etc.) and provide specific numbers with context. If you don't have current data for a specific location, explain what general trends exist and suggest where to find more recent local data.

Keep responses informative but concise, focusing on actionable data that could help identify areas needing assistance.`
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      });

      const aiResponse = response.choices[0].message.content;
      
      res.json({ 
        response: aiResponse,
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      res.status(500).json({ 
        message: "Error processing AI request: " + error.message 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
