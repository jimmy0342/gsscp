import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  Bot,
  User,
  Calculator,
  MessageSquare,
  Brain,
  Loader2,
  Copy,
  Check,
  Clock,
  BookOpen,
  Target,
  Video,
  FileText,
  Plus,
  Calendar,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isUpdate?: boolean;
  updateData?: TimetableUpdate;
}

interface TimetableUpdate {
  subject: string;
  day: string;
  time: string;
  teacher: string;
  room: string;
  topic: string;
  chapter: string;
  pages: string;
  whatWeLearned: string;
  practiceSuggestions: string;
  homework: string;
  materials: string;
  videoLink?: string;
}

const OPENROUTER_API_KEY = "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";

export default function MathTeacherTimetableChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI timetable assistant. I can help you update your class schedule and lesson details. Just tell me about your class details and I'll format them properly for the student timetable. For example, you can say: 'Update Monday 9:00 AM Math class - Chapter 8 Calculus, pages 156-172, homework exercises 1-15'",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin,
          "X-Title": "Math Teacher Timetable Assistant"
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are an AI assistant that helps math teachers update their class timetable and lesson details.

When a teacher provides class information, extract and format it into a structured timetable update with the following fields:
- Subject (Mathematics)
- Day and Time
- Teacher name
- Room number
- Topic details
- Chapter and pages
- What was learned today
- Practice suggestions
- Homework assignments
- Materials needed
- Video tutorial link (if provided)

Format the response as a structured timetable update that can be displayed to students. Be helpful and ask for clarification if needed.

Example format:
Mathematics - Monday
09:00 - 09:45 • Dr. Smith • Room 101

Topic Details
Chapter 8: Applications of Calculus
Topic: 8.2.1 Differentiation Techniques and Integration Methods
Page: 156-172

What We Learned
Today we covered advanced calculus concepts including differentiation techniques and basic integration methods.

Practice Suggestions
Complete exercises 1-15 from Chapter 8.

Homework
Solve 5 integration problems from the textbook.

Materials & Resources
Textbook Chapter 8, Calculator, Graph paper

📹 Watch Video Tutorial
[Link if provided]`
            },
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            {
              role: "user",
              content: inputMessage
            }
          ],
          stream: false,
          temperature: 0.7,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.choices[0]?.message?.content || "Sorry, I couldn't process your request. Please try again.",
        timestamp: new Date(),
        isUpdate: true
      };

      setMessages(prev => [...prev, assistantMessage]);
      toast.success("Timetable updated successfully!");
    } catch (error) {
      console.error("Error sending message:", error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, I encountered an error while processing your request. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      toast.error("Failed to update timetable. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyMessage = async (content: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(messageId);
      toast.success("Message copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      toast.error("Failed to copy message");
    }
  };

  const quickPrompts = [
    "Update Monday 9:00 AM class - Chapter 8 Calculus, pages 156-172",
    "Tomorrow's lesson: Integration techniques, homework exercises 1-15",
    "Wednesday 2:00 PM - Differentiation methods, practice problems 5-20",
    "Friday class update: Applications of derivatives, quiz preparation"
  ];

  const handleQuickPrompt = (prompt: string) => {
    setInputMessage(prompt);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-primary/10">
            <Calculator className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Math Teacher Timetable Assistant
          </h1>
        </div>
        <p className="text-muted-foreground">Update your class schedule and lesson details through AI chat</p>
      </div>

      {/* Quick Prompts */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Quick Update Prompts
          </CardTitle>
          <CardDescription>Click on any prompt to quickly update your timetable</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickPrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="h-auto p-3 text-left justify-start"
                onClick={() => handleQuickPrompt(prompt)}
                disabled={isLoading}
              >
                {prompt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="bg-gradient-card shadow-card h-[500px] flex flex-col">
        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex gap-4 group ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-xl p-4 relative ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted/50 border border-border/50 shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className={`text-base leading-relaxed whitespace-pre-wrap ${
                        message.role === "user" ? "text-primary-foreground" : "text-foreground"
                      }`}>
                        {message.content}
                      </p>

                      {/* Show update badge if it's a timetable update */}
                      {message.isUpdate && (
                        <div className="mt-3 flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Timetable Updated
                          </Badge>
                        </div>
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2"
                      onClick={() => copyMessage(message.content, message.id)}
                    >
                      {copiedId === message.id ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{message.timestamp.toLocaleTimeString()}</span>
                  </div>
                </div>

                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-secondary" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-4 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted/50 border border-border/50 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-base">Processing your timetable update...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t p-4 bg-background/50">
          <div className="flex gap-3 w-full max-w-4xl mx-auto">
            <Textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your class details (e.g., 'Monday 9:00 AM - Chapter 8 Calculus, pages 156-172, homework exercises 1-15')..."
              className="flex-1 min-h-[40px] max-h-[120px] resize-none border border-border rounded-xl text-base px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="px-6 h-10 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-sm font-medium transition-colors"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Press Enter to send • Describe your class details naturally and I'll format them for the timetable
          </p>
        </div>
      </Card>

      {/* Instructions */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            How to Update Your Timetable
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold">What to Include:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Day and time of the class
                </li>
                <li className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Chapter and topic details
                </li>
                <li className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Page numbers covered
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Homework assignments
                </li>
                <li className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-primary" />
                  Video tutorial links (optional)
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Example Format:</h4>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>"Monday 9:00 AM - Chapter 8 Calculus, pages 156-172, homework exercises 1-15, video link: https://example.com"</p>
                <p>"Tomorrow's lesson: Integration techniques, practice problems 5-20, materials: calculator and graph paper"</p>
                <p>"Wednesday 2:00 PM - Differentiation methods, quiz preparation, complete textbook problems"</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
