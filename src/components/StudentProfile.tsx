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
  GraduationCap
} from "lucide-react";
import studentProfile from "@/assets/student-profile.jpg";

const studentData = {
  fullName: "Sarah Johnson",
  studentId: "STU2024001",
  class: "12th Grade",
  section: "A",
  rollNumber: "15",
  profileImage: studentProfile,
  dateOfBirth: "2006-03-15",
  gender: "Female",
  bloodGroup: "A+",
  contactNumber: "+1 (555) 123-4567",
  email: "sarah.johnson@school.edu",
  address: "123 Oak Street, Springfield, IL 62701",
  guardianName: "Michael Johnson",
  emergencyContact: "+1 (555) 987-6543",
  enrollmentYear: "2020",
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

export default function StudentProfile() {
  return (
    <div className="p-6 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Student Profile
          </h1>
          <p className="text-muted-foreground">Manage your personal and academic information</p>
        </div>
        <Button variant="default">
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      {/* Profile Overview */}
      <Card className="bg-gradient-card shadow-elegant">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative">
              <img
                src={studentData.profileImage}
                alt={studentData.fullName}
                className="w-32 h-32 rounded-full object-cover shadow-primary"
              />
              <Badge 
                variant={studentData.status === "Active" ? "default" : "secondary"}
                className="absolute -bottom-2 -right-2"
              >
                {studentData.status}
              </Badge>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">{studentData.fullName}</h2>
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
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
              <p className="text-muted-foreground mb-4">
                Enrolled since {studentData.enrollmentYear} • Admission No. {studentData.admissionNumber}
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Button variant="default" size="sm">
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
            <div className="space-y-4">
              {personalInfo.map((info, index) => (
                <div key={info.label} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="p-2 rounded-full bg-primary/10">
                    <info.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">{info.label}</p>
                    <p className="font-medium">{info.value}</p>
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
            <div className="space-y-4">
              {academicInfo.map((info, index) => (
                <div key={info.label} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="p-2 rounded-full bg-secondary/10">
                    <info.icon className="h-4 w-4 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">{info.label}</p>
                    <p className="font-medium">{info.value}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guardianInfo.map((info, index) => (
              <div key={info.label} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="p-3 rounded-full bg-accent/10">
                  <info.icon className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">{info.label}</p>
                  <p className="font-medium text-lg">{info.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}