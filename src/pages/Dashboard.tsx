
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, MapPin, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Dashboard = () => {
  const userName = "Sarah"; // In real app, this would come from user context

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-muted-foreground">
            Ready to continue your growth journey? Here's what's waiting for you.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Mentors</p>
                  <p className="text-2xl font-bold text-foreground">3</p>
                </div>
                <Users className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Sessions This Month</p>
                  <p className="text-2xl font-bold text-foreground">8</p>
                </div>
                <Calendar className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Skills Progress</p>
                  <p className="text-2xl font-bold text-foreground">75%</p>
                </div>
                <User className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Events Attended</p>
                  <p className="text-2xl font-bold text-foreground">12</p>
                </div>
                <MapPin className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link to="/mentor-matching">
            <Card className="border-0 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-pastel-orange rounded-lg flex items-center justify-center mb-3">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Find New Mentors</CardTitle>
                <CardDescription>
                  Discover mentors who align with your career goals and interests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-orange-400 hover:bg-orange-500 text-white">
                  Start Matching
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link to="/career-planner">
            <Card className="border-0 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-pastel-yellow rounded-lg flex items-center justify-center mb-3">
                  <Calendar className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle className="text-xl">Career Planner</CardTitle>
                <CardDescription>
                  Build your roadmap and track progress on your professional goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Plan Your Growth
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Card className="border-0 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center mb-3">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">Local Events</CardTitle>
              <CardDescription>
                Discover networking events and conferences in your area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Browse Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Sessions */}
        <Card className="border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl">Upcoming Sessions</CardTitle>
            <CardDescription>Your scheduled mentorship sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg">
                <div>
                  <p className="font-medium">1:1 with Jennifer Chen</p>
                  <p className="text-sm text-muted-foreground">Tomorrow, 2:00 PM - Career Development</p>
                </div>
                <Button size="sm" variant="outline">Join</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-100 to-green-100 rounded-lg">
                <div>
                  <p className="font-medium">Group Session: Technical Leadership</p>
                  <p className="text-sm text-muted-foreground">Friday, 4:00 PM - with 5 other mentees</p>
                </div>
                <Button size="sm" variant="outline">Join</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
