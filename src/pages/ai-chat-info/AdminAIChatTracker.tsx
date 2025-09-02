import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  MessageSquare, 
  ArrowLeft,
  Clock,
  User,
  Bot
} from "lucide-react";
import { Link } from "react-router-dom";
import { chatStorage, ChatMessage } from "@/utils/chatStorage";
import { useState, useEffect } from "react";

export default function AdminAIChatTracker() {
  const [todayAdminChats, setTodayAdminChats] = useState<ChatMessage[]>([]);

  useEffect(() => {
    // Get today's admin chats from storage
    const chats = chatStorage.getTodayChatsByUserType('admin');
    setTodayAdminChats(chats);
    
    // Set up interval to refresh data every 5 seconds
    const interval = setInterval(() => {
      const updatedChats = chatStorage.getTodayChatsByUserType('admin');
      setTodayAdminChats(updatedChats);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Mock data for today's admin AI chats (fallback if no real data)
  const fallbackChats = [
  {
    id: 1,
    admin: "Mr. Wilson",
    department: "IT Administration",
    time: "08:15 AM",
    model: "DeepSeek",
    prompt: "How can I improve the security of our student database system?",
    aiResponse: "To improve student database security: 1) Implement multi-factor authentication for all admin accounts. 2) Use encryption for sensitive data both at rest and in transit. 3) Regular security audits and penetration testing. 4) Implement role-based access control with least privilege principle. 5) Regular backup and disaster recovery testing. 6) Monitor database access logs for suspicious activity. 7) Keep all software and systems updated with latest security patches. 8) Implement data loss prevention measures. 9) Regular staff training on security best practices. 10) Have an incident response plan ready. Consider using a Web Application Firewall (WAF) and implementing API security measures if applicable."
  },
  {
    id: 2,
    admin: "Ms. Johnson",
    department: "Human Resources",
    time: "09:30 AM",
    model: "ChatGPT",
    prompt: "What are the best practices for handling employee performance reviews?",
    aiResponse: "Best practices for employee performance reviews: 1) Set clear, measurable goals at the beginning of the review period. 2) Provide regular feedback throughout the year, not just during reviews. 3) Use specific examples and data to support assessments. 4) Focus on behavior and results, not personality. 5) Make reviews a two-way conversation, not just a monologue. 6) Document everything thoroughly for legal compliance. 7) Provide constructive feedback and actionable improvement plans. 8) Recognize achievements and contributions. 9) Set clear expectations for the next review period. 10) Follow up on agreed-upon action items. Remember that the goal is to help employees grow and succeed."
  },
  {
    id: 3,
    admin: "Dr. Brown",
    department: "Academic Affairs",
    time: "11:00 AM",
    model: "Gemini",
    prompt: "How can I streamline the course registration process for students?",
    aiResponse: "To streamline course registration: 1) Implement an online registration system with real-time availability. 2) Use automated prerequisites checking to prevent registration errors. 3) Provide clear course descriptions and requirements upfront. 4) Implement a waitlist system for popular courses. 5) Use data analytics to predict course demand and adjust offerings. 6) Provide mobile-friendly registration options. 7) Implement automated conflict checking for schedules. 8) Create a student portal with all registration information in one place. 9) Provide online advising and course planning tools. 10) Use chatbots to answer common registration questions. Consider implementing a degree audit system to help students track progress."
  },
  {
    id: 4,
    admin: "Mr. Davis",
    department: "Facilities Management",
    time: "02:15 PM",
    model: "ChatGPT",
    prompt: "What are some cost-effective ways to improve campus sustainability?",
    aiResponse: "Cost-effective campus sustainability improvements: 1) Install LED lighting throughout campus (pays for itself in energy savings). 2) Implement smart building controls for HVAC systems. 3) Start a comprehensive recycling program with student involvement. 4) Install low-flow water fixtures and water-efficient landscaping. 5) Create a bike-sharing program and improve bike infrastructure. 6) Use renewable energy sources like solar panels on building roofs. 7) Implement a food waste composting program in dining halls. 8) Create sustainability education programs for students and staff. 9) Use green cleaning products and practices. 10) Implement a paperless initiative for administrative processes. Many of these initiatives have quick payback periods and can qualify for grants or tax incentives."
  },
  {
    id: 5,
    admin: "Ms. Thompson",
    department: "Student Services",
    time: "03:45 PM",
    model: "DeepSeek",
    prompt: "How can I improve student retention rates at our institution?",
    aiResponse: "To improve student retention: 1) Implement early warning systems to identify at-risk students. 2) Provide comprehensive orientation and onboarding programs. 3) Create strong academic advising and mentoring programs. 4) Offer flexible learning options and support services. 5) Build a strong sense of community through clubs and activities. 6) Provide mental health and wellness support services. 7) Create clear pathways for academic and career success. 8) Implement regular student feedback and satisfaction surveys. 9) Provide financial literacy and support programs. 10) Create partnerships with local businesses for internships and job opportunities. Focus on creating a supportive environment where students feel valued and connected."
  }
];

  // Use real data if available, otherwise use fallback
  const displayChats = todayAdminChats.length > 0 ? todayAdminChats : fallbackChats;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/ai-chat-info">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
              Admin AI Chat Tracker
            </h1>
            <p className="text-muted-foreground">Today's AI chat conversations and administrative assistance</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-red-600">{todayAdminChats.length}</div>
          <div className="text-sm text-muted-foreground">Today's Chats</div>
        </div>
      </div>

      {/* Today's Date */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-6">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-center justify-center">
            <Clock className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Chat Conversations */}
      <div className="space-y-6 max-w-4xl mx-auto">
        {todayAdminChats.map((chat, index) => (
          <Card key={chat.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <div className="font-medium">{chat.admin}</div>
                    <div className="text-sm text-muted-foreground">{chat.department} • {chat.time}</div>
                  </div>
                </div>
                <Badge variant="outline">{chat.model}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Admin Prompt */}
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-red-600" />
                  <span className="font-medium text-red-800">Admin Prompt:</span>
                </div>
                <p className="text-red-900">{chat.prompt}</p>
              </div>

              {/* AI Response */}
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-500">
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="h-4 w-4 text-gray-600" />
                  <span className="font-medium text-gray-800">AI Response:</span>
                </div>
                <p className="text-gray-900">{chat.aiResponse}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mt-8 max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Today's Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-red-600">{todayAdminChats.length}</div>
              <div className="text-sm text-muted-foreground">Total Conversations</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {todayAdminChats.filter(chat => chat.model === 'ChatGPT').length}
              </div>
              <div className="text-sm text-muted-foreground">ChatGPT Usage</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {todayAdminChats.filter(chat => chat.model === 'Gemini').length}
              </div>
              <div className="text-sm text-muted-foreground">Gemini Usage</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {todayAdminChats.filter(chat => chat.model === 'DeepSeek').length}
              </div>
              <div className="text-sm text-muted-foreground">DeepSeek Usage</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
