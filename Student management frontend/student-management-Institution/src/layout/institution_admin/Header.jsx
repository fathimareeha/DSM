// import React from 'react';

// function Header() {
//   return (
//     <header className="bg-white h-16 shadow-sm flex items-center justify-between px-6 border-b">
//       <h1 className="text-xl font-semibold">Admin Dashboard</h1>
//       <div className="flex items-center space-x-4">
//         {/* Placeholder for user profile or logout */}
//         <div className="w-8 h-8 rounded-full bg-gray-300" />
//       </div>
//     </header>
//   );
// }

// export default Header;



// import React from 'react';
// import { LogOut, Bell } from 'lucide-react';

// function Header() {
//   const user = {
//     name: 'Admin',
//     role: 'Superuser',
//     avatar: 'https://i.pravatar.cc/150?img=12', // Replace with real profile pic or default
//   };

//   const handleLogout = () => {
//     // 🔐 Clear token/session, redirect or call logout API
//     console.log('Logging out...');
//   };

//   return (
//     <header className="bg-white h-16 shadow flex items-center justify-between px-6 border-b sticky top-0 z-50">
//       {/* Logo or Page Title */}
//       <h1 className="text-xl font-semibold text-indigo-800 tracking-wide">
//         college admin
//       </h1>

//       {/* Right side */}
//       <div className="flex items-center space-x-6">
//         {/* Notification Icon */}
//         <button className="relative">
//           <Bell className="w-5 h-5 text-gray-500 hover:text-indigo-600" />
//           <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500" />
//         </button>

//         {/* User Info */}
//         <div className="flex items-center gap-3">
//           <img
//             src={user.avatar}
//             alt="User"
//             className="w-9 h-9 rounded-full border-2 border-indigo-600"
//           />
//           <div className="text-sm">
//             <p className="font-medium text-gray-800">{user.name}</p>
//             <p className="text-xs text-gray-500">{user.role}</p>
//           </div>

//           {/* Logout Button */}
//           <button
//             onClick={handleLogout}
//             className="text-gray-500 hover:text-red-600"
//             title="Logout"
//           >
//             <LogOut className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;



import { Bell, User, LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header({ toggleSidebar }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || { username: "Guest" };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 md:left-64 h-16 bg-white shadow flex items-center justify-between px-4 md:px-6 z-50">
      {/* Left: Mobile menu button */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800"></h1>
      </div>

      {/* Right: Notifications, User, Logout */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-md hover:bg-gray-100 transition">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* User Info */}
        <div className="flex items-center gap-2">
          <User className="w-6 h-6 text-gray-600" />
          <span className="hidden sm:block text-gray-700 font-medium">{user.username}</span>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:block">Logout</span>
        </button>
      </div>
    </header>
  );
}
