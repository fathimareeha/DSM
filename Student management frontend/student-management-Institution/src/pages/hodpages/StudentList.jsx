import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, User } from "lucide-react";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/collegeapp/students/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error fetching students", err))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin w-6 h-6 text-gray-600" />
        <span className="ml-2 text-gray-600">Loading students...</span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Department Students</h1>
        <p className="text-gray-500">View all students in your department</p>
      </div>

      {students.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No students found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student, index) => (
            <div
              key={student.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-4">
                {student.photo ? (
                  <img
                    src={student.photo}
                    alt={student.username}
                    className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100"
                  />
                ) : (
                  <User className="w-16 h-16 text-indigo-600 p-2 bg-indigo-100 rounded-full" />
                )}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{student.username}</h2>
                  <p className="text-sm text-gray-500">Roll No: {student.roll_no}</p>
                </div>
              </div>

              <div className="space-y-2 text-gray-600 text-sm">
                <p><span className="font-medium">Semester:</span> {student.semester_name}</p>
                <p><span className="font-medium">Department:</span> {student.department_name}</p>
                <p><span className="font-medium">Course:</span> {student.course_name}</p>
                <p><span className="font-medium">Address:</span> {student.address}</p>
                <p><span className="font-medium">Gender:</span> {student.gender}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
