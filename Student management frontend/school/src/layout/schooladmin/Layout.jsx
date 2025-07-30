import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 p-4 border-r border-gray-300">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-white">
        <Outlet/>
        </main>
      </div>
    </div>
  );
}

export default Layout;
