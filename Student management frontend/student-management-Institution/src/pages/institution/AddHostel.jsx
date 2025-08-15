import React, { useState } from "react";
import { toast } from "react-toastify";
import Inputfield from "../../components/common/Inputfield";
import Button from "../../components/common/Button";
import axios from "axios";

function AddHostel() {
  const [name, setName] = useState("");
  const [hostelType, setHostelType] = useState("");
  const [intake, setIntake] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!name || !hostelType || !intake) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/collegeapp/hostels/",
        { name, hostel_type: hostelType, intake, address },
        { headers: { Authorization: `Token ${token}` } }
      );

      toast.success("Hostel added successfully");

      // Reset form
      setName("");
      setHostelType("");
      setIntake("");
      setAddress("");
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Failed to add hostel");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-xl font-bold text-indigo-700 mb-6">Add New Hostel</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Inputfield
          label="Hostel Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">Hostel Type</label>
          <select
            value={hostelType}
            onChange={(e) => setHostelType(e.target.value)}
            required
            className="border px-3 py-2 rounded-md"
          >
            <option value="">Select Hostel Type</option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
          </select>
        </div>

        <Inputfield
          label="Intake Capacity"
          type="number"
          value={intake}
          onChange={(e) => setIntake(e.target.value)}
          required
        />

        <Inputfield
          label="Address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <Button type="submit" label="Add Hostel" />
      </form>
    </div>
  );
}

export default AddHostel;
