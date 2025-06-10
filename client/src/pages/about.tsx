import { Card, CardContent } from "@/components/ui/card";
import { Users, Heart, Target, Award } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen py-16">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Hearts in Action
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We are a student-led organization dedicated to addressing food and material insecurity 
              in our community through compassionate action and sustainable solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Diverse group of students volunteering at community food drive"
                className="rounded-xl shadow-lg w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Hearts in Action is a student-led organization dedicated to organizing and executing 
                year-round initiatives aimed at addressing the needs of financially underserved 
                individuals and families.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Through community drives for clothing, food, holiday gifts, and educational supplies, 
                we aim to uplift individuals by providing them with resources while fostering an 
                inclusive and collaborative environment for students to develop leadership skills.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-green rounded-full flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Community Impact</h3>
                    <p className="text-gray-600">
                      Creating lasting change through direct assistance and community building
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center mr-4">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Strategic Approach</h3>
                    <p className="text-gray-600">
                      Data-driven initiatives targeting areas of greatest need in our community
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center mr-4">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Leadership Development</h3>
                    <p className="text-gray-600">
                      Empowering students to develop skills while making a meaningful difference
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Challenge We Face</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Food insecurity is a real crisis affecting our campus community right now.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-8 mb-12">
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-lg mb-6">
                <strong>Did you know that over 27% of UMD students face food insecurity?</strong> 
                That means 1 in 4 of our peers are struggling to afford their next meal. And the 
                consequences are real—40% of food-insecure students report falling asleep in class 
                or being unable to focus, while 13% have failed assignments simply because they 
                didn't have enough to eat.
              </p>
              
              <p className="text-lg mb-6">
                This isn't just a statistic—it's a crisis happening right here on our campus. 
                Food insecurity is just one of the many barriers holding students back. Many come 
                from underserved communities where access to basic necessities—nutritious meals, 
                warm clothing, school supplies, and even holiday celebrations—is limited.
              </p>
              
              <p className="text-lg">
                Without support, these challenges create a cycle of disadvantage, affecting academic 
                success, mental health, and future opportunities. <strong>That's where Hearts in Action comes in.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-brand-blue text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              These core values guide everything we do and shape how we serve our community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-8 text-center">
                <Heart className="h-12 w-12 text-brand-orange mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Compassion</h3>
                <p className="text-blue-100">
                  We approach every interaction with empathy, understanding, and genuine care 
                  for those we serve.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-brand-green mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Community</h3>
                <p className="text-blue-100">
                  We believe in the power of collective action and building strong, 
                  supportive relationships.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-8 text-center">
                <Target className="h-12 w-12 text-brand-red mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Impact</h3>
                <p className="text-blue-100">
                  We are committed to creating measurable, lasting change in the lives 
                  of those we serve.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Mission</h2>
          <p className="text-xl text-gray-600 mb-8">
            Our mission is not only to offer material support but also to create a culture of care, 
            kindness, and social responsibility on campus and in neighboring communities in the College Park area.
          </p>
          <p className="text-lg text-gray-700 mb-8">
            <strong>But we can't do it alone.</strong> You can help break the cycle. Whether it's donating, 
            volunteering, or spreading the word, every action counts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="inline-block">
              <button className="bg-brand-blue text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Get Involved
              </button>
            </a>
            <a href="/donate" className="inline-block">
              <button className="bg-brand-red text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                <Heart className="inline h-5 w-5 mr-2" />
                Support Our Cause
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
