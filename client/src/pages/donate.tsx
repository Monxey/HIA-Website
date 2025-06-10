import { useState, useEffect } from "react";
import { useElements, useStripe, CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Heart, Utensils, BookOpen, Home, Shield } from "lucide-react";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY || ""
);

const DonationForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  
  const [selectedAmount, setSelectedAmount] = useState<number>(25);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donationType, setDonationType] = useState<string>("one-time");
  const [clientSecret, setClientSecret] = useState<string>("");
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: ""
  });

  const presetAmounts = [
    { amount: 25, description: "5 meals" },
    { amount: 50, description: "10 meals" },
    { amount: 100, description: "20 meals" },
    { amount: 250, description: "50 meals" },
  ];

  const createPaymentIntent = useMutation({
    mutationFn: (data: { amount: number; donorEmail?: string; donorName?: string; isRecurring: boolean }) =>
      apiRequest("POST", "/api/create-payment-intent", data),
    onSuccess: (response) => {
      response.json().then((data) => {
        setClientSecret(data.clientSecret);
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to initialize payment",
        variant: "destructive",
      });
    },
  });

  const handleAmountSelection = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      setSelectedAmount(numValue);
    }
  };

  const initializePayment = () => {
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
    if (amount < 0.5) {
      toast({
        title: "Invalid Amount",
        description: "Minimum donation amount is $0.50",
        variant: "destructive",
      });
      return;
    }

    createPaymentIntent.mutate({
      amount,
      donorEmail: donorInfo.email,
      donorName: donorInfo.name,
      isRecurring: donationType === "monthly"
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      if (!clientSecret) {
        initializePayment();
      }
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: donorInfo.name,
          email: donorInfo.email,
        },
      },
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Thank You!",
        description: "Your donation has been processed successfully.",
      });
      
      // Record the donation
      apiRequest("POST", "/api/donation-success", {
        paymentIntentId: clientSecret.split("_secret")[0],
        amount: customAmount ? parseFloat(customAmount) : selectedAmount,
        donorEmail: donorInfo.email,
        donorName: donorInfo.name,
        isRecurring: donationType === "monthly"
      });

      // Reset form
      setClientSecret("");
      setDonorInfo({ name: "", email: "" });
      setSelectedAmount(25);
      setCustomAmount("");
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">
          Choose Your Donation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Donor Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="donor-name">Full Name (Optional)</Label>
              <Input
                id="donor-name"
                value={donorInfo.name}
                onChange={(e) => setDonorInfo(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Your name"
              />
            </div>
            <div>
              <Label htmlFor="donor-email">Email (Optional)</Label>
              <Input
                id="donor-email"
                type="email"
                value={donorInfo.email}
                onChange={(e) => setDonorInfo(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          {/* Preset Amounts */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Select Amount
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {presetAmounts.map((preset) => (
                <Button
                  key={preset.amount}
                  type="button"
                  variant="outline"
                  className={`p-4 h-auto ${
                    selectedAmount === preset.amount && !customAmount
                      ? "border-brand-red bg-red-50"
                      : "border-gray-300 hover:border-brand-red hover:bg-red-50"
                  }`}
                  onClick={() => handleAmountSelection(preset.amount)}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold">${preset.amount}</div>
                    <div className="text-sm text-gray-600">{preset.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div>
            <Label htmlFor="custom-amount" className="text-sm font-medium text-gray-700 mb-2 block">
              Custom Amount
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <Input
                id="custom-amount"
                type="number"
                step="0.01"
                min="0.50"
                placeholder="0.00"
                className="pl-8"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
              />
            </div>
          </div>

          {/* Donation Type */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Donation Type
            </Label>
            <RadioGroup value={donationType} onValueChange={setDonationType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="one-time" id="one-time" />
                <Label htmlFor="one-time">One-time donation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly">Monthly recurring</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Payment Element */}
          {clientSecret && (
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                Payment Information
              </Label>
              <div className="border border-gray-300 rounded-lg p-4">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-brand-red hover:bg-red-700 text-white py-4"
            disabled={createPaymentIntent.isPending || (!stripe && !!clientSecret)}
          >
            <Shield className="h-5 w-5 mr-2" />
            {!clientSecret 
              ? "Continue to Payment" 
              : createPaymentIntent.isPending 
                ? "Processing..." 
                : "Complete Donation"
            }
          </Button>

          <p className="text-xs text-gray-500 text-center">
            <Shield className="h-4 w-4 mr-1 inline" />
            Secure payment powered by Stripe. Your information is protected.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default function Donate() {
  const { data: donationStats } = useQuery({
    queryKey: ["/api/donation-stats"],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const currentProgress = donationStats ? Math.min((donationStats.totalAmount / 5000) * 100, 100) : 65;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-red to-red-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Make a Difference Today</h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            Your donation directly supports UMD students facing food and material insecurity. 
            Every dollar makes a real impact.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Donation Form */}
            <Elements stripe={stripePromise}>
              <DonationForm />
            </Elements>

            {/* Impact Information */}
            <div className="space-y-8">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Your Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center mr-4">
                      <Utensils className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">$25 provides</div>
                      <div className="text-gray-600">5 nutritious meals for students</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center mr-4">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">$50 provides</div>
                      <div className="text-gray-600">Essential school supplies for one semester</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center mr-4">
                      <Home className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">$100 provides</div>
                      <div className="text-gray-600">Winter clothing package for one student</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progress Tracker */}
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <div className="text-sm text-gray-600 mb-2">This month's goal</div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">
                      ${donationStats?.totalAmount?.toFixed(2) || "3,240"} raised
                    </span>
                    <span className="text-gray-600">of $5,000</span>
                  </div>
                  <Progress value={currentProgress} className="mb-2" />
                  <div className="text-xs text-gray-500">
                    {Math.floor((donationStats?.totalAmount || 3240) / 5)} meals provided this month
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
