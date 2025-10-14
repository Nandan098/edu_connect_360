import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // ✅ Add this line
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import loginPageImg from "./loginpage.png";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ LOGIN HANDLER (same as before)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (role === "teacher" && identifier === "TCHR001" && password === "apar@123") {
        localStorage.setItem("user_id", "teacher-demo-1");
        localStorage.setItem("role", "teacher");
        navigate("/teacher-dashboard");
        setLoading(false);
        return;
      }

      const column =
        role === "student"
          ? "aadhar"
          : role === "teacher"
          ? "apar_id"
          : role === "institution_admin"
          ? "aishe_code"
          : "official_id";

      const { data, error: queryError } = await supabase
        .from("profiles")
        .select("*")
        .eq(column, identifier)
        .eq("password", password)
        .eq("role", role)
        .single();

      if (queryError || !data) {
        setError("Invalid credentials. Please try again.");
        setLoading(false);
        return;
      }

      localStorage.setItem("user_id", data.id);
      localStorage.setItem("role", data.role);

      if (data.role === "student") navigate("/student-dashboard");
      else if (data.role === "teacher") navigate("/teacher-dashboard");
      else if (data.role === "institution_admin") navigate("/admin-dashboard");
      else if (data.role === "ministry_admin") navigate("/ministry-dashboard");
      else navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen bg-gradient-to-r from-sky-50 to-indigo-50">
      {/* 🔙 Back Arrow Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-1" />
        <span className="text-sm font-medium">Back to Home</span>
      </button>

      {/* Left side image section */}
      <div className="hidden md:flex w-1/2 flex-col items-center justify-center text-center p-10 bg-white shadow-lg">
        <img src={loginPageImg} alt="Education Illustration" className="w-100 mr-20 mb-6" />
        <h2 className="text-2xl font-semibold text-gray-700">
          “A Building With Four Walls And Tomorrow Inside”
        </h2>
        <p className="mt-4 text-sm text-gray-500">Empowering Students & Teachers</p>
      </div>

      {/* Right side form section */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-2xl rounded-2xl bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-indigo-600">Sign In</CardTitle>
            <p className="text-sm text-gray-500 mt-1">Choose your role and log in</p>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="student" onValueChange={(v) => setRole(v)}>
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="teacher">Teacher</TabsTrigger>
                <TabsTrigger value="institution_admin">Admin</TabsTrigger>
                <TabsTrigger value="ministry_admin">Ministry</TabsTrigger>
              </TabsList>

              <TabsContent value={role}>
                <LoginForm
                  label={
                    role === "student"
                      ? "Aadhaar Number"
                      : role === "teacher"
                      ? "APAR ID"
                      : role === "institution_admin"
                      ? "AISHE Code"
                      : "Official ID"
                  }
                  identifier={identifier}
                  setIdentifier={setIdentifier}
                  password={password}
                  setPassword={setPassword}
                  loading={loading}
                  error={error}
                  handleLogin={handleLogin}
                />
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="flex flex-col gap-2 text-sm text-center text-gray-500">
            <Button variant="link" onClick={() => navigate("/forgot-password")}>
              Forgot Password?
            </Button>
            <Button variant="link" onClick={() => navigate("/signup")}>
              Don’t have an account? Sign Up
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function LoginForm({
  label,
  identifier,
  setIdentifier,
  password,
  setPassword,
  loading,
  error,
  handleLogin,
}: {
  label: string;
  identifier: string;
  setIdentifier: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  loading: boolean;
  error: string;
  handleLogin: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <Label>{label}</Label>
        <Input
          type="text"
          placeholder={`Enter your ${label.toLowerCase()}`}
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
      </div>

      <div>
        <Label>Password</Label>
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember" className="text-sm">
            Remember me
          </Label>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button type="submit" className="w-full mt-2" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}

