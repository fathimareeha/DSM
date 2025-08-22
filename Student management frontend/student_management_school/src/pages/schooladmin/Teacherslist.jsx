// import React, { useState, useEffect } from "react";
// import { Pencil, Trash2, Plus } from "lucide-react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// function TeacherList() {
//   const [teachers, setTeachers] = useState([]);

//   const fetchTeachers = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         "http://127.0.0.1:8000/schoolapp/teachercreate/",
//         {
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//         }
//       );
//       setTeachers(response.data);
//     } catch (error) {
//       console.error("Error fetching Teachers:", error);
//     }
//   };

//   useEffect(() => {
//     fetchTeachers();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this Faculty?")) {
//       try {
//         const token = localStorage.getItem("token");
//         await axios.delete(
//           `http://127.0.0.1:8000/schoolapp/teacherdetail/${id}/`,
//           {
//             headers: {
//               Authorization: `Token ${token}`,
//             },
//           }
//         );
//         setTeachers(teachers.filter((teacher) => teacher.id !== id));
//       } catch (error) {
//         console.error("Error deleting Teacher:", error);
//       }
//     }
//   };

//   return (
//     <div className="p-6">
//       {/* Header with Add button */}
//       <div className="flex justify-between items-center mb-6 border-b pb-2">
//         <h2 className="text-3xl font-bold text-indigo-800">Manage Teachers</h2>
//         <Link
//           to="/admin/add/teachers" 
//           className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition text-base font-medium"
//         >
//           <Plus className="w-5 h-5" />
//           Add Teacher
//         </Link>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
//         <table className="w-full text-base text-left border-collapse">
//           <thead className="bg-indigo-600 text-white text-lg">
//             <tr>
//               <th className="px-6 py-4">ID</th>
//               <th className="px-6 py-4">Profile</th>
//               <th className="px-6 py-4">Name</th>
//               <th className="px-6 py-4">Gender</th>
//               <th className="px-6 py-4">Email</th>
//               <th className="px-6 py-4">Phone</th>
//               <th className="px-6 py-4 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {teachers.length > 0 ? (
//               teachers.map((teacher, index) => (
//                 <tr
//                   key={teacher.id}
//                   className={`${
//                     index % 2 === 0 ? "bg-gray-50" : "bg-white"
//                   } hover:bg-indigo-50 transition`}
//                 >
//                   <td className="px-6 py-4">{teacher.id}</td>
//                   <td className="px-6 py-4">
//                     <img
//                       src={
//                         teacher.profile_pic
//                           ? teacher.profile_pic
//                           : "https://via.placeholder.com/50"
//                       }
//                       alt={teacher.username}
//                       className="w-12 h-12 rounded-full object-cover border"
//                     />
//                   </td>
//                   <td className="px-6 py-4">{teacher.username}</td>
//                   <td className="px-6 py-4">{teacher.gender}</td>
//                   <td className="px-6 py-4">{teacher.email}</td>
//                   <td className="px-6 py-4">{teacher.phone}</td>
//                   <td className="px-6 py-4 flex justify-center gap-3">
//                     <Link
//                       to={`/admin/edit/teacher/${teacher.id}`}
//                       className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-base font-medium"
//                     >
//                       <Pencil className="w-5 h-5" />
//                       EDIT
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(teacher.id)}
//                       className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition text-base font-medium"
//                     >
//                       <Trash2 className="w-5 h-5" />
//                       DELETE
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="7"
//                   className="text-center py-6 text-gray-400 italic"
//                 >
//                   No teachers found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default TeacherList;


import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  const fetchTeachers = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        // 🚨 If no token, send user to login
        navigate("/login");
        return;
      }

      const response = await axios.get(
        "http://127.0.0.1:8000/schoolapp/teachercreate/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching Teachers:", error);

      // 🚨 If backend says Unauthorized → log out & redirect
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Faculty?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(
          `http://127.0.0.1:8000/schoolapp/teacherdetail/${id}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setTeachers(teachers.filter((teacher) => teacher.id !== id));
      } catch (error) {
        console.error("Error deleting Teacher:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 border-b pb-2">
        <h2 className="text-3xl font-bold text-indigo-800">Manage Teachers</h2>
        <Link
          to="/admin/add/teachers"
          className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition text-base font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Teacher
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="w-full text-base text-left border-collapse">
          <thead className="bg-indigo-600 text-white text-lg">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Profile</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Gender</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.length > 0 ? (
              teachers.map((teacher, index) => (
                <tr
                  key={teacher.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-indigo-50 transition`}
                >
                  <td className="px-6 py-4">{teacher.id}</td>
                  <td className="px-6 py-4">
                    <img
                      src={
                        teacher.profile_pic
                          ? teacher.profile_pic
                          : "https://via.placeholder.com/50"
                      }
                      alt={teacher.username}
                      className="w-12 h-12 rounded-full object-cover border"
                    />
                  </td>
                  <td className="px-6 py-4">{teacher.username}</td>
                  <td className="px-6 py-4">{teacher.gender}</td>
                  <td className="px-6 py-4">{teacher.email}</td>
                  <td className="px-6 py-4">{teacher.phone}</td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <Link
                      to={`/admin/edit/teacher/${teacher.id}`}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-base font-medium"
                    >
                      <Pencil className="w-5 h-5" />
                      EDIT
                    </Link>
                    <button
                      onClick={() => handleDelete(teacher.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition text-base font-medium"
                    >
                      <Trash2 className="w-5 h-5" />
                      DELETE
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-400 italic"
                >
                  No teachers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeacherList;
