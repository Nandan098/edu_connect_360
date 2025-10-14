"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell
} from "recharts";
import { TrendingUp, Users, BookOpen, Award, AlertCircle, Activity, CircleDot } from "lucide-react";

const Dashboard = () => {
  // -------------------------
  // 🧠 Dynamic State + Effects
  // -------------------------
  const [kpis, setKpis] = useState([
    { title: "Total Institutions", value: 10847, unit: "", change: "+12%", icon: BookOpen },
    { title: "Active Students", value: 5200000, unit: "", change: "+8%", icon: Users },
    { title: "Avg NIRF Score", value: 72.5, unit: "", change: "+5.2", icon: Award },
    { title: "Female Participation", value: 42, unit: "%", change: "+3%", icon: TrendingUp },
  ]);

  const [nirfScores, setNirfScores] = useState([
    { year: "2020", score: 65 },
    { year: "2021", score: 68 },
    { year: "2022", score: 72 },
    { year: "2023", score: 75 },
    { year: "2024", score: 78 },
  ]);

  const [aiInsights, setAiInsights] = useState([
    "📈 Increasing research spending by 15% may raise NIRF rank by +6 positions.",
    "👩‍🎓 Female STEM enrollment is growing by 8% yearly.",
    "🏫 Top states projected +10% infrastructure growth in 2025.",
  ]);

  // Every 4s, randomly update KPIs and rotate AI insights
  useEffect(() => {
    const interval = setInterval(() => {
      setKpis(prev =>
        prev.map(kpi => {
          let variation = Math.random() * 0.5 - 0.25;
          let newValue = kpi.value + kpi.value * variation * 0.01;
          return { ...kpi, value: newValue };
        })
      );

      setAiInsights(prev => {
        const newTip = [
          "🧠 AI predicts a +5% rise in employability after new NEP initiatives.",
          "📊 Blended learning adoption to increase 18% by 2026.",
          "🌍 Cross-state academic collaborations up by 22% this quarter.",
          "🎯 AI-driven evaluations projected to reach 40% institutions by next year.",
        ];
        return [newTip[Math.floor(Math.random() * newTip.length)], ...prev.slice(0, 2)];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // ---------------------------------
  // 📊 Static but realistic datasets
  // ---------------------------------
  const enrollmentData = [
    { category: "Engineering", students: 45000 },
    { category: "Medicine", students: 28000 },
    { category: "Commerce", students: 35000 },
    { category: "Arts", students: 42000 },
    { category: "Science", students: 38000 },
  ];

  const radarData = [
    { metric: "Research", A: 85 },
    { metric: "Teaching", A: 78 },
    { metric: "Placements", A: 92 },
    { metric: "Infrastructure", A: 88 },
    { metric: "Diversity", A: 74 },
  ];

  const leaderboard = [
    { rank: 1, name: "IIT Bombay", score: 93.4 },
    { rank: 2, name: "IISc Bangalore", score: 92.8 },
    { rank: 3, name: "IIT Delhi", score: 91.5 },
    { rank: 4, name: "IIT Madras", score: 90.9 },
    { rank: 5, name: "IIT Kanpur", score: 89.7 },
  ];

  const studentEngagement = [
    { platform: "SWAYAM", hours: 1850 },
    { platform: "Coursera", hours: 1430 },
    { platform: "NPTEL", hours: 2110 },
    { platform: "Internships", hours: 980 },
  ];

  // --------------------------
  // 🖼️ Dashboard Render Layout
  // --------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/20 to-muted/10 py-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
            Unified Education Analytics
            <CircleDot className="text-green-500 animate-pulse h-5 w-5" />
          </h1>
          <p className="text-lg text-muted-foreground">
            Real-time insights powered by AI & data visualization
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Button variant="outline" size="sm">All States</Button>
          <Button variant="outline" size="sm">Institution Type</Button>
          <Button variant="outline" size="sm">Academic Year</Button>
          <Button variant="outline" size="sm">Category</Button>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {kpis.map((kpi, index) => (
            <Card key={index} className="hover:shadow-md transition-all border-primary/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                <kpi.icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {kpi.unit === "%" ? `${kpi.value.toFixed(1)}%` : kpi.value.toLocaleString()}
                </div>
                <p className="text-sm text-success flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" /> {kpi.change} from last year
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* MAIN TABS */}
        <Tabs defaultValue="national" className="space-y-8">
          <TabsList className="grid w-full md:w-auto grid-cols-3 mx-auto">
            <TabsTrigger value="national">National</TabsTrigger>
            <TabsTrigger value="institution">Institution</TabsTrigger>
            <TabsTrigger value="student">Student</TabsTrigger>
          </TabsList>

          {/* --- NATIONAL TAB --- */}
          <TabsContent value="national" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Line Chart */}
              <Card>
                <CardHeader><CardTitle>NIRF Score Trends (5 Years)</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={nirfScores}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Bar Chart */}
              <Card>
                <CardHeader><CardTitle>Student Enrollment by Category</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={enrollmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="students" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* AI Insights */}
              <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-primary" /> AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {aiInsights.map((text, i) => (
                    <p key={i} className="animate-fade-in">{text}</p>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* --- INSTITUTION TAB --- */}
          <TabsContent value="institution" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle>Performance Radar Chart</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" />
                      <PolarRadiusAxis />
                      <Radar dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Top Performing Institutions</CardTitle></CardHeader>
                <CardContent>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left">
                        <th>Rank</th><th>Institution</th><th>Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map(i => (
                        <tr key={i.rank} className="border-b hover:bg-muted/20 transition">
                          <td>{i.rank}</td>
                          <td>{i.name}</td>
                          <td className="font-semibold">{i.score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* --- STUDENT TAB --- */}
          <TabsContent value="student" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle>Learning Engagement (Hours)</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={studentEngagement}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="platform" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="hours" fill="#10b981" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-blue-50">
                <CardHeader><CardTitle className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" /> AI Predictions
                </CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>📊 72% of students expected to improve grades via active digital learning.</p>
                  <p>🎯 Skill-based course completion projected +18% by 2026.</p>
                  <p>🧠 Personalized AI tutoring adoption +40% by next year.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;


