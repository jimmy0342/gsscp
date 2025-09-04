import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function ContactUs() {
  const [role, setRole] = useState<string>("subject-teacher");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !subject || !message) {
      toast.error("Please fill all fields.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create message object
      const newMessage = {
        id: Date.now().toString(),
        name,
        email,
        recipient: role,
        subject,
        message,
        timestamp: new Date(),
        status: 'sent' as const
      };
      
      // Save message to localStorage
      const existingMessages = JSON.parse(localStorage.getItem('studentMessages') || '[]');
      const updatedMessages = [...existingMessages, newMessage];
      localStorage.setItem('studentMessages', JSON.stringify(updatedMessages));
      
      // Simulate sending the message (replace with actual API call)
      console.log("Sending message:", newMessage);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Your message has been sent to the selected recipient. You can view it in Student Messages.");
      
      // Clear form after successful submission
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setRole("subject-teacher");
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("Error sending message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">Contact Us</h1>
        <p className="text-muted-foreground">Reach out to your Subject Teacher, Class Teacher, or Admin</p>
        <div className="flex justify-center">
          <Button variant="outline" asChild>
            <a href="/messages">View Your Messages</a>
          </Button>
        </div>
      </div>



      <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Send a Message</span>
              <Badge variant="secondary">Student Support</Badge>
            </CardTitle>
            <CardDescription>We typically respond within 24 hours.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="grid md:grid-cols-2 gap-3">
                <Input 
                  placeholder="Your Name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                />
                <Input 
                  placeholder="Your Email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="Select recipient" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="subject-teacher">Subject Teacher</SelectItem>
                    <SelectItem value="class-teacher">Class Teacher</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <Input 
                  placeholder="Subject" 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <Textarea
                placeholder="Write your message..."
                className="min-h-[140px] resize-y"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />

              <div className="flex items-center justify-end gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  disabled={isSubmitting}
                  onClick={() => { 
                    setName(""); 
                    setEmail(""); 
                    setSubject(""); 
                    setMessage(""); 
                    setRole("subject-teacher"); 
                  }}
                >
                  Clear
                </Button>
                <Button 
                  type="submit" 
                  className="px-6" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Quick Contacts</CardTitle>
              <CardDescription>Department emails</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center justify-between"><span>Subject Teacher</span><span>subject@school.edu</span></div>
              <div className="flex items-center justify-between"><span>Class Teacher</span><span>class@school.edu</span></div>
              <div className="flex items-center justify-between"><span>Admin Office</span><span>admin@school.edu</span></div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Office Hours</CardTitle>
              <CardDescription>Mon–Fri</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <div className="flex items-center justify-between border-b py-2"><span>Morning</span><span>09:00 – 12:30</span></div>
              <div className="flex items-center justify-between border-b py-2"><span>Afternoon</span><span>14:00 – 17:00</span></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


