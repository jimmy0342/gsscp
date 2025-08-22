import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, 
  GraduationCap, 
  BarChart3, 
  Calendar, 
  BookOpen, 
  Trophy,
  TrendingUp,
  Clock,
  Star,
  Brain
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-education.jpg";

const quickStats = [
  {
    title: "Overall Grade",
    value: "A+",
    change: "+2.5%",
    icon: Star,
    color: "text-accent"
  },
  {
    title: "Attendance",
    value: "94%",
    change: "+1.2%",
    icon: Clock,
    color: "text-secondary"
  },
  {
    title: "Assignments",
    value: "12/15",
    change: "3 pending",
    icon: BookOpen,
    color: "text-primary"
  },
  {
    title: "AI Sessions",
    value: "8",
    change: "This week",
    icon: Brain,
    color: "text-primary"
  }
];

const quickActions = [
  {
    title: "View Profile",
    description: "Update your personal information",
    icon: User,
    href: "/profile",
    variant: "default" as const
  },
  {
    title: "Check Performance",
    description: "Review your academic progress",
    icon: BarChart3,
    href: "/performance",
    variant: "secondary" as const
  },
  {
    title: "Today's Schedule",
    description: "View your class timetable",
    icon: Calendar,
    href: "/timetable",
    variant: "accent" as const
  },
  {
    title: "Download Notes",
    description: "Access subject materials",
    icon: BookOpen,
    href: "/notes",
    variant: "hero" as const
  },
  {
    title: "AI Study Assistant",
    description: "Get help with AI-powered tutoring",
    icon: Brain,
    href: "/ai-chat",
    variant: "default" as const
  }
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-hero shadow-elegant">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Education Hero" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-hero/90" />
        </div>
        <div className="relative px-8 py-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to Your Academic Journey
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Track your progress, manage your studies, and achieve excellence in your educational pursuits.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/profile">
                <User className="mr-2 h-5 w-5" />
                View Profile
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/performance">
                <BarChart3 className="mr-2 h-5 w-5" />
                Check Performance
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={stat.title} className="bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                </div>
                <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action, index) => (
            <Card key={action.title} className="bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-muted">
                    <action.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant={action.variant} asChild className="w-full">
                  <Link to={action.href}>
                    Get Started
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
          <CardDescription>Your latest academic updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              <div className="p-2 rounded-full bg-secondary text-secondary-foreground">
                <Trophy className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Mathematics Test Result</p>
                <p className="text-sm text-muted-foreground">Scored 98% - Excellent performance!</p>
              </div>
              <span className="text-sm text-muted-foreground">2 hours ago</span>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              <div className="p-2 rounded-full bg-primary text-primary-foreground">
                <BookOpen className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="font-medium">New Study Material Added</p>
                <p className="text-sm text-muted-foreground">Physics Chapter 7 notes are now available</p>
              </div>
              <span className="text-sm text-muted-foreground">1 day ago</span>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              <div className="p-2 rounded-full bg-accent text-accent-foreground">
                <Calendar className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Schedule Updated</p>
                <p className="text-sm text-muted-foreground">Chemistry lab session moved to Friday</p>
              </div>
              <span className="text-sm text-muted-foreground">3 days ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}