
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import Inputfield from "../../components/common/Inputfield";
// import Button from "../../components/common/Button";
// import axios from "axios";

// function AddStudent() {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phone, setPhone] = useState('');
//   const [roll_no,setrollno] = useState('')
//   const [department, setSelectedDepartment] = useState('');
//   const [deptid, setDeptid] = useState([]); // list of departments
//   const [courseid, setCouseid] = useState([]); // list of departments
//   const [semid, setSemtid] = useState([]); // list of departments
//   const [photo,setphoto] = useState(null)
//   const [address,setaddress] = useState('')


//   const [course, setSelectedCourses] = useState('');
//   const [semester, setSelectedSemesters] = useState('');

//   // Fetch dropdown data
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     console.log("Token used:", token); // ✅ See if token is null or wrong
//     axios.get('http://127.0.0.1:8000/superadmin_app/department',{
//       headers: {
//       Authorization: `Token ${token}`
//     }

//     })
//     .then((res)=>{
//       console.log("Department Data:", res.data);
//       setDeptid(res.data);

//     })
//     .catch((err) => {
//     console.error('Failed to load department:', err.response?.data || err.message || err);
//     setDeptid([]);
//   });
//   },[]);


//     // Fetch dropdown data
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     console.log("Token used:", token); // ✅ See if token is null or wrong
//     axios.get('http://127.0.0.1:8000/superadmin_app/semester',{
//       headers: {
//       Authorization: `Token ${token}`
//     }

//     })
//     .then((res)=>{
//       console.log("Department Data:", res.data);
//       setSemtid(res.data);

//     })
//     .catch((err) => {
//     console.error('Failed to load department:', err.response?.data || err.message || err);
//     setSemtid([]);
//   });
//   },[]);


//     // Fetch dropdown data
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     console.log("Token used:", token); // ✅ See if token is null or wrong
//     axios.get('http://127.0.0.1:8000/superadmin_app/course',{
//       headers: {
//       Authorization: `Token ${token}`
//     }

//     })
//     .then((res)=>{
//       console.log("Department Data:", res.data);
//       setCouseid(res.data);

//     })
//     .catch((err) => {
//     console.error('Failed to load department:', err.response?.data || err.message || err);
//     setCouseid([]);
//   });
//   },[]);




//   const hod_create = async (e) => {
//   e.preventDefault();
//   const token = localStorage.getItem("token");
  

//   try {
//     // Create FormData object
//     const formData = new FormData();
//     formData.append("username", username);
//     formData.append("email", email);
//     formData.append("password", password);
//     formData.append("phone", phone);
//     formData.append("department", department);
//     formData.append("roll_no", roll_no);
//     formData.append("address", address);
//     formData.append("course", course);
//     formData.append("semester", semester);

//     // Append photo only if selected
//     if (photo) {
//       formData.append("photo", photo);
//     }

//     const response = await axios.post(
//       "http://127.0.0.1:8000/collegeapp/students/",
//       formData,
//       {
//         headers: {
//           Authorization: `Token ${token}`,
//           "Content-Type": "multipart/form-data", // Required for FormData
//         },
//       }
//     );

//     console.log(response.data);
//     toast.success("Student Created");

//     // Clear form
//     setUsername("");
//     setEmail("");
//     setPassword("");
//     setPhone("");
//     setSelectedDepartment("");
//     setrollno("");
//     setaddress("");
//     setSelectedCourses("");
//     setSelectedSemesters("");
//     setphoto(null);

//   } catch (error) {
//     console.error(error.response?.data || error.message);
//     toast.error("Failed to create student");
//   }
// };

  
  

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md">
//       <h2 className="text-xl font-bold text-indigo-700 mb-6">Add New Student</h2>
//       <form onSubmit={hod_create} className="space-y-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <Inputfield label="Username" type="text" value={username} onChange={(e)=>setUsername(e.target.value)} />
//           <Inputfield label="Email" type="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
//           <Inputfield label="Roll No" type="text" value={roll_no} onChange={(e)=> setrollno(e.target.value)} />

//           {/* Department dropdown */}
//           <div className="flex flex-col">
//             <label className="mb-1 text-sm text-gray-600 capitalize">Department</label>
//             <select
//               name="department"
//               value={department}
//               onChange={(e)=> setSelectedDepartment(e.target.value)}
//               required
//               className="border px-3 py-2 rounded-md"
//             >
//               <option value="">Select Department</option>
//               {Array.isArray(deptid) && deptid.map((dept) => (
//     <option key={dept.id} value={dept.id}>
//       {dept.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Course dropdown */}
//           <div className="flex flex-col">
//             <label className="mb-1 text-sm text-gray-600 capitalize">Course</label>
//             <select
             
