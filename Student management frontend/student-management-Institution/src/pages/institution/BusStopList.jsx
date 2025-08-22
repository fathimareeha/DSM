import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import axios from "axios";

function BusStopList() {
  const [stops, setStops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStops = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://127.0.0.1:8000/collegeapp/bus-stops/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setStops(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Failed to fetch bus stops");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStops();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this bus stop?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://127.0.0.1:8000/collegeapp/bus-stops/${id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setStops(stops.filter((stop) => stop.id !== id));
      } catch (error) {
        console.error("Error deleting bus stop:", error);
        alert("Failed to delete bus stop");
      }
    }
  };

  if (loading) return <p className="text-center">⏳ Loading bus stops...</p>;
  if (error)
    return (
      <p className="text-center text-red-600 font-semibold">
        ❌ {error}
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto bg-white shadow p-6 rounded-md">
      <h2 className="text-2xl font-bold text-indigo-800 mb-6">🚌 Bus Stops</h2>

      {stops.length === 0 ? (
        <p className="text-gray-500">No bus stops found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-indigo-100">
              <th className="border p-2">#</th>
              <th className="border p-2">Bus Number</th>
              <th className="border p-2">Stop Name</th>
              <th className="border p-2">Arrival Time</th>
              <th className="border p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stops.map((stop, index) => (
              <tr key={stop.id} className="hover:bg-gray-50">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{stop.bus_number || "—"}</td>
                <td className="border p-2">{stop.stop_name}</td>
                <td className="border p-2">{stop.arrival_time || "—"}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleDelete(stop.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 inline-block" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BusStopList;
