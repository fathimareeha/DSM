import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function StudentEdit() {
  const navigate = useNavigate();
  const { id } = useParams(); // student ID from route

  const [formData, setFormData] = useState({
    admissionNumber: "",
    rollNo: "",
    studentName: "",
    standard: "",
    section: "",
    gender: "",
    dob: "",
    Email: "",
    studentAddress: "",
    parentname: "",
    relationship: "",
    parentPhone: "",
    profilePic: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing data
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://127.0.0.1:8000/schoolapp/studentdetail/${id}/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setFormData({
          ...res.data,
          dob: res.data.dob ? res.data.dob.split("T")[0] : "", // format date for input
          profilePic: null, // reset file input
        });
      } catch (err) {
        console.error(err);
        setError("Failed to fetch student data.");
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) submitData.append(key, formData[key]);
      });

      await axios.put(
        `http://127.0.0.1:8000/schoolapp/studentdetail/${id}/`,
        submitData,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate("/admin/list/students");
    } catch (err) {
      console.error(err);
      setError("Failed to update student.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-indigo-800 mb-6 border-b pb-2">
        Edit Student
      </h2>

      {error && (
        <p className="text-red-500 bg-red-50 border border-red-200 p-3 rounded mb-4">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Same fields as in create form */}
        {/* Admission Number */}
        <label className="block">
          Admission No:
          <input
            type="text"
            name="admissionNumber"
            value={formData.admissionNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            required
          />
        </label>

        {/* Roll Number */}
        <label className="block">
          Roll No:
          <input
            type="text"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            required
          />
        </label>

        {/* Student Name */}
        <label className="block">
          Student Name:
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            required
          />
        </label>

        {/* Standard Dropdown */}
        <label className="block">
          Standard:
          <select
            name="standard"
            value={formData.standard}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="">Select Standard</option>
            {["I", "II", "III", "IV", "V", "VI","VII", "VIII", "IX", "X"].map((std) => (
              <option key={std} value={std}>{std}</option>
            ))}
          </select>
        </label>

        {/* Section */}
        <label className="block">
          Section:
          <select
            name="section"
            value={formData.section}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="">Select Section</option>
            {["A", "B", "C", "D"].map((sec) => (
              <option key={sec} value={sec}>{sec}</option>
            ))}
          </select>
        </label>

        {/* Gender */}
        <label className="block">
          Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>

        {/* DOB */}
        <label className="block">
          Date of Birth:
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </label>

        {/* Email */}
        <label className="block">
          Email:
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </label>

        {/* Address */}
        <label className="block">
          Address:
          <textarea
            name="studentAddress"
            value={formData.studentAddress}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </label>

        {/* Parent Name */}
        <label className="block">
          Parent Name:
          <input
            type="text"
            name="parentname"
            value={formData.parentname}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </label>

        {/* Relationship */}
        <label className="block">
          Relationship:
          <input
            type="text"
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </label>

        {/* Parent Phone */}
        <label className="block">
          Parent Phone:
          <input
            type="text"
            name="parentPhone"
            value={formData.parentPhone}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </label>

        {/* Profile Picture */}
        <label className="block">
          Profile Picture:
          <input
            type="file"
            name="profilePic"
            accept="image/*"
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        >
          {loading ? "Saving..." : "Update Student"}
        </button>
      </form>
    </div>
  );
}

export default StudentEdit;
