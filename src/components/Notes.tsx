import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Download, Eye, Search, Calendar, FileText, Filter } from "lucide-react";

const notesData = {
  Mathematics: [
    {
      title: "Calculus - Derivatives and Applications",
      fileName: "calculus_derivatives.pdf",
      size: "2.4 MB",
      uploadDate: "2024-06-15",
      topic: "Calculus",
      description: "Complete notes on derivatives, chain rule, and real-world applications"
    },
    {
      title: "Algebra - Quadratic Equations",
      fileName: "algebra_quadratic.pdf",
      size: "1.8 MB",
      uploadDate: "2024-06-10",
      topic: "Algebra",
      description: "Solving quadratic equations using various methods"
    },
    {
      title: "Geometry - 3D Coordinate Systems",
      fileName: "geometry_3d.pdf",
      size: "3.1 MB",
      uploadDate: "2024-06-05",
      topic: "Geometry",
      description: "Understanding 3D coordinate geometry and vector applications"
    },
    {
      title: "Statistics - Probability Distributions",
      fileName: "statistics_probability.pdf",
      size: "2.7 MB",
      uploadDate: "2024-05-28",
      topic: "Statistics",
      description: "Normal, binomial, and Poisson distributions explained"
    }
  ],
  Physics: [
    {
      title: "Mechanics - Laws of Motion",
      fileName: "mechanics_motion.pdf",
      size: "3.2 MB",
      uploadDate: "2024-06-12",
      topic: "Mechanics",
      description: "Newton's laws and their applications in real scenarios"
    },
    {
      title: "Electromagnetics - Maxwell's Equations",
      fileName: "electromagnetics_maxwell.pdf",
      size: "4.1 MB",
      uploadDate: "2024-06-08",
      topic: "Electromagnetics",
      description: "Complete derivation and applications of Maxwell's equations"
    },
    {
      title: "Thermodynamics - Heat Engines",
      fileName: "thermodynamics_engines.pdf",
      size: "2.9 MB",
      uploadDate: "2024-06-01",
      topic: "Thermodynamics",
      description: "Carnot cycle, efficiency, and practical heat engines"
    },
    {
      title: "Optics - Wave Properties of Light",
      fileName: "optics_waves.pdf",
      size: "3.5 MB",
      uploadDate: "2024-05-25",
      topic: "Optics",
      description: "Interference, diffraction, and polarization of light"
    }
  ],
  Chemistry: [
    {
      title: "Organic Chemistry - Reaction Mechanisms",
      fileName: "organic_mechanisms.pdf",
      size: "5.2 MB",
      uploadDate: "2024-06-14",
      topic: "Organic",
      description: "SN1, SN2, E1, E2 mechanisms with examples"
    },
    {
      title: "Physical Chemistry - Chemical Kinetics",
      fileName: "physical_kinetics.pdf",
      size: "3.8 MB",
      uploadDate: "2024-06-09",
      topic: "Physical",
      description: "Reaction rates, catalysis, and activation energy"
    },
    {
      title: "Inorganic Chemistry - Coordination Compounds",
      fileName: "inorganic_coordination.pdf",
      size: "4.3 MB",
      uploadDate: "2024-06-03",
      topic: "Inorganic",
      description: "Complex formation, isomerism, and crystal field theory"
    }
  ],
  Biology: [
    {
      title: "Cell Biology - Molecular Genetics",
      fileName: "cell_genetics.pdf",
      size: "6.1 MB",
      uploadDate: "2024-06-11",
      topic: "Cell Biology",
      description: "DNA replication, transcription, and translation processes"
    },
    {
      title: "Ecology - Ecosystem Dynamics",
      fileName: "ecology_ecosystem.pdf",
      size: "4.7 MB",
      uploadDate: "2024-06-06",
      topic: "Ecology",
      description: "Energy flow, nutrient cycles, and biodiversity"
    },
    {
      title: "Human Physiology - Nervous System",
      fileName: "physiology_nervous.pdf",
      size: "5.3 MB",
      uploadDate: "2024-05-30",
      topic: "Physiology",
      description: "Neuron structure, synaptic transmission, and reflexes"
    }
  ],
  English: [
    {
      title: "Literature - Shakespeare Analysis",
      fileName: "literature_shakespeare.pdf",
      size: "2.1 MB",
      uploadDate: "2024-06-13",
      topic: "Literature",
      description: "Character analysis and themes in Hamlet and Macbeth"
    },
    {
      title: "Grammar - Advanced Syntax",
      fileName: "grammar_syntax.pdf",
      size: "1.6 MB",
      uploadDate: "2024-06-07",
      topic: "Grammar",
      description: "Complex sentence structures and syntactic analysis"
    },
    {
      title: "Writing - Essay Techniques",
      fileName: "writing_essays.pdf",
      size: "1.9 MB",
      uploadDate: "2024-06-02",
      topic: "Writing",
      description: "Argumentative and persuasive essay writing strategies"
    }
  ],
  "Computer Science": [
    {
      title: "Programming - Data Structures",
      fileName: "programming_datastructures.pdf",
      size: "4.8 MB",
      uploadDate: "2024-06-16",
      topic: "Programming",
      description: "Arrays, linked lists, stacks, queues, and trees"
    },
    {
      title: "Algorithms - Sorting and Searching",
      fileName: "algorithms_sorting.pdf",
      size: "3.4 MB",
      uploadDate: "2024-06-10",
      topic: "Algorithms",
      description: "Quick sort, merge sort, binary search, and complexity analysis"
    },
    {
      title: "Database - SQL Fundamentals",
      fileName: "database_sql.pdf",
      size: "2.8 MB",
      uploadDate: "2024-06-04",
      topic: "Database",
      description: "Database design, normalization, and SQL queries"
    }
  ]
};

