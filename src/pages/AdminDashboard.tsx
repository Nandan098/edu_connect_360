
// src/pages/AdminDashboard.tsx
import React, { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Sun, Moon, Search, University, Users, Briefcase } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * Institution Admin Dashboard (Frontend-only, dummy data)
 * - Institution name & NIRF ranking
 * - Programs: BTech / MTech / MBA
 * - Departments with courses, registered students, avg percentage
 * - Table for departments
 * - Placement % shown as pie chart (per-department)
 *
 * Replace dummyData with API responses when ready.
 */

const COLORS = ["#06b6d4", "#7c3aed", "#f59e0b", "#ef4444", "#10b981", "#f97316"];

type Department = {
  id: string;
  name: string;
  program: "BTech" | "MTech" | "MBA";
  courses: string[]; // course names
  registeredStudents: number;
  avgPercentage: number; // 0-100
  placementPercent: number; // 0-100
};

const dummyDepartments: Department[] = [
  // BTech departments
  {
    id: "d-cse",
    name: "Computer Science & Engineering",
    program: "BTech",
    courses: ["Data Structures", "Algorithms", "Operating Systems"],
    registeredStudents: 820,
    avgPercentage: 78.4,
    placementPercent: 88,
  },
  {
    id: "d-ee",
    name: "Electrical Engineering",
    program: "BTech",
    courses: ["Circuit Theory", "Power Systems", "Control Systems"],
    registeredStudents: 420,
    avgPercentage: 74.1,
    placementPercent: 72,
  },
  {
    id: "d-me",
    name: "Mechanical Engineering",
    program: "BTech",
    courses: ["Thermodynamics", "Machine Design"],
    registeredStudents: 360,
    avgPercentage: 72.9,
    placementPercent: 68,
  },

  // MTech departments
  {
    id: "d-cse-m",
    name: "Computer Science (MTech)",
    program: "MTech",
    courses: ["Advanced Algorithms", "ML"],
    registeredStudents: 120,
    avgPercentage: 81.2,
    placementPercent: 85,
  },
  {
    id: "d-ee-m",
    name: "Power Systems (MTech)",
    program: "MTech",
    courses: ["Smart Grids", "Power Electronics"],
    registeredStudents: 60,
    avgPercentage: 79.0,
    placementPercent: 78,
  },

  // MBA departments
  {
    id: "d-mba-fin",
    name: "MBA - Finance",
    program: "MBA",
    courses: ["Corporate Finance", "Investment Analysis"],
    registeredStudents: 90,
    avgPercentage: 82.7,
    placementPercent: 92,
  },
  {
    id: "d-mba-mark",
    name: "MBA - Marketing",
    program: "MBA",
    courses: ["Brand Management", "Digital Marketing"],
    registeredStudents: 85,
    avgPercentage: 80.1,
    placementPercent: 90,
  },
];

