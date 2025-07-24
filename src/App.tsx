import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import StudentProfile from "./components/StudentProfile";
import AboutCollege from "./components/AboutCollege";
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
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="about" element={<AboutCollege />} />
            <Route path="performance" element={<div className="p-6"><h1 className="text-2xl font-bold">Performance - Coming Soon</h1></div>} />
            <Route path="timetable" element={<div className="p-6"><h1 className="text-2xl font-bold">Timetable - Coming Soon</h1></div>} />
            <Route path="notes" element={<div className="p-6"><h1 className="text-2xl font-bold">Notes - Coming Soon</h1></div>} />
            <Route path="results" element={<div className="p-6"><h1 className="text-2xl font-bold">Results - Coming Soon</h1></div>} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
