
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, X, MapPin, Users, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  skills: string[];
  experience: string;
  location: string;
  rating: number;
  image?: string;
  bio: string;
  mentees: number;
}

const mockMentors: Mentor[] = [
  {
    id: "1",
    name: "Jennifer Chen",
    title: "Senior Software Engineer",
    company: "Google",
    skills: ["React", "JavaScript", "Leadership", "Mentoring"],
    experience: "8 years",
    location: "San Francisco, CA",
    rating: 4.9,
    bio: "Passionate about helping women break into tech leadership roles. I've mentored 50+ engineers and love sharing knowledge about technical growth and career advancement.",
    mentees: 12,
  },
  {
    id: "2",
    name: "Maria Rodriguez",
    title: "VP of Product",
    company: "Stripe",
    skills: ["Product Management", "Strategy", "Leadership", "Growth"],
    experience: "12 years",
    location: "New York, NY",
    rating: 4.8,
    bio: "Former founder turned product leader. I help ambitious women navigate the transition from IC to leadership roles in product and strategy.",
    mentees: 8,
  },
  {
    id: "3",
    name: "Dr. Aisha Patel",
    title: "Director of Data Science",
    company: "Netflix",
    skills: ["Data Science", "Machine Learning", "Python", "Analytics"],
    experience: "10 years",
    location: "Los Angeles, CA",
    rating: 4.9,
    bio: "PhD in Computer Science with a focus on AI/ML. I love helping women enter and excel in data science and AI fields.",
    mentees: 15,
  },
];

const MentorMatching = () => {
  const [currentMentorIndex, setCurrentMentorIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  const { toast } = useToast();

  const currentMentor = mockMentors[currentMentorIndex];

  const handleSwipe = (direction: "left" | "right") => {
    setSwipeDirection(direction);
    
    if (direction === "right") {
      toast({
        title: "Great choice! 💫",
        description: `You've connected with ${currentMentor.name}. They'll be notified about your interest.`,
      });
    }

    // Animate and move to next mentor
    setTimeout(() => {
      setSwipeDirection(null);
      setCurrentMentorIndex((prev) => (prev + 1) % mockMentors.length);
    }, 300);
  };

  if (!currentMentor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold mb-4">No more mentors to show!</h1>
          <p className="text-muted-foreground">Check back later for new mentor profiles.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Find Your Perfect Mentor</h1>
          <p className="text-muted-foreground">
            Swipe right to connect, left to pass. Find mentors who align with your goals.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <Card 
            className={`border-0 bg-white shadow-2xl transition-transform duration-300 ${
              swipeDirection === "left" ? "-translate-x-full opacity-0" :
              swipeDirection === "right" ? "translate-x-full opacity-0" : ""
            }`}
          >
            <CardHeader className="text-center pb-4">
              <div className="relative mx-auto mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={currentMentor.image} />
                  <AvatarFallback className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white text-xl">
                    {currentMentor.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-lg">
                  <div className="flex items-center space-x-1 bg-yellow-100 rounded-full px-2 py-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-medium">{currentMentor.rating}</span>
                  </div>
                </div>
              </div>
              
              <CardTitle className="text-2xl">{currentMentor.name}</CardTitle>
              <CardDescription className="text-lg font-medium text-foreground">
                {currentMentor.title}
              </CardDescription>
              <p className="text-orange-600 font-medium">{currentMentor.company}</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{currentMentor.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{currentMentor.mentees} mentees</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Experience</h4>
                <p className="text-sm text-muted-foreground">{currentMentor.experience} in industry</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Skills & Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {currentMentor.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-orange-100 text-orange-700">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">About</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {currentMentor.bio}
                </p>
              </div>

              <div className="flex justify-center space-x-4 pt-4">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-16 h-16 rounded-full border-2 hover:bg-red-50 hover:border-red-300"
                  onClick={() => handleSwipe("left")}
                >
                  <X className="h-6 w-6 text-red-500" />
                </Button>
                
                <Button
                  size="lg"
                  className="w-16 h-16 rounded-full bg-orange-400 hover:bg-orange-500 text-white"
                  onClick={() => handleSwipe("right")}
                >
                  <Heart className="h-6 w-6" />
                </Button>
              </div>

              <p className="text-center text-xs text-muted-foreground">
                {currentMentorIndex + 1} of {mockMentors.length} mentors
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MentorMatching;
