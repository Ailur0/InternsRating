import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import DashboardLayout from "./pages/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Interns from "./pages/Interns";
import InternProfile from "./pages/InternProfile";
import Ratings from "./pages/Ratings";
import SubmitRating from "./pages/SubmitRating";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import RatingPeriods from "./pages/RatingPeriods";
import AuditLog from "./pages/AuditLog";
import Notifications from "./pages/Notifications";
import CompareInterns from "./pages/CompareInterns";
import ImportInterns from "./pages/ImportInterns";
import Reminders from "./pages/Reminders";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="interns" element={<Interns />} />
            <Route path="interns/:id" element={<InternProfile />} />
            <Route path="ratings" element={<Ratings />} />
            <Route path="ratings/submit" element={<SubmitRating />} />
            <Route path="periods" element={<RatingPeriods />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="audit-log" element={<AuditLog />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="compare" element={<CompareInterns />} />
            <Route path="import" element={<ImportInterns />} />
            <Route path="reminders" element={<Reminders />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
