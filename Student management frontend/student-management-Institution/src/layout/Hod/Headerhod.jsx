// import React, { useEffect, useState } from "react";
// import { Bell, Menu } from "lucide-react";
// import axios from "axios";

// function Headerhod() {
//   const [user, setUser] = useState(null);
//   const [college, setCollege] = useState("Loading...");
//   const [department, setDepartment] = useState("Loading...");
//   const [role, setRole] = useState("HOD"); // default role

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       setUser(parsedUser);
//       setRole(parsedUser.role || "HOD"); // ✅ role from backend/localStorage
//     }
//   }, []);

//   useEffect(() => {
//     const fetchCollegeAndDept = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get(
//           "http://127.0.0.1:8000/superadmin_app/user_college/", 
//           {
//             headers: { Authorization: `Token ${token}` },
//           }
//         );

//         // ✅ Adjust based on your backend response structure
//         setCollege(res.data.college_name || "Unknown College");
//         setDepartment(res.data.department || "Unknown Department");
//       } catch (error) {
//         console.error(
//           "Failed to fetch college/department:",
//           error.response?.data || error.message
//         );
//         setCollege("Unknown");
//         setDepartment("Unknown");
//       }
//     };

//     fetchCollegeAndDept();
//   }, []);

//   return (
//     <header className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">
//       {/* Left */}
//       <div className="flex flex-col">
//         <h1 className="text-xl font-bold text-gray-800">{role}</h1>
//         <span className="text-sm text-gray-500">
//           {college} • {department}
//         </span>
//       </div>

//       {/* Right */}
//       <div className="flex items-center space-x-4">
//         <button className="relative p-2 rounded-full hover:bg-gray-100">
//           <Bell className="w-5 h-5 text-gray-600" />
//           <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
//             3
//           </span>
//         </button>

//         <div className="flex items-center space-x-2">
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//             alt="Profile"
//             className="w-9 h-9 rounded-full border"
//           />
//           <div className="hidden md:block">
//             <p className="text-sm font-semibold text-gray-800">
//               {user ? user.username : role}
//             </p>
//             <p className="text-xs text-gray-500">{role}</p>
//           </div>
//         </div>

//         <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
//           <Menu className="w-6 h-6 text-gray-700" />
//         </button>
//       </div>
//     </header>
//   );
// }

// export default Headerhod;


import { Bell, User, LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Header({ toggleSidebar }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "Guest" });
  const [college, setCollege] = useState("Loading...");
  const [department, setDepartment] = useState("Loading...");
  const [role, setRole] = useState("HOD");

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setRole(parsed.role || "HOD");
    }
  }, []);

  useEffect(() => {
    const fetchCollegeAndDept = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(
          "http://127.0.0.1:8000/superadmin_app/user_college/",
          { headers: { Authorization: `Token ${token}` } }
        );

        setCollege(res.data.college_name || "Unknown College");
        setDepartment(res.data.department_name || "Unknown Department");
        if (res.data.role) {
          setRole(res.data.role.toUpperCase());
        }
      } catch (error) {
        console.error("Failed to fetch college/department:", error);
        setCollege("Unknown");
        setDepartment("Unknown");
      }
    };

    fetchCollegeAndDept();
  }, []);

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
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-gray-800">{role}</h1>
          {/* <span className="text-xs text-gray-500">
            {college} • {department}
          </span> */}
        </div>
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
          <span className="hidden sm:block text-gray-700 font-medium">
            {user.username}
          </span>
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
