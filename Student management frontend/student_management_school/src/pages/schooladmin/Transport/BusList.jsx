import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Eye, Bus } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

function BusList() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch buses from API
  const fetchBuses = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in");
        setLoading(false);
        return;
      }

      // ✅ Correct API endpoint (check your Django urls.py)
      const response = await axios.get(
        "http://127.0.0.1:8000/schoolapp/buses/", // trailing slash is important
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      setBuses(response.data);
    } catch (error) {
      console.error("Error fetching buses:", error);
      toast.error("Failed to fetch buses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  // Delete a bus
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bus?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://127.0.0.1:8000/schoolapp/buses/${id}/`, // match backend URL
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      setBuses(buses.filter((b) => b.id !== id));
      toast.success("Bus deleted");
    } catch (error) {
      console.error("Error deleting bus:", error);
      toast.error("Failed to delete bus");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-800 flex items-center gap-2">
          <Bus size={24} /> Manage Buses
        </h2>
        <Link
          to="/admin/add/bus"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          ➕ Add Bus
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading buses...</div>
        ) : buses.length > 0 ? (
          <table className="w-full table-auto text-sm text-left border-collapse">
            <thead className="bg-indigo-100 text-indigo-800 font-semibold">
              <tr>
                <th className="px-4 py-2">Bus Number</th>
                <th className="px-4 py-2">Route</th>
                <th className="px-4 py-2">Driver</th>
                <th className="px-4 py-2">Driver Phone</th>
                <th className="px-4 py-2">Capacity</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {buses.map((bus, index) => (
                <tr
                  key={bus.id}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                >
                  <td className="px-4 py-3">{bus.bus_number}</td>
                  <td className="px-4 py-3">{bus.route_name}</td>
                  <td className="px-4 py-3">{bus.driver_name} </td>
                  <td className="px-4 py-3">{bus.driver_phone}</td>
                  <td className="px-4 py-3 text-center align-middle">{bus.capacity}</td>
                  <td className="px-4 py-3 flex justify-center gap-3">
                    <Link
                      to={`/admin/bus/view/${bus.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye size={18} />
                    </Link>
                    <Link
                      to={`/admin/bus/edit/${bus.id}`}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Pencil size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(bus.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-6 text-center text-gray-400">
            <Bus size={40} className="mx-auto mb-2" />
            No buses found
          </div>
        )}
      </div>
    </div>
  );
}

export default BusList;
