// import React from 'react'

// function AddHod() {
//   return (
//     <div>AddHod</div>
    
//   )
// }

// export default AddHod



// import React, { useState } from 'react';

// export default function AddHod() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     department: '',
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Submitted HOD:", formData);
//     // 👉 Here you can integrate with Django backend using axios/fetch
//     // axios.post('/api/hods/', formData)
//     //      .then(res => alert("HOD added"))
//     //      .catch(err => console.error(err));
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md border border-indigo-200">
//       <h2 className="text-2xl font-bold text-indigo-800 mb-6">➕ Add New HOD</h2>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         <div>
//           <label className="block mb-1 text-sm text-gray-600">Full Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 text-sm text-gray-600">Email Address</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 text-sm text-gray-600">Phone Number</label>
//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           />
//         </div>

//         <div>
//   <label className="block mb-1 text-sm text-gray-600">Department</label>
//   <select
//     name="department"
//     value={formData.department}
//     onChange={handleChange}
//     required
//     className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
//   >
//     <option value="" disabled>
//       -- Select Department --
//     </option>
//     <option value="Computer Science">Computer Science</option>
//     <option value="Electronics">Electronics</option>
//     <option value="Mechanical">Mechanical</option>
//     <option value="Civil">Civil</option>
//     <option value="IT">IT</option>
//     <option value="Mathematics">Mathematics</option>
//     <option value="Physics">Physics</option>
//     <option value="Commerce">Commerce</option>
//     {/* You can add more as needed */}
//   </select>
// </div>


//         <button
//           type="submit"
//           className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
//         >
//           Add HOD
//         </button>
//       </form>
//     </div>
//   );
// }



import React, { useState } from 'react';
import Inputfield from '../../components/common/Inputfield';
import Button from '../components/common/Button';

export default function AddHod() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted HOD:", formData);
    // TODO: integrate with backend using axios/fetch
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md border border-indigo-200">
      <h2 className="text-2xl font-bold text-indigo-800 mb-6">➕ Add New HOD</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Inputfield label="name" name="name" value={formData.name} onChange={handleChange} />
        <Inputfield label="email" name="email" value={formData.email} onChange={handleChange} />
        <Inputfield label="phone" name="phone" value={formData.phone} onChange={handleChange} />

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600 capitalize">Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
          >
            <option value="" disabled>-- Select Department --</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Electronics">Electronics</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
            <option value="IT">IT</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Commerce">Commerce</option>
          </select>
        </div>

        <Button label="Add HOD" />
      </form>
    </div>
  );
}

