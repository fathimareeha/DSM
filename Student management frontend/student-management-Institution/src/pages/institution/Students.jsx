// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Pencil, Trash2, Eye } from 'lucide-react';
// import axios from 'axios';

// function Students() {
//   const [students, setStudents] = useState([]);

//   const fetchStudents = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://127.0.0.1:8000/collegeapp/students/', {
//         headers: {
//           Authorization: `Token ${token}`,
//         },
//       });
//       setStudents(response.data);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this student?')) {
//       try {
//         const token = localStorage.getItem('token');
//         await axios.delete(`http://127.0.0.1:8000/collegeapp/students/${id}/`, {
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//         });
//         setStudents(students.filter((student) => student.id !== id));
//       } catch (error) {
//         console.error('Error deleting student:', error);
//       }
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-indigo-800">🎓 Manage Students</h2>
//         <Link
//           to="/admin/studentss/add"
//           className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//         >
//           ➕ Add Student
//         </Link>
//       </div>

//       <div className="overflow-x-auto bg-white shadow rounded-lg">
//         <table className="w-full table-auto text-sm text-left">
//           <thead className="bg-indigo-100 text-indigo-800 font-semibold">
//             <tr>
//               <th className="px-4 py-2">Photo</th>
//               <th className="px-4 py-2">Name</th>
//               <th className="px-4 py-2">Roll No</th>
//               <th className="px-4 py-2">Email</th>
//               <th className="px-4 py-2">Course</th>
//               <th className="px-4 py-2">Department</th>
//               <th className="px-4 py-2">Semester</th>
//               <th className="px-4 py-2">Phone</th>
//               <th className="px-4 py-2 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.length > 0 ? (
//               students.map((student) => (
//                 <tr key={student.id} className="border-b hover:bg-gray-50">
//                   <td className="px-4 py-3">
//                     {student.photo ? (
//                       <img
//                         src={student.photo}
//                         alt="student"
//                         className="w-10 h-10 rounded-full object-cover"
//                       />
//                     ) : (
//                       <span className="text-gray-400">No Photo</span>
//                     )}
//                   </td>
//                   <td className="px-4 py-3">{student.username || student.user?.username}</td>
//                   <td className="px-4 py-3">{student.roll_no}</td>
//                   <td className="px-4 py-3">{student.email || student.user?.email}</td>
//                   <td className="px-4 py-3">{student.course_name}</td>
//                   <td className="px-4 py-3">{student.department_name}</td>
//                   <td className="px-4 py-3">{student.semester_name}</td>
//                   <td className="px-4 py-3">{student.phone}</td>
//                   <td className="px-4 py-3 flex justify-center gap-2">
//                     <Link
//                       to={`/viewstudent/${student.id}`}
//                       className="text-blue-600 hover:underline"
//                     >
//                       <Eye size={16} />
//                     </Link>
//                     <Link
//                       to={`/admin/editstudent/${student.id}`}
//                       className="text-green-600 hover:underline"
//                     >
//                       <Pencil size={16} />
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(student.id)}
//                       className="text-red-600 hover:underline"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="9" className="text-center py-4 text-gray-400">
//                   No students found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Students;


// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Pencil, Trash2, Eye } from 'lucide-react';
// import axios from 'axios';

// function Students() {
//   const [students, setStudents] = useState([]);

//   const fetchStudents = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://127.0.0.1:8000/collegeapp/students/', {
//         headers: {
//           Authorization: `Token ${token}`,
//         },
//       });
//       setStudents(response.data);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this student?')) {
//       try {
//         const token = localStorage.getItem('token');
//         await axios.delete(`http://127.0.0.1:8000/collegeapp/students/${id}/`, {
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//         });
//         setStudents(students.filter((student) => student.id !== id));
//       } catch (error) {
//         console.error('Error deleting student:', error);
//       }
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-indigo-800">🎓 Manage Students</h2>
//         <Link
//           to="/admin/studentss/add"
//           className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//         >
//           ➕ Add Student
//         </Link>
//       </div>