//               value={course}
//               onChange={(e)=>setSelectedCourses(e.target.value)}
//               required
//               className="border px-3 py-2 rounded-md"
//             >
//               <option value="">Select Course</option>
//               {Array.isArray(courseid) && courseid.map((course) => (
//     <option key={course.id} value={course.id}>
//       {course.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Semester dropdown */}
//           <div className="flex flex-col">
//             <label className="mb-1 text-sm text-gray-600 capitalize">Semester</label>
//             <select
             
//               value={semester}
//               onChange={(e)=>setSelectedSemesters(e.target.value)}
//               className="border px-3 py-2 rounded-md"
//             >
//               <option value="">Select Semester</option>
//               {Array.isArray(semid) && semid.map((sem) => (
//     <option key={sem.id} value={sem.id}>
//       {sem.number}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <Inputfield
//   label="Phone"
//   type="text"
//   value={phone}
//   onChange={(e) => setPhone(e.target.value)}
// />
//           <Inputfield label="Address" type="address" value={address} onChange={(e)=>setaddress(e.target.value)} />
//           <Inputfield
//       label="Password"
//       type="password"
//       value={password}
//       onChange={(e) => setPassword(e.target.value)}
// />


//           {/* Photo upload */}
//                     {/* Photo upload */}
//           <div className="flex flex-col">
//             <label className="mb-1 text-sm text-gray-600">Profile Photo</label>
//             <input
//               type="file"
//               onChange={(e) => setphoto(e.target.files[0])}
//               className="border px-3 py-2 rounded-md"
//             />
//           </div>
//         </div>

//         <div className="flex gap-4">
          
//           <Button type="submit" label="Add STUDENT" />
//         </div>
//       </form>


       
//     </div>
//   );
// }

// export default AddStudent;





// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import Inputfield from "../../components/common/Inputfield";
// import Button from "../../components/common/Button";
// import axios from "axios";

// function AddStudent() {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phone, setPhone] = useState('');
//   const [roll_no, setrollno] = useState('');
//   const [department, setSelectedDepartment] = useState('');
//   const [deptid, setDeptid] = useState([]);
//   const [courseid, setCouseid] = useState([]);
//   const [semid, setSemtid] = useState([]);
//   const [photo, setphoto] = useState(null);
//   const [address, setaddress] = useState('');
//   const [course, setSelectedCourses] = useState('');
//   const [semester, setSelectedSemesters] = useState('');
//   const [gender,setgender] = useState('')

