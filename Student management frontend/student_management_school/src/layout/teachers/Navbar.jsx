import { useState } from "react";
import { Menu, LogOut, Settings, Users, BookOpen, LayoutDashboard, MessageSquare } from "lucide-react";

export default function TeachersNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <BookOpen className="w-7 h-7 text-blue-600" />
            <span className="font-bold text-lg">Teacher Dashboard</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/dashboard" className="flex items-center gap-1 text-gray-700 hover:text-blue-600">
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </a>
            <a href="/classes" className="flex items-center gap-1 text-gray-700 hover:text-blue-600">
              <BookOpen className="w-5 h-5" /> Classes
            </a>
            <a href="/students" className="flex items-center gap-1 text-gray-700 hover:text-blue-600">
              <Users className="w-5 h-5" /> Students
            </a>
            <a href="/messages" className="flex items-center gap-1 text-gray-700 hover:text-blue-600">
              <MessageSquare className="w-5 h-5" /> Messages
            </a>
            <a href="/settings" className="flex items-center gap-1 text-gray-700 hover:text-blue-600">
              <Settings className="w-5 h-5" /> Settings
            </a>
            <button className="flex items-center gap-1 text-red-600 hover:text-red-800">
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button onClick={() => setOpen(!open)} className="text-gray-700 hover:text-blue-600">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-gray-50 px-4 pb-3 space-y-2">
          <a href="/dashboard" className="block text-gray-700 hover:text-blue-600">Dashboard</a>
          <a href="/classes" className="block text-gray-700 hover:text-blue-600">Classes</a>
          <a href="/students" className="block text-gray-700 hover:text-blue-600">Students</a>
          <a href="/messages" className="block text-gray-700 hover:text-blue-600">Messages</a>
          <a href="/settings" className="block text-gray-700 hover:text-blue-600">Settings</a>
          <button className="block text-red-600 hover:text-red-800">Logout</button>
        </div>
      )}
    </nav>
  );
}
