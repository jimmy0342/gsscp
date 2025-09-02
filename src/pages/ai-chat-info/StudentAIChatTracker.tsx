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

export default function StudentAIChatTracker() {
  const [todayStudentChats, setTodayStudentChats] = useState<ChatMessage[]>([]);

  useEffect(() => {
    // Get today's student chats from storage
    const chats = chatStorage.getTodayChatsByUserType('student');
    setTodayStudentChats(chats);
    
    // Set up interval to refresh data every 5 seconds
    const interval = setInterval(() => {
      const updatedChats = chatStorage.getTodayChatsByUserType('student');
      setTodayStudentChats(updatedChats);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Mock data for today's student AI chats (fallback if no real data)
  const fallbackChats = [
  {
    id: 1,
    student: "John Doe",
    time: "09:15 AM",
    model: "ChatGPT",
    prompt: "Can you explain the concept of derivatives in calculus?",
    aiResponse: "Derivatives in calculus represent the rate of change of a function at any given point. They measure how a function's output changes as its input changes. The derivative of a function f(x) at a point x = a is the slope of the tangent line to the graph of f at that point. This is calculated as the limit of the difference quotient as h approaches 0: f'(a) = lim(h→0) [f(a+h) - f(a)]/h. Derivatives have many applications in physics, engineering, and economics for modeling rates of change."
  },
  {
    id: 2,
    student: "Sarah Wilson",
    time: "10:30 AM",
    model: "Gemini",
    prompt: "What are the main differences between mitosis and meiosis?",
    aiResponse: "Mitosis and meiosis are two types of cell division with key differences: Mitosis produces two identical daughter cells with the same number of chromosomes (2n), while meiosis produces four genetically different daughter cells with half the chromosome number (n). Mitosis occurs in somatic cells for growth and repair, while meiosis occurs in germ cells for sexual reproduction. Mitosis has one division, meiosis has two divisions. Mitosis maintains genetic stability, meiosis creates genetic diversity through crossing over and independent assortment."
  },
  {
    id: 3,
    student: "Mike Johnson",
    time: "11:45 AM",
    model: "DeepSeek",
    prompt: "How do I solve quadratic equations using the quadratic formula?",
    aiResponse: "The quadratic formula is x = (-b ± √(b² - 4ac)) / (2a), where ax² + bx + c = 0. To use it: 1) Identify a, b, and c from your equation, 2) Substitute these values into the formula, 3) Calculate the discriminant (b² - 4ac), 4) If discriminant > 0, you get two real solutions, if = 0, one real solution, if < 0, two complex solutions. Example: For x² + 5x + 6 = 0, a=1, b=5, c=6. So x = (-5 ± √(25-24)) / 2 = (-5 ± 1) / 2, giving x = -2 or x = -3."
  },
  {
    id: 4,
    student: "Emily Brown",
    time: "02:15 PM",
    model: "ChatGPT",
    prompt: "What are the key themes in Shakespeare's Romeo and Juliet?",
    aiResponse: "Romeo and Juliet explores several key themes: Love vs. Hate - the passionate love between the protagonists contrasts with the hatred between their families. Fate vs. Free Will - the characters struggle against predetermined destiny. Youth vs. Age - the impulsive young lovers versus the cautious older generation. Light vs. Darkness - imagery used to represent love and death. The destructive nature of feuds and the power of love to overcome obstacles. The play also examines the consequences of hasty decisions and the role of chance in human affairs."
  },
  {
    id: 5,
    student: "Alex Thompson",
    time: "03:30 PM",
    model: "Gemini",
    prompt: "How does photosynthesis work?",
    aiResponse: "Photosynthesis is the process by which plants convert light energy into chemical energy. It occurs in chloroplasts and involves two main stages: Light-dependent reactions capture light energy to produce ATP and NADPH, while light-independent reactions (Calvin cycle) use these products to convert CO2 into glucose. The overall equation is: 6CO2 + 6H2O + light energy → C6H12O6 + 6O2. Chlorophyll absorbs light, water is split to release oxygen, and carbon dioxide is reduced to form glucose. This process is essential for life on Earth as it produces oxygen and forms the base of most food chains."
  }
  ];

  // Use real data if available, otherwise use fallback
  const displayChats = todayStudentChats.length > 0 ? todayStudentChats : fallbackChats;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Student AI Chat Tracker
            </h1>
            <p className="text-muted-foreground">Today's AI chat conversations and interactions</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{displayChats.length}</div>
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
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{'student' in chat ? chat.student : chat.userName}</div>
                    <div className="text-sm text-muted-foreground">{chat.time}</div>
                  </div>
                </div>
                <Badge variant="outline">{chat.model}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Student Prompt */}
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-800">Student Prompt:</span>
                </div>
                <p className="text-blue-900">{chat.prompt}</p>
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
              <div className="text-2xl font-bold text-blue-600">{displayChats.length}</div>
              <div className="text-sm text-muted-foreground">Total Conversations</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {displayChats.filter(chat => chat.model === 'ChatGPT').length}
              </div>
              <div className="text-sm text-muted-foreground">ChatGPT Usage</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {displayChats.filter(chat => chat.model !== 'ChatGPT').length}
              </div>
              <div className="text-sm text-muted-foreground">Other Models</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
