import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, MapPin, Users, Phone, Clock } from "lucide-react";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  interest: z.string().min(1, "Please select an interest"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      interest: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: ContactFormData) =>
      apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="min-h-screen py-16">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get Involved
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to make a difference? Contact us to volunteer, partner with us, 
            or learn more about our initiatives.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="interest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>I'm interested in</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="volunteering">Volunteering</SelectItem>
                              <SelectItem value="donating">Making a donation</SelectItem>
                              <SelectItem value="partnership">Partnership opportunities</SelectItem>
                              <SelectItem value="receiving-help">Receiving assistance</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={4}
                              placeholder="Tell us how you'd like to get involved..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-brand-blue hover:bg-blue-700 text-white"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Email</div>
                      <div className="text-gray-600">contact@heartsinaction.org</div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Location</div>
                      <div className="text-gray-600">
                        University of Maryland<br />
                        College Park, MD 20742
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Follow Us</div>
                      <div className="flex space-x-3 mt-2">
                        <a href="#" className="text-gray-400 hover:text-brand-blue transition-colors">
                          <i className="fab fa-instagram text-xl"></i>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-brand-blue transition-colors">
                          <i className="fab fa-facebook text-xl"></i>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-brand-blue transition-colors">
                          <i className="fab fa-twitter text-xl"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Resources */}
              <Card className="bg-red-50 border-red-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-brand-red">
                    Need Immediate Help?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    If you're facing food insecurity right now, these resources can provide immediate assistance.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-brand-red mr-3" />
                      <span className="text-gray-700">UMD Food Pantry: (301) 314-8442</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-brand-red mr-3" />
                      <span className="text-gray-700">Open Mon-Fri, 10am-4pm</span>
                    </div>
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
