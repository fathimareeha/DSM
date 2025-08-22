import React, { useState } from "react";
import Inputfield from "../../components/common/Inputfield";
import Button from "../../components/common/Button";
import { toast } from "react-toastify";
import axios from "axios";

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No authentication token found!");
        return;
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/collegeapp/create/",
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Event created successfully!");
      console.log("Response:", response.data);

      setFormData({
        title: "",
        description: "",
        start_date: "",
        end_date: "",
        receiver_type: "all",
      });
    } catch (error) {
      console.error(error.response?.data || error);
      toast.error("Failed to create event!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow">
      <h2 className="text-xl font-bold text-indigo-700 mb-6">Add New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Inputfield
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">Start Date & Time</label>
          <input
            type="datetime-local"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">End Date & Time</label>
          <input
            type="datetime-local"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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

        {/* ✅ Receiver type radio buttons */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">Send To</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="receiver_type"
                value="faculties"
                checked={formData.receiver_type === "faculties"}
                onChange={handleChange}
              />
              Faculties
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="receiver_type"
                value="students"
                checked={formData.receiver_type === "students"}
                onChange={handleChange}
              />
              Students
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="receiver_type"
                value="hods"
                checked={formData.receiver_type === "hods"}
                onChange={handleChange}
              />
              HODs
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="receiver_type"
                value="all"
                checked={formData.receiver_type === "all"}
                onChange={handleChange}
              />
              All
            </label>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <Button label="Add Event" />
          {/* <button
            type="reset"
            onClick={() =>
              setFormData({
                title: "",
                description: "",
                start_date: "",
                end_date: "",
                receiver_type: "all",
              })
            }
            className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
          >
            Reset
          </button> */}
        </div>
      </form>
    </div>
  );
}

export default AddEvent;
