import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function AssignHostel() {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [hostels, setHostels] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch student details
  const fetchStudent = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://127.0.0.1:8000/collegeapp/students/${studentId}/`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      setStudent(response.data);
      if (response.data.hostel) {
        setSelectedHostel(response.data.hostel);
        setRoomNumber(response.data.room_number || "");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch student details");
    }
  };

  // Fetch hostels
  const fetchHostels = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://127.0.0.1:8000/collegeapp/hostels/",
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      setHostels(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch hostels");
    }
  };

  useEffect(() => {
    fetchStudent();
    fetchHostels();
  }, []);

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!selectedHostel) {
      toast.error("Please select a hostel");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://127.0.0.1:8000/collegeapp/students/${studentId}/assign-hostel/${selectedHostel}/`,
  { room_number: roomNumber },
  { headers: { Authorization: `Token ${token}` } }
        
      );

      toast.success("Hostel assigned successfully");
      navigate("/admin/students"); // go back to student list
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Failed to assign hostel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-md mt-6">
      <h2 className="text-xl font-bold text-indigo-700 mb-6">
        Assign Hostel to Student
      </h2>

      {student && (
        <form onSubmit={handleAssign} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-600">Student Name</label>
            <input
              type="text"
              value={student.username || student.user?.username}
              disabled
              className="border px-3 py-2 rounded-md w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Select Hostel</label>
            <select
              value={selectedHostel}
              onChange={(e) => setSelectedHostel(e.target.value)}
              className="border px-3 py-2 rounded-md w-full"
            >
              <option value="">-- Choose Hostel --</option>
              {hostels.map((hostel) => (
                <option key={hostel.id} value={hostel.id}>
                  {hostel.name} ({hostel.hostel_type}) - Capacity:{" "}
                  {hostel.intake} - Occupied: {hostel.current_occupancy}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Room Number</label>
            <input
              type="text"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              placeholder="Enter room number"
              className="border px-3 py-2 rounded-md w-full"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            {loading ? "Assigning..." : "Assign Hostel"}
          </button>
        </form>
      )}
    </div>
  );
}

export default AssignHostel;
