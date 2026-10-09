import React from "react";
import { Link, useLocation } from "react-router-dom";

// Komponen sidebar navigasi admin
export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  const navLinks = [
    { to: "/admin/dashboard", label: "Dashboard Manajemen", icon: "📊" },
    { to: "/admin/about", label: "Tentang Sistem (About)", icon: "ℹ️" },
  ];

  return (
    <aside
      className={`${
        sidebarOpen ? "block" : "hidden"
      } md:block w-64 bg-white shadow-md flex-shrink-0 z-30 transition-all`}
    >
      <div className="p-4 font-bold text-xl border-b flex items-center justify-between">
        <span className="text-gray-900 flex items-center gap-2">
          <span>🐔</span> Broiler Admin
        </span>
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden text-gray-500 hover:text-gray-800 p-1"
        >
          ✕
        </button>
      </div>

      <nav className="flex flex-col p-4 space-y-2 text-sm">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setSidebarOpen(false)}
              className={`p-2.5 rounded-lg flex items-center gap-2.5 font-medium transition ${
                isActive
                  ? "bg-amber-100 text-amber-900 font-bold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}

        <div className="pt-4 mt-4 border-t border-gray-100">
          <Link
            to="/"
            className="p-2.5 rounded-lg flex items-center gap-2 text-xs font-semibold text-amber-700 hover:bg-amber-50"
          >
            <span>←</span> Kembali ke Portal Pembeli
          </Link>
        </div>
      </nav>
    </aside>
  );
}

