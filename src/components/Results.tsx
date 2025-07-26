import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, TrendingUp, Download, Printer, Medal, Star } from "lucide-react";

const examResults = {
  "midterm-2024": {
    examName: "First Term/Monthly Test  Examination 2025",
    examDate: "April 2025",
    results: [
      { subject: "Mathematics", obtained: 92, total: 100, grade: "A+", remarks: "Excellent" },
      { subject: "Physics", obtained: 85, total: 100, grade: "A", remarks: "Very Good" },
      { subject: "Chemistry", obtained: 88, total: 100, grade: "A", remarks: "Very Good" },
      { subject: "Biology", obtained: 91, total: 100, grade: "A+", remarks: "Excellent" },
      { subject: "English", obtained: 87, total: 100, grade: "A", remarks: "Very Good" },
      { subject: "Computer Science", obtained: 96, total: 100, grade: "A+", remarks: "Outstanding" },
    ],
    totalObtained: 539,
    totalMarks: 600,
    percentage: 89.83,
    grade: "A+",
    rank: 3,
    outOf: 120
  },
  "final-2023": {
    examName: "Mid-Term Examination 2025",
    examDate: "September 2025",
    results: [
      { subject: "Mathematics", obtained: 89, total: 100, grade: "A", remarks: "Very Good" },
      { subject: "Physics", obtained: 82, total: 100, grade: "A", remarks: "Good" },
      { subject: "Chemistry", obtained: 85, total: 100, grade: "A", remarks: "Very Good" },
      { subject: "Biology", obtained: 88, total: 100, grade: "A", remarks: "Very Good" },
      { subject: "English", obtained: 84, total: 100, grade: "A", remarks: "Good" },
      { subject: "Computer Science", obtained: 93, total: 100, grade: "A+", remarks: "Excellent" },
    ],
    totalObtained: 521,
    totalMarks: 600,
    percentage: 86.83,
    grade: "A",
    rank: 5,
    outOf: 118
  },
  "midterm-2023": {
    examName: "Final-Term Examination 2025",
    examDate: "September   2025",
    results: [
      { subject: "Mathematics", obtained: 86, total: 100, grade: "A", remarks: "Very Good" },
      { subject: "Physics", obtained: 79, total: 100, grade: "B+", remarks: "Good" },
      { subject: "Chemistry", obtained: 83, total: 100, grade: "A", remarks: "Good" },
      { subject: "Biology", obtained: 85, total: 100, grade: "A", remarks: "Very Good" },
      { subject: "English", obtained: 81, total: 100, grade: "A", remarks: "Good" },
      { subject: "Computer Science", obtained: 90, total: 100, grade: "A+", remarks: "Excellent" },
    ],
    totalObtained: 504,
    totalMarks: 600,
    percentage: 84.0,
    grade: "A",
    rank: 7,
    outOf: 115
  }
};

const getGradeColor = (grade: string) => {
  switch (grade) {
    case "A+": return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    case "A": return "bg-primary/10 text-primary border-primary/20";
    case "B+": return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    case "B": return "bg-orange-500/10 text-orange-600 border-orange-500/20";
    default: return "bg-muted text-muted-foreground border-muted";
  }
};

const getPerformanceIcon = (percentage: number) => {
  if (percentage >= 90) return <Trophy className="h-5 w-5 text-amber-500" />;
  if (percentage >= 85) return <Medal className="h-5 w-5 text-gray-400" />;
  if (percentage >= 80) return <Star className="h-5 w-5 text-amber-600" />;
  return <TrendingUp className="h-5 w-5 text-primary" />;
};

