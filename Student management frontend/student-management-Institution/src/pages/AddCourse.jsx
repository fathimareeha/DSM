import React, { useState } from 'react';
import Inputfield from '../../components/common/Inputfield';
import Button from '../components/common/Button';
import { toast } from 'react-toastify';

function AddCourse() {
  const [formData, setFormData] = useState({
    courseName: '',
    department: '',
    duration: '',
    semesters: '',
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
    toast.success('Course added successfully!');
    console.log(formData);
    // You can connect to your Django backend here
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-xl font-bold text-indigo-700 mb-6">Add New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Inputfield label="Course Name" name="courseName" onChange={handleChange} />
        <Inputfield label="Department" name="department" onChange={handleChange} />
        <Inputfield label="Duration (Years)" name="duration" onChange={handleChange} />
        <Inputfield label="No. of Semesters" name="semesters" onChange={handleChange} />

        <div className="flex gap-4 mt-4">
          <Button label="Add Course" />
          <button
            type="reset"
            onClick={() =>
              setFormData({
                courseName: '',
                department: '',
                duration: '',
                semesters: '',
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

export default AddCourse;
