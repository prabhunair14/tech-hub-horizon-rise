
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Edit, MapPin, Mail, Calendar, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

interface UserProfile {
  fullName: string;
  email: string;
  location: string;
  bio: string;
  skills: string[];
  careerGoals: string;
  availability: string;
  mentorshipStyle: string;
  isAvailableForMentoring: boolean;
}

const availableSkills = [
  "React", "JavaScript", "Python", "Data Science", "Machine Learning", 
  "Cloud Computing", "DevOps", "UI/UX Design", "Product Management", 
  "Leadership", "Marketing", "Sales", "Cybersecurity", "Mobile Development"
];

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    fullName: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    location: "San Francisco, CA",
    bio: "Passionate software engineer with 5 years of experience in full-stack development. Love building user-centric applications and mentoring junior developers.",
    skills: ["React", "JavaScript", "Python", "Leadership"],
    careerGoals: "Transition to a technical leadership role within the next 2 years, focusing on team management and architectural decisions.",
    availability: "weekends",
    mentorshipStyle: "1:1",
    isAvailableForMentoring: true,
  });
  const { toast } = useToast();

  const handleSave = () => {
    console.log("Saving profile:", profile);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
    setIsEditing(false);
  };

  const toggleSkill = (skill: string) => {
    if (!isEditing) return;
    
    const updatedSkills = profile.skills.includes(skill)
      ? profile.skills.filter(s => s !== skill)
      : [...profile.skills, skill];
    setProfile({ ...profile, skills: updatedSkills });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
            <Button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={isEditing ? "bg-green-500 hover:bg-green-600" : "bg-orange-400 hover:bg-orange-500"}
            >
              {isEditing ? "Save Changes" : <><Edit className="h-4 w-4 mr-2" />Edit Profile</>}
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Overview */}
            <div className="lg:col-span-1">
              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white text-2xl">
                        {profile.fullName.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    
                    <h2 className="text-xl font-bold text-foreground mb-1">{profile.fullName}</h2>
                    <p className="text-muted-foreground mb-4">{profile.email}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{profile.location}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>3 Active Mentorships</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Member since Jan 2024</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card className="border-0 bg-white/70 backdrop-blur-sm mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <Badge
                        key={skill}
                        className="bg-orange-100 text-orange-700 hover:bg-orange-200"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Your personal and contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={profile.fullName}
                        onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      disabled={!isEditing}
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Skills Selection */}
              {isEditing && (
                <Card className="border-0 bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Skills</CardTitle>
                    <CardDescription>Select all skills that apply to you</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {availableSkills.map((skill) => (
                        <Badge
                          key={skill}
                          variant={profile.skills.includes(skill) ? "default" : "outline"}
                          className={`cursor-pointer text-center justify-center py-2 px-3 ${
                            profile.skills.includes(skill)
                              ? "bg-orange-400 hover:bg-orange-500 text-white"
                              : "hover:bg-orange-100"
                          }`}
                          onClick={() => toggleSkill(skill)}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Career Goals */}
              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Career Goals</CardTitle>
                  <CardDescription>Your professional aspirations and objectives</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={profile.careerGoals}
                    onChange={(e) => setProfile({ ...profile, careerGoals: e.target.value })}
                    disabled={!isEditing}
                    rows={4}
                    placeholder="Describe your career goals and how mentorship can help you achieve them..."
                  />
                </CardContent>
              </Card>

              {/* Mentorship Preferences */}
              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Mentorship Preferences</CardTitle>
                  <CardDescription>How you prefer to engage in mentorship</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="availability">Availability</Label>
                      <Select
                        value={profile.availability}
                        onValueChange={(value) => setProfile({ ...profile, availability: value })}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekdays">Weekdays</SelectItem>
                          <SelectItem value="weekends">Weekends</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="mentorshipStyle">Preferred Style</Label>
                      <Select
                        value={profile.mentorshipStyle}
                        onValueChange={(value) => setProfile({ ...profile, mentorshipStyle: value })}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1:1">1:1 Sessions</SelectItem>
                          <SelectItem value="group">Group Sessions</SelectItem>
                          <SelectItem value="async">Async Communication</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg">
                    <div>
                      <Label htmlFor="mentoring">Available for Mentoring Others</Label>
                      <p className="text-sm text-muted-foreground">
                        Share your knowledge and help other women in tech
                      </p>
                    </div>
                    <Switch
                      id="mentoring"
                      checked={profile.isAvailableForMentoring}
                      onCheckedChange={(checked) => setProfile({ ...profile, isAvailableForMentoring: checked })}
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
