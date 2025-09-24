import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, UserPlus, Trash2 } from "lucide-react";

export default function FacultyList() {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/collegeapp/faculties/", {
          headers: { Authorization: `Token ${token}` },
        });
        setFacultyList(res.data);
      } catch (err) {
        console.error("Error fetching faculty:", err);
        setError("Failed to load faculty list. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 animate-pulse">Loading faculty...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Faculty Members</h2>
          <p className="text-sm text-gray-500">
            View, assign, or remove faculty from your institution
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md bg-gradient-to-br from-white to-gray-50">
        <table className="min-w-full text-sm">
          <thead className="bg-gradient-to-r from-indigo-50 to-blue-50">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">#</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Phone</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Department</th>
              <th className="px-6 py-3 text-center font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {facultyList.length > 0 ? (
              facultyList.map((faculty, index) => (
                <tr key={faculty.id} className="hover:bg-gray-100/60 transition-colors">
                  <td className="px-6 py-3 text-gray-600">{index + 1}</td>
                  <td className="px-6 py-3 font-medium text-gray-800">{faculty.username}</td>
                  <td className="px-6 py-3 text-gray-600">{faculty.email}</td>
                  <td className="px-6 py-3 text-gray-600">{faculty.phone}</td>
                  <td>
                    <span className="px-3 py-1 text-xs font-medium text-indigo-800 bg-indigo-100 rounded-full">
                      {faculty.department_name}
                    </span>
                  </td>
                  <td className="px-6 py-3 flex justify-center gap-2">
                    {/* View -> Navigate to HOD Faculty Detail */}
                    <button
                      onClick={() => navigate(`/hod/faculty/${faculty.id}`)}
                      className="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {/* Assign */}
                    <button
                      onClick={() => navigate(`/hod/assign-subjects/${faculty.id}`)}
                      className="p-2 rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition"
                    >
                      <UserPlus className="w-4 h-4" />
                    </button>

                    {/* Remove */}
                    {/* <button className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition">
                      <Trash2 className="w-4 h-4" />
                    </button> */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-6 text-center text-gray-500">
                  No faculty found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
