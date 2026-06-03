// DashboardLayout.jsx
import React, { useContext, useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import { apiFetch } from "../apiService";
import { Link, Outlet, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { UserDataContext } from "../context/UserDataContext";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useContext(AuthContext);
  const { userData } = useContext(UserDataContext);
  const [notificationsList, setNotificationsList] = useState([]);
  const popoverRef = useRef(null);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    if (!user?.email) return;
    try {
      const data = await apiFetch(`/notifications?email=${encodeURIComponent(user.email)}`);
      setNotificationsList(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  useEffect(() => {
    let mounted = true;
    const handleDocClick = () => setShowNotifications(false);

    if (showNotifications && user?.email) {
      (async () => {
        try {
          const data = await apiFetch(`/notifications?email=${encodeURIComponent(user.email)}`);
          if (mounted) setNotificationsList(Array.isArray(data) ? data : []);
        } catch (err) {
          console.error("Failed to fetch notifications:", err);
        }
      })();
      document.addEventListener("click", handleDocClick);
    }

    return () => {
      mounted = false;
      document.removeEventListener("click", handleDocClick);
    };
  }, [showNotifications, user?.email]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!user?.email) return;
      try {
        const data = await apiFetch(`/notifications?email=${encodeURIComponent(user.email)}`);
        if (mounted) setNotificationsList(Array.isArray(data) ? data : []);
      } catch (err) {}
    })();
    return () => { mounted = false; };
  }, [user?.email]);

  const unreadCount = notificationsList.filter((n) => !n.read).length;

  const markNotificationRead = async (id) => {
    try {
      await apiFetch(`/notifications/${id}/read`, { method: "PUT" });
      setNotificationsList((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error("Failed to mark notification read:", err);
    }
  };

  const markAllRead = async () => {
    if (!user?.email) return;
    try {
      await apiFetch("/notifications/read-all", {
        method: "PUT",
        body: JSON.stringify({ email: user.email }),
      });
      setNotificationsList((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error("Failed to mark all notifications read:", err);
    }
  };

  const handleNotificationClick = async (notification) => {
    if (!notification.read) {
      await markNotificationRead(notification._id);
    }
    setShowNotifications(false);
    navigate(notification.actionRoute || "/dashboard");
  };

  const displayName =
    userData?.displayName || user?.displayName || user?.email?.split("@")[0] || "Guest";
  const userRole = userData?.role || "buyer";
  const coins = Number(userData?.coins ?? 0);
  const userPhoto =
    userData?.photoURL || user?.photoURL || "https://i.sstatic.net/l60Hf.png";
  const notifications = Array.isArray(userData?.notifications) ? userData.notifications : [];
  const latestNotification = userData?.latestNotification || notifications[0] || null;

  const isAdmin = userRole === "admin";
  const isWorker = userRole === "worker";
  const isBuyer = userRole === "buyer";

  const roleColor = isAdmin
    ? "text-amber-400"
    : isWorker
    ? "text-emerald-400"
    : "text-sky-400";

  const roleBadgeBg = isAdmin
    ? "bg-amber-400/10 text-amber-400 border-amber-400/20"
    : isWorker
    ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/20"
    : "bg-sky-400/10 text-sky-400 border-sky-400/20";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        .dash-root {
          font-family: 'Sora', sans-serif;
        }

        .sidebar {
          background: linear-gradient(160deg, #0f172a 0%, #1e1b4b 60%, #0f172a 100%);
          border-right: 1px solid rgba(139, 92, 246, 0.15);
        }

        .sidebar-logo {
          background: linear-gradient(135deg, #818cf8, #c084fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 14px;
          border-radius: 10px;
          color: rgba(203, 213, 225, 0.7);
          font-size: 0.835rem;
          font-weight: 500;
          transition: all 0.18s ease;
          position: relative;
          text-decoration: none;
        }

        .nav-link:hover {
          background: rgba(139, 92, 246, 0.12);
          color: #e2e8f0;
          transform: translateX(3px);
        }

        .nav-link::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%) scaleY(0);
          width: 3px;
          height: 60%;
          background: linear-gradient(180deg, #818cf8, #c084fc);
          border-radius: 0 3px 3px 0;
          transition: transform 0.18s ease;
        }

        .nav-link:hover::before {
          transform: translateY(-50%) scaleY(1);
        }

        .nav-section-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(148, 163, 184, 0.4);
          padding: 0 14px;
          margin: 16px 0 6px;
          font-family: 'JetBrains Mono', monospace;
        }

        .topbar {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(226, 232, 240, 0.8);
        }

        .coin-chip {
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          border: 1px solid rgba(251, 191, 36, 0.3);
          color: #92400e;
          border-radius: 20px;
          padding: 5px 14px;
          font-size: 0.8rem;
          font-weight: 600;
          font-family: 'JetBrains Mono', monospace;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .notif-btn {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          border: 1px solid rgba(226, 232, 240, 0.8);
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease;
          color: #64748b;
          position: relative;
        }

        .notif-btn:hover {
          background: #f8fafc;
          border-color: #818cf8;
          color: #818cf8;
        }

        .notif-popover {
          background: white;
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06);
        }

        .notif-item-unread {
          background: linear-gradient(135deg, #ede9fe10, #e0e7ff20);
          border-left: 2px solid #818cf8;
        }

        .content-area {
          background: #f8fafc;
          background-image: 
            radial-gradient(ellipse at 20% 0%, rgba(139, 92, 246, 0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 100%, rgba(99, 102, 241, 0.04) 0%, transparent 50%);
        }

        .hamburger-bar {
          width: 22px;
          height: 2px;
          background: #475569;
          border-radius: 2px;
          transition: all 0.2s ease;
        }

        .avatar-ring {
          padding: 2px;
          background: linear-gradient(135deg, #818cf8, #c084fc);
          border-radius: 50%;
        }

        .avatar-ring img {
          border: 2px solid white;
          display: block;
        }

        .page-title {
          font-size: 1rem;
          font-weight: 700;
          background: linear-gradient(135deg, #1e293b, #475569);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
        }

        .divider {
          height: 1px;
          background: rgba(139, 92, 246, 0.1);
          margin: 8px 14px;
        }
      `}</style>

      <div className="dash-root flex h-screen overflow-hidden">

        {/* Sidebar */}
        <div
          className={`sidebar fixed md:static z-40 top-0 left-0 h-full w-64 flex flex-col transform 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 transition-transform duration-300`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 px-5 py-5 border-b border-white/5">
            <div style={{
              width: 32, height: 32, borderRadius: 10,
              background: "linear-gradient(135deg, #818cf8, #c084fc)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1rem", flexShrink: 0
            }}>⚡</div>
            <span className="sidebar-logo text-lg font-bold tracking-tight">MicroTasker</span>
          </Link>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">

            <span className="nav-section-label">Overview</span>
            <Link to="/dashboard" className="nav-link">
              <span>🏠</span> Home
            </Link>

            {(isWorker || isAdmin) && (
              <>
                <span className="nav-section-label">Worker</span>
                <Link to="/dashboard/states" className="nav-link">
                  <span>📊</span> Worker States
                </Link>
              </>
            )}

            {(isBuyer || isAdmin) && (
              <>
                <span className="nav-section-label">Buyer</span>
                <Link to="/dashboard/buyer-states" className="nav-link">
                  <span>📈</span> Buyer States
                </Link>
              </>
            )}

            {isAdmin && (
              <Link to="/dashboard/admin" className="nav-link">
                <span>🛡️</span> Admin States
              </Link>
            )}

            <div className="divider" />

            <span className="nav-section-label">Tasks</span>
            <Link to="/dashboard/tasks" className="nav-link">
              <span>📋</span> Task List
            </Link>

            {isBuyer && (
              <Link to="/dashboard/submissions-review" className="nav-link">
                <span>🔍</span> Submissions Review
              </Link>
            )}

            <Link to="/dashboard/approved-submissions" className="nav-link">
              <span>✅</span> Approved Submissions
            </Link>

            <Link to="/dashboard/submissions" className="nav-link">
              <span>📁</span> My Submissions
            </Link>

            {(isBuyer || isAdmin) && (
              <>
                <div className="divider" />
                <span className="nav-section-label">Management</span>
                <Link to="/dashboard/add-task" className="nav-link">
                  <span>➕</span> Add New Task
                </Link>
                <Link to="/dashboard/added-tasks" className="nav-link">
                  <span>🗂️</span> Added Tasks
                </Link>
                <Link to="/dashboard/payment-history" className="nav-link">
                  <span>💳</span> Payment History
                </Link>
              </>
            )}

            <div className="divider" />
            <span className="nav-section-label">Finance</span>
            <Link to="/dashboard/withdrawals" className="nav-link">
              <span>💸</span> Withdrawals
            </Link>
            <Link to="/dashboard/my-withdraw-requests" className="nav-link">
              <span>📤</span> My Withdraw Requests
            </Link>

            {isAdmin && (
              <>
                <Link to="/dashboard/withdraw-request" className="nav-link">
                  <span>🏦</span> Withdraw Requests
                </Link>
                <div className="divider" />
                <span className="nav-section-label">Admin</span>
                <Link to="/dashboard/manage-users" className="nav-link">
                  <span>👥</span> Manage Users
                </Link>
                <Link to="/dashboard/manage-tasks" className="nav-link">
                  <span>⚙️</span> Manage Tasks
                </Link>
              </>
            )}
          </nav>

          {/* Bottom user strip */}
          <div style={{
            padding: "12px 16px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex", alignItems: "center", gap: 10
          }}>
            <div className="avatar-ring" style={{ flexShrink: 0 }}>
              <img src={userPhoto} alt={displayName}
                style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#e2e8f0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {displayName}
              </p>
              <p className={`text-xs font-semibold ${roleColor}`} style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {userRole}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 md:hidden z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

          {/* Topbar */}
          <div className="topbar flex items-center justify-between px-5 py-3 z-20" style={{ minHeight: 64 }}>

            {/* Left: hamburger + title */}
            <div className="flex items-center gap-4">
              <button
                className="md:hidden flex flex-col gap-1.5 p-1"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <div className="hamburger-bar" />
                <div className="hamburger-bar" />
                <div className="hamburger-bar" />
              </button>
              <h1 className="page-title hidden sm:block">Dashboard</h1>
            </div>

            {/* Right: coins + notif + user */}
            <div className="flex items-center gap-3">

              {/* Coins */}
              <div className="coin-chip">
                <span>🪙</span>
                <span>{coins.toLocaleString()}</span>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  className="notif-btn"
                  onClick={(e) => { e.stopPropagation(); setShowNotifications((prev) => !prev); }}
                  aria-label="Notifications"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                  {unreadCount > 0 && (
                    <span style={{
                      position: "absolute", top: 7, right: 7,
                      width: 8, height: 8, borderRadius: "50%",
                      background: "#ef4444",
                      border: "2px solid white",
                      display: "block"
                    }} />
                  )}
                </button>

                {showNotifications && (
                  <div
                    ref={popoverRef}
                    onClick={(e) => e.stopPropagation()}
                    className="notif-popover absolute right-0 mt-2 w-80 max-h-96 overflow-auto z-50"
                  >
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "12px 16px", borderBottom: "1px solid #f1f5f9"
                    }}>
                      <div>
                        <h2 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#1e293b" }}>Notifications</h2>
                        {unreadCount > 0 && (
                          <p style={{ fontSize: "0.7rem", color: "#94a3b8", marginTop: 1 }}>{unreadCount} unread</p>
                        )}
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllRead}
                          style={{
                            fontSize: "0.75rem", color: "#818cf8", fontWeight: 600,
                            background: "none", border: "none", cursor: "pointer"
                          }}
                        >
                          Mark all read
                        </button>
                      )}
                    </div>

                    <div style={{ padding: "6px" }}>
                      {notificationsList.length > 0 ? (
                        notificationsList.map((n) => (
                          <button
                            key={n._id}
                            onClick={() => handleNotificationClick(n)}
                            className={n.read ? "" : "notif-item-unread"}
                            style={{
                              width: "100%", textAlign: "left",
                              padding: "10px 12px", borderRadius: 10,
                              marginBottom: 3, display: "block", cursor: "pointer",
                              background: n.read ? "transparent" : undefined,
                              border: "none", transition: "background 0.15s"
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                            onMouseLeave={e => e.currentTarget.style.background = n.read ? "transparent" : ""}
                          >
                            <p style={{ fontSize: "0.82rem", color: "#334155", lineHeight: 1.4, marginBottom: 3 }}>{n.message}</p>
                            <p style={{ fontSize: "0.7rem", color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace" }}>
                              {new Date(n.time).toLocaleString()}
                            </p>
                          </button>
                        ))
                      ) : (
                        <div style={{ padding: "24px 16px", textAlign: "center" }}>
                          <p style={{ fontSize: "1.5rem", marginBottom: 6 }}>🔔</p>
                          <p style={{ fontSize: "0.82rem", color: "#94a3b8" }}>No notifications yet.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div className="hidden sm:block" style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1e293b", lineHeight: 1.2 }}>{displayName}</p>
                  <span className={`text-xs font-bold border ${roleBadgeBg}`}
                    style={{ fontSize: "0.62rem", padding: "1px 7px", borderRadius: 20, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {userRole}
                  </span>
                </div>
                <div className="avatar-ring">
                  <img src={userPhoto} alt={displayName}
                    style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
                </div>
              </div>

            </div>
          </div>

          {/* Content + Footer */}
          <div className="content-area flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6">
              <Outlet />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;