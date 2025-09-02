import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Users, 
  BookOpen, 
  Shield, 
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const aiChatTrackers = [
  {
    title: "Student AI Chat Tracker",
    description: "Track daily student AI chat interactions and conversations",
    icon: Users,
    href: "/ai-chat-info/student",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    todayChats: 45,
    activeUsers: 23
  },
  {
    title: "Subject Teacher AI Chat Tracker",
    description: "Monitor subject teacher AI chat usage and interactions",
    icon: BookOpen,
    href: "/ai-chat-info/subject-teacher",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    todayChats: 18,
    activeTeachers: 12
  },
  {
    title: "Class Teacher AI Chat Tracker",
    description: "Track class teacher AI chat activities and queries",
    icon: Users,
    href: "/ai-chat-info/class-teacher",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    todayChats: 22,
    activeTeachers: 15
  },
  {
    title: "Admin AI Chat Tracker",
    description: "Monitor admin AI chat usage and system interactions",
    icon: Shield,
    href: "/ai-chat-info/admin",
    color: "text-red-600",
    bgColor: "bg-red-50",
    todayChats: 8,
    activeAdmins: 5
  }
];

export default function AIChatInfo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-primary/10">
            <MessageSquare className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            AI Chat Info Dashboard
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Track and monitor daily AI chat interactions for all user types. 
          View today's conversations, prompts, and AI model responses.
        </p>
      </div>

      {/* AI Chat Trackers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {aiChatTrackers.map((tracker, index) => (
          <Card key={tracker.title} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${tracker.bgColor}`}>
                  <tracker.icon className={`h-6 w-6 ${tracker.color}`} />
                </div>
                <div>
                  <CardTitle className="text-xl">{tracker.title}</CardTitle>
                  <CardDescription className="text-sm mt-1">
                    {tracker.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Today's Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 bg-muted/30 rounded-lg">
                  <div className="text-lg font-semibold text-primary">{tracker.todayChats}</div>
                  <div className="text-xs text-muted-foreground">Today's Chats</div>
                </div>
                <div className="text-center p-2 bg-muted/30 rounded-lg">
                  <div className="text-lg font-semibold text-primary">{tracker.activeUsers}</div>
                  <div className="text-xs text-muted-foreground">Active Users</div>
                </div>
              </div>

              <Button asChild className="w-full">
                <Link to={tracker.href}>
                  View Today's Chats
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Info */}
      <div className="text-center mt-12 pt-8 border-t max-w-3xl mx-auto">
        <p className="text-muted-foreground">
          Click on any tracker above to view today's AI chat conversations, including user prompts and AI model responses in chronological order.
        </p>
      </div>
    </div>
  );
}
