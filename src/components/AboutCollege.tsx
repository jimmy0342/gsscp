import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Users, 
  Calendar,
  Award,
  Target,
  Eye,
  Heart,
  ExternalLink
} from "lucide-react";
import collegeImage from "@/assets/college-campus.jpg";

const collegeData = {
  name: "Springfield University",
  logo: "🎓",
  mission: "To provide quality education that prepares students for successful careers and lifelong learning while fostering critical thinking, creativity, and ethical leadership.",
  vision: "To be a leading institution of higher learning recognized for academic excellence, innovation, and community engagement.",
  values: [
    "Academic Excellence",
    "Integrity and Ethics",
    "Innovation and Research",
    "Diversity and Inclusion",
    "Community Service"
  ],
  foundingYear: "1965",
  accreditation: "NAAC A+ Grade",
  boardAffiliation: "State Board of Education",
  contactInfo: {
    phone: "+1 (555) 123-4567",
    email: "info@springfielduniversity.edu",
    website: "www.springfielduniversity.edu",
    address: "123 University Avenue, Springfield, IL 62701"
  },
  socialLinks: {
    facebook: "facebook.com/springfielduni",
    twitter: "twitter.com/springfielduni",
    linkedin: "linkedin.com/school/springfielduni"
  },
  stats: [
    { label: "Students Enrolled", value: "15,000+" },
    { label: "Faculty Members", value: "800+" },
    { label: "Academic Programs", value: "120+" },
    { label: "Years of Excellence", value: "58+" }
  ]
};

const facilities = [
  {
    title: "Modern Libraries",
    description: "State-of-the-art library with digital resources and study spaces",
    icon: "📚"
  },
  {
    title: "Research Labs",
    description: "Cutting-edge laboratories for science and technology research",
    icon: "🔬"
  },
  {
    title: "Sports Complex",
    description: "Comprehensive sports facilities for various athletic activities",
    icon: "🏟️"
  },
  {
    title: "Student Housing",
    description: "Comfortable and secure on-campus accommodation",
    icon: "🏠"
  },
  {
    title: "Digital Campus",
    description: "Campus-wide WiFi and modern IT infrastructure",
    icon: "💻"
  },
  {
    title: "Health Center",
    description: "On-campus medical facilities and wellness programs",
    icon: "🏥"
  }
];

export default function AboutCollege() {
  return (
    <div className="p-6 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <div className="text-6xl mb-4">{collegeData.logo}</div>
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          {collegeData.name}
        </h1>
        <p className="text-xl text-muted-foreground">Excellence in Education Since {collegeData.foundingYear}</p>
      </div>

      {/* Hero Image and Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="bg-gradient-card shadow-elegant overflow-hidden">
            <div className="relative h-96">
              <img
                src={collegeImage}
                alt="Campus"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Our Beautiful Campus</h3>
                <p className="text-white/90">A modern learning environment designed for student success</p>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="space-y-4">
          {collegeData.stats.map((stat, index) => (
            <Card key={stat.label} className="bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Mission, Vision, Values */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{collegeData.mission}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-secondary" />
              Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{collegeData.vision}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-accent" />
              Our Values
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {collegeData.values.map((value, index) => (
                <div key={value} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-sm text-muted-foreground">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accreditation and Contact Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Accreditation & Recognition
            </CardTitle>
            <CardDescription>Our institutional credentials and affiliations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              <div className="p-3 rounded-full bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Founded</p>
                <p className="text-muted-foreground">{collegeData.foundingYear}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              <div className="p-3 rounded-full bg-secondary/10">
                <Award className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="font-medium">Accreditation</p>
                <p className="text-muted-foreground">{collegeData.accreditation}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              <div className="p-3 rounded-full bg-accent/10">
                <GraduationCap className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="font-medium">Board Affiliation</p>
                <p className="text-muted-foreground">{collegeData.boardAffiliation}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Contact Information
            </CardTitle>
            <CardDescription>Get in touch with us</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-muted-foreground">{collegeData.contactInfo.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              <Mail className="h-5 w-5 text-secondary" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-muted-foreground">{collegeData.contactInfo.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              <Globe className="h-5 w-5 text-accent" />
              <div>
                <p className="font-medium">Website</p>
                <p className="text-muted-foreground">{collegeData.contactInfo.website}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
              <MapPin className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="font-medium">Address</p>
                <p className="text-muted-foreground">{collegeData.contactInfo.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campus Facilities */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Campus Facilities
          </CardTitle>
          <CardDescription>Explore our world-class facilities and amenities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility, index) => (
              <div key={facility.title} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="text-2xl">{facility.icon}</div>
                <div>
                  <h4 className="font-medium mb-1">{facility.title}</h4>
                  <p className="text-sm text-muted-foreground">{facility.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-primary shadow-elegant text-center">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Join Our Community?</h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Discover endless opportunities for growth, learning, and success at Springfield University. 
            Take the next step in your educational journey with us.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="secondary" size="lg">
              <ExternalLink className="mr-2 h-5 w-5" />
              Visit Website
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              <Mail className="mr-2 h-5 w-5" />
              Contact Admissions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}