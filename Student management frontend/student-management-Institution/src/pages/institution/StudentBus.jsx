import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bus, MapPin, User, Phone } from "lucide-react";

function BusAllocationList() {
  const [allocations, setAllocations] = useState([]);
  const token = localStorage.getItem("token");

  const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/collegeapp/",
    headers: {
      Authorization: token ? `Token ${token}` : "",
    },
  });

  useEffect(() => {
    axiosInstance
      .get("student-bus-allocation/")
      .then((res) => setAllocations(res.data))
      .catch((err) => console.error("Error fetching allocations:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🚌 Student Bus Allocations</h2>

      <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <th className="p-3">Student</th>
              <th className="p-3">Roll No</th>
              <th className="p-3">Bus</th>
              <th className="p-3">Route</th>
              <th className="p-3">Driver</th>
              <th className="p-3">Stop</th>
              <th className="p-3">Arrival</th>
            </tr>
          </thead>
          <tbody>
            {allocations.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="p-3 flex items-center gap-2">
                  <User className="text-blue-500 w-4 h-4" />
                  {item.student_name}
                </td>
                <td className="p-3">{item.roll_no}</td>
                <td className="p-3 flex items-center gap-2">
                  <Bus className="text-purple-500 w-4 h-4" />
                  {item.bus_details.bus_number}
                </td>
                <td className="p-3">{item.bus_details.route_name}</td>
                <td className="p-3 flex flex-col">
                  <span>{item.bus_details.driver_name}</span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-green-600" />
                    {item.bus_details.driver_phone}
                  </span>
                </td>
                <td className="p-3 flex items-center gap-2">
                  <MapPin className="text-red-500 w-4 h-4" />
                  {item.stop_details.stop_name}
                </td>
                <td className="p-3">{item.stop_details.arrival_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BusAllocationList;
