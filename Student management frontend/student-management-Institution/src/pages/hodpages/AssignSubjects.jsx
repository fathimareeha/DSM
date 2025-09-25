// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const AssignSubjectsPage = () => {
//   const { facultyId } = useParams();
//   const [faculty, setFaculty] = useState(null);
//   const [semesters, setSemesters] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [assignments, setAssignments] = useState([]);

//   const [selectedSemester, setSelectedSemester] = useState("");
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("token");

//   // Fetch faculty details and related semesters
//   useEffect(() => {
//     if (!facultyId) return;

//     axios
//       .get(`http://127.0.0.1:8000/collegeapp/faculties/${facultyId}/`, {
//         headers: { Authorization: `Token ${token}` },
//       })
//       .then((res) => {
//         console.log("✅ Faculty API Response:", res.data);
//         setFaculty(res.data);

//         const deptId =
//           typeof res.data.department === "number"
//             ? res.data.department
//             : res.data.department?.id || res.data.department_id || null;

//         if (deptId) {
//           // ✅ Updated URL to match backend
//           axios
//             .get(
//               `http://127.0.0.1:8000/superadmin_app/semester?department_id=${deptId}`,
//               { headers: { Authorization: `Token ${token}` } }
//             )
//             .then((semRes) => {
//               console.log("✅ Semesters API:", semRes.data);
//               setSemesters(semRes.data);
//             })
//             .catch((err) => {
//               console.error("❌ Failed to fetch semesters", err);
//               setSemesters([]);
//             });
//         }
//       })
//       .catch((err) => {
//         console.error("❌ Failed to fetch faculty", err);
//       });
//   }, [facultyId, token]);

//   // Fetch subjects when semester changes
//   useEffect(() => {
//     if (!selectedSemester) {
//       setSubjects([]);
//       return;
//     }

//     axios
//       .get(
//         `http://127.0.0.1:8000/superadmin_app/subject?semester_id=${selectedSemester}`,
//         { headers: { Authorization: `Token ${token}` } }
//       )
//       .then((res) => setSubjects(res.data))
//       .catch((err) => {
//         console.error("❌ Failed to fetch subjects", err);
//         setSubjects([]);
//       });
//   }, [selectedSemester, token]);

//   // Fetch already assigned subjects
//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/collegeapp/assign-subjects/", {
//         headers: { Authorization: `Token ${token}` },
//       })
//       .then((res) => setAssignments(res.data))
//       .catch((err) => console.error("❌ Failed to fetch assignments", err));
//   }, [token]);

//   const handleAssign = (e) => {
//     e.preventDefault();
//     if (!selectedSemester || !selectedSubject) {
//       alert("Please select semester and subject");
//       return;
//     }

//     setLoading(true);
//     axios
//       .post(
//         "http://127.0.0.1:8000/collegeapp/assign-subjects/",
//         {
//           faculty_id: facultyId,
//           semester_id: parseInt(selectedSemester, 10),
//           subject_id: parseInt(selectedSubject, 10),
//         },
//         { headers: { Authorization: `Token ${token}` } }
//       )
//       .then((res) => {
//         alert("✅ Subject Assigned Successfully!");
//         setAssignments([...assignments, res.data]);
//         setSelectedSemester("");
//         setSelectedSubject("");
//       })
//       .catch((err) => {
//         console.error("❌ Error assigning subject", err.response?.data || err);
//         alert("❌ Error assigning subject");
//       })
//       .finally(() => setLoading(false));
//   };

//   return (
//     <div className="p-6">
//       <div className="bg-white shadow-lg rounded-xl p-6">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800">
//           Assign Subjects to {faculty ? faculty.username : "Faculty"}
//         </h2>

//         <form
//           onSubmit={handleAssign}
//           className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
//         >
//           <select
//             value={selectedSemester}
//             onChange={(e) => setSelectedSemester(e.target.value)}
//             className="p-2 border rounded-lg focus:ring focus:ring-blue-300"
//           >
//             <option value="">Select Semester</option>
//             {semesters.length > 0 ? (
//               semesters.map((s) => (
//                 <option key={s.id} value={s.id}>
//                   Semester {s.number}
//                 </option>
//               ))
//             ) : (
//               <option disabled>No semesters available</option>
//             )}
//           </select>

//           <select
//             value={selectedSubject}
//             onChange={(e) => setSelectedSubject(e.target.value)}
//             className="p-2 border rounded-lg focus:ring focus:ring-blue-300"
//             disabled={!selectedSemester}
//           >
//             <option value="">Select Subject</option>
//             {subjects.length > 0 ? (
//               subjects.map((sub) => (
//                 <option key={sub.id} value={sub.id}>
//                   {sub.name || sub.subject_name || sub.title}
//                 </option>
//               ))
//             ) : (
//               <option disabled>No subjects available</option>
//             )}
//           </select>

