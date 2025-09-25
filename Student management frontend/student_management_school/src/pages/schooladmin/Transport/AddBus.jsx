import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function AddBusForm() {
  const [busNumber, setBusNumber] = useState("");
  const [routeName, setRouteName] = useState("");
  const [driverName, setDriverName] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [capacity, setCapacity] = useState("");

  const createBus = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!busNumber || !routeName || !driverName || !driverPhone || !capacity) {
      toast.error("All fields are required");
      return;
    }

    if (!token) {
      toast.error("No token found! Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/schoolapp/buses/", // 👈 Adjust endpoint as per your API
        {
          bus_number: busNumber,
          route_name: routeName,
          driver_name: driverName,
          driver_phone: driverPhone,
          capacity: capacity,
        },
        {
          headers: {
            Authorization: `Token ${token}`, // 👈 Change to `Token` if you use DRF TokenAuth
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Bus created:", response.data);
      toast.success("Bus Created Successfully");

      // Reset form
      setBusNumber("");
      setRouteName("");
      setDriverName("");
      setDriverPhone("");
      setCapacity("");
    } catch (error) {
      console.error("Error creating bus:", error.response?.data || error.message);

      if (error.response?.status === 401) {
        toast.error("Unauthorized. Please log in again.");
      } else {
        toast.error("Failed to create bus");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Bus</h2>

      <form onSubmit={createBus} className="space-y-6">
        <fieldset className="border border-gray-300 p-4 rounded">
          <legend className="text-lg font-semibold text-gray-700">
            Bus Details
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Bus Number */}
            <div>
              <label className="block font-medium">Bus Number</label>
              <input
                type="text"
                value={busNumber}
                onChange={(e) => setBusNumber(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Route Name */}
            <div>
              <label className="block font-medium">Route Name</label>
              <input
                type="text"
                value={routeName}
                onChange={(e) => setRouteName(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Driver Name */}
            <div>
              <label className="block font-medium">Driver Name</label>
              <input
                type="text"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Driver Phone */}
            <div>
              <label className="block font-medium">Driver Phone</label>
              <input
                type="tel"
                value={driverPhone}
                onChange={(e) => setDriverPhone(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Capacity */}
            <div>
              <label className="block font-medium">Capacity</label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
        </fieldset>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded mt-6"
        >
          Register Bus
        </button>
      </form>
    </div>
  );
}

export default AddBusForm;
