import React, { useState } from 'react';
import Inputfield from '../../components/common/Inputfield';
import Button from '../../components/common/Button';

const dummyUsers = [
  { name: 'Reeha A.', role: 'Admin', email: 'reeha@college.com', phone: '9991234567', department: 'Admin' },
  { name: 'Suresh Kumar', role: 'HOD', email: 'suresh@college.com', phone: '9876543210', department: 'CSE' },
  { name: 'Anjali', role: 'Faculty', email: 'anjali@college.com', phone: '9123456789', department: 'ECE' },
  { name: 'Rahul T', role: 'Student', email: 'rahul@student.com', phone: '9988776655', department: 'MECH' },
];

function Users() {
  const [filterRole, setFilterRole] = useState('All');

  const filteredUsers = filterRole === 'All'
    ? dummyUsers
    : dummyUsers.filter(user => user.role === filterRole);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-indigo-800 mb-4">👥 Users Management</h2>

      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="border border-indigo-200 px-4 py-2 rounded-md text-sm"
          >
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="HOD">HOD</option>
            <option value="Faculty">Faculty</option>
            <option value="Student">Student</option>
          </select>
        </div>

        <Button label="Add User" />
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-md">
        <table className="min-w-full border border-indigo-200 text-sm">
          <thead className="bg-indigo-100 text-indigo-700">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Role</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Department</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3">{user.department}</td>
                <td className="p-3 space-x-2">
                  <button className="text-indigo-600 hover:underline">View</button>
                  <button className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
