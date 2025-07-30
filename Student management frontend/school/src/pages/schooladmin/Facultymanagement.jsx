import React, { useState } from "react";

const ManageFaculty = () => {
  const [facultyList, setFacultyList] = useState([
    {
      id: 1,
      name: "Dr. Anjali Sharma",
      email: "anjali.sharma@example.com",
      department: "Computer Science",
    },
    {
      id: 2,
      name: "Prof. Rakesh Mehta",
      email: "rakesh.mehta@example.com",
      department: "Information Technology",
    },
    {
      id: 3,
      name: "Dr. Priya Verma",
      email: "priya.verma@example.com",
      department: "Electronics",
    },
  ]);

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this faculty?");
    if (confirm) {
      setFacultyList(facultyList.filter((f) => f.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Department Faculty</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Department</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {facultyList.map((faculty, index) => (
              <tr key={faculty.id} className="hover:bg-gray-50">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">{faculty.name}</td>
                <td className="p-3 border">{faculty.email}</td>
                <td className="p-3 border">{faculty.department}</td>
                <td className="p-3 border space-x-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                    View
                  </button>
                  <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(faculty.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {facultyList.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No faculty members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageFaculty;
