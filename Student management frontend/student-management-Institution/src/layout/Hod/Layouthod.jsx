// import React from 'react'
// import Headerhod from './Headerhod'
// import Sidebarhod from './Sidebarhod'
// import { Outlet } from 'react-router-dom'

// function Layouthod() {
//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Header */}
//       <Headerhod />

//       {/* Main content with Sidebar and page content */}
//       <div className="flex flex-1">
//         {/* Sidebar (typically hidden on small screens, shown on md+) */}
//         <Sidebarhod />

//         {/* Main content area */}
//         <main className="flex-1 p-4 bg-gray-100">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   )
// }

// export default Layouthod



import React, { useState } from "react";
import Headerhod from "./Headerhod";
import Sidebarhod from "./Sidebarhod";
import { Outlet } from "react-router-dom";

export default function Layouthod() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => setMobileOpen(!mobileOpen);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebarhod mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-64">
        {/* Header */}
        <Headerhod toggleSidebar={toggleSidebar} />

        {/* Page content */}
        <main className="flex-1 bg-gray-100 pt-16 p-4 md:p-16 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
