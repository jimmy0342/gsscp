import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Settings, 
  MessageSquare, 
  Brain,
  Loader2,
  Copy,
  Check,
  RefreshCw,
  Download,
  Share2,
  BookOpen,
  Calculator,
  Lightbulb,
  Target,
  Zap,
  Clock,
  FileText,
  TrendingUp
} from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
}

interface ChatSession {
  id: string;
  title: string;
  timestamp: Date;
  messageCount: number;
  model: string;
}

interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  isFree: boolean;
  maxTokens: number;
  capabilities: string[];
}

const aiModels: AIModel[] = [
  {
    id: "mistralai/mistral-small-3.2-24b-instruct:free",
    name: "Mistral Small 3.2 24B",
    provider: "Mistral AI",
    description: "Fast and efficient model for general tasks",
    isFree: true,
    maxTokens: 1000,
    capabilities: ["General Q&A", "Homework Help", "Concept Explanation"]
  },
  {
    id: "openai/gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    description: "Most advanced GPT model with multimodal capabilities",
    isFree: true,
    maxTokens: 4000,
    capabilities: ["Advanced Reasoning", "Multimodal", "Creative Writing", "Problem Solving"]
  },
  {
    id: "openai/gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "OpenAI",
    description: "Fast and efficient GPT-4o variant",
    isFree: true,
    maxTokens: 3000,
    capabilities: ["Fast Response", "General Q&A", "Creative Tasks"]
  },
  {
    id: "openai/gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    provider: "OpenAI",
    description: "Balanced performance and speed",
    isFree: true,
    maxTokens: 2000,
    capabilities: ["Advanced Reasoning", "Creative Writing", "Problem Solving"]
  },
  {
    id: "anthropic/claude-3.5-sonnet-20241022",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    description: "Advanced reasoning and analysis",
    isFree: true,
    maxTokens: 3000,
    capabilities: ["Deep Analysis", "Research", "Critical Thinking"]
  },
  {
    id: "anthropic/claude-3-haiku-20240307",
    name: "Claude 3 Haiku",
    provider: "Anthropic",
    description: "Fast and efficient Claude model",
    isFree: true,
    maxTokens: 2000,
    capabilities: ["Quick Responses", "General Q&A", "Basic Analysis"]
  },
  {
    id: "google/gemini-pro",
    name: "Gemini Pro",
    provider: "Google",
    description: "Multimodal understanding and generation",
    isFree: true,
    maxTokens: 2500,
    capabilities: ["Multimodal", "Code Generation", "Creative Tasks"]
  },
  {
    id: "meta-llama/llama-3.1-8b-instruct",
    name: "Llama 3.1 8B",
    provider: "Meta",
    description: "Efficient open-source model for general tasks",
    isFree: true,
    maxTokens: 1500,
    capabilities: ["General Q&A", "Text Generation", "Basic Reasoning"]
  },
  {
    id: "meta-llama/llama-3.1-70b-instruct",
    name: "Llama 3.1 70B",
    provider: "Meta",
    description: "High-performance open-source model",
    isFree: true,
    maxTokens: 3000,
    capabilities: ["Advanced Reasoning", "Complex Analysis", "Creative Writing"]
  }
];

const studyCategories = [
  { name: "Mathematics", icon: Calculator, color: "text-blue-600" },
  { name: "Science", icon: Lightbulb, color: "text-green-600" },
  { name: "Literature", icon: BookOpen, color: "text-purple-600" },
  { name: "History", icon: Target, color: "text-red-600" },
  { name: "Computer Science", icon: Zap, color: "text-orange-600" },
  { name: "General", icon: Brain, color: "text-indigo-600" }
];

