import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function StaffView() {
  const { id } = useParams();
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://127.0.0.1:8000/schoolapp/staffsdetail/${id}/`,
          {
            headers: { Authorization: `Token ${token}` },
          }
        );
        setStaff(response.data);
      } catch (err) {
        console.error("Error fetching staff:", err);
        setError("Failed to load staff details");
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, [id]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-center mt-8 text-red-600">{error}</p>;
  if (!staff) return <p className="text-center mt-8">Staff not found.</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow-md mt-6">
      <h2 className="text-2xl font-bold text-indigo-800 mb-6">Staff Details</h2>

      <div className="flex items-start gap-6">
        {/* Profile Picture */}
        <div>
          {staff.profile_picture ? (
            <img
              src={staff.profile_picture}
              alt={staff.user_username}
              className="w-32 h-32 rounded-full border object-cover"
            />
          ) : (
            <div className="w-32 h-32 rounded-full border bg-gray-200 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* Staff Details */}
        <div className="flex-1 space-y-2">
          <div>
            <strong>ID:</strong> {staff.id}
          </div>
          <div>
            <strong>Username:</strong> {staff.user_username}
          </div>
          <div>
            <strong>Email:</strong> {staff.user_email}
          </div>
          <div>
            <strong>Role:</strong> {staff.staffs_role}
          </div>
          <div>
            <strong>Phone:</strong> {staff.phone || "N/A"}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Link
          to="/admin/list/staffs"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          ← Back to Staff List
        </Link>
      </div>
    </div>
  );
}

export default StaffView;
