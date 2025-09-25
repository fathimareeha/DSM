// src/pages/StaffDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Mail, Phone, User, Briefcase } from "lucide-react";

function StaffDetail() {
  const { id } = useParams();
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://127.0.0.1:8000/collegeapp/coordinators/${id}/`,
          {
            headers: { Authorization: `Token ${token}` },
          }
        );
        setStaff(response.data);
      } catch (error) {
        console.error("Error fetching staff details:", error);
      }
    };
    fetchStaff();
  }, [id]);

  if (!staff) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Loading staff details...
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Back Button */}
      <Link
        to="/admin/staffs/list"
        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to List
      </Link>

      {/* Profile Card */}
      <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-500 h-32 relative">
          <div className="absolute -bottom-12 left-8 flex items-center">
            <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center border-4 border-white text-blue-600 text-3xl font-bold">
              {staff.user_username?.charAt(0).toUpperCase()}
            </div>
            <div className="ml-6 text-white">
              <h2 className="text-2xl font-bold">{staff.user_username}</h2>
              <p className="text-sm text-blue-100">Coordinator</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="pt-16 px-8 pb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Staff Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Name:</span>
              <span>{staff.user_username}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Email:</span>
              <span>{staff.user_email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Role:</span>
              <span>{staff.coordinators_role}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Phone:</span>
              <span>{staff.user_phone || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffDetail;
