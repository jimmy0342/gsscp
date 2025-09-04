import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import StudentProfile from "./components/StudentProfile";
import AboutCollege from "./components/AboutCollege";
import Performance from "./components/Performance";
import Timetable from "./components/Timetable";
import Notes from "./components/Notes";
import Results from "./components/Results";
import Attendance from "./components/Attendance";
import FeeCollection from "./components/FeeCollection";
import AIChat from "./components/AIChat";
import Notifications from "./components/Notifications";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

// AI Chat Info Pages
import AIChatInfo from "./pages/AIChatInfo";
import StudentAIChatTracker from "./pages/ai-chat-info/StudentAIChatTracker";
import SubjectTeacherAIChatTracker from "./pages/ai-chat-info/SubjectTeacherAIChatTracker";
import ClassTeacherAIChatTracker from "./pages/ai-chat-info/ClassTeacherAIChatTracker";
import AdminAIChatTracker from "./pages/ai-chat-info/AdminAIChatTracker";

// Math Teacher Components
import MathTeacherLayout from "./components/subject-teacher/MathTeacherLayout";
import MathTeacherTimetableChat from "./components/subject-teacher/MathTeacherTimetableChat";

// Subject Teacher Components (AI Chat only)
import SubjectTeacherLayout from "./components/subject-teacher/SubjectTeacherLayout";
import SubjectTeacherAIChat from "./components/subject-teacher/SubjectTeacherAIChat";

// Class Teacher Components (AI Chat only)
import ClassTeacherLayout from "./components/class-teacher/ClassTeacherLayout";
import ClassTeacherAIChat from "./components/class-teacher/ClassTeacherAIChat";

// Admin Components (AI Chat only)
import AdminLayout from "./components/admin/AdminLayout";
import AdminAIChat from "./components/admin/AdminAIChat";
import ContactUs from "./pages/ContactUs";
import StudentMessages from "./pages/StudentMessages";
import SubjectTeacherMessages from "./pages/SubjectTeacherMessages";
import ClassTeacherMessages from "./pages/ClassTeacherMessages";
import AdminMessages from "./pages/AdminMessages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Home Page */}
          <Route path="/home" element={<Home />} />

          {/* AI Chat Info Routes */}
          <Route path="/ai-chat-info" element={<AIChatInfo />} />
          <Route path="/ai-chat-info/student" element={<StudentAIChatTracker />} />
          <Route path="/ai-chat-info/subject-teacher" element={<SubjectTeacherAIChatTracker />} />
          <Route path="/ai-chat-info/class-teacher" element={<ClassTeacherAIChatTracker />} />
          <Route path="/ai-chat-info/admin" element={<AdminAIChatTracker />} />

          {/* Student Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<StudentProfile />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="about" element={<AboutCollege />} />
            <Route path="performance" element={<Performance />} />
            <Route path="timetable" element={<Timetable />} />
            <Route path="notes" element={<Notes />} />
            <Route path="results" element={<Results />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="fee-collection" element={<FeeCollection />} />
            <Route path="ai-chat" element={<AIChat />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="messages" element={<StudentMessages />} />
          </Route>

          {/* Math Teacher Routes */}
          <Route path="/math-teacher" element={<MathTeacherLayout />}>
            <Route index element={<MathTeacherTimetableChat />} />
          </Route>

          {/* Subject Teacher Routes */}
          <Route path="/subject-teacher" element={<SubjectTeacherLayout />}>
            <Route index element={<SubjectTeacherAIChat />} />
            <Route path="messages" element={<SubjectTeacherMessages />} />
          </Route>

          {/* Class Teacher Routes */}
          <Route path="/class-teacher" element={<ClassTeacherLayout />}>
            <Route index element={<ClassTeacherAIChat />} />
            <Route path="messages" element={<ClassTeacherMessages />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminAIChat />} />
            <Route path="messages" element={<AdminMessages />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
