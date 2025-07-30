import React, { useEffect, useState } from 'react';

function ViewDepartments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    const staticDepartments = [
      {
        id: 1,
        name: 'Computer Science',
        code: 'CSE',
        description: 'Department of Computer Science and Engineering',
      },
      {
        id: 2,
        name: 'Electronics',
        code: 'ECE',
        description: 'Department of Electronics and Communication Engineering',
      },
      {
        id: 3,
        name: 'Mechanical',
        code: 'MECH',
        description: 'Department of Mechanical Engineering',
      },
    ];

    // simulate delay
    setTimeout(() => {
      setDepartments(staticDepartments);
      setLoading(false);
    }, 500); // half second delay
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-xl font-bold text-indigo-700 mb-6">Departments List</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : departments.length === 0 ? (
        <p className="text-center text-gray-500">No departments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-md">
            <thead>
              <tr className="bg-indigo-100">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">#</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Code</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Description</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept, index) => (
                <tr key={dept.id} className="border-t">
                  <td className="px-4 py-2 text-sm">{index + 1}</td>
                  <td className="px-4 py-2 text-sm">{dept.name}</td>
                  <td className="px-4 py-2 text-sm">{dept.code}</td>
                  <td className="px-4 py-2 text-sm">{dept.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ViewDepartments;
