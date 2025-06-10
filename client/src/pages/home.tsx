import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, GraduationCap, Utensils } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-900 to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Fighting Food Insecurity at{" "}
                <span className="text-red-400">UMD</span>
              </h1>
              <p className="text-xl mb-8 text-gray-300 leading-relaxed">
                Over 27% of UMD students face food insecurity. That's 1 in 4 of our peers 
                struggling to afford their next meal. Join Hearts in Action to break this cycle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/donate">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                    <Heart className="h-5 w-5 mr-2" />
                    Donate Now
                  </Button>
                </Link>
                <Link href="/about">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-black"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Students helping community members with food distribution"
                className="rounded-xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-black border border-red-500 p-6 rounded-xl shadow-lg">
                <div className="text-red-500 text-2xl font-bold">27%</div>
                <div className="text-gray-300 text-sm">of UMD students face food insecurity</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">The Reality of Food Insecurity</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              These aren't just numbers—they represent real students in our community who need our support.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-red-900/20 border-red-500">
              <CardContent className="text-center p-0">
                <div className="text-4xl font-bold text-red-400 mb-2">40%</div>
                <div className="text-gray-300">Fall asleep in class or can't focus due to hunger</div>
              </CardContent>
            </Card>
            <Card className="p-8 bg-red-900/10 border-red-600">
              <CardContent className="text-center p-0">
                <div className="text-4xl font-bold text-red-500 mb-2">13%</div>
                <div className="text-gray-300">Have failed assignments because they didn't have enough to eat</div>
              </CardContent>
            </Card>
            <Card className="p-8 bg-red-900/30 border-red-400">
              <CardContent className="text-center p-0">
                <div className="text-4xl font-bold text-red-300 mb-2">1 in 4</div>
                <div className="text-gray-300">Students struggle to afford their next meal</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How We Help</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Hearts in Action provides comprehensive support to address food and material insecurity 
              in our community through various initiatives.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow bg-gray-900 border-red-900">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4">
                    <Utensils className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Food Drives</h3>
                </div>
                <p className="text-gray-300">
                  Regular food collection and distribution to students in need, ensuring no one goes hungry.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow bg-gray-900 border-red-900">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Clothing Assistance</h3>
                </div>
                <p className="text-gray-300">
                  Warm clothing and professional attire for students to succeed academically and professionally.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow bg-gray-900 border-red-900">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center mr-4">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Educational Support</h3>
                </div>
                <p className="text-gray-300">
                  School supplies and resources for academic success, removing barriers to education.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-red-900 to-red-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-red-100 mb-8">
            Every action counts. Whether you donate, volunteer, or spread awareness, 
            you can help break the cycle of food insecurity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate">
              <Button size="lg" className="bg-brand-red hover:bg-red-700 text-white">
                <Heart className="h-5 w-5 mr-2" />
                Make a Donation
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-brand-blue"
              >
                Get Involved
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
