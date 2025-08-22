import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardList,
  Settings,
  LogOut,
  Building2,
  Library,
  Bus,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  CircleHelp,
  CalendarDays,
  FileText,
  UserCheck,
  UserCog, 
  Hotel,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const navItems = [
    {
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      children: [
        { label: 'Admin Dashboard', to: '/admin/dashboard' },
      ],
    },
    {
      label: 'VicePrincipal',
      icon: <UserCheck className="w-5 h-5" />,
      children: [
        { label: 'Add VicePrincipal', to: '/admin/add/viceprincipal' },
        { label: 'Viceprincipal List', to: '/admin/list/viceprincipal' },
      ],
    },
    {
      label: 'Teachers',
      icon: <Users className="w-5 h-5" />,
      children: [
        { label: 'Add Teacher', to: '/admin/add/teachers' },
        { label: 'Teacher List', to: '/admin/list/teachers' },
      ],
    },
    {
      label: 'Classes',
      icon: <Building2 className="w-5 h-5" />,
      children: [
        { label: 'Add Class', to: '/admin/createclass/' },
        { label: 'View Classes', to: '/admin/standardlist/' },
      ],
    },
    {
      label: 'Students',
      icon: <GraduationCap className="w-5 h-5" />,
      children: [
        { label: 'Add Student', to: '/admin/add/students' },
        { label: 'Student List', to: '/admin/list/students' },
      ],
    },
    {
      label: 'Subjects',
      icon: <BookOpen className="w-5 h-5" />,
      children: [
        { label: 'Create Subjects', to: '/admin/create/subject' },
        { label: 'Subject List', to: '/admin/list/subjects' },
        { label: 'Assign Subjects', to: '/subjects/assign' },
      ],
    },
    {
      label: 'Staffs',
      icon: <UserCog className="w-5 h-5" />,
      children: [
        { label: 'Add Staff', to: '/admin/add/staff' },
        { label: 'Staff List', to: '/admin/list/staffs' },
      ],
    },
    {
      label: 'Library',
      icon: <Library className="w-5 h-5" />,
      children: [
        { label: 'Add Book', to: '/admin/add/book' },
        { label: 'Book List', to: '/admin/list/books' },
      ],
    },
    {
      label: 'Transport',
      icon: <Bus className="w-5 h-5" />,
      children: [
        { label: 'Add Bus', to: '/admin/add/bus' },
        { label: 'Bus List', to: '/admin/list/bus' },
      ],
    },
    {
      label: 'Hostel',
      icon: <Hotel className="w-5 h-5" />,
      children: [
        { label: 'Add Hostel', to: '/admin/add/hostel' },
        { label: 'Hostel List', to: '/admin/list/hostel' },
      ],
    },
    { label: 'Attendance', to: '/attendance', icon: <ClipboardList className="w-5 h-5" /> },
    { label: 'Exams', to: '/exams', icon: <FileText className="w-5 h-5" /> },
    { label: 'Events', to: '/events', icon: <CalendarDays className="w-5 h-5" /> },
    { label: 'Settings', to: '/settings', icon: <Settings className="w-5 h-5" /> },
    { label: 'Help', to: '/help', icon: <CircleHelp className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-100 text-gray-900 shadow-lg flex flex-col">
        
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-4 text-2xl font-extrabold border-b border-gray-300">
            🏫 School Admin
          </div>
          <nav className="px-3 py-5 flex flex-col gap-2 text-sm font-medium">
            {navItems.map(({ label, to, icon, children }) => {
              const isOpen = openMenus[label] || false;

              if (children) {
                return (
                  <div key={label} className="flex flex-col">
                    <button
                      onClick={() => toggleMenu(label)}
                      className="flex items-center justify-between px-4 py-2.5 rounded-md hover:bg-gray-200 text-black"
                    >
                      <div className="flex items-center gap-3">
                        {icon}
                        <span>{label}</span>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                    {isOpen && (
                      <ul className="pl-12 list-disc list-inside flex flex-col gap-1 mt-1">
                        {children.map((child) => (
                          <li key={child.label}>
                            <NavLink
                              to={child.to}
                              className={({ isActive }) =>
                                `text-sm rounded-md px-2 py-1 transition ${
                                  isActive
                                    ? 'bg-gray-300 text-black font-semibold'
                                    : 'text-black hover:bg-gray-200'
                                }`
                              }
                            >
                              {child.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              }

              return (
                <NavLink
                  key={label}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-md transition-all ${
                      isActive
                        ? 'bg-gray-300 text-black font-semibold border-l-4 border-gray-500'
                        : 'text-black hover:bg-gray-200'
                    }`
                  }
                >
                  {icon}
                  <span>{label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sticky logout button */}
        <div className="px-4 py-4 border-t border-gray-300">
          <button className="w-full flex items-center justify-center gap-2 bg-gray-200 text-black py-2 rounded-lg font-semibold hover:bg-gray-300 transition">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-6">
        <h1 className="text-3xl font-bold">Welcome to School Admin</h1>
        <p className="mt-4 text-gray-700">
          This is your main content area. The sidebar stays fixed on the left and scrolls independently.
        </p>
      </main>
    </>
  );
};

export default Sidebar;
