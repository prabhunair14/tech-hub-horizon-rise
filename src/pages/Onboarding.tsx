
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, ArrowLeft, MapPin, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface OnboardingData {
  fullName: string;
  email: string;
  location: string;
  skills: string[];
  careerGoals: string;
}

const skillOptions = [
  "React", "JavaScript", "Python", "Data Science", "Machine Learning", 
  "Cloud Computing", "DevOps", "UI/UX Design", "Product Management", 
  "Leadership", "Marketing", "Sales", "Cybersecurity", "Mobile Development"
];

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    fullName: "",
    email: "",
    location: "",
    skills: [],
    careerGoals: ""
  });
  const [techHubInfo, setTechHubInfo] = useState<{ isTechHub: boolean; percentage?: number } | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const checkTechHub = async (location: string) => {
    // Simulate API call to check tech hub status
    console.log(`Checking tech hub status for: ${location}`);
    
    // Mock data - in real app, this would call /api/tech-hub-check
    const mockResponse = {
      isTechHub: location.toLowerCase().includes('san francisco') || 
                 location.toLowerCase().includes('seattle') || 
                 location.toLowerCase().includes('austin') ||
                 location.toLowerCase().includes('new york'),
      percentage: 12.3
    };
    
    setTechHubInfo(mockResponse);
    
    if (mockResponse.isTechHub) {
      toast({
        title: "🌟 You're in a tech hub!",
        description: `${mockResponse.percentage}% of jobs in your region are in tech—great opportunities for mentorship and growth.`,
      });
    }
  };

  const handleLocationChange = (location: string) => {
    setData({ ...data, location });
    if (location.length > 3) {
      checkTechHub(location);
    }
  };

  const toggleSkill = (skill: string) => {
    const updatedSkills = data.skills.includes(skill)
      ? data.skills.filter(s => s !== skill)
      : [...data.skills, skill];
    setData({ ...data, skills: updatedSkills });
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      console.log("Onboarding completed with data:", data);
      toast({
        title: "Welcome to Herizon!",
        description: "Your profile has been created successfully.",
      });
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return data.fullName.trim() !== "" && data.email.trim() !== "";
      case 2:
        return data.location.trim() !== "";
      case 3:
        return data.skills.length > 0;
      case 4:
        return data.careerGoals.trim() !== "";
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-0 bg-white/80 backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-lg"></div>
            <h1 className="text-2xl font-bold text-foreground">Herizon</h1>
          </div>
          <Progress value={progress} className="w-full h-2" />
          <CardDescription className="mt-4 text-gray-700">
            Step {step} of {totalSteps} - Let's get you started
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <CardTitle className="text-xl text-center">Welcome! Tell us about yourself</CardTitle>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName" className="text-gray-700">Full Name</Label>
                  <Input
                    id="fullName"
                    value={data.fullName}
                    onChange={(e) => setData({ ...data, fullName: e.target.value })}
                    placeholder="Enter your full name"
                    className="mt-1 text-gray-700 placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    placeholder="Enter your email address"
                    className="mt-1 text-gray-700 placeholder:text-gray-500"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <CardTitle className="text-xl text-center">Where are you located?</CardTitle>
              <div>
                <Label htmlFor="location" className="flex items-center space-x-2 text-gray-700">
                  <MapPin className="h-4 w-4" />
                  <span>Location</span>
                </Label>
                <Input
                  id="location"
                  value={data.location}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  placeholder="City, State/Country"
                  className="mt-1 text-gray-700 placeholder:text-gray-500"
                />
                {techHubInfo?.isTechHub && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg border-0">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="h-5 w-5 text-orange-500" />
                      <p className="text-sm font-medium text-gray-700">
                        🌟 You're in a tech hub! {techHubInfo.percentage}% of jobs in your region are in tech—great opportunities for mentorship and growth.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <CardTitle className="text-xl text-center">What are your skills?</CardTitle>
              <CardDescription className="text-center text-gray-700">
                Select all skills that apply to you
              </CardDescription>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {skillOptions.map((skill) => (
                  <Badge
                    key={skill}
                    variant={data.skills.includes(skill) ? "default" : "outline"}
                    className={`cursor-pointer text-center justify-center py-2 px-3 ${
                      data.skills.includes(skill)
                        ? "bg-orange-400 hover:bg-orange-500 text-white"
                        : "hover:bg-orange-100 text-gray-700 border-gray-300"
                    }`}
                    onClick={() => toggleSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
              {data.skills.length > 0 && (
                <p className="text-sm text-gray-600 text-center">
                  Selected {data.skills.length} skill{data.skills.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <CardTitle className="text-xl text-center">What are your career goals?</CardTitle>
              <div>
                <Label htmlFor="careerGoals" className="text-gray-700">Career Goals</Label>
                <Textarea
                  id="careerGoals"
                  value={data.careerGoals}
                  onChange={(e) => setData({ ...data, careerGoals: e.target.value })}
                  placeholder="Describe your career aspirations, what you'd like to achieve, and how mentorship can help you..."
                  rows={4}
                  className="mt-1 text-gray-700 placeholder:text-gray-500"
                />
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="bg-orange-400 hover:bg-orange-500 text-white flex items-center space-x-2"
            >
              <span>{step === totalSteps ? "Complete" : "Next"}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
