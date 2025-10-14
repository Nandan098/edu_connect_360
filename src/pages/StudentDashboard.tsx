import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Sun, Moon, UploadCloud, Download } from "lucide-react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384", "#36A2EB"];

export default function StudentDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [documents, setDocuments] = useState<string[]>([]);
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState<any>({});
  const [currentStatus, setCurrentStatus] = useState<string>("UG");
  const navigate = useNavigate();
  const bucket = (import.meta as any).env?.VITE_SUPABASE_BUCKET || "documents";

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) console.error(error.message);
      else setProfile(data);

      setEditedProfile({
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        father_name: data.father_name,
      });

      // Load documents
      const { data: docs, error: listErr } = await supabase.storage.from(bucket).list(`${userId}/`, { limit: 100, offset: 0, sortBy: { column: "name", order: "asc" } });
      if (listErr) {
        if (listErr.message?.toLowerCase().includes("bucket not found")) {
          alert(`Storage bucket "${bucket}" not found. Please create a public bucket named "${bucket}" in Supabase Storage and try again.`);
        } else {
          alert(`Error listing files: ${listErr.message}`);
        }
      }
      const names = docs?.map((d) => d.name) || [];
      setDocuments(names);
      // Preload signed URLs for previews (images & pdf)
      const signed: Record<string, string> = {};
      for (const name of names) {
        if (name.endsWith(".png") || name.endsWith(".jpg") || name.endsWith(".jpeg") || name.endsWith(".pdf")) {
          const { data: urlData } = await supabase.storage.from(bucket).createSignedUrl(`${userId}/${name}`, 60 * 10);
          if (urlData?.signedUrl) signed[name] = urlData.signedUrl;
        }
      }
      setPreviewUrls(signed);

      setLoading(false);
    };

    fetchProfile();
  }, [navigate]);

  if (loading) return <p className="p-10 text-center">Loading dashboard...</p>;
  if (!profile) return <p className="p-10 text-center text-red-500">No data found.</p>;

  // Dummy subjects data
  const subjects = [
    { name: "Math", professor: "Dr. Sharma", completed: 5, pending: 2 },
    { name: "Physics", professor: "Dr. Verma", completed: 3, pending: 1 },
    { name: "Chemistry", professor: "Dr. Singh", completed: 4, pending: 0 },
    { name: "CS", professor: "Dr. Mehta", completed: 6, pending: 2 },
  ];

  // Pie chart data for assignments
  const pieData = subjects.map((sub) => ({
    name: sub.name,
    value: sub.completed + sub.pending,
  }));

  // UG semester data
  const ugSemesters = profile.ug_semesters || [];

  // PG semester data (optional)
  const pgSemesters = profile.pg_semesters || [];

  const handleUpload = async (event: any, folder: string) => {
    const file = event.target.files[0];
    if (!file) return;
    const userId = profile.id;

    const { error } = await supabase
      .storage
      .from(bucket)
      .upload(`${userId}/${folder}/${file.name}`, file, { upsert: true });

    if (error) alert("Upload failed: " + error.message);
    else {
      const fileKey = `${folder}/${file.name}`;
      setDocuments([...documents, fileKey]);
      // Generate preview URL immediately
      const { data: urlData } = await supabase.storage.from(bucket).createSignedUrl(`${userId}/${fileKey}`, 60 * 10);
      if (urlData?.signedUrl) setPreviewUrls((prev) => ({ ...prev, [fileKey]: urlData.signedUrl }));
    }
  };

  const handleDownload = async (filePath: string) => {
    const userId = profile.id;
    const { data, error } = await supabase
      .storage
      .from(bucket)
      .download(`${userId}/${filePath}`);

    if (error) return alert("Download error: " + error.message);
    const url = URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = url;
    a.download = filePath.split("/").pop()!;
    a.click();
  };

  const handleProfileSave = async () => {
    const { error } = await supabase
      .from("profiles")
      .update(editedProfile)
      .eq("id", profile.id);

    if (error) alert("Update failed: " + error.message);
    else {
      setProfile({ ...profile, ...editedProfile });
      setEditMode(false);
    }
  };

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors`}>
      <div className="p-6 container mx-auto space-y-6">

        {/* Top Bar */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Student Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button size="sm" variant="outline" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white" onClick={() => { localStorage.clear(); navigate("/login"); }}>
              Logout
            </Button>
          </div>
        </div>

        {/* Current Status */}
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader><CardTitle>🎯 Current Status</CardTitle></CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-6 items-center">
            <div>
              <p className="text-gray-700 dark:text-gray-200">Currently Studying:</p>
              <h2 className="text-xl font-semibold">{currentStatus}</h2>
              {currentStatus === "UG" && <p>Branch: {profile.course_name}</p>}
              {currentStatus === "PG" && <p>Branch: {profile.pg_course}</p>}
            </div>

            {/* Pie chart for assignment completion */}
            <ResponsiveContainer width={250} height={200}>
              <PieChart>
                <Pie data={subjects} dataKey="completed" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {subjects.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div>
              <p className="text-gray-700 dark:text-gray-200">Assignments Status:</p>
              <ul className="list-disc pl-5">
                {subjects.map((sub, idx) => (
                  <li key={idx}>
                    <strong>{sub.name}</strong> - Completed: {sub.completed}, Pending: {sub.pending} (Professor: {sub.professor})
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* UG Academic Progress */}
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader><CardTitle>🎓 Undergraduate Academic Progress</CardTitle></CardHeader>
          <CardContent>
            <p>Total CGPA: {profile.ug_cgpa}</p>
            {ugSemesters.length > 0 && (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={ugSemesters}>
                  <XAxis dataKey="sem" stroke="#8884d8" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sgpa" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* PG Academic Progress */}
        {profile.pg_college && (
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader><CardTitle>🎓 Postgraduate Academic Progress</CardTitle></CardHeader>
            <CardContent>
              <p>Total CGPA: {profile.pg_cgpa}</p>
              {pgSemesters.length > 0 && (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={pgSemesters}>
                    <XAxis dataKey="sem" stroke="#8884d8" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sgpa" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        )}

        {/* School Info */}
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader><CardTitle>🏫 School Information</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>School:</strong> {profile.school_name}</p>
            <p><strong>Student ID:</strong> {profile.student_id_card}</p>
            <p><strong>Stream:</strong> {profile.stream}</p>
            <p><strong>10th %:</strong> {profile.tenth_percentage}%</p>
            <p><strong>12th %:</strong> {profile.twelfth_percentage}%</p>
            <label className="flex items-center gap-2 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
              <UploadCloud className="h-4 w-4" /> Upload 10th Marksheet
              <input type="file" className="hidden" onChange={e => handleUpload(e, "school/10th")} />
            </label>
            <label className="flex items-center gap-2 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
              <UploadCloud className="h-4 w-4" /> Upload 12th Marksheet
              <input type="file" className="hidden" onChange={e => handleUpload(e, "school/12th")} />
            </label>
            {/* Preview thumbnails */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.filter((d) => d.startsWith("school/10th/") || d.startsWith("school/12th/")).map((file) => (
                <div key={file} className="border rounded p-3 bg-white dark:bg-gray-900">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium break-all">{file}</span>
                    <button
                      className="text-blue-600 text-sm hover:underline"
                      onClick={() => handleDownload(file)}
                    >
                      Download
                    </button>
                  </div>
                  {previewUrls[file] ? (
                    file.endsWith(".pdf") ? (
                      <iframe src={previewUrls[file]} className="w-full h-64 rounded" title={file} />
                    ) : (
                      <img src={previewUrls[file]} alt={file} className="w-full h-64 object-contain rounded" />
                    )
                  ) : (
                    <p className="text-xs text-gray-500">Preview unavailable</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}


