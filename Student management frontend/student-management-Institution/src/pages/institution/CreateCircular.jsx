import React, { useState } from 'react';
import Inputfield from '../../components/common/Inputfield';
import Button from '../../components/common/Button';
import { toast } from 'react-toastify';

function CreateCircular() {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    visibility: '',
    attachment: null,
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
    toast.success('Circular created successfully!');
    console.log(formData);
    // Send to Django API here
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow">
      <h2 className="text-xl font-bold text-indigo-700 mb-6">Create Circular</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Inputfield label="Title" name="title" onChange={handleChange} />

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">Message</label>
          <textarea
            name="message"
            rows={5}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your message or description..."
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">Visibility</label>
          <select
            name="visibility"
            onChange={handleChange}
            className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Visibility</option>
            <option value="all">All Users</option>
            <option value="students">Students</option>
            <option value="faculty">Faculty</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">Attachment (optional)</label>
          <input
            type="file"
            name="attachment"
            onChange={handleChange}
            className="border px-3 py-2 rounded-md"
          />
        </div>

        <div className="flex gap-4 mt-4">
          <Button label="Create Circular" />
          <button
            type="reset"
            onClick={() =>
              setFormData({
                title: '',
                message: '',
                visibility: '',
                attachment: null,
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

export default CreateCircular;
