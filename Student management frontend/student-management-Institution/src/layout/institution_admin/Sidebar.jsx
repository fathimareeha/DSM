




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
//   { name: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
//   {
//     name: 'Departments',
//     icon: Building2,
//     children: [
//       { name: 'Add Department', to: '/departments/add' },
//       { name: 'View Departments', to: '/departments' },
//     ],
//   },
//   {
//     name: 'HOD & Faculty',
//     icon: Users,
//     children: [
//       { name: 'Add HOD', to: '/hod/add' },
//       { name: 'Hod List', to: '/hod' },
//       { name: 'Add Faculty', to: '/faculty/add' },
//       { name: 'Faculty List', to: '/faculty' },

      
//     ],
//   },
//   {
//     name: 'Students',
//     icon: GraduationCap,
//     children: [
//       { name: 'Add Student', to: '/students/add' },
//       { name: 'View Students', to: '/students' },
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
//     <aside className="w-64  sticky top-0 bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-900 text-white shadow-xl hidden md:flex flex-col justify-between backdrop-blur-lg bg-opacity-90 border-r border-indigo-700">
//       {/* Top Logo/Title */}
//       <div>
//         <div className="px-6 py-4 text-2xl font-extrabold border-b border-indigo-700 tracking-wide">
//           🎓 College Admin
//         </div>

//         {/* Navigation */}
//         <nav className="px-3 py-5 space-y-2 text-sm font-medium">
//           {navItems.map(({ name, icon: Icon, to, children }) =>
//             children ? (
//               <Disclosure key={name}>
//                 {({ open }) => (
//                   <>
//                     <Disclosure.Button className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-blue-700 text-blue-200">
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
//                                 ? 'bg-blue-700 text-white'
//                                 : 'text-blue-200 hover:bg-blue-700'
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
//                       ? 'bg-blue-700 text-white shadow-inner border-l-4 border-white'
//                       : 'hover:bg-blue-700 hover:text-white text-blue-200 pl-[0.9rem]'
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
//       <div className="px-4 py-4 border-t border-indigo-700">
//         <button className="w-full flex items-center justify-center gap-2 bg-white text-indigo-900 py-2 rounded-lg font-semibold hover:bg-indigo-100 transition">
//           <LogOut className="w-4 h-4" />
//           Logout
//         </button>
//       </div>
//     </aside>
//   );
// }

// export default Sidebar;


import React from 'react';
import { NavLink } from 'react-router-dom';
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
  CalendarDays,
  HeartPulse,
  CircleHelp,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Disclosure } from '@headlessui/react';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, to: '/admin/dash' },
  {
    name: 'Departments',
    icon: Building2,
    children: [
      { name: 'Add Department', to: '/admin/departments/add' },
      { name: 'View Departments', to: '/admin/department' },
    ],
  },
  {
    name: 'HOD & Faculty',
    icon: Users,
    children: [
      { name: 'Add HOD', to: '/admin/hod/add' },
      { name: 'Hod List', to: '/admin/hod' },
      { name: 'Add Faculty', to: '/admin/faculty/add' },
      { name: 'Faculty List', to: '/admin/faculty' },
    ],
  },
  {
    name: 'Students',
    icon: GraduationCap,
    children: [
      { name: 'Add Student', to: '/admin/students/add' },
      { name: 'View Students', to: '/admin/students' },
    ],
  },
  {
    name: 'Academic',
    icon: BookOpen,
    children: [
      { name: 'Subject Allocation', to: '/academic/subjects' },
      { name: 'Attendance', to: '/academic/attendance' },
      { name: 'Marks', to: '/academic/marks' },
      { name: 'Materials', to: '/academic/materials' },
      { name: 'Feedback', to: '/academic/feedback' },
    ],
  },
  {
    name: 'Coordinators',
    icon: UserCog,
    children: [
      { name: 'Exams', to: '/coordinators/exams' },
      { name: 'Placements', to: '/coordinators/placements' },
      { name: 'Events', to: '/coordinators/events' },
      { name: 'Circulars', to: '/coordinators/circulars' },
      { name: 'Lab', to: '/coordinators/labs' },
      { name: 'Health', to: '/coordinators/health' },
    ],
  },
  { name: 'Library', icon: Library, to: '/library' },
  { name: 'Food', icon: ChefHat, to: '/food' },
  { name: 'Finance', icon: Banknote, to: '/finance' },
  { name: 'Transportation', icon: Bus, to: '/transport' },
  { name: 'Reports', icon: BarChart2, to: '/reports' },
  { name: 'Settings', icon: Settings, to: '/settings' },
];

function Sidebar() {
  return (
    <aside className="w-64 sticky top-0 bg-white text-blue-800 shadow-md hidden md:flex flex-col justify-between border-r border-gray-200">
      {/* Top Logo/Title */}
      <div>
        <div className="px-6 py-4 text-2xl font-extrabold border-b border-gray-200 tracking-wide text-blue-700">
          🎓 College Admin
        </div>

        {/* Navigation */}
        <nav className="px-3 py-5 space-y-2 text-sm font-medium">
          {navItems.map(({ name, icon: Icon, to, children }) =>
            children ? (
              <Disclosure key={name}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-blue-100 text-blue-700">
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
                          to={child.to}
                          key={child.name}
                          className={({ isActive }) =>
                            `block px-4 py-2 rounded-md transition ${
                              isActive
                                ? 'bg-blue-200 text-blue-900'
                                : 'text-blue-600 hover:bg-blue-100'
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
                      ? 'bg-blue-200 text-blue-900 border-l-4 border-blue-500'
                      : 'hover:bg-blue-100 text-blue-600 pl-[0.9rem]'
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

      {/* Bottom - Logout */}
      <div className="px-4 py-4 border-t border-gray-200">
        <button className="w-full flex items-center justify-center gap-2 bg-blue-100 text-blue-800 py-2 rounded-lg font-semibold hover:bg-blue-200 transition">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;





