import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

function StaffList() {
  const [staffs, setStaffs] = useState([]);

  const fetchStaffs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:8000/schoolapp/staffs/", {
        headers: { Authorization: `Token ${token}` },
      });
      setStaffs(response.data);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Staff?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://127.0.0.1:8000/schoolapp/staffsdetail/${id}/`,
        { headers: { Authorization: `Token ${token}` } }
      );

      console.log("Delete response:", response.status, response.data);
      setStaffs(prev => prev.filter(staff => staff.id !== id));

    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.status, error.response.data);
        alert(`Failed to delete staff: ${error.response.status}`);
      } else {
        console.error("Network/Error:", error.message);
        alert("Failed to delete staff: " + error.message);
      }
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-800">👥 Manage Staff</h2>
        <Link
          to="/admin/staffs/add"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          ➕ Add Staff
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-indigo-100 text-indigo-800 font-semibold">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffs.length > 0 ? (
              staffs.map((staff) => (
                <tr key={staff.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{staff.id}</td>
                  <td className="px-4 py-3">{staff.user_username}</td>
                  <td className="px-4 py-3">{staff.user_email}</td>
                  <td className="px-4 py-3 capitalize">{staff.staffs_role}</td>
                  <td className="px-4 py-3 flex justify-center gap-2">
                    <Link
                      to={`/admin/view/staffs/${staff.id}`}
                      className="text-green-600 hover:underline"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link
                      to={`/admin/edit/staffs/${staff.id}`}
                      className="text-indigo-600 hover:underline"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(staff.id)}
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
                  No staff found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StaffList;
