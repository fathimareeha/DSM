import React, { useEffect, useState } from 'react';
import Inputfield from '../../components/common/Inputfield';
import Button from '../../components/common/Button';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function EditFaculty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [department, setSelectedDepartment] = useState('');
  const [deptid, setDeptid] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('http://127.0.0.1:8000/superadmin_app/department', {
      headers: { Authorization: `Token ${token}` },
    })
    .then((res) => setDeptid(res.data))
    .catch((err) => {
      console.error('Error fetching departments:', err);
      setDeptid([]);
    });

    axios.get(`http://127.0.0.1:8000/collegeapp/faculties/${id}/`, {
      headers: { Authorization: `Token ${token}` },
    })
    .then((res) => {
      const data = res.data;
      setUsername(data.username);
      setEmail(data.email);
      setPhone(data.phone);
      setSelectedDepartment(data.department); // department is just ID
    })
    .catch((err) => {
      console.error('Error fetching HOD:', err);
      toast.error('Failed to fetch HOD data');
    });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const updateData = {
      username,
      email,
      phone,
      department,
    };

    if (password.trim() !== '') {
      updateData.password = password;
    }

    try {
      await axios.put(
        `http://127.0.0.1:8000/collegeapp/faculties/${id}/`,
        updateData,
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success('HOD updated successfully');
      navigate('/admin/facultys'); // 🔁 Update route
    } catch (error) {
      console.error('Update error:', error.response?.data || error.message);
      toast.error('Failed to update HOD');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit FACULTY</h2>
      <form onSubmit={handleUpdate}>
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
          label="Phone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Inputfield
          label="Password (optional)"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Department
          </label>
          <select
            value={department}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select Department</option>
            {Array.isArray(deptid) &&
              deptid.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
          </select>
        </div>

        <Button type="submit" label="Update FACULTY" />
      </form>
    </div>
  );
}

export default EditFaculty;
