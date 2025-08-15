import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/institution/Authcontext";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

function VicePrincipalList() {
  const { VpList, setVpList, token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  // Fetch Vice Principals
  const fetchVicePrincipals = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/schoolapp/createvp/",
        { headers: { Authorization: `Token ${token}` } }
      );
      console.log("Fetched VPs:", response.data); // <-- see structure here
      setVpList(response.data);
    } catch (error) {
      console.error("Error fetching Vice Principals:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchVicePrincipals();
  }, [token]);

  // Delete a Vice Principal
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this VP?")) return;
    try {
      await axios.delete(
        `http://127.0.0.1:8000/schoolapp/vpdetails/${id}/`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      setVpList((prev) => prev.filter((vp) => vp.id !== id));
    } catch (error) {
      console.error("Error deleting VP:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-indigo-800 mb-6 border-b pb-2">
        Manage Vice Principals
      </h2>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        {loading ? (
          <p className="text-center py-6 text-gray-500">Loading...</p>
        ) : (
          <table className="w-full text-base text-left border-collapse">
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
              {VpList && VpList.length > 0 ? (
                VpList.map((vp, index) => (
                  <tr
                    key={vp.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-indigo-50 transition`}
                  >
                    <td className="px-6 py-4">{vp.id}</td>
                    <td className="px-6 py-4">
                      <img
                        src={
                          vp.profile_picture ||
                          "https://via.placeholder.com/50"
                        }
                        alt={vp.username}
                        className="w-12 h-12 rounded-full object-cover border"
                      />
                    </td>
                    <td className="px-6 py-4">{vp.username}</td>
                    <td className="px-6 py-4">{vp.email}</td>
                    <td className="px-6 py-4">{vp.phone}</td>
                    <td className="px-6 py-4 flex justify-center gap-3">
                      <Link
                        to={`/admin/edit/viceprincipal/${vp.id}`}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-base font-medium"
                      >
                        <Pencil className="w-5 h-5" /> EDIT
                      </Link>
                      <button
                        onClick={() => handleDelete(vp.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition text-base font-medium"
                      >
                        <Trash2 className="w-5 h-5" /> DELETE
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-400 italic"
                  >
                    No Vice Principals found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default VicePrincipalList;
