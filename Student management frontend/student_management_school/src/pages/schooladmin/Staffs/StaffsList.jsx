import React, { useEffect, useState } from "react";

export default function StaffList({ token }) {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/schoolapp/staffs/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        console.log("🔍 Fetch Staffs Response:", response);

        if (response.ok) {
          const data = await response.json();
          console.log("✅ Parsed Staff Data:", data);

          const mappedStaffs = data.map((item) => ({
            id: item.id,
            username: item.username,
            email: item.email,
            role: item.role,
            staff_role: item.schoolapp_staff_role?.staff_role || "",
            phone: item.schoolapp_staff_role?.phone || "",
            profile_picture: item.schoolapp_staff_role?.profile_picture || "",
          }));

          setStaffs(mappedStaffs);
        } else if (response.status === 401) {
          setMessage("❌ Unauthorized. Please login again.");
        } else {
          setMessage("❌ Failed to fetch staff list");
        }
      } catch (error) {
        console.error("⚠️ Fetch Staffs Error:", error);
        setMessage("⚠️ Error: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchStaffs();
    } else {
      setLoading(false);
      setMessage("❌ No token found. Please login first.");
    }
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/schoolapp/staffs/${id}/`, {
        method: "DELETE",
        headers: { Authorization: `Token ${token}` },
      });

      console.log("🗑️ Delete Response:", response);

      if (response.ok) {
        setStaffs(staffs.filter((staff) => staff.id !== id));
      } else {
        setMessage("❌ Failed to delete staff");
      }
    } catch (error) {
      console.error("⚠️ Delete Error:", error);
      setMessage("⚠️ Error: " + error.message);
    }
  };

  const handleEdit = async (id) => {
    const staffToEdit = staffs.find((staff) => staff.id === id);
    const newUsername = prompt("Edit username:", staffToEdit.username);
    if (!newUsername) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/schoolapp/staffs/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ username: newUsername }),
      });

      console.log("✏️ Edit Response:", response);

      if (response.ok) {
        setStaffs(
          staffs.map((staff) =>
            staff.id === id ? { ...staff, username: newUsername } : staff
          )
        );
      } else if (response.status === 401) {
        setMessage("❌ Unauthorized. Please login again.");
      } else {
        setMessage("❌ Failed to update staff");
      }
    } catch (error) {
      console.error("⚠️ Edit Error:", error);
      setMessage("⚠️ Error: " + error.message);
    }
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        👨‍🏫 Staff List
      </h2>

      {message && (
        <p className="mb-4 text-center text-sm font-semibold text-red-600">
          {message}
        </p>
      )}

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full border border-gray-200 bg-white rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Profile</th>
              <th className="py-3 px-4 text-left">Username</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map((staff, index) => (
              <tr
                key={staff.id}
                className={`border-b hover:bg-blue-50 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="py-3 px-4">{staff.id}</td>
                <td className="py-3 px-4">
                  {staff.profile_picture ? (
                    <img
                      src={staff.profile_picture}
                      alt={staff.username}
                      className="w-12 h-12 rounded-full border-2 border-blue-300"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </td>
                <td className="py-3 px-4 font-semibold text-gray-700">
                  {staff.username}
                </td>
                <td className="py-3 px-4 text-gray-600">{staff.email}</td>
                <td className="py-3 px-4 text-gray-600">{staff.phone}</td>
                <td className="py-3 px-4 text-gray-600">{staff.staff_role}</td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    onClick={() => handleEdit(staff.id)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(staff.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
