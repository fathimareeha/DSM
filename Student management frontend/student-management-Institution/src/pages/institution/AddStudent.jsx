// import React, { useState } from 'react';
// import { toast } from 'react-toastify';

// function AddStudent() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     rollNumber: '',
//     department: '',
//     course: '',
//     semester: '',
//     phone: '',
//     address: '',
//     password: '',
//     photo: null,
//   });

//   const departments = ['CSE', 'ECE', 'MECH', 'CIVIL'];
//   const courses = ['B.Tech', 'M.Tech', 'Diploma'];
//   const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: files ? files[0] : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Validate required fields
//     if (!formData.name || !formData.email || !formData.rollNumber || !formData.department || !formData.course || !formData.semester || !formData.password) {
//       toast.error('Please fill all required fields.');
//       return;
//     }
//     // Simulate form submission (can be replaced with fetch/axios call)
//     console.log('Student Data:', formData);
//     toast.success('Student added successfully!');
//     // Reset form
//     setFormData({
//       name: '', email: '', rollNumber: '', department: '', course: '', semester: '', phone: '', address: '', password: '', photo: null
//     });
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl">
//       <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Add New Student</h2>
//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

//         <div>
//           <label className="block mb-1 text-sm">Full Name *</label>
//           <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
//         </div>

//         <div>
//           <label className="block mb-1 text-sm">Email *</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
//         </div>

//         <div>
//           <label className="block mb-1 text-sm">Roll Number *</label>
//           <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
//         </div>

//         <div>
//           <label className="block mb-1 text-sm">Phone Number</label>
//           <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full border rounded px-3 py-2" />
//         </div>

//         <div>
//           <label className="block mb-1 text-sm">Department *</label>
//           <select name="department" value={formData.department} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
//             <option value="">Select Department</option>
//             {departments.map((d, i) => <option key={i} value={d}>{d}</option>)}
//           </select>
//         </div>

//         <div>
//           <label className="block mb-1 text-sm">Course *</label>
//           <select name="course" value={formData.course} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
//             <option value="">Select Course</option>
//             {courses.map((c, i) => <option key={i} value={c}>{c}</option>)}
//           </select>
//         </div>

//         <div>
//           <label className="block mb-1 text-sm">Semester *</label>
//           <select name="semester" value={formData.semester} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
//             <option value="">Select Semester</option>
//             {semesters.map((s, i) => <option key={i} value={s}>{s}</option>)}
//           </select>
//         </div>

//         <div>
//           <label className="block mb-1 text-sm">Address</label>
//           <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border rounded px-3 py-2" />
//         </div>

//         <div>
//           <label className="block mb-1 text-sm">Password *</label>
//           <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
//         </div>

//         <div className="md:col-span-2">
//           <label className="block mb-1 text-sm">Profile Photo</label>
//           <input type="file" name="photo" onChange={handleChange} className="w-full" />
//         </div>

//         <div className="md:col-span-2 flex gap-4 justify-end pt-4">
//           <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">Submit</button>
//           <button type="reset" onClick={() => setFormData({
//             name: '', email: '', rollNumber: '', department: '', course: '', semester: '', phone: '', address: '', password: '', photo: null
//           })} className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400">Reset</button>
//         </div>

//       </form>
//     </div>
//   );
// }

// export default AddStudent;


import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Inputfield from '../../components/common/Inputfield';
import Button from '../../components/common/Button';

function AddStudent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollno: '',
    department: '',
    course: '',
    semester: '',
    phone: '',
    address: '',
    password: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Student added successfully!');
    console.log(formData);
    // API call to backend goes here
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-xl font-bold text-indigo-700 mb-6">Add New Student</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Inputfield label="name" name="name" onChange={handleChange} />
          <Inputfield label="email" name="email" onChange={handleChange} />
          <Inputfield label="rollno" name="rollno" onChange={handleChange} />

          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600 capitalize">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Department</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="MECH">MECH</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600 capitalize">Course</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Course</option>
              <option value="BTech">B.Tech</option>
              <option value="MTech">M.Tech</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600 capitalize">Semester</label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Semester</option>
              {[...Array(8)].map((_, i) => (
                <option key={i + 1} value={`Sem ${i + 1}`}>{`Sem ${i + 1}`}</option>
              ))}
            </select>
          </div>

          <Inputfield label="phone" name="phone" onChange={handleChange} />
          <Inputfield label="address" name="address" onChange={handleChange} />
          <Inputfield label="password" name="password" onChange={handleChange} />

          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600 capitalize">Profile Photo</label>
            <input
              type="file"
              name="photo"
              onChange={handleChange}
              className="border px-3 py-2 rounded-md"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button label="Add Student" />
          <button
            type="reset"
            onClick={() => setFormData({
              name: '',
              email: '',
              rollno: '',
              department: '',
              course: '',
              semester: '',
              phone: '',
              address: '',
              password: '',
              photo: null,
            })}
            className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddStudent;
