import React, { useContext, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { SuperadminContext } from '../../../context/super_admin/Superadmin_Context'
import axios from 'axios'
import { Search_context } from '../../../context/super_admin/Search_context'

function Table3() {
 
  
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  
  const {
    filteredAdminInstitutionList,
    searchAdminInstitution,
    setSearchAdminInstitution,
    dstrctFilter,
    setDstrctFilter,
    selectedUniversity,
    setSelectedUniversity,
    InstitutionAdminList,
    universities
  } = useContext(Search_context);
console.log("filtered",filteredAdminInstitutionList);

const toggleActivation = async (institutionId, type) => {
  try {
    const url = `http://127.0.0.1:8000/superadmin_app/toggle-activation/${type}/${institutionId}/`;

    const response = await axios.post(url, {}, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    const updatedData = response.data;

    // Update the filteredAdminInstitutionList locally
    const updatedList = filteredAdminInstitutionList.map((admin) => {
      if (admin.institution_id === institutionId) {
        const updatedInstitution = type === 'school'
          ? { ...admin.school, is_active: updatedData.is_active }
          : { ...admin.college, is_active: updatedData.is_active };

        return {
          ...admin,
          [type]: updatedInstitution
        };
      }
      return admin;
    });

    // If Search_context provides a way to update list, use it here
    // Otherwise you may need to lift this state up or manage locally

    alert("Status toggled successfully!");
    InstitutionAdminList(); // Still refresh to ensure consistency
  } catch (error) {
    console.error("Toggle failed:", error.response?.data || error.message);
    alert("Failed to toggle activation status.");
  }
};



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
    <div className="flex gap-4 mb-4">
    

      <input
        type="text"
        placeholder="Filter by district"
        value={dstrctFilter}
        onChange={e => setDstrctFilter(e.target.value)}
        className="border px-2 py-1 rounded"
      />

       <select
  value={selectedUniversity}
  onChange={(e) => setSelectedUniversity(e.target.value)}
  className="border px-2 py-1 rounded"
>
  <option value="">All Universities</option>
  {universities.map((u) => (
    <option key={u.id} value={u.id}>
      {u.name}
    </option>
  ))}
</select>

    </div>
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
              <th class="px-4 py-2 text-left">Active</th>
              <th class="px-4 py-2 text-left">Action</th>
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
  const isActive = school?.is_active ?? college?.is_active ?? false;
  return (
    <tr class="bg-gray-50 hover:bg-gray-100" key={admin.admin_id}>
      <td class="px-4 py-2">{admin.admin_username}</td>
      <td class="px-4 py-2">{admin.admin_email}</td>
      <td class="px-4 py-2">{admin.institution_id}</td>
      <td class="px-4 py-2">{admin.institution_type}</td>
      <td class="px-4 py-2">{institutionName}</td>
      <td class="px-4 py-2">{registrationId}</td>
      <td className="px-4 py-2">
        <span className={isActive ? 'text-green-600' : 'text-red-600'}>
          {isActive ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td className="px-4 py-2">
  <button
    onClick={() => toggleActivation(admin.institution_id, admin.institution_type.toLowerCase())}
    className={`px-3 py-1 rounded-md text-white text-sm font-semibold ${
      isActive ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
    }`}
  >
    {isActive ? 'Deactivate' : 'Activate'}
  </button>
</td>


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


// import React, { useContext, useEffect } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { Search_context } from '../../../context/super_admin/Search_context'
// import axios from 'axios'

// function Table3() {
//   const token = localStorage.getItem('token')
//   const navigate = useNavigate()

//   const {
//     institution_adminList,
//     setInstitution_adminList,
//     searchAdminInstitution,
//     setSearchAdminInstitution,
//     universitySearch,
//     setUniversitySearch,
//     InstitutionAdminList,
//   } = useContext(Search_context)

//   // Extract unique universities from data for dropdown
//   const universities = Array.from(
//     new Set(
//       institution_adminList
//         .map((inst) => inst.college?.university?.name)
//         .filter(Boolean)
//     )
//   )

//   const filteredAdminInstitutionList = institution_adminList.filter((institution) => {
//     const institutionName =
//       (institution.school?.name || institution.college?.name || '').toLowerCase()
//     const institutionNameMatch = institutionName.includes(searchAdminInstitution.trim().toLowerCase())

//     const universityName = (institution.college?.university?.name || '').toLowerCase()
//     const universityNameMatch = universitySearch ? universityName === universitySearch.toLowerCase() : true

//     return institutionNameMatch && universityNameMatch
//   })

//   const toggleActivation = async (institutionId, type) => {
//     try {
//       const url = `http://127.0.0.1:8000/superadmin_app/toggle-activation/${type}/${institutionId}/`
//       const response = await axios.post(
//         url,
//         {},
//         { headers: { Authorization: `Token ${token}` } }
//       )

//       const updatedData = response.data

//       const updatedList = institution_adminList.map((admin) => {
//         if (admin.institution_id === institutionId) {
//           const updatedInstitution =
//             type === 'school'
//               ? { ...admin.school, is_active: updatedData.is_active }
//               : { ...admin.college, is_active: updatedData.is_active }

//           return {
//             ...admin,
//             [type]: updatedInstitution,
//           }
//         }
//         return admin
//       })

//       setInstitution_adminList(updatedList)
//       alert('Status toggled successfully!')
//     } catch (error) {
//       alert('Failed to toggle activation status.')
//     }
//   }

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://127.0.0.1:8000/superadmin_app/delete_institutionadmin/${id}`, {
//         headers: { Authorization: `Token ${token}` },
//       })
//       InstitutionAdminList()
//       alert('Deleted successfully')
//     } catch (error) {
//       console.error('Delete error:', error)
//     }
//   }

//   useEffect(() => {
//     InstitutionAdminList()
//   }, [])

//   const resetFilters = () => {
//     setSearchAdminInstitution('')
//     setUniversitySearch('')
//   }

//   return (
//     <>
//       {/* Filters above table */}
//       <div className="mb-4 flex flex-col md:flex-row gap-4 items-center">
//         <input
//           type="text"
//           placeholder="Search Institution Name"
//           value={searchAdminInstitution}
//           onChange={(e) => setSearchAdminInstitution(e.target.value)}
//           className="border border-gray-300 rounded px-3 py-2 flex-grow md:flex-grow-0 md:w-60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         />
//         <select
//           value={universitySearch}
//           onChange={(e) => setUniversitySearch(e.target.value)}
//           className="border border-gray-300 rounded px-3 py-2 md:w-60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         >
//           <option value="">All Universities</option>
//           {universities.map((uni) => (
//             <option key={uni} value={uni}>
//               {uni}
//             </option>
//           ))}
//         </select>
//         <button
//           onClick={resetFilters}
//           className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
//         >
//           Reset Filters
//         </button>
//       </div>

//       {/* Your existing table structure with minimal changes */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full table-auto border border-gray-200 rounded-lg shadow-sm">
//           <thead className="bg-white text-gray-700">
//             <tr>
//               <th className="px-4 py-2 text-left">Username</th>
//               <th className="px-4 py-2 text-left">Email</th>
//               <th className="px-4 py-2 text-left">Institution ID</th>
//               <th className="px-4 py-2 text-left">Type</th>
//               <th className="px-4 py-2 text-left">Institution Name</th>
//               <th className="px-4 py-2 text-left">Registration Id</th>
//               <th className="px-4 py-2 text-left">Active</th>
//               <th className="px-4 py-2 text-left">Action</th>
//               <th className="px-4 py-2 text-left">Edit</th>
//               <th className="px-4 py-2 text-left">Delete</th>
//               <th className="px-4 py-2 text-left">Detail</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-700">
//             {filteredAdminInstitutionList.length === 0 ? (
//               <tr>
//                 <td colSpan="11" className="text-center py-6 text-gray-500">
//                   No matching records found.
//                 </td>
//               </tr>
//             ) : (
//               filteredAdminInstitutionList.map((admin) => {
//                 const school = admin.school
//                 const college = admin.college

//                 const institutionName = school?.name || college?.name || 'Not Registered'
//                 const registrationId = school?.registration_id || college?.registration_id || '-'
//                 const isActive = school?.is_active ?? college?.is_active ?? false

//                 return (
//                   <tr key={admin.admin_id} className="bg-gray-50 hover:bg-gray-100">
//                     <td className="px-4 py-2">{admin.admin_username}</td>
//                     <td className="px-4 py-2">{admin.admin_email}</td>
//                     <td className="px-4 py-2">{admin.institution_id}</td>
//                     <td className="px-4 py-2">{admin.institution_type}</td>
//                     <td className="px-4 py-2">{institutionName}</td>
//                     <td className="px-4 py-2">{registrationId}</td>
//                     <td className="px-4 py-2">
//                       <span className={isActive ? 'text-green-600' : 'text-red-600'}>
//                         {isActive ? 'Active' : 'Inactive'}
//                       </span>
//                     </td>
//                     <td className="px-4 py-2">
//                       <button
//                         onClick={() =>
//                           toggleActivation(admin.institution_id, admin.institution_type.toLowerCase())
//                         }
//                         className={`px-3 py-1 rounded-md text-white text-sm font-semibold ${
//                           isActive ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
//                         }`}
//                       >
//                         {isActive ? 'Deactivate' : 'Activate'}
//                       </button>
//                     </td>
//                     <td className="px-4 py-2">
//                       <Link
//                         className="text-red-500 hover:text-red-800"
//                         to={`/admin/edit_institution_form/${admin.institution_id}`}
//                       >
//                         Edit
//                       </Link>
//                     </td>
//                     <td className="px-4 py-2">
//                       <button
//                         className="text-red-500 hover:text-red-800"
//                         onClick={() => handleDelete(admin.admin_id)}
//                       >
//                         Remove
//                       </button>
//                     </td>
//                     <td className="px-4 py-2">
//                       <button onClick={() => navigate(`/admin/details/${admin.institution_id}`)}>
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 )
//               })
//             )}
//           </tbody>
//         </table>
//       </div>
//     </>
//   )
// }

// export default Table3
