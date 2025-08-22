import React, { useEffect, useState } from "react";
import { Bell, Menu } from "lucide-react";
import axios from "axios";

function Headerhod() {
  const [user, setUser] = useState(null);
  const [college, setCollege] = useState("Loading..."); 
  const [role, setRole] = useState("HOD"); // default role

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setRole(parsedUser.role || "HOD"); // ✅ role from backend/localStorage
    }
  }, []);

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://127.0.0.1:8000/superadmin_app/user_college/",
          {
            headers: { Authorization: `Token ${token}` },
          }
        );
        setCollege(res.data.college_name);
      } catch (error) {
        console.error(
          "Failed to fetch college name:",
          error.response?.data || error.message
        );
        setCollege("Unknown");
      }
    };

    fetchCollege();
  }, []);

  return (
    <header className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* Left */}
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-gray-800">{role} Dashboard</h1>
        <span className="text-sm text-gray-500">
          Dashboard / {role} / {college}
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center space-x-4">
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        <div className="flex items-center space-x-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
            className="w-9 h-9 rounded-full border"
          />
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-gray-800">
              {user ? user.username : role}
            </p>
            <p className="text-xs text-gray-500">{role}</p>
          </div>
        </div>

        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </header>
  );
}

export default Headerhod;
