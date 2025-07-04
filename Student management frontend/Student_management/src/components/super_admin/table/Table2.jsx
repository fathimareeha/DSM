import React, { useContext } from 'react'
import { SuperadminContext } from '../../../context/super_admin/Superadmin_Context'

function Table2() {
  const { college_list }=useContext(SuperadminContext);
  return (
    
    <>
      <div className='overflow-x-auto'>
        <table class="min-w-full table-auto border border-gray-200 rounded-lg shadow-sm">
          <thead class="bg-white text-gray-700">
            <tr>
              <th class="px-4 py-2 text-left">ID</th>
              <th class="px-4 py-2 text-left">Name</th>
              <th class="px-4 py-2 text-left">Address</th>
              <th class="px-4 py-2 text-left">Pin code</th>
              <th class="px-4 py-2 text-left">Created Date</th>
              <th class="px-4 py-2 text-left">Phone Number</th>

              <th class="px-4 py-2 text-left">Active</th>
              <th class="px-4 py-2 text-left">Details</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            {college_list.map((college)=>
            <tr class="bg-gray-50 hover:bg-gray-50">
              <td class="px-4 py-2">{college.registration_id}</td>
              <td class="px-4 py-2">{college.college_name}</td>
              <td class="px-4 py-2">{college.address1}</td>
              <td class="px-4 py-2">{college.pin_code}</td>
              <td class="px-4 py-2">{college.created_date}</td>
              <td class="px-4 py-2">{college.phone_number}</td>

              <td class="px-4 py-2  font-medium"><span className={college.is_active ? 'text-green-600' : 'text-red-600'}>
                        {college.is_active ? 'Active' : 'Inactive'}</span></td>
              <td class="px-4 py-2">
                <button class="text-gray-500 hover:text-gray-700">View</button>
              </td>
            </tr>
            )}

          </tbody>
        </table>

      </div>
    </>
  )
}

export default Table2