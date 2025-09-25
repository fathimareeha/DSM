



// import React, { useEffect, useState } from 'react';
// import { Pencil, Trash2 } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// function ManageHod() {
//   const [hods, setHods] = useState([]);

//   const fetchHods = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://127.0.0.1:8000/collegeapp/hods/', {
//         headers: {
//           Authorization: `Token ${token}`,
//         },
//       });
//       setHods(response.data);
//     } catch (error) {
//       console.error('Error fetching HODs:', error);
//     }
//   };

//   useEffect(() => {
//     fetchHods();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this HOD?')) {
//       try {
//         const token = localStorage.getItem('token');
//         await axios.delete(`http://127.0.0.1:8000/collegeapp/hods/${id}/`, {
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//         });
//         setHods(hods.filter((hod) => hod.id !== id));
//       } catch (error) {
//         console.error('Error deleting HOD:', error);
//       }
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold text-indigo-800 mb-6">Manage HODs</h2>

//       <div className="overflow-x-auto bg-white shadow rounded-lg">
//         <table className="w-full table-auto text-sm text-left">
//           <thead className="bg-indigo-100 text-indigo-800 font-semibold">
//             <tr>
//               <th className="px-4 py-2">Name</th>
//               <th className="px-4 py-2">Email</th>
//               <th className="px-4 py-2">Department</th>
//               <th className="px-4 py-2">Phone</th>
//               <th className="px-4 py-2 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {hods.length > 0 ? (
//               hods.map((hod) => (
//                 <tr key={hod.id} className="border-b hover:bg-gray-50">
//                   <td className="px-4 py-3">{hod.username}</td>
//                   <td className="px-4 py-3">{hod.email}</td>
//                   <td className="px-4 py-3">{hod.department_name}</td>
//                   <td className="px-4 py-3">{hod.phone}</td>
//                   <td className="px-4 py-3 flex justify-center gap-2">
//                     <Link
//                       to={`/admin/edithod/${hod.id}`}
//                       className="text-indigo-600 hover:underline"
//                     >
//                       <Pencil className="w-4 h-4" />
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(hod.id)}
//                       className="text-red-500"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="text-center py-4 text-gray-400">
//                   No HODs found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default ManageHod;



import React, { useEffect, useState } from "react";
import { Pencil, Trash2, UserPlus, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

function ManageHod() {
  const [hods, setHods] = useState([]);

  const fetchHods = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:8000/collegeapp/hods/", {
        headers: { Authorization: `Token ${token}` },
      });
      setHods(response.data);
    } catch (error) {
      console.error("Error fetching HODs:", error);
    }
  };

  useEffect(() => {
    fetchHods();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this HOD?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://127.0.0.1:8000/collegeapp/hods/${id}/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setHods(hods.filter((hod) => hod.id !== id));
      } catch (error) {
        console.error("Error deleting HOD:", error);
      }
    }
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manage HODs</h2>
          <p className="text-sm text-gray-500">View, edit, or remove department heads</p>
        </div>
        <Link
          to="/admin/hods/add"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow hover:bg-indigo-700 transition"
        >
          <UserPlus className="w-4 h-4" />
          Add HOD
        </Link>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden bg-white rounded-xl shadow-md border border-gray-200">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-50 text-gray-700 text-sm font-semibold border-b">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {hods.length > 0 ? (
              hods.map((hod, index) => (
                <tr
                  key={hod.id}
                  className={`hover:bg-indigo-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-gray-800">{hod.username}</td>
                  <td className="px-6 py-4 text-gray-600">{hod.email}</td>
                  <td className="px-6 py-4 text-gray-600">{hod.department_name}</td>
                  <td className="px-6 py-4 text-gray-600">{hod.phone}</td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    {/* View Button */}
                    <Link
                      to={`/admin/viewhod/${hod.id}`}
                      className="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>

                    {/* Edit Button */}
                    <Link
                      to={`/admin/edithod/${hod.id}`}
                      className="p-2 rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(hod.id)}
                      className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No HODs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageHod;
