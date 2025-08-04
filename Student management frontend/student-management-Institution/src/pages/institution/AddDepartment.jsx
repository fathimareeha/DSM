import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Inputfield from '../../components/common/Inputfield';
import Button from '../../components/common/Button';

function AddDepartment() {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
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
    toast.success('Department added successfully!');
    console.log(formData);
    // TODO: API call to backend to save department
  };

  const handleReset = () => {
    setFormData({
      name: '',
      code: '',
      description: '',
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-xl font-bold text-indigo-700 mb-6">Add New Department</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Inputfield
          label="Department Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <Inputfield
          label="Department Code"
          name="code"
          value={formData.code}
          onChange={handleChange}
        />
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600 capitalize">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="flex gap-4">
          <Button label="Add Department" />
          <button
            type="reset"
            onClick={handleReset}
            className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddDepartment;
