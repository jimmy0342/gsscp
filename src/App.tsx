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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
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
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
