


import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Inputfield from '../../components/common/Inputfield';
import Button from '../components/common/Button';

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
