import React, { useState } from "react";

export default function Login() {
  const [role, setRole] = useState("student"); // default role
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      alert("Username and Password are required");
      return;
    }

    // Example: Call API based on role
    if (role === "student") {
      console.log("Logging in as Student:", { username, password });
      // fetch("/api/student/login", { method: "POST", body: JSON.stringify({ username, password }) })
    } else {
      console.log("Logging in as Teacher:", { username, password });
      // fetch("/api/teacher/login", { method: "POST", body: JSON.stringify({ username, password }) })
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {role === "student" ? "Student Login" : "Teacher Login"}
        </h2>

        {/* Role Switch Tabs */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setRole("student")}
            className={`px-4 py-2 rounded-l-lg font-medium ${
              role === "student"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setRole("teacher")}
            className={`px-4 py-2 rounded-r-lg font-medium ${
              role === "teacher"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Teacher
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
              
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
       
        </div>
      </div>
    </div>
  );
}
