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
  TrendingUp,
  Plus,
  Mic,
  MicOff
} from "lucide-react";
import { toast } from "sonner";
import { chatStorage, ChatMessage } from "@/utils/chatStorage";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
  image?: string; // Base64 encoded image
  imageDescription?: string; // Description of the image for AI processing
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
    id: "openai/gpt-4o-mini",
    name: "ChatGPT",
    provider: "OpenAI",
    description: "Fast and efficient with vision capabilities",
    isFree: false,
    maxTokens: 4000,
    capabilities: ["Advanced Reasoning", "Creative Writing", "Problem Solving", "Image Analysis"]
  },
  {
    id: "google/gemini-flash-1.5",
    name: "Gemini",
    provider: "Google",
    description: "Fast and efficient Gemini model with vision",
    isFree: false,
    maxTokens: 2000,
    capabilities: ["Quick Responses", "General Q&A", "Basic Analysis", "Image Analysis"]
  },
  {
    id: "deepseek/deepseek-r1-0528:free",
    name: "DeepSeek",
    provider: "DeepSeek",
    description: "Advanced reasoning and analysis with R1 model",
    isFree: false,
    maxTokens: 3000,
    capabilities: ["Deep Analysis", "Research", "Critical Thinking"]
  },
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState("openai/gpt-3.5-turbo");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "Math Help Session",
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      messageCount: 8,
      model: "AI Assistant"
    },
    {
      id: "2",
      title: "Science Questions",
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      messageCount: 12,
      model: "AI Assistant"
    }
  ]);
  const [activeTab, setActiveTab] = useState("chat");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTo({
          top: scrollElement.scrollHeight,
          behavior: "smooth"
        });
      }
    }
  };

  useEffect(() => {
    // Only auto-scroll when new messages are added (not on initial load)
    // This ensures users see new AI responses within the chat ScrollArea only
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const selectedModelData = aiModels.find(model => model.id === selectedModel);

  // Ensure we have a valid model selected
  useEffect(() => {
    if (!selectedModelData && aiModels.length > 0) {
      setSelectedModel(aiModels[0].id);
    }
  }, [selectedModelData, aiModels]);

  // Update initial message model name when model changes
  useEffect(() => {
    if (messages.length > 0 && selectedModelData) {
      setMessages(prev => prev.map((msg, index) => 
        index === 0 
          ? { ...msg, model: selectedModelData.name }
          : msg
      ));
    }
  }, [selectedModelData]);


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

    // Log the request for debugging
    console.log("Sending message to AI model:", selectedModel);
    console.log("Messages being sent:", messages);
    console.log("Has images:", messages.some(msg => msg.image));
    
    // Check if we have images and if the model supports them
    const hasImages = messages.some(msg => msg.image);
    const selectedModelData = aiModels.find(m => m.id === selectedModel);
    const supportsVision = selectedModelData?.capabilities.includes("Image Analysis");
    
    if (hasImages && !supportsVision) {
      toast.warning("This model doesn't support image analysis. Please select GPT-4o Mini or Gemini for image support.");
      setIsLoading(false);
      return;
    }

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
              content: `You are a helpful AI study assistant. You can analyze images and read text documents to provide clear, educational responses. Help with homework, explain concepts, solve problems, and encourage learning. 

When users upload images, analyze them carefully and provide detailed help based on what you see.

When users upload text documents (.txt, .readme, .md), read the content thoroughly and provide detailed analysis, explanations, or answers to their questions about the document.

When users upload Word documents or Excel files, help them understand the content and answer questions about the documents. You can process the text content that was extracted from these files.

Always provide comprehensive, helpful responses based on the document content you can access.`
            },
            ...messages.map(msg => {
              if (msg.image) {
                // For messages with images, use the proper multimodal format
                return {
                  role: msg.role,
                  content: [
                    {
                      type: "text",
                      text: msg.content
                    },
                    {
                      type: "image_url",
                      image_url: {
                        url: msg.image,
                        detail: "high"
                      }
                    }
                  ]
                };
              } else {
                // Regular text messages
                return {
                  role: msg.role,
                  content: msg.content
                };
              }
            }),
            {
              role: "user",
              content: inputMessage
            }
          ],
          stream: false,
          temperature: 0.7,
          max_tokens: 2000,
          top_p: 0.9,
          frequency_penalty: 0.1,
          presence_penalty: 0.1
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(`API request failed: ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log("AI Response received:", data);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.choices[0]?.message?.content || "Sorry, I couldn't generate a response. Please try again.",
        timestamp: new Date(),
        model: aiModels.find(m => m.id === selectedModel)?.name
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Save chat to storage for AI Chat Info dashboard
      const chatMessage: ChatMessage = {
        id: Date.now().toString(),
        userType: 'student',
        userName: 'Student',
        time: new Date().toLocaleString(),
        model: aiModels.find(m => m.id === selectedModel)?.name || 'Unknown',
        prompt: inputMessage,
        aiResponse: data.choices[0]?.message?.content || "Sorry, I couldn't generate a response."
      };
      chatStorage.saveChat(chatMessage);
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Provide more specific error messages
      let errorContent = "I'm sorry, I encountered an error while processing your request. ";
      
      if (error instanceof Error) {
        if (error.message.includes('400')) {
          errorContent += "The request format may be incorrect. Please try rephrasing your question.";
        } else if (error.message.includes('401')) {
          errorContent += "Authentication failed. Please check your API key.";
        } else if (error.message.includes('429')) {
          errorContent += "Rate limit exceeded. Please wait a moment and try again.";
        } else if (error.message.includes('500')) {
          errorContent += "Server error. Please try again later.";
        } else {
          errorContent += "Please check your connection and try again.";
        }
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: errorContent,
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
      // Find the message to get image info if present
      const message = messages.find(msg => msg.id === messageId);
      let copyText = content;
      
      if (message?.image) {
        copyText += `\n\n[Image attached: ${message.imageDescription}]`;
      }
      
      await navigator.clipboard.writeText(copyText);
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

    setMessages([]);
    toast.success("Chat cleared and saved to history!");
  };

  const exportChat = () => {
    const chatContent = messages.map(msg => {
      let content = `${msg.role === 'user' ? 'You' : 'AI'}: ${msg.content}`;
      
      if (msg.image) {
        content += `\n[Image: ${msg.imageDescription}]\n`;
      }
      
      return content + '\n\n';
    }).join('');
    
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

  // Voice recording functionality
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };
      
      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        await processAudioToText(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      setMediaRecorder(recorder);
      setAudioChunks(chunks);
      recorder.start();
      setIsRecording(true);
      toast.success("Recording started... Speak now!");
    } catch (error) {
      console.error("Error starting recording:", error);
      toast.error("Failed to start recording. Please check microphone permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      toast.success("Recording stopped. Processing audio...");
    }
  };

  const processAudioToText = async (audioBlob: Blob) => {
    try {
      // Convert audio to text using Web Speech API
      const recognition = new (window as any).webkitSpeechRecognition() || new (window as any).SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        toast.success("Voice converted to text!");
      };
      
      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        toast.error("Voice recognition failed. Please try again.");
      };
      
      recognition.start();
      
      // Simulate processing the audio blob
      setTimeout(() => {
        recognition.stop();
      }, 1000);
      
    } catch (error) {
      console.error("Speech recognition not supported:", error);
      // Fallback: simulate voice input
      toast.info("Voice recognition not supported in this browser. Simulating voice input...");
      setTimeout(() => {
        setInputMessage("Voice input: Hello, this is a test message from voice recording.");
      }, 1000);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if it's an image file
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageData = e.target?.result as string;
          
          // Validate image data
          if (!imageData || imageData.length === 0) {
            toast.error("Failed to process image. Please try again.");
            return;
          }
          
          console.log("Image uploaded:", {
            name: file.name,
            size: file.size,
            type: file.type,
            dataLength: imageData.length
          });
          
          // Create image message with base64 data
          const imageMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: `📷 I've uploaded an image. Please analyze and help me with it.`,
            timestamp: new Date(),
            image: imageData,
            imageDescription: `Image: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`
          };
          
          setMessages(prev => [...prev, imageMessage]);
          toast.success(`Image "${file.name}" uploaded successfully!`);
        };
        
        reader.onerror = () => {
          toast.error("Failed to read image file. Please try again.");
        };
        
        reader.readAsDataURL(file);
      } else if (file.type === 'text/plain' || file.name.endsWith('.txt') || file.name.endsWith('.readme') || file.name.endsWith('.md')) {
        // Handle text files
        const reader = new FileReader();
        reader.onload = (e) => {
          const textContent = e.target?.result as string;
          
          if (!textContent || textContent.length === 0) {
            toast.error("Failed to read text file. Please try again.");
            return;
          }
          
          console.log("Text file uploaded:", {
            name: file.name,
            size: file.size,
            type: file.type,
            contentLength: textContent.length
          });
          
          // Create text file message
          const textMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: `📄 I've uploaded a text document: ${file.name}\n\nDocument content:\n${textContent}`,
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, textMessage]);
          toast.success(`Text file "${file.name}" uploaded and read successfully!`);
        };
        
        reader.onerror = () => {
          toast.error("Failed to read text file. Please try again.");
        };
        
        reader.readAsText(file);
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
                 file.type === 'application/msword' || 
                 file.name.endsWith('.docx') || 
                 file.name.endsWith('.doc')) {
        // Handle Word documents
        toast.info("Word documents are being processed... Please wait.");
        
        // For Word docs, we'll extract text content
        const reader = new FileReader();
        reader.onload = (e) => {
          // Note: This is a simplified approach. For better Word doc processing,
          // you might want to use a library like mammoth.js
          const wordMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: `📝 I've uploaded a Word document: ${file.name}\n\nNote: Word documents are supported but may need specialized processing for full text extraction. Please ask me specific questions about the document content.`,
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, wordMessage]);
          toast.success(`Word document "${file.name}" uploaded successfully!`);
        };
        
        reader.readAsArrayBuffer(file);
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                 file.type === 'application/vnd.ms-excel' || 
                 file.name.endsWith('.xlsx') || 
                 file.name.endsWith('.xls')) {
        // Handle Excel files
        toast.info("Excel files are being processed... Please wait.");
        
        const excelMessage: Message = {
          id: Date.now().toString(),
          role: "user",
          content: `📊 I've uploaded an Excel file: ${file.name}\n\nNote: Excel files are supported but may need specialized processing for full data extraction. Please ask me specific questions about the spreadsheet content.`,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, excelMessage]);
        toast.success(`Excel file "${file.name}" uploaded successfully!`);
      } else {
        // Handle other file types
        toast.success(`File "${file.name}" uploaded successfully!`);
        
        const fileMessage: Message = {
          id: Date.now().toString(),
          role: "user",
          content: `📎 Uploaded file: ${file.name} (${(file.size / 1024).toFixed(1)} KB)\n\nFile type: ${file.type || 'Unknown'}\n\nNote: This file type may need specialized processing. Please ask me specific questions about the file content.`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, fileMessage]);
      }
      
      // Reset the file input
      event.target.value = '';
    }
  };

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
          {/* ChatGPT-like Chat Interface - Compact and Page-Friendly */}
          <Card className="bg-gradient-card shadow-card h-[450px] flex flex-col w-full">
            {/* Features/Controls Area - Moved to Top */}
            <div className="border-b p-3 bg-gray-50">
              <div className="flex items-center justify-between gap-3">
                {/* Left Side: Model Selection */}
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="w-40 h-7">
                    <SelectValue placeholder="Select AI Model" />
                  </SelectTrigger>
                  <SelectContent>
                    {aiModels.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        <div className="flex items-center gap-2">
                          <span>{model.name}</span>
                          {model.isFree && (
                            <Badge variant="secondary" className="text-xs">Pro</Badge>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Right Side: Study Category and Chat Controls */}
                <div className="flex items-center gap-2">
                  {/* Study Category */}
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-32 h-7">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {studyCategories.map((category) => (
                        <SelectItem key={category.name} value={category.name}>
                          <div className="flex items-center gap-2">
                            <category.icon className={`h-3 w-3 ${category.color}`} />
                            {category.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Chat Controls */}
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={clearChat}
                      className="h-7 px-2 text-xs"
                    >
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Clear
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={exportChat}
                      className="h-7 px-2 text-xs"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Area - ChatGPT-like Layout */}
            <ScrollArea ref={scrollAreaRef} className="flex-1 p-3">
              <div className="space-y-4 max-w-4xl mx-auto">
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <Bot className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                    <h3 className="text-base font-medium text-muted-foreground mb-2">How can I help you today?</h3>
                    <p className="text-sm text-muted-foreground">Ask me anything about your studies, and I'll help you learn!</p>
                  </div>
                ) : (
                  <>
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
                          className={`max-w-[85%] rounded-xl p-6 md:p-4 relative ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "bg-muted/50 border border-border/50 shadow-sm"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <p className={`text-lg md:text-base leading-relaxed whitespace-pre-wrap ${
                                message.role === "user" ? "text-primary-foreground" : "text-foreground"
                              }`}>
                                {message.content}
                              </p>
                              
                              {/* Display image if present */}
                              {message.image && (
                                <div className="mt-3">
                                  <img 
                                    src={message.image} 
                                    alt="Uploaded content"
                                    className="max-w-full h-auto rounded-lg border border-border/30 shadow-sm"
                                    style={{ maxHeight: '300px' }}
                                  />
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
                          
                          <div className="flex items-center gap-2 mt-3 text-sm md:text-xs text-muted-foreground">
                            <span>{message.timestamp.toLocaleTimeString()}</span>
                            {message.model && (
                              <Badge variant="outline" className="text-sm md:text-xs">
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
                  </>
                )}
                
                {isLoading && (
                  <div className="flex gap-4 justify-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-muted/50 border border-border/50 rounded-xl p-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                        <span className="text-base">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area - ChatGPT-like Prominent Input */}
            <div className="border-t p-4 md:p-3 bg-background/50">
              {/* Desktop layout (unchanged): Upload, Text Input, Voice, Send in one row */}
              <div className="hidden md:flex gap-3 w-full max-w-4xl mx-auto">
                {/* File Upload Button - Left Side (desktop) */}
                <div className="relative">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept="image/*,.pdf,.doc,.docx,.txt,.readme,.md,.xlsx,.xls"
                    multiple={false}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-10 w-10 p-0 border border-border rounded-xl hover:bg-orange-600 hover:border-orange-700 transition-colors"
                    title="Upload file"
                    onClick={() => {
                      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
                      if (fileInput) {
                        fileInput.click();
                      }
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Text Input */}
                <Textarea
                  ref={textareaRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about your studies..."
                  className="flex-1 md:min-h-[40px] md:max-h-[120px] resize-none border border-border rounded-xl md:text-base md:px-4 md:py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  disabled={isLoading}
                />

                {/* Voice Recording Button */}
                <Button
                  type="button"
                  variant={isRecording ? "destructive" : "outline"}
                  size="sm"
                  className="md:h-10 md:w-10 p-0 border border-border rounded-xl hover:bg-orange-600 hover:border-orange-700 transition-colors"
                  onClick={isRecording ? stopRecording : startRecording}
                  title={isRecording ? "Stop recording" : "Start voice recording"}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : isRecording ? (
                    <MicOff className="h-4 w-4" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>

                {/* Send Button */}
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="md:px-6 md:h-10 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl md:text-sm font-medium transition-colors"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* Mobile layout: textarea full width, buttons at bottom row */}
              <div className="flex md:hidden flex-col gap-4 w-full max-w-4xl mx-auto">
                <Textarea
                  ref={textareaRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about your studies..."
                  className="w-full min-h-[60px] max-h-[200px] resize-none border border-border rounded-xl text-base px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  disabled={isLoading}
                />

                <div className="flex items-center justify-end gap-4">
                  {/* Upload */}
                  <div className="relative">
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept="image/*,.pdf,.doc,.docx,.txt,.readme,.md,.xlsx,.xls"
                      multiple={false}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-12 w-12 p-0 border border-border rounded-xl hover:bg-orange-600 hover:border-orange-700 transition-colors"
                      title="Upload file"
                      onClick={() => {
                        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
                        if (fileInput) {
                          fileInput.click();
                        }
                      }}
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Voice */}
                  <Button
                    type="button"
                    variant={isRecording ? "destructive" : "outline"}
                    size="sm"
                    className="h-12 w-12 p-0 border border-border rounded-xl hover:bg-orange-600 hover:border-orange-700 transition-colors"
                    onClick={isRecording ? stopRecording : startRecording}
                    title={isRecording ? "Stop recording" : "Start voice recording"}
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : isRecording ? (
                      <MicOff className="h-5 w-5" />
                    ) : (
                      <Mic className="h-5 w-5" />
                    )}
                  </Button>

                  {/* Send */}
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="px-8 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-base font-medium transition-colors"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>

              <p className="text-sm md:text-xs text-muted-foreground mt-3 text-center">
                Press Enter to send, Shift+Enter for new line • Click + to upload images, documents, or files • Click 🎤 for voice input
              </p>
            </div>
          </Card>

          {/* Remove the old controls section since they're now integrated above */}
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
