import React, { useState } from 'react';
import Button from '../../components/common/Button';
import { toast } from 'react-toastify';

function FacultyMarksEntry() {
  const [formData, setFormData] = useState({
    course: '',
    subject: '',
    semester: '',
    examType: '',
  });

  const [marks, setMarks] = useState({});

  const students = [
    { id: 1, name: 'Amina K.', rollno: 'CSE001' },
    { id: 2, name: 'Rahul P.', rollno: 'CSE002' },
    { id: 3, name: 'Sara A.', rollno: 'CSE003' },
    { id: 4, name: 'Faisal M.', rollno: 'CSE004' },
  ];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMarksChange = (id, value) => {
    if (value === '' || (Number(value) >= 0 && Number(value) <= 25)) {
      setMarks((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const markList = students.map((s) => ({
      ...s,
      marks: marks[s.id] || 0,
    }));
    console.log('Submitted Marks:', {
      ...formData,
      records: markList,
    });
    toast.success('Marks submitted successfully!');
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-xl font-bold text-indigo-700 mb-6">Upload Marks</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <select
          name="course"
          value={formData.course}
          onChange={handleFormChange}
          className="border px-3 py-2 rounded-md"
        >
          <option value="">Select Course</option>
          <option value="B.Tech">B.Tech</option>
          <option value="M.Tech">M.Tech</option>
        </select>

        <select
          name="subject"
          value={formData.subject}
          onChange={handleFormChange}
          className="border px-3 py-2 rounded-md"
        >
          <option value="">Select Subject</option>
          <option value="Data Structures">Data Structures</option>
          <option value="DBMS">DBMS</option>
        </select>

        <select
          name="semester"
          value={formData.semester}
          onChange={handleFormChange}
          className="border px-3 py-2 rounded-md"
        >
          <option value="">Select Semester</option>
          {[...Array(8)].map((_, i) => (
            <option key={i + 1}>{`Sem ${i + 1}`}</option>
          ))}
        </select>

        <select
          name="examType"
          value={formData.examType}
          onChange={handleFormChange}
          className="border px-3 py-2 rounded-md"
        >
          <option value="">Select Exam Type</option>
          <option value="Internal 1">Internal 1</option>
          <option value="Internal 2">Internal 2</option>
          <option value="Model Exam">Model Exam</option>
        </select>
      </div>

      {/* Marks Table */}
      <form onSubmit={handleSubmit}>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-md">
            <thead>
              <tr className="bg-indigo-100 text-sm text-gray-700">
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Roll No</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Marks (out of 25)</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.id} className="border-t text-sm hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{student.rollno}</td>
                  <td className="px-4 py-2">{student.name}</td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      min="0"
                      max="25"
                      value={marks[student.id] || ''}
                      onChange={(e) =>
                        handleMarksChange(student.id, e.target.value)
                      }
                      className="w-20 border px-2 py-1 rounded-md"
                      placeholder="0"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Submit Button */}
        <div className="mt-6 text-right">
          <Button label="Submit Marks" />
        </div>
      </form>
    </div>
  );
}

export default FacultyMarksEntry;
