import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Users, 
  Heart,
  Edit,
  IdCard,
  GraduationCap,
  Bell,
  MessageSquare,
  AlertCircle
} from "lucide-react";
import studentProfile from "@/assets/student-profile.jpg";

const studentData = {
  fullName: "Sarah Johnson",
  studentId: "STU2024001",
  class: "10th Grade",
  section: "A",
  rollNumber: "15",
  profileImage: studentProfile,
  dateOfBirth: "2006-03-15",
  gender: "Male",
  bloodGroup: "A+",
  contactNumber: "+1 (555) 123-4567",
  email: "sarah.johnson@school.edu",
  address: "123 Oak Street, Springfield, IL 62701",
  guardianName: "Michael Johnson",
  emergencyContact: "+1 (555) 987-6543",
  enrollmentYear: "2025",
  admissionNumber: "ADM2020150",
  status: "Active"
};

const personalInfo = [
  { label: "Date of Birth", value: studentData.dateOfBirth, icon: Calendar },
  { label: "Gender", value: studentData.gender, icon: User },
  { label: "Blood Group", value: studentData.bloodGroup, icon: Heart },
  { label: "Contact Number", value: studentData.contactNumber, icon: Phone },
  { label: "Email", value: studentData.email, icon: Mail },
  { label: "Address", value: studentData.address, icon: MapPin }
];

const academicInfo = [
  { label: "Student ID", value: studentData.studentId, icon: IdCard },
  { label: "Class", value: studentData.class, icon: GraduationCap },
  { label: "Section", value: studentData.section, icon: Users },
  { label: "Roll Number", value: studentData.rollNumber, icon: User },
  { label: "Enrollment Year", value: studentData.enrollmentYear, icon: Calendar },
  { label: "Admission Number", value: studentData.admissionNumber, icon: IdCard }
];

const guardianInfo = [
  { label: "Guardian Name", value: studentData.guardianName, icon: User },
  { label: "Emergency Contact", value: studentData.emergencyContact, icon: Phone }
];

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
  }
];

export default function StudentProfile() {
  return (
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-1 sm:space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Student Profile
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">View your personal and academic information</p>
      </div>

      {/* Profile Overview */}
      <Card className="bg-gradient-card shadow-elegant">
        <CardContent className="p-4 sm:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
            <div className="relative">
              <img
                src={studentData.profileImage}
                alt={studentData.fullName}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover shadow-primary"
              />
              <Badge 
                variant={studentData.status === "Active" ? "default" : "secondary"}
                className="absolute -bottom-2 -right-2 text-[10px] sm:text-xs"
              >
                {studentData.status}
              </Badge>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">{studentData.fullName}</h2>
              <div className="flex flex-col md:flex-row md:items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                <Badge variant="secondary" className="text-sm">
                  {studentData.class} - Section {studentData.section}
                </Badge>
                <Badge variant="outline" className="text-sm">
                  Roll No. {studentData.rollNumber}
                </Badge>
                <Badge variant="outline" className="text-sm">
                  ID: {studentData.studentId}
                </Badge>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                Enrolled since {studentData.enrollmentYear} • Admission No. {studentData.admissionNumber}
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Button variant="default" size="sm" className="w-full xs:w-auto sm:w-auto" onClick={() => { window.location.href = 'tel:+15559876543'; }}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </Button>
                <Button variant="outline" size="sm" className="w-full xs:w-auto sm:w-auto" onClick={() => { window.location.href = 'mailto:SarahJohnsonStudIDSTU2024001@gmail.com'; }}>
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        {/* Personal Information */}
        <Card className="bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Personal Information
            </CardTitle>
            <CardDescription>Your personal details and contact information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {personalInfo.map((info, index) => (
                <div key={info.label} className="flex items-center gap-3 sm:gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="p-2 rounded-full bg-primary/10">
                    <info.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">{info.label}</p>
                    <p className="text-sm sm:text-base font-medium break-words">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card className="bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-secondary" />
              Academic Information
            </CardTitle>
            <CardDescription>Your academic details and enrollment information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {academicInfo.map((info, index) => (
                <div key={info.label} className="flex items-center gap-3 sm:gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="p-2 rounded-full bg-secondary/10">
                    <info.icon className="h-4 w-4 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">{info.label}</p>
                    <p className="text-sm sm:text-base font-medium break-words">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Guardian Information */}
      <Card className="bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-accent" />
            Guardian & Emergency Contact
          </CardTitle>
          <CardDescription>Primary guardian and emergency contact information</CardDescription>
        </CardHeader>
        <CardContent>
          
          {/* Guardian Profile Section */}
          <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-accent/20">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="relative self-start">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                  alt="Michael Johnson"
                  loading="lazy"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-accent/20 shadow-lg bg-muted"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                  <Users className="h-3 w-3 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-foreground">Michael Johnson</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Primary Guardian</p>
                <div className="mt-2 grid grid-cols-1 xs:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 shrink-0" />
                    <span className="break-words">+1 (555) 987-6543</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="break-all">michael.johnson@email.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}