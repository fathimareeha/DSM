import React, { useState } from "react";

const AddHostel = () => {
  const [hostelData, setHostelData] = useState({
    name: "",
    type: "",
    totalRooms: "",
    warden: "",
    address: "",
    contactNumber: "", // Added contact number field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHostelData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send hostelData to API or backend here
    console.log("Hostel Data Submitted:", hostelData);
    alert("Hostel Created Successfully!");
    setHostelData({ name: "", type: "", totalRooms: "", warden: "", address: "", contactNumber: "" });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Hostel</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block text-gray-700">Hostel Name</label>
          <input
            type="text"
            name="name"
            value={hostelData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter hostel name"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Hostel Type</label>
          <select
            name="type"
            value={hostelData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select type</option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
            <option value="Mixed">Mixed</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Total Rooms</label>
          <input
            type="number"
            name="totalRooms"
            value={hostelData.totalRooms}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter number of rooms"
            required
            min="1"
          />
        </div>

        <div>
          <label className="block text-gray-700">Warden Name</label>
          <input
            type="text"
            name="warden"
            value={hostelData.warden}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter warden name"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Address</label>
          <textarea
            name="address"
            value={hostelData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter hostel address"
            required
            rows={3}
          />
        </div>

        <div>
          <label className="block text-gray-700">Contact Number</label>
          <input
            type="tel"
            name="contactNumber"
            value={hostelData.contactNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter contact number"
            required
            pattern="[0-9]{10}" // Only 10-digit numbers
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Create Hostel
        </button>
      </form>
    </div>
  );
};

export default AddHostel;
