import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from '../Input';

function DepartmentForm() {
  const [name, setName] = useState('');

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const token = localStorage.getItem('token');

const [universities, setUniversities] = useState([]);
const [selectedUniversity, setSelectedUniversity] = useState('');
const [selectedCourse, setSelectedCourse] = useState('');
const [departmentName, setDepartmentName] = useState('');

useEffect(() => {
  axios.get('http://127.0.0.1:8000/superadmin_app/university', {
    headers: { Authorization: `Token ${token}` }
  })
  .then((res) => {
    setUniversities(res.data); // assuming [{id:1,name:'BCA'}, ...]
  })
  .catch((err) => console.error('Failed to load courses', err));
}, []);

useEffect(() => {
  if (selectedUniversity) {
    axios.get(`http://127.0.0.1:8000/superadmin_app/course?university_id=${selectedUniversity}`, {
      headers: { Authorization: `Token ${token}` }
    })
    .then((res) => {
      setCourses(res.data);
    })
    .catch((err) => console.error('Failed to load courses', err));
  } else {
    setCourses([]); // Clear courses if no university selected
  }
}, [selectedUniversity]);



 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/superadmin_app/department',
      {
        name: departmentName,
        course_id: selectedCourse, // ✅ This is the key
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    console.log('Department created:', response.data);
    setDepartmentName('');
    setSelectedCourse('');
    setSelectedUniversity('')
    setSuccess(true);
  } catch (error) {
    console.error('Error creating department:', error);
    setSuccess(false);
  }
};


  return (
    <div className="mt-7 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Create Department</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
  <Input
    label="Department Name"
    type="text"
    placeholder="Ex: Computer Science, Commerce"
    value={departmentName}
    onChange={(e) => setDepartmentName(e.target.value)}
    required={true}
  />
   <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Select University</label>
    <select
      value={selectedUniversity}
      onChange={(e) => setSelectedUniversity(e.target.value)}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">-- Select University --</option>
      {universities.map((uni) => (
        <option key={uni.id} value={uni.id}>{uni.name}</option>
      ))}
    </select>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Select Course</label>
    <select
      value={selectedCourse}
      onChange={(e) => setSelectedCourse(e.target.value)}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">-- Select Course --</option>
      {courses.map((course) => (
        <option key={course.id} value={course.id}>{course.name}</option>
      ))}
    </select>
  </div>

  <div className="flex justify-center">
    <button
      type="submit"
      className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition mt-5"
      disabled={loading}
    >
      {loading ? 'Creating...' : 'Create Department'}
    </button>
  </div>

  {success && (
    <p className="text-green-600 text-center mt-2">Department created successfully!</p>
  )}
</form>


      </div>
    </div>
  );
}

export default DepartmentForm;
