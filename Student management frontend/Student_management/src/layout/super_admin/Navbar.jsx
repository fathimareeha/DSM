import React from 'react';
import { Mail, Bell, Menu } from 'lucide-react';

function Navbar({ onMenuClick }) {
  return (
    <header className="p-4 flex justify-between items-center bg-white shadow-md">
      {/* Hamburger menu for mobile view */}
      <div className="md:hidden">
        <button onClick={onMenuClick}>
          <Menu size={24} />
        </button>
      </div>

      {/* Search input (hidden on very small screens if needed) */}
      <div className="flex-1 mx-6 hidden sm:block">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4">
        <Mail />
        <Bell />
      </div>
    </header>
  );
}

export default Navbar;
