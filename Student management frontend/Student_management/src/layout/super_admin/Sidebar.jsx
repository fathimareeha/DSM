import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronUp, ChevronDown, ChevronRight } from 'lucide-react';
import { FaHome, FaUniversity, FaSchool, FaBuilding, FaUser } from 'react-icons/fa';

function Sidebar() {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);

  const SidebarItems = [
    {
      label: 'Dashboard',
      to: '/admin/dashboard',
      icon: <FaHome />,
    },
    {
      label: 'Institutions',
      icon: <FaUniversity />,
      dropdown: true,
      children: [
        { label:'All institutions', to:'/admin/institution_admin'},
        
        { label: 'School', to: '/admin/school', icon: <FaSchool /> },
        { label: 'College', to: '/admin/college', icon: <FaBuilding /> },
      ],
    },
     {
      label: 'Packages',
      to: '/admin/list_package',
      icon: <FaHome />,
    },
    {
      label: 'Staff',
      to: '/admin/list_staff',
      icon: <FaHome />,
    },
    {
      label: 'Courses',
      
      icon: <FaUser />,
      dropdown: true,
      children: [
        { label:'University', to:'/admin/university'},
        { label:'Course', to:'/admin/course'},
        
        { label: 'Department', to: '/admin/department', icon: <FaSchool /> },
        { label: 'Semester', to: '/admin/semester', icon: <FaBuilding /> },
        { label: 'Subjects', to: '/admin/subject', icon: <FaBuilding /> },

      ],
    },
  ];

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <div className="w-64 bg-[#052659] text-white h-full p-4 md:relative md:translate-x-0">
      <div className="text-3xl font-bold text-center mb-6">Dhanwis</div>
      <nav className="flex flex-col gap-3">
        {SidebarItems.map((item, index) => (
          <div key={index}>
            {!item.dropdown ? (
              <Link
                to={item.to}
                className={`flex items-center justify-between hover:bg-[#0a4a9d] p-3 rounded-lg shadow-sm cursor-pointer transition duration-200 ${
                  location.pathname === item.to ? 'bg-[#0a4a9d]' : ''
                }`}
              >
                <div className="flex items-center gap-3 text-orange-400">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-lg text-white">{item.label}</span>
                </div>
              </Link>
            ) : (
              <div>
                <div
                  onClick={() => toggleDropdown(index)}
                  className="flex items-center justify-between hover:bg-[#0a4a9d] p-3 rounded-lg shadow-sm cursor-pointer transition duration-200"
                >
                  <div className="flex items-center gap-3 text-orange-400">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-lg text-white">{item.label}</span>
                  </div>
                  <span>{openDropdown === index ? <ChevronDown /> : <ChevronRight />}</span>
                </div>
                {openDropdown === index && (
                  <div className="ml-4 mt-2 flex flex-col gap-1">
                    {item.children.map((child, idx) => (
                      <Link
                        key={idx}
                        to={child.to}
                        className={`flex items-center gap-2 px-4 py-2 border-blue-800 rounded-md hover:bg-blue-700 text-sm transition ${
                          location.pathname === child.to ? 'bg-blue-700' : ''
                        }`}
                      >
                        {child.icon && <span className="text-orange-400">{child.icon}</span>}
                        <span className="text-white">{child.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
