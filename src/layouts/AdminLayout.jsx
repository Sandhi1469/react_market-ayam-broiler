import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

// Layout utama untuk panel dashboard admin
export default function AdminLayout({ contextValue }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Menggunakan Komponen Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar (for mobile) */}
        <div className="md:hidden bg-white shadow-xs p-4 flex justify-between items-center z-10 border-b">
          <h1 className="font-bold text-gray-800 text-sm">🐔 BroilerHub Admin</h1>
          <button
            className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 active:scale-95 text-sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle Sidebar"
          >
            ☰ Menu
          </button>
        </div>

        {/* Page Content melalui Outlet */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet context={contextValue} />
        </main>

        {/* Footer Admin */}
        <footer className="bg-white border-t p-3 text-center text-xs text-gray-500">
          © 2026 BroilerHub Admin App — v1.0.0
        </footer>
      </div>
    </div>
  );
}

