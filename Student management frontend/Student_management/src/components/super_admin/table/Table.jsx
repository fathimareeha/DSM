import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { SuperadminContext } from '../../../context/super_admin/Superadmin_Context'

function Table() {
  const navigate = useNavigate()
  const {institutions_list}=useContext (SuperadminContext)

  const handleSubmit = () => {
    navigate('/admin/institutions/details')
  }
  return (
    <>
      <div className='overflow-x-auto'>
        <table class="min-w-full table-auto border border-gray-200 rounded-lg shadow-sm">
          <thead class="bg-white text-gray-700">
            <tr>
              <th class="px-4 py-2 text-left">Registration id</th>
              <th class="px-4 py-2 text-left">User name</th>
              <th class="px-4 py-2 text-left">Email</th>
              <th class="px-4 py-2 text-left">Type</th>
              <th class="px-4 py-2 text-left">Institution Name</th>
              <th class="px-4 py-2 text-left">Active</th>
              
              <th class="px-4 py-2 text-left">Details</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            {institutions_list.map((institutions)=>
            <tr class="bg-gray-50 hover:bg-gray-100">
              <td class="px-4 py-2">{institutions.registration_id}</td>
              <td class="px-4 py-2">{institutions.username}</td>
              <td class="px-4 py-2">{institutions.email}</td>
              <td class="px-4 py-2">{institutions.type}</td>
              <td class="px-4 py-2">{institutions.name}</td>
              <td class="px-4 py-2">{institutions.is_active?'active':'inactive'}</td>
              
              
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

export default Table