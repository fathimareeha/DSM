
// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import {
//   LayoutDashboard,
//   Users,
//   BookOpen,
//   ClipboardList,
//   BarChart2,
//   Settings,
//   LogOut,
//   Building2,
//   FileText,
//   Library,
//   ChefHat,
//   Banknote,
//   Bus,
//   UserCog,
//   GraduationCap,
//   CalendarDays,
//   HeartPulse,
//   CircleHelp,
//   ChevronDown,
//   ChevronUp,
// } from 'lucide-react';
// import { Disclosure } from '@headlessui/react';

// const navItems = [
//   { name: 'Dashboard', icon: LayoutDashboard, to: '/admin/dash' },
//   {
//     name: 'Departments',
//     icon: Building2,
//     children: [
//       { name: 'Add Department', to: '/admin/departments/add' },
//       { name: 'View Departments', to: '/admin/department' },
//     ],
//   },
//   {
//     name: 'HOD & Faculty',
//     icon: Users,
//     children: [
//       { name: 'Add HOD', to: '/admin/hod/add' },
//       { name: 'Hod List', to: '/admin/hod' },
//       { name: 'Add Faculty', to: '/admin/faculty/add' },
//       { name: 'Faculty List', to: '/admin/faculty' },
//     ],
//   },
//   {
//     name: 'Students',
//     icon: GraduationCap,
//     children: [
//       { name: 'Add Student', to: '/admin/students/add' },
//       { name: 'View Students', to: '/admin/students' },
//     ],
//   },
//   {
//     name: 'Academic',
//     icon: BookOpen,
//     children: [
//       { name: 'Subject Allocation', to: '/academic/subjects' },
//       { name: 'Attendance', to: '/academic/attendance' },
//       { name: 'Marks', to: '/academic/marks' },
//       { name: 'Materials', to: '/academic/materials' },
//       { name: 'Feedback', to: '/academic/feedback' },
//     ],
//   },
//   {
//     name: 'Coordinators',
//     icon: UserCog,
//     children: [
//       { name: 'Exams', to: '/coordinators/exams' },
//       { name: 'Placements', to: '/coordinators/placements' },
//       { name: 'Events', to: '/coordinators/events' },
//       { name: 'Circulars', to: '/coordinators/circulars' },
//       { name: 'Lab', to: '/coordinators/labs' },
//       { name: 'Health', to: '/coordinators/health' },
//     ],
//   },
//   { name: 'Library', icon: Library, to: '/library' },
//   { name: 'Food', icon: ChefHat, to: '/food' },
//   { name: 'Finance', icon: Banknote, to: '/finance' },
//   { name: 'Transportation', icon: Bus, to: '/transport' },
//   { name: 'Reports', icon: BarChart2, to: '/reports' },
//   { name: 'Settings', icon: Settings, to: '/settings' },
// ];

// function Sidebar() {
//   return (
//     <aside className="w-64 sticky top-0 bg-white  shadow-md hidden md:flex flex-col justify-between border-r border-gray-200">
//       {/* Top Logo/Title */}
//       <div>
//         <div className="px-6 py-4 text-xl font-extrabold border-b  border-gray-200 tracking-wide ">
//           COET
//         </div>

//         {/* Navigation */}
//         <nav className="px-3 py-5 space-y-2 text-sm font-medium">
//           {navItems.map(({ name, icon: Icon, to, children }) =>
//             children ? (
//               <Disclosure as="div" key={name}>
//                 {({ open }) => (
//                   <>
//                     <Disclosure.Button className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-blue-100">
//                       <span className="flex items-center gap-3">
//                         <Icon className="w-5 h-5" />
//                         {name}
//                       </span>
//                       {open ? (
//                         <ChevronUp className="w-4 h-4" />
//                       ) : (
//                         <ChevronDown className="w-4 h-4" />
//                       )}
//                     </Disclosure.Button>
//                     <Disclosure.Panel className="ml-8 mt-1 space-y-1">
//                       {children.map((child) => (
//                         <NavLink
//                           to={child.to}
//                           key={child.name}
//                           className={({ isActive }) =>
//                             `block px-4 py-2 rounded-md transition ${
//                               isActive
//                                 ? 'bg-blue-200'
//                                 :  'hover:bg-blue-100'
//                             }`
//                           }
//                         >
//                           {child.name}
//                         </NavLink>
//                       ))}
//                     </Disclosure.Panel>
//                   </>
//                 )}
//               </Disclosure>
//             ) : (
//               <NavLink
//                 key={name}
//                 to={to}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
//                     isActive
//                       ? 'bg-blue-200 border-l-4 border-blue-500'
//                       : 'hover:bg-blue-100 pl-[0.9rem]'
//                   }`
//                 }
//               >
//                 <Icon className="w-5 h-5" />
//                 {name}
//               </NavLink>
//             )
//           )}
//         </nav>
//       </div>

