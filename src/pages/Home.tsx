import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Calculator,
  ArrowRight,
  BookOpen,
  Users,
  Shield,
  MessageSquare
} from "lucide-react";
import { Link } from "react-router-dom";

const panels = [
  {
    title: "Student Panel",
    description: "Access your academic profile, performance, timetable, notes, and AI study assistant",
    icon: User,
    href: "/",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    features: ["Profile Management", "Academic Performance", "Study Materials", "AI Chat Assistant"]
  },
  {
    title: "Math Teacher Panel",
    description: "Update class timetable and lesson details through AI chat interface",
    icon: Calculator,
    href: "/math-teacher",
    color: "text-green-600",
    bgColor: "bg-green-50",
    features: ["Timetable Updates", "Lesson Planning", "AI Chat Interface", "Quick Updates"]
  },
  {
    title: "Subject Teacher Panel",
    description: "AI chat assistant identical to student AI chat",
    icon: BookOpen,
    href: "/subject-teacher",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    features: ["AI Chat Assistant"]
  },
  {
    title: "Class Teacher Panel",
    description: "AI chat assistant identical to student AI chat",
    icon: Users,
    href: "/class-teacher",
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    features: ["AI Chat Assistant"]
  },
  {
    title: "Admin Panel",
    description: "AI chat assistant identical to student AI chat",
    icon: Shield,
    href: "/admin",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    features: ["AI Chat Assistant"]
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
                     <div className="flex items-center justify-center gap-3 mb-4">
             <div className="p-3 rounded-full bg-primary/10">
               <User className="h-8 w-8 text-primary" />
             </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              AI-Powered Education Hub
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your role to access the appropriate AI-powered tools and features designed specifically for your needs.
          </p>
        </div>

        {/* Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {panels.map((panel, index) => (
            <Card key={panel.title} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${panel.bgColor}`}>
                    <panel.icon className={`h-6 w-6 ${panel.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{panel.title}</CardTitle>
                    <CardDescription className="text-sm mt-1">
                      {panel.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground">Key Features:</h4>
                  <ul className="space-y-1">
                    {panel.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button asChild className="w-full mt-4">
                  <Link to={panel.href}>
                    Access {panel.title}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

                                                                             {/* AI Chat Info Dashboard */}
                     <div className="text-center mt-12 pt-8 border-t">
                       <div className="mb-6">
                         <h2 className="text-2xl font-bold text-primary mb-4">AI Chat Info Dashboard</h2>
                         <p className="text-muted-foreground mb-4">
                           Track and monitor daily AI chat interactions across all user types
                         </p>
                         <Button asChild size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                           <Link to="/ai-chat-info">
                             <MessageSquare className="h-5 w-5 mr-2" />
                             View AI Chat Tracker
                           </Link>
                         </Button>
                       </div>
                       
                       <div className="border-t pt-8">
                         <p className="text-muted-foreground">
                           Each panel is equipped with AI-powered features to enhance your educational experience and productivity.
                         </p>
                       </div>
                     </div>
      </div>
    </div>
  );
}
