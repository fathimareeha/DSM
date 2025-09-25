import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const HostelList = () => {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHostels = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token"); // JWT token if using auth
        const response = await axios.get("http://127.0.0.1:8000/schoolapp/hostels/", {
          headers: {
            Authorization: `Token ${token}`, // remove if not using auth
          },
        });
        setHostels(response.data);
      } catch (error) {
        console.error(error);
        toast.error("❌ Failed to fetch hostels");
      } finally {
        setLoading(false);
      }
    };

    fetchHostels();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading hostels...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Hostel List</h2>

      {hostels.length === 0 ? (
        <p className="text-center text-gray-500">No hostels created yet.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Type</th>
              <th className="border border-gray-300 px-4 py-2">Total Rooms</th>
              <th className="border border-gray-300 px-4 py-2">Warden</th>
              <th className="border border-gray-300 px-4 py-2">Address</th>
              <th className="border border-gray-300 px-4 py-2">Contact</th>
            </tr>
          </thead>
          <tbody>
            {hostels.map((hostel) => (
              <tr key={hostel.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{hostel.name}</td>
                <td className="border border-gray-300 px-4 py-2">{hostel.type}</td>
                <td className="border border-gray-300 px-4 py-2">{hostel.total_rooms}</td>
                <td className="border border-gray-300 px-4 py-2">{hostel.warden}</td>
                <td className="border border-gray-300 px-4 py-2">{hostel.address}</td>
                <td className="border border-gray-300 px-4 py-2">{hostel.contact_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HostelList;
