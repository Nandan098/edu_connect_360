import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Bell } from "lucide-react";

export default function Topbar() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserEmail(user.email);
    };
    fetchUser();
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white shadow-sm">
      <h2 className="text-lg font-semibold">Dashboard</h2>
      <div className="flex items-center gap-4">
        <Bell className="text-gray-500 cursor-pointer" size={20} />
        <span className="text-gray-700 text-sm">{userEmail}</span>
      </div>
    </header>
  );
}
