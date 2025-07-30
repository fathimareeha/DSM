import React, { useState } from 'react';
import Button from '../../components/common/Button';
import { toast } from 'react-toastify';

function ExamPage() {
  const [formData, setFormData] = useState({
    examName: '',
    course: '',
    semester: '',
    subject: '',
    date: '',
    time: '',
  });

  const [exams, setExams] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExam = {
      ...formData,
      id: Date.now(),
    };

    setExams((prev) => [...prev, newExam]);
    toast.success('Exam scheduled successfully!');
    setFormData({
      examName: '',
      course: '',
      semester: '',
      subject: '',
      date: '',
      time: '',
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-xl font-bold text-indigo-700 mb-6">📘 Exam Scheduling</h2>

      {/* Form to Schedule Exam */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="examName"
            value={formData.examName}
            onChange={handleChange}
            placeholder="Exam Name (e.g., Internal 1)"
            className="border px-3 py-2 rounded-md"
            required
          />

          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md"
            required
          >
            <option value="">Select Course</option>
            <option value="B.Tech">B.Tech</option>
            <option value="M.Tech">M.Tech</option>
          </select>

          <select
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md"
            required
          >
            <option value="">Select Semester</option>
            {[...Array(8)].map((_, i) => (
              <option key={i + 1} value={`Sem ${i + 1}`}>{`Sem ${i + 1}`}</option>
            ))}
          </select>

          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md"
            required
          >
            <option value="">Select Subject</option>
            <option value="Data Structures">Data Structures</option>
            <option value="DBMS">DBMS</option>
            <option value="OOP">OOP</option>
            <option value="Maths">Maths</option>
          </select>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md"
            required
          />

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md"
            required
          />
        </div>

        <div className="text-right">
          <Button label="Schedule Exam" />
        </div>
      </form>

      {/* View Scheduled Exams */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">📅 Scheduled Exams</h3>

        {exams.length === 0 ? (
          <p className="text-gray-500">No exams scheduled yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-md text-sm">
              <thead className="bg-indigo-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">#</th>
                  <th className="px-4 py-2 text-left">Exam</th>
                  <th className="px-4 py-2 text-left">Course</th>
                  <th className="px-4 py-2 text-left">Semester</th>
                  <th className="px-4 py-2 text-left">Subject</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Time</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam, index) => (
                  <tr key={exam.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{exam.examName}</td>
                    <td className="px-4 py-2">{exam.course}</td>
                    <td className="px-4 py-2">{exam.semester}</td>
                    <td className="px-4 py-2">{exam.subject}</td>
                    <td className="px-4 py-2">{exam.date}</td>
                    <td className="px-4 py-2">{exam.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExamPage;
