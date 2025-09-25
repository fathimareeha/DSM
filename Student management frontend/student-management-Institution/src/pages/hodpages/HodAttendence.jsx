import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, CalendarCheck, CalendarX } from "lucide-react";

export default function HODAttendance() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch attendance records
  const fetchAttendance = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/collegeapp/hod-attendance/", {
        headers: { Authorization: `Token ${token}` },
      });
      setRecords(res.data);
    } catch (err) {
      console.error("Error fetching attendance", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // Mark attendance
  const markAttendance = async (status) => {
    setMarking(true);
    try {
      await axios.post(
        "http://127.0.0.1:8000/collegeapp/hod-attendance/",
        { status, remarks: status === "present" ? "On time" : "Absent today" },
        { headers: { Authorization: `Token ${token}` } }
      );
      fetchAttendance(); // refresh list
    } catch (err) {
      console.error("Error marking attendance", err);
    } finally {
      setMarking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-6 h-6 animate-spin text-gray-600" />
        <span className="ml-2">Loading attendance...</span>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-6">📅 HOD Attendance</h1>

      {/* Action buttons */}
      <div className="flex gap-4 mb-6">
        <button
          disabled={marking}
          onClick={() => markAttendance("present")}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow"
        >
          <CalendarCheck className="w-5 h-5" />
          Mark Present
        </button>

        <button
          disabled={marking}
          onClick={() => markAttendance("absent")}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl shadow"
        >
          <CalendarX className="w-5 h-5" />
          Mark Absent
        </button>
      </div>

      {/* Attendance Records */}
      {records.length === 0 ? (
        <p className="text-gray-500">No attendance records yet.</p>
      ) : (
        <table className="w-full bg-white shadow rounded-xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec) => (
              <tr key={rec.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{rec.date}</td>
                <td className="p-3">
                  {rec.status === "present" ? (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Present
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                      Absent
                    </span>
                  )}
                </td>
                <td className="p-3 text-gray-600">{rec.remarks || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
