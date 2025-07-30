import React, { useState } from 'react';
import Inputfield from '../../components/common/Inputfield';
import Button from '../../components/common/Button';
import { toast } from 'react-toastify';

function AddFaculty() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    facultyId: '',
    department: '',
    subjects: [],
    password: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === 'file') {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else if (name === 'subjects') {
      const selected = [...e.target.selectedOptions].map((opt) => opt.value);
      setFormData((prev) => ({
        ...prev,
        subjects: selected,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    toast.success('Faculty added successfully!');
    // TODO: send data to backend
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-xl font-bold text-indigo-700 mb-6">Add New Faculty</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Inputfield
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Inputfield
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Inputfield
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <Inputfield
            label="Faculty ID"
            name="facultyId"
            value={formData.facultyId}
            onChange={handleChange}
          />
          <Inputfield
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          {/* Department */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="border px-3 py-2 rounded-md"
            >
              <option value="">Select Department</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="MECH">MECH</option>
            </select>
          </div>

          {/* Subjects handled */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Subjects Handled</label>
            <select
              multiple
              name="subjects"
              value={formData.subjects}
              onChange={handleChange}
              className="border px-3 py-2 rounded-md h-32"
            >
              <option value="Data Structures">Data Structures</option>
              <option value="DBMS">DBMS</option>
              <option value="OOP">OOP</option>
              <option value="Digital Electronics">Digital Electronics</option>
            </select>
            <small className="text-xs text-gray-500">Hold Ctrl/Cmd to select multiple</small>
          </div>

          {/* Photo */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Profile Photo</label>
            <input
              type="file"
              name="photo"
              onChange={handleChange}
              className="border px-3 py-2 rounded-md"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button label="Add Faculty" />
          <button
            type="reset"
            onClick={() =>
              setFormData({
                name: '',
                email: '',
                phone: '',
                facultyId: '',
                department: '',
                subjects: [],
                password: '',
                photo: null,
              })
            }
            className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddFaculty;
