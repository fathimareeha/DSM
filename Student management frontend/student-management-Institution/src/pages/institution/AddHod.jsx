



import React, { useEffect, useState } from "react";
import Inputfield from "../../components/common/Inputfield";
import Button from "../../components/common/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { UserPlus, GraduationCap } from "lucide-react";

function AddHod() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setSelectedDepartment] = useState("");
  const [deptid, setDeptid] = useState([]); // list of departments

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/superadmin_app/department", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setDeptid(res.data))
      .catch((err) => {
        console.error("Failed to load department:", err.response?.data || err);
        setDeptid([]);
      });
  }, []);

  const hod_create = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://127.0.0.1:8000/collegeapp/hods/",
        { username, email, password, phone, department },
        { headers: { Authorization: `Token ${token}` } }
      );

      toast.success("🎉 HOD Created Successfully!");
      setUsername("");
      setEmail("");
      setPassword("");
      setPhone("");
      setSelectedDepartment("");
    } catch (error) {
      console.log(error);
      toast.error("❌ Failed to create HOD");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white shadow-xl rounded-2xl border border-gray-100 p-8 relative overflow-hidden">
        {/* Decorative Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 opacity-70 pointer-events-none rounded-2xl"></div>

        {/* Content Wrapper */}
        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-full">
              <UserPlus className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Add HOD</h2>
          </div>

          {/* Form */}
          <form onSubmit={hod_create} className="space-y-5">
            <Inputfield
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Inputfield
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Inputfield
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Inputfield
              label="Phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {/* Department Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <div className="relative">
                <select
                  value={department}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none shadow-sm"
                >
                  <option value="">Select Department</option>
                  {Array.isArray(deptid) &&
                    deptid.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                </select>
                <GraduationCap className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                label="Add HOD"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 rounded-xl shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddHod;
