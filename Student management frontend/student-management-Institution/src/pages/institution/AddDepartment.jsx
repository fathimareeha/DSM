// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { useParams } from 'react-router-dom';

// // function DepartmentSelection() {
// //   const { courseId } = useParams();
// //   const [departments, setDepartments] = useState([]);
// //   const [selectedDept, setSelectedDept] = useState('');
// //   const [error, setError] = useState('');
// //   const token = localStorage.getItem('token');

// //   useEffect(() => {
// //     axios
// //       .get(`http://127.0.0.1:8000//superadmin_app/department`, {
// //         headers: { Authorization: `Token ${token}` },
// //       })
// //       .then((res) => setDepartments(res.data))
// //       .catch(() => setError('Failed to load departments.'));
// //   }, [courseId]);

// //   return (
// //     <div className="mt-7 flex items-center justify-center px-4">
// //       <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg">
// //         <h1 className="text-2xl font-bold text-center mb-6">Select Department</h1>

// //         {error && <p className="text-red-600 text-center mb-3">{error}</p>}

// //         <select
// //           value={selectedDept}
// //           onChange={(e) => setSelectedDept(e.target.value)}
// //           className="border rounded px-3 py-2 w-full mb-4"
// //         >
// //           <option value="">-- Choose Department --</option>
// //           {departments.map((dept) => (
// //             <option key={dept.id} value={dept.id}>
// //               {dept.name}
// //             </option>
// //           ))}
// //         </select>
// //       </div>
// //     </div>
// //   );
// // }

// // export default DepartmentSelection;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// function DepartmentSelection() {
//   const { courseId } = useParams();          // comes from /departments/:courseId
//   const [departments, setDepartments] = useState([]);
//   const [selectedDept, setSelectedDept] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     if (!courseId) return;

//     axios
//       .get(`http://127.0.0.1:8000/superadmin_app/department?course_id=${courseId}`, {
//         headers: { Authorization: `Token ${token}` },
//       })
//       .then((res) => {
//         setDepartments(res.data);
//         setError('');
//       })
//       .catch(() => setError('Failed to load departments.'));
//   }, [courseId, token]);

//   const handleNext = () => {
//     if (selectedDept) {
//       navigate(`/admin/semesters/${selectedDept}`);
//     }
//   };

//   return (
//     <div className="mt-7 flex items-center justify-center px-4">
//       <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg">
//         <h1 className="text-2xl font-bold text-center mb-6">Select Department</h1>

//         {error && <p className="text-red-600 text-center mb-3">{error}</p>}

//         <select
//           value={selectedDept}
//           onChange={(e) => setSelectedDept(e.target.value)}
//           className="border rounded px-3 py-2 w-full mb-4"
//         >
//           <option value="">-- Choose Department --</option>
//           {departments.map((dept) => (
//             <option key={dept.id} value={dept.id}>
//               {dept.name}
//             </option>
//           ))}
//         </select>

//         <button
//           onClick={handleNext}
//           disabled={!selectedDept}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full disabled:bg-gray-400"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default DepartmentSelection;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function SelectionFlow() {
  const { courseId } = useParams(); // courseId from route param
  const token = localStorage.getItem("token");

  const [departments, setDepartments] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [selectedDept, setSelectedDept] = useState("");
  const [selectedSem, setSelectedSem] = useState("");
  const [selectedSub, setSelectedSub] = useState("");

  const [error, setError] = useState("");

  // Fetch departments for a course
  useEffect(() => {
    if (!courseId) return;
    axios
      .get(`http://127.0.0.1:8000/superadmin_app/department?course_id=${courseId}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setDepartments(res.data))
      .catch(() => setError("Failed to load departments."));
  }, [courseId, token]);

  // Fetch semesters when department changes
  useEffect(() => {
    if (!selectedDept) return;
    axios
      .get(`http://127.0.0.1:8000/superadmin_app/semester?department_id=${selectedDept}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setSemesters(res.data))
      .catch(() => setError("Failed to load semesters."));
  }, [selectedDept, token]);

  // Fetch subjects when semester changes
  useEffect(() => {
    if (!selectedSem) return;
    axios
      .get(`http://127.0.0.1:8000/superadmin_app/subject?semester_id=${selectedSem}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setSubjects(res.data))
      .catch(() => setError("Failed to load subjects."));
  }, [selectedSem, token]);

  return (
    <div className="mt-7 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Select Details</h1>

        {error && <p className="text-red-600 text-center mb-3">{error}</p>}

        {/* Department */}
        <select
          value={selectedDept}
          onChange={(e) => {
            setSelectedDept(e.target.value);
            setSelectedSem("");
            setSelectedSub("");
            setSemesters([]);
            setSubjects([]);
          }}
          className="border rounded px-3 py-2 w-full mb-4"
        >
          <option value="">-- Choose Department --</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>

        {/* Semester */}
        {/* Semester */}
<select
  value={selectedSem}
  onChange={(e) => {
    setSelectedSem(e.target.value);
    setSelectedSub("");
    setSubjects([]);
  }}
  disabled={!selectedDept}
  className="border rounded px-3 py-2 w-full mb-4"
>
  <option value="">-- Choose Semester --</option>
  {semesters.map((sem) => (
    <option key={sem.id} value={sem.id}>
      Semester {sem.number}
    </option>
  ))}
</select>

        {/* Subject */}
        <select
          value={selectedSub}
          onChange={(e) => setSelectedSub(e.target.value)}
          disabled={!selectedSem}
          className="border rounded px-3 py-2 w-full mb-4"
        >
          <option value="">-- Choose Subject --</option>
          {subjects.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.name}
            </option>
          ))}
        </select>

        {selectedSub && (
          <p className="text-green-600 text-center font-medium">
            ✅ Selected Subject ID: {selectedSub}
          </p>
        )}
      </div>
    </div>
  );
}

export default SelectionFlow;
