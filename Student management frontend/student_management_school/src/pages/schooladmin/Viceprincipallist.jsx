// src/pages/schooladmin/VicePrincipalList.jsx
import React from 'react';

const vicePrincipals = [
  { id: 1, name: 'Mr. John Smith', email: 'john.smith@example.com', phone: '123-456-7890' },
  { id: 2, name: 'Ms. Jane Doe', email: 'jane.doe@example.com', phone: '987-654-3210' },
  { id: 3, name: 'Dr. Robert Lee', email: 'robert.lee@example.com', phone: '555-333-2222' }
];

const VicePrincipalList = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Vice Principal List</h2>
      <table className="w-full border-collapse border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">#</th>
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Email</th>
            <th className="border p-2 text-left">Phone</th>
          </tr>
        </thead>
        <tbody>
          {vicePrincipals.map((vp, index) => (
            <tr key={vp.id} className="hover:bg-gray-50">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{vp.name}</td>
              <td className="border p-2">{vp.email}</td>
              <td className="border p-2">{vp.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VicePrincipalList;
