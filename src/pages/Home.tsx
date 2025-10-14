import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Database,
  Users,
  BarChart3,
  Brain,
  Shield,
  FileText,
  ArrowRight,
  LogIn,
  GraduationCap,
  Building2,
  UserCog,
  Landmark,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const Home = () => {
  const features = [
    {
      icon: Database,
      title: "Unified Data Repository",
      description:
        "Single source of truth consolidating AISHE, NIRF, NAAC, UGC, and ABC datasets",
    },
    {
      icon: Users,
      title: "Student Lifecycle Tracker",
      description:
        "Complete journey mapping from admission to graduation with ABC integration",
    },
    {
      icon: BarChart3,
      title: "Institutional Performance Dashboard",
      description:
        "Real-time analytics and benchmarking for higher education institutions",
    },
    {
      icon: Brain,
      title: "AI-based Analytics Engine",
      description:
        "Predictive insights and recommendations powered by machine learning",
    },
    {
      icon: Shield,
      title: "Secure Aadhaar/ABC Integration",
      description: "Privacy-first data handling with government-grade security",
    },
    {
      icon: FileText,
      title: "Policy Insights for MoE",
      description:
        "Data-driven policy recommendations for education governance",
    },
  ];

  const roles = [
    { name: "Student", icon: GraduationCap, path: "/login" },
    { name: "Teacher", icon: Building2, path: "/login" },
    { name: "Admin", icon: UserCog, path: "/login" },
    { name: "Ministry", icon: Landmark, path: "/login" },
  ];

  const techStack = [
    { name: "React", category: "Frontend" },
    { name: "FastAPI", category: "Backend" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Scikit-learn", category: "AI/ML" },
    { name: "Docker", category: "DevOps" },
    { name: "AWS", category: "Cloud" },
  ];

  const stats = [
    { value: "10,000+", label: "Institutions" },
    { value: "5M+", label: "Students" },
    { value: "20+", label: "KPIs Tracked" },
    { value: "99.9%", label: "Uptime" },
  ];

  // New Data for Chart
  const growthData = [
    { year: "2018", institutions: 2000, students: 1000000 },
    { year: "2019", institutions: 4000, students: 1800000 },
    { year: "2020", institutions: 7000, students: 2500000 },
    { year: "2021", institutions: 8500, students: 3100000 },
    { year: "2022", institutions: 9500, students: 4200000 },
    { year: "2023", institutions: 10000, students: 5000000 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-blue-900 to-slate-900 text-white relative overflow-hidden">
      {/* Gradient Blobs */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-blue-500/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-purple-600/30 rounded-full blur-3xl -z-10 animate-pulse"></div>

      {/* Hero Section */}
      <section className="py-24 md:py-32 text-center relative z-10">
        <motion.h1
          className="text-4xl md:text-6xl font-bold leading-tight mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Empowering Indian Education through Unified Data Intelligence
        </motion.h1>

        <p className="text-lg md:text-2xl text-gray-300 mb-10">
          EduConnect 360 – Educate. Integrate. Innovate.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/dashboard">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Explore Dashboard <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <Link to="/contact">
           <Button
  size="lg"
  variant="outline"
  className="text-lg px-8 border-gray-400 bg-white/10 hover:bg-white/10"
>
  Request Demo
</Button>

          </Link>

          <Link to="/login">
            <Button size="lg" className="text-lg px-8 bg-amber-500 hover:bg-amber-600">
              <LogIn className="mr-2 h-5 w-5" /> Login
            </Button>
          </Link>
        </div>
      </section>

      {/* Role Cards */}
      <section className="py-16 bg-white/5 backdrop-blur-lg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10">Login as Your Role</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-center">
            {roles.map((role, idx) => (
              <Link to={role.path} key={idx}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-white/10 rounded-2xl shadow-lg hover:bg-white/20 transition"
                >
                  <role.icon className="mx-auto h-12 w-12 mb-4 text-amber-400" />
                  <h3 className="text-xl font-semibold">{role.name}</h3>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Platform Highlights</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 p-6 rounded-2xl shadow-md hover:bg-white/20 transition"
              >
                <f.icon className="h-10 w-10 text-amber-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-300">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-800 to-blue-800 text-center">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="space-y-2"
            >
              <h3 className="text-4xl font-bold text-amber-400">{s.value}</h3>
              <p className="text-lg">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 📊 Growth Insights Section */}
      <section className="py-20 bg-white/5 backdrop-blur-lg text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Education Growth Insights</h2>
          <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
            Tracking the rise of higher education institutions and student enrollment trends over the years.
          </p>

          <div className="max-w-4xl mx-auto bg-white/10 rounded-2xl p-6 shadow-lg">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="year" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(30,41,59,0.9)",
                    borderRadius: "10px",
                    border: "none",
                    color: "#fff",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="institutions"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  name="Institutions"
                />
                <Line
                  type="monotone"
                  dataKey="students"
                  stroke="#38bdf8"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  name="Students"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                className="bg-white/10 px-6 py-3 rounded-full text-sm font-medium shadow-md hover:bg-white/20"
              >
                {tech.name} • <span className="text-amber-400">{tech.category}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 text-center bg-indigo-950/50 border-t border-white/10">
        <h2 className="text-3xl font-bold mb-6">Join the Education Revolution</h2>
        <p className="text-gray-300 mb-8">
          Unified Data. Smarter Insights. Better Education.
        </p>
        <Link to="/contact">
          <Button size="lg" className="bg-amber-500 hover:bg-amber-600 px-10 text-lg">
            Get Started
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
