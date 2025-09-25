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
//   Hotel,
//   BookOpen,
// } from 'lucide-react';
// import { Disclosure } from '@headlessui/react';

// const navItems = [
//   { name: 'Dashboard', to: '/admin/dash', icon: LayoutDashboard },
//   { name: 'Select courses & Departments', icon: BookOpen, children: [{ name: 'Select Courses', to: '/admin/addcourse' }] },
//   { name: 'HOD & Faculty', icon: Users, children: [{ name: 'Add HOD', to: '/admin/hods/add' }, { name: 'Hod List', to: '/admin/hod' }, { name: 'Add Faculty', to: '/admin/faculty/add' }, { name: 'Faculty List', to: '/admin/facultys' }] },
//   { name: 'Students', icon: GraduationCap, children: [{ name: 'Add Student', to: '/admin/studentss/add' }, { name: 'View Students', to: '/admin/students' }] },
//   { name: 'Staffs', icon: UserCog, children: [{ name: 'Add Staffs', to: '/admin/staffs/add' }, { name: 'Staffs List', to: '/admin/staffs/list' }] },
//   { name: 'Library', icon: Library, children: [{ name: 'Add Books', to: '/admin/books/add' }, { name: 'Books List', to: '/admin/books/list' }] },
//   { name: 'Hostel', icon: Hotel, children: [{ name: 'Add Hostel', to: '/admin/hostel/add' }, { name: 'Hostel List', to: '/admin/hostel/list' }] },
//   { name: 'Transport', icon: Bus, children: [{ name: 'Add Bus', to: '/admin/bus/add' }, { name: 'Bus List', to: '/admin/bus/list' }, { name: 'Bus Stop List', to: '/admin/bus/stop/list' }, { name: 'Add Bus to Students', to: '/admin/bus/student/stop/add' }, { name: 'Student List', to: '/admin/bus/student/stop/list' }] },
//   { name: 'Events', icon: Bus, children: [{ name: 'Add Events', to: '/admin/events/create' }] },
// ];

// function Sidebar({ mobileOpen, setMobileOpen }) {
//   const [collegeName, setCollegeName] = useState('Loading...');
//   const [collegeLogo, setCollegeLogo] = useState(null);

//   useEffect(() => {
//     const fetchCollegeName = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return;

//         const res = await axios.get(
//           "http://127.0.0.1:8000/superadmin_app/user_college/",
//           { headers: { Authorization: `Token ${token}` } }
//         );

//         setCollegeName(res.data?.college_name || "Unknown");
//         setCollegeLogo(res.data?.logo || null);
//       } catch (error) {
//         setCollegeName("Unknown");
//         setCollegeLogo(null);
//       }
//     };

//     fetchCollegeName();
//   }, []);

//   return (
//     <>
//       {/* Sidebar */}
//       <aside className={`fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-white to-gray-50 shadow-lg border-r border-gray-200 transform transition-transform z-50
//         ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative`}>
        
//         {/* College Header */}
//         <div className="px-6 py-6 border-b border-gray-100">
//           <div className="flex items-center gap-5 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl shadow p-5">
//             <div className="w-20 h-20 flex items-center justify-center bg-white rounded-full border border-indigo-200 shadow-md overflow-hidden">
//               {collegeLogo ? (
//                 <img src={collegeLogo} alt="College Logo" className="w-full h-full object-cover rounded-full" />
//               ) : (
//                 <span className="text-xs text-gray-400">No Logo</span>
//               )}
//             </div>
//             <div className="flex flex-col">
//               <h2 className="text-lg font-semibold text-gray-800">{collegeName || 'College Name'}</h2>
//             </div>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 px-3 py-5 space-y-2 text-sm font-medium overflow-y-auto">
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
//                           key={child.to || child.name}
//                           to={child.to}
//                           className={({ isActive }) =>
//                             `block px-4 py-2 rounded-md transition ${isActive ? 'bg-blue-200' : 'hover:bg-blue-100'}`
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
//                   `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-blue-200 border-l-4 border-blue-500' : 'hover:bg-blue-100 pl-[0.9rem]'}`
//                 }
//               >
//                 <Icon className="w-5 h-5" />
//                 {name}
//               </NavLink>
//             )
//           )}
//         </nav>

