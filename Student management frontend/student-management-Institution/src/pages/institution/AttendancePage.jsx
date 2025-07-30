import React, { useState } from 'react';
import Button from '../../components/common/Button';
import { toast } from 'react-toastify';

function AttendancePage() {
  const [attendance, setAttendance] = useState({});

  // Static student list (can be fetched later from backend)
  const students = [
    { id: 1, name: 'Amina K.', rollno: 'CSE001' },
    { id: 2, name: 'Rahul P.', rollno: 'CSE002' },
    { id: 3, name: 'Sara A.', rollno: 'CSE003' },
    { id: 4, name: 'Faisal M.', rollno: 'CSE004' },
  ];

  const handleCheckboxChange = (id) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const presentStudents = students.filter((s) => attendance[s.id]);
    console.log('Present Students:', presentStudents);
    toast.success('Attendance submitted successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-xl font-bold text-indigo-700 mb-6">Mark Attendance</h2>

      <form onSubmit={handleSubmit}>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-indigo-100 text-sm text-gray-700">
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Roll No</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Present</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.id} className="border-t text-sm">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{student.rollno}</td>
                  <td className="px-4 py-2">{student.name}</td>
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={!!attendance[student.id]}
                      onChange={() => handleCheckboxChange(student.id)}
                      className="w-4 h-4"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <Button label="Submit Attendance" />
        </div>
      </form>
    </div>
  );
}

export default AttendancePage;
