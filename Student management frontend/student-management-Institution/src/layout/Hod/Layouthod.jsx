import React from 'react'
import Headerhod from './Headerhod'
import Sidebarhod from './Sidebarhod'
import { Outlet } from 'react-router-dom'

function Layouthod() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Headerhod />

      {/* Main content with Sidebar and page content */}
      <div className="flex flex-1">
        {/* Sidebar (typically hidden on small screens, shown on md+) */}
        <Sidebarhod />

        {/* Main content area */}
        <main className="flex-1 p-4 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layouthod