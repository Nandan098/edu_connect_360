import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import {
  Home,
  BookOpen,
  BarChart,
  LogOut,
  Users,
  Settings,
  UserCircle,
} from "lucide-react";

interface SidebarProps {
  role: string;
}

export default function Sidebar({ role }: SidebarProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    navigate("/login");
  };

  const navItems = {
    student: [
      { name: "Profile", path: "/student-dashboard", icon: <UserCircle size={18} /> },
      { name: "Performance", path: "/student-dashboard/performance", icon: <BarChart size={18} /> },
      { name: "Projects", path: "/student-dashboard/projects", icon: <BookOpen size={18} /> },
    ],
    teacher: [
      { name: "My Students", path: "/teacher-dashboard", icon: <Users size={18} /> },
      { name: "Upload Results", path: "/teacher-dashboard/results", icon: <BookOpen size={18} /> },
    ],
    institution_admin: [
      { name: "Institution Data", path: "/admin-dashboard", icon: <Home size={18} /> },
      { name: "Reports", path: "/admin-dashboard/reports", icon: <BarChart size={18} /> },
      { name: "Manage Users", path: "/admin-dashboard/users", icon: <Users size={18} /> },
    ],
    ministry_admin: [
      { name: "National Insights", path: "/ministry-dashboard", icon: <BarChart size={18} /> },
      { name: "Institution Overview", path: "/ministry-dashboard/institutions", icon: <Users size={18} /> },
    ],
  };

  return (
    <div className="w-64 bg-white shadow-md flex flex-col justify-between">
      <div>
        <div className="p-4 text-xl font-bold border-b">Edu360 Portal</div>
        <nav className="p-4 space-y-2">
          {navItems[role as keyof typeof navItems]?.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-200"
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          disabled={loading}
          className="flex items-center gap-2 text-red-600 hover:text-red-800"
        >
          <LogOut size={18} /> {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}
