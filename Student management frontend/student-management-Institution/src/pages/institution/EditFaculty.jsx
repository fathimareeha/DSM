// import React, { useEffect, useState } from 'react';
// import Inputfield from '../../components/common/Inputfield';
// import Button from '../../components/common/Button';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// function EditFaculty() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [department, setSelectedDepartment] = useState('');
//   const [deptid, setDeptid] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     axios.get('http://127.0.0.1:8000/superadmin_app/department', {
//       headers: { Authorization: `Token ${token}` },
//     })
//     .then((res) => setDeptid(res.data))
//     .catch((err) => {
//       console.error('Error fetching departments:', err);
//       setDeptid([]);
//     });

//     axios.get(`http://127.0.0.1:8000/collegeapp/faculties/${id}/`, {
//       headers: { Authorization: `Token ${token}` },
//     })
//     .then((res) => {
//       const data = res.data;
//       setUsername(data.username);
//       setEmail(data.email);
//       setPhone(data.phone);
//       setSelectedDepartment(data.department); // department is just ID
//     })
//     .catch((err) => {
//       console.error('Error fetching HOD:', err);
//       toast.error('Failed to fetch HOD data');
//     });
//   }, [id]);

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');

//     const updateData = {
//       username,
//       email,
//       phone,
//       department,
//     };

//     if (password.trim() !== '') {
//       updateData.password = password;
//     }

//     try {
//       await axios.put(
//         `http://127.0.0.1:8000/collegeapp/faculties/${id}/`,
//         updateData,
//         {
//           headers: {
//             Authorization: `Token ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       toast.success('HOD updated successfully');
//       navigate('/admin/facultys'); // 🔁 Update route
//     } catch (error) {
//       console.error('Update error:', error.response?.data || error.message);
//       toast.error('Failed to update HOD');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
//       <h2 className="text-2xl font-bold mb-4 text-center">Edit FACULTY</h2>
//       <form onSubmit={handleUpdate}>
//         <Inputfield
//           label="Username"
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <Inputfield
//           label="Email"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <Inputfield
//           label="Phone"
//           type="text"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//         />
//         <Inputfield
//           label="Password (optional)"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Department
//           </label>
//           <select
//             value={department}
//             onChange={(e) => setSelectedDepartment(e.target.value)}
//             required
//             className="w-full border border-gray-300 rounded-md p-2"
//           >
//             <option value="">Select Department</option>
//             {Array.isArray(deptid) &&
//               deptid.map((dept) => (
//                 <option key={dept.id} value={dept.id}>
//                   {dept.name}
//                 </option>
//               ))}
//           </select>
//         </div>

//         <Button type="submit" label="Update FACULTY" />
//       </form>
//     </div>
//   );
// }

// export default EditFaculty;



// src/pages/admin/EditFaculty.jsx
import React, { useEffect, useState } from "react";
import Inputfield from "../../components/common/Inputfield";
import Button from "../../components/common/Button";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { User, Mail, Phone, Lock, GraduationCap, Edit3 } from "lucide-react";

function EditFaculty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [department, setSelectedDepartment] = useState("");
  const [deptid, setDeptid] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch departments
    axios
      .get("http://127.0.0.1:8000/superadmin_app/department", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setDeptid(res.data))
      .catch((err) => {
        console.error("Error fetching departments:", err);
        setDeptid([]);
      });

    // Fetch faculty details
    axios
      .get(`http://127.0.0.1:8000/collegeapp/faculties/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        const data = res.data;
        setUsername(data.username);
        setEmail(data.email);
        setPhone(data.phone);
        setSelectedDepartment(data.department);
      })
      .catch((err) => {
        console.error("Error fetching Faculty:", err);
        toast.error("Failed to fetch Faculty data");
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const updateData = { username, email, phone, department };
    if (password.trim() !== "") updateData.password = password;

    try {
      await axios.put(
        `http://127.0.0.1:8000/collegeapp/faculties/${id}/`,
        updateData,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("✅ Faculty updated successfully");
      navigate("/admin/facultys"); // update route if needed
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
      toast.error("❌ Failed to update Faculty");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white shadow-xl rounded-2xl border border-gray-100 p-8 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 opacity-70 pointer-events-none rounded-2xl z-0"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-indigo-100 p-3 rounded-full">
              <Edit3 className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Edit Faculty</h2>
          </div>

          {/* Form */}
          <form onSubmit={handleUpdate} className="space-y-5">
            {/* Username */}
            <div className="relative">
              <Inputfield
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Email */}
            <div className="relative">
              <Inputfield
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Phone */}
            <div className="relative">
              <Inputfield
                label="Phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Password */}
            <div className="relative">
              <Inputfield
                label="Password (optional)"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <div className="relative">
                <select
                  value={department}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none shadow-sm"
                >
                  <option value="">Select Department</option>
                  {Array.isArray(deptid) &&
                    deptid.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                </select>
                <GraduationCap className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                label="Update Faculty"
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2.5 rounded-xl shadow-md hover:from-indigo-600 hover:to-purple-700 transition-all duration-200"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditFaculty;
