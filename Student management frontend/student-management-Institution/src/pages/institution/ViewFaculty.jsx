import React, { useEffect, useState } from 'react';

function ViewFaculty() {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const staticFaculty = [
      {
        id: 1,
        name: 'Dr. Ayesha Rahman',
        email: 'ayesha@college.edu',
        phone: '9876543210',
        department: 'Computer Science',
        designation: 'Associate Professor',
      },
      {
        id: 2,
        name: 'Mr. Ravi Kumar',
        email: 'ravi@college.edu',
        phone: '9123456780',
        department: 'Electronics',
        designation: 'Assistant Professor',
      },
      {
        id: 3,
        name: 'Ms. Sneha Patel',
        email: 'sneha@college.edu',
        phone: '9988776655',
        department: 'Mechanical',
        designation: 'Lecturer',
      },
    ];

    setTimeout(() => {
      setFacultyList(staticFaculty);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-xl font-bold text-indigo-700 mb-6">Faculty List</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : facultyList.length === 0 ? (
        <p className="text-center text-gray-500">No faculty found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-md">
            <thead>
              <tr className="bg-indigo-100">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">#</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Phone</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Department</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Designation</th>
              </tr>
            </thead>
            <tbody>
              {facultyList.map((faculty, index) => (
                <tr key={faculty.id} className="border-t">
                  <td className="px-4 py-2 text-sm">{index + 1}</td>
                  <td className="px-4 py-2 text-sm">{faculty.name}</td>
                  <td className="px-4 py-2 text-sm">{faculty.email}</td>
                  <td className="px-4 py-2 text-sm">{faculty.phone}</td>
                  <td className="px-4 py-2 text-sm">{faculty.department}</td>
                  <td className="px-4 py-2 text-sm">{faculty.designation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ViewFaculty;
