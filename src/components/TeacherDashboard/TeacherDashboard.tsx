// src/components/TeacherDashboard/TeacherDashboard.tsx

import React, { useState, useEffect } from 'react';
import './TeacherDashboard.css'; // Assuming you have a CSS file
import { 
  FaUser, FaIdCard, FaBriefcase, FaGraduationCap, FaScroll, 
  FaChalkboardTeacher, FaTasks, FaEnvelope, FaCalendarAlt, FaUpload, 
  FaBell, FaClipboardList 
} from 'react-icons/fa'; // For icons

// Define interfaces for data
interface ResearchPaper {
  id: string;
  title: string;
  link?: string; // Optional link to the paper
}

interface Course {
  id: string;
  name: string;
  code: string;
  numStudents: number;
}

interface TeacherData {
  name: string;
  profilePicUrl: string;
  aparId: string;
  workExperience: string[];
  department: string;
  researchPapers: ResearchPaper[];
  totalStudentsTaught: number;
  studentDepartments: string[]; // e.g., ['Computer Science', 'Mathematics']
  totalAssignmentsGiven: number;
  pendingAssignmentsToGrade: number;
}

const TeacherDashboard: React.FC = () => {
  const [teacherData, setTeacherData] = useState<TeacherData | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeTab, setActiveTab] = useState<string>('home'); // For navigation

  // Mock data loading - in a real app, this would be an API call
  useEffect(() => {
    // Simulate fetching data
    const fetchDashboardData = async () => {
      // Replace with your actual API calls
      const mockTeacherData: TeacherData = {
        name: 'Dr. Jane Doe',
        profilePicUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=JD', // Placeholder image
        aparId: 'TCH-1001',
        workExperience: [
          'Professor at Unified Ed (5 years)',
          'Lecturer at State University (8 years)',
          'Research Fellow at Tech Institute (3 years)',
        ],
        department: 'Computer Science',
        researchPapers: [
          { id: 'rp1', title: 'Advances in Machine Learning Algorithms', link: '#' },
          { id: 'rp2', title: 'Optimizing Educational Software Interfaces', link: '#' },
        ],
        totalStudentsTaught: 120,
        studentDepartments: ['Computer Science', 'Data Science', 'Information Technology'],
        totalAssignmentsGiven: 35,
        pendingAssignmentsToGrade: 8,
      };

      const mockCourses: Course[] = [
        { id: 'cs101', name: 'Introduction to Programming', code: 'CS-101', numStudents: 45 },
        { id: 'ml202', name: 'Machine Learning Fundamentals', code: 'ML-202', numStudents: 30 },
        { id: 'ds303', name: 'Data Structures & Algorithms', code: 'DS-303', numStudents: 25 },
      ];

      setTeacherData(mockTeacherData);
      setCourses(mockCourses);
    };

    fetchDashboardData();
  }, []);

  if (!teacherData) {
    return <div>Loading dashboard...</div>; // Or a nice spinner
  }

  return (
    <div className="teacher-dashboard">
      <aside className="sidebar">
        <div className="profile-summary">
          <img src={teacherData.profilePicUrl} alt={teacherData.name} className="profile-pic" />
          <h3>{teacherData.name}</h3>
          <p className="department">{teacherData.department}</p>
        </div>
        <nav className="main-nav">
          <ul>
            <li className={activeTab === 'home' ? 'active' : ''} onClick={() => setActiveTab('home')}>
              <FaChalkboardTeacher /> Dashboard Home
            </li>
            <li className={activeTab === 'courses' ? 'active' : ''} onClick={() => setActiveTab('courses')}>
              <FaGraduationCap /> My Courses
            </li>
            <li className={activeTab === 'assignments' ? 'active' : ''} onClick={() => setActiveTab('assignments')}>
              <FaTasks /> Assignments
            </li>
            <li className={activeTab === 'grades' ? 'active' : ''} onClick={() => setActiveTab('grades')}>
              <FaClipboardList /> Grades / Results
            </li>
            <li className={activeTab === 'messages' ? 'active' : ''} onClick={() => setActiveTab('messages')}>
              <FaEnvelope /> Messages
            </li>
            <li className={activeTab === 'calendar' ? 'active' : ''} onClick={() => setActiveTab('calendar')}>
              <FaCalendarAlt /> Calendar
            </li>
            {/* Add more navigation items here */}
          </ul>
        </nav>
      </aside>

      <main className="dashboard-content">
        <header className="dashboard-header">
          <h1>Welcome, {teacherData.name}!</h1>
          <div className="notifications">
            <FaBell /> <span>{teacherData.pendingAssignmentsToGrade + courses.length * 2 /* example for unread messages/announcements */}</span>
            {/* Real notification count would come from state */}
          </div>
        </header>

        {activeTab === 'home' && (
          <div className="dashboard-home-tab">
            <section className="teacher-profile-card card">
              <h2><FaUser /> My Profile</h2>
              <p><strong>APAR ID:</strong> {teacherData.aparId}</p>
              <p><strong>Department:</strong> {teacherData.department}</p>
              <div>
                <strong>Work Experience:</strong>
                <ul>
                  {teacherData.workExperience.map((exp, index) => (
                    <li key={index}>{exp}</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Research Papers:</strong>
                {teacherData.researchPapers.length > 0 ? (
                  <ul>
                    {teacherData.researchPapers.map((paper) => (
                      <li key={paper.id}>
                        {paper.link ? <a href={paper.link} target="_blank" rel="noopener noreferrer">{paper.title}</a> : paper.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No research papers listed.</p>
                )}
              </div>
            </section>

            <section className="quick-stats-card card">
              <h2><FaChalkboardTeacher /> Quick Stats</h2>
              <div className="stat-grid">
                <div className="stat-item">
                  <h3>{teacherData.totalStudentsTaught}</h3>
                  <p>Total Students</p>
                </div>
                <div className="stat-item">
                  <h3>{teacherData.totalAssignmentsGiven}</h3>
                  <p>Assignments Given</p>
                </div>
                <div className="stat-item">
                  <h3>{teacherData.pendingAssignmentsToGrade}</h3>
                  <p>Pending Grading</p>
                </div>
              </div>
              <p><strong>Teaching Students From:</strong> {teacherData.studentDepartments.join(', ')}</p>
            </section>

            <section className="my-courses-overview card">
              <h2><FaGraduationCap /> My Courses</h2>
              <div className="course-cards-container">
                {courses.map(course => (
                  <div key={course.id} className="course-card">
                    <h3>{course.name} ({course.code})</h3>
                    <p>{course.numStudents} Students</p>
                    <div className="course-actions">
                      <button className="btn-primary">Go to Course</button>
                      <button className="btn-secondary">Gradebook</button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn-link">View All Courses</button>
            </section>

            {/* Add sections for Announcements, Calendar, etc., similar to above */}
            <section className="announcements-section card">
              <h2><FaBell /> Recent Announcements</h2>
              {/* Placeholder for announcements */}
              <p>No new announcements.</p>
              <button className="btn-link">View All Announcements</button>
            </section>

            <section className="upcoming-calendar card">
              <h2><FaCalendarAlt /> Upcoming Events</h2>
              {/* Placeholder for calendar events */}
              <ul>
                <li>Nov 15: CS-101 Assignment 3 Due</li>
                <li>Nov 18: Faculty Meeting</li>
              </ul>
              <button className="btn-link">View Full Calendar</button>
            </section>
          </div>
        )}

        {activeTab === 'grades' && (
          <div className="grades-tab">
            <h2><FaUpload /> Upload Results / Enter Marks</h2>
            <div className="upload-form card">
              <p>Select a course and subject to upload marks or enter grades.</p>
              {/* Form elements for course selection, file upload, manual entry */}
              <button className="btn-primary">Upload Marks File</button>
              <button className="btn-secondary">Manual Grade Entry</button>
            </div>
            {/* Placeholder for gradebook view or results history */}
            <div className="gradebook-preview card">
              <h3>Gradebook Overview</h3>
              <p>Select a course to view its detailed gradebook.</p>
            </div>
          </div>
        )}

        {/* Add content for other tabs like 'assignments', 'messages', 'calendar' */}
        {/* Example: assignments tab */}
        {activeTab === 'assignments' && (
          <div className="assignments-tab">
            <h2><FaTasks /> My Assignments</h2>
            <div className="assignment-list card">
              {/* Render a list of assignments with status (pending grading, graded, due soon) */}
              <p>List of assignments will go here.</p>
              <button className="btn-primary">Create New Assignment</button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default TeacherDashboard;