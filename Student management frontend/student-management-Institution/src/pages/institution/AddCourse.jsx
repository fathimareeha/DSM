// import React, { useEffect, useState } from "react";
// import Button from "../../components/common/Button";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// function CollegeCourseDepartment() {
//   const [courses, setCourses] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [collegeDepartments, setCollegeDepartments] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState("");
//   const [selectedDepartment, setSelectedDepartment] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   // Axios instance with token
//   const api = axios.create({
//     baseURL: "http://127.0.0.1:8000/collegeapp",
//     headers: { Authorization: `Token ${token}` },
//   });

//   // Interceptor for token expiry or unauthorized
//   api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error.response?.status === 401 || error.response?.status === 403) {
//         toast.error("Session expired. Please login again.");
//         localStorage.removeItem("token");
//         navigate("/login");
//       }
//       return Promise.reject(error);
//     }
//   );

//   useEffect(() => {
//     if (!token) {
//       toast.error("Please login first");
//       navigate("/login");
//       return;
//     }

//     fetchCourses();
//     fetchCollegeDepartments();
//   }, []);

//   // Fetch courses of the principal's college only
//   const fetchCourses = async () => {
//     try {
//       const res = await api.get("/college-courses/");
//       setCourses(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch courses");
//     }
//   };

//   // Fetch existing course-department assignments
//   const fetchCollegeDepartments = async () => {
//     try {
//       const res = await api.get("/college-departments/");
//       setCollegeDepartments(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch assignments");
//     }
//   };

//   // Fetch departments for selected course
//   const handleCourseChange = async (courseId) => {
//     setSelectedCourse(courseId);
//     setSelectedDepartment("");
//     setDepartments([]);

//     if (!courseId) return;

//     try {
//       const res = await api.get(`/available-departments/${courseId}/`);
//       setDepartments(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch departments for this course");
//     }
//   };

//   // Assign department to course
//   const handleAssign = async (e) => {
//     e.preventDefault();
//     if (!selectedCourse || !selectedDepartment) {
//       toast.error("Please select both course and department");
//       return;
//     }

//     setLoading(true);
//     try {
//       await api.post("/college-departments/", {
//         college_course: Number(selectedCourse),
//         department: Number(selectedDepartment),
//       });

//       toast.success("Department assigned to course!");
//       setSelectedCourse("");
//       setSelectedDepartment("");
//       setDepartments([]);
//       fetchCollegeDepartments();
//     } catch (err) {
//       console.error(err.response?.data);
//       toast.error(err.response?.data?.detail || "Failed to assign department");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mt-7 flex items-center justify-center px-4">
//       <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg">
//         <h1 className="text-2xl font-bold text-center mb-6">
//           Assign Department to Course
//         </h1>

//         <form onSubmit={handleAssign} className="space-y-4 mb-6">
//           {/* Course Select */}
// <div>
//   <label className="block text-sm font-medium mb-1">Select Course</label>
//   <select
//     value={selectedCourse}
//     onChange={(e) => handleCourseChange(e.target.value)}
//     required
//     className="border rounded px-3 py-2 w-full"
//   >
//     <option value="">-- Choose Course --</option>
//     {courses.map((collegeCourse) => (
//       <option key={collegeCourse.id} value={collegeCourse.id}>
//         {collegeCourse.course?.name || "Unknown"}{" "}
//         ({collegeCourse.course?.university_name || "N/A"})
//       </option>
//     ))}
//   </select>
// </div>


//           {/* Department Select */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Select Department</label>
//             <select
//               value={selectedDepartment}
//               onChange={(e) => setSelectedDepartment(e.target.value)}
//               required
//               className="border rounded px-3 py-2 w-full"
//               disabled={!departments.length}
//             >
//               <option value="">-- Choose Department --</option>
//               {departments.map((dept) => (
//                 <option key={dept.id} value={dept.id}>
//                   {dept.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="flex justify-center">
//             <Button type="submit" label={loading ? "Assigning..." : "Assign"} />
//           </div>
//         </form>

//         {/* Existing Assignments */}
//         <h3 className="text-xl font-semibold mb-2">Existing Assignments</h3>
//         <table className="w-full border-collapse border">
//           <thead>
//             <tr>
//               <th className="border p-2">Course</th>
//               <th className="border p-2">Department</th>
//               <th className="border p-2">University</th>
//             </tr>
//           </thead>
//           <tbody>
//             {collegeDepartments.map((cd) => (
//               <tr key={cd.id}>
//                 <td className="border p-2">{cd.college_course?.course?.name || "N/A"}</td>
// <td className="border p-2">{cd.department_name || "N/A"}</td>
// <td className="border p-2">{cd.college_course?.course?.university_name || "N/A"}</td>

//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default CollegeCourseDepartment;



import React, { useEffect, useState } from "react";
import axios from "axios";

// Configure axios defaults
axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.headers.common["Authorization"] = `Token ${localStorage.getItem("token")}`;

const CollegeCourseDepartmentForm = () => {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [message, setMessage] = useState("");

  // Fetch available courses
  useEffect(() => {
    axios.get("/collegeapp/college-courses/")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setCourses(res.data);
        } else if (res.data.results) {
          setCourses(res.data.results);
        } else {
          setCourses([]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Fetch available departments
  useEffect(() => {
    axios.get("/api/departments/")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setDepartments(res.data);
        } else if (res.data.results) {
          setDepartments(res.data.results);
        } else {
          setDepartments([]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Handle CollegeCourse creation
  const handleAddCourse = async () => {
    try {
      const response = await axios.post("/collegeapp/college-courses/", {
        course: selectedCourse,
      });
      setMessage(`✅ Course assigned: ${response.data.course_name}`);
    } catch (error) {
      setMessage("⚠️ Error assigning course (maybe duplicate)");
    }
  };

  // Handle CollegeDepartment creation
  const handleAddDepartment = async () => {
    try {
      const response = await axios.post("/collegeapp/college-departments/", {
        college_course: selectedCourse,
        department: selectedDepartment,
      });
      setMessage(`✅ Department assigned: ${response.data.department_name}`);
    } catch (error) {
      setMessage("⚠️ Error assigning department (maybe duplicate)");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Assign Course & Department</h2>

      {/* Select Course */}
      <label className="block mb-2 font-semibold">Select Course</label>
      <select
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="">-- Select Course --</option>
        {Array.isArray(courses) &&
          courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
      </select>
      <button
        onClick={handleAddCourse}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-6"
      >
        Add Course
      </button>

      {/* Select Department */}
      <label className="block mb-2 font-semibold">Select Department</label>
      <select
        value={selectedDepartment}
        onChange={(e) => setSelectedDepartment(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="">-- Select Department --</option>
        {Array.isArray(departments) &&
          departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
      </select>
      <button
        onClick={handleAddDepartment}
        className="bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        Add Department
      </button>

      {/* Message */}
      {message && <p className="mt-4 text-center font-semibold">{message}</p>}
    </div>
  );
};

export default CollegeCourseDepartmentForm;
