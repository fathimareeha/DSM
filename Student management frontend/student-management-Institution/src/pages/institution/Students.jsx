import React from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Trash2, Eye } from 'lucide-react';

const dummyStudents = [
  {
    id: 1,
    name: 'Reeha M',
    rollno: 'CS101',
    email: 'reeha@example.com',
    department: 'CSE',
    course: 'B.Tech',
    semester: 'Sem 5',
    phone: '9876543210',
    photo: 'https://i.pravatar.cc/40?img=12',
  },
  {
    id: 2,
    name: 'Adil Rahman',
    rollno: 'EC202',
    email: 'adil@example.com',
    department: 'ECE',
    course: 'B.Tech',
    semester: 'Sem 3',
    phone: '9876543211',
    photo: 'https://i.pravatar.cc/40?img=33',
  },
];

export default function Students() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-indigo-700">🎓 All Students</h2>
        <Link to="/addstudent" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          ➕ Add Student
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border rounded-xl text-sm shadow-md">
          <thead className="bg-indigo-100 text-indigo-800">
            <tr>
              <th className="p-3 text-left">Photo</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Roll No</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Semester</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyStudents.map((student) => (
              <tr key={student.id} className="border-b">
                <td className="p-3">
                  <img src={student.photo} alt="student" className="w-10 h-10 rounded-full" />
                </td>
                <td className="p-3">{student.name}</td>
                <td className="p-3">{student.rollno}</td>
                <td className="p-3">{student.email}</td>
                <td className="p-3">{student.department}</td>
                <td className="p-3">{student.semester}</td>
                <td className="p-3">{student.phone}</td>
                <td className="p-3 flex gap-2">
                  <button className="text-blue-600 hover:underline"><Eye size={16} /></button>
                  <button className="text-green-600 hover:underline"><Pencil size={16} /></button>
                  <button className="text-red-600 hover:underline"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
