import React, { useContext, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { SuperadminContext } from '../../../context/super_admin/Superadmin_Context'
import axios from 'axios'
import { Search_context } from '../../../context/super_admin/Search_context'

function Table3() {
 
  
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  
  const {filteredAdminInstitutionList,InstitutionAdminList}=useContext(Search_context)
console.log("filtered",filteredAdminInstitutionList);

  

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
              <th class="px-4 py-2 text-left">Type</th>
              <th class="px-4 py-2 text-left">Institution name</th>
              <th class="px-4 py-2 text-left">Registration Id</th>
              <th class="px-4 py-2 text-left">Edit</th>
              <th class="px-4 py-2 text-left">Delete</th>
              <th class="px-4 py-2 text-left">Detail</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
           {filteredAdminInstitutionList.map((admin) => {
         
  const school = admin.school;
  const college = admin.college;

  // Pick name from school > college > fallback
  const institutionName = school?.name || college?.name || "Not Registered";
  const registrationId =school?.registration_id || college?.registration_id ;
  return (
    <tr class="bg-gray-50 hover:bg-gray-100" key={admin.admin_id}>
      <td class="px-4 py-2">{admin.admin_username}</td>
      <td class="px-4 py-2">{admin.admin_email}</td>
      <td class="px-4 py-2">{admin.institution_id}</td>
      <td class="px-4 py-2">{admin.institution_type}</td>
      <td class="px-4 py-2">{institutionName}</td>
      <td class="px-4 py-2">{registrationId}</td>
      <td class="px-4 py-2">
        <Link class="text-red-500 hover:text-red-800" to={`/admin/edit_institution_form/${admin.institution_id}`}>Edit</Link>
      </td>
      <td class="px-4 py-2">
        <button className='text-red-500 hover:text-red-800' onClick={() => handleDelete(admin.admin_id)}>Remove</button>
      </td>
      <td className="px-4 py-2">
                  <button onClick={() => navigate(`/admin/details/${admin.institution_id}`)}>View</button>
                </td>
    </tr>
  );
})}


          </tbody>
        </table>

      </div>
    </>
  )
}

export default Table3