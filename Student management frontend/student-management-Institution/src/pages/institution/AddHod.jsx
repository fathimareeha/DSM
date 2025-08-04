

// import React, { useContext, useState } from 'react';
// import Inputfield from '../../components/common/Inputfield';
// import Button from '../../components/common/Button';
// import { Authcontext } from '../../context/institution/Authcontext';

// export default function AddHod() {
  
//   const {addHod} = useContext(Authcontext)
//   const [name,setname] = useState("")
//   const [email,setemail] = useState("")
//   const [phone,setphone] = useState("")
//   const [department,setdepartment] = useState("")
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     department: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Submitted HOD:", formData);
//     // TODO: integrate with backend using axios/fetch
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md border border-indigo-200">
//       <h2 className="text-2xl font-bold text-indigo-800 mb-6">➕ Add New HOD</h2>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         <Inputfield label="name" name="name" value={formData.name} onChange={handleChange} />
//         <Inputfield label="email" name="email" value={formData.email} onChange={handleChange} />
//         <Inputfield label="phone" name="phone" value={formData.phone} onChange={handleChange} />

//         <div className="flex flex-col">
//           <label className="mb-1 text-sm text-gray-600 capitalize">Department</label>
//           <select
//             name="department"
//             value={formData.department}
//             onChange={handleChange}
//             required
//             className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
//           >
//             <option value="" disabled>-- Select Department --</option>
//             <option value="Computer Science">Computer Science</option>
//             <option value="Electronics">Electronics</option>
//             <option value="Mechanical">Mechanical</option>
//             <option value="Civil">Civil</option>
//             <option value="IT">IT</option>
//             <option value="Mathematics">Mathematics</option>
//             <option value="Physics">Physics</option>
//             <option value="Commerce">Commerce</option>
//           </select>
//         </div>

//         <Button label="Add HOD" />
//       </form>
//     </div>
//   );
// }

import React, { useContext, useState } from 'react';


import Loader from '../../components/common/Loader'; // ✅ if using Loader
import { Authcontext } from '../../context/institution/Authcontext';
import Inputfield from '../../components/common/Inputfield';
import Button from '../../components/common/Button';

function AddHod() {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setdepartment] = useState('');

  const { hod_create, loading } = useContext(Authcontext);

  const handle_submit = (e) => {
    e.preventDefault();
    console.log('submitted');
    hod_create(name, email, phone, department); // ✅ Actually send data
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md border border-indigo-200">
      <h2 className="text-2xl font-bold text-indigo-800 mb-6">➕ Add New HOD</h2>
      <form onSubmit={handle_submit} className="space-y-5">
        <Inputfield label="name" type="text" placeholder='name' onChange={(e)=> setname(e.target.value)} required={true} />
        <Inputfield label="email" type="text" placeholder="email" onChange={(e)=> setemail(e.target.value)} required={true} />
        <Inputfield label="phone" type="text" placeholder="phone" onChange={(e)=> setPhone(e.target.value)} required={true}/>
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600 capitalize">Department</label>
          <select
            onChange={(e)=> setdepartment(e.target.value)}
            required
            className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
          >
             
            <option value="" disabled>-- Select Department --</option>
            <option value="CSE">Computer Science</option>
            <option value="ECE">Electronics</option>
            <option value="ME">Mechanical</option>
            <option value="CE">Civil</option>
            <option value="EEE">Electrical</option>
          </select>
        </div>
        <Button label={loading ? <Loader /> : 'Add HOD'} type="submit" />
      </form>
    </div>
  );
}

export default AddHod;


