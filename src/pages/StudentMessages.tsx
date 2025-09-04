import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Search, Filter, MessageSquare, Clock, User, Mail } from "lucide-react";

interface StudentMessage {
  id: string;
  name: string;
  email: string;
  recipient: string;
  subject: string;
  message: string;
  timestamp: Date;
  status: 'sent' | 'read' | 'replied';
}

export default function StudentMessages() {
  const [messages, setMessages] = useState<StudentMessage[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRecipient, setFilterRecipient] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('studentMessages');
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
      setMessages(parsedMessages);
    }
  }, []);

  // Filter messages based on search and filter criteria
  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRecipient = filterRecipient === "all" || message.recipient === filterRecipient;
    const matchesStatus = filterStatus === "all" || message.status === filterStatus;
    
    return matchesSearch && matchesRecipient && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge variant="secondary">Sent</Badge>;
      case 'read':
        return <Badge variant="default">Read</Badge>;
      case 'replied':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Replied</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getRecipientDisplayName = (recipient: string) => {
    switch (recipient) {
      case 'subject-teacher':
        return 'Subject Teacher';
      case 'class-teacher':
        return 'Class Teacher';
      case 'admin':
        return 'Admin';
      default:
        return recipient;
    }
  };

  const clearAllMessages = () => {
    if (messages.length === 0) {
      toast.info("No messages to clear.");
      return;
    }
    
    setMessages([]);
    localStorage.removeItem('studentMessages');
    toast.success("All messages have been cleared.");
  };

  const deleteMessage = (messageId: string) => {
    const updatedMessages = messages.filter(msg => msg.id !== messageId);
    setMessages(updatedMessages);
    localStorage.setItem('studentMessages', JSON.stringify(updatedMessages));
    toast.success("Message deleted successfully.");
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Student Messages
        </h1>
        <p className="text-muted-foreground">
          View and manage all your sent messages
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Search and Filter Controls */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Message Management
            </CardTitle>
            <CardDescription>
              Search and filter your messages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={filterRecipient} onValueChange={setFilterRecipient}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by recipient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Recipients</SelectItem>
                  <SelectItem value="subject-teacher">Subject Teacher</SelectItem>
                  <SelectItem value="class-teacher">Class Teacher</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="replied">Replied</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                onClick={clearAllMessages}
                disabled={messages.length === 0}
              >
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Messages List */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>
              Your Messages ({filteredMessages.length})
            </CardTitle>
            <CardDescription>
              {messages.length === 0 
                ? "No messages sent yet. Go to Contact Us to send your first message."
                : `Showing ${filteredMessages.length} of ${messages.length} messages`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredMessages.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {messages.length === 0 ? "No messages yet" : "No messages match your filters"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {messages.length === 0 
                    ? "Start a conversation by sending a message to your teachers or admin."
                    : "Try adjusting your search terms or filters."
                  }
                </p>
                {messages.length === 0 && (
                  <Button asChild>
                    <a href="/contact">Send First Message</a>
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredMessages.map((message) => (
                  <Card key={message.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-full">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{message.name}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Mail className="h-3 w-3" />
                              {message.email}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(message.status)}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteMessage(message.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium">To:</span>
                          <Badge variant="outline">
                            {getRecipientDisplayName(message.recipient)}
                          </Badge>
                        </div>
                        <h5 className="font-medium text-lg mb-2">{message.subject}</h5>
                        <p className="text-muted-foreground leading-relaxed">
                          {message.message}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>
                          Sent on {message.timestamp.toLocaleDateString()} at {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

