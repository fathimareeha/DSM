import React from "react";
import { Bell, LogOut, BarChart2 } from "lucide-react";

const Navbar = () => {

  return (
    <nav className="bg-blue-50 text-blue-900 p-4 shadow ml-64">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">School Admin Panel</h1>


        <div className="space-x-6 hidden md:flex items-center">
          <a href="#" className="hover:text-gray-300">Manage Teachers</a>
          <a href="#" className="hover:text-gray-300">Manage Students</a>
          <a href="#" className="hover:text-gray-300">Class Timetable</a>
          <a href="#" className="hover:text-gray-300">Announcements</a>

          {/* Updated Reports with icon */}
          <a href="#" className="flex items-center gap-1 hover:text-gray-300">
            <BarChart2 className="w-4 h-4" />
            Reports
          </a>

          {/* Notification Icon */}
          <button className="relative hover:text-gray-300">
            <Bell className="w-5 h-5" />
            {/* Notification Dot */}
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Logout Button */}
          <button className="flex items-center gap-1 text-red-300 hover:text-red-500 transition">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
