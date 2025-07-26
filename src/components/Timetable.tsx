import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, User, Download, Printer } from "lucide-react";

const timeSlots = [
  "09:00 - 09:45",
  "09:45 - 10:30",
  "10:30 - 11:15",
  "11:15 - 11:30", // Break
  "11:30 - 12:15",
  "12:15 - 01:00",
  "01:00 - 02:00", // Lunch
  "02:00 - 02:45",
  "02:45 - 03:30",
];

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const timetableData = {
  Monday: [
    { subject: "Mathematics", teacher: "Dr. Smith", room: "101", type: "theory" },
    { subject: "Physics", teacher: "Prof. Johnson", room: "Lab-A", type: "practical" },
    { subject: "Chemistry", teacher: "Dr. Brown", room: "102", type: "theory" },
    { subject: "BREAK", teacher: "", room: "", type: "break" },
    { subject: "English", teacher: "Ms. Davis", room: "103", type: "theory" },
    { subject: "Computer Science", teacher: "Mr. Wilson", room: "Lab-B", type: "practical" },
    { subject: "LUNCH", teacher: "", room: "", type: "break" },
    { subject: "Biology", teacher: "Dr. Lee", room: "104", type: "theory" },
    { subject: "Sports", teacher: "Coach Miller", room: "Ground", type: "activity" },
  ],
  Tuesday: [
    { subject: "Physics", teacher: "Prof. Johnson", room: "105", type: "theory" },
    { subject: "Mathematics", teacher: "Dr. Smith", room: "101", type: "theory" },
    { subject: "English", teacher: "Ms. Davis", room: "103", type: "theory" },
    { subject: "BREAK", teacher: "", room: "", type: "break" },
    { subject: "Chemistry", teacher: "Dr. Brown", room: "Lab-A", type: "practical" },
    { subject: "Biology", teacher: "Dr. Lee", room: "104", type: "theory" },
    { subject: "LUNCH", teacher: "", room: "", type: "break" },
    { subject: "Computer Science", teacher: "Mr. Wilson", room: "Lab-B", type: "practical" },
    { subject: "Library", teacher: "Librarian", room: "Library", type: "activity" },
  ],
  Wednesday: [
    { subject: "Chemistry", teacher: "Dr. Brown", room: "102", type: "theory" },
    { subject: "Biology", teacher: "Dr. Lee", room: "104", type: "theory" },
    { subject: "Mathematics", teacher: "Dr. Smith", room: "101", type: "theory" },
    { subject: "BREAK", teacher: "", room: "", type: "break" },
    { subject: "Physics", teacher: "Prof. Johnson", room: "Lab-A", type: "practical" },
    { subject: "English", teacher: "Ms. Davis", room: "103", type: "theory" },
    { subject: "LUNCH", teacher: "", room: "", type: "break" },
    { subject: "Computer Science", teacher: "Mr. Wilson", room: "106", type: "theory" },
    { subject: "Art & Craft", teacher: "Ms. Taylor", room: "Art Room", type: "activity" },
  ],
  Thursday: [
    { subject: "English", teacher: "Ms. Davis", room: "103", type: "theory" },
    { subject: "Mathematics", teacher: "Dr. Smith", room: "101", type: "theory" },
    { subject: "Physics", teacher: "Prof. Johnson", room: "105", type: "theory" },
    { subject: "BREAK", teacher: "", room: "", type: "break" },
    { subject: "Biology", teacher: "Dr. Lee", room: "Lab-C", type: "practical" },
    { subject: "Chemistry", teacher: "Dr. Brown", room: "102", type: "theory" },
    { subject: "LUNCH", teacher: "", room: "", type: "break" },
    { subject: "Computer Science", teacher: "Mr. Wilson", room: "Lab-B", type: "practical" },
    { subject: "Music", teacher: "Ms. Garcia", room: "Music Room", type: "activity" },
  ],
  Friday: [
    { subject: "Mathematics", teacher: "Dr. Smith", room: "101", type: "theory" },
    { subject: "Chemistry", teacher: "Dr. Brown", room: "102", type: "theory" },
    { subject: "Biology", teacher: "Dr. Lee", room: "104", type: "theory" },
    { subject: "BREAK", teacher: "", room: "", type: "break" },
    { subject: "Physics", teacher: "Prof. Johnson", room: "105", type: "theory" },
    { subject: "English", teacher: "Ms. Davis", room: "103", type: "theory" },
    { subject: "LUNCH", teacher: "", room: "", type: "break" },
    { subject: "Computer Science", teacher: "Mr. Wilson", room: "106", type: "theory" },
    { subject: "Assembly", teacher: "Principal", room: "Auditorium", type: "activity" },
  ],
  Saturday: [
    { subject: "Project Work", teacher: "All Teachers", room: "Various", type: "project" },
    { subject: "Mathematics", teacher: "Dr. Smith", room: "101", type: "theory" },
    { subject: "Science Quiz", teacher: "Dr. Brown", room: "102", type: "activity" },
    { subject: "BREAK", teacher: "", room: "", type: "break" },
    { subject: "Sports", teacher: "Coach Miller", room: "Ground", type: "activity" },
    { subject: "Club Activities", teacher: "Various", room: "Various", type: "activity" },
    { subject: "LUNCH", teacher: "", room: "", type: "break" },
    { subject: "Study Hall", teacher: "Class Teacher", room: "103", type: "study" },
    { subject: "Free Period", teacher: "", room: "", type: "free" },
  ],
};

