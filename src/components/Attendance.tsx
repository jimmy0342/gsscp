import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, CheckCircle, XCircle, Clock, Calendar } from "lucide-react";

const monthlyAttendance = [
  { month: "January", present: 22, absent: 2, late: 1, total: 25, percentage: 88 },
  { month: "February", present: 20, absent: 1, late: 2, total: 23, percentage: 87 },
  { month: "March", present: 24, absent: 3, late: 1, total: 28, percentage: 86 },
  { month: "April", present: 21, absent: 2, late: 0, total: 23, percentage: 91 },
  { month: "May", present: 26, absent: 1, late: 2, total: 29, percentage: 90 },
  { month: "June", present: 23, absent: 0, late: 1, total: 24, percentage: 96 },
];

const overallStats = {
  totalDays: 152,
  presentDays: 136,
  absentDays: 9,
  lateDays: 7,
  overallPercentage: 89
};

const recentAttendance = [
  { date: "2024-06-28", status: "Present", subject: "Mathematics", time: "09:00 AM" },
  { date: "2024-06-27", status: "Present", subject: "Physics", time: "10:30 AM" },
  { date: "2024-06-26", status: "Late", subject: "Chemistry", time: "11:15 AM" },
  { date: "2024-06-25", status: "Present", subject: "English", time: "02:00 PM" },
  { date: "2024-06-24", status: "Absent", subject: "Biology", time: "-" },
];

export default function Attendance() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present": return "text-emerald-600";
      case "Absent": return "text-red-600";
      case "Late": return "text-amber-600";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Present": return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      case "Absent": return <XCircle className="h-4 w-4 text-red-600" />;
      case "Late": return <Clock className="h-4 w-4 text-amber-600" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Attendance Tracker
        </h1>
        <p className="text-muted-foreground">Monitor your class attendance and punctuality</p>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <CalendarDays className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Days</p>
                <p className="text-2xl font-bold">{overallStats.totalDays}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Present</p>
                <p className="text-2xl font-bold">{overallStats.presentDays}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Absent</p>
                <p className="text-2xl font-bold">{overallStats.absentDays}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Late</p>
                <p className="text-2xl font-bold">{overallStats.lateDays}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Percentage */}
      <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
        <CardHeader>
          <CardTitle>Overall Attendance Percentage</CardTitle>
          <CardDescription>Your attendance performance this academic year</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Attendance Rate</span>
              <span className="text-2xl font-bold text-primary">{overallStats.overallPercentage}%</span>
            </div>
            <Progress value={overallStats.overallPercentage} className="h-3" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Present</p>
                <p className="font-medium text-emerald-600">{((overallStats.presentDays / overallStats.totalDays) * 100).toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Absent</p>
                <p className="font-medium text-red-600">{((overallStats.absentDays / overallStats.totalDays) * 100).toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Late</p>
                <p className="font-medium text-amber-600">{((overallStats.lateDays / overallStats.totalDays) * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Breakdown */}
        <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
          <CardHeader>
            <CardTitle>Monthly Attendance</CardTitle>
            <CardDescription>Month-wise attendance breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyAttendance.map((month) => (
                <div key={month.month} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{month.month}</span>
                    <Badge variant={month.percentage >= 90 ? "default" : month.percentage >= 80 ? "secondary" : "destructive"}>
                      {month.percentage}%
                    </Badge>
                  </div>
                  <Progress value={month.percentage} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Present: {month.present}</span>
                    <span>Absent: {month.absent}</span>
                    <span>Late: {month.late}</span>
                    <span>Total: {month.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Attendance */}
        <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
          <CardHeader>
            <CardTitle>Recent Attendance</CardTitle>
            <CardDescription>Your latest attendance records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAttendance.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(record.status)}
                    <div>
                      <p className="font-medium">{record.subject}</p>
                      <p className="text-sm text-muted-foreground">{record.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${getStatusColor(record.status)}`}>
                      {record.status}
                    </p>
                    <p className="text-sm text-muted-foreground">{record.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}