//         {/* Logout */}
//         <div className="px-4 py-4 border-t border-gray-200 flex-shrink-0">
//           <button
//             className="w-full flex items-center justify-center gap-2 bg-blue-100 py-2 rounded-lg font-semibold hover:bg-blue-200 transition"
//             onClick={() => {
//               localStorage.clear();
//               window.location.href = '/';
//             }}
//           >
//             <LogOut className="w-4 h-4" />
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Overlay for mobile */}
//       {mobileOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
//           onClick={() => setMobileOpen(false)}
//         ></div>
//       )}
//     </>
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
  CalendarCheck,
  ArrowRight
} from 'lucide-react';
import { Disclosure } from '@headlessui/react';

const navItems = [
  { name: 'Dashboard', to: '/admin/dash', icon: LayoutDashboard },
  {
    name: 'Select courses & Departments',
    icon: BookOpen,
    children: [{ name: 'Select Courses', to: '/admin/addcourse' }],
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
    { name: 'Students', icon: GraduationCap, children: [{ name: 'Add Student', to: '/admin/studentss/add' }, { name: 'View Students', to: '/admin/students' }] },
  { name: 'Staffs', icon: UserCog, children: [{ name: 'Add Staffs', to: '/admin/staffs/add' }, { name: 'Staffs List', to: '/admin/staffs/list' }] },
  { name: 'Library', icon: Library, children: [{ name: 'Add Books', to: '/admin/books/add' }, { name: 'Books List', to: '/admin/books/list' }] },
  { name: 'Hostel', icon: Hotel, children: [{ name: 'Add Hostel', to: '/admin/hostel/add' }, { name: 'Hostel List', to: '/admin/hostel/list' }] },
  { name: 'Transport', icon: Bus, children: [{ name: 'Add Bus', to: '/admin/bus/add' }, { name: 'Bus List', to: '/admin/bus/list' }, { name: 'Bus Stop List', to: '/admin/bus/stop/list' }, { name: 'Add Bus to Students', to: '/admin/bus/student/stop/add' }, { name: 'Student List', to: '/admin/bus/student/stop/list' }] },
  { name: 'Events', icon: ArrowRight, children: [{ name: 'Add Events', to: '/admin/events/create' },{name:'Events List', to: '/admin/event'}]
 },



{
  name: 'Attendance',
  icon: CalendarCheck, // or CalendarCheck from lucide-react if you want
  children: [
    { name: 'HOD Attendance', to: '/admin/hod-attendance' },
    { name: 'Faculty Attendance', to: '/admin/faculty/attendance' },
    { name: 'Student Attendance', to: '/admin/student/attendance' },
  ],
}
];

function Sidebar({ mobileOpen, setMobileOpen }) {
  const [collegeName, setCollegeName] = useState('Loading...');
  const [collegeLogo, setCollegeLogo] = useState(null);

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
        setCollegeLogo(res.data?.logo || null);
      } catch (error) {
        console.error("Failed to fetch college name:", error);
        setCollegeName("Unknown");
        setCollegeLogo(null);
      }
    };

    fetchCollegeName();
  }, []);

  return (
    <>
      {/* Sidebar */}
      <aside
  className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-white to-gray-50 shadow-lg w-64 z-50 transform transition-transform md:translate-x-0 ${
    mobileOpen ? 'translate-x-0' : '-translate-x-full'
  }`}
>
  {/* Wrap header + nav + logout in a flex-col container with overflow */}
  <div className="flex flex-col h-full">
    {/* College Header */}
    <div className="px-6 py-6 border-b border-gray-100 flex-shrink-0">
      <div className="flex items-center gap-5 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl shadow p-5">
        <div className="w-20 h-20 flex items-center justify-center bg-white rounded-full border border-indigo-200 shadow-md overflow-hidden">
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
          <h2 className="text-lg font-semibold text-gray-800">{collegeName}</h2>
        </div>
      </div>
    </div>

    {/* Navigation - scrollable */}
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
                  ? 'bg-blue-200 border-l-4 border-blue-500'
                  : 'hover:bg-blue-100 pl-[0.9rem]'
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

    {/* Logout - always at bottom */}
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

export default Sidebar;
