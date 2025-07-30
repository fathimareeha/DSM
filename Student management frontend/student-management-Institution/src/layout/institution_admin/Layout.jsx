import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main content with Sidebar and page content */}
      <div className="flex flex-1">
        {/* Sidebar (typically hidden on small screens, shown on md+) */}
        <Sidebar />

        {/* Main content area */}
        <main className="flex-1 p-4 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
