import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Clock, MapPin, User, Download, Printer, BookOpen, Target, Lightbulb, Calendar, AlertCircle } from "lucide-react";

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

// Enhanced timetable data with detailed class information
const timetableData = {
  Monday: [
         { 
       subject: "Mathematics", 
       teacher: "Dr. Ahmed Khan", 
       room: "101", 
       type: "theory",
       chapter: "Chapter 8: Applications of Calculus",
       topic: "8.2.1 Differentiation Techniques and Integration Methods",
       page: "156-172",
       description: "Today we covered advanced calculus concepts including differentiation techniques and basic integration methods. We solved several practice problems involving polynomial and trigonometric functions.",
       practice: "Complete exercises 1-15 from Chapter 8. Practice differentiation of composite functions.",
       homework: "Solve 5 integration problems from the textbook.",
       materials: "Textbook Chapter 8, Calculator, Graph paper",
       videoLink: "https://www.youtube.com/watch?v=UyqSXS6JNnU&ab_channel=ThePhysicsClassroom"
     },
         { 
       subject: "Physics", 
       teacher: "Prof. Muhammad Ali", 
       room: "Lab-A", 
       type: "practical",
       chapter: "Chapter 5: Mechanics and Motion",
       topic: "5.3.2 Force and Motion Experiments",
       page: "89-95",
       description: "Conducted hands-on experiments with force sensors and motion detectors. We measured acceleration, velocity, and force relationships in various scenarios.",
       practice: "Analyze the data collected today. Plot graphs of force vs. acceleration.",
       homework: "Write lab report with conclusions.",
       materials: "Lab manual, Data sheets, Graphing software",
       videoLink: "https://www.youtube.com/watch?v=UyqSXS6JNnU&ab_channel=ThePhysicsClassroom"
     },
         { 
       subject: "Chemistry", 
       teacher: "Dr. Fatima Sheikh", 
       room: "102", 
       type: "theory",
       chapter: "Chapter 12: Organic Chemistry",
       topic: "12.1.3 Alkanes and Alkenes: Structure and Properties",
       page: "234-248",
       description: "Explored the structure and properties of alkanes and alkenes. Discussed IUPAC naming conventions and isomerism.",
       practice: "Practice naming 20 organic compounds. Draw structural formulas.",
       homework: "Research applications of alkenes in industry.",
       materials: "Molecular models, Periodic table, Organic chemistry textbook",
       videoLink: "https://www.youtube.com/watch?v=UyqSXS6JNnU&ab_channel=ThePhysicsClassroom"
     },
    { subject: "BREAK", teacher: "", room: "", type: "break" },
    { 
      subject: "English", 
      teacher: "Ms. Ayesha Malik", 
      room: "103", 
      type: "theory",
      chapter: "Chapter 7: Shakespearean Literature",
      topic: "7.2.1 Macbeth Act 1: Character Development and Themes",
      page: "112-128",
      description: "Analyzed Act 1 of Macbeth, focusing on character development and themes of ambition and power.",
      practice: "Write a character analysis of Macbeth. Practice dramatic reading.",
             homework: "Read Act 2 and prepare for discussion. Due Date: Tuesday",
      materials: "Macbeth text, Study guide, Notebook"
    },
    { 
      subject: "Computer Science", 
      teacher: "Mr. Hassan Raza", 
      room: "Lab-B", 
      type: "practical",
      chapter: "Chapter 9: Data Structures",
      topic: "9.1.2 Arrays and Linked Lists: Implementation and Operations",
      page: "167-183",
      description: "Implemented basic array and linked list operations in Python. Created functions for insertion, deletion, and traversal.",
      practice: "Code a simple contact book using linked lists. Test all operations.",
             homework: "Implement a stack data structure. Due Date: Thursday",
      materials: "Python IDE, Data structures textbook, Code examples"
    },
    { subject: "LUNCH", teacher: "", room: "", type: "break" },
    { 
      subject: "Biology", 
      teacher: "Dr. Zainab Abbas", 
      room: "104", 
      type: "theory",
      chapter: "Chapter 6: Genetics and Inheritance",
      topic: "6.2.1 Mendelian Inheritance: Dominant and Recessive Traits",
      page: "145-162",
      description: "Studied Gregor Mendel's experiments with pea plants. Learned about dominant and recessive traits, Punnett squares.",
      practice: "Solve 10 genetics problems using Punnett squares. Practice with different traits.",
             homework: "Research a genetic disorder and prepare presentation. Due Date: Next Monday",
      materials: "Genetics textbook, Punnett square worksheets, Online simulations"
    },
    { 
      subject: "Sports", 
      teacher: "Coach Tariq Ahmed", 
      room: "Ground", 
      type: "activity",
      chapter: "Chapter 15: Team Sports",
      topic: "15.1.3 Basketball: Shooting Techniques and Defensive Strategies",
      page: "298-312",
      description: "Practiced shooting techniques including free throws, layups, and three-point shots. Worked on defensive positioning.",
      practice: "Practice shooting for 30 minutes daily. Work on dribbling skills.",
             homework: "Watch a professional basketball game and analyze techniques. Due Date: Sunday",
      materials: "Basketball, Sports shoes, Water bottle"
    },
  ],
  Tuesday: [
         { 
       subject: "Physics", 
       teacher: "Prof. Muhammad Ali", 
       room: "105", 
       type: "theory",
       chapter: "Chapter 5: Electromagnetism",
       topic: "5.4.1 Electric Fields and Forces: Coulomb's Law",
       page: "96-108",
       description: "Explored electric field concepts, Coulomb's law, and electric field lines. Solved problems involving point charges.",
       practice: "Solve electric field problems from textbook. Practice drawing field lines.",
       homework: "Complete worksheet on electric forces.",
       materials: "Physics textbook, Calculator, Ruler",
       videoLink: "https://www.youtube.com/watch?v=UyqSXS6JNnU&ab_channel=ThePhysicsClassroom"
     },
    { 
      subject: "Mathematics", 
      teacher: "Dr. Ahmed Khan", 
      room: "101", 
      type: "theory",
      chapter: "Chapter 8: Applications of Calculus",
      topic: "8.3.2 Applications of Integration: Areas, Volumes, and Work",
      page: "173-189",
      description: "Applied integration to find areas, volumes, and work done. Solved real-world problems using calculus.",
      practice: "Practice area and volume calculations. Work on word problems.",
             homework: "Solve 8 application problems. Due Date: Friday",
      materials: "Calculus textbook, Graph paper, Calculator"
    },
    { 
      subject: "English", 
      teacher: "Ms. Ayesha Malik", 
      room: "103", 
      type: "theory",
      chapter: "Chapter 7: Shakespearean Literature",
      topic: "7.2.2 Macbeth Act 2: Plot Development and Character Analysis",
      page: "129-145",
      description: "Group discussion on Act 2 of Macbeth. Analyzed Lady Macbeth's influence and the murder of King Duncan.",
      practice: "Write a diary entry from Macbeth's perspective. Practice dramatic monologues.",
             homework: "Read Act 3 and identify key themes. Due Date: Thursday",
      materials: "Macbeth text, Study notes, Character analysis sheets"
    },
    { subject: "BREAK", teacher: "", room: "", type: "break" },
    { 
      subject: "Chemistry", 
      teacher: "Dr. Fatima Sheikh", 
      room: "Lab-A", 
      type: "practical",
      chapter: "Chapter 12: Organic Chemistry",
      topic: "12.2.1 Alcohol Reactions: Oxidation and Functional Group Transformations",
      page: "249-265",
      description: "Performed experiments with different alcohols. Tested oxidation reactions and observed color changes.",
      practice: "Write balanced equations for all reactions observed. Practice naming alcohols.",
             homework: "Research industrial uses of alcohols. Due Date: Friday",
      materials: "Lab report template, Safety equipment, Chemical data sheets"
    },
    { 
      subject: "Biology", 
      teacher: "Dr. Zainab Abbas", 
      room: "104", 
      type: "theory",
      chapter: "Chapter 6: Genetics and Inheritance",
      topic: "6.2.2 Dihybrid Crosses: Two-Trait Inheritance Patterns",
      page: "163-179",
      description: "Advanced genetics covering two-trait inheritance. Practiced solving complex Punnett squares.",
      practice: "Solve 15 dihybrid cross problems. Practice probability calculations.",
             homework: "Create a family tree showing genetic traits. Due Date: Monday",
      materials: "Genetics worksheets, Calculator, Family history forms"
    },
    { subject: "LUNCH", teacher: "", room: "", type: "break" },
    { 
      subject: "Computer Science", 
      teacher: "Mr. Hassan Raza", 
      room: "Lab-B", 
      type: "practical",
      chapter: "Chapter 9: Data Structures",
      topic: "9.2.1 Sorting and Searching Algorithms: Implementation and Analysis",
      page: "184-200",
      description: "Implemented bubble sort, selection sort, and binary search algorithms. Compared their efficiency.",
      practice: "Code all sorting algorithms. Test with different data sets.",
             homework: "Implement merge sort algorithm. Due Date: Friday",
      materials: "Algorithm textbook, Python IDE, Performance analysis tools"
    },
    { 
      subject: "Library", 
      teacher: "Ms. Farah Khan", 
      room: "Library", 
      type: "activity",
      chapter: "Chapter 18: Research and Information Skills",
      topic: "18.1.2 Database Navigation and Academic Source Discovery",
      page: "345-358",
      description: "Learned to use online databases and library catalogs. Practiced finding academic sources.",
      practice: "Search for sources on your research topic. Practice citation formatting.",
             homework: "Find 5 reliable sources for your project. Due Date: Next week",
      materials: "Library card, Research topic list, Citation guide"
    },
  ],
  Wednesday: [
    { 
      subject: "Chemistry", 
      teacher: "Dr. Fatima Sheikh", 
      room: "102", 
      type: "theory",
      chapter: "Chapter 12: Organic Chemistry",
      topic: "12.3.1 Aromatic Compounds: Benzene Structure and Aromaticity",
      page: "266-282",
      description: "Introduced benzene structure and aromaticity. Discussed resonance and stability of aromatic compounds.",
      practice: "Draw resonance structures for benzene derivatives. Practice naming aromatic compounds.",
             homework: "Research applications of benzene in industry. Due Date: Friday",
      materials: "Molecular models, Organic chemistry textbook, Resonance worksheets"
    },
    { 
      subject: "Biology", 
      teacher: "Dr. Zainab Abbas", 
      room: "104", 
      type: "theory",
      chapter: "Chapter 6: Genetics and Inheritance",
      topic: "6.3.1 Evolution and Natural Selection: Mechanisms and Evidence",
      page: "180-196",
      description: "Explored Darwin's theory of natural selection. Discussed evidence for evolution and adaptation.",
      practice: "Analyze case studies of natural selection. Practice identifying adaptations.",
             homework: "Research a specific example of evolution. Due Date: Monday",
      materials: "Evolution textbook, Case study materials, Research guidelines"
    },
    { 
      subject: "Mathematics", 
      teacher: "Dr. Ahmed Khan", 
      room: "101", 
      type: "theory",
      chapter: "Chapter 8: Applications of Calculus",
      topic: "8.4.1 Differential Equations: First-Order Equations and Separation of Variables",
      page: "190-206",
      description: "Introduction to first-order differential equations. Learned separation of variables method.",
      practice: "Solve 10 differential equations. Practice with different initial conditions.",
             homework: "Complete differential equations worksheet. Due Date: Friday",
      materials: "Calculus textbook, Practice worksheets, Calculator"
    },
    { subject: "BREAK", teacher: "", room: "", type: "break" },
    { 
      subject: "Physics", 
      teacher: "Prof. Muhammad Ali", 
      room: "Lab-A", 
      type: "practical",
      topics: "Waves: Sound Wave Properties",
      description: "Measured frequency, amplitude, and wavelength of sound waves. Used oscilloscopes and frequency generators.",
      practice: "Analyze wave data. Practice calculating wave properties.",
             homework: "Write lab report on sound wave experiments. Due Date: Monday",
      materials: "Lab manual, Data analysis software, Wave property charts"
    },
    { 
      subject: "English", 
      teacher: "Ms. Ayesha Malik", 
      room: "103", 
      type: "theory",
      topics: "Literature: Macbeth Act 3 Analysis",
      description: "Analyzed the turning point in Macbeth. Discussed themes of guilt, paranoia, and the supernatural.",
      practice: "Write a soliloquy for Macbeth. Practice dramatic interpretation.",
             homework: "Read Act 4 and prepare for final discussion. Due Date: Friday",
      materials: "Macbeth text, Character development charts, Theme analysis sheets"
    },
    { subject: "LUNCH", teacher: "", room: "", type: "break" },
    { 
      subject: "Computer Science", 
      teacher: "Mr. Hassan Raza", 
      room: "106", 
      type: "theory",
      topics: "Database Design: ER Diagrams",
      description: "Learned entity-relationship modeling. Designed database schemas for various scenarios.",
      practice: "Create ER diagrams for 3 different systems. Practice normalization.",
             homework: "Design a database for a school management system. Due Date: Monday",
      materials: "Database textbook, ER diagram software, Design templates"
    },
    { 
      subject: "Art & Craft", 
      teacher: "Ms. Saba Khan", 
      room: "Art Room", 
      type: "activity",
      topics: "Digital Art: Vector Graphics",
      description: "Introduction to vector graphics using digital tools. Created simple shapes and designs.",
      practice: "Create 5 vector designs. Practice with different tools and effects.",
             homework: "Design a logo for your favorite subject. Due Date: Next week",
      materials: "Digital art software, Drawing tablet, Design inspiration materials"
    },
  ],
  Thursday: [
    { 
      subject: "English", 
      teacher: "Ms. Ayesha Malik", 
      room: "103", 
      type: "theory",
      topics: "Literature: Macbeth Final Discussion",
      description: "Concluded our study of Macbeth. Discussed the play's themes, character arcs, and Shakespeare's message.",
      practice: "Write a critical analysis essay. Practice literary analysis techniques.",
             homework: "Complete Macbeth essay (1000 words). Due Date: Next Monday",
      materials: "Macbeth text, Essay guidelines, Literary analysis resources"
    },
    { 
      subject: "Mathematics", 
      teacher: "Dr. Ahmed Khan", 
      room: "101", 
      type: "theory",
      topics: "Calculus: Applications in Physics",
      description: "Applied calculus concepts to physics problems. Solved problems involving motion, work, and energy.",
      practice: "Solve physics problems using calculus. Practice with real-world applications.",
             homework: "Complete 10 application problems. Due Date: Monday",
      materials: "Calculus textbook, Physics formulas, Practice problems"
    },
    { 
      subject: "Physics", 
      teacher: "Prof. Muhammad Ali", 
      room: "105", 
      type: "theory",
      topics: "Modern Physics: Quantum Mechanics",
      description: "Introduction to quantum mechanics concepts. Discussed wave-particle duality and uncertainty principle.",
      practice: "Solve quantum mechanics problems. Practice with probability calculations.",
             homework: "Research applications of quantum mechanics. Due Date: Wednesday",
      materials: "Modern physics textbook, Quantum mechanics resources, Online simulations"
    },
    { subject: "BREAK", teacher: "", room: "", type: "break" },
    { 
      subject: "Biology", 
      teacher: "Dr. Zainab Abbas", 
      room: "Lab-C", 
      type: "practical",
      topics: "Microbiology: Bacterial Cultures",
      description: "Prepared and observed bacterial cultures. Learned about aseptic techniques and colony counting.",
      practice: "Practice aseptic techniques. Count colonies and calculate concentrations.",
             homework: "Write lab report on bacterial culture experiment. Due Date: Friday",
      materials: "Lab manual, Safety equipment, Colony counting tools"
    },
    { 
      subject: "Chemistry", 
      teacher: "Dr. Fatima Sheikh", 
      room: "102", 
      type: "theory",
      topics: "Inorganic Chemistry: Transition Metals",
      description: "Explored properties of transition metals. Discussed coordination compounds and complex ions.",
      practice: "Practice naming coordination compounds. Draw complex ion structures.",
             homework: "Research uses of transition metals in technology. Due Date: Monday",
      materials: "Inorganic chemistry textbook, Periodic table, Complex ion models"
    },
    { subject: "LUNCH", teacher: "", room: "", type: "break" },
    { 
      subject: "Computer Science", 
      teacher: "Mr. Hassan Raza", 
      room: "Lab-B", 
      type: "practical",
      topics: "Web Development: HTML and CSS",
      description: "Built basic web pages using HTML and CSS. Learned about responsive design principles.",
      practice: "Create 3 different web page layouts. Practice CSS styling.",
             homework: "Build a personal portfolio website. Due Date: Next week",
      materials: "Web development textbook, Code editor, CSS framework resources"
    },
    { 
      subject: "Music", 
      teacher: "Ms. Nida Hussain", 
      room: "Music Room", 
      type: "activity",
      topics: "Music Theory: Chord Progressions",
      description: "Learned about chord progressions and harmonic analysis. Practiced identifying chord types.",
      practice: "Practice chord progressions on piano. Analyze popular songs.",
             homework: "Compose a simple 8-bar melody. Due Date: Sunday",
      materials: "Music theory textbook, Piano/keyboard, Composition software"
    },
  ],
  Friday: [
    { 
      subject: "Mathematics", 
      teacher: "Dr. Ahmed Khan", 
      room: "101", 
      type: "theory",
      topics: "Calculus: Series and Sequences",
      description: "Introduced infinite series and sequences. Learned about convergence tests and power series.",
      practice: "Practice convergence tests. Work on series problems.",
             homework: "Complete series worksheet. Due Date: Monday",
      materials: "Calculus textbook, Series practice problems, Calculator"
    },
    { 
      subject: "Chemistry", 
      teacher: "Dr. Fatima Sheikh", 
      room: "102", 
      type: "theory",
      topics: "Physical Chemistry: Thermodynamics",
      description: "Explored first law of thermodynamics. Discussed heat, work, and internal energy changes.",
      practice: "Solve thermodynamics problems. Practice with different processes.",
             homework: "Complete thermodynamics worksheet. Due Date: Wednesday",
      materials: "Physical chemistry textbook, Thermodynamics tables, Calculator"
    },
    { 
      subject: "Biology", 
      teacher: "Dr. Zainab Abbas", 
      room: "104", 
      type: "theory",
      topics: "Ecology: Population Dynamics",
      description: "Studied population growth models and carrying capacity. Discussed human impact on ecosystems.",
      practice: "Solve population growth problems. Practice with different models.",
             homework: "Research an endangered species. Due Date: Monday",
      materials: "Ecology textbook, Population data, Research guidelines"
    },
    { subject: "BREAK", teacher: "", room: "", type: "break" },
    { 
      subject: "Physics", 
      teacher: "Prof. Muhammad Ali", 
      room: "105", 
      type: "theory",
      topics: "Optics: Light and Reflection",
      description: "Explored laws of reflection and refraction. Discussed image formation in mirrors and lenses.",
      practice: "Solve optics problems. Practice ray diagram construction.",
             homework: "Complete optics worksheet. Due Date: Wednesday",
      materials: "Optics textbook, Ray diagram templates, Calculator"
    },
    { 
      subject: "English", 
      teacher: "Ms. Ayesha Malik", 
      room: "103", 
      type: "theory",
      topics: "Writing: Essay Structure and Style",
      description: "Learned about essay organization, thesis statements, and supporting evidence. Practiced writing introductions.",
      practice: "Write 3 different essay introductions. Practice thesis statement writing.",
             homework: "Write a complete essay on a topic of choice. Due Date: Monday",
      materials: "Writing guide, Essay templates, Style manual"
    },
    { subject: "LUNCH", teacher: "", room: "", type: "break" },
    { 
      subject: "Computer Science", 
      teacher: "Mr. Hassan Raza", 
      room: "106", 
      type: "theory",
      topics: "Software Engineering: Design Patterns",
      description: "Introduction to common design patterns in software development. Discussed singleton, factory, and observer patterns.",
      practice: "Implement 3 design patterns in code. Practice with different scenarios.",
             homework: "Design a software system using design patterns. Due Date: Monday",
      materials: "Software engineering textbook, Design pattern examples, UML tools"
    },
    { 
      subject: "Assembly", 
      teacher: "Dr. Imran Sheikh", 
      room: "Auditorium", 
      type: "activity",
      topics: "School Announcements and Awards",
      description: "Weekly assembly with important announcements, student achievements recognition, and motivational speeches.",
      practice: "Practice public speaking skills. Participate in school activities.",
             homework: "Prepare for next week's assembly if you have a role. Due Date: Ongoing",
      materials: "Assembly schedule, School announcements, Achievement certificates"
    },
  ],
  Saturday: [
    { 
      subject: "Project Work", 
      teacher: "All Teachers", 
      room: "Various", 
      type: "project",
      topics: "Interdisciplinary Project Development",
      description: "Work on long-term projects combining multiple subjects. Collaborate with peers and teachers.",
      practice: "Work on your project milestones. Practice research and presentation skills.",
             homework: "Complete project phase 2. Due Date: Next Saturday",
      materials: "Project guidelines, Research materials, Presentation tools"
    },
    { 
      subject: "Mathematics", 
      teacher: "Dr. Ahmed Khan", 
      room: "101", 
      type: "theory",
      topics: "Calculus: Review and Practice",
      description: "Comprehensive review of all calculus topics covered this week. Solved challenging problems and clarified doubts.",
      practice: "Review all calculus concepts. Practice with mixed problems.",
             homework: "Complete review worksheet. Due Date: Monday",
      materials: "Calculus textbook, Review materials, Practice problems"
    },
    { 
      subject: "Science Quiz", 
      teacher: "Dr. Fatima Sheikh", 
      room: "102", 
      type: "activity",
      topics: "Science Knowledge Competition",
      description: "Participated in science quiz competition. Answered questions from physics, chemistry, and biology.",
      practice: "Review science concepts. Practice quiz-style questions.",
             homework: "Prepare for next week's quiz. Due Date: Ongoing",
      materials: "Science textbooks, Quiz materials, Study guides"
    },
    { subject: "BREAK", teacher: "", room: "", type: "break" },
    { 
      subject: "Sports", 
      teacher: "Coach Tariq Ahmed", 
      room: "Ground", 
      type: "activity",
      topics: "Team Sports: Basketball Tournament",
      description: "Participated in inter-class basketball tournament. Practiced teamwork and sportsmanship.",
      practice: "Practice basketball skills daily. Work on team coordination.",
             homework: "Watch basketball games and analyze strategies. Due Date: Sunday",
      materials: "Basketball equipment, Team uniforms, Sports gear"
    },
    { 
      subject: "Club Activities", 
      teacher: "Various", 
      room: "Various", 
      type: "activity",
      topics: "Student Club Meetings and Activities",
      description: "Participated in various student clubs including science club, literature club, and coding club.",
      practice: "Participate actively in club activities. Develop leadership skills.",
             homework: "Prepare for next club meeting. Due Date: Ongoing",
      materials: "Club materials, Activity schedules, Leadership resources"
    },
    { subject: "LUNCH", teacher: "", room: "", type: "break" },
    { 
      subject: "Study Hall", 
      teacher: "Ms. Ayesha Malik", 
      room: "103", 
      type: "study",
      topics: "Independent Study and Homework",
      description: "Quiet study time to complete homework, review lessons, and prepare for upcoming classes.",
      practice: "Complete pending assignments. Review difficult concepts.",
             homework: "Finish all pending homework. Due Date: Monday",
      materials: "Study materials, Homework assignments, Reference books"
    },
    { 
      subject: "Free Period", 
      teacher: "", 
      room: "", 
      type: "free",
      topics: "Personal Time and Relaxation",
      description: "Free time for personal activities, relaxation, or catching up with friends.",
      practice: "Use time productively. Balance work and relaxation.",
             homework: "Plan for next week. Due Date: Ongoing",
      materials: "Personal planner, Relaxation activities, Social time"
    },
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

// Component for displaying detailed class information
const ClassDetailsDialog = ({ 
  classData, 
  day, 
  time 
}: { 
  classData: any; 
  day: string; 
  time: string; 
}) => {
  if (classData.type === "break" || classData.type === "free") {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer hover:scale-105 transition-transform">
          <div className={`rounded-lg border p-2 sm:p-3 h-full ${getSubjectColor(classData.type)} shadow-sm hover:shadow-md transition-shadow`}>
            <div className="font-semibold text-xs sm:text-sm mb-1 text-center sm:text-left">
              {classData.subject}
            </div>
            {classData.teacher && (
              <>
                <div className="flex items-center gap-1 text-xs mb-1 justify-center sm:justify-start">
                  <User className="h-3 w-3" />
                  <span className="truncate">{classData.teacher}</span>
                </div>
                <div className="flex items-center gap-1 text-xs justify-center sm:justify-start">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{classData.room}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            {classData.subject} - {day}
          </DialogTitle>
          <DialogDescription>
            {time} • {classData.teacher} • Room {classData.room}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Topic Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-lg font-semibold text-primary">
              <BookOpen className="h-5 w-5" />
              Topic Details
            </div>
            <div className="space-y-3">
              <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
                <p className="font-semibold text-primary mb-1">{classData.chapter}</p>
                <p className="text-foreground mb-1">Topic: {classData.topic}</p>
                <p className="text-sm text-muted-foreground">Page: {classData.page}</p>
              </div>
            </div>
          </div>

          {/* Class Description */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-lg font-semibold text-secondary">
              <Lightbulb className="h-5 w-5" />
              What We Learned
            </div>
            <p className="text-foreground bg-secondary/5 p-3 rounded-lg border border-secondary/20">
              {classData.description}
            </p>
          </div>

          {/* Practice Suggestions */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-lg font-semibold text-accent">
              <AlertCircle className="h-5 w-5" />
              Practice Suggestions
            </div>
            <p className="text-foreground bg-accent/5 p-3 rounded-lg border border-accent/20">
              {classData.practice}
            </p>
          </div>

                     {/* Homework */}
           <div className="space-y-2">
             <div className="flex items-center gap-2 text-lg font-semibold text-orange-600">
               <Calendar className="h-5 w-5" />
               Homework
             </div>
             <p className="text-foreground bg-orange-50 p-3 rounded-lg border border-orange-200">
               {classData.homework}
             </p>
           </div>

                     

           {/* Materials & Resources For HomeWork */}
           <div className="space-y-2">
             <div className="flex items-center gap-2 text-lg font-semibold text-green-600">
               <BookOpen className="h-5 w-5" />
               Materials & Resources For HomeWork
             </div>
             <div className="bg-green-50 p-3 rounded-lg border border-green-200">
               <p className="text-foreground mb-2">{classData.materials}</p>
               {classData.videoLink && (
                 <div className="mt-3">
                   <a 
                     href={classData.videoLink} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 underline transition-colors"
                   >
                     <span>📹 Watch Video Tutorial</span>
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                     </svg>
                   </a>
                 </div>
               )}
             </div>
           </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function Timetable() {
  const handlePrint = () => {
    // Get the timetable table element
    const timetableTable = document.querySelector('.overflow-x-auto table');
    
    if (!timetableTable) {
      alert('Timetable not found. Please try again.');
      return;
    }

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to print the timetable.');
      return;
    }

    // Get the current styles
    const styles = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          margin: 0;
          padding: 20px;
          background: white;
          color: #1f2937;
        }
        
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 12px;
        }
        
        .header h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 10px 0;
        }
        
        .header p {
          font-size: 16px;
          margin: 5px 0;
          opacity: 0.9;
        }
        
        .badges {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 15px;
        }
        
        .badge {
          background: rgba(255, 255, 255, 0.2);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
        }
        
        .timetable-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          margin-bottom: 30px;
        }
        
        .timetable-header {
          background: #f8fafc;
          padding: 20px;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .timetable-header h2 {
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 5px 0;
          color: #1f2937;
        }
        
        .timetable-header p {
          color: #6b7280;
          margin: 0;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        
        th {
          background: #f1f5f9;
          padding: 15px;
          text-align: left;
          font-weight: 600;
          color: #1f2937;
          border-bottom: 2px solid #e2e8f0;
          min-width: 120px;
        }
        
        td {
          padding: 12px;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: top;
        }
        
        .time-cell {
          background: #f8fafc;
          font-weight: 500;
          color: #374151;
        }
        
        .subject-card {
          background: #eff6ff;
          border: 1px solid #dbeafe;
          border-radius: 8px;
          padding: 12px;
          margin: 2px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .subject-card:hover {
          background: #dbeafe;
          transform: translateY(-1px);
        }
        
        .subject-name {
          font-weight: 600;
          color: #1e40af;
          margin-bottom: 5px;
        }
        
        .subject-details {
          font-size: 12px;
          color: #6b7280;
        }
        
        .break-cell {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 12px;
          text-align: center;
          color: #6b7280;
          font-weight: 500;
        }
        
        .legend {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          padding: 20px;
        }
        
        .legend h3 {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 15px 0;
          color: #1f2937;
        }
        
        .legend-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        
        .legend-section h4 {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 10px 0;
          color: #1e40af;
        }
        
        .legend-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .legend-section li {
          padding: 3px 0;
          color: #6b7280;
          font-size: 14px;
        }
        
        .legend-section li:before {
          content: "•";
          color: #1e40af;
          font-weight: bold;
          margin-right: 8px;
        }
        
        @media print {
          body { padding: 0; }
          .header { background: #f3f4f6 !important; color: #1f2937 !important; }
          .timetable-container { box-shadow: none; border: 1px solid #d1d5db; }
          .legend { box-shadow: none; border: 1px solid #d1d5db; }
        }
      </style>
    `;

    // Create the HTML content with the actual timetable
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Class Timetable - 10-A Science</title>
          <meta charset="utf-8">
        </head>
        <body>
          ${styles}
          
          <div class="header">
            <h1>Interactive Class Timetable</h1>
            <p>Select a subject to see today's lessons by chapter, topic, and page.</p>
            <div class="badges">
              <span class="badge">January 2025 - Week 3</span>
              <span class="badge">School Hours: 09:00 AM - 03:30 PM</span>
            </div>
          </div>
          
          <div class="timetable-container">
            <div class="timetable-header">
              <h2>Weekly Schedule - Click Subjects for Chapter Details</h2>
              <p>Interactive timetable with chapter information, topics, and page numbers for each day</p>
            </div>
            
            ${timetableTable.outerHTML}
          </div>
          
          <div class="legend">
            <h3>Interactive Features</h3>
            <p style="color: #6b7280; margin-bottom: 20px;">Click on any subject to view chapter information, topics, and page numbers</p>
            
            <div class="legend-grid">
              <div class="legend-section">
                <h4>Theory Classes</h4>
                <ul>
                  <li>View chapter and topic details</li>
                  <li>Check page numbers in textbook</li>
                  <li>Access practice suggestions</li>
                  <li>See homework assignments</li>
                </ul>
              </div>
              
              <div class="legend-section">
                <h4>Practical Classes</h4>
                <ul>
                  <li>View chapter and experiment details</li>
                  <li>Check lab manual page numbers</li>
                  <li>See practice exercises</li>
                  <li>Access lab report guidelines</li>
                </ul>
              </div>
              
              <div class="legend-section">
                <h4>Activities</h4>
                <ul>
                  <li>View chapter and activity details</li>
                  <li>Check participation requirements</li>
                  <li>See practice suggestions</li>
                  <li>Access activity materials</li>
                </ul>
              </div>
              
              <div class="legend-section">
                <h4>Project Work</h4>
                <ul>
                  <li>View chapter and project guidelines</li>
                  <li>Check milestones and deadlines</li>
                  <li>See collaboration details</li>
                  <li>Access project resources</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding: 20px; color: #6b7280; border-top: 1px solid #e5e7eb;">
            <p>Downloaded from Student Portal • Date: ${new Date().toLocaleDateString()}</p>
          </div>
        </body>
      </html>
    `;

    // Write the content to the new window
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load, then automatically trigger print dialog
    printWindow.onload = function() {
      setTimeout(() => {
        printWindow.print();
        // Close the window after printing
        setTimeout(() => printWindow.close(), 1000);
      }, 500);
    };
  };

  const handleDownload = () => {
    // Get the timetable table element
    const timetableTable = document.querySelector('.overflow-x-auto table');
    
    if (!timetableTable) {
      alert('Timetable not found. Please try again.');
      return;
    }

    // Create the HTML content with the actual timetable
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Class Timetable - 10-A Science</title>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              margin: 0;
              padding: 20px;
              background: white;
              color: #1f2937;
            }
            
            .header {
              text-align: center;
              margin-bottom: 30px;
              padding: 20px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              border-radius: 12px;
            }
            
            .header h1 {
              font-size: 28px;
              font-weight: 700;
              margin: 0 0 10px 0;
            }
            
            .header p {
              font-size: 16px;
              margin: 5px 0;
              opacity: 0.9;
            }
            
            .badges {
              display: flex;
              justify-content: center;
              gap: 15px;
              margin-top: 15px;
            }
            
            .badge {
              background: rgba(255, 255, 255, 0.2);
              padding: 8px 16px;
              border-radius: 20px;
              font-size: 14px;
              font-weight: 500;
            }
            
            .timetable-container {
              background: white;
              border-radius: 12px;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              margin-bottom: 30px;
            }
            
            .timetable-header {
              background: #f8fafc;
              padding: 20px;
              border-bottom: 1px solid #e2e8f0;
            }
            
            .timetable-header h2 {
              font-size: 20px;
              font-weight: 600;
              margin: 0 0 5px 0;
              color: #1f2937;
            }
            
            .timetable-header p {
              color: #6b7280;
              margin: 0;
            }
            
            table {
              width: 100%;
              border-collapse: collapse;
              font-size: 14px;
            }
            
            th {
              background: #f1f5f9;
              padding: 15px;
              text-align: left;
              font-weight: 600;
              color: #1f2937;
              border-bottom: 2px solid #e2e8f0;
              min-width: 120px;
            }
            
            td {
              padding: 12px;
              border-bottom: 1px solid #f1f5f9;
              vertical-align: top;
            }
            
            .time-cell {
              background: #f8fafc;
              font-weight: 500;
              color: #374151;
            }
            
            .subject-card {
              background: #eff6ff;
              border: 1px solid #dbeafe;
              border-radius: 8px;
              padding: 12px;
              margin: 2px;
              cursor: pointer;
              transition: all 0.2s;
            }
            
            .subject-card:hover {
              background: #dbeafe;
              transform: translateY(-1px);
            }
            
            .subject-name {
              font-weight: 600;
              color: #1e40af;
              margin-bottom: 5px;
            }
            
            .subject-details {
              font-size: 12px;
              color: #6b7280;
            }
            
            .break-cell {
              background: #f9fafb;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              padding: 12px;
              text-align: center;
              color: #6b7280;
              font-weight: 500;
            }
            
            .legend {
              background: white;
              border-radius: 12px;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
              padding: 20px;
            }
            
            .legend h3 {
              font-size: 18px;
              font-weight: 600;
              margin: 0 0 15px 0;
              color: #1f2937;
            }
            
            .legend-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
              gap: 20px;
            }
            
            .legend-section h4 {
              font-size: 16px;
              font-weight: 600;
              margin: 0 0 10px 0;
              color: #1e40af;
            }
            
            .legend-section ul {
              list-style: none;
              padding: 0;
              margin: 0;
            }
            
            .legend-section li {
              padding: 3px 0;
              color: #6b7280;
              font-size: 14px;
            }
            
            .legend-section li:before {
              content: "•";
              color: #1e40af;
              font-weight: bold;
              margin-right: 8px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Interactive Class Timetable</h1>
            <p>Select a subject to see today's lessons by chapter, topic, and page.</p>
            <div class="badges">
              <span class="badge">January 2025 - Week 3</span>
              <span class="badge">School Hours: 09:00 AM - 03:30 PM</span>
            </div>
          </div>
          
          <div class="timetable-container">
            <div class="timetable-header">
              <h2>Weekly Schedule - Click Subjects for Chapter Details</h2>
              <p>Interactive timetable with chapter information, topics, and page numbers for each day</p>
            </div>
            
            ${timetableTable.outerHTML}
          </div>
          
          <div class="legend">
            <h3>Interactive Features</h3>
            <p style="color: #6b7280; margin-bottom: 20px;">Click on any subject to view chapter information, topics, and page numbers</p>
            
            <div class="legend-grid">
              <div class="legend-section">
                <h4>Theory Classes</h4>
                <ul>
                  <li>View chapter and topic details</li>
                  <li>Check page numbers in textbook</li>
                  <li>Access practice suggestions</li>
                  <li>See homework assignments</li>
                </ul>
              </div>
              
              <div class="legend-section">
                <h4>Practical Classes</h4>
                <ul>
                  <li>View chapter and experiment details</li>
                  <li>Check lab manual page numbers</li>
                  <li>See practice exercises</li>
                  <li>Access lab report guidelines</li>
                </ul>
              </div>
              
              <div class="legend-section">
                <h4>Activities</h4>
                <ul>
                  <li>View chapter and activity details</li>
                  <li>Check participation requirements</li>
                  <li>See practice suggestions</li>
                  <li>Access activity materials</li>
                </ul>
              </div>
              
              <div class="legend-section">
                <h4>Project Work</h4>
                <ul>
                  <li>View chapter and project guidelines</li>
                  <li>Check milestones and deadlines</li>
                  <li>See collaboration details</li>
                  <li>Access project resources</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding: 20px; color: #6b7280; border-top: 1px solid #e5e7eb;">
            <p>Downloaded from Student Portal • Date: ${new Date().toLocaleDateString()}</p>
          </div>
        </body>
      </html>
    `;

    // Create a blob with the HTML content
    const blob = new Blob([htmlContent], { type: 'text/html' });
    
    // Create download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'class-timetable.html';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the object URL
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Interactive Class Timetable
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">Select a subject to see today's lessons by chapter, topic, and page.</p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2 text-xs sm:text-sm">
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

      {/* Interactive Timetable */}
      <Card className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 backdrop-blur-sm border shadow-card overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border-b">
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Clock className="h-5 w-5 text-blue-600" />
            <span className="text-lg sm:text-xl">Weekly Schedule - Click Subjects for Chapter Details</span>
          </CardTitle>
          <CardDescription className="text-blue-700/80 text-sm sm:text-base">
            Interactive timetable with chapter information, topics, and page numbers for each day
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gradient-to-r from-blue-100/50 to-indigo-100/50">
                  <th className="text-left p-2 sm:p-4 font-semibold text-blue-900 text-xs sm:text-sm min-w-[100px] sm:min-w-[120px]">Time</th>
                  {weekDays.map((day) => (
                    <th key={day} className="text-left p-2 sm:p-4 font-semibold text-blue-900 text-xs sm:text-sm min-w-[120px] sm:min-w-[160px]">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((time, timeIndex) => (
                  <tr key={time} className="border-b hover:bg-blue-50/30 transition-colors">
                    <td className="p-2 sm:p-4 font-semibold text-xs sm:text-sm bg-gradient-to-r from-blue-50/80 to-indigo-50/80 text-blue-800">
                      {time}
                    </td>
                    {weekDays.map((day) => {
                      const classData = timetableData[day as keyof typeof timetableData][timeIndex];
                      const isBreak = classData.type === "break";
                      
                      return (
                        <td key={`${day}-${timeIndex}`} className="p-1 sm:p-2">
                          {isBreak ? (
                          <div className={`rounded-lg border p-2 sm:p-3 h-full ${getSubjectColor(classData.type)}`}>
                            <div className="font-semibold text-xs sm:text-sm mb-1 text-center">
                              {classData.subject}
                            </div>
                                </div>
                          ) : (
                            <ClassDetailsDialog 
                              classData={classData} 
                              day={day} 
                              time={time} 
                            />
                          )}
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

      {/* Enhanced Legend */}
      <Card className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 backdrop-blur-sm border shadow-card">
        <CardHeader className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border-b">
          <CardTitle className="text-lg text-blue-900">Interactive Features</CardTitle>
          <CardDescription className="text-blue-700/80">Click on any subject to view chapter information, topics, and page numbers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-primary">Theory Classes</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• View chapter and topic details</p>
                <p>• Check page numbers in textbook</p>
                <p>• Access practice suggestions</p>
                <p>• See homework assignments</p>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-accent">Practical Classes</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• View chapter and experiment details</p>
                <p>• Check lab manual page numbers</p>
                <p>• See practice exercises</p>
                <p>• Access lab report guidelines</p>
            </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-emerald-600">Activities</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• View chapter and activity details</p>
                <p>• Check participation requirements</p>
                <p>• See practice suggestions</p>
                <p>• Access activity materials</p>
            </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-purple-600">Project Work</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• View chapter and project guidelines</p>
                <p>• Check milestones and deadlines</p>
                <p>• See collaboration details</p>
                <p>• Access project resources</p>
            </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}