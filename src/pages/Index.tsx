
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-lg"></div>
            <h1 className="text-2xl font-bold text-foreground">Herizon</h1>
          </div>
          <Link to="/onboarding">
            <Button className="bg-orange-400 hover:bg-orange-500 text-white">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-foreground mb-6 leading-tight">
            Empowering Women in Tech Through
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400"> Mentorship</span>
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Connect with industry leaders, access career opportunities, and build meaningful relationships that accelerate your growth in technology.
          </p>
          <Link to="/onboarding">
            <Button size="lg" className="bg-orange-400 hover:bg-orange-500 text-white text-lg px-8 py-3">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-pastel-orange rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle className="text-xl">Smart Mentor Matching</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-700">
                Our algorithm connects you with mentors who align with your career goals, skills, and aspirations.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-pastel-yellow rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <CardTitle className="text-xl">Career Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-700">
                Build personalized career roadmaps with skill recommendations and training resources.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-pastel-green rounded-lg mx-auto mb-4 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">Local Tech Events</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-700">
                Discover networking events, conferences, and workshops in your area to expand your professional network.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="border-0 bg-gradient-to-r from-orange-100 via-yellow-100 to-green-100 shadow-xl">
          <CardContent className="text-center py-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Ready to Accelerate Your Career?
            </h3>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Join thousands of women who are already building meaningful connections and advancing their careers in tech.
            </p>
            <Link to="/onboarding">
              <Button size="lg" className="bg-orange-400 hover:bg-orange-500 text-white text-lg px-8 py-3">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
