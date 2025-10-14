


// src/pages/TeacherDashboard.tsx
import teacherPhoto from './teacherphoto.png';
import React, { useState, useEffect } from 'react';
import {
  FaUser, FaIdCard, FaBriefcase, FaGraduationCap, FaScroll,
  FaChalkboardTeacher, FaTasks, FaEnvelope, FaCalendarAlt, FaUpload,
  FaBell, FaClipboardList, FaUsers, FaBookOpen, FaDownload, FaEdit, FaSignOutAlt // Added FaSignOutAlt icon
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

// Remove the supabase import:
// import { supabase } from "@/integrations/supabase/client";

// Define interfaces for data (keeping these consistent)
interface ResearchPaper {
  id: string;
  title: string;
  link?: string;
}

interface Course {
  id: string;
  name: string;
  code: string;
  numStudents: number;
}

interface TeacherProfile {
  id: string;
  name: string;
  profile_pic_url: string | null;
  apar_id: string;
  work_experience: string[] | null;
  department: string;
  research_papers: ResearchPaper[] | null;
}

interface Assignment {
  id: string;
  title: string;
  course_name: string;
  due_date: string;
  status: 'pending_grading' | 'graded' | 'due_soon' | 'overdue';
}

interface TeacherDashboardData {
  profile: TeacherProfile;
  courses: Course[];
  totalStudentsTaught: number;
  studentDepartments: string[];
  totalAssignmentsGiven: number;
  pendingAssignmentsToGrade: number;
  recentAssignments: Assignment[];
}

// --- DUMMY DATA DEFINITION ---
const dummyProfile: TeacherProfile = {
  id: 'teacher-123',
  name: 'Dr. Bholanath Roy',
  profile_pic_url: teacherPhoto, // Local image use ho rahi hai
  apar_id: 'TCHR001',
  work_experience: [
    'Senior Lecturer, Computer Science, Unified Education (5 years)',
    'Research Associate, AI & Robotics Lab, State University (8 years)',
    'Software Engineer, Tech Solutions Inc. (3 years)',
  ],
  department: 'Computer Science',
  research_papers: [
    { id: 'rp1', title: 'Deep Learning for Predictive Analytics in Education', link: 'https://example.com/paper1' },
    { id: 'rp2', title: 'Optimizing Student Learning Paths with Adaptive Algorithms', link: 'https://example.com/paper2' },
    { id: 'rp3', title: 'Impact of Gamification on Student Engagement in STEM', link: 'https://example.com/paper3' },
  ],
};

const dummyCourses: Course[] = [
  { id: 'cs101', name: 'Introduction to Programming', code: 'CS-101', numStudents: 45 },
  { id: 'ml202', name: 'Machine Learning Fundamentals', code: 'ML-202', numStudents: 30 },
  { id: 'ds303', name: 'Data Structures & Algorithms', code: 'DS-303', numStudents: 25 },
  { id: 'web404', name: 'Advanced Web Development', code: 'WEB-404', numStudents: 20 },
];

const dummyAssignments: Assignment[] = [
  { id: 'asgn1', title: 'Capstone Project Proposal', course_name: 'ML-202', due_date: '2024-11-20T23:59:00Z', status: 'pending_grading' },
  { id: 'asgn2', title: 'Algorithm Analysis Report', course_name: 'DS-303', due_date: '2024-11-15T23:59:00Z', status: 'pending_grading' },
  { id: 'asgn3', title: 'React Component Showcase', course_name: 'WEB-404', due_date: '2024-12-01T23:59:00Z', status: 'due_soon' },
  { id: 'asgn4', title: 'Python Basics Quiz', course_name: 'CS-101', due_date: '2024-10-25T23:59:00Z', status: 'graded' },
  { id: 'asgn5', title: 'Neural Networks Lab', course_name: 'ML-202', due_date: '2024-10-01T23:59:00Z', status: 'overdue' },
];

const dummyDashboardData: TeacherDashboardData = {
  profile: dummyProfile,
  courses: dummyCourses,
  totalStudentsTaught: dummyCourses.reduce((sum, course) => sum + course.numStudents, 0),
  studentDepartments: ['Computer Science', 'Data Science', 'Information Technology'], // Example derived
  totalAssignmentsGiven: dummyAssignments.length,
  pendingAssignmentsToGrade: dummyAssignments.filter(a => a.status === 'pending_grading').length,
  recentAssignments: dummyAssignments.sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime()).slice(0, 5),
};
// --- END DUMMY DATA DEFINITION ---


const TeacherDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<TeacherDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Keep error for potential future use or if login fails
  const [activeTab, setActiveTab] = useState<string>('home');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const loadDummyData = () => {
      setLoading(true);
      setTimeout(() => { // Simulate network delay
        setDashboardData(dummyDashboardData);
        setLoading(false);
      }, 500); // 500ms delay
    };

    loadDummyData();
  }, []);

  const handleLogout = () => {
    setLoading(true); // Optionally show loading during logout
    // In a real application:
    // 1. Clear authentication tokens (e.g., localStorage.removeItem('authToken');)
    // 2. Make an API call to invalidate the session on the backend.
    setTimeout(() => {
      console.log('User logged out.');
      // Redirect to login page
      navigate('/login'); // Assuming '/login' is your login page route
    }, 300); // Simulate a small delay for logout processing
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-700">Loading teacher dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-600 text-xl font-semibold">Error: {error}</p>
        <p className="text-gray-600">Please try again later.</p>
      </div>
    );
  }

  if (!dashboardData) {
      return (
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
              <p className="text-gray-600 text-xl">No dashboard data available.</p>
          </div>
      );
  }

  const {
    profile,
    courses,
    totalStudentsTaught,
    studentDepartments,
    totalAssignmentsGiven,
    pendingAssignmentsToGrade,
    recentAssignments,
  } = dashboardData;

  const getStatusColor = (status: Assignment['status']) => {
    switch (status) {
      case 'pending_grading': return 'text-orange-500 bg-orange-100';
      case 'graded': return 'text-green-600 bg-green-100';
      case 'overdue': return 'text-red-500 bg-red-100';
      case 'due_soon': return 'text-blue-500 bg-blue-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-indigo-800 to-indigo-900 text-white shadow-lg p-6 flex flex-col">
        <div className="text-center mb-10 mt-4">
          <img
            src={profile.profile_pic_url || 'https://via.placeholder.com/150/0000FF/FFFFFF?text=JD'}
            alt={profile.name}
            className="w-24 h-24 rounded-full mx-auto border-4 border-indigo-400 object-cover shadow-md"
          />
          <h3 className="text-xl font-semibold mt-4">{profile.name}</h3>
          <p className="text-indigo-200 text-sm">{profile.department}</p>
        </div>

        <nav className="flex-1">
          <ul>
            <li className={`mb-3`}>
              <button
                onClick={() => setActiveTab('home')}
                className={`flex items-center w-full p-3 rounded-lg transition-colors duration-200 ${
                  activeTab === 'home'
                    ? 'bg-indigo-700 text-white shadow-inner'
                    : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
                }`}
              >
                <FaChalkboardTeacher className="mr-3 text-lg" />
                Dashboard Home
              </button>
            </li>
            <li className={`mb-3`}>
              <button
                onClick={() => setActiveTab('courses')}
                className={`flex items-center w-full p-3 rounded-lg transition-colors duration-200 ${
                  activeTab === 'courses'
                    ? 'bg-indigo-700 text-white shadow-inner'
                    : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
                }`}
              >
                <FaGraduationCap className="mr-3 text-lg" />
                My Courses
              </button>
            </li>
            <li className={`mb-3`}>
              <button
                onClick={() => setActiveTab('assignments')}
                className={`flex items-center w-full p-3 rounded-lg transition-colors duration-200 ${
                  activeTab === 'assignments'
                    ? 'bg-indigo-700 text-white shadow-inner'
                    : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
                }`}
              >
                <FaTasks className="mr-3 text-lg" />
                Assignments
              </button>
            </li>
            <li className={`mb-3`}>
              <button
                onClick={() => setActiveTab('grades')}
                className={`flex items-center w-full p-3 rounded-lg transition-colors duration-200 ${
                  activeTab === 'grades'
                    ? 'bg-indigo-700 text-white shadow-inner'
                    : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
                }`}
              >
                <FaClipboardList className="mr-3 text-lg" />
                Grades / Results
              </button>
            </li>
            <li className={`mb-3`}>
              <button
                onClick={() => setActiveTab('messages')}
                className={`flex items-center w-full p-3 rounded-lg transition-colors duration-200 ${
                  activeTab === 'messages'
                    ? 'bg-indigo-700 text-white shadow-inner'
                    : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
                }`}
              >
                <FaEnvelope className="mr-3 text-lg" />
                Messages
              </button>
            </li>
            <li className={`mb-3`}>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`flex items-center w-full p-3 rounded-lg transition-colors duration-200 ${
                  activeTab === 'calendar'
                    ? 'bg-indigo-700 text-white shadow-inner'
                    : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
                }`}
              >
                <FaCalendarAlt className="mr-3 text-lg" />
                Calendar
              </button>
            </li>
            {/* Add more navigation items here */}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="mt-8 pt-4 border-t border-indigo-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-3 rounded-lg text-indigo-200 hover:bg-red-700 hover:text-white transition-colors duration-200"
          >
            <FaSignOutAlt className="mr-3 text-lg" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex items-center justify-between pb-6 mb-8 border-b border-gray-300">
          <h1 className="text-3xl font-extrabold text-gray-800">Welcome, {profile.name}!</h1>
          <div className="relative">
            <FaBell className="text-gray-600 text-2xl cursor-pointer hover:text-indigo-600 transition-colors" />
            {pendingAssignmentsToGrade > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {pendingAssignmentsToGrade}
              </span>
            )}
          </div>
        </header>

        {activeTab === 'home' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <section className="bg-white rounded-xl shadow-lg p-6 col-span-1 lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center"><FaUser className="mr-3 text-indigo-600" /> My Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <div>
                  <p className="mb-2"><strong className="font-semibold text-gray-900">APAR ID:</strong> {profile.apar_id}</p>
                  <p className="mb-2"><strong className="font-semibold text-gray-900">Department:</strong> {profile.department}</p>
                  <p className="mb-2"><strong className="font-semibold text-gray-900">Experience:</strong></p>
                  <ul className="list-disc pl-5 text-sm">
                    {profile.work_experience && profile.work_experience.length > 0 ? (
                      profile.work_experience.map((exp, index) => (
                        <li key={index} className="mb-1">{exp}</li>
                      ))
                    ) : (
                      <li>N/A</li>
                    )}
                  </ul>
                </div>
                <div>
                  <p className="mb-2"><strong className="font-semibold text-gray-900">Research Papers:</strong></p>
                  <ul className="list-disc pl-5 text-sm">
                    {profile.research_papers && profile.research_papers.length > 0 ? (
                      profile.research_papers.map((paper) => (
                        <li key={paper.id} className="mb-1">
                          {paper.link ? (
                            <a href={paper.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                              {paper.title} <FaDownload className="inline ml-1 text-xs" />
                            </a>
                          ) : (
                            paper.title
                          )}
                        </li>
                      ))
                    ) : (
                      <li>No research papers listed.</li>
                    )}
                  </ul>
                </div>
              </div>
            </section>

            {/* Quick Stats Card */}
            <section className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center"><FaChalkboardTeacher className="mr-3 text-indigo-600" /> Quick Stats</h2>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-indigo-50 p-4 rounded-lg shadow-sm">
                  <h3 className="text-3xl font-extrabold text-indigo-700">{totalStudentsTaught}</h3>
                  <p className="text-gray-600 text-sm">Total Students</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg shadow-sm">
                  <h3 className="text-3xl font-extrabold text-green-700">{totalAssignmentsGiven}</h3>
                  <p className="text-gray-600 text-sm">Assignments Given</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg shadow-sm col-span-2">
                  <h3 className="text-3xl font-extrabold text-orange-700">{pendingAssignmentsToGrade}</h3>
                  <p className="text-gray-600 text-sm">Pending Grading</p>
                </div>
              </div>
              <p className="mt-5 text-gray-700 text-sm">
                <strong className="font-semibold text-gray-900">Teaching:</strong> {studentDepartments.join(', ')} Departments
              </p>
            </section>

            {/* My Courses Overview */}
            <section className="bg-white rounded-xl shadow-lg p-6 col-span-1 lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center"><FaGraduationCap className="mr-3 text-indigo-600" /> My Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.length > 0 ? (
                  courses.map(course => (
                    <div key={course.id} className="bg-gray-50 border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
                      <h3 className="text-lg font-bold text-indigo-700 mb-1">{course.name} <span className="text-gray-500 font-normal">({course.code})</span></h3>
                      <p className="text-gray-600 text-sm mb-3"><FaUsers className="inline mr-2 text-indigo-500" />{course.numStudents} Students</p>
                      <div className="flex gap-2">
                        <button className="flex-1 bg-indigo-600 text-white py-2 px-3 rounded-md hover:bg-indigo-700 transition-colors text-sm">Go to Course</button>
                        <button className="flex-1 bg-gray-200 text-gray-800 py-2 px-3 rounded-md hover:bg-gray-300 transition-colors text-sm">Gradebook</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 col-span-full">No courses assigned yet.</p>
                )}
              </div>
              <button className="mt-5 text-indigo-600 hover:text-indigo-800 font-semibold text-sm flex items-center">
                View All Courses <FaBookOpen className="ml-2" />
              </button>
            </section>

            {/* Recent Assignments */}
            <section className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center"><FaTasks className="mr-3 text-indigo-600" /> Recent Assignments</h2>
              {recentAssignments.length > 0 ? (
                <ul className="space-y-4">
                  {recentAssignments.map(assignment => (
                    <li key={assignment.id} className="border-b border-gray-200 pb-3 last:border-b-0">
                      <p className="font-semibold text-gray-800">{assignment.title}</p>
                      <p className="text-sm text-gray-600">Course: {assignment.course_name}</p>
                      <p className="text-sm text-gray-500">Due: {new Date(assignment.due_date).toLocaleDateString()}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(assignment.status)}`}>
                        {assignment.status.replace(/_/g, ' ')}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No recent assignments to display.</p>
              )}
              <button className="mt-5 text-indigo-600 hover:text-indigo-800 font-semibold text-sm flex items-center">
                View All Assignments <FaTasks className="ml-2" />
              </button>
            </section>
          </div>
        )}

        {/* Courses Tab Content */}
        {activeTab === 'courses' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center"><FaGraduationCap className="mr-3 text-indigo-600" /> All My Courses</h2>
            {courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
                  <div key={course.id} className="bg-gray-50 border border-gray-200 p-5 rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-indigo-800 mb-2">{course.name} ({course.code})</h3>
                    <p className="text-gray-700 mb-4"><FaUsers className="inline mr-2 text-indigo-600" /> {course.numStudents} Students enrolled</p>
                    <div className="flex flex-col space-y-2">
                      <button className="bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors">Manage Course</button>
                      <button className="bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors">View Gradebook</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">You are not currently assigned to any courses.</p>
            )}
          </div>
        )}

        {/* Assignments Tab Content */}
        {activeTab === 'assignments' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center"><FaTasks className="mr-3 text-indigo-600" /> My Assignments</h2>
            <div className="mb-6 flex justify-end">
              <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 flex items-center transition-colors">
                <FaUpload className="mr-2" /> Create New Assignment
              </button>
            </div>
            {recentAssignments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-sm">
                  <thead>
                    <tr className="bg-gray-100 text-left text-gray-600 text-sm font-semibold uppercase tracking-wider">
                      <th className="py-3 px-4 rounded-tl-lg">Assignment Title</th>
                      <th className="py-3 px-4">Course</th>
                      <th className="py-3 px-4">Due Date</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 rounded-tr-lg">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAssignments.map((assignment, index) => (
                      <tr key={assignment.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-200 last:border-b-0`}>
                        <td className="py-3 px-4 text-gray-800 font-medium">{assignment.title}</td>
                        <td className="py-3 px-4 text-gray-700">{assignment.course_name}</td>
                        <td className="py-3 px-4 text-gray-700">{new Date(assignment.due_date).toLocaleDateString()}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(assignment.status)}`}>
                            {assignment.status.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-indigo-600 hover:underline text-sm">View Submissions</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600">You haven't created any assignments yet.</p>
            )}
          </div>
        )}

        {/* Grades / Results Tab Content */}
        {activeTab === 'grades' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center"><FaClipboardList className="mr-3 text-indigo-600" /> Grades & Results Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-5 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                <FaUpload className="text-indigo-500 text-4xl mb-3" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Marks File</h3>
                <p className="text-gray-600 text-sm mb-4">Upload a CSV or Excel file to quickly update student marks for a subject or exam.</p>
                <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">Select File</button>
              </div>
              <div className="border border-gray-200 rounded-lg p-5 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                <FaEdit className="text-green-500 text-4xl mb-3" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Manual Grade Entry</h3>
                <p className="text-gray-600 text-sm mb-4">Enter or edit individual student grades directly through an interactive interface.</p>
                <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">Start Entry</button>
              </div>
            </div>
            <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Published Results Overview</h3>
              <p className="text-gray-600">List of published results or links to course-specific gradebooks will appear here.</p>
              <button className="mt-4 text-indigo-600 hover:text-indigo-800 font-semibold text-sm flex items-center">
                View All Gradebooks <FaBookOpen className="ml-2" />
              </button>
            </div>
          </div>
        )}

        {/* Messages Tab Content */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center"><FaEnvelope className="mr-3 text-indigo-600" /> My Messages</h2>
            <p className="text-gray-600">Inbox and compose message functionality will be built here.</p>
          </div>
        )}

        {/* Calendar Tab Content */}
        {activeTab === 'calendar' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center"><FaCalendarAlt className="mr-3 text-indigo-600" /> My Calendar</h2>
            <p className="text-gray-600">A full-featured calendar displaying assignments, meetings, and events will go here.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default TeacherDashboard;