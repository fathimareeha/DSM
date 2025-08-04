import React, { useContext, useEffect, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // or dummy data
import { Authcontext } from '../../context/institution/Authcontext';

function ManageHod() {
  const {hodlist} = useContext(Authcontext)
  const [hods, setHods] = useState([]);

  // ✅ Fetch HODs (dummy for now)
  useEffect(() => {
    // Replace with real API call
    setHods([
      { id: 1, name: 'Dr. Ayesha Khan', email: 'ayesha@college.com', department: 'CSE' },
      { id: 2, name: 'Mr. Ravi Patel', email: 'ravi@college.com', department: 'ECE' },
    ]);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this HOD?')) {
      // axios.delete(`/api/hods/${id}`)
      setHods(hods.filter((hod) => hod.id !== id));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-indigo-800 mb-6">Manage HODs</h2>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-indigo-100 text-indigo-800 font-semibold">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hodlist.map((hod) => (
              <tr key={hod.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{hod.name}</td>
                <td className="px-4 py-3">{hod.email}</td>
                <td className="px-4 py-3">{hod.department}</td>
                <td className="px-4 py-3 flex justify-center gap-2">
                  <Link
                    to={`/edithod/${hod.id}`}
                    className="text-indigo-600 hover:underline"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <button onClick={() => handleDelete(hod.id)} className="text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {hods.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-400">No HODs found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageHod;



// import React, { useContext } from 'react'
// import { SuperadminContext } from '../../../context/super_admin/Superadmin_Context'

// function StaffTable() {

//     const {staffList}=useContext(SuperadminContext)
//   return (
//     <>
//       <div className='overflow-x-auto'>
//         <table className="min-w-full table-auto border border-gray-200 rounded-lg shadow-sm">
//           <thead className="bg-white text-gray-700">
//             <tr>
             
//               <th className="px-4 py-2 text-left">User name</th>
//               <th className="px-4 py-2 text-left">Email</th>
              
              
//               <th className="px-4 py-2 text-left">Details</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-700">
//             {staffList.map((staffs)=>
            
           
             
//             <tr className="bg-gray-50 hover:bg-gray-100">
              
//               <td className="px-4 py-2">{staffs.username}</td>
//               <td className="px-4 py-2">{staffs.email}</td>
             
              
//               <td className="px-4 py-2">
//                 <button>View</button>
//               </td>
//             </tr>
// )}
           

//           </tbody>
//         </table>

//       </div>
//     </>
//   )
// }

// export default StaffTable