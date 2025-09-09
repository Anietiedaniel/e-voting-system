import React, { useState, useContext } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const location = useLocation();

  const menuItems = [
    { name: "Manage Voters", icon: "fas fa-users", path: "/admin", exact: true },
    { name: "Generate Access Codes", icon: "fas fa-key", path: "/admin/access-codes" },
    { name: "Monitor System", icon: "fas fa-tachometer-alt", path: "/admin/monitor-system" },
    { name: "View Results", icon: "fas fa-chart-bar", path: "/admin/results" },
    { name: "Settings", icon: "fas fa-cog", path: "/admin/settings" },
    { name: "Profile", icon: "fas fa-user", path: "/admin/profile" },
  ];

  const navClass = ({ isActive }, itemPath, exact) => {
    const defaultActive = exact && location.pathname === "/admin";
    return `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive || defaultActive
        ? "bg-purple-100 text-purple-700 font-semibold"
        : "text-gray-700 hover:bg-purple-50"
    }`;
  };

  return (
    <div className="flex h-screen font-sans bg-purple-50 overflow-x-hidden">

      {/* Sidebar Desktop */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-white shadow-lg">
        <div className="flex items-center justify-center h-20 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-purple-700">Admin Panel</h1>
        </div>
        <nav className="flex-1 flex flex-col p-4 gap-2 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={(navData) => navClass(navData, item.path, item.exact)}
              end={item.exact}
            >
              <i className={item.icon}></i>
              <span>{item.name}</span>
            </NavLink>
          ))}
          <button
            onClick={logout}
            className="mt-auto flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-100 rounded-xl transition-all duration-200"
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/30"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative w-64 bg-white shadow-lg p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-purple-700">Menu</h2>
              <button onClick={() => setSidebarOpen(false)} className="text-gray-600">
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={(navData) => navClass(navData, item.path, item.exact)}
                  end={item.exact}
                  onClick={() => setSidebarOpen(false)}
                >
                  <i className={item.icon}></i>
                  <span>{item.name}</span>
                </NavLink>
              ))}
              <button
                onClick={logout}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-100 rounded-xl mt-2 transition-all duration-200"
              >
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col max-w-full">
        {/* Topbar Mobile */}
        <div className="flex items-center justify-between bg-white shadow p-4 md:hidden">
          <button
            className="text-gray-600 focus:outline-none"
            onClick={() => setSidebarOpen(true)}
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
          <span className="font-semibold text-gray-800 text-lg">Admin Dashboard</span>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-4 md:p-6 overflow-auto w-full">
          <div className="bg-white p-6 rounded-2xl shadow-lg min-h-[70vh] w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
