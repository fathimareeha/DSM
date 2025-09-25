import React from "react";
import { Bell, LogOut, BarChart2, Menu } from "lucide-react";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-50 text-blue-900 p-4 shadow z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left */}
        <div className="flex items-center gap-3">
          {/* Hamburger for Mobile */}
          <button
            className="md:hidden text-blue-900 hover:text-blue-600"
            onClick={toggleSidebar}
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg md:text-xl font-bold">School Admin Panel</h1>
        </div>

        {/* Right */}
        <div className="space-x-4 md:space-x-6 hidden md:flex items-center">
          <a href="#">Manage Teachers</a>
          <a href="#">Manage Students</a>
          <a href="#">Class Timetable</a>
          <a href="#">Announcements</a>

          <a href="#" className="flex items-center gap-1">
            <BarChart2 className="w-4 h-4" /> Reports
          </a>

          <button className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <button className="flex items-center gap-1 text-red-400 hover:text-red-600">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
