import { users, contacts, donations, type User, type InsertUser, type Contact, type InsertContact, type Donation, type InsertDonation } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  createDonation(donation: InsertDonation): Promise<Donation>;
  getDonations(): Promise<Donation[]>;
  getTotalDonations(): Promise<number>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, Contact>;
  private donations: Map<number, Donation>;
  private currentUserId: number;
  private currentContactId: number;
  private currentDonationId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.donations = new Map();
    this.currentUserId = 1;
    this.currentContactId = 1;
    this.currentDonationId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { 
      ...insertContact, 
      id,
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async createDonation(insertDonation: InsertDonation): Promise<Donation> {
    const id = this.currentDonationId++;
    const donation: Donation = {
      id,
      amount: insertDonation.amount,
      donorEmail: insertDonation.donorEmail ?? null,
      donorName: insertDonation.donorName ?? null,
      stripePaymentIntentId: insertDonation.stripePaymentIntentId,
      isRecurring: insertDonation.isRecurring ?? false,
      createdAt: new Date()
    };
    this.donations.set(id, donation);
    return donation;
  }

  async getDonations(): Promise<Donation[]> {
    return Array.from(this.donations.values());
  }

  async getTotalDonations(): Promise<number> {
    const donations = Array.from(this.donations.values());
    return donations.reduce((total, donation) => total + donation.amount, 0);
  }
}

export const storage = new MemStorage();
