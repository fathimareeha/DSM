import React, { useContext, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { SuperadminContext } from '../../../context/super_admin/Superadmin_Context'
import axios from 'axios'

function Table3() {
 
  
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const {institution_adminList,InstitutionAdminList}=useContext (SuperadminContext)

  

 const handleDelete = async (id) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/superadmin_app/delete_institutionadmin/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    InstitutionAdminList()
    alert("Deleted successfully");
  } catch (error) {
    console.error("Delete error:", error.response?.data || error.message);
  }
};

useEffect(()=>{
 InstitutionAdminList()
},[])





  
  return (
    <>
      <div className='overflow-x-auto'>
        <table class="min-w-full table-auto border border-gray-200 rounded-lg shadow-sm">
          <thead class="bg-white text-gray-700">
            <tr>
              <th class="px-4 py-2 text-left">Username</th>
              <th class="px-4 py-2 text-left">Email</th>
              <th class="px-4 py-2 text-left">Instution_id</th>
              
              
              <th class="px-4 py-2 text-left">Edit</th>
              <th class="px-4 py-2 text-left">Delete</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            {institution_adminList.map((institution_admin)=>
            <tr class="bg-gray-50 hover:bg-gray-100">
              <td class="px-4 py-2">{institution_admin.username}</td>
              <td class="px-4 py-2">{institution_admin.email}</td>
              <td class="px-4 py-2">{institution_admin.institution_id}</td>
            
              <td class="px-4 py-2">
                <Link class="text-red-500 hover:text-red-800" to={`/admin/edit_institution_form/${institution_admin.institution_id}`}>Edit</Link>
              </td>
              <td class="px-4 py-2">
                <button className='text-red-500  hover:text-red-800' onClick={()=>handleDelete(institution_admin.id)}>Remove</button>
              </td>
            </tr>
            )}
           

          </tbody>
        </table>

      </div>
    </>
  )
}

export default Table3