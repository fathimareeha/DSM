import React, { useEffect, useState } from "react";
import { Pencil, Trash2, UserPlus, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

function ManageFaculty() {
  const [faculties, setFaculties] = useState([]);

  const fetchFaculties = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://127.0.0.1:8000/collegeapp/faculties/",
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      setFaculties(response.data);
    } catch (error) {
      console.error("Error fetching faculties:", error);
    }
  };

  useEffect(() => {
    fetchFaculties();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Faculty?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(
          `http://127.0.0.1:8000/collegeapp/faculties/${id}/`,
          {
            headers: { Authorization: `Token ${token}` },
          }
        );
        setFaculties(faculties.filter((f) => f.id !== id));
      } catch (error) {
        console.error("Error deleting faculty:", error);
      }
    }
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manage Faculty</h2>
          <p className="text-sm text-gray-500">
            View, edit, or remove faculty members
          </p>
        </div>
        <Link
          to="/admin/faculty/add"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow hover:bg-indigo-700 transition"
        >
          <UserPlus className="w-4 h-4" />
          Add Faculty
        </Link>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden bg-white rounded-xl shadow-md border border-gray-200">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-50 text-gray-700 text-sm font-semibold border-b">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {faculties.length > 0 ? (
              faculties.map((faculty, index) => (
                <tr
                  key={faculty.id}
                  className={`hover:bg-indigo-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {faculty.username}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{faculty.email}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {faculty.department_name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{faculty.phone}</td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    {/* View Button */}
                    <Link
                      to={`/admin/viewfaculty/${faculty.id}`}
                      className="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>

                    {/* Edit Button */}
                    <Link
                      to={`/admin/editfaculty/${faculty.id}`}
                      className="p-2 rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(faculty.id)}
                      className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No Faculties found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageFaculty;
