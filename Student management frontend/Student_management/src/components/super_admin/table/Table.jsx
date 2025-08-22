import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { SuperadminContext } from '../../../context/super_admin/Superadmin_Context'
import { Search_context } from '../../../context/super_admin/Search_context'

function Table() {
  const navigate = useNavigate()
  const { filteredInstitutionList, InstitutionsList } = useContext(Search_context)

  const token = localStorage.getItem('token')


  const handleToggleActivation = async (id, type) => {
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/superadmin_app/toggle_activation/${type}/${id}/`,
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    alert(`Institution ${response.data.status} successfully`);
    InstitutionsList(); // Refresh the table data
  } catch (error) {
    console.error("Toggle activation error:", error.response?.data || error.message);
  }
};

  // ✅ Delete Function
 const handleDelete = async (id) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/superadmin_app/institution_delete/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    // Remove institution from local list after successful deletion
    InstitutionsList()
   
    alert('Deleted successfully');
  } catch (error) {
    console.error("Delete error:", error.response?.data || error.message);
  }
};

  return (
    <>
      <div className='overflow-x-auto'>
        <table className="min-w-full table-auto border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-white text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Registration ID</th>
              <th className="px-4 py-2 text-left">Username</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Institution Name</th>
              <th className="px-4 py-2 text-left">Active</th>
              <th className="px-4 py-2 text-left">Action</th>
              <th className="px-4 py-2 text-left">Edit</th>
              <th className="px-4 py-2 text-left">Delete</th>
              <th className="px-4 py-2 text-left">Details</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredInstitutionList.map((institution) => (
              <tr className="bg-gray-50 hover:bg-gray-100" key={institution.id}>
                <td className="px-4 py-2">{institution.registration_id}</td>
                <td className="px-4 py-2">{institution.username}</td>
                <td className="px-4 py-2">{institution.email}</td>
                <td className="px-4 py-2">{institution.type}</td>
                <td className="px-4 py-2">{institution.name}</td>
                <td className="px-4 py-2">
                  <span className={institution.is_active ? 'text-green-600' : 'text-red-600'}>
                    {institution.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-2">
  <button
    className={`px-2 py-1 rounded text-white ${
      institution.is_manually_deactivated ? 'bg-green-500' : 'bg-red-500'
    }`}
    onClick={() => handleToggleActivation(institution.id, institution.type)}
  >
    {institution.is_manually_deactivated ? 'Activate' : 'Deactivate'}
  </button>
</td>

                <td class="px-4 py-2">
                <Link class="text-red-500 hover:text-red-800" to={`/admin/edit_institution_form/${institution.id}`}>Edit</Link>
              </td>
                <td className="px-4 py-2">
                  <button className='text-red-500 hover:text-red-800' onClick={() => handleDelete(institution.id)}>
                    Remove
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button onClick={() => navigate(`/admin/details/${institution.id}`)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Table
