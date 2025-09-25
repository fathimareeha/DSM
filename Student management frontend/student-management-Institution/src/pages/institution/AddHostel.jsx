import React, { useState } from "react";
import { toast } from "react-toastify";
import Inputfield from "../../components/common/Inputfield";
import Button from "../../components/common/Button";
import axios from "axios";
import { Home as HostelIcon } from "lucide-react";

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

      toast.success("🏠 Hostel added successfully");

      setName("");
      setHostelType("");
      setIntake("");
      setAddress("");
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("❌ Failed to add hostel");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white shadow-xl rounded-2xl border border-gray-100 p-8 relative overflow-hidden">
        {/* Decorative Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 opacity-70 pointer-events-none rounded-2xl"></div>

        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-full">
              <HostelIcon className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Add Hostel</h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Inputfield
              label="Hostel Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hostel Type
              </label>
              <select
                value={hostelType}
                onChange={(e) => setHostelType(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none shadow-sm"
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
            />

            <Inputfield
              label="Address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <div className="pt-4">
              <Button
                type="submit"
                label="Add Hostel"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 rounded-xl shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddHostel;
