// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Pencil, Trash2, Plus } from "lucide-react";
// import { Link } from "react-router-dom";

// function TeachersList() {
//   const [teachers, setTeachers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch teachers
//   const fetchTeachers = async () => {
//     const token = localStorage.getItem("token");
//     try {
// const res = await axios.get("http://127.0.0.1:8000/schoolapp/teachers/", {
//   headers: { Authorization: `Token ${token}` },
// });

//       setTeachers(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load teachers");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTeachers();
//   }, []);

//   // ✅ Delete teacher
//   const deleteTeacher = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this teacher?")) return;
//     const token = localStorage.getItem("token");
//     try {
//       await axios.delete(`http://127.0.0.1:8000/schoolapp/teachers/${id}/`, {
//   headers: { Authorization: `Token ${token}` },
// });

//       toast.success("Teacher deleted successfully");
//       setTeachers((prev) => prev.filter((t) => t.id !== id));
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to delete teacher");
//     }
//   };

//   if (loading) {
//     return <p className="text-center text-gray-500 mt-6">Loading teachers...</p>;
//   }

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-3xl font-bold text-indigo-700">Manage Teachers</h2>
//         <Link
//           to="/admin/add/teachers"
//           className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition text-base font-medium"
//         >
//           <Plus className="w-5 h-5" /> Add Teacher
//         </Link>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//         {teachers.length === 0 ? (
//           <p className="text-center py-6 text-gray-400 italic">No teachers found.</p>
//         ) : (
//           <table className="w-full text-left border-collapse">
//             <thead className="bg-indigo-600 text-white text-lg">
//               <tr>
//                 <th className="px-6 py-4">ID</th>
//                 <th className="px-6 py-4">Profile</th>
//                 <th className="px-6 py-4">Name</th>
//                 <th className="px-6 py-4">Email</th>
//                 <th className="px-6 py-4">Phone</th>
//                 <th className="px-6 py-4">Gender</th>
//                 <th className="px-6 py-4 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {teachers.map((t, index) => (
//                 <tr
//                   key={t.id}
//                   className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-indigo-50 transition`}
//                 >
//                   <td className="px-6 py-4">{t.id}</td>
//                   <td className="px-6 py-4">
//                     <img
//                       src={t.profilePic || "https://via.placeholder.com/50"}
//                       alt={t.username}
//                       className="w-12 h-12 rounded-full object-cover border"
//                     />
//                   </td>
//                   <td className="px-6 py-4 font-medium">{t.username}</td>
//                   <td className="px-6 py-4">{t.email}</td>
//                   <td className="px-6 py-4">{t.phone}</td>
//                   <td className="px-6 py-4">{t.gender}</td>
//                   <td className="px-6 py-4 flex justify-center gap-3">
//                     <Link
//                       to={`/admin/edit/teacher/${t.id}`}
//                       className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm font-medium"
//                     >
//                       <Pencil className="w-4 h-4" /> Edit
//                     </Link>
//                     <button
//                       onClick={() => deleteTeacher(t.id)}
//                       className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm font-medium"
//                     >
//                       <Trash2 className="w-4 h-4" /> Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

// export default TeachersList;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Pencil, Trash2, Plus, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

function TeachersList() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch teachers
  const fetchTeachers = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://127.0.0.1:8000/schoolapp/teachers/", {
        headers: { Authorization: `Token ${token}` },
      });
      setTeachers(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load teachers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // ✅ Delete teacher
  const deleteTeacher = async (id) => {
    if (!window.confirm("Are you sure you want to delete this teacher?")) return;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://127.0.0.1:8000/schoolapp/teachers/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      toast.success("Teacher deleted successfully");
      setTeachers((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete teacher");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-6">Loading teachers...</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-indigo-700">Manage Teachers</h2>
        <Link
          to="/admin/add/teachers"
          className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition text-base font-medium"
        >
          <Plus className="w-5 h-5" /> Add Teacher
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        {teachers.length === 0 ? (
          <p className="text-center py-6 text-gray-400 italic">No teachers found.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-indigo-600 text-white text-lg">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Profile</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Gender</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t, index) => (
                <tr
                  key={t.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-indigo-50 transition`}
                >
                  <td className="px-6 py-4">{t.id}</td>
                  <td className="px-6 py-4">
                    <img
                      src={t.profilePic || "https://via.placeholder.com/50"}
                      alt={t.username}
                      className="w-12 h-12 rounded-full object-cover border"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium">{t.username}</td>
                  <td className="px-6 py-4">{t.email}</td>
                  <td className="px-6 py-4">{t.phone}</td>
                  <td className="px-6 py-4">{t.gender}</td>
                 <td className="px-6 py-4 flex mt-3 gap-2">
  <Link
    to={`/admin/edit/teacher/${t.id}`}
    className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-xs font-medium"
  >
    <Pencil className="w-4 h-4" /> Edit
  </Link>

  <button
    onClick={() => deleteTeacher(t.id)}
    className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-xs font-medium"
  >
    <Trash2 className="w-4 h-4" /> Delete
  </button>

  <Link
    to={`/admin/assign/subject/${t.id}`}
    className="flex items-center gap-1 px-2 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition text-xs font-medium"
  >
    <BookOpen className="w-4 h-4" /> Assign
  </Link>
</td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default TeachersList;
