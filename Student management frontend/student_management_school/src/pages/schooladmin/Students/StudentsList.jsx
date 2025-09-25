import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

function StudentList() {
  const [students, setStudents] = useState([]);

  // ✅ Fetch Students
  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://127.0.0.1:8000/schoolapp/studentcreate/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ✅ Delete Student
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://127.0.0.1:8000/schoolapp/studentdetail/${id}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      setStudents((prev) => prev.filter((student) => student.id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="p-6">
      {/* ✅ Page Title */}
      <h2 className="text-3xl font-bold text-indigo-800 mb-6 border-b pb-2">
        Manage Students
      </h2>

      {/* ✅ Table Wrapper */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="w-full text-base text-left border-collapse">
          {/* ✅ Table Head */}
          <thead className="bg-indigo-600 text-white text-lg">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Profile</th>
              <th className="px-6 py-4">Admission No</th>
              <th className="px-6 py-4">Roll No</th>
              <th className="px-6 py-4">Student Name</th>
              <th className="px-6 py-4">Standard</th>
              <th className="px-6 py-4">Section</th>
              <th className="px-6 py-4">Gender</th>
              <th className="px-6 py-4">DOB</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Address</th>
              <th className="px-6 py-4">Parent Name</th>
              <th className="px-6 py-4">Relationship</th>
              <th className="px-6 py-4 text-center">Parent Phone</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          {/* ✅ Table Body */}
          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr
                  key={student.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-indigo-50 transition`}
                >
                  <td className="px-6 py-4">{student.id}</td>

                  {/* Profile Picture */}
                  <td className="px-4 py-3">
                    {student.profilePic ? (
                      <img
                        src={student.profilePic}
                        alt="student"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400">No Photo</span>
                    )}
                  </td>

                  {/* Student Details */}
                  <td className="px-6 py-4">{student.admissionNumber}</td>
                  <td className="px-6 py-4">{student.rollNo}</td>
                  <td className="px-6 py-4">{student.studentName}</td>
                  <td className="px-6 py-4">{student.standard}</td>
                  <td className="px-6 py-4">{student.section}</td>
                  <td className="px-6 py-4">{student.gender}</td>
                  <td className="px-6 py-4">{student.dob}</td>
                  <td className="px-6 py-4">{student.Email}</td>
                  <td className="px-6 py-4">{student.studentAddress}</td>
                  <td className="px-6 py-4">{student.parentname}</td>
                  <td className="px-6 py-4">{student.relationship}</td>
                  <td className="px-6 py-4">{student.parentPhone}</td>

                  {/* ✅ Actions */}
                  <td className="px-6 py-4 flex justify-center gap-3">
                    {/* View */}
                    <Link
                      to={`/admin/view/students/${student.id}`}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition text-base font-medium"
                    >
                      VIEW
                    </Link>

                    {/* Edit */}
                    <Link
                      to={`/admin/edit/students/${student.id}`}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-base font-medium"
                    >
                      <Pencil className="w-5 h-5" />
                      EDIT
                    </Link>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition text-base font-medium"
                    >
                      <Trash2 className="w-5 h-5" />
                      DELETE
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="15"
                  className="text-center py-6 text-gray-400 italic"
                >
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentList;
