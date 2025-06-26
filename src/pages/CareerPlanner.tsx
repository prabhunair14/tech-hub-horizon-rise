
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { GripVertical, Plus, ExternalLink, BookOpen } from "lucide-react";
import Navigation from "@/components/Navigation";

interface Skill {
  id: string;
  name: string;
  category: string;
  progress: number;
  priority: number;
  resources: {
    name: string;
    type: "course" | "certification" | "book";
    url: string;
  }[];
}

const initialSkills: Skill[] = [
  {
    id: "1",
    name: "Cloud Computing",
    category: "Technical",
    progress: 65,
    priority: 1,
    resources: [
      { name: "AWS Cloud Practitioner", type: "certification", url: "#" },
      { name: "Cloud Computing Fundamentals", type: "course", url: "#" }
    ]
  },
  {
    id: "2",
    name: "Leadership",
    category: "Soft Skills",
    progress: 40,
    priority: 2,
    resources: [
      { name: "Leadership in Tech", type: "course", url: "#" },
      { name: "The Manager's Path", type: "book", url: "#" }
    ]
  },
  {
    id: "3",
    name: "Machine Learning",
    category: "Technical",
    progress: 30,
    priority: 3,
    resources: [
      { name: "Google ML Crash Course", type: "course", url: "#" },
      { name: "TensorFlow Developer Certificate", type: "certification", url: "#" }
    ]
  },
  {
    id: "4",
    name: "Product Strategy",
    category: "Business",
    progress: 20,
    priority: 4,
    resources: [
      { name: "Product Management Fundamentals", type: "course", url: "#" },
      { name: "Inspired: How to Create Products", type: "book", url: "#" }
    ]
  },
];

const CareerPlanner = () => {
  const [skills, setSkills] = useState(initialSkills);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(skills);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update priorities based on new order
    const updatedItems = items.map((item, index) => ({
      ...item,
      priority: index + 1,
    }));

    setSkills(updatedItems);
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "course":
        return <BookOpen className="h-4 w-4" />;
      case "certification":
        return <Badge className="h-4 w-4" />;
      case "book":
        return <BookOpen className="h-4 w-4" />;
      default:
        return <ExternalLink className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Technical":
        return "bg-orange-100 text-orange-700";
      case "Soft Skills":
        return "bg-yellow-100 text-yellow-700";
      case "Business":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Career Planner</h1>
          <p className="text-gray-700">
            Drag and drop to prioritize your skill development goals
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Skills Priority List */}
          <div className="lg:col-span-2">
            <Card className="border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Your Skill Development Path</CardTitle>
                    <CardDescription className="text-gray-700">
                      Reorder skills by dragging to set your learning priorities
                    </CardDescription>
                  </div>
                  <Button size="sm" className="bg-orange-400 hover:bg-orange-500 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Skill
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="skills">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-4"
                      >
                        {skills.map((skill, index) => (
                          <Draggable key={skill.id} draggableId={skill.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={`bg-white rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md ${
                                  snapshot.isDragging ? "shadow-lg rotate-2" : ""
                                }`}
                              >
                                <div className="flex items-start space-x-4">
                                  <div
                                    {...provided.dragHandleProps}
                                    className="mt-2 text-gray-600 hover:text-foreground cursor-grab"
                                  >
                                    <GripVertical className="h-5 w-5" />
                                  </div>
                                  
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-2">
                                      <div className="flex items-center space-x-2">
                                        <span className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-1 rounded">
                                          #{skill.priority}
                                        </span>
                                        <h3 className="font-semibold text-foreground">
                                          {skill.name}
                                        </h3>
                                        <Badge variant="outline" className={getCategoryColor(skill.category)}>
                                          {skill.category}
                                        </Badge>
                                      </div>
                                    </div>
                                    
                                    <div className="mb-3">
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm text-gray-600">Progress</span>
                                        <span className="text-sm font-medium">{skill.progress}%</span>
                                      </div>
                                      <Progress value={skill.progress} className="h-2" />
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-2">
                                      {skill.resources.map((resource, idx) => (
                                        <Button
                                          key={idx}
                                          variant="outline"
                                          size="sm"
                                          className="text-xs h-7"
                                        >
                                          {getResourceIcon(resource.type)}
                                          <span className="ml-1">{resource.name}</span>
                                          <ExternalLink className="h-3 w-3 ml-1" />
                                        </Button>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </CardContent>
            </Card>
          </div>

          {/* Skills Overview */}
          <div className="space-y-6">
            <Card className="border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Skills Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Overall Progress</span>
                      <span className="text-sm text-gray-600">39%</span>
                    </div>
                    <Progress value={39} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-orange-50 rounded-lg p-3">
                      <p className="text-2xl font-bold text-orange-600">4</p>
                      <p className="text-xs text-orange-600">Active Skills</p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-3">
                      <p className="text-2xl font-bold text-yellow-600">8</p>
                      <p className="text-xs text-yellow-600">Resources</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Recommended Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg">
                    <BookOpen className="h-5 w-5 text-orange-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">AWS Solutions Architect</p>
                      <p className="text-xs text-gray-600">Based on your Cloud Computing goal</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-100 to-green-100 rounded-lg">
                    <BookOpen className="h-5 w-5 text-yellow-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Leadership Communication</p>
                      <p className="text-xs text-gray-600">Trending in your network</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CareerPlanner;
