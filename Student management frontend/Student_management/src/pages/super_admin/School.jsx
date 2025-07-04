import React from 'react'
import Table1 from '../../components/super_admin/table/Table1'
import Breadcrumbs from '../../components/super_admin/Breadcrumbs'

function School() {
  return (
    <div>
      <Breadcrumbs/>
        <div className='mt-3 bg-white p-6 space-y-6 rounded'>
        <h1 className='text-2xl'>Schools</h1>
        <div class="flex ">
        <input type="text" placeholder="Search..." class="w-full px-4 py-3 rounded focus:outline-none focus:ring-2 bg-gray-100 focus:ring-blue-500"/>
        <button className='bg-blue-900 py-3 px-6 text-white rounded'>Search</button>
      </div>
        <Table1/>
      </div>
    </div>
  )
}

export default School