const OPENROUTER_API_KEY = "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";

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI study assistant. I can help you with homework, explain concepts, solve problems, and answer questions. What would you like to learn about today?",
      timestamp: new Date(),
      model: "Mistral Small 3.2 24B"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState("mistralai/mistral-small-3.2-24b-instruct:free");
  const [isLoading, setIsLoading] = useState(false);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "Math Help Session",
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      messageCount: 8,
      model: "Mistral Small 3.2 24B"
    },
    {
      id: "2",
      title: "Science Questions",
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      messageCount: 12,
      model: "Claude 3.5 Sonnet"
    }
  ]);
  const [activeTab, setActiveTab] = useState("chat");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
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
          "X-Title": "AI Student Card"
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [
            {
              role: "system",
              content: `You are a helpful AI study assistant for students. You specialize in ${selectedCategory.toLowerCase()} subjects. Provide clear, educational, and supportive responses. Help with homework, explain concepts, solve problems, and encourage learning. Always be encouraging and patient. Format your responses in a clear, structured way when appropriate.`
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
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.choices[0]?.message?.content || "Sorry, I couldn't generate a response. Please try again.",
        timestamp: new Date(),
        model: aiModels.find(m => m.id === selectedModel)?.name
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, I encountered an error while processing your request. Please check your connection and try again.",
        timestamp: new Date(),
        model: aiModels.find(m => m.id === selectedModel)?.name
      };
      setMessages(prev => [...prev, errorMessage]);
      toast.error("Failed to send message. Please try again.");
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

  const clearChat = () => {
    // Save current chat to history if it has more than 1 message
    if (messages.length > 1) {
      const newSession: ChatSession = {
        id: Date.now().toString(),
        title: messages[1]?.content.slice(0, 50) + "..." || "New Chat",
        timestamp: new Date(),
        messageCount: messages.length - 1,
        model: selectedModelData?.name || "Unknown"
      };
      setChatSessions(prev => [newSession, ...prev]);
    }

    setMessages([
      {
        id: "1",
        role: "assistant",
        content: "Hello! I'm your AI study assistant. I can help you with homework, explain concepts, solve problems, and answer questions. What would you like to learn about today?",
        timestamp: new Date(),
        model: "Mistral Small 3.2 24B"
      }
    ]);
    toast.success("Chat cleared and saved to history!");
  };

  const exportChat = () => {
    const chatContent = messages.map(msg => 
      `${msg.role === 'user' ? 'You' : 'AI'}: ${msg.content}\n\n`
    ).join('');
    
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-chat-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Chat exported successfully!");
  };

  const selectedModelData = aiModels.find(model => model.id === selectedModel);

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          AI Study Assistant
        </h1>
        <p className="text-muted-foreground">Chat with AI models to get help with your studies</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Live Chat
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Chat History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* AI Models Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              <Card className="bg-gradient-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    AI Models
                  </CardTitle>
                  <CardDescription>Choose your preferred AI assistant</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select AI Model" />
                    </SelectTrigger>
                    <SelectContent>
                      {aiModels.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          <div className="flex items-center gap-2">
                            <span>{model.name}</span>
                            {model.isFree && (
                              <Badge variant="secondary" className="text-xs">Free</Badge>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedModelData && (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium">{selectedModelData.name}</p>
                      <p className="text-xs text-muted-foreground">{selectedModelData.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Provider: {selectedModelData.provider}
                      </p>
                      <div className="mt-2 space-y-1">
                        {selectedModelData.capabilities.map((capability, index) => (
                          <Badge key={index} variant="outline" className="text-xs mr-1">
                            {capability}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}



                  <div className="space-y-2">
                    <label className="text-sm font-medium">Study Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {studyCategories.map((category) => (
                          <SelectItem key={category.name} value={category.name}>
                            <div className="flex items-center gap-2">
                              <category.icon className={`h-4 w-4 ${category.color}`} />
                              {category.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={clearChat}
                      className="flex-1"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Clear
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={exportChat}
                      className="flex-1"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-3">
              <Card className="bg-gradient-card shadow-card h-[600px] flex flex-col">
                <CardHeader className="border-b">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Chat with {selectedModelData?.name}
                  </CardTitle>
                  <CardDescription>
                    Ask questions, get help with homework, or discuss any topic
                  </CardDescription>
                </CardHeader>

                {/* Messages Area */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 group ${
                          message.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        {message.role === "assistant" && (
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Bot className="h-4 w-4 text-primary" />
                          </div>
                        )}
                        
                        <div
                          className={`max-w-[80%] rounded-lg p-3 relative ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
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
                          
                          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <span>{message.timestamp.toLocaleTimeString()}</span>
                            {message.model && (
                              <Badge variant="outline" className="text-xs">
                                {message.model}
                              </Badge>
                            )}
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
                      <div className="flex gap-3 justify-start">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                        <div className="bg-muted rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-sm">AI is thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Textarea
                      ref={textareaRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about your studies..."
                      className="min-h-[60px] max-h-[120px] resize-none"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isLoading}
                      className="px-4 self-end"
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Press Enter to send, Shift+Enter for new line
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Chat History
              </CardTitle>
              <CardDescription>Your previous study sessions and conversations</CardDescription>
            </CardHeader>
            <CardContent>
              {chatSessions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No chat history yet. Start a conversation to see it here!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {chatSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-4 border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-primary/10">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{session.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{session.timestamp.toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{session.messageCount} messages</span>
                            <span>•</span>
                            <Badge variant="outline" className="text-xs">
                              {session.model}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Resume
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            Quick Study Prompts
          </CardTitle>
          <CardDescription>Click on any prompt to start a conversation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              "Help me understand quadratic equations",
              "Explain the water cycle in simple terms",
              "How do I write a good essay introduction?",
              "What are the main causes of World War II?",
              "Help me solve this math problem step by step",
              "Explain photosynthesis for my biology test"
            ].map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="h-auto p-3 text-left justify-start"
                onClick={() => {
                  setInputMessage(prompt);
                  setActiveTab("chat");
                  textareaRef.current?.focus();
                }}
                disabled={isLoading}
              >
                {prompt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
