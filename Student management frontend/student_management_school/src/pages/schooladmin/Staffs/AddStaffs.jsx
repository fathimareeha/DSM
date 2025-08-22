import React, { useState } from "react";

// 🚀 Role options (from your Django model)
const ROLE_CHOICES = [
  { value: "librarian", label: "Librarian" },
  { value: "exam_controller", label: "Exam Controller" },
  { value: "finance_officer", label: "Finance Officer" },
  { value: "arts_sports_coordinator", label: "Arts&Sports Coordinator" },
  { value: "lab_coordinator", label: "Lab Coordinator" },
  { value: "hostel_manager", label: "Hostel Manager" },
];

export default function StaffCreateForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    profile_picture: null,
    coordinators_role: "", // 🚀 Added role
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/schoolapp/staffs/",
        {
          method: "POST",
          body: data,
        }
      );

      if (response.ok) {
        setMessage("✅ Staff created successfully!");
        setFormData({
          username: "",
          password: "",
          email: "",
          phone: "",
          profile_picture: null,
          coordinators_role: "",
        });
      } else {
        setMessage("❌ Failed to create staff");
      }
    } catch (error) {
      setMessage("⚠️ Error: " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Create Staff
        </h2>

        {["username", "email", "phone"].map((field) => (
          <div key={field} className="mb-3">
            <label className="block text-gray-700 capitalize">{field}</label>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
        ))}

        {/* Password */}
        <div className="mb-3">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Role Dropdown */}
        <div className="mb-3">
          <label className="block text-gray-700">Role</label>
          <select
            name="coordinators_role"
            value={formData.coordinators_role}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          >
            <option value="">-- Select Role --</option>
            {ROLE_CHOICES.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </div>

        {/* Profile Picture */}
        <div className="mb-3">
          <label className="block text-gray-700">Profile Picture</label>
          <input
            type="file"
            name="profile_picture"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create Staff
        </button>

        {/* Message */}
        {message && (
          <p className="mt-3 text-center text-sm font-semibold text-gray-600">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
