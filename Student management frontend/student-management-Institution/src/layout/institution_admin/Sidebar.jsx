
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



import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardList,
  BarChart2,
  Settings,
  LogOut,
  Building2,
  FileText,
  Library,
  ChefHat,
  Banknote,
  Bus,
  UserCog,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Hotel
} from 'lucide-react';
import { Disclosure } from '@headlessui/react';

const navItems = [
  {
    name: 'Dashboard', to: '/admin/dash',
    icon: LayoutDashboard,
    

  },
  
  {
    name: 'HOD & Faculty',
    icon: Users,
    children: [
      { name: 'Add HOD', to: '/admin/hods/add' },
      { name: 'Hod List', to: '/admin/hod' },
      { name: 'Add Faculty', to: '/admin/faculty/add' },
      { name: ' Faculty List ', to: '/admin/facultys' },
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
  // {
  //   name: 'Academic',
  //   icon: BookOpen,
  //   children: [
  //     { name: 'Subject Allocation', to: '/academic/subjects' },
  //     { name: 'Attendance', to: '/academic/attendance' },
  //     { name: 'Marks', to: '/academic/marks' },
  //     { name: 'Materials', to: '/academic/materials' },
  //     { name: 'Feedback', to: '/academic/feedback' },
  //   ],
  // },
  {
    name: 'Staffs',
    icon: UserCog,
    children: [
      { name: 'Add Staffs', to: 'admin/staffs/add' },
      { name: 'Staffs List', to: 'admin/staffs/list' },
    //   // { name: 'Events', to: '/coordinators/events' },
    //   // { name: 'Circulars', to: '/coordinators/circulars' },
    //   // { name: 'Lab', to: '/coordinators/labs' },
    //   // { name: 'Health', to: '/coordinators/health' },
    ],
  },
  { 
    name: 'Library', icon: Library, to: '/library',
    children: [
      { name: 'Add Books', to: 'admin/books/add' },
      { name: 'Books List', to: 'admin/books/list' },,
    ],
   },

   { 
    name: 'Hostel', icon: Hotel, to: '/library',
    children: [
      { name: 'Add Hostel', to: 'hostel/add' },
      { name: 'Hostel List', to: 'hostel/list' },,
    ],
   },
   { 
    name: 'Transport', icon: Bus, to: '/library',
    children: [
      { name: 'Add Bus', to: 'admin/bus/add' },
      { name: 'Bus List', to: 'admin/bus/list' },,
    ],
   },

  // { name: 'Food', icon: ChefHat, to: '/food' },
  // { name: 'Finance', icon: Banknote, to: '/finance' },
  // { name: 'Transportation', icon: Bus, to: '/transport' },
  // { name: 'Reports', icon: BarChart2, to: '/reports' },
  // { name: 'Settings', icon: Settings, to: '/settings' },
];

function Sidebar() {
  const [collegeName, setCollegeName] = useState('Loading...');

  useEffect(() => {
    const fetchCollegeName = async () => {
      try {
        const institutionData = JSON.parse(localStorage.getItem('institution_obj'));
        const institutionId = institutionData?.id;

        if (!institutionId) {
          setCollegeName('Unknown');
          return;
        }

        const res = await axios.get(`http://127.0.0.1:8000/superadmin_app/create_college/${institutionId}`);
        setCollegeName(res.data.college_name || 'Unknown');
      } catch (error) {
        console.error('Failed to fetch college name:', error);
        setCollegeName('Unknown');
      }
    };

    fetchCollegeName();
  }, []);

  return (
    <aside className="w-64 sticky top-0 bg-white shadow-md hidden md:flex flex-col justify-between border-r border-gray-200">
      {/* College Name on Top */}
      <div>
        <div className="px-6 py-4 text-xl font-extrabold border-b border-gray-200 tracking-wide">
          {collegeName}
        </div>

        {/* Navigation Menu */}
        <nav className="px-3 py-5 space-y-2 text-sm font-medium">
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
                          to={child.to}
                          key={child.name}
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
      </div>

      {/* Logout Button */}
      <div className="px-4 py-4 border-t border-gray-200">
        <button
          className="w-full flex items-center justify-center gap-2 bg-blue-100 py-2 rounded-lg font-semibold hover:bg-blue-200 transition"
          onClick={() => {
            localStorage.clear();
            window.location.href = '/'; // Redirect to login page
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
