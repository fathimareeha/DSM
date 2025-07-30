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



import React from 'react';
import { LogOut, Bell } from 'lucide-react';

function Header() {
  const user = {
    name: 'Admin',
    role: 'Superuser',
    avatar: 'https://i.pravatar.cc/150?img=12', // Replace with real profile pic or default
  };

  const handleLogout = () => {
    // 🔐 Clear token/session, redirect or call logout API
    console.log('Logging out...');
  };

  return (
    <header className="bg-white h-16 shadow flex items-center justify-between px-6 border-b sticky top-0 z-50">
      {/* Logo or Page Title */}
      <h1 className="text-xl font-semibold text-indigo-800 tracking-wide">
        🎓 College Admin Panel
      </h1>

      {/* Right side */}
      <div className="flex items-center space-x-6">
        {/* Notification Icon */}
        <button className="relative">
          <Bell className="w-5 h-5 text-gray-500 hover:text-indigo-600" />
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500" />
        </button>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <img
            src={user.avatar}
            alt="User"
            className="w-9 h-9 rounded-full border-2 border-indigo-600"
          />
          <div className="text-sm">
            <p className="font-medium text-gray-800">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-red-600"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;

