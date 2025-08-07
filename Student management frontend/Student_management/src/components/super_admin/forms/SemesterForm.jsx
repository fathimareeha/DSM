import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from '../Input';

function SemesterForm() {
  const [number, setNumber] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const token = localStorage.getItem('token');


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
      headers: { Authorization: `Token ${token}` },
    })
    .then(res => setCourses(res.data))
    .catch(err => console.error('Failed to load courses', err));
  } else {
    setCourses([]);
  }
  setSelectedCourse('');
  setSelectedDepartment('');
}, [selectedUniversity]);


    // Fetch departments
  useEffect(() => {
  axios.get('http://127.0.0.1:8000/superadmin_app/department', {
    headers: { Authorization: `Token ${token}` },
  })
  .then(res => setDepartments(res.data))
  .catch(err => console.error('Failed to load departments', err));
}, []);


  // Filter departments based on selected course
  useEffect(() => {
    if (selectedCourse) {
      const filtered = departments.filter(
        dept => dept.course.id === parseInt(selectedCourse)
      );
      setFilteredDepartments(filtered);
    } else {
      setFilteredDepartments([]);
    }
    setSelectedDepartment('');
  }, [selectedCourse, departments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/superadmin_app/semester',
        {
          number,
          department_id: selectedDepartment,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log('✅ Semester created successfully',response.data);
      setSuccess(true);
      setNumber('');
      setSelectedCourse('');
      setSelectedDepartment('');
      setSelectedUniversity('')
    } catch (error) {
      console.error('Error creating semester:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-7 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Create Semester</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Semester"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Ex: Semester 1"
            required
          />
 {/* University Select */}
          <div>
            <label className="block mb-2">Select University</label>
            <select
              className="w-full border px-3 py-2 rounded-lg"
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
              required
            >
              <option value="">-- Select University --</option>
              {universities.map((uni) => (
                <option key={uni.id} value={uni.id}>
                  {uni.name}
                </option>
              ))}
            </select>
          </div>
          {/* Course Select */}
          <div>
            <label className="block mb-2">Select Course</label>
            <select
              className="w-full border px-3 py-2 rounded-lg"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              required
            >
              <option value="">-- Select Course --</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          {/* Department Select */}
          <div>
            <label className="block mb-2">Select Department</label>
            <select
              className="w-full border px-3 py-2 rounded-lg"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              required
              disabled={!selectedCourse}
            >
              <option value="">-- Select Department --</option>
              {filteredDepartments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition mt-5"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Semester'}
            </button>
          </div>
          {success && (
            <p className="text-green-600 text-center mt-2">Semester created successfully!</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default SemesterForm;
