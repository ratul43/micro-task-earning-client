// DashboardLayout.jsx
import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer"; // adjust path if needed
import { Link, Outlet } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { apiFetch } from "../apiService";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const loadUserData = async () => {
      if (!user?.email) {
        setUserData(null);
        return;
      }

      try {
        const data = await apiFetch(`/users/email?email=${encodeURIComponent(user.email)}`);
        setUserData(data || {});
      } catch (error) {
        console.error("Failed to load user data:", error);
        setUserData({});
      }
    };

    loadUserData();
  }, [user?.email]);

  const displayName =
    userData?.displayName || user?.displayName || user?.email?.split("@")[0] || "Guest";
  const userRole = userData?.role || "buyer";
  const coins = Number(userData?.coins ?? 0);
  const userPhoto =
    userData?.photoURL || user?.photoURL || "https://i.sstatic.net/l60Hf.png";
  const notifications = Array.isArray(userData?.notifications)
    ? userData.notifications
    : [];
  const latestNotification =
    userData?.latestNotification || notifications[0] || null;

  const isAdmin = userRole === "admin";
  const isWorker = userRole === "worker";
  const isBuyer = userRole === "buyer";

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Sidebar */}
      <div
        className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-blue-600 text-white transform 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300`}
      >
        <Link to="/" className="p-5 text-2xl font-bold border-b border-blue-500">
          MicroTasker
        </Link>

        <nav className="p-4 space-y-2">
          <Link to="/dashboard" className="block px-4 py-2 rounded-md hover:bg-blue-500 transition">
            Home
          </Link>

          {(isWorker || isAdmin) && (
            <Link to="/dashboard/states" className="block px-4 py-2 rounded-md hover:bg-blue-500 transition">
              Worker States
            </Link>
          )}

          {(isBuyer || isAdmin) && (
            <Link to="/dashboard/buyer-states" className="block px-4 py-2 rounded-md hover:bg-blue-500 transition">
              Buyer States
            </Link>
          )}

          {isAdmin && (
            <Link to="/dashboard/admin" className="block px-4 py-2 rounded-md hover:bg-blue-500 transition">
              Admin States
            </Link>
          )}

          {isBuyer && (
            <Link to="/dashboard/submissions-review" className="block px-4 py-2 rounded-md hover:bg-blue-500 transition">
              Submissions Review
            </Link>
          )}

          <Link to="/dashboard/approved-submissions" className="block px-4 py-2 rounded-md hover:bg-blue-500 transition">
            Approved Submission
          </Link>

          {(isBuyer || isAdmin) && (
            <>
              <Link to="/dashboard/add-task" className="block px-4 py-2 rounded-md hover:bg-blue-500 transition">
                Add New Task
              </Link>
              <Link to="/dashboard/added-tasks" className="block px-4 py-2 rounded-md hover:bg-blue-500 transition">
                Added Tasks
              </Link>
            </>
          )}

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

          {isAdmin && (
            <>
              <Link to="/dashboard/manage-users" className="block px-4 py-2 rounded-md hover:bg-blue-500 transition">
                Manage Users
              </Link>
              <Link to="/dashboard/manage-tasks" className="block px-4 py-2 rounded-md hover:bg-blue-500 transition">
                Manage Tasks
              </Link>
            </>
          )}

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
        <div className="relative flex items-center justify-between bg-white shadow px-4 py-3">
          
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
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications((prev) => !prev)}
                className="relative p-2 rounded-full hover:bg-blue-100 text-blue-600 transition"
                aria-label="Notifications"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-gray-200 bg-white shadow-xl ring-1 ring-black ring-opacity-5 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <h2 className="text-sm font-semibold text-gray-900">Latest Notification</h2>
                  </div>
                  <div className="p-4">
                    {latestNotification ? (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700">{latestNotification.message || latestNotification.title || latestNotification}</p>
                        {latestNotification.date && (
                          <p className="text-xs text-gray-400">{new Date(latestNotification.date).toLocaleString()}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No new notifications.</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col items-end text-right">
              <span className="text-sm font-semibold text-gray-700">{displayName}</span>
              <span className="text-xs text-gray-500">{userRole?.toUpperCase()}</span>
            </div>
            <div className="flex items-center gap-3 rounded-full bg-blue-50 px-3 py-2">
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm font-medium">
                Coins: {coins}
              </span>
              <img src={userPhoto} alt={displayName} className="w-10 h-10 rounded-full object-cover" />
            </div>
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