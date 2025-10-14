import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ✅ Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import StudentLifecycle from "./pages/StudentLifecycle";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

// ✅ Role-based Dashboards
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MinistryDashboard from "./pages/MinistryDashboard";

import AuthRoute from "./components/AuthRoute";
import { supabase } from "@/integrations/supabase/client";

const queryClient = new QueryClient();

// ✅ Wrapper to hide Navbar/Footer on auth pages
const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const hideNavAndFooter = ["/login", "/signup", "/forgot-password"].includes(
    location.pathname
  );

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavAndFooter && <Navbar />}
      <main className="flex-1">{children}</main>
      {!hideNavAndFooter && <Footer />}
    </div>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  // ✅ Fetch user session & role from Supabase
  useEffect(() => {
    const fetchUserRole = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData?.session?.user;

      if (user) {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (!error && profile?.role) {
          setRole(profile.role);
          localStorage.setItem("role", profile.role);
        }
      } else {
        setRole(null);
        localStorage.removeItem("role");
      }

      setLoading(false);
    };

    fetchUserRole();

    // Listen for auth changes
    const { data: subscription } = supabase.auth.onAuthStateChange(() => {
      fetchUserRole();
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <p className="text-center p-10">Loading user session...</p>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <LayoutWrapper>
            <Routes>
              {/* 🏠 Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              {/* Features route alias for StudentLifecycle */}
              <Route path="/features" element={<StudentLifecycle />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* 🔒 Role-Based Protected Dashboards */}
              <Route
                path="/student-dashboard"
                element={
                  <AuthRoute role="student">
                    <StudentDashboard />
                  </AuthRoute>
                }
              />

              <Route
                path="/teacher-dashboard"
                element={
                  <AuthRoute role="teacher">
                    <TeacherDashboard />
                  </AuthRoute>
                }
              />

              <Route
                path="/admin-dashboard"
                element={
                  <AuthRoute role="institution_admin">
                    <AdminDashboard />
                  </AuthRoute>
                }
              />

              <Route
                path="/ministry-dashboard"
                element={
                  <AuthRoute role="ministry_admin">
                    <MinistryDashboard />
                  </AuthRoute>
                }
              />

              {/* 🚀 Auto Redirect Based on Role */}
              <Route
                path="/redirect"
                element={
                  role === "student" ? (
                    <Navigate to="/student-dashboard" replace />
                  ) : role === "teacher" ? (
                    <Navigate to="/teacher-dashboard" replace />
                  ) : role === "institution_admin" ? (
                    <Navigate to="/admin-dashboard" replace />
                  ) : role === "ministry_admin" ? (
                    <Navigate to="/ministry-dashboard" replace />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />

              {/* 🧩 General Pages */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/student-lifecycle" element={<StudentLifecycle />} />

              {/* 🚫 404 Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </LayoutWrapper>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

