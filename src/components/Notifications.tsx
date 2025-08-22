import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  MessageSquare, 
  AlertCircle
} from "lucide-react";

const teacherAdvice = [
  {
    id: 1,
    teacher: "Mrs. Anderson",
    subject: "Mathematics",
    advice: "Focus on practicing quadratic equations. Your problem-solving skills are improving!",
    date: "2025-01-15",
    priority: "high"
  },
  {
    id: 2,
    teacher: "Mr. Rodriguez",
    subject: "Physics",
    advice: "Great work on the lab report! Consider joining the Science Club to enhance your practical skills.",
    date: "2025-01-12",
    priority: "medium"
  },
  {
    id: 3,
    teacher: "Ms. Thompson",
    subject: "English Literature",
    advice: "Your essay writing has shown remarkable improvement. Keep up the creative thinking!",
    date: "2025-01-10",
    priority: "low"
  },
  {
    id: 4,
    teacher: "Dr. Williams",
    subject: "Chemistry",
    advice: "Excellent lab safety practices! Your attention to detail in experiments is commendable.",
    date: "2025-01-08",
    priority: "medium"
  },
  {
    id: 5,
    teacher: "Mr. Davis",
    subject: "History",
    advice: "Your research skills have improved significantly. Consider participating in the History Fair.",
    date: "2025-01-05",
    priority: "low"
  }
];

const schoolNotifications = [
  {
    id: 1,
    title: "Fee Payment Reminder",
    message: "Second semester fees are due by January 31st, 2025. Please ensure timely payment.",
    date: "2025-01-15",
    type: "payment",
    urgent: true
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting",
    message: "Annual Parent-Teacher meeting scheduled for February 5th, 2025 at 2:00 PM.",
    date: "2025-01-14",
    type: "meeting",
    urgent: false
  },
  {
    id: 3,
    title: "Sports Day Event",
    message: "Annual Sports Day will be held on February 15th, 2025. Registration forms available at the office.",
    date: "2025-01-13",
    type: "event",
    urgent: false
  },
  {
    id: 4,
    title: "Library Book Return",
    message: "Please return all borrowed library books by January 25th, 2025 for annual inventory.",
    date: "2025-01-12",
    type: "reminder",
    urgent: false
  },
  {
    id: 5,
    title: "Exam Schedule Update",
    message: "Mid-term examinations will begin from February 20th, 2025. Detailed schedule posted on notice board.",
    date: "2025-01-11",
    type: "exam",
    urgent: true
  },
  {
    id: 6,
    title: "Cafeteria Menu Update",
    message: "New healthy menu options available from next week. Special dietary requirements can be requested.",
    date: "2025-01-10",
    type: "announcement",
    urgent: false
  }
];

export default function Notifications() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'payment': return 'text-red-600 bg-red-100';
      case 'exam': return 'text-orange-600 bg-orange-100';
      case 'meeting': return 'text-blue-600 bg-blue-100';
      case 'event': return 'text-purple-600 bg-purple-100';
      case 'reminder': return 'text-yellow-600 bg-yellow-100';
      case 'announcement': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Notifications Center
        </h1>
        <p className="text-muted-foreground">Stay updated with teacher advice and school announcements</p>
      </div>

      {/* Content in Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Teacher Advice */}
        <Card className="bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Teacher Advice
            </CardTitle>
            <CardDescription>Personalized guidance and feedback from your teachers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teacherAdvice.map((advice) => (
                <div key={advice.id} className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors border-l-4 border-primary">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{advice.teacher}</span>
                      <Badge variant="outline" className="text-xs">{advice.subject}</Badge>
                    </div>
                    <Badge 
                      className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(advice.priority)}`}
                    >
                      {advice.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{advice.advice}</p>
                  <p className="text-xs text-muted-foreground">{advice.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* School Notifications */}
        <Card className="bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-secondary" />
              School Notifications
            </CardTitle>
            <CardDescription>Important updates, announcements, and reminders for all students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schoolNotifications.map((notification) => (
                <div key={notification.id} className={`p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors border-l-4 ${
                  notification.urgent ? 'border-destructive' : 'border-secondary'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{notification.title}</span>
                      {notification.urgent && (
                        <Badge variant="destructive" className="text-xs">Urgent</Badge>
                      )}
                    </div>
                    <Badge className={`text-xs px-2 py-1 rounded-full ${getTypeColor(notification.type)}`}>
                      {notification.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{notification.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Teacher Advice</p>
                <p className="text-2xl font-bold">{teacherAdvice.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-secondary/10">
                <Bell className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">School Notifications</p>
                <p className="text-2xl font-bold">{schoolNotifications.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-destructive/10">
                <AlertCircle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Urgent Items</p>
                <p className="text-2xl font-bold">
                  {schoolNotifications.filter(n => n.urgent).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
