import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddBus() {
  const [formData, setFormData] = useState({
    bus_number: "",
    route_name: "",
    driver_name: "",
    driver_phone: "",
    capacity: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://127.0.0.1:8000/collegeapp/buses/", formData, {
        headers: { Authorization: `Token ${token}` }
      });
      toast.success("Bus added successfully");
    //   navigate("/bus/list");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add bus");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-indigo-800 mb-4">Add Bus</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["bus_number", "route_name", "driver_name", "driver_phone", "capacity"].map((field) => (
          <input
            key={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={field.replace("_", " ").toUpperCase()}
            className="w-full border rounded px-3 py-2"
            required
          />
        ))}
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
          Save Bus
        </button>
      </form>
    </div>
  );
}

export default AddBus;
