import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Chatbot from "./Chatbot";
import { Menu, X, User, LogIn } from "lucide-react"; // Database hata diya
import { useState } from "react";
import logo from "./logo (3).png"; // 👈 same folder se logo import

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ✅ Hide Navbar on login pages
  if (location.pathname.startsWith("/login")) return null;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Feature", path: "/features" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const roles = [
    { name: "Student", path: "/login/student" },
    { name: "Teacher", path: "/login/teacher" },
    { name: "Admin", path: "/login/admin" },
    { name: "Ministry", path: "/login/ministry" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-indigo-900/90 via-blue-900/80 to-slate-900/90 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between text-white">
          {/* ✅ Updated Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <img
  src={logo}
  alt="EduConnect 360 Logo"
  className="w-16 h-16 rounded-xl shadow-lg border border-gray-200 bg-white object-contain p-2"
/>

            <span className="hidden md:inline">EduConnect 360</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-sm font-medium transition-all hover:text-amber-400 ${
                  isActive(item.path)
                    ? "text-amber-400 after:w-full"
                    : "text-gray-300 after:w-0"
                } after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-amber-400 after:transition-all after:duration-300 hover:after:w-full`}
              >
                {item.name}
              </Link>
            ))}

            {/* Role Login Dropdown */}
            <div className="relative group">
              <Button
                size="sm"
                variant="ghost"
                className="text-white flex items-center gap-1 hover:text-amber-400"
                onClick={() => navigate("/login")}
              >
                <User className="h-4 w-4" /> Login
              </Button>

              <div className="absolute hidden group-hover:block bg-white/10 backdrop-blur-lg rounded-lg mt-2 shadow-lg min-w-[180px] border border-white/10">
                {roles.map((role) => (
                  <Link
                    key={role.path}
                    to={role.path}
                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-white/20 hover:text-amber-300 transition"
                  >
                    {role.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Chatbot trigger */}
            <Chatbot />

            <Link to="/contact">
              <Button
                size="sm"
                className="ml-4 bg-amber-500 hover:bg-amber-600 text-white shadow-lg"
              >
                Request Demo
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-white/10 bg-indigo-950/90 text-white rounded-b-xl">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-sm font-medium transition-colors ${
                  isActive(item.path) ? "text-amber-400" : "text-gray-300"
                }`}
              >
                {item.name}
              </Link>
            ))}

            <div className="border-t border-white/10 pt-3">
              <Button
                size="sm"
                variant="ghost"
                className="w-full text-white hover:text-amber-400"
                onClick={() => {
                  navigate("/login");
                  setMobileMenuOpen(false);
                }}
              >
                <LogIn className="inline mr-2 h-4 w-4" />
                Login
              </Button>

              {roles.map((role) => (
                <Link
                  key={role.path}
                  to={role.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 px-2 text-sm text-gray-200 hover:text-amber-400"
                >
                  <LogIn className="inline mr-2 h-4 w-4" />
                  {role.name}
                </Link>
              ))}
            </div>

            <Link to="/contact">
              <Button
                size="sm"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white mt-3"
              >
                Request Demo
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
