// src/pages/EditStudent.jsx
import React, { useEffect, useState } from "react";
import Inputfield from "../../components/common/Inputfield";
import Button from "../../components/common/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { UserCheck } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Form fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [roll_no, setRollno] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [photo, setPhoto] = useState(null);

  // Dropdowns
  const [courseList, setCourseList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [semesterList, setSemesterList] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  const token = localStorage.getItem("token");

  // Fetch student details
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/collegeapp/students/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        const data = res.data;
        setUsername(data.username || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setRollno(data.roll_no || "");
        setAddress(data.address || "");
        setGender(data.gender || "");
        setSelectedCourse(data.course || "");
        setSelectedDepartment(data.department || "");
        setSelectedSemester(data.semester || "");
      })
      .catch(() => toast.error("❌ Failed to fetch student details"));
  }, [id, token]);

  // Load courses
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/superadmin_app/course", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setCourseList(res.data))
      .catch(() => setCourseList([]));
  }, [token]);

  // Load departments when course changes
  useEffect(() => {
    if (!selectedCourse) {
      setDepartmentList([]);
      setSelectedDepartment("");
      return;
    }
    axios
      .get(
        `http://127.0.0.1:8000/superadmin_app/department?course_id=${selectedCourse}`,
        { headers: { Authorization: `Token ${token}` } }
      )
      .then((res) => setDepartmentList(res.data))
      .catch(() => setDepartmentList([]));
  }, [selectedCourse, token]);

  // Load semesters when department changes
  useEffect(() => {
    if (!selectedDepartment) {
      setSemesterList([]);
      setSelectedSemester("");
      return;
    }
    axios
      .get(
        `http://127.0.0.1:8000/superadmin_app/semester?department_id=${selectedDepartment}`,
        { headers: { Authorization: `Token ${token}` } }
      )
      .then((res) => setSemesterList(res.data))
      .catch(() => setSemesterList([]));
  }, [selectedDepartment, token]);

  // --- Update Student ---
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("roll_no", roll_no);
      formData.append("course", selectedCourse);
      formData.append("department", selectedDepartment);
      formData.append("semester", selectedSemester);
      formData.append("address", address);
      formData.append("gender", gender);
      if (photo) formData.append("photo", photo);

      await axios.put(
        `http://127.0.0.1:8000/collegeapp/students/${id}/`,
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("✅ Student updated successfully!");
      navigate("/admin/students");
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("❌ Failed to update Student");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="bg-white shadow-xl rounded-2xl border border-gray-100 p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-sky-50 opacity-70 pointer-events-none rounded-2xl"></div>

        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-full">
              <UserCheck className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Edit Student</h2>
          </div>

          {/* --- Edit Student Form --- */}
          <form onSubmit={handleUpdate} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Inputfield label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <Inputfield label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Inputfield label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <Inputfield label="Roll No" value={roll_no} onChange={(e) => setRollno(e.target.value)} />
              <Inputfield label="Address" value={address} onChange={(e) => setAddress(e.target.value)} />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm"
                >
                  <option value="">Select Gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm"
                >
                  <option value="">Select Course</option>
                  {courseList.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  disabled={!selectedCourse}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm disabled:bg-gray-100"
                >
                  <option value="">Select Department</option>
                  {departmentList.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  disabled={!selectedDepartment}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm disabled:bg-gray-100"
                >
                  <option value="">Select Semester</option>
                  {semesterList.map((s) => (
                    <option key={s.id} value={s.id}>{s.number}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
                <input
                  type="file"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm"
                />
              </div>
            </div>

            <Button
              type="submit"
              label="Update Student"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 rounded-xl shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditStudent;