//   // Bulk upload states
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Fetch dropdown data
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     axios.get('http://127.0.0.1:8000/superadmin_app/department', {
//       headers: { Authorization: `Token ${token}` }
//     })
//     .then((res) => setDeptid(res.data))
//     .catch(() => setDeptid([]));
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     axios.get('http://127.0.0.1:8000/superadmin_app/semester', {
//       headers: { Authorization: `Token ${token}` }
//     })
//     .then((res) => setSemtid(res.data))
//     .catch(() => setSemtid([]));
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     axios.get('http://127.0.0.1:8000/superadmin_app/course', {
//       headers: { Authorization: `Token ${token}` }
//     })
//     .then((res) => setCouseid(res.data))
//     .catch(() => setCouseid([]));
//   }, []);

//   // Create student
//   const hod_create = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");

//     try {
//       const formData = new FormData();
//       formData.append("username", username);
//       formData.append("email", email);
//       formData.append("password", password);
//       formData.append("phone", phone);
//       formData.append("department", department);
//       formData.append("roll_no", roll_no);
//       formData.append("address", address);
//       formData.append("course", course);
//       formData.append("semester", semester);
//       formData.append("gender",gender)
//       if (photo) formData.append("photo", photo);

//       await axios.post("http://127.0.0.1:8000/collegeapp/students/", formData, {
//         headers: {
//           Authorization: `Token ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       toast.success("Student Created");

//       // Clear form
//       setUsername("");
//       setEmail("");
//       setPassword("");
//       setPhone("");
//       setSelectedDepartment("");
//       setrollno("");
//       setaddress("");
//       setSelectedCourses("");
//       setSelectedSemesters("");
//       setphoto(null);
//       setgender("");

//     } catch (error) {
//       console.error(error.response?.data || error.message);
//       toast.error("Failed to create student");
//     }
//   };

//   // Bulk upload
//   const handleFileUpload = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       toast.error("Please select a file first");
//       return;
//     }

//     setLoading(true);
//     const token = localStorage.getItem("token");
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       await axios.post("http://127.0.0.1:8000/collegeapp/students/upload/", formData, {
//         headers: {
//           Authorization: `Token ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       toast.success("Students uploaded successfully");
//       setFile(null);
//     } catch (error) {
//       console.error(error.response?.data || error.message);
//       toast.error("Failed to upload students");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md">
//       <h2 className="text-xl font-bold text-indigo-700 mb-6">Add New Student</h2>
      
//       {/* Individual Student Form */}
//       <form onSubmit={hod_create} className="space-y-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <Inputfield label="Username" type="text" value={username} onChange={(e)=>setUsername(e.target.value)} />
//           <Inputfield label="Email" type="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
//           <Inputfield label="Roll No" type="text" value={roll_no} onChange={(e)=> setrollno(e.target.value)} />
//           <div className="flex flex-col">
//   <label className="mb-1 text-sm text-gray-600 capitalize">Gender</label>
//   <select
//     value={gender}
//     onChange={(e) => setgender(e.target.value)}
//     required
//     className="border px-3 py-2 rounded-md"
//   >
//     <option value="">Select Gender</option>
//     <option value="M">Male</option>
//     <option value="F">Female</option>
//     <option value="O">Other</option>
//   </select>
// </div>
//           {/* Department */}
//           <div className="flex flex-col">
//             <label className="mb-1 text-sm text-gray-600 capitalize">Department</label>
//             <select value={department} onChange={(e)=> setSelectedDepartment(e.target.value)} required className="border px-3 py-2 rounded-md">
//               <option value="">Select Department</option>
//               {Array.isArray(deptid) && deptid.map((dept) => (
//                 <option key={dept.id} value={dept.id}>{dept.name}</option>
//               ))}
//             </select>
//           </div>

//           {/* Course */}
//           <div className="flex flex-col">
//             <label className="mb-1 text-sm text-gray-600 capitalize">Course</label>
//             <select value={course} onChange={(e)=>setSelectedCourses(e.target.value)} required className="border px-3 py-2 rounded-md">
//               <option value="">Select Course</option>
//               {Array.isArray(courseid) && courseid.map((course) => (
//                 <option key={course.id} value={course.id}>{course.name}</option>
//               ))}
//             </select>
//           </div>

//           {/* Semester */}
//           <div className="flex flex-col">
//             <label className="mb-1 text-sm text-gray-600 capitalize">Semester</label>
//             <select value={semester} onChange={(e)=>setSelectedSemesters(e.target.value)} className="border px-3 py-2 rounded-md">
//               <option value="">Select Semester</option>
//               {Array.isArray(semid) && semid.map((sem) => (
//                 <option key={sem.id} value={sem.id}>{sem.number}</option>
//               ))}
//             </select>
//           </div>

//           <Inputfield label="Phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
//           <Inputfield label="Address" type="address" value={address} onChange={(e)=>setaddress(e.target.value)} />
//           <Inputfield label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

//           {/* Photo */}
//           <div className="flex flex-col">
//             <label className="mb-1 text-sm text-gray-600">Profile Photo</label>
//             <input type="file" onChange={(e) => setphoto(e.target.files[0])} className="border px-3 py-2 rounded-md" />
//           </div>
//         </div>
//         <div className="flex gap-4">
//           <Button type="submit" label="Add STUDENT" />
//         </div>
//       </form>

//       {/* Bulk Upload Form */}
//       <div className="mt-8 border-t pt-6">
//         <h3 className="text-lg font-semibold mb-4">Bulk Upload Students (Excel)</h3>
//         <form onSubmit={handleFileUpload} className="space-y-4">
//           <input type="file" accept=".xlsx" onChange={(e) => setFile(e.target.files[0])} className="border px-3 py-2 rounded-md w-full" />
//           <Button type="submit" label={loading ? "Uploading..." : "Upload Students"} disabled={loading} />
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddStudent;




import React, { useEffect, useState } from "react";
import Inputfield from "../../components/common/Inputfield";
import Button from "../../components/common/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { UserPlus, Upload } from "lucide-react";

function AddStudent() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [roll_no, setRollno] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [photo, setPhoto] = useState(null);

  const [bulkFile, setBulkFile] = useState(null); // Bulk upload file

  // Dependent dropdowns
  const [courseList, setCourseList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [semesterList, setSemesterList] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  const token = localStorage.getItem("token");

  // Load all courses at start
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/superadmin_app/course", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setCourseList(res.data))
      .catch(() => setCourseList([]));
  }, [token]);

  // Load departments when course changes
  useEffect(() => {
    if (!selectedCourse) {
      setDepartmentList([]);
      setSelectedDepartment("");
      return;
    }
    axios
      .get(
        `http://127.0.0.1:8000/superadmin_app/department?course_id=${selectedCourse}`,
        { headers: { Authorization: `Token ${token}` } }
      )
      .then((res) => setDepartmentList(res.data))
      .catch(() => setDepartmentList([]));
  }, [selectedCourse, token]);

  // Load semesters when department changes
  useEffect(() => {
    if (!selectedDepartment) {
      setSemesterList([]);
      setSelectedSemester("");
      return;
    }
    axios
      .get(
        `http://127.0.0.1:8000/superadmin_app/semester?department_id=${selectedDepartment}`,
        { headers: { Authorization: `Token ${token}` } }
      )
      .then((res) => setSemesterList(res.data))
      .catch(() => setSemesterList([]));
  }, [selectedDepartment, token]);

  // --- Single Student Form Submission ---
  const handleSingleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("roll_no", roll_no);
      formData.append("course", selectedCourse);
      formData.append("department", selectedDepartment);
      formData.append("semester", selectedSemester);
      formData.append("address", address);
      formData.append("gender", gender);
      if (photo) formData.append("photo", photo);

      await axios.post("http://127.0.0.1:8000/collegeapp/students/", formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("🎉 Student Created Successfully!");
      // Clear form
      setUsername("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRollno("");
      setSelectedCourse("");
      setSelectedDepartment("");
      setSelectedSemester("");
      setPhoto(null);
      setAddress("");
      setGender("");
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("❌ Failed to create Student");
    }
  };

  // --- Bulk Upload Form Submission ---
  const handleBulkSubmit = async (e) => {
    e.preventDefault();
    if (!bulkFile) return toast.error("Please select a file");

    const formData = new FormData();
    formData.append("file", bulkFile);

    try {
      await axios.post(
        "http://127.0.0.1:8000/collegeapp/students/upload/",
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("🎉 Students uploaded successfully!");
      setBulkFile(null);
      e.target.reset(); // clear file input
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("❌ Failed to upload students");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="bg-white shadow-xl rounded-2xl border border-gray-100 p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-sky-50 opacity-70 pointer-events-none rounded-2xl"></div>

        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-full">
              <UserPlus className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Add Student</h2>
          </div>

          {/* --- Single Student Form --- */}
          <form onSubmit={handleSingleSubmit} className="space-y-5 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Inputfield
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Inputfield
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Inputfield
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Inputfield
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Inputfield
                label="Roll No"
                value={roll_no}
                onChange={(e) => setRollno(e.target.value)}
              />
              <Inputfield
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm"
                >
                  <option value="">Select Gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm"
                >
                  <option value="">Select Course</option>
                  {courseList.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  disabled={!selectedCourse}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm disabled:bg-gray-100"
                >
                  <option value="">Select Department</option>
                  {departmentList.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  disabled={!selectedDepartment}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm disabled:bg-gray-100"
                >
                  <option value="">Select Semester</option>
                  {semesterList.map((s) => (
                    <option key={s.id} value={s.id}>{s.number}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
                <input
                  type="file"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm"
                />
              </div>
            </div>

            <Button
              type="submit"
              label="Add Student"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 rounded-xl shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
            />
          </form>

          {/* --- Bulk Upload Form --- */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-blue-600" /> Bulk Upload Students
            </h3>

            <form onSubmit={handleBulkSubmit} className="space-y-4">
              <input
                type="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={(e) => setBulkFile(e.target.files[0])}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              />
              <Button
                type="submit"
                label="Upload File"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2.5 rounded-xl shadow-md hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
              />
            </form>
            <p className="text-sm text-gray-500 mt-2">
              Accepted formats: CSV or Excel (.xlsx)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddStudent;
