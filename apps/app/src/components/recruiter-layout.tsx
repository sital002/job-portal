import React, { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const RecruiterLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSidebarOpen(window.innerWidth > 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean, end?: boolean }) =>
    `block py-2 px-4 rounded transition-colors ${
      isActive
        ? 'bg-blue-100 text-blue-700 font-medium'
        : 'text-gray-700 hover:bg-blue-50'
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md transition-all duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isSidebarOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      <aside
        className={`
          w-64 bg-white shadow-md transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isMobile ? 'fixed inset-y-0 left-0 z-40' : ''}
        `}
      >
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <NavLink to="/recruiter/dashboard" className={navLinkClasses}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/recruiter/jobs/new" className={navLinkClasses}>
                Post New Job
              </NavLink>
            </li>
            <li>
              <NavLink to="/recruiter/jobs" end className={navLinkClasses}>
                Manage Jobs
              </NavLink>
            </li>
            <li>
              <NavLink to="/recruiter/applicants" className={navLinkClasses}>
                View Applicants
              </NavLink>
            </li>
            <li>
              <NavLink to="/recruiter/profile" className={navLinkClasses}>
                Profile
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      <main className={`flex-grow p-8 transition-all duration-300 ease-in-out ${isSidebarOpen && !isMobile ? 'md:ml-64' : ''}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default RecruiterLayout;

