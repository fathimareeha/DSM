import React, { useContext } from 'react'
import { SuperadminContext } from '../../../context/super_admin/Superadmin_Context'

function ActiveTable() {
  const { activeList }=useContext(SuperadminContext);
  return (
    
    <>
      <div className='overflow-x-auto'>
        <table class="min-w-full table-auto border border-gray-200 rounded-lg shadow-sm">
          <thead class="bg-white text-gray-700">
            <tr>
              <th class="px-4 py-2 text-left">ID</th>
              <th class="px-4 py-2 text-left">Username</th>
              <th class="px-4 py-2 text-left">Email</th>
              <th class="px-4 py-2 text-left">Institution name</th>
              <th class="px-4 py-2 text-left">Type</th>
              <th class="px-4 py-2 text-left">Phone Number</th>

              <th class="px-4 py-2 text-left">Active</th>
              
            </tr>
          </thead>
          <tbody class="text-gray-700">
            {activeList.map((active)=>
            <tr class="bg-gray-50 hover:bg-gray-50">
              <td class="px-4 py-2">{active.registration_id}</td>
              <td class="px-4 py-2">{active.username}</td>
              <td class="px-4 py-2">{active.email}</td>
              <td class="px-4 py-2">{active.name}</td>
              <td class="px-4 py-2">{active.type}</td>
              <td class="px-4 py-2">{active.phone}</td>

              <td class="px-4 py-2  font-medium"><span className={active.is_active ? 'text-green-600' : 'text-red-600'}>
                        {active.is_active ? 'Active' : 'Inactive'}</span></td>
              
            </tr>
            )}

          </tbody>
        </table>

      </div>
    </>
  )
}

export default ActiveTable