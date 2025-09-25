import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const roleOptions = [
  { value: "librarian", label: "Librarian" },
  { value: "exam_controller", label: "Exam Controller" },
  { value: "finance_officer", label: "Finance Officer" },
  { value: "arts_sports_coordinator", label: "Arts & Sports Coordinator" },
  { value: "lab_coordinator", label: "Lab Coordinator" },
  { value: "hostel_manager", label: "Hostel Manager" },
];

function EditStaff() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    staffs_role: "",
  });

  const [errors, setErrors] = useState({});

  // Fetch staff data
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/schoolapp/staffsdetail/${id}/`,
          { headers: { Authorization: `Token ${token}` } }
        );
        const staff = res.data;

        // Use the flat fields from your API response
        setFormData({
          username: staff.user_username || "",
          email: staff.user_email || "",
          password: "", // leave blank to keep current password
          staffs_role: staff.staffs_role || "",
        });
      } catch (err) {
        console.error("Failed to load staff data:", err.response || err);
        alert("Failed to load staff data. Check console for details.");
      }
    };

    if (token) fetchStaff();
    else {
      alert("No authentication token found. Please login.");
      navigate("/login");
    }
  }, [id, token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // clear previous errors

    try {
      // Prepare payload as flat fields (matches serializer)
      const payload = {
        username: formData.username,
        email: formData.email,
        staffs_role: formData.staffs_role,
      };

      // Only include password if entered
      if (formData.password.trim() !== "") {
        payload.password = formData.password;
      }

      await axios.put(
        `http://127.0.0.1:8000/schoolapp/staffsdetail/${id}/`,
        payload,
        { headers: { Authorization: `Token ${token}` } }
      );

      alert("Staff updated successfully!");
      navigate("/admin/list/staffs");
    } catch (err) {
      if (err.response) {
        console.error("Server validation errors:", err.response.data);
        setErrors(err.response.data); // optional: show errors next to fields
        alert("Failed to update staff. Check console for details.");
      } else {
        console.error("Error:", err);
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-indigo-800 border-b pb-2">
        Edit Staff
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <div>
          <select
            name="staffs_role"
            value={formData.staffs_role}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Role</option>
            {roleOptions.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
          {errors.staffs_role && (
            <p className="text-red-500 text-sm">{errors.staffs_role}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Update Staff
        </button>
      </form>
    </div>
  );
}

export default EditStaff;