//       {/* Bottom - Logout */}
//       <div className="px-4 py-4 border-t border-gray-200">
//         <button className="w-full flex items-center justify-center gap-2 bg-blue-100 py-2 rounded-lg font-semibold hover:bg-blue-200 transition">
//           <LogOut className="w-4 h-4" />
//           Logout
//         </button>
//       </div>
//     </aside>
//   );
// }

// export default Sidebar;



// import React, { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import axios from 'axios';
// import {
//   LayoutDashboard,
//   Users,
//   Library,
//   Bus,
//   UserCog,
//   GraduationCap,
//   ChevronDown,
//   ChevronUp,
//   LogOut,
//   Hotel
// } from 'lucide-react';
// import { Disclosure } from '@headlessui/react';

// const navItems = [
//   { name: 'Dashboard', to: '/admin/dash', icon: LayoutDashboard },
//   {
//     name: 'HOD & Faculty',
//     icon: Users,
//     children: [
//       { name: 'Add HOD', to: '/admin/hods/add' },
//       { name: 'Hod List', to: '/admin/hod' },
//       { name: 'Add Faculty', to: '/admin/faculty/add' },
//       { name: 'Faculty List', to: '/admin/facultys' },
//     ],
//   },
//   {
//     name: 'Students',
//     icon: GraduationCap,
//     children: [
//       { name: 'Add Student', to: '/admin/studentss/add' },
//       { name: 'View Students', to: '/admin/students' },
//     ],
//   },
//   {
//     name: 'Staffs',
//     icon: UserCog,
//     children: [
//       { name: 'Add Staffs', to: 'admin/staffs/add' },
//       { name: 'Staffs List', to: 'admin/staffs/list' },
//     ],
//   },
//   { 
//     name: 'Library', icon: Library,
//     children: [
//       { name: 'Add Books', to: 'admin/books/add' },
//       { name: 'Books List', to: 'admin/books/list' },
//     ],
//    },
//    { 
//     name: 'Hostel', icon: Hotel,
//     children: [
//       { name: 'Add Hostel', to: 'hostel/add' },
//       { name: 'Hostel List', to: 'hostel/list' },
//     ],
//    },
//    { 
//     name: 'Transport', icon: Bus,
//     children: [
//       { name: 'Add Bus', to: 'admin/bus/add' },
//       { name: 'Bus List', to: 'admin/bus/list' },
//       { name: 'Bus Stop List', to: 'admin/bus/stop/list' },
//       { name: 'Add Bus to Students', to: 'admin/bus/student/stop/add' },
//       { name: 'Student List', to: 'admin/bus/student/stop/list' },
//     ],
//    },
// ];

// function Sidebar() {
//   const [collegeName, setCollegeName] = useState('Loading...');

//   useEffect(() => {
//   const fetchCollegeName = async () => {
//     try {
//       const user = JSON.parse(localStorage.getItem('user'));
//       const institutionId = Number(user?.institution_id);
//       const token = user?.token; // make sure your token is saved in localStorage

//       if (!institutionId || !token) {
//         setCollegeName('Unknown');
//         return;
//       }

