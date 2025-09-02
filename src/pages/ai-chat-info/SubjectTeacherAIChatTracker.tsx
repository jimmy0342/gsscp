import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  MessageSquare, 
  ArrowLeft,
  Clock,
  User,
  Bot
} from "lucide-react";
import { Link } from "react-router-dom";
import { chatStorage, ChatMessage } from "@/utils/chatStorage";
import { useState, useEffect } from "react";

export default function SubjectTeacherAIChatTracker() {
  const [todaySubjectTeacherChats, setTodaySubjectTeacherChats] = useState<ChatMessage[]>([]);

  useEffect(() => {
    // Get today's subject teacher chats from storage
    const chats = chatStorage.getTodayChatsByUserType('subject-teacher');
    setTodaySubjectTeacherChats(chats);
    
    // Set up interval to refresh data every 5 seconds
    const interval = setInterval(() => {
      const updatedChats = chatStorage.getTodayChatsByUserType('subject-teacher');
      setTodaySubjectTeacherChats(updatedChats);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Mock data for today's subject teacher AI chats (fallback if no real data)
  const fallbackChats = [
  {
    id: 1,
    teacher: "Dr. Smith",
    subject: "Mathematics",
    time: "08:30 AM",
    model: "ChatGPT",
    prompt: "I need help creating a lesson plan for teaching derivatives to high school students. Can you suggest some engaging activities?",
    aiResponse: "Here's a comprehensive lesson plan for teaching derivatives: 1) Start with real-world examples (speed, acceleration) to build intuition. 2) Use visual demonstrations with graphs showing tangent lines. 3) Interactive activities: Have students draw tangent lines on printed graphs. 4) Group work: Students work in pairs to find slopes at different points. 5) Technology integration: Use graphing calculators or online tools like Desmos. 6) Assessment: Give students a function and have them sketch its derivative. 7) Real-world application: Calculate rates of change in physics problems. Include plenty of practice problems and encourage students to explain their reasoning."
  },
  {
    id: 2,
    teacher: "Prof. Johnson",
    subject: "Physics",
    time: "09:45 AM",
    model: "Gemini",
    prompt: "What are some effective ways to explain the concept of electric fields to students who struggle with abstract concepts?",
    aiResponse: "To help students understand electric fields, use these concrete approaches: 1) Field lines as 'invisible arrows' - draw them with iron filings or use a Van de Graaff generator. 2) Analogies: Compare electric fields to gravity (both are force fields). 3) Visual models: Use 3D models or computer simulations to show field strength. 4) Hands-on activities: Have students map field lines around charged objects. 5) Real-world examples: Lightning, static electricity, and electric motors. 6) Step-by-step problem solving: Start with simple point charges before complex distributions. 7) Interactive demonstrations: Use PhET simulations or similar online tools. 8) Group discussions: Have students explain concepts to each other."
  },
  {
    id: 3,
    teacher: "Dr. Brown",
    subject: "Chemistry",
    time: "11:20 AM",
    model: "DeepSeek",
    prompt: "Can you help me design a lab experiment to demonstrate chemical equilibrium using common household materials?",
    aiResponse: "Here's a simple lab experiment for chemical equilibrium using household materials: Materials: Vinegar, baking soda, water, food coloring, clear containers. Procedure: 1) Mix vinegar and water in a clear container. 2) Add food coloring for visibility. 3) Slowly add baking soda and observe the reaction. 4) Continue adding until the reaction slows down. 5) Explain that the system reaches equilibrium when CO2 production and dissolution rates balance. Variations: Test different vinegar concentrations, temperatures, or container sizes. Safety: Ensure proper ventilation and supervise students. Assessment: Have students predict outcomes and explain observations. This demonstrates Le Chatelier's principle and equilibrium concepts effectively."
  },
  {
    id: 4,
    teacher: "Ms. Davis",
    subject: "English Literature",
    time: "02:00 PM",
    model: "ChatGPT",
    prompt: "I'm teaching Shakespeare's Macbeth to 10th graders. What are some modern connections I can make to help them relate to the themes?",
    aiResponse: "Here are modern connections for Macbeth that will resonate with 10th graders: 1) Ambition and Power: Connect to social media influencers, political leaders, or business figures who let ambition corrupt them. 2) Peer Pressure: Relate Lady Macbeth's influence to modern peer pressure and social media validation. 3) Guilt and Conscience: Compare to modern examples of people haunted by their actions (whistleblowers, activists). 4) Fate vs. Free Will: Discuss modern debates about destiny, genetics, and personal choice. 5) Leadership and Responsibility: Connect to current events involving leaders who abuse power. 6) Gender Roles: Explore how Lady Macbeth challenges traditional gender expectations. 7) Media and Manipulation: Compare the witches' prophecies to modern fake news and manipulation. Use current events, movies, and social media examples to make these connections."
  },
  {
    id: 5,
    teacher: "Mr. Wilson",
    subject: "Biology",
    time: "03:15 PM",
    model: "Gemini",
    prompt: "How can I make the topic of cellular respiration more engaging for students who find it boring?",
    aiResponse: "To make cellular respiration engaging: 1) Start with energy - relate it to sports, exercise, and daily activities. 2) Use food as examples - trace how a hamburger becomes energy. 3) Interactive models: Build 3D models of mitochondria or act out the process. 4) Real-world connections: Discuss athletes' energy needs, weight loss, and metabolism. 5) Technology: Use animations, apps, or virtual labs. 6) Hands-on activities: Measure breathing rates before/after exercise. 7) Gamification: Create a board game where students move through the stages. 8) Personal relevance: Calculate their own daily energy needs. 9) Current research: Discuss new discoveries about mitochondria. 10) Creative projects: Have students create songs, videos, or stories about cellular respiration."
  }
];

  // Use real data if available, otherwise use fallback
  const displayChats = todaySubjectTeacherChats.length > 0 ? todaySubjectTeacherChats : fallbackChats;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Subject Teacher AI Chat Tracker
            </h1>
            <p className="text-muted-foreground">Today's AI chat conversations and lesson planning assistance</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-purple-600">{displayChats.length}</div>
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
        {displayChats.map((chat, index) => (
          <Card key={chat.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium">{'teacher' in chat ? chat.teacher : chat.userName}</div>
                    <div className="text-sm text-muted-foreground">{'subject' in chat ? `${chat.subject} • ` : ''}{chat.time}</div>
                  </div>
                </div>
                <Badge variant="outline">{chat.model}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Teacher Prompt */}
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-purple-600" />
                  <span className="font-medium text-purple-800">Teacher Prompt:</span>
                </div>
                <p className="text-purple-900">{chat.prompt}</p>
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
              <div className="text-2xl font-bold text-purple-600">{displayChats.length}</div>
              <div className="text-sm text-muted-foreground">Total Conversations</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {displayChats.filter(chat => chat.model === 'ChatGPT').length}
              </div>
              <div className="text-sm text-muted-foreground">ChatGPT Usage</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {displayChats.filter(chat => chat.model === 'Gemini').length}
              </div>
              <div className="text-sm text-muted-foreground">Gemini Usage</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {displayChats.filter(chat => chat.model === 'DeepSeek').length}
              </div>
              <div className="text-sm text-muted-foreground">DeepSeek Usage</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
