import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from '../Input';

function SubjectForm() {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [file, setFile] = useState(null);
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [filteredSemesters, setFilteredSemesters] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const token = localStorage.getItem('token');

  // Fetch universities
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/superadmin_app/university', {
      headers: { Authorization: `Token ${token}` }
    }).then(res => setUniversities(res.data));
  }, []);

  // Fetch courses when university is selected
  useEffect(() => {
    if (selectedUniversity) {
      axios.get(`http://127.0.0.1:8000/superadmin_app/course?university_id=${selectedUniversity}`, {
        headers: { Authorization: `Token ${token}` },
      }).then(res => setCourses(res.data));
    } else {
      setCourses([]);
    }
    setSelectedCourse('');
    setSelectedDepartment('');
    setSelectedSemester('');
  }, [selectedUniversity]);

  // Fetch all departments and semesters
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/superadmin_app/department', {
      headers: { Authorization: `Token ${token}` },
    }).then(res => setDepartments(res.data));

    axios.get('http://127.0.0.1:8000/superadmin_app/semester', {
      headers: { Authorization: `Token ${token}` },
    }).then(res => setSemesters(res.data));
  }, []);

  // Filter departments based on selected course
  useEffect(() => {
    if (selectedCourse) {
      setFilteredDepartments(departments.filter(d => d.course.id === parseInt(selectedCourse)));
    } else {
      setFilteredDepartments([]);
    }
    setSelectedDepartment('');
    setFilteredSemesters([]);
    setSelectedSemester('');
  }, [selectedCourse, departments]);

  // Filter semesters based on selected department
  useEffect(() => {
    if (selectedDepartment) {
      setFilteredSemesters(semesters.filter(s => s.department.id === parseInt(selectedDepartment)));
    } else {
      setFilteredSemesters([]);
    }
    setSelectedSemester('');
  }, [selectedDepartment, semesters]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      const response = await axios.post('http://127.0.0.1:8000/superadmin_app/subject', {
        name,
        code,
        semester_id: selectedSemester,
      }, {
        headers: { Authorization: `Token ${token}` },
      });
      setSuccess(true);
      setName('');
      setCode('');
      setSelectedUniversity('');
      setSelectedCourse('');
      setSelectedDepartment('');
      setSelectedSemester('');
    } catch (error) {
      console.error('Error creating subject:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async () => {
    if (!file || !selectedSemester) {
      setUploadError('Please select a file and semester.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('semester', selectedSemester);

    setUploading(true);
    setUploadSuccess(false);
    setUploadError('');

    try {
      const res = await axios.post(
        'http://127.0.0.1:8000/superadmin_app/subject/upload/',
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setUploadSuccess(true);
      setUploadError('');
      setFile(null);
      setFileInputKey(Date.now()); // reset input
    } catch (err) {
      setUploadError(err.response?.data?.error || 'Upload failed.');
      setUploadSuccess(false);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-7 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Create or Upload Subject</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Subject Name" placeholder="subject" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Subject Code" placeholder="MAT101" value={code} onChange={(e) => setCode(e.target.value)} required />

          {/* University */}
          <div>
            <label className="block mb-2">Select University</label>
            <select className="w-full border px-3 py-2 rounded-lg" value={selectedUniversity} onChange={(e) => setSelectedUniversity(e.target.value)} required>
              <option value="">-- Select University --</option>
              {universities.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
          </div>

          {/* Course */}
          <div>
            <label className="block mb-2">Select Course</label>
            <select className="w-full border px-3 py-2 rounded-lg" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} required>
              <option value="">-- Select Course --</option>
              {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          {/* Department */}
          <div>
            <label className="block mb-2">Select Department</label>
            <select className="w-full border px-3 py-2 rounded-lg" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)} required>
              <option value="">-- Select Department --</option>
              {filteredDepartments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>

          {/* Semester */}
          <div>
            <label className="block mb-2">Select Semester</label>
            <select className="w-full border px-3 py-2 rounded-lg" value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)} required>
              <option value="">-- Select Semester --</option>
              {filteredSemesters.map(s => <option key={s.id} value={s.id}>{s.number}</option>)}
            </select>
          </div>

          <button type="submit" className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800 w-full mt-4" disabled={loading}>
            {loading ? 'Creating...' : 'Create Subject'}
          </button>
          {success && <p className="text-green-600 text-center">Subject created successfully!</p>}
        </form>

        {/* Upload Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Upload Subjects</h2>
          <input key={fileInputKey} type="file" accept=".xlsx,.xlsm" onChange={(e) => setFile(e.target.files[0])} className="mb-3" />
          <button onClick={handleFileUpload} className="bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-600 w-full" disabled={uploading || !selectedSemester}>
            {uploading ? 'Uploading...' : 'Upload Subjects'}
          </button>
          {uploadSuccess && <p className="text-green-600 mt-2">Subjects uploaded successfully!</p>}
          {uploadError && <p className="text-red-600 mt-2">{uploadError}</p>}
        </div>
      </div>
    </div>
  );
}

export default SubjectForm;
