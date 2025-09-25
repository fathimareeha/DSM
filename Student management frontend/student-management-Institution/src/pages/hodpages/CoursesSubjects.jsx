import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, BookOpen } from "lucide-react";

export default function CoursesSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token"); // 👈 get token

    axios
      .get("http://127.0.0.1:8000/superadmin_app/subject", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setSubjects(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching subjects", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin w-6 h-6 text-gray-600" />
        <span className="ml-2">Loading Subjects...</span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <BookOpen /> Courses & Subjects
      </h1>

      {subjects.length === 0 ? (
        <p className="text-gray-500">No subjects available.</p>
      ) : (
        <div className="space-y-4">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="bg-white rounded-2xl shadow-md p-4"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {subject.name}{" "}
                <span className="text-sm text-gray-500">({subject.code})</span>
              </h2>

              <p className="text-gray-600">
                Semester: {subject.semester.number}
              </p>
              <p className="text-gray-600">
                Department: {subject.semester.department.name}
              </p>
              <p className="text-gray-600">
                Course: {subject.semester.department.course.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
