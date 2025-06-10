import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Heart, Utensils, BookOpen, Home, Shield } from "lucide-react";

// TODO: Add Stripe integration here
// Import the following when ready:
// import { useElements, useStripe, CardElement, Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { useMutation } from "@tanstack/react-query";
// import { useToast } from "@/hooks/use-toast";
// import { apiRequest } from "@/lib/queryClient";
// 
// const stripePromise = loadStripe("your-stripe-public-key");

const DonationForm = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(25);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donationType, setDonationType] = useState<string>("one-time");
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

  const handleDonateClick = () => {
    // TODO: Add payment processing logic here
    // This is where you'll integrate your payment provider
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
    console.log("Processing donation:", {
      amount,
      type: donationType,
      donor: donorInfo
    });
    alert("Payment integration coming soon!");
  };

  const displayAmount = customAmount ? parseFloat(customAmount) : selectedAmount;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Make a Donation</h2>
        <p className="text-muted-foreground">
          Every dollar helps us provide meals and support to those in need
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Choose Your Impact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Preset Amounts */}
          <div className="grid grid-cols-2 gap-4">
            {presetAmounts.map((preset) => (
              <Button
                key={preset.amount}
                variant={selectedAmount === preset.amount && !customAmount ? "default" : "outline"}
                onClick={() => handleAmountSelection(preset.amount)}
                className="h-auto p-4 flex flex-col items-center"
              >
                <span className="text-lg font-semibold">${preset.amount}</span>
                <span className="text-sm text-muted-foreground">{preset.description}</span>
              </Button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="space-y-2">
            <Label htmlFor="custom-amount">Or enter a custom amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="custom-amount"
                type="number"
                placeholder="0.00"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                className="pl-8"
                min="0.50"
                step="0.01"
              />
            </div>
          </div>

          {/* Donation Type */}
          <div className="space-y-3">
            <Label>Donation Type</Label>
            <RadioGroup value={donationType} onValueChange={setDonationType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="one-time" id="one-time" />
                <Label htmlFor="one-time">One-time donation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly">Monthly donation</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Donor Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Donor Information (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="donor-name">Full Name</Label>
                <Input
                  id="donor-name"
                  value={donorInfo.name}
                  onChange={(e) => setDonorInfo(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="donor-email">Email</Label>
                <Input
                  id="donor-email"
                  type="email"
                  value={donorInfo.email}
                  onChange={(e) => setDonorInfo(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your@email.com"
                />
              </div>
            </div>
          </div>

          {/* TODO: Add payment form here */}
          {/* This is where you'll add your payment processing form */}
          <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center text-muted-foreground">
            <p className="mb-4">Payment form will be integrated here</p>
            <p className="text-sm">Add your preferred payment processor (Stripe, PayPal, etc.)</p>
          </div>

          {/* Donate Button */}
          <Button 
            onClick={handleDonateClick}
            className="w-full" 
            size="lg"
            disabled={!displayAmount || displayAmount < 0.5}
          >
            Donate ${displayAmount?.toFixed(2) || '0.00'}
            {donationType === "monthly" && " Monthly"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const DonationStats = () => {
  // TODO: Connect to real donation statistics API
  const donationStats = useQuery({
    queryKey: ['/api/donation-stats'],
    enabled: false, // Disabled until API keys are added
  });

  // Mock data for display purposes - replace with real data when API is connected
  const mockStats = {
    totalAmount: 12450,
    totalDonations: 156,
  };

  const progressToGoal = (mockStats.totalAmount / 25000) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500" />
          Our Impact So Far
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-500">
              ${mockStats.totalAmount.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Raised</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400">
              {mockStats.totalDonations}
            </div>
            <div className="text-sm text-muted-foreground">Donors</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress to $25,000 goal</span>
            <span>{progressToGoal.toFixed(1)}%</span>
          </div>
          <Progress value={progressToGoal} className="h-3" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="flex flex-col items-center space-y-2">
            <Utensils className="h-8 w-8 text-red-500" />
            <div className="text-sm">
              <div className="font-semibold">{Math.floor(mockStats.totalAmount / 5)}</div>
              <div className="text-muted-foreground">Meals Provided</div>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Home className="h-8 w-8 text-red-400" />
            <div className="text-sm">
              <div className="font-semibold">{Math.floor(mockStats.totalAmount / 100)}</div>
              <div className="text-muted-foreground">Families Helped</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Donate() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* TODO: Wrap DonationForm with Stripe Elements provider when ready */}
          {/* <Elements stripe={stripePromise}> */}
            <DonationForm />
          {/* </Elements> */}
        </div>
        <div className="space-y-6">
          <DonationStats />
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-500" />
                Secure Donations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Your donation is secure and encrypted. We never store your payment information.
                All transactions are processed through industry-standard secure payment processors.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-red-500" />
                How We Use Donations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Direct Food Assistance</span>
                <span className="text-sm font-semibold">75%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Program Operations</span>
                <span className="text-sm font-semibold">20%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Administrative Costs</span>
                <span className="text-sm font-semibold">5%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}