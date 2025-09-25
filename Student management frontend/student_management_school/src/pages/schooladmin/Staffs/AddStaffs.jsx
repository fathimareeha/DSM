import React, { useState } from "react";
import axios from "axios";

const StaffCreateForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    staffs_role: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState(null);

  // If you are using token auth, get it from localStorage
  const token = localStorage.getItem("token"); // <-- define token

  const roleOptions = [
    { value: "librarian", label: "Librarian" },
    { value: "exam_controller", label: "Exam Controller" },
    { value: "finance_officer", label: "Finance Officer" },
    { value: "arts_sports_coordinator", label: "Arts & Sports Coordinator" },
    { value: "lab_coordinator", label: "Lab Coordinator" },
    { value: "hostel_manager", label: "Hostel Manager" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setErrors(null);

    try {
      const response = await axios.post(
        "http://localhost:8000/schoolapp/staffs/", // backend endpoint
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Token ${token}` : undefined,
          },
        }
      );

      setMessage(response.data.message);
      setFormData({
        username: "",
        email: "",
        password: "",
        staffs_role: "",
      });
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors(err.response.data);
      } else {
        setErrors({ detail: "Something went wrong." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create Staff Account</h2>

      {message && <p className="text-green-600 mb-4">{message}</p>}

      {errors &&
        Object.keys(errors).map((key) => (
          <p key={key} className="text-red-600">
            {key}: {errors[key]}
          </p>
        ))}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full border px-2 py-1 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border px-2 py-1 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border px-2 py-1 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Role</label>
          <select
            name="staffs_role"
            value={formData.staffs_role}
            onChange={handleChange}
            required
            className="w-full border px-2 py-1 rounded"
          >
            <option value="">Select Role</option>
            {roleOptions.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Staff"}
        </button>
      </form>
    </div>
  );
};

export default StaffCreateForm;
