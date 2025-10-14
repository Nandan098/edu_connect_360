import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3,
  Brain,
  ShieldCheck,
  Users,
  Cloud,
  Zap,
  MessageSquare,
  Map,
} from "lucide-react";

const features = [
  {
    icon: <BarChart3 className="w-10 h-10 text-blue-500" />,
    title: "Unified Dashboard",
    desc: "A single analytics hub combining NIRF, NAAC, UGC and institutional data in one place with smart visualizations.",
  },
  {
    icon: <Brain className="w-10 h-10 text-purple-500" />,
    title: "AI-Powered Insights",
    desc: "Machine learning models provide real-time predictions, rankings, and personalized improvement recommendations.",
  },
  {
    icon: <Users className="w-10 h-10 text-green-500" />,
    title: "Role-Based Access",
    desc: "Separate panels for students, teachers, and administrators with tailored analytics and controls for each role.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-amber-500" />,
    title: "Data Security & Compliance",
    desc: "AES-256 encryption, role-based access, and NEP-2020 data protection compliance ensure full institutional trust.",
  },
  {
    icon: <Cloud className="w-10 h-10 text-sky-500" />,
    title: "Smart Integrations",
    desc: "Seamless integration with AISHE, NIRF, NAAC, and UGC APIs with automated ETL pipelines and backups.",
  },
  {
    icon: <Zap className="w-10 h-10 text-yellow-400" />,
    title: "Real-Time Alerts",
    desc: "AI-powered monitoring for performance drops or data anomalies, instantly notifying teachers and admins.",
  },
  {
    icon: <MessageSquare className="w-10 h-10 text-pink-500" />,
    title: "EduChat Assistant",
    desc: "Conversational AI chatbot that helps users explore analytics, ask questions, and get performance summaries.",
  },
  {
    icon: <Map className="w-10 h-10 text-indigo-500" />,
    title: "Geo-Analytics Map",
    desc: "Visualize institution data and student demographics geographically to identify regional education patterns.",
  },
];

export default function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-950 py-20 px-6">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Platform <span className="text-blue-600">Features</span>
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Discover how <span className="font-semibold">EduConnect 360</span> 
          transforms educational data into actionable intelligence through AI, analytics, and seamless integrations.
        </motion.p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="h-full shadow-md hover:shadow-xl transition-all rounded-2xl bg-white/70 dark:bg-gray-800/80 backdrop-blur-md">
              <CardHeader className="flex flex-col items-center text-center space-y-4">
                {feature.icon}
                <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.desc}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
