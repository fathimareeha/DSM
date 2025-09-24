// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function StaffList() {
//   const [staffs, setStaffs] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     console.log("Token used:", token);

//     axios
//       .get("http://127.0.0.1:8000/collegeapp/coordinators/", {
//         headers: {
//           Authorization: `Token ${token}`,
//         },
//       })
//       .then((res) => {
//         console.log("Staff Data:", res.data);
//         setStaffs(res.data);
//       })
//       .catch((err) => {
//         console.error(
//           "Failed to load staff:",
//           err.response?.data || err.message || err
//         );
//         setStaffs([]);
//       });
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md">
//       <h2 className="text-2xl font-bold text-indigo-800 mb-6">Staff List</h2>

//       {staffs.length > 0 ? (
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className=" px-4 py-2">#</th>
//               <th className=" px-4 py-2">Name</th>
//               <th className=" px-4 py-2">Email</th>
//               {/* <th className="border border-gray-300 px-4 py-2">Phone</th> */}
//               <th className="px-4 py-2">Role</th>
//             </tr>
//           </thead>
//           <tbody>
//             {staffs.map((staff, index) => (
//               <tr key={staff.id}>
//                 <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
//                 <td className="border border-gray-300 px-4 py-2">{staff.user_username}</td>
//                 <td className="border border-gray-300 px-4 py-2">{staff.user_email}</td>
//                 <td className="border border-gray-300 px-4 py-2">{staff.coordinators_role}</td>
//                 {/* <td className="border border-gray-300 px-4 py-2">{staff.coordinators_role}</td> */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p className="text-center text-gray-500">No staff found.</p>
//       )}
//     </div>
//   );
// }

// export default StaffList;


// import React, { useEffect, useState } from "react";
// import { Pencil, Trash2 } from "lucide-react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// function ViewStaff() {
//   const [staffs, setStaffs] = useState([]);

//   const fetchStaffs = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         "http://127.0.0.1:8000/collegeapp/coordinators/",
//         {
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//         }
//       );
//       setStaffs(response.data);
//     } catch (error) {
//       console.error("Error fetching staff:", error);
//     }
//   };

//   useEffect(() => {
//     fetchStaffs();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this Staff?")) {
//       try {
//         const token = localStorage.getItem("token");
//         await axios.delete(
//           `http://127.0.0.1:8000/collegeapp/coordinators/${id}/`,
//           {
//             headers: {
//               Authorization: `Token ${token}`,
//             },
//           }
//         );
//         setStaffs(staffs.filter((staff) => staff.id !== id));
//       } catch (error) {
//         console.error("Error deleting staff:", error);
//       }
//     }
//   };

//   return (
//     <div className="p-4">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-indigo-800">👥 Manage Staff</h2>
//         <Link
//           to="/admin/staffs/add"
//           className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//         >
//           ➕ Add Staff
//         </Link>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto bg-white shadow rounded-lg">
//         <table className="w-full table-auto text-sm text-left">
//           <thead className="bg-indigo-100 text-indigo-800 font-semibold">
//             <tr>
//               <th className="px-4 py-2">Name</th>
//               <th className="px-4 py-2">Email</th>
//               <th className="px-4 py-2">Role</th>
//               <th className="px-4 py-2 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {staffs.length > 0 ? (
//               staffs.map((staff) => (
//                 <tr key={staff.id} className="border-b hover:bg-gray-50">
//                   <td className="px-4 py-3">{staff.user_username}</td>
//                   <td className="px-4 py-3">{staff.user_email}</td>
//                   <td className="px-4 py-3 capitalize">
//                     {staff.coordinators_role}
//                   </td>
//                   <td className="px-4 py-3 flex justify-center gap-2">
//                     <Link
//                       to={`/admin/editstaff/${staff.id}`}
//                       className="text-indigo-600 hover:underline"
//                     >
//                       <Pencil className="w-4 h-4" />
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(staff.id)}
//                       className="text-red-500"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="text-center py-4 text-gray-400">
//                   No staff found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default ViewStaff;



import React, { useEffect, useState } from "react";
import { Pencil, Trash2, UserPlus, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

function ViewStaff() {
  const [staffs, setStaffs] = useState([]);

  const fetchStaffs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://127.0.0.1:8000/collegeapp/coordinators/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setStaffs(response.data);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Staff?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(
          `http://127.0.0.1:8000/collegeapp/coordinators/${id}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setStaffs(staffs.filter((staff) => staff.id !== id));
      } catch (error) {
        console.error("Error deleting staff:", error);
      }
    }
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">👥 Manage Staff</h2>
          <p className="text-sm text-gray-500">View, edit, or remove coordinators</p>
        </div>
        <Link
          to="/admin/staffs/add"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow hover:bg-indigo-700 transition"
        >
          <UserPlus className="w-4 h-4" />
          Add Staff
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-indigo-50 text-indigo-800 font-semibold border-b">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {staffs.length > 0 ? (
              staffs.map((staff, index) => (
                <tr
                  key={staff.id}
                  className={`hover:bg-indigo-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {staff.user_username}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {staff.user_email}
                  </td>
                  <td className="px-6 py-4 capitalize text-gray-600">
                    {staff.coordinators_role}
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    {/* View Button */}
                    <Link
                      to={`/admin/viewstaff/${staff.id}`}
                      className="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>

                    {/* Edit Button */}
                    {/* <Link
                      to={`/admin/editstaff/${staff.id}`}
                      className="p-2 rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link> */}

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(staff.id)}
                      className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-400">
                  No staff found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewStaff;