//           <button
//             type="submit"
//             className="col-span-1 md:col-span-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//             disabled={loading}
//           >
//             {loading ? "Assigning..." : "Assign"}
//           </button>
//         </form>

//         <h3 className="text-lg font-semibold mb-4 text-gray-700">
//           Assigned Subjects
//         </h3>
//         {assignments.length === 0 ? (
//           <p className="text-gray-500">No subjects assigned yet.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full border rounded-lg overflow-hidden">
//               <thead>
//                 <tr className="bg-gray-100 text-left">
//                   <th className="p-3 border">Faculty</th>
//                   <th className="p-3 border">Subject</th>
//                   <th className="p-3 border">Semester</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {assignments.map((a) => (
//                   <tr key={a.id} className="hover:bg-gray-50">
//                     <td className="p-3 border">{a.faculty_name}</td>
//                     <td className="p-3 border">{a.subject_name}</td>
//                     <td className="p-3 border">
//                       Semester {a.semester_number}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AssignSubjectsPage;



// src/pages/AssignSubjectsPage.jsx
// src/pages/AssignSubjectsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AssignSubjectsPage = () => {
  const { facultyId } = useParams();
  const [faculty, setFaculty] = useState(null);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch faculty and semesters
  useEffect(() => {
    if (!facultyId) return;

    axios
      .get(`http://127.0.0.1:8000/collegeapp/faculties/${facultyId}/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setFaculty(res.data);
        const deptId = res.data.department?.id || res.data.department || null;

        if (deptId) {
          axios
            .get(
              `http://127.0.0.1:8000/superadmin_app/semester?department_id=${deptId}`,
              { headers: { Authorization: `Token ${token}` } }
            )
            .then((semRes) => setSemesters(semRes.data))
            .catch(() => setSemesters([]));
        }
      })
      .catch(() => {});
  }, [facultyId, token]);

  // Fetch subjects when semester changes
  useEffect(() => {
    if (!selectedSemester) return setSubjects([]);

    axios
      .get(
        `http://127.0.0.1:8000/superadmin_app/subject?semester_id=${selectedSemester}`,
        { headers: { Authorization: `Token ${token}` } }
      )
      .then((res) => setSubjects(res.data))
      .catch(() => setSubjects([]));
  }, [selectedSemester, token]);

  // Fetch assigned subjects
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/collegeapp/assign-subjects/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setAssignments(res.data))
      .catch(() => {});
  }, [token]);

  const handleAssign = (e) => {
    e.preventDefault();
    if (!selectedSemester || !selectedSubject) return;

    setLoading(true);
    axios
      .post(
        "http://127.0.0.1:8000/collegeapp/assign-subjects/",
        {
          faculty_id: facultyId,
          semester_id: parseInt(selectedSemester, 10),
          subject_id: parseInt(selectedSubject, 10),
        },
        { headers: { Authorization: `Token ${token}` } }
      )
      .then((res) => {
        setAssignments([...assignments, res.data]);
        setSelectedSemester("");
        setSelectedSubject("");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Back Button */}
      <Link
        to="/hod/faculty"
        className="inline-flex items-center gap-2 text-gray-700 font-medium mb-6 hover:text-gray-900 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Faculty List
      </Link>

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Assign Subjects to {faculty?.username || "Faculty"}
        </h2>
        <p className="text-gray-500">
          Choose semester and subject to assign to the faculty member.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
        <form
          onSubmit={handleAssign}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-200 transition"
          >
            <option value="">Select Semester</option>
            {semesters.map((s) => (
              <option key={s.id} value={s.id}>
                Semester {s.number}
              </option>
            ))}
          </select>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            disabled={!selectedSemester}
            className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-200 transition"
          >
            <option value="">Select Subject</option>
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name || sub.subject_name || sub.title}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl p-3 font-medium transition"
          >
            {loading ? "Assigning..." : "Assign"}
          </button>
        </form>
      </div>

      {/* Assigned Subjects */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Assigned Subjects
        </h3>
        {assignments.length === 0 ? (
          <p className="text-gray-500">No subjects assigned yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-xl overflow-hidden">
              <thead className="bg-gradient-to-r from-indigo-50 to-blue-50">
                <tr>
                  <th className="p-3 text-left">Faculty</th>
                  <th className="p-3 text-left">Subject</th>
                  <th className="p-3 text-left">Semester</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((a) => (
                  <tr
                    key={a.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3">{a.faculty_name}</td>
                    <td className="p-3">{a.subject_name}</td>
                    <td className="p-3">Semester {a.semester_number}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignSubjectsPage;
