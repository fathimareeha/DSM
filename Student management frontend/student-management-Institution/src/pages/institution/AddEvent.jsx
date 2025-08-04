import React, { useState } from 'react';
import Inputfield from '../../components/common/Inputfield';
import Button from '../../components/common/Button';
import { toast } from 'react-toastify';

function AddEvent() {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    image: null,
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
    toast.success('Event created successfully!');
    console.log(formData);
    // API call can be added here
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow">
      <h2 className="text-xl font-bold text-indigo-700 mb-6">Add New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Inputfield label="title" name="title" onChange={handleChange} />

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600 capitalize">Event Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600 capitalize">Description</label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter event details..."
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600 capitalize">Upload Image/Brochure</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="border px-3 py-2 rounded-md"
          />
        </div>

        <div className="flex gap-4 mt-4">
          <Button label="Add Event" />
          <button
            type="reset"
            onClick={() =>
              setFormData({
                title: '',
                date: '',
                description: '',
                image: null,
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

export default AddEvent;
