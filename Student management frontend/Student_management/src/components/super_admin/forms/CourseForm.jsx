import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from '../Input';
import { useNavigate } from 'react-router-dom';

function CourseForm() {
  const [courseName, setCourseName] = useState('');
  const [file, setFile] = useState(null);
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch list of universities
    axios
      .get('http://127.0.0.1:8000/superadmin_app/university', {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setUniversities(res.data))
      .catch((err) => setError('Failed to fetch universities.'));
  }, []);

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUniversity) {
      setError('Please select a university.');
      return;
    }

    setLoading(true);
    setSuccessMessage('');
    setError('');

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/superadmin_app/course',
        {
          name: courseName,
          university: selectedUniversity, // university ID
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setSuccessMessage('Course created successfully!');
      setCourseName('');
      setSelectedUniversity('');
    } catch (err) {
      setError('Error creating course.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    setLoading(true);
    setSuccessMessage('');
    setError('');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/superadmin_app/course/upload/',
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setSuccessMessage(response.data.message || 'Courses uploaded successfully!');
      setFile(null);
    } catch (err) {
      setError('Error uploading file.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-7 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Create Course</h1>

        {/* Manual Course Form */}
        <form onSubmit={handleCourseSubmit} className="space-y-4 mb-6">
          <Input
            label="Course Name"
            type="text"
            placeholder="Ex: B.Tech, BCA"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required={true}
          />

          <div>
            <label className="block text-sm font-medium mb-1">Select University</label>
            <select
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              required
            >
              <option value="">-- Choose University --</option>
              {universities.map((uni) => (
                <option key={uni.id} value={uni.id}>
                  {uni.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Course'}
            </button>
          </div>
        </form>

        {/* Bulk Upload Form */}
        <form onSubmit={handleFileUpload} className="space-y-4">
          <label className="block text-sm font-medium">Upload Excel File (.xlsx)</label>
          <input
            type="file"
            accept=".xlsx"
            onChange={(e) => setFile(e.target.files[0])}
            className="border rounded px-2 py-1 w-full"
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload Courses'}
            </button>
          </div>
        </form>

        {/* Messages */}
        {successMessage && <p className="text-green-600 text-center mt-4">{successMessage}</p>}
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default CourseForm;
