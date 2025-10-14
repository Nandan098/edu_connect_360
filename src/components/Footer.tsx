import { Link } from "react-router-dom";
import { Database, Mail, MapPin, Phone, Globe, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-gradient-to-br from-blue-50 via-white to-blue-100 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl text-blue-800">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600">
                <Database className="h-6 w-6 text-white" />
              </div>
              <span>EduConnect 360</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering the Indian Education Ecosystem with Unified Digital Infrastructure — 
              connecting Students, Teachers, Institutes & the Ministry seamlessly.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-blue-700 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-blue-700 transition-colors">Home</Link></li>
              <li><Link to="/dashboard" className="hover:text-blue-700 transition-colors">Dashboard</Link></li>
              <li><Link to="/student-lifecycle" className="hover:text-blue-700 transition-colors">Student Lifecycle</Link></li>
              <li><Link to="/about" className="hover:text-blue-700 transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-blue-700 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="font-semibold text-blue-700 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-blue-700 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-700 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-700 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-700 transition-colors">Support Portal</a></li>
              <li><a href="#" className="hover:text-blue-700 transition-colors">Helpdesk</a></li>
            </ul>
          </div>

          {/* Dashboards Quick Links */}
          <div>
            <h3 className="font-semibold text-blue-700 mb-4">Dashboards</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/student-dashboard" className="hover:text-blue-700 transition-colors">Student</Link></li>
              <li><Link to="/teacher-dashboard" className="hover:text-blue-700 transition-colors">Teacher</Link></li>
              <li><Link to="/admin-dashboard" className="hover:text-blue-700 transition-colors">Institution Admin</Link></li>
              <li><Link to="/ministry-dashboard" className="hover:text-blue-700 transition-colors">Ministry</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="font-semibold text-blue-700 mb-4">Contact & Socials</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-blue-600 flex-shrink-0" />
                <span>Ministry of Education, DHE Office, New Delhi, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-600 flex-shrink-0" />
                <span>info@educonnect360.gov.in</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-600 flex-shrink-0" />
                <span>+91 11 XXXX XXXX</span>
              </li>
            </ul>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4 mt-4">
              <a href="#" className="text-blue-700 hover:text-blue-900 transition-colors">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-700 hover:text-blue-900 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-700 hover:text-blue-900 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider and Copyright */}
        <div className="border-t mt-10 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} EduConnect 360. All Rights Reserved.</p>
          <p className="text-xs mt-1">Developed under the Smart Education Initiative, Ministry of Education, Government of India.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
