import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Bus } from "lucide-react";

function AddBus() {
  const [formData, setFormData] = useState({
    bus_number: "",
    route_name: "",
    driver_name: "",
    driver_phone: "",
    capacity: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://127.0.0.1:8000/collegeapp/buses/", formData, {
        headers: { Authorization: `Token ${token}` },
      });
      toast.success("🚌 Bus added successfully!");
      setFormData({
        bus_number: "",
        route_name: "",
        driver_name: "",
        driver_phone: "",
        capacity: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to add bus");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white shadow-xl rounded-2xl border border-gray-100 p-8 relative overflow-hidden">
        {/* Decorative Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 opacity-70 pointer-events-none rounded-2xl"></div>

        {/* Content Wrapper */}
        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-full">
              <Bus className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Add Bus</h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="bus_number"
              value={formData.bus_number}
              onChange={handleChange}
              placeholder="Bus Number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
              required
            />
            <input
              type="text"
              name="route_name"
              value={formData.route_name}
              onChange={handleChange}
              placeholder="Route Name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
              required
            />
            <input
              type="text"
              name="driver_name"
              value={formData.driver_name}
              onChange={handleChange}
              placeholder="Driver Name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
              required
            />
            <input
              type="text"
              name="driver_phone"
              value={formData.driver_phone}
              onChange={handleChange}
              placeholder="Driver Phone"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
              required
            />
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              placeholder="Capacity"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
              required
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 rounded-xl shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
            >
              Add Bus
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBus;
