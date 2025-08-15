import React, { useEffect, useState } from 'react';
import Inputfield from '../../components/common/Inputfield';
import Button from '../../components/common/Button';
import { toast } from 'react-toastify';
import axios from 'axios';

function AddFaculty() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setSelectedDepartment] = useState('');
  const [deptid, setDeptid] = useState([]); // list of departments

  useEffect(() => {
  const token = localStorage.getItem('token');
  console.log("Token used:", token); // ✅ See if token is null or wrong

  axios.get('http://127.0.0.1:8000/superadmin_app/department', {
    headers: {
      Authorization: `Token ${token}`
    }
  })
  .then((res) => {
    console.log("Department Data:", res.data);
    setDeptid(res.data);
  })
  .catch((err) => {
    console.error('Failed to load department:', err.response?.data || err.message || err);
    setDeptid([]);
  });
}, []);

  const hod_create = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/collegeapp/faculties/",
        {
          username,
          email,
          password,
          phone,
          department, // ✅ assuming backend expects department ID
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      console.log(response);
      toast.success("HOD Created");

      // Clear form
      setUsername('');
      setEmail('');
      setPassword('');
      setPhone('');
      setSelectedDepartment('');
      
    } catch (error) {
      console.log(error);
      toast.error("Failed to create HOD");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Faculty</h2>
      <form onSubmit={hod_create}>
        <Inputfield
  label="Username"
  type="text"
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
  type="text"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
/>


        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <select
  value={department}
  onChange={(e) => setSelectedDepartment(e.target.value)}
  required
  className="w-full border border-gray-300 rounded-md p-2"
>
  <option value="">Select Department</option>
  {Array.isArray(deptid) && deptid.map((dept) => (
    <option key={dept.id} value={dept.id}>
      {dept.name}
    </option>
  ))}
</select>

        </div>

        <Button type="submit" label="Add FACULTY" />
      </form>
    </div>
  );
}

export default AddFaculty;
