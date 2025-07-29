import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { SuperadminContext } from '../../../context/super_admin/Superadmin_Context';
import { useNavigate } from 'react-router-dom';
import { Search_context } from '../../../context/super_admin/Search_context';

function Table1() {
  const navigate=useNavigate()
 const { filteredSchoolList } = useContext(Search_context);


  return (
    <>
      <div className='overflow-x-auto'>
        <table class="min-w-full table-auto border border-gray-200 rounded-lg shadow-sm">
          <thead class="bg-white text-gray-700">
            <tr>
              <th class="px-4 py-2 text-left">ID</th>
              <th class="px-4 py-2 text-left">Name</th>
              <th class="px-4 py-2 text-left">Address</th>
              <th class="px-4 py-2 text-left">Pincode</th>
              <th class="px-4 py-2 text-left">Created Date</th>
              <th class="px-4 py-2 text-left">Phone number</th>

              <th class="px-4 py-2 text-left">Active</th>
              <th class="px-4 py-2 text-left">Details</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            {filteredSchoolList .map((school)=>(
            <tr key={school.id} class="bg-gray-50 hover:bg-gray-100">
              <td class="px-4 py-2">{school.registration_id}</td>
              <td class="px-4 py-2">{school.school_name}</td>
              <td class="px-4 py-2">{school.address1}</td>
              <td class="px-4 py-2">{school.pin_code}</td>
              <td class="px-4 py-2">{school.created_date}</td>
              <td class="px-4 py-2">{school.phone_number}</td>

              <td class="px-4 py-2  font-medium"><span className={school.is_active ? 'text-green-600' : 'text-red-600'}>
                        {school.is_active ? 'Active' : 'Inactive'}</span>
                            </td>
              <td class="px-4 py-2">
                <button onClick={() => navigate(`/admin/school_details/${school.instution_obj}`)}>View</button>
              </td>
            </tr>

                ))}
          </tbody>
        </table>

      </div>
    </>
  )
}

export default Table1