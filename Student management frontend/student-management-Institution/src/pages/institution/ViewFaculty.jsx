



import React, { useEffect, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ViewFaculty() {
  const [hods, setHods] = useState([]);

  const fetchHods = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/collegeapp/faculties/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setHods(response.data);
    } catch (error) {
      console.error('Error fetching HODs:', error);
    }
  };

  useEffect(() => {
    fetchHods();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this Faculty?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://127.0.0.1:8000/collegeapp/faculties/${id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setHods(hods.filter((hod) => hod.id !== id));
      } catch (error) {
        console.error('Error deleting HOD:', error);
      }
    }
  };

  return (
    <div className="p-4">

      <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-indigo-800">🎓 Manage Faculty</h2>
              <Link
                to="/admin/faculty/add"
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                ➕ Add Faculty
              </Link>
            </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-indigo-100 text-indigo-800 font-semibold">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hods.length > 0 ? (
              hods.map((hod) => (
                <tr key={hod.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{hod.username}</td>
                  <td className="px-4 py-3">{hod.email}</td>
                  <td className="px-4 py-3">{hod.department_name}</td>
                  <td className="px-4 py-3">{hod.phone}</td>
                  <td className="px-4 py-3 flex justify-center gap-2">
                    <Link
                      to={`/admin/editfaculty/${hod.id}`}
                      className="text-indigo-600 hover:underline"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(hod.id)}
                      className="text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-400">
                  No Faculty's found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewFaculty;
