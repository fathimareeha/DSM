




// import React, { useContext, useState, useEffect } from 'react';
// import Loader from '../../components/common/Loader';
// import { Authcontext } from '../../context/institution/Authcontext';
// import Inputfield from '../../components/common/Inputfield';
// import Button from '../../components/common/Button';

// function AddHod() {
//   const [username, setusername] = useState('');
//   const [email, setemail] = useState('');
//   const [password, setpassword] = useState('');
//   const [phone, setPhone] = useState('');
//   const [department, setdepartment] = useState('');
  

//   const { hod_create, departmentlist = [], department_create } = useContext(Authcontext); // ✅ fallback to []

//   // useEffect(() => {
//   //   department_create();
//   // }, []);

 

//   const handleSubmit = () => {
//     if (!username || !email || !password || !phone || !department ) {
//       return alert("Please fill in all fields.");
//     }
//     hod_create(username, email, phone, department, password);
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md border border-indigo-200">
//       <h2 className="text-2xl font-bold text-indigo-800 mb-6">➕ Add New HOD</h2>

//       <Inputfield label="username" type="text" placeholder="username" onChange={(e) => setusername(e.target.value)} required={true} />
//       <Inputfield label="email" type="email" placeholder="email" onChange={(e) => setemail(e.target.value)} required={true} />
//       <Inputfield label="password" type="password" placeholder="password" onChange={(e) => setpassword(e.target.value)} required={true} />
//       <Inputfield label="phone" type="text" placeholder="phone" onChange={(e) => setPhone(e.target.value)} required={true} />
     

//       <div className="flex flex-col mt-4">
//         <label className="mb-1 text-sm text-gray-600 capitalize">Department</label>
//         <select
//   onChange={(e) => setdepartment(e.target.value)}
//   value={department}
//   required
//   className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
// >
//   <option value="">-- Select Department --</option>
//   {Array.isArray(departmentlist) && departmentlist.length > 0 ? (
//     departmentlist.map((dep) => (
//       <option key={dep.id} value={dep.id}>
//         {dep.name}
//       </option>
//     ))
//   ) : (
//     <option disabled>Loading departments...</option>
//   )}
// </select>

//       </div>

//       <Button label={'Add HOD'} onclick={handleSubmit} />
//     </div>
//   );
// }

// export default AddHod;


// import React, { useContext, useState, useEffect } from 'react';
// import Loader from '../../components/common/Loader';
// import { Authcontext } from '../../context/institution/Authcontext';
// import Inputfield from '../../components/common/Inputfield';
// import Button from '../../components/common/Button';

// function AddHod() {
//   const [username, setusername] = useState('');
//   const [email, setemail] = useState('');
//   const [password, setpassword] = useState('');
//   const [phone, setPhone] = useState('');
//   const [department, setdepartment] = useState('');

//   const { hod_create, departmentlist = [] } = useContext(Authcontext);

//   useEffect(() => {
//     console.log("Department list:", departmentlist);
//   }, [departmentlist]);

//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevents page reload

//     console.log("Button clicked");

//     if (!username.trim() || !email.trim() || !password.trim() || !phone.trim() || !department) {
//       alert("Please fill in all fields.");
//       console.log("Missing fields:", { username, email, password, phone, department });
//       return;
//     }

//     console.log("All fields valid. Creating HOD:", {
//       username,
//       email,
//       password,
//       phone,
//       department,
//     });

//     hod_create(username, email, password, department, phone);
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md border border-indigo-200">
//       <h2 className="text-2xl font-bold text-indigo-800 mb-6">➕ Add New HOD</h2>

//       <form onSubmit={handleSubmit}>
//         <Inputfield
//   label="Username"
//   type="text"
//   placeholder="Enter username"
//   value={username}
//   onChange={(e) => setusername(e.target.value)}
//   required={true}
// />
// <Inputfield
//   label="Email"
//   type="email"
//   placeholder="Enter email"
//   value={email}
//   onChange={(e) => setemail(e.target.value)}
//   required={true}
// />
// <Inputfield
//   label="Password"
//   type="password"
//   placeholder="Enter password"
//   value={password}
//   onChange={(e) => setpassword(e.target.value)}
//   required={true}
// />
// <Inputfield
//   label="Phone"
//   type="text"
//   placeholder="Enter phone"
//   value={phone}
//   onChange={(e) => setPhone(e.target.value)}
//   required={true}
// />

        

//         <div className="flex flex-col mt-4">
//           <label className="mb-1 text-sm text-gray-600 capitalize">Department</label>
//           <select
//             onChange={(e) => setdepartment(e.target.value)}
//             value={department}
//             required
//             className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
//           >
//             <option value="">-- Select Department --</option>
//             {Array.isArray(departmentlist) && departmentlist.length > 0 ? (
//               departmentlist.map((dep) => (
//                 <option key={dep.id} value={dep.id}>
//                   {dep.name}
//                 </option>
//               ))
//             ) : (
//               <option disabled>Loading departments...</option>
//             )}
//           </select>
//         </div>

//         <Button label={'Add HOD'} type="submit" />
//       </form>
//     </div>
//   );
// }

// export default AddHod;


import React, { useContext, useState, useEffect } from 'react';
import Loader from '../../components/common/Loader';
import { Authcontext } from '../../context/institution/Authcontext';
import Inputfield from '../../components/common/Inputfield';
import Button from '../../components/common/Button';
import { toast } from 'react-toastify';

function AddHod() {
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setdepartment] = useState('');

  const { hod_create, departmentlist = [], department_create } = useContext(Authcontext);

  useEffect(() => {
    department_create();
  }, []);

  const handleSubmit = () => {
    if (!username || !email || !password || !phone || !department) {
      return alert('Please fill in all fields.');
    }

    console.log("Sending Data:", {
      username,
      email,
      password,
      phone,
      department,
    });

    hod_create(username, email, password, department, phone);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md border border-indigo-200">
      <h2 className="text-2xl font-bold text-indigo-800 mb-6">➕ Add New HOD</h2>

      <Inputfield
        label="Username"
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setusername(e.target.value)}
        required={true}
      />
      <Inputfield
        label="Email"
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
        required={true}
      />
      <Inputfield
        label="Password"
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        required={true}
      />
      <Inputfield
        label="Phone"
        type="text"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required={true}
      />

      <div className="flex flex-col mt-4">
        <label className="mb-1 text-sm text-gray-600 capitalize">Department</label>
        <select
          onChange={(e) => setdepartment(e.target.value)}
          value={department}
          required
          className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
        >
          <option value="">-- Select Department --</option>
          {Array.isArray(departmentlist) && departmentlist.length > 0 ? (
            departmentlist.map((dep) => (
              <option key={dep.id} value={dep.id}>
                {dep.name}
              </option>
            ))
          ) : (
            <option disabled>Loading departments...</option>
          )}
        </select>
      </div>

      <Button label={'Add HOD'} onclick={handleSubmit} />
    </div>
  );
}

export default AddHod;
