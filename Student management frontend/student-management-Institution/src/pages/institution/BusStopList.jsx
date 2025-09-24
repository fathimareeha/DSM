import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

function BusStopList() {
  const [stops, setStops] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStops = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://127.0.0.1:8000/collegeapp/bus-stops/",
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      setStops(response.data);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.detail || "Failed to fetch bus stops");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStops();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bus stop?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:8000/collegeapp/bus-stops/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setStops(stops.filter((stop) => stop.id !== id));
      toast.success("Bus stop deleted");
    } catch (error) {
      console.error("Error deleting bus stop:", error);
      toast.error("Failed to delete bus stop");
    }
  };

  if (loading)
    return <p className="text-center text-gray-500">⏳ Loading bus stops...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-800">🚌 Bus Stops</h2>
      </div>

      <div className="overflow-x-auto bg-white shadow-xl rounded-2xl border border-gray-100">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-indigo-100 text-indigo-800 font-semibold">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Bus Number</th>
              <th className="px-4 py-2">Stop Name</th>
              <th className="px-4 py-2">Arrival Time</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stops.length > 0 ? (
              stops.map((stop, index) => (
                <tr key={stop.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{stop.bus_number || "—"}</td>
                  <td className="px-4 py-3">{stop.stop_name}</td>
                  <td className="px-4 py-3">{stop.arrival_time || "—"}</td>
                  <td className="px-4 py-3 flex justify-center gap-2">
                    <button
                      onClick={() => handleDelete(stop.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-400">
                  No bus stops found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BusStopList;
