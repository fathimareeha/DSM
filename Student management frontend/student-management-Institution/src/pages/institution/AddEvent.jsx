// src/pages/AddEvent.jsx
import React, { useState } from "react";
import Inputfield from "../../components/common/Inputfield";
import Button from "../../components/common/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { CalendarPlus, Users } from "lucide-react";

function AddEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    receiver_type: "all", // faculties | students | hods | all
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("No authentication token found!");

      // 🔹 send correct key 'send_to' to backend
      const payload = {
        title: formData.title,
        description: formData.description,
        start_date: formData.start_date,
        end_date: formData.end_date,
        send_to: formData.receiver_type,
      };

      await axios.post(
        "http://127.0.0.1:8000/collegeapp/create/",
        payload,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("🎉 Event created successfully!");
      setFormData({
        title: "",
        description: "",
        start_date: "",
        end_date: "",
        receiver_type: "all",
      });
    } catch (error) {
      console.error(error.response?.data || error);
      toast.error("❌ Failed to create event!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white shadow-xl rounded-2xl border border-gray-100 p-8 relative overflow-hidden">
        {/* Decorative Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 opacity-70 pointer-events-none rounded-2xl"></div>

        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-full">
              <CalendarPlus className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Add Event</h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Inputfield
              label="Title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />

            <div className="flex gap-4">
              <div className="flex-1 flex flex-col">
                <label className="mb-1 text-sm text-gray-600">Start Date & Time</label>
                <input
                  type="datetime-local"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex-1 flex flex-col">
                <label className="mb-1 text-sm text-gray-600">End Date & Time</label>
                <input
                  type="datetime-local"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm text-gray-600">Description</label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter event details..."
              />
            </div>

            {/* Receiver Type */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm text-gray-600">Send To</label>
              <div className="flex gap-6">
                {["faculties", "students", "hods", "all"].map((type) => (
                  <label key={type} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="receiver_type"
                      value={type}
                      checked={formData.receiver_type === type}
                      onChange={handleChange}
                      className="accent-blue-600"
                    />
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <Button
                type="submit"
                label="Add Event"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 rounded-xl shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEvent;