const getSubjectColor = (type: string) => {
  switch (type) {
    case "theory": return "bg-primary/10 text-primary border-primary/20";
    case "practical": return "bg-accent/10 text-accent border-accent/20";
    case "activity": return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    case "project": return "bg-purple-500/10 text-purple-600 border-purple-500/20";
    case "study": return "bg-orange-500/10 text-orange-600 border-orange-500/20";
    case "break": return "bg-muted text-muted-foreground border-muted";
    case "free": return "bg-gray-100 text-gray-600 border-gray-300";
    default: return "bg-muted text-muted-foreground border-muted";
  }
};

export default function Timetable() {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate a simple PDF for the timetable
    const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/Resources <<
/Font <<
/F1 4 0 R
>>
>>
/MediaBox [0 0 612 792]
/Contents 5 0 R
>>
endobj

4 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Times-Roman
>>
endobj

5 0 obj
<<
/Length 200
>>
stream
BT
/F1 18 Tf
72 720 Td
(Class Timetable - 12-A Science) Tj
0 -30 Td
/F1 12 Tf
(January 2025 - Week 3) Tj
0 -20 Td
(School Hours: 09:00 AM - 03:30 PM) Tj
0 -30 Td
(Monday to Saturday Schedule) Tj
0 -20 Td
(Downloaded from Student Portal) Tj
0 -20 Td
(Date: ${new Date().toLocaleDateString()}) Tj
ET
endstream
endobj

xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000079 00000 n 
0000000173 00000 n 
0000000301 00000 n 
0000000380 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
648
%%EOF`;
    
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const link = document.createElement('a');
    link.href = url;
    link.download = 'class-timetable.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the object URL
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Class Timetable
          </h1>
          <p className="text-muted-foreground">Weekly schedule for Class 12-A Science</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2 text-sm">
            <Badge variant="outline" className="w-fit">
              <Clock className="h-3 w-3 mr-1" />
              January 2025 - Week 3
            </Badge>
            <Badge variant="outline" className="w-fit">
              School Hours: 09:00 AM - 03:30 PM
            </Badge>
          </div>
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

      {/* Timetable */}
      <Card className="bg-card/80 backdrop-blur-sm border shadow-card overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Weekly Schedule
          </CardTitle>
          <CardDescription>Monday to Saturday class schedule</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-4 font-medium min-w-[120px]">Time</th>
                  {weekDays.map((day) => (
                    <th key={day} className="text-left p-4 font-medium min-w-[200px]">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((time, timeIndex) => (
                  <tr key={time} className="border-b hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-medium text-sm bg-muted/10">
                      {time}
                    </td>
                    {weekDays.map((day) => {
                      const classData = timetableData[day as keyof typeof timetableData][timeIndex];
                      const isBreak = classData.type === "break";
                      
                      return (
                        <td key={`${day}-${timeIndex}`} className="p-2">
                          <div className={`rounded-lg border p-3 h-full ${getSubjectColor(classData.type)}`}>
                            <div className="font-medium text-sm mb-1">
                              {classData.subject}
                            </div>
                            {!isBreak && classData.teacher && (
                              <>
                                <div className="flex items-center gap-1 text-xs mb-1">
                                  <User className="h-3 w-3" />
                                  {classData.teacher}
                                </div>
                                <div className="flex items-center gap-1 text-xs">
                                  <MapPin className="h-3 w-3" />
                                  {classData.room}
                                </div>
                              </>
                            )}
                          </div>
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

      {/* Legend */}
      <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-primary/10 border border-primary/20"></div>
              <span className="text-sm">Theory Classes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-accent/10 border border-accent/20"></div>
              <span className="text-sm">Practical Classes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-emerald-500/10 border border-emerald-500/20"></div>
              <span className="text-sm">Activities</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-purple-500/10 border border-purple-500/20"></div>
              <span className="text-sm">Project Work</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-orange-500/10 border border-orange-500/20"></div>
              <span className="text-sm">Study Hall</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-muted border border-muted"></div>
              <span className="text-sm">Break/Lunch</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}