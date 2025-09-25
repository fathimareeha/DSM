import React, { useState } from "react";

const initialHostels = [
  {
    id: 1,
    name: "Sunrise Boys Hostel",
    type: "Boys",
    totalRooms: 50,
    warden: "Mr. John Doe",
    address: "123 Main Street, Cityville",
    contactNumber: "9876543210",
  },
  {
    id: 2,
    name: "Moonlight Girls Hostel",
    type: "Girls",
    totalRooms: 40,
    warden: "Ms. Jane Smith",
    address: "456 Elm Avenue, Townsville",
    contactNumber: "9123456780",
  },
  {
    id: 3,
    name: "Harmony Mixed Hostel",
    type: "Mixed",
    totalRooms: 60,
    warden: "Mr. Alex Brown",
    address: "789 Oak Lane, Villageville",
    contactNumber: "9012345678",
  },
];

const HostelList = () => {
  const [hostels, setHostels] = useState(initialHostels);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleDelete = (id) => {
    const updatedHostels = hostels.filter((hostel) => hostel.id !== id);
    setHostels(updatedHostels);
  };

  const handleEditClick = (hostel) => {
    setEditId(hostel.id);
    setEditData(hostel);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setHostels((prev) =>
      prev.map((hostel) => (hostel.id === editId ? editData : hostel))
    );
    setEditId(null);
  };

  const handleCancel = () => {
    setEditId(null);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Hostel List</h2>

      {hostels.map((hostel) => (
        <div
          key={hostel.id}
          className="p-4 border rounded-md mb-4 shadow-sm relative"
        >
          {editId === hostel.id ? (
            <div className="space-y-2">
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded-md"
              />
              <input
                type="text"
                name="type"
                value={editData.type}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded-md"
              />
              <input
                type="number"
                name="totalRooms"
                value={editData.totalRooms}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded-md"
              />
              <input
                type="text"
                name="warden"
                value={editData.warden}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded-md"
              />
              <textarea
                name="address"
                value={editData.address}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded-md"
                rows={2}
              />
              <input
                type="tel"
                name="contactNumber"
                value={editData.contactNumber}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded-md"
              />
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-xl font-semibold mb-2">{hostel.name}</h3>
              <p><strong>Type:</strong> {hostel.type}</p>
              <p><strong>Total Rooms:</strong> {hostel.totalRooms}</p>
              <p><strong>Warden:</strong> {hostel.warden}</p>
              <p><strong>Address:</strong> {hostel.address}</p>
              <p><strong>Contact Number:</strong> {hostel.contactNumber}</p>
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => handleEditClick(hostel)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(hostel.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HostelList;