export default function Results() {
  const [selectedExam, setSelectedExam] = useState("midterm-2024");
  
  const currentResult = examResults[selectedExam as keyof typeof examResults];
  const examOptions = Object.entries(examResults);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    alert("PDF download feature would be implemented here!");
  };

  const topSubject = currentResult.results.reduce((top, current) => 
    current.obtained > top.obtained ? current : top
  );

  return (
    <div className="min-h-screen bg-gradient-subtle p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Exam Results
          </h1>
          <p className="text-muted-foreground">View your academic performance and grades</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Exam Selection */}
      <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <label className="text-sm font-medium">Select Examination:</label>
            <Select value={selectedExam} onValueChange={setSelectedExam}>
              <SelectTrigger className="w-full sm:w-80">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {examOptions.map(([key, exam]) => (
                  <SelectItem key={key} value={key}>
                    {exam.examName} - {exam.examDate}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Overall Performance */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                {getPerformanceIcon(currentResult.percentage)}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overall Grade</p>
                <p className="text-2xl font-bold">{currentResult.grade}</p>
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
                <p className="text-sm text-muted-foreground">Percentage</p>
                <p className="text-2xl font-bold">{currentResult.percentage}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Trophy className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Class Rank</p>
                <p className="text-2xl font-bold">{currentResult.rank}/{currentResult.outOf}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Star className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Top Subject</p>
                <p className="text-lg font-bold">{topSubject.subject}</p>
                <p className="text-sm text-muted-foreground">{topSubject.obtained}/100</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="detailed" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="detailed">Detailed Results</TabsTrigger>
          <TabsTrigger value="comparison">Performance Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="detailed" className="space-y-6">
          {/* Exam Info */}
          <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                {currentResult.examName}
              </CardTitle>
              <CardDescription>
                Examination Date: {currentResult.examDate} | 
                Total Marks: {currentResult.totalObtained}/{currentResult.totalMarks} | 
                Percentage: {currentResult.percentage}%
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Subject-wise Results */}
          <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
            <CardHeader>
              <CardTitle>Subject-wise Performance</CardTitle>
              <CardDescription>Detailed breakdown of marks obtained in each subject</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Subject</th>
                      <th className="text-center p-3 font-medium">Marks Obtained</th>
                      <th className="text-center p-3 font-medium">Total Marks</th>
                      <th className="text-center p-3 font-medium">Percentage</th>
                      <th className="text-center p-3 font-medium">Grade</th>
                      <th className="text-left p-3 font-medium">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentResult.results.map((result, index) => (
                      <tr key={index} className="border-b hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium">{result.subject}</td>
                        <td className="p-3 text-center font-semibold">{result.obtained}</td>
                        <td className="p-3 text-center">{result.total}</td>
                        <td className="p-3 text-center">
                          {((result.obtained / result.total) * 100).toFixed(1)}%
                        </td>
                        <td className="p-3 text-center">
                          <Badge className={getGradeColor(result.grade)}>
                            {result.grade}
                          </Badge>
                        </td>
                        <td className="p-3 text-muted-foreground">{result.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-primary/20 bg-muted/10">
                      <td className="p-3 font-bold">TOTAL</td>
                      <td className="p-3 text-center font-bold">{currentResult.totalObtained}</td>
                      <td className="p-3 text-center font-bold">{currentResult.totalMarks}</td>
                      <td className="p-3 text-center font-bold">{currentResult.percentage}%</td>
                      <td className="p-3 text-center">
                        <Badge className={getGradeColor(currentResult.grade)}>
                          {currentResult.grade}
                        </Badge>
                      </td>
                      <td className="p-3 font-bold">Rank: {currentResult.rank}/{currentResult.outOf}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          {/* Performance Trend */}
          <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
            <CardHeader>
              <CardTitle>Performance Trend</CardTitle>
              <CardDescription>Compare your performance across different examinations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {examOptions.map(([key, exam]) => (
                  <div key={key} className={`p-4 border rounded-lg ${key === selectedExam ? 'border-primary bg-primary/5' : 'border-muted'}`}>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <h4 className="font-medium">{exam.examName}</h4>
                        <p className="text-sm text-muted-foreground">{exam.examDate}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Percentage</p>
                          <p className="font-bold">{exam.percentage}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Grade</p>
                          <Badge className={getGradeColor(exam.grade)}>
                            {exam.grade}
                          </Badge>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Rank</p>
                          <p className="font-bold">{exam.rank}/{exam.outOf}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Subject-wise Comparison */}
          <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
            <CardHeader>
              <CardTitle>Subject-wise Progress</CardTitle>
              <CardDescription>Track improvement in individual subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Subject</th>
                      {examOptions.map(([key, exam]) => (
                        <th key={key} className="text-center p-3 font-medium text-sm">
                          {exam.examName.split(' ')[0]}<br />
                          <span className="text-xs text-muted-foreground">{exam.examDate}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentResult.results.map((_, subjectIndex) => (
                      <tr key={subjectIndex} className="border-b hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium">
                          {currentResult.results[subjectIndex].subject}
                        </td>
                        {examOptions.map(([key, exam]) => {
                          const marks = exam.results[subjectIndex]?.obtained || 0;
                          const percentage = ((marks / 100) * 100).toFixed(0);
                          return (
                            <td key={key} className="p-3 text-center">
                              <div className="font-semibold">{marks}/100</div>
                              <div className="text-sm text-muted-foreground">{percentage}%</div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}