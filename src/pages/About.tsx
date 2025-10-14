import { Card, CardContent } from "@/components/ui/card";
import { 
  Target, 
  Lightbulb, 
  Shield, 
  Database, 
  Brain,
  Server,
  Lock,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const problemSolutions = [
    {
      problem: "Fragmented Data Sources",
      solution: "Unified Data Repository",
      description: "Integrate AISHE, NIRF, NAAC, UGC, and ABC data into one interoperable ecosystem for seamless access."
    },
    {
      problem: "Manual Data Processing",
      solution: "Automated ETL Pipelines",
      description: "Use automated pipelines for intelligent cleaning, mapping, and integration with minimal human input."
    },
    {
      problem: "Lack of Real-time Insights",
      solution: "AI-Powered Analytics",
      description: "Leverage machine learning for predictive trends, performance metrics, and actionable recommendations."
    },
    {
      problem: "Privacy & Security Concerns",
      solution: "Government-Grade Protection",
      description: "Employ Aadhaar-backed authentication, encryption, and compliance with Indian data laws."
    },
  ];

  const techLayers = [
    {
      layer: "Data Collection Layer",
      icon: Database,
      technologies: ["AISHE API", "NIRF Scraper", "NAAC Connect", "UGC Bridge"],
      description: "Automated ingestion of data from official education data sources."
    },
    {
      layer: "ETL & Processing Layer",
      icon: Zap,
      technologies: ["Apache Airflow", "Pandas", "FastAPI", "Data Validation Framework"],
      description: "Standardize, clean, and transform data for high-quality analytics."
    },
    {
      layer: "Data Storage Layer",
      icon: Server,
      technologies: ["PostgreSQL", "Redis", "AWS S3", "Data Warehouse"],
      description: "Secure, scalable, and redundant cloud-based data infrastructure."
    },
    {
      layer: "Analytics Engine",
      icon: Brain,
      technologies: ["Scikit-learn", "TensorFlow", "Python Analytics", "Statistical Models"],
      description: "Powerful ML models for predictive analysis and anomaly detection."
    },
    {
      layer: "Security Layer",
      icon: Lock,
      technologies: ["OAuth 2.0", "Aadhaar Auth", "AES-256", "RBAC"],
      description: "Multi-tiered encryption, authentication, and access control."
    },
    {
      layer: "Presentation Layer",
      icon: Shield,
      technologies: ["React", "TailwindCSS", "Recharts", "Responsive UI"],
      description: "Interactive dashboards optimized for accessibility and performance."
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40 py-16">
      <div className="container mx-auto px-4 max-w-6xl space-y-24">

        {/* Mission */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex justify-center mb-8">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-accent shadow-md">
              <Target className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Our Mission
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            To bridge the gap between <strong>data and decision</strong> in India’s education ecosystem by 
            creating a unified, intelligent platform that empowers institutions, educators, and policymakers 
            with <em>actionable insights</em> and evidence-based governance.
          </p>
        </motion.section>

        {/* Vision */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Card className="bg-gradient-to-br from-primary/5 to-accent/10 border-primary/20 shadow-lg">
            <CardContent className="p-8 flex items-start gap-6">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary flex-shrink-0">
                <Lightbulb className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">Vision 2030</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By 2030, <strong>EduConnect 360</strong> will serve as the backbone of India’s education intelligence 
                  — powering over <strong>50,000 institutions</strong> and <strong>40 million students</strong> through 
                  a real-time, data-driven ecosystem for governance, learning, and policy impact.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Problem-Solution Framework */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-10">
            Problem–Solution Framework
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {problemSolutions.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all border border-border/60 bg-card/90 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-destructive mb-1">
                          Problem: {item.problem}
                        </h3>
                      </div>
                      <div>
                        <h3 className="font-semibold text-success mb-2">
                          Solution: {item.solution}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Technology Architecture */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-4">Technology Architecture</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            A multi-layered architecture designed for <strong>scalability</strong>, 
            <strong>security</strong>, and <strong>AI-driven performance</strong>.
          </p>

          <div className="space-y-5">
            {techLayers.map((layer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-xl border-border/60">
                  <CardContent className="pt-6 pb-6 flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-tr from-primary to-accent flex-shrink-0 shadow">
                      <layer.icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{layer.layer}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{layer.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {layer.technologies.map((tech, idx) => (
                          <span key={idx} className="data-badge text-xs font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* AI & Privacy Section */}
        <section className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:shadow-lg transition-all">
            <CardContent className="p-8 flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary flex-shrink-0">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">AI-Driven Insights</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our ML models continuously analyze national education data streams 
                  to detect trends, recommend improvements, and forecast institutional performance.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20 hover:shadow-lg transition-all">
            <CardContent className="p-8 flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent flex-shrink-0">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Privacy & Compliance</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  EduConnect 360 ensures strict data privacy with Aadhaar-integrated access, 
                  anonymized analytics, and compliance with India’s Digital Personal Data Protection Act.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Team Credits */}
        <footer className="text-center mt-20">
          <div className="p-8 rounded-2xl bg-muted/50 shadow-inner max-w-xl mx-auto">
            <h3 className="text-xl font-bold mb-2">Developed by</h3>
            <p className="text-muted-foreground">
              <strong>Team Vertex_8</strong> — Maulana Azad National Institute of Technology, Bhopal
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              In collaboration with the Ministry of Education, Department of Higher Education
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default About;

