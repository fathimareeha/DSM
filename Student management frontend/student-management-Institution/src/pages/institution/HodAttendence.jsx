// src/pages/admin/HODAttendance.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function HODAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return;

      let url = "http://127.0.0.1:8000/collegeapp/hod-attendance/";
      if (dateFilter) {
        url += `?date=${dateFilter}`; // if your backend supports filtering by query param
      }

      const res = await axios.get(url, {
        headers: { Authorization: `Token ${token}` },
      });
      setAttendance(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch attendance");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [dateFilter]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">HOD Attendance</h1>

      {/* Date Filter */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter by Date:</label>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <button
          onClick={fetchAttendance}
          className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Filter
        </button>
      </div>

      {loading ? (
        <p>Loading attendance...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : attendance.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">HOD Name</th>
              <th className="border px-4 py-2">Department Name</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((att) => (
              <tr key={att.id}>
                <td className="border px-4 py-2">{att.hod_name}</td>
                <td className="border px-4 py-2">{att.department_name}</td>
                <td className="border px-4 py-2">{att.date}</td>
                <td
                  className={`border px-4 py-2 font-semibold ${
                    att.status === "present" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {att.status === "present" ? "Present" : "Absent"}
                </td>
                <td className="border px-4 py-2">{att.remarks || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HODAttendance;