//       const res = await axios.get(
//         `http://127.0.0.1:8000/superadmin_app/create_college/${institutionId}`,
//         {
//           headers: {
//             Authorization: `Token ${token}`, // or 'Bearer ' if your backend expects Bearer
//           },
//         }
//       );

//       if (res.data) {
//         setCollegeName(res.data.college_name || 'Unknown');
//       } else {
//         setCollegeName('Unknown');
//       }
//     } catch (error) {
//       console.error('Failed to fetch college name:', error);
//       setCollegeName('Unknown');
//     }
//   };

//   fetchCollegeName();
// }, []);



//   return (
//     <aside className="w-64 sticky top-0 bg-white shadow-md hidden md:flex flex-col justify-between border-r border-gray-200">
//       {/* College Name on Top */}
//       <div>
//         <div className="px-6 py-4 text-xl font-extrabold border-b border-gray-200 tracking-wide">
//           {collegeName}
//         </div>

//         {/* Navigation Menu */}
//         <nav className="px-3 py-5 space-y-2 text-sm font-medium">
//           {navItems.map(({ name, icon: Icon, to, children }) =>
//             children ? (
//               <Disclosure as="div" key={name}>
//                 {({ open }) => (
//                   <>
//                     <Disclosure.Button className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-blue-100">
//                       <span className="flex items-center gap-3">
//                         <Icon className="w-5 h-5" />
//                         {name}
//                       </span>
//                       {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
//                     </Disclosure.Button>
//                     <Disclosure.Panel className="ml-8 mt-1 space-y-1">
//                       {children.map((child) => (
//                         <NavLink
//                           to={child.to}
//                           key={child.name}
//                           className={({ isActive }) =>
//                             `block px-4 py-2 rounded-md transition ${
//                               isActive ? 'bg-blue-200' : 'hover:bg-blue-100'
//                             }`
//                           }
//                         >
//                           {child.name}
//                         </NavLink>
//                       ))}
//                     </Disclosure.Panel>
//                   </>
//                 )}
//               </Disclosure>
//             ) : (
//               <NavLink
//                 key={name}
//                 to={to}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
//                     isActive
//                       ? 'bg-blue-200 border-l-4 border-blue-500'
//                       : 'hover:bg-blue-100 pl-[0.9rem]'
//                   }`
//                 }
//               >
//                 <Icon className="w-5 h-5" />
//                 {name}
//               </NavLink>
//             )
//           )}
//         </nav>
//       </div>

//       {/* Logout Button */}
//       <div className="px-4 py-4 border-t border-gray-200">
//         <button
//           className="w-full flex items-center justify-center gap-2 bg-blue-100 py-2 rounded-lg font-semibold hover:bg-blue-200 transition"
//           onClick={() => {
//             localStorage.clear();
//             window.location.href = '/'; // Redirect to login page
//           }}
//         >
//           <LogOut className="w-4 h-4" />
//           Logout
//         </button>
//       </div>
//     </aside>
//   );
// }

// export default Sidebar;



import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import {
  LayoutDashboard,
  Users,
  Library,
  Bus,
  UserCog,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  LogOut,
  Hotel,
  BookOpen,
} from 'lucide-react';
import { Disclosure } from '@headlessui/react';

