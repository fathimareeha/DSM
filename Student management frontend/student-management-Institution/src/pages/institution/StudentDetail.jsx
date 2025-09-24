// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// function StudentDetail() {
//   const { id } = useParams();
//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`http://127.0.0.1:8000/collegeapp/students/${id}/`, {
//         headers: { Authorization: `Token ${token}` },
//       })
//       .then((res) => setStudent(res.data))
//       .catch((err) => {
//         console.error(err.response?.data || err.message);
//         toast.error("❌ Failed to fetch student details");
//       })
//       .finally(() => setLoading(false));
//   }, [id, token]);

//   if (loading) return <div className="text-center mt-10">Loading...</div>;
//   if (!student) return <div className="text-center mt-10">Student not found.</div>;

//   return (
//     <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 text-blue-600 hover:underline"
//       >
//         &larr; Back
//       </button>

//       <h2 className="text-2xl font-bold mb-6">Student Details</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <p><strong>Username:</strong> {student.username}</p>
//         <p><strong>Email:</strong> {student.email}</p>
//         <p><strong>Phone:</strong> {student.phone}</p>
//         <p><strong>Roll No:</strong> {student.roll_no}</p>
//         <p><strong>Course:</strong> {student.course_name}</p>
//         <p><strong>Department:</strong> {student.department_name}</p>
//         <p><strong>Semester:</strong> {student.semester}</p>
//         <p><strong>Gender:</strong> {student.gender}</p>
//         <p><strong>Address:</strong> {student.address}</p>
//         {student.photo && (
//           <div className="col-span-2">
//             <img src={student.photo} alt={student.username} className="w-48 h-48 object-cover rounded-md" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default StudentDetail;


// src/pages/StudentDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Mail, Phone, User, BookOpen, GraduationCap, Home, Users } from "lucide-react";

function StudentDetail() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://127.0.0.1:8000/collegeapp/students/${id}/`,
          {
            headers: { Authorization: `Token ${token}` },
          }
        );
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };
    fetchStudent();
  }, [id]);

  if (!student) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Loading Student details...
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Back Button */}
      <Link
        to="/admin/students"
        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to List
      </Link>

      {/* Profile Card */}
      <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 h-32 relative">
          <div className="absolute -bottom-12 left-8 flex items-center">
            {student.photo ? (
              <img
                src={student.photo}
                alt={student.username}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center border-4 border-white text-indigo-600 text-3xl font-bold">
                {student.username.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="ml-6 text-white">
              <h2 className="text-2xl font-bold">{student.username}</h2>
              <p className="text-sm text-indigo-100">Student</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="pt-16 px-8 pb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Student Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-indigo-600" />
              <span className="font-medium">Username:</span>
              <span>{student.username}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-indigo-600" />
              <span className="font-medium">Email:</span>
              <span>{student.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-indigo-600" />
              <span className="font-medium">Phone:</span>
              <span>{student.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span className="font-medium">Course:</span>
              <span>{student.course_name}</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-indigo-600" />
              <span className="font-medium">Department:</span>
              <span>{student.department_name}</span>
            </div>
            <div className="flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-indigo-600" />
              <span className="font-medium">Semester:</span>
              <span>{student.semester}</span>
            </div>
            <div className="flex items-center gap-3">
              <Home className="w-5 h-5 text-indigo-600" />
              <span className="font-medium">Address:</span>
              <span>{student.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium">Gender:</span>
              <span>{student.gender}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium">Roll No:</span>
              <span>{student.roll_no}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetail;
