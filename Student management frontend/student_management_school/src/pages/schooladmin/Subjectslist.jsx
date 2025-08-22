import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function SubjectList() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubjects = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/schoolapp/subjectcreate/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setSubjects(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load subjects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-8 h-8 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-600">Loading subjects...</span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent mb-6">
        📚 Subjects List
      </h2>

      {subjects.length === 0 ? (
        <p className="text-center text-gray-500">No subjects found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 border-collapse rounded-lg">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              <tr>
                <th className="px-6 py-3 border border-gray-300">ID</th>
                <th className="px-6 py-3 border border-gray-300">Name</th>
                <th className="px-6 py-3 border border-gray-300">Code</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, idx) => (
                <tr
                  key={subject.id}
                  className={`hover:bg-indigo-50 ${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-6 py-3 border border-gray-300 text-center font-medium text-gray-700">
                    {subject.id}
                  </td>
                  <td className="px-6 py-3 border border-gray-300 text-gray-700">
                    {subject.name}
                  </td>
                  <td className="px-6 py-3 border border-gray-300 text-gray-700">
                    {subject.code}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SubjectList;



