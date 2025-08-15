
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





import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Inputfield from "../../components/common/Inputfield";
import Button from "../../components/common/Button";
import axios from "axios";

function AddStudent() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [roll_no, setrollno] = useState('');
  const [department, setSelectedDepartment] = useState('');
  const [deptid, setDeptid] = useState([]);
  const [courseid, setCouseid] = useState([]);
  const [semid, setSemtid] = useState([]);
  const [photo, setphoto] = useState(null);
  const [address, setaddress] = useState('');
  const [course, setSelectedCourses] = useState('');
  const [semester, setSelectedSemesters] = useState('');
  const [gender,setgender] = useState('')

  // Bulk upload states
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch dropdown data
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get('http://127.0.0.1:8000/superadmin_app/department', {
      headers: { Authorization: `Token ${token}` }
    })
    .then((res) => setDeptid(res.data))
    .catch(() => setDeptid([]));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get('http://127.0.0.1:8000/superadmin_app/semester', {
      headers: { Authorization: `Token ${token}` }
    })
    .then((res) => setSemtid(res.data))
    .catch(() => setSemtid([]));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get('http://127.0.0.1:8000/superadmin_app/course', {
      headers: { Authorization: `Token ${token}` }
    })
    .then((res) => setCouseid(res.data))
    .catch(() => setCouseid([]));
  }, []);

  // Create student
  const hod_create = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("department", department);
      formData.append("roll_no", roll_no);
      formData.append("address", address);
      formData.append("course", course);
      formData.append("semester", semester);
      formData.append("gender",gender)
      if (photo) formData.append("photo", photo);

      await axios.post("http://127.0.0.1:8000/collegeapp/students/", formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Student Created");

      // Clear form
      setUsername("");
      setEmail("");
      setPassword("");
      setPhone("");
      setSelectedDepartment("");
      setrollno("");
      setaddress("");
      setSelectedCourses("");
      setSelectedSemesters("");
      setphoto(null);
      setgender("");

    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Failed to create student");
    }
  };

  // Bulk upload
  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://127.0.0.1:8000/collegeapp/students/upload/", formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Students uploaded successfully");
      setFile(null);
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Failed to upload students");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-xl font-bold text-indigo-700 mb-6">Add New Student</h2>
      
      {/* Individual Student Form */}
      <form onSubmit={hod_create} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Inputfield label="Username" type="text" value={username} onChange={(e)=>setUsername(e.target.value)} />
          <Inputfield label="Email" type="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
          <Inputfield label="Roll No" type="text" value={roll_no} onChange={(e)=> setrollno(e.target.value)} />
          <div className="flex flex-col">
  <label className="mb-1 text-sm text-gray-600 capitalize">Gender</label>
  <select
    value={gender}
    onChange={(e) => setgender(e.target.value)}
    required
    className="border px-3 py-2 rounded-md"
  >
    <option value="">Select Gender</option>
    <option value="M">Male</option>
    <option value="F">Female</option>
    <option value="O">Other</option>
  </select>
</div>
          {/* Department */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600 capitalize">Department</label>
            <select value={department} onChange={(e)=> setSelectedDepartment(e.target.value)} required className="border px-3 py-2 rounded-md">
              <option value="">Select Department</option>
              {Array.isArray(deptid) && deptid.map((dept) => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
          </div>

          {/* Course */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600 capitalize">Course</label>
            <select value={course} onChange={(e)=>setSelectedCourses(e.target.value)} required className="border px-3 py-2 rounded-md">
              <option value="">Select Course</option>
              {Array.isArray(courseid) && courseid.map((course) => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </div>

          {/* Semester */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600 capitalize">Semester</label>
            <select value={semester} onChange={(e)=>setSelectedSemesters(e.target.value)} className="border px-3 py-2 rounded-md">
              <option value="">Select Semester</option>
              {Array.isArray(semid) && semid.map((sem) => (
                <option key={sem.id} value={sem.id}>{sem.number}</option>
              ))}
            </select>
          </div>

          <Inputfield label="Phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <Inputfield label="Address" type="address" value={address} onChange={(e)=>setaddress(e.target.value)} />
          <Inputfield label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          {/* Photo */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Profile Photo</label>
            <input type="file" onChange={(e) => setphoto(e.target.files[0])} className="border px-3 py-2 rounded-md" />
          </div>
        </div>
        <div className="flex gap-4">
          <Button type="submit" label="Add STUDENT" />
        </div>
      </form>

      {/* Bulk Upload Form */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Bulk Upload Students (Excel)</h3>
        <form onSubmit={handleFileUpload} className="space-y-4">
          <input type="file" accept=".xlsx" onChange={(e) => setFile(e.target.files[0])} className="border px-3 py-2 rounded-md w-full" />
          <Button type="submit" label={loading ? "Uploading..." : "Upload Students"} disabled={loading} />
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
