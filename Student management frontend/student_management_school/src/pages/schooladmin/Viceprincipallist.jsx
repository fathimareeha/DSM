import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";

function VicePrincipalList() {
  const [vicePrincipals, setVicePrincipals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVicePrincipals = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/schoolapp/createvp/",
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      console.log("VP list:", response.data); // 👈 check if id or vp_id
      setVicePrincipals(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load Vice Principals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVicePrincipals();
  }, []);

  const deleteVP = async (id) => {
    if (window.confirm("Are you sure you want to delete this VP?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://127.0.0.1:8000/schoolapp/vpdetails/${id}/`, {
          headers: { Authorization: `Token ${token}` },
        });
        toast.success("Vice Principal deleted");

        // ✅ Use vp.id if API returns `id`, otherwise vp.vp_id
        setVicePrincipals((prev) =>
          prev.filter((vp) => (vp.vp_id || vp.id) !== id)
        );
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete VP");
      }
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-6">Loading...</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-indigo-700">
          Manage Vice Principals
        </h2>
        <Link
          to="/admin/add/viceprincipal"
          className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition text-base font-medium"
        >
          <Plus className="w-5 h-5" /> Add Vice Principal
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        {vicePrincipals.length === 0 ? (
          <p className="text-center py-6 text-gray-400 italic">
            No Vice Principals found.
          </p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-indigo-600 text-white text-lg">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Profile</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vicePrincipals.map((vp, index) => (
                <tr
                  key={vp.vp_id || vp.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-indigo-50 transition`}
                >
                  <td className="px-6 py-4">{vp.vp_id || vp.id}</td>
                  <td className="px-6 py-4">
                    <img
                      src={vp.profile_picture || "https://via.placeholder.com/50"}
                      alt={vp.username}
                      className="w-12 h-12 rounded-full object-cover border"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium">{vp.username}</td>
                  <td className="px-6 py-4">{vp.email}</td>
                  <td className="px-6 py-4">{vp.phone}</td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <Link
                      to={`/admin/edit/viceprincipal/${vp.vp_id || vp.id}`}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm font-medium"
                    >
                      <Pencil className="w-4 h-4" /> Edit
                    </Link>
                    <button
                      onClick={() => deleteVP(vp.vp_id || vp.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default VicePrincipalList;
