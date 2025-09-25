// import { useState } from "react";
// import { Home, Users, BookOpen, ClipboardList, LogOut, ChevronDown } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function HODSidebar() {
//   const [openDept, setOpenDept] = useState(false);

//   return (
//     <div className="h-screen w-64 bg-gray-900 text-white flex flex-col shadow-xl overflow-y-auto">
//       {/* Logo / Title */}
//       <div className="p-4 text-2xl font-bold border-b border-gray-700">
//         HOD Dashboard
//       </div>

//       {/* Menu */}
//       <nav className="p-4 space-y-2">
//         <Link
//           to="/hod/dash"
//           className="flex items-center gap-2 p-2 rounded hover:bg-gray-700"
//         >
//           <Home size={18} /> Dashboard
//         </Link>

//         {/* Department Section */}
//         <div>
//           <button
//             onClick={() => setOpenDept(!openDept)}
//             className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
//           >
//             <span className="flex items-center gap-2">
//               <Users size={18} /> My Department
//             </span>
//             <ChevronDown
//               size={16}
//               className={`transform transition-transform ${openDept ? "rotate-180" : ""}`}
//             />
//           </button>
//           {openDept && (
//             <div className="ml-6 mt-1 space-y-1">
//               <Link to="/hod/faculty" className="block p-2 rounded hover:bg-gray-700">
//                 Faculty
//               </Link>
//               <Link to="/hod/students" className="block p-2 rounded hover:bg-gray-700">
//                 Students
//               </Link>
//             </div>
//           )}
//         </div>

//         <Link
//           to="/hod/courses"
//           className="flex items-center gap-2 p-2 rounded hover:bg-gray-700"
//         >
//           <BookOpen size={18} /> Courses & Subjects
//         </Link>

//         <Link
//           to="/hod/tasks"
//           className="flex items-center gap-2 p-2 rounded hover:bg-gray-700"
//         >
//           <ClipboardList size={18} /> Tasks / Notices
//         </Link>
//       </nav>

//       {/* Footer / Logout */}
//       <div className="p-4 border-t border-gray-700">
//         <Link
//           to="/logout"
//           className="flex items-center gap-2 p-2 rounded hover:bg-red-600"
//         >
//           <LogOut size={18} /> Logout
//         </Link>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
  Home,
  Users,
  BookOpen,
  ClipboardList,
  ChevronDown,
  ChevronUp,
  LogOut,
} from "lucide-react";
import { Disclosure } from "@headlessui/react";

const navItems = [
  { name: "Dashboard", to: "/hod/dash", icon: Home },
  {
    name: "My Department",
    icon: Users,
    children: [
      { name: "Faculty", to: "/hod/faculty" },
      { name: "Students", to: "/hod/students" },
    ],
  },
  { name: "Courses & Subjects", to: "/hod/courses", icon: BookOpen },
  { name: "Tasks / Notices", to: "/hod/tasks", icon: ClipboardList },
  { name: "Attendance", to: "/hod/hod-attendance", icon: ClipboardList },
];

function HODSidebar({ mobileOpen, setMobileOpen }) {
  const [collegeName, setCollegeName] = useState("Loading...");
  const [departmentName, setDepartmentName] = useState("Loading...");
  const [collegeLogo, setCollegeLogo] = useState(null);

  useEffect(() => {
    const fetchCollegeAndDept = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        // ✅ Use the same API as Headerhod
        const res = await axios.get(
          "http://127.0.0.1:8000/superadmin_app/user_college/",
          {
            headers: { Authorization: `Token ${token}` },
          }
        );

        setCollegeName(res.data.college_name || "Unknown College");
        setDepartmentName(res.data.department_name || "Unknown Dept");
        setCollegeLogo(res.data?.logo || null);

      } catch (error) {
        console.error("Failed to fetch details:", error.response?.data || error.message);
        setCollegeName("Unknown College");
        setDepartmentName("Unknown Dept");
      }
    };

    fetchCollegeAndDept();
  }, []);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-white to-gray-50 shadow-lg w-64 z-50 transform transition-transform md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* College Header */}
          <div className="px-6 py-6 border-b border-gray-100 flex-shrink-0">
            <div className="flex items-center gap-5 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl shadow p-5">
              <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full border border-indigo-200 shadow-md overflow-hidden">
                {collegeLogo ? (
                  <img
                    src={collegeLogo}
                    alt="College Logo"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-xs text-gray-400">No Logo</span>
                )}
              </div>
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold text-gray-800">
                  {collegeName}
                </h2>
                <p className="text-sm text-gray-500">{departmentName}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-5 space-y-2 text-sm font-medium overflow-y-auto">
            {navItems.map(({ name, icon: Icon, to, children }) =>
              children ? (
                <Disclosure as="div" key={name}>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-blue-100">
                        <span className="flex items-center gap-3">
                          <Icon className="w-5 h-5" />
                          {name}
                        </span>
                        {open ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Disclosure.Button>
                      <Disclosure.Panel className="ml-8 mt-1 space-y-1">
                        {children.map((child) => (
                          <NavLink
                            key={child.to}
                            to={child.to}
                            className={({ isActive }) =>
                              `block px-4 py-2 rounded-md transition ${
                                isActive ? "bg-blue-200" : "hover:bg-blue-100"
                              }`
                            }
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.name}
                          </NavLink>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ) : (
                <NavLink
                  key={name}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-blue-200 border-l-4 border-blue-500"
                        : "hover:bg-blue-100 pl-[0.9rem]"
                    }`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  {name}
                </NavLink>
              )
            )}
          </nav>

          {/* Logout */}
          <div className="px-4 py-4 border-t border-gray-200 flex-shrink-0">
            <button
              className="w-full flex items-center justify-center gap-2 bg-blue-100 py-2 rounded-lg font-semibold hover:bg-blue-200 transition"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
    </>
  );
}

export default HODSidebar;