export default function Notes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  
  const subjects = Object.keys(notesData);
  
  const filteredNotes = notesData[selectedSubject as keyof typeof notesData].filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewNote = (fileName: string) => {
    // In a real app, this would open a PDF viewer
    alert(`Opening ${fileName} in PDF viewer...`);
  };

  const handleDownloadNote = (fileName: string) => {
    // In a real app, this would download the PDF file
    alert(`Downloading ${fileName}...`);
  };

  const totalNotes = Object.values(notesData).reduce((total, subjectNotes) => total + subjectNotes.length, 0);

  return (
    <div className="min-h-screen bg-gradient-subtle p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Study Notes
        </h1>
        <p className="text-muted-foreground">Access your subject-wise study materials and notes</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Notes</p>
                <p className="text-2xl font-bold">{totalNotes}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <FileText className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Subjects</p>
                <p className="text-2xl font-bold">{subjects.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Download className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Downloaded</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notes by title, topic, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filter by subject</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes Content */}
      <Tabs value={selectedSubject} onValueChange={setSelectedSubject}>
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-6">
          {subjects.map((subject) => (
            <TabsTrigger key={subject} value={subject} className="text-xs">
              {subject.replace(" Science", "").replace("Computer", "CS")}
            </TabsTrigger>
          ))}
        </TabsList>

        {subjects.map((subject) => (
          <TabsContent key={subject} value={subject} className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNotes.map((note, index) => (
                <Card key={index} className="bg-card/80 backdrop-blur-sm border shadow-card hover:shadow-elegant transition-all duration-300 hover-scale">
                  <CardHeader>
                    <CardTitle className="text-lg leading-tight">{note.title}</CardTitle>
                    <CardDescription className="text-sm">{note.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(note.uploadDate).toLocaleDateString()}
                      </div>
                      <span>{note.size}</span>
                    </div>
                    
                    <div className="mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {note.topic}
                      </Badge>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleViewNote(note.fileName)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleDownloadNote(note.fileName)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredNotes.length === 0 && (
              <Card className="bg-card/80 backdrop-blur-sm border shadow-card">
                <CardContent className="p-8 text-center">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No notes found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm ? "Try adjusting your search terms" : "Notes for this subject will be added soon"}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}