//       <div className="overflow-x-auto bg-white shadow rounded-lg">
//         <table className="w-full table-auto text-sm text-left">
//           <thead className="bg-indigo-100 text-indigo-800 font-semibold">
//             <tr>
//               <th className="px-4 py-2">Photo</th>
//               <th className="px-4 py-2">Name</th>
//               <th className="px-4 py-2">Roll No</th>
//               <th className="px-4 py-2">Email</th>
//               <th className="px-4 py-2">Course</th>
//               <th className="px-4 py-2">Department</th>
//               <th className="px-4 py-2">Semester</th>
//               <th className="px-4 py-2">Phone</th>
//               <th className="px-4 py-2">Gender</th> {/* New column */}
//               <th className="px-4 py-2 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.length > 0 ? (
//               students.map((student) => (
//                 <tr key={student.id} className="border-b hover:bg-gray-50">
//                   <td className="px-4 py-3">
//                     {student.photo ? (
//                       <img
//                         src={student.photo}
//                         alt="student"
//                         className="w-10 h-10 rounded-full object-cover"
//                       />
//                     ) : (
//                       <span className="text-gray-400">No Photo</span>
//                     )}
//                   </td>
//                   <td className="px-4 py-3">{student.username || student.user?.username}</td>
//                   <td className="px-4 py-3">{student.roll_no}</td>
//                   <td className="px-4 py-3">{student.email || student.user?.email}</td>
//                   <td className="px-4 py-3">{student.course_name}</td>
//                   <td className="px-4 py-3">{student.department_name}</td>
//                   <td className="px-4 py-3">{student.semester_name}</td>
//                   <td className="px-4 py-3">{student.phone}</td>
//                   <td className="px-4 py-3">
//                     {student.gender === 'M'
//                       ? 'Male'
//                       : student.gender === 'F'
//                       ? 'Female'
//                       : student.gender === 'O'
//                       ? 'Other'
//                       : 'N/A'}
//                   </td>
//                   <td className="px-4 py-3 flex justify-center gap-2">
//                     <Link
//                       to={`/viewstudent/${student.id}`}
//                       className="text-blue-600 hover:underline"
//                     >
//                       <Eye size={16} />
//                     </Link>
//                     <Link
//                       to={`/admin/editstudent/${student.id}`}
//                       className="text-green-600 hover:underline"
//                     >
//                       <Pencil size={16} />
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(student.id)}
//                       className="text-red-600 hover:underline"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="10" className="text-center py-4 text-gray-400">
//                   No students found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Students;


// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Pencil, Trash2, Eye } from 'lucide-react';
// import axios from 'axios';

// function Students() {
//   const [students, setStudents] = useState([]);
//   const [hostels, setHostels] = useState([]);
//   const [selectedHostel, setSelectedHostel] = useState({});
//   const [roomNumbers, setRoomNumbers] = useState({});

//   // Fetch students
//   const fetchStudents = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://127.0.0.1:8000/collegeapp/students/', {
//         headers: { Authorization: `Token ${token}` },
//       });
//       setStudents(response.data);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//     }
//   };

