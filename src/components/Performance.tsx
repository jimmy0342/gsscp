import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { BookOpen, TrendingUp, Users, Award } from "lucide-react";

const subjectMarks = [
  { subject: 'Mathematics', marks: 85, total: 100 },
  { subject: 'Physics', marks: 78, total: 100 },
  { subject: 'Chemistry', marks: 92, total: 100 },
  { subject: 'English', marks: 88, total: 100 },
  { subject: 'Computer Science', marks: 94, total: 100 },
  { subject: 'Biology', marks: 76, total: 100 },
];

const monthlyProgress = [
  { month: 'Jan', percentage: 78 },
  { month: 'Feb', percentage: 82 },
  { month: 'Mar', percentage: 85 },
  { month: 'Apr', percentage: 88 },
  { month: 'May', percentage: 92 },
  { month: 'Jun', percentage: 89 },
];

const attendanceData = [
  { name: 'Present', value: 85, color: '#22c55e' },
  { name: 'Absent', value: 10, color: '#ef4444' },
  { name: 'Late', value: 5, color: '#f59e0b' },
];

const activities = [
  { activity: 'Science Fair', participation: 'Winner', date: '2024-03-15' },
  { activity: 'Math Olympiad', participation: 'Participant', date: '2024-04-20' },
  { activity: 'Sports Day', participation: '2nd Place', date: '2024-05-10' },
  { activity: 'Cultural Program', participation: 'Organizer', date: '2024-06-05' },
];

export default function Performance() {
  const totalAttendance = attendanceData.reduce((sum, item) => sum + item.value, 0);
  const presentPercentage = (attendanceData[0].value / totalAttendance) * 100;

  return (
    <div className="min-h-screen bg-gradient-subtle p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Academic Performance
        </h1>
        <p className="text-muted-foreground">Track your academic progress and achievements</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overall Grade</p>
                <p className="text-2xl font-bold">A+</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Marks</p>
                <p className="text-2xl font-bold">86.8%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Users className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Attendance</p>
                <p className="text-2xl font-bold">{presentPercentage.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Award className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Class Rank</p>
                <p className="text-2xl font-bold">3rd</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="subjects" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="subjects">Subject Performance</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="progress">Monthly Progress</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
        </TabsList>

        <TabsContent value="subjects" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
              <CardHeader>
                <CardTitle>Subject-wise Performance</CardTitle>
                <CardDescription>Current semester marks</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={subjectMarks}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="marks" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
              <CardHeader>
                <CardTitle>Subject Details</CardTitle>
                <CardDescription>Detailed breakdown of marks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {subjectMarks.map((subject) => (
                  <div key={subject.subject} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{subject.subject}</span>
                      <Badge variant={subject.marks >= 90 ? "default" : subject.marks >= 80 ? "secondary" : "outline"}>
                        {subject.marks}/{subject.total}
                      </Badge>
                    </div>
                    <Progress value={subject.marks} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6">
          <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
              <CardDescription>Your attendance statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={attendanceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {attendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
            <CardHeader>
              <CardTitle>Monthly Progress Trend</CardTitle>
              <CardDescription>Your performance over the months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="percentage" stroke="hsl(var(--primary))" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
            <CardHeader>
              <CardTitle>Co-curricular Activities</CardTitle>
              <CardDescription>Your participation and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                    <div>
                      <h4 className="font-medium">{activity.activity}</h4>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                    </div>
                    <Badge variant={activity.participation.includes('Winner') ? "default" : "secondary"}>
                      {activity.participation}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}