import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Inputfield from '../../components/common/Inputfield';
import Button from '../../components/common/Button';

function SubjectAllocation() {
  const [formData, setFormData] = useState({
    faculty: '',
    subject: '',
    department: '',
    semester: '',
  });

  const facultyList = [
    { id: 1, name: 'Dr. Ayesha Rahman' },
    { id: 2, name: 'Mr. Ravi Kumar' },
    { id: 3, name: 'Ms. Sneha Patel' },
  ];

  const subjectList = [
    'Data Structures',
    'Digital Electronics',
    'Thermodynamics',
    'Operating Systems',
    'Embedded Systems',
  ];

  const departmentList = ['CSE', 'ECE', 'MECH'];
  const semesterList = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    toast.success('Subject allocated successfully!');
    // TODO: Send data to backend if needed
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-xl font-bold text-indigo-700 mb-6">Subject Allocation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Faculty Dropdown */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Faculty</label>
            <select
              name="faculty"
              value={formData.faculty}
              onChange={handleChange}
              className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Faculty</option>
              {facultyList.map((f) => (
                <option key={f.id} value={f.name}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subject Dropdown */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Subject</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Subject</option>
              {subjectList.map((subj, i) => (
                <option key={i} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
          </div>

          {/* Department Dropdown */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Department</option>
              {departmentList.map((dept, i) => (
                <option key={i} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Semester Dropdown */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Semester</label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Semester</option>
              {semesterList.map((sem, i) => (
                <option key={i} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <Button label="Allocate Subject" />
          <button
            type="reset"
            onClick={() =>
              setFormData({ faculty: '', subject: '', department: '', semester: '' })
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

export default SubjectAllocation;
