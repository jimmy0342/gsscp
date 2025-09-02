import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  MessageSquare, 
  ArrowLeft,
  Clock,
  User,
  Bot
} from "lucide-react";
import { Link } from "react-router-dom";
import { chatStorage, ChatMessage } from "@/utils/chatStorage";
import { useState, useEffect } from "react";

export default function ClassTeacherAIChatTracker() {
  const [todayClassTeacherChats, setTodayClassTeacherChats] = useState<ChatMessage[]>([]);

  useEffect(() => {
    // Get today's class teacher chats from storage
    const chats = chatStorage.getTodayChatsByUserType('class-teacher');
    setTodayClassTeacherChats(chats);
    
    // Set up interval to refresh data every 5 seconds
    const interval = setInterval(() => {
      const updatedChats = chatStorage.getTodayChatsByUserType('class-teacher');
      setTodayClassTeacherChats(updatedChats);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Mock data for today's class teacher AI chats (fallback if no real data)
  const fallbackChats = [
  {
    id: 1,
    teacher: "Ms. Johnson",
    class: "Class 10-A",
    time: "08:00 AM",
    model: "ChatGPT",
    prompt: "I have a student who is struggling with attendance and seems disengaged. What are some strategies to help re-engage them?",
    aiResponse: "Here are effective strategies to re-engage a struggling student: 1) Build a personal connection - have one-on-one conversations to understand their challenges. 2) Identify their interests and incorporate them into lessons. 3) Set small, achievable goals and celebrate progress. 4) Involve parents/guardians in a supportive way. 5) Provide extra support through peer mentoring or tutoring. 6) Use varied teaching methods to accommodate different learning styles. 7) Create a safe, inclusive classroom environment. 8) Offer flexible deadlines and alternative assignments. 9) Regular check-ins to show you care about their success. 10) Connect lessons to real-world applications that interest them. Remember to be patient and consistent."
  },
  {
    id: 2,
    teacher: "Mr. Wilson",
    class: "Class 11-B",
    time: "09:30 AM",
    model: "Gemini",
    prompt: "How can I handle a conflict between two students in my class without taking sides?",
    aiResponse: "To handle student conflicts neutrally: 1) Separate the students immediately to prevent escalation. 2) Listen to both sides individually without interruption. 3) Use 'I' statements and focus on behavior, not personality. 4) Help students identify the root cause of the conflict. 5) Guide them to find their own solutions through mediation. 6) Set clear expectations for respectful communication. 7) Follow up with both students to ensure resolution. 8) Document the incident and any agreements made. 9) Involve school counselors if the conflict is serious. 10) Use this as a teaching moment for conflict resolution skills. The goal is to help students learn to resolve conflicts constructively."
  },
  {
    id: 3,
    teacher: "Mrs. Brown",
    class: "Class 9-C",
    time: "10:45 AM",
    model: "DeepSeek",
    prompt: "What are some effective classroom management techniques for a large class of 35 students?",
    aiResponse: "For managing a large class of 35 students: 1) Establish clear routines and procedures from day one. 2) Use a seating chart strategically to separate potential distractions. 3) Implement a reward system for positive behavior. 4) Use hand signals and non-verbal cues to maintain order. 5) Break large activities into smaller, manageable groups. 6) Assign classroom jobs to increase student engagement and responsibility. 7) Use proximity control - walk around the room during lessons. 8) Implement a consistent discipline policy with clear consequences. 9) Use technology tools for efficient classroom management. 10) Build relationships with students to create a positive classroom culture. Remember that consistency and clear expectations are key."
  },
  {
    id: 4,
    teacher: "Dr. Davis",
    class: "Class 12-A",
    time: "02:30 PM",
    model: "ChatGPT",
    prompt: "How can I help my students prepare for college applications and career planning?",
    aiResponse: "To help students with college and career planning: 1) Start early - begin discussions in 11th grade or earlier. 2) Provide resources on different career paths and college options. 3) Organize college fairs and career exploration events. 4) Help students research scholarships and financial aid opportunities. 5) Guide them in writing personal statements and essays. 6) Connect them with alumni or professionals in their fields of interest. 7) Offer workshops on interview skills and resume building. 8) Help students understand the application timeline and requirements. 9) Encourage them to visit college campuses and attend information sessions. 10) Provide emotional support during the stressful application process. Remember that each student's path is unique."
  },
  {
    id: 5,
    teacher: "Mr. Miller",
    class: "Class 10-B",
    time: "03:45 PM",
    model: "Gemini",
    prompt: "What are some ways to encourage parent involvement in their child's education?",
    aiResponse: "To encourage parent involvement: 1) Communicate regularly through newsletters, emails, or apps. 2) Host parent-teacher conferences and open houses. 3) Invite parents to volunteer in the classroom or for special events. 4) Provide resources and tips for supporting learning at home. 5) Celebrate student achievements and share them with parents. 6) Create a welcoming environment for parent visits. 7) Offer flexible meeting times to accommodate working parents. 8) Use technology to keep parents informed about assignments and progress. 9) Organize family events and activities. 10) Provide translation services for non-English speaking parents. Remember that parent involvement leads to better student outcomes."
  }
];

  // Use real data if available, otherwise use fallback
  const displayChats = todayClassTeacherChats.length > 0 ? todayClassTeacherChats : fallbackChats;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 p-6">
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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
              Class Teacher AI Chat Tracker
            </h1>
            <p className="text-muted-foreground">Today's AI chat conversations and classroom management assistance</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-orange-600">{todayClassTeacherChats.length}</div>
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
        {todayClassTeacherChats.map((chat, index) => (
          <Card key={chat.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-medium">{chat.teacher}</div>
                    <div className="text-sm text-muted-foreground">{chat.class} • {chat.time}</div>
                  </div>
                </div>
                <Badge variant="outline">{chat.model}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Teacher Prompt */}
              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-orange-600" />
                  <span className="font-medium text-orange-800">Teacher Prompt:</span>
                </div>
                <p className="text-orange-900">{chat.prompt}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-orange-600">{todayClassTeacherChats.length}</div>
              <div className="text-sm text-muted-foreground">Total Conversations</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {todayClassTeacherChats.filter(chat => chat.model === 'ChatGPT').length}
              </div>
              <div className="text-sm text-muted-foreground">ChatGPT Usage</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {todayClassTeacherChats.filter(chat => chat.model === 'Gemini').length}
              </div>
              <div className="text-sm text-muted-foreground">Gemini Usage</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
