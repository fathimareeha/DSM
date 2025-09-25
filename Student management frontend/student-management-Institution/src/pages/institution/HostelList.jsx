// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Pencil, Trash2, Eye, Hotel } from "lucide-react";
// import axios from "axios";
// import { toast } from "react-toastify";

// function HostelList() {
//   const [hostels, setHostels] = useState([]);

//   const fetchHostels = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get("http://127.0.0.1:8000/collegeapp/hostels/", {
//         headers: { Authorization: `Token ${token}` },
//       });
//       setHostels(response.data);
//     } catch (error) {
//       console.error("Error fetching hostels:", error);
//       toast.error("Failed to fetch hostels");
//     }
//   };

//   useEffect(() => {
//     fetchHostels();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this hostel?")) return;

//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`http://127.0.0.1:8000/collegeapp/hostels/${id}/`, {
//         headers: { Authorization: `Token ${token}` },
//       });
//       setHostels(hostels.filter((h) => h.id !== id));
//       toast.success("Hostel deleted");
//     } catch (error) {
//       console.error("Error deleting hostel:", error);
//       toast.error("Failed to delete hostel");
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-indigo-800">
//           <Hotel size={24} /> Manage Hostels
//         </h2>
//         <Link
//           to="/admin/hostel/add"
//           className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//         >
//           ➕ Add Hostel
//         </Link>
//       </div>

//       <div className="overflow-x-auto bg-white shadow rounded-lg">
//         <table className="w-full table-auto text-sm text-left">
//           <thead className="bg-indigo-100 text-indigo-800 font-semibold">
//             <tr>
//               <th className="px-4 py-2">Name</th>
//               <th className="px-4 py-2">Type</th>
//               <th className="px-4 py-2">Intake</th>
//               <th className="px-4 py-2">Address</th>
//               <th className="px-4 py-2 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {hostels.length > 0 ? (
//               hostels.map((hostel) => (
//                 <tr key={hostel.id} className="border-b hover:bg-gray-50">
//                   <td className="px-4 py-3">{hostel.name}</td>
//                   <td className="px-4 py-3">{hostel.hostel_type}</td>
//                   <td className="px-4 py-3">{hostel.intake}</td>
//                   <td className="px-4 py-3">{hostel.address || "-"}</td>
//                   <td className="px-4 py-3 flex justify-center gap-2">
//                     <Link
//                       to={`/admin/hostel/view/${hostel.id}`}
//                       className="text-blue-600 hover:underline"
//                     >
//                       <Eye size={16} />
//                     </Link>
//                     <Link
//                       to={`/admin/hostel/edit/${hostel.id}`}
//                       className="text-green-600 hover:underline"
//                     >
//                       <Pencil size={16} />
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(hostel.id)}
//                       className="text-red-600 hover:underline"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="text-center py-4 text-gray-400">
//                   No hostels found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default HostelList;



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Eye, Hotel } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

function HostelList() {
  const [hostels, setHostels] = useState([]);

  const fetchHostels = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://127.0.0.1:8000/collegeapp/hostels/",
        { headers: { Authorization: `Token ${token}` } }
      );
      setHostels(response.data);
    } catch (error) {
      console.error("Error fetching hostels:", error);
      toast.error("Failed to fetch hostels");
    }
  };

  useEffect(() => {
    fetchHostels();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hostel?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:8000/collegeapp/hostels/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setHostels(hostels.filter((h) => h.id !== id));
      toast.success("Hostel deleted");
    } catch (error) {
      console.error("Error deleting hostel:", error);
      toast.error("Failed to delete hostel");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-800 flex items-center gap-2">
          <Hotel size={24} /> Manage Hostels
        </h2>
        <Link
          to="/admin/hostel/add"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          ➕ Add Hostel
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-indigo-100 text-indigo-800 font-semibold">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Intake</th>
              <th className="px-4 py-2">Current Students</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hostels.length > 0 ? (
              hostels.map((hostel) => (
                <tr key={hostel.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{hostel.name}</td>
                  <td className="px-4 py-3">{hostel.hostel_type}</td>
                  <td className="px-4 py-3">{hostel.intake}</td>
                  <td className="px-4 py-3">{hostel.current_occupancy || 0}</td>
                  <td className="px-4 py-3">{hostel.address || "-"}</td>
                  <td className="px-4 py-3 flex justify-center gap-2">
                    <Link
                      to={`/admin/hostel/view/${hostel.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      <Eye size={16} />
                    </Link>
                    <Link
                      to={`/admin/hostel/edit/${hostel.id}`}
                      className="text-green-600 hover:underline"
                    >
                      <Pencil size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(hostel.id)}
                      className="text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">
                  No hostels found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HostelList;
