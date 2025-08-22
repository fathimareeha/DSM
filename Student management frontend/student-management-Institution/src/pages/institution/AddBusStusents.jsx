import React, { useEffect, useState } from "react";
import axios from "axios";
import Select, { components } from "react-select";
import { Bus, MapPin } from "lucide-react";

// Custom option with avatar + labels
const StudentOption = (props) => {
  const { data } = props;
  return (
    <components.Option {...props}>
      <div className="flex items-center gap-3">
        <img
          src={data.photo || "https://via.placeholder.com/40"}
          alt={data.label}
          className="w-8 h-8 rounded-full object-cover border"
        />
        <div>
          <p className="font-medium">{data.student_name}</p>
          <p className="text-xs text-gray-500">Roll No: {data.roll_no}</p>
        </div>
        <span className="ml-auto text-xs px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full">
          {data.department_name}
        </span>
      </div>
    </components.Option>
  );
};

// How selected value looks
const StudentSingleValue = (props) => {
  const { data } = props;
  return (
    <components.SingleValue {...props}>
      <div className="flex items-center gap-2">
        <img
          src={data.photo || "https://via.placeholder.com/40"}
          alt={data.label}
          className="w-6 h-6 rounded-full object-cover border"
        />
        <span>
          {data.student_name} ({data.roll_no})
        </span>
      </div>
    </components.SingleValue>
  );
};

function AddBusStudents() {
  const [students, setStudents] = useState([]);
  const [buses, setBuses] = useState([]);
  const [stops, setStops] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedBus, setSelectedBus] = useState("");
  const [selectedStop, setSelectedStop] = useState("");

  const token = localStorage.getItem("token");

  const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/collegeapp/",
    headers: {
      Authorization: token ? `Token ${token}` : "",
    },
  });

  // Fetch students & buses
  useEffect(() => {
    axiosInstance
      .get("students/")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("❌ Error fetching students:", err));

    axiosInstance
      .get("buses/")
      .then((res) => setBuses(res.data))
      .catch((err) => console.error("❌ Error fetching buses:", err));
  }, []);

  // Fetch stops only for selected bus
  useEffect(() => {
    axiosInstance
      .get("bus-stops/")
      .then((res) => setStops(res.data))
      .catch((err) => console.error("❌ Error fetching stops:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        student: selectedStudent?.value,
        bus: selectedBus,
        stop: selectedStop || null,
      };
      await axiosInstance.post("student-bus-allocation/", payload);
      alert("✅ Bus allocated successfully");
      setSelectedStudent(null);
      setSelectedBus("");
      setSelectedStop("");
    } catch (error) {
      console.error(
        "❌ Error allocating bus:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-gray-100">
      <h2 className="text-2xl font-bold flex items-center gap-2 text-blue-700">
        <Bus className="w-6 h-6" /> Allocate Student to Bus
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Student Select */}
        <div>
          <label className="block text-sm font-medium mb-2">Select Student</label>
          <Select
            value={selectedStudent}
            onChange={setSelectedStudent}
            options={students.map((s) => ({
              value: s.id,
              label: `${s.student_name} (${s.roll_no})`,
              student_name: s.student_name,
              roll_no: s.roll_no,
              department_name: s.department_name,
              photo: s.photo,
            }))}
            components={{
              Option: StudentOption,
              SingleValue: StudentSingleValue,
            }}
            placeholder="🔍 Search and select student..."
            isSearchable
          />
        </div>

        {/* Bus Select */}
        <div>
          <label className="block text-sm font-medium mb-2">Select Bus</label>
          <select
            value={selectedBus}
            onChange={(e) => setSelectedBus(e.target.value)}
            required
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Select Bus --</option>
            {buses.map((b) => (
              <option key={b.id} value={b.id}>
                Bus {b.bus_number} - {b.route_name}
              </option>
            ))}
          </select>
        </div>

        {/* Stop Select */}
        <div>
          <label className="block text-sm font-medium mb-2">Select Stop</label>
          <select
            value={selectedStop}
            onChange={(e) => setSelectedStop(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Select Stop --</option>
            {stops.map((stop) => (
              <option key={stop.id} value={stop.id}>
                {stop.stop_name}
              </option>
            ))}
          </select>
        </div>

        {/* Premium Gradient Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-xl shadow-md hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition duration-200"
        >
          <MapPin className="w-5 h-5" /> Allocate Bus
        </button>
      </form>
    </div>
  );
}

export default AddBusStudents;
