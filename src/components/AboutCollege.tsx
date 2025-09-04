import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import campus from "@/assets/college-campus.jpg";
import hero from "@/assets/hero-education.jpg";
import student from "@/assets/student-profile.jpg";
import introVideo from "@/assets/intro.mp4";

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="text-center">
    <div className="text-2xl font-bold text-white">{value}</div>
    <div className="text-xs text-white/80">{label}</div>
  </div>
);

export default function AboutCollege() {
  return (
    <div className="p-0">
      {/* Hero */}
      <section className="relative">
        <img src={campus} alt="School" className="h-[340px] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/60" />
        {/* Top-right Contact button positioned relative to the section */}
        <div className="absolute top-4 right-4 z-10">
          <Link to="/contact">
            <Button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg shadow-lg">Contact Us</Button>
          </Link>
        </div>
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-6xl mx-auto w-full px-4 pb-10 pt-28 sm:pt-0 relative">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white">BLUE ESTATE SCHOOL</h1>
            <p className="text-white/90 mt-2 max-w-2xl">Where curiosity meets opportunity. Discover our story, mission and vibrant school life.</p>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { l: "Students", v: "4806" },
                { l: "Courses", v: "265" },
                { l: "Teachers", v: "649" },
                { l: "Awards", v: "310" }
              ].map((s) => (
                <div key={s.l} className="rounded-lg bg-white/10 backdrop-blur p-4 text-white">
                  <div className="text-2xl font-bold">{s.v}</div>
                  <div className="text-xs opacity-90">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About + Highlights */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold">When Your Dreams Meet a Chance</h2>
            <p className="text-muted-foreground mt-3">
              We provide an inspiring learning environment with hands‑on experiences, supportive mentors and
              real‑world exposure so every learner can thrive and lead with impact.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {["Experiential learning", "Career mentorship", "Inclusive community", "Global tie‑ups"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">{f}</span>
                </div>
              ))}
            </div>
            <Button className="mt-6">Explore programs</Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[hero, student, campus, hero].map((src, i) => (
              <img key={i} src={src} className="h-40 w-full object-cover rounded-lg shadow-card" alt="highlight" />
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
              <CardDescription>Educate. Empower. Elevate.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              We commit to academic excellence and holistic development through research, creativity and community engagement.
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Our Vision</CardTitle>
              <CardDescription>Leaders for a better world</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              A future‑ready campus recognized for innovation, ethics and inclusivity across disciplines.
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Core Values</CardTitle>
              <CardDescription>Excellence • Integrity • Diversity</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              We champion intellectual curiosity, mutual respect, service and sustainable progress.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Facilities */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">School Facilities</h2>
            <p className="text-sm text-muted-foreground mt-1">Modern resources crafted for focused learning</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { t: "Smart Classrooms" },
            { t: "Central Library" },
            { t: "Innovation Labs" },
            { t: "Sports Complex" },
            { t: "Student Housing" },
            { t: "Health Center" }
          ].map((f) => (
            <Card key={f.t} className="border-dashed">
              <CardContent className="p-5">
                <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center mb-3">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div className="font-medium">{f.t}</div>
                <p className="text-xs text-muted-foreground mt-1">Well‑equipped and student‑centric spaces.</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Video & Notice */}
      <section className="max-w-6xl mx-auto px-4 py-4">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="overflow-hidden md:col-span-2">
            <div className="relative pb-[56.25%] h-0">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                controls
                preload="metadata"
                poster={campus}
              >
                <source src={introVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <CardContent className="p-4">
              <div className="font-semibold">School Life Reel</div>
              <p className="text-sm text-muted-foreground">A quick glimpse of events, clubs and achievements.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Notice Board</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {["New class schedule", "Exam forms due", "PTM: Friday"].map((t) => (
                <div key={t} className="rounded-md bg-muted px-3 py-2 text-sm flex items-center justify-between">
                  <span>{t}</span>
                  <Badge variant="secondary">View</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold">What Students Say</h2>
          <p className="text-sm text-muted-foreground mt-1">Trusted by families and educators worldwide</p>
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {["Student 1", "Student 2"].map((name) => (
            <Card key={name}>
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <img src={student} alt={name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <div className="font-medium">{name}</div>
                    <p className="text-sm text-muted-foreground mt-1">"Inspirational faculty and supportive peers helped me discover my path."</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-primary to-primary/80">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <h3 className="text-2xl font-bold">Ready to start your journey?</h3>
          <p className="text-white/90 mt-2 max-w-2xl mx-auto">Apply now and unlock access to a thriving community, expert mentors and world‑class resources.</p>
          <div className="mt-6 flex gap-3 justify-center">
            <Button variant="secondary">Apply Today</Button>
            <Button className="bg-white text-primary hover:bg-white/90">Get Brochure</Button>
          </div>
        </div>
      </section>

      {/* Blog + Hours */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold">Latest News</h2>
            <div className="mt-4 grid sm:grid-cols-3 gap-4">
              {[
                { date: "Jul 12, 2025", title: "Digital Transformation in Classrooms", src: hero },
                { date: "Jul 14, 2025", title: "Science Fair: Young Innovators", src: campus },
                { date: "Jul 16, 2025", title: "Sports Meet Highlights", src: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=450&fit=crop&crop=center" }
              ].map((p) => (
                <Card key={p.title} className="overflow-hidden">
                  <img src={p.src} alt={p.title} className="h-28 w-full object-cover" />
                  <CardContent className="p-4">
                    <div className="text-xs text-muted-foreground">{p.date}</div>
                    <div className="font-medium text-sm mt-1">{p.title}</div>
                    <Button size="sm" variant="link" className="px-0">Read more</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Opening Hours</CardTitle>
              <CardDescription>Visit us on working days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[ ["Mon-Fri", "09:00 — 17:00"],["Sat", "09:00 — 14:00"],["Sun", "Closed"]].map(([d,t]) => (
                  <div key={d} className="flex items-center justify-between border-b py-2 col-span-2">
                    <span>{d}</span>
                    <span className="text-muted-foreground">{t}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary/95 text-white">
        <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 sm:grid-cols-3">
          <div className="text-center sm:text-left">
            <div className="text-xl sm:text-2xl font-bold">AI-Powered Edu</div>
            <p className="text-xs sm:text-sm text-white/80 mt-2">A simple, powerful & elegant school management system.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:contents">
            <div className="text-center sm:text-left">
              <div className="font-semibold">Company</div>
              <ul className="mt-2 space-y-1 text-xs sm:text-sm text-white/80">
                <li>About</li>
                <li>Contact</li>
                <li>Careers</li>
              </ul>
            </div>
            <div className="text-center sm:text-left">
              <div className="font-semibold">Categories</div>
              <ul className="mt-2 space-y-1 text-xs sm:text-sm text-white/80">
                <li>Blog</li>
                <li>News</li>
                <li>Events</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20">
          <div className="max-w-6xl mx-auto px-4 py-4 text-center sm:text-left text-[11px] sm:text-xs text-white/70">© 2025 AI-Powered Edu. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}