const navItems = [
  { name: 'Dashboard', to: '/admin/dash', icon: LayoutDashboard },
  {
    name: 'Select courses & Departments',
    icon:  BookOpen,
    children: [
      { name: 'Select Courses', to: '/admin/addcourse' },
      // { name: 'Hod List', to: '/admin/hod' },
      // { name: 'Add Faculty', to: '/admin/faculty/add' },
      // { name: 'Faculty List', to: '/admin/facultys' },
    ],
  },

  {
    name: 'HOD & Faculty',
    icon: Users,
    children: [
      { name: 'Add HOD', to: '/admin/hods/add' },
      { name: 'Hod List', to: '/admin/hod' },
      { name: 'Add Faculty', to: '/admin/faculty/add' },
      { name: 'Faculty List', to: '/admin/facultys' },
    ],
  },
  {
    name: 'Students',
    icon: GraduationCap,
    children: [
      { name: 'Add Student', to: '/admin/studentss/add' },
      { name: 'View Students', to: '/admin/students' },
    ],
  },
  {
    name: 'Staffs',
    icon: UserCog,
    children: [
      { name: 'Add Staffs', to: '/admin/staffs/add' },
      { name: 'Staffs List', to: '/admin/staffs/list' },
    ],
  },
  {
    name: 'Library',
    icon: Library,
    children: [
      { name: 'Add Books', to: '/admin/books/add' },
      { name: 'Books List', to: '/admin/books/list' },
    ],
  },
  {
    name: 'Hostel',
    icon: Hotel,
    children: [
      { name: 'Add Hostel', to: '/admin/hostel/add' },
      { name: 'Hostel List', to: '/admin/hostel/list' },
    ],
  },
  {
    name: 'Transport',
    icon: Bus,
    children: [
      { name: 'Add Bus', to: '/admin/bus/add' },
      { name: 'Bus List', to: '/admin/bus/list' },
      { name: 'Bus Stop List', to: '/admin/bus/stop/list' },
      { name: 'Add Bus to Students', to: '/admin/bus/student/stop/add' },
      { name: 'Student List', to: '/admin/bus/student/stop/list' },
    ],
  },

  {
    name: 'Events',
    icon: Bus,
    children: [
      { name: 'Add Events', to: '/admin/events/create' },
      // { name: 'Bus List', to: '/admin/bus/list' },
      // { name: 'Bus Stop List', to: '/admin/bus/stop/list' },
      // { name: 'Add Bus to Students', to: '/admin/bus/student/stop/add' },
      // { name: 'Student List', to: '/admin/bus/student/stop/list' },
    ],
  },
];

function Sidebar() {
  const [collegeName, setCollegeName] = useState('Loading...');

useEffect(() => {
  const fetchCollegeName = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setCollegeName("Unknown");
        return;
      }

      const res = await axios.get(
        "http://127.0.0.1:8000/superadmin_app/user_college/",
        { headers: { Authorization: `Token ${token}` } }
      );

      setCollegeName(res.data?.college_name || "Unknown");
    } catch (error) {
      console.error("Failed to fetch college name:", error);
      setCollegeName("Unknown");
    }
  };

  fetchCollegeName();
}, []);

  return (
    <aside className="w-64 h-screen sticky top-0 bg-white shadow-md hidden md:flex flex-col border-r border-gray-200">
  <div className="px-6 py-5">
  <div className="flex items-center gap-3 bg-white border rounded-xl shadow-sm p-3">
    {/* College Logo */}
    <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg">
      <img 
        src="/college-logo.png"  // replace with your logo API or static path
        alt="College Logo"
        className="w-10 h-10 object-contain"
      />
    </div>

    {/* College Name */}
    <h2 className="text-lg font-semibold text-gray-800">
      {collegeName}
    </h2>
  </div>
</div>



  {/* Scrollable navigation menu */}
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
                {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Disclosure.Button>
              <Disclosure.Panel className="ml-8 mt-1 space-y-1">
                {children.map((child) => (
                  <NavLink
                    key={child.to || child.name}
                    to={child.to}
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded-md transition ${
                        isActive ? 'bg-blue-200' : 'hover:bg-blue-100'
                      }`
                    }
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
                ? 'bg-blue-200 border-l-4 border-blue-500'
                : 'hover:bg-blue-100 pl-[0.9rem]'
            }`
          }
        >
          <Icon className="w-5 h-5" />
          {name}
        </NavLink>
      )
    )}
  </nav>

  {/* Logout Button - Fixed at bottom */}
  <div className="px-4 py-4 border-t border-gray-200 flex-shrink-0">
    <button
      className="w-full flex items-center justify-center gap-2 bg-blue-100 py-2 rounded-lg font-semibold hover:bg-blue-200 transition"
      onClick={() => {
        localStorage.clear();
        window.location.href = '/';
      }}
    >
      <LogOut className="w-4 h-4" />
      Logout
    </button>
  </div>
</aside>

  );
}

export default Sidebar;
