import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const NAVBAR_HEIGHT = 16; // 4rem = 16 in Tailwind spacing

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      </div>

      <div className="flex pt-16"> {/* Add padding-top equal to navbar height */}
        {/* ✅ Fixed Sidebar (Desktop) */}
        <aside className="hidden md:block fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-gray-100 p-4 border-r border-gray-300 overflow-y-auto z-30">
          <Sidebar />
        </aside>

        {/* ✅ Sidebar Drawer for Mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setSidebarOpen(false)}
            ></div>

            {/* Drawer */}
            <div className="relative flex-1 w-64 bg-gray-100 p-4 border-r border-gray-300 z-50">
              <Sidebar />
              <button
                className="absolute top-4 right-4 text-gray-600"
                onClick={() => setSidebarOpen(false)}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* ✅ Main Content */}
        <main className="flex-1 p-4 md:p-6 ml-0 md:ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
