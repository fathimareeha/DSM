import React from 'react';

const courses = [
  {
    name: 'Computer Science Engineering',
    code: 'CSE101',
    department: 'CSE',
    semester: 'Sem 1 - Sem 8',
  },
  {
    name: 'Electronics & Communication',
    code: 'ECE201',
    department: 'ECE',
    semester: 'Sem 1 - Sem 8',
  },
  // 🔁 This would later come from backend API
];

function ViewCourses() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-indigo-800 mb-6">📘 All Courses</h2>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-left border border-indigo-200">
          <thead className="bg-indigo-100 text-indigo-700">
            <tr>
              <th className="p-3 border">Course Name</th>
              <th className="p-3 border">Code</th>
              <th className="p-3 border">Department</th>
              <th className="p-3 border">Semester</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-3">{course.name}</td>
                <td className="p-3">{course.code}</td>
                <td className="p-3">{course.department}</td>
                <td className="p-3">{course.semester}</td>
                <td className="p-3 space-x-2">
                  <button className="text-sm text-blue-600 hover:underline">Edit</button>
                  <button className="text-sm text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewCourses;