//   // Fetch hostels
//   const fetchHostels = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://127.0.0.1:8000/collegeapp/hostels/', {
//         headers: { Authorization: `Token ${token}` },
//       });
//       setHostels(response.data);
//     } catch (error) {
//       console.error('Error fetching hostels:', error);
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//     fetchHostels();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this student?')) return;
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`http://127.0.0.1:8000/collegeapp/students/${id}/`, {
//         headers: { Authorization: `Token ${token}` },
//       });
//       setStudents(students.filter((s) => s.id !== id));
//     } catch (error) {
//       console.error('Error deleting student:', error);
//     }
//   };

//   const handleAssignHostel = async (studentId) => {
//     const hostelId = selectedHostel[studentId];
//     const roomNumber = roomNumbers[studentId] || null;

//     if (!hostelId) return alert('Please select a hostel');

//     try {
//       const token = localStorage.getItem('token');
//       await axios.patch(
//         `http://127.0.0.1:8000/collegeapp/students/${studentId}/assign-hostel/${hostelId}/`,
//         { room_number: roomNumber },
//         { headers: { Authorization: `Token ${token}` } }
//       );
//       fetchStudents();
//       alert('Hostel assigned successfully');
//     } catch (error) {
//       console.error('Error assigning hostel:', error);
//       alert(error.response?.data?.error || 'Failed to assign hostel');
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-indigo-800">🎓 Manage Students</h2>
//         <Link
//           to="/admin/studentss/add"
//           className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//         >
//           ➕ Add Student
//         </Link>
//       </div>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {students.length > 0 ? (
//           students.map((student) => (
//             <div
//               key={student.id}
//               className="bg-white shadow rounded-lg p-4 flex flex-col gap-3 hover:shadow-lg transition"
//             >
//               <div className="flex items-center gap-4">
//                 {student.photo ? (
//                   <img
//                     src={student.photo}
//                     alt="student"
//                     className="w-16 h-16 rounded-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
//                     No Photo
//                   </div>
//                 )}
//                 <div>
//                   <h3 className="font-semibold text-lg">{student.username || student.user?.username}</h3>
//                   <p className="text-sm text-gray-500">{student.roll_no}</p>
//                   <p className="text-sm text-gray-500">{student.email || student.user?.email}</p>
                  
//                 </div>
//               </div>

//               <div className="flex flex-wrap gap-2 text-sm text-gray-600">
//                 <span>Course: {student.course_name}</span>
//                 <span>Dept: {student.department_name}</span>
//                 <span>Sem: {student.semester_name}</span>
//                 <span>Phone: {student.phone}</span>
//                 <span>Gender: {student.gender === 'M' ? 'Male' : student.gender === 'F' ? 'Female' : 'N/A'}</span>
//               </div>
//               <button
//                   onClick={() => handleAssignHostel(student.id)}
//                   className="bg-indigo-600 text-white rounded hover:bg-indigo-700"
//                 >
//                   Assign
//                 </button>
              

//               <div className="flex items-center gap-2">
//                 <select
//                   value={selectedHostel[student.id] || ''}
//                   onChange={(e) =>
//                     setSelectedHostel({ ...selectedHostel, [student.id]: e.target.value })
//                   }
//                   className="border px-2 py-1 rounded flex-1"
//                 >
//                   <option value="">Select Hostel</option>
//                   {hostels.map((hostel) => (
//                     <option key={hostel.id} value={hostel.id}>
//                       {hostel.name} ({hostel.current_occupancy}/{hostel.intake})
//                     </option>
//                   ))}
//                 </select>
                

//                 <input
//                   type="text"
//                   value={roomNumbers[student.id] || ''}
//                   onChange={(e) =>
//                     setRoomNumbers({ ...roomNumbers, [student.id]: e.target.value })
//                   }
//                   placeholder="Room No"
//                   className="border px-2 py-1 rounded w-20"
//                 />
                

                
//               </div>

//               <div className="flex justify-end gap-2 mt-2">
//                 <Link
//                   to={`/viewstudent/${student.id}`}
//                   className="text-blue-600 hover:underline"
//                 >
//                   <Eye size={16} />
//                 </Link>
//                 <Link
//                   to={`/admin/editstudent/${student.id}`}
//                   className="text-green-600 hover:underline"
//                 >
//                   <Pencil size={16} />
//                 </Link>
//                 <button
//                   onClick={() => handleDelete(student.id)}
//                   className="text-red-600 hover:underline"
//                 >
//                   <Trash2 size={16} />
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-400 col-span-full text-center">No students found</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Students;




import React, { useEffect, useState } from "react";
import { Pencil, Trash2, UserPlus, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState({});
  const [roomNumbers, setRoomNumbers] = useState({});

  // Fetch students
  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://127.0.0.1:8000/collegeapp/students/",
        { headers: { Authorization: `Token ${token}` } }
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Fetch hostels
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
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchHostels();
  }, []);

  // Delete student
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://127.0.0.1:8000/collegeapp/students/${id}/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setStudents(students.filter((s) => s.id !== id));
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  // Assign hostel
  const handleAssignHostel = async (studentId) => {
    const hostelId = selectedHostel[studentId];
    const roomNumber = roomNumbers[studentId] || null;

    if (!hostelId) return alert("Please select a hostel");

    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://127.0.0.1:8000/collegeapp/students/${studentId}/assign-hostel/${hostelId}/`,
        { room_number: roomNumber },
        { headers: { Authorization: `Token ${token}` } }
      );
      fetchStudents();
      alert("Hostel assigned successfully");
    } catch (error) {
      console.error("Error assigning hostel:", error);
      alert(error.response?.data?.error || "Failed to assign hostel");
    }
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manage Students</h2>
          <p className="text-sm text-gray-500">
            View, edit, assign hostel, or remove students
          </p>
        </div>
        <Link
          to="/admin/studentss/add"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow hover:bg-indigo-700 transition"
        >
          <UserPlus className="w-4 h-4" />
          Add Student
        </Link>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden bg-white rounded-xl shadow-md border border-gray-200">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-50 text-gray-700 text-sm font-semibold border-b">
            <tr>
              <th className="px-6 py-3">Photo</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Course</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Semester</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr
                  key={student.id}
                  className={`hover:bg-indigo-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  {/* Photo */}
                  <td className="px-6 py-4">
                    {student.photo ? (
                      <img
                        src={student.photo}
                        alt={student.username}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                        No Photo
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-800">
                    {student.username || student.user?.username}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {student.email || student.user?.email}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{student.course_name}</td>
                  <td className="px-6 py-4 text-gray-600">{student.department_name}</td>
                  <td className="px-6 py-4 text-gray-600">{student.semester_name}</td>
                  <td className="px-6 py-4 text-gray-600">{student.phone}</td>

                  <td className="px-6 py-4 flex justify-center gap-3">
                    {/* View */}
                    <Link
  to={`/admin/students/${student.id}`}
  className="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition"
>
  <Eye className="w-4 h-4" />
</Link>


                    {/* Edit */}
                    <Link
                      to={`/admin/editstudent/${student.id}`}
                      className="p-2 rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-6 text-gray-400"
                >
                  No Students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageStudents;
