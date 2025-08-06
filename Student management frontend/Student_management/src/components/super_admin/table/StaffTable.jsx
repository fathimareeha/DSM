import React, { useContext } from 'react'
import { SuperadminContext } from '../../../context/super_admin/Superadmin_Context'

function StaffTable() {

    const {staffList,handleDeleteStaff}=useContext(SuperadminContext)
  return (
    <>
      <div className='overflow-x-auto'>
        <table className="min-w-full table-auto border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-white text-gray-700">
            <tr>
             
              <th className="px-4 py-2 text-left">User name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Staff role</th>
              
               <th className="px-4 py-2 text-left">Delete</th>
              <th className="px-4 py-2 text-left">Details</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {staffList.map((staffs)=>
            
           
             
            <tr className="bg-gray-50 hover:bg-gray-100">
              
              <td className="px-4 py-2">{staffs.username}</td>
              <td className="px-4 py-2">{staffs.email}</td>
              <td className="px-4 py-2">{staffs.staff_role}</td>
               <td className="px-4 py-2">
                  <button
                    onClick={() => handleDeleteStaff(staffs.id)}
                    className=" text-red-500    hover:text-red-600"
                  >
                    Delete
                  </button>
                </td>
             
              
              <td className="px-4 py-2">
                <button>View</button>
              </td>
            </tr>
)}
           

          </tbody>
        </table>

      </div>
    </>
  )
}

export default StaffTable