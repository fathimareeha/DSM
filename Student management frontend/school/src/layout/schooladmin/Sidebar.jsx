
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
    { label: 'Dashboard', to: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    {
      label: 'VicePrincipal',
      icon: <UserCheck className="w-5 h-5" />,
      children: [
        { label: 'Add VicePrincipal', to: '/admin/add/viceprincipal' },
        { label: 'Viceprincipal List', to: '/admin/list/viceprincipal' },
      ]
    },
    {
      label: 'Teachers',
      icon: <Users className="w-5 h-5" />,
      children: [
        { label: 'Add Teacher', to: '/teachers/add' },
        { label: 'Teacher List', to: '/teachers' },
      ],
    },
    {
      label: 'Classes',
      icon: <Building2 className="w-5 h-5" />,
      children: [
        { label: 'Add Class', to: '/admin/classes/add' },
        { label: 'View Classes', to: '/admin/createclass' },
      ],
    },
    {
      label: 'Students',
      icon: <GraduationCap className="w-5 h-5" />,
      children: [
        { label: 'Add Student', to: '/addstudents' },
        { label: 'Student List', to: '/students' },
      ],
    },
    {
      label: 'Subjects',
      icon: <BookOpen className="w-5 h-5" />,
      children: [
        { label: 'Assign Subjects', to: '/subjects/assign' },
        { label: 'Subject List', to: '/subjects' },
      ],
    },
    { label: 'Attendance', to: '/attendance', icon: <ClipboardList className="w-5 h-5" /> },
    { label: 'Exams', to: '/exams', icon: <FileText className="w-5 h-5" /> },
    { label: 'Library', to: '/library', icon: <Library className="w-5 h-5" /> },
    { label: 'Transport', to: '/transport', icon: <Bus className="w-5 h-5" /> },
    { label: 'Events', to: '/events', icon: <CalendarDays className="w-5 h-5" /> },
    { label: 'Settings', to: '/settings', icon: <Settings className="w-5 h-5" /> },
    { label: 'Help', to: '/help', icon: <CircleHelp className="w-5 h-5" /> },
  ];
  
  return (
<aside className="w-64 sticky top-0 bg-gray-900 text-white shadow-lg flex flex-col justify-between">
      <div>
        <div className="px-6 py-4 text-2xl font-extrabold border-b border-indigo-700">
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
                    className="flex items-center justify-between px-4 py-2.5 rounded-md hover:bg-blue-700 text-sky-50"
                  >
                    <div className="flex items-center gap-3">
                      {icon}
                      <span>{label}</span>
                    </div>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {isOpen && (
                    <div className="pl-12 flex flex-col gap-1 mt-1">
                      {children.map((child) => (
                        <NavLink
                          key={child.label}
                          to={child.to}
                          className={({ isActive }) =>
                            `text-sm rounded-md px-2 py-1 transition ${
                              isActive
                                ? 'bg-blue-700 text-white'
                                : 'text-blue-200 hover:bg-blue-700'
                            }`
                          }
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
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
                      ? 'bg-blue-700 text-white shadow-inner border-l-4 border-white'
                      : 'hover:bg-blue-700 text-blue-200'
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

      <div className="px-4 py-4 border-t border-indigo-700">
        <button className="w-full flex items-center justify-center gap-2 bg-white text-indigo-900 py-2 rounded-lg font-semibold hover:bg-indigo-100 transition">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;