export default function AdminDashboard(): JSX.Element {
  const [dark, setDark] = useState(true);
  const [q, setQ] = useState("");

  // Institution summary (example: NIT Bhopal)
  const institution = {
    name: "National Institute of Technology, Bhopal",
    nirfRank: 78, // dummy / example
    established: 1960,
    location: "Bhopal, MP",
  };

  // Derived data
  const totals = useMemo(() => {
    const byProgram = dummyDepartments.reduce(
      (acc: Record<string, { departments: number; students: number }>, d) => {
        acc[d.program] = acc[d.program] || { departments: 0, students: 0 };
        acc[d.program].departments += 1;
        acc[d.program].students += d.registeredStudents;
        return acc;
      },
      {}
    );

    const totalStudents = dummyDepartments.reduce((s, d) => s + d.registeredStudents, 0);
    const totalDepartments = dummyDepartments.length;
    return { byProgram, totalStudents, totalDepartments };
  }, []);

  // Filtered departments by search query
  const filtered = dummyDepartments.filter((d) => {
    const lower = q.toLowerCase();
    return (
      d.name.toLowerCase().includes(lower) ||
      d.program.toLowerCase().includes(lower) ||
      d.courses.some((c) => c.toLowerCase().includes(lower))
    );
  });

  // Pie chart data for placements: show top 5 departments by students
  const placementPieData = useMemo(() => {
    // We'll weight the pie by (registeredStudents * placementPercent) to indicate successful placements count roughly
    const data = dummyDepartments.map((d) => ({
      name: d.name,
      value: Math.round((d.registeredStudents * d.placementPercent) / 100),
      placementPercent: d.placementPercent,
    }));
    // sort & pick top 6
    data.sort((a, b) => b.value - a.value);
    return data.slice(0, 6);
  }, []);

  // Bar chart data for avg percentage per department (top N)
  const avgPercentageBar = useMemo(() => {
    return dummyDepartments
      .map((d) => ({ name: d.name, avg: Number(d.avgPercentage.toFixed(1)) }))
      .sort((a, b) => b.avg - a.avg)
      .slice(0, 8);
  }, []);

  return (
    <div className={`${dark ? "dark" : ""} min-h-screen bg-gray-100 dark:bg-[#0b1020] text-slate-900 dark:text-slate-100`}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Top header */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-rose-500 rounded-lg grid place-items-center text-slate-900 font-bold shadow-lg">
                N
              </div>
              <div>
                <h1 className="text-xl font-bold">{institution.name}</h1>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  NIRF Rank: <span className="font-semibold">{institution.nirfRank}</span> • {institution.location}
                </div>
              </div>
            </div>
            <div className="ml-6 px-3 py-1 rounded bg-white/5 text-sm text-slate-200">
              Established {institution.established}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white/6 rounded px-3 py-1 gap-2">
              <Search className="text-slate-300" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search departments, courses..."
                className="bg-transparent outline-none placeholder:text-slate-400 text-slate-100"
              />
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => setDark((d) => !d)}>
                {dark ? <Sun className="text-yellow-300" /> : <Moon />}
              </Button>
              <Button className="bg-amber-500 text-slate-900 hover:opacity-90">Export CSV</Button>
            </div>
          </div>
        </header>

        {/* Summary cards */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-r from-slate-900/60 to-slate-900/40 border border-slate-700">
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <Users className="text-amber-400" /> Registered Students
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totals.totalStudents}</div>
              <div className="text-sm text-slate-400 mt-1">Across {totals.totalDepartments} departments</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-slate-900/60 to-slate-900/40 border border-slate-700">
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <University className="text-cyan-300" /> Programs
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 items-center">
                <div>
                  <div className="text-lg font-semibold">BTech</div>
                  <div className="text-sm text-slate-400">{dummyDepartments.filter((d) => d.program === "BTech").length} departments</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">MTech</div>
                  <div className="text-sm text-slate-400">{dummyDepartments.filter((d) => d.program === "MTech").length} departments</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">MBA</div>
                  <div className="text-sm text-slate-400">{dummyDepartments.filter((d) => d.program === "MBA").length} departments</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-slate-900/60 to-slate-900/40 border border-slate-700">
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <Briefcase className="text-emerald-400" /> Placements
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(dummyDepartments.reduce((acc, d) => acc + (d.registeredStudents * d.placementPercent) / 100, 0))}
              </div>
              <div className="text-sm text-slate-400 mt-1">Approx. placed students (est.)</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-slate-900/60 to-slate-900/40 border border-slate-700">
            <CardHeader>
              <CardTitle>Top Dept Avg %</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold">
                {dummyDepartments.slice().sort((a, b) => b.avgPercentage - a.avgPercentage)[0].name}
              </div>
              <div className="text-2xl font-bold mt-1">
                {Math.max(...dummyDepartments.map((d) => d.avgPercentage)).toFixed(1)}%
              </div>
              <div className="text-sm text-slate-400 mt-1">Highest average percentage</div>
            </CardContent>
          </Card>
        </section>

        {/* Main content: left - table & bar, right - pie placement */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Department table */}
            <Card className="border border-slate-700 bg-slate-900/40">
              <CardHeader>
                <CardTitle>Departments & Registered Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="text-slate-400">
                      <tr>
                        <th className="py-2 px-3">Department</th>
                        <th className="py-2 px-3">Program</th>
                        <th className="py-2 px-3">Courses</th>
                        <th className="py-2 px-3">Registered</th>
                        <th className="py-2 px-3">Avg %</th>
                        <th className="py-2 px-3">Placement %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {filtered.map((d) => (
                        <tr key={d.id} className="hover:bg-slate-800/40">
                          <td className="py-2 px-3 font-medium">{d.name}</td>
                          <td className="py-2 px-3">{d.program}</td>
                          <td className="py-2 px-3">{d.courses.join(", ")}</td>
                          <td className="py-2 px-3">{d.registeredStudents}</td>
                          <td className="py-2 px-3">{d.avgPercentage}%</td>
                          <td className="py-2 px-3">{d.placementPercent}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Avg percentage bar chart */}
            <Card className="border border-slate-700 bg-slate-900/30">
              <CardHeader>
                <CardTitle>Average Percentage by Department</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={avgPercentageBar}>
                    <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 12 }} interval={0} angle={-22} textAnchor="end" height={80} />
                    <YAxis tick={{ fill: "#94a3b8" }} />
                    <Tooltip />
                    <Bar dataKey="avg" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Right column: placements pie + quick stats */}
          <aside className="space-y-6">
            <Card className="border border-slate-700 bg-slate-900/30">
              <CardHeader>
                <CardTitle>Placements (Top Depts)</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={placementPieData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={90} label={(entry) => `${entry.name.split(" ")[0]}: ${entry.placementPercent}%`}>
                      {placementPieData.map((entry, idx) => (
                        <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <ReTooltip formatter={(val: number) => `${val} placed (est.)`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border border-slate-700 bg-slate-900/30">
              <CardHeader>
                <CardTitle>Department Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["BTech", "MTech", "MBA"].map((prog) => (
                    <div key={prog} className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">{prog}</div>
                        <div className="text-xs text-slate-400">{dummyDepartments.filter((d) => d.program === prog).length} departments</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">{dummyDepartments.filter((d) => d.program === prog).reduce((s, d) => s + d.registeredStudents, 0)}</div>
                        <div className="text-xs text-slate-400">students</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>

        <footer className="mt-8 text-xs text-slate-500">© {new Date().getFullYear()} NIT Bhopal — Demo Dashboard</footer>
      </div>
    </div>
  );
}
