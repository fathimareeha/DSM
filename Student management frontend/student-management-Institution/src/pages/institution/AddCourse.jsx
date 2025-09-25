import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CourseSelection() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const url = 'http://127.0.0.1:8000/superadmin_app/course'; // ✅ No trailing slash

    axios
      .get(url, { headers: { Authorization: `Token ${token}` } })
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load courses:', err);
        setError('Failed to load courses.');
        setLoading(false);
      });
  }, [token]);

  const handleProceed = () => {
    if (!selectedCourse) {
      setError('Please select a course.');
      return;
    }
    navigate(`/admin/departments/${selectedCourse}`);
  };

  if (loading) return <p className="mt-7 text-center">Loading courses...</p>;

  return (
    <div className="mt-7 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Select Course</h1>

        {error && <p className="text-red-600 text-center mb-3">{error}</p>}

        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="border rounded px-3 py-2 w-full mb-4"
        >
          <option value="">-- Choose Course --</option>
          {courses.length > 0 ? (
            courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))
          ) : (
            <option disabled>No courses available</option>
          )}
        </select>

        <button
          onClick={handleProceed}
          className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition w-full"
        >
          Proceed to Department 
        </button>
      </div>
    </div>
  );
}

export default CourseSelection;



