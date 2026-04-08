// DashboardLayout.jsx
import React, { useState } from "react";
import Footer from "../components/Footer"; // adjust path if needed
import { Link, Outlet } from "react-router";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Sidebar */}
      <div
        className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-blue-600 text-white transform 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300`}
      >
        <div className="p-5 text-2xl font-bold border-b border-blue-500">
          MicroTasker
        </div>

        <nav className="p-4 space-y-2">
          <Link to="/dashboard" className="block px-4 py-2 rounded-md hover:bg-blue-500 transition">
            Home
          </Link>
          <Link to="/dashboard/states" className="block px-4 py-2 rounded-md hover:bg-blue-500 transition">
           Worker States
          </Link>

          <Link to="/dashboard/admin" className="block px-4 py-2 rounded-md hover:bg-blue-500 transition">
           Admin States
          </Link>

          <Link to="/dashboard/submission-review" className="block px-4 py-2 rounded-md hover:bg-blue-500 transition">
           Submissions Review 
          </Link>

          <Link to="/dashboard/approved-submissions" className="block px-4 py-2 rounded-md hover:bg-blue-500 transition">
            Approved Submission 
          </Link>

          <Link to="/dashboard/add-task" className="block px-4 py-2 rounded-md hover:bg-blue-500 transition">
            Add New Task
          </Link>

          <Link to="/dashboard/added-tasks" className="block px-4 py-2 rounded-md hover:bg-blue-500 transition">
            Added Tasks
          </Link>

          <Link to="/dashboard/tasks" className="block px-4 py-2 rounded-md hover:bg-blue-500 transition">
            Task List
          </Link>

          <Link to="/dashboard/submissions" className="block px-4 py-2 rounded-md hover:bg-blue-500 transition">
            My Submissions
          </Link>
          <Link to="/dashboard/withdrawals" className="block px-4 py-2 rounded-md hover:bg-blue-500 transition">
            Withdrawals
          </Link>

          <Link to="/dashboard/withdraw-request" className="block px-4 py-2 rounded-md hover:bg-blue-500 transition">
            Withdraw Request
          </Link>

          <Link to="/dashboard/manage-users" className="block px-4 py-2 rounded-md hover:bg-blue-500 transition">
            Manage Users
          </Link>

          <Link to="/dashboard/manage-tasks" className="block px-4 py-2 rounded-md hover:bg-blue-500 transition">
            Manage Tasks
          </Link>

        </nav>
      </div>

      {/* Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        
        {/* Top Navbar */}
        <div className="flex items-center justify-between bg-white shadow px-4 py-3">
          
          {/* Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-black"></div>
              <div className="w-6 h-0.5 bg-black"></div>
              <div className="w-6 h-0.5 bg-black"></div>
            </div>
          </button>

          {/* Title */}
          <h1 className="text-lg font-semibold">Dashboard</h1>

          {/* User Info */}
          <div className="flex items-center gap-3">
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm font-medium">
              Coins: 120
            </span>
            <img
              src="https://images.pexels.com/photos/5354069/pexels-photo-5354069.jpeg"
              alt="user"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>

        {/* Content + Footer */}
        <div className="flex flex-col flex-1">
          
          {/* Page Content */}
          <div className="p-6 flex-1 overflow-y-auto">
            {/* Dashboard Content Goes Here */}
            <Outlet />

          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;