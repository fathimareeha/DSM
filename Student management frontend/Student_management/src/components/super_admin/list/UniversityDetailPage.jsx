// UniversityDetailPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Building2, Layers, ListChecks } from "lucide-react";

export default function UniversityDetailPage() {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://127.0.0.1:8000/superadmin_app/university_detail/${id}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setUniversity(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!university) return <p className="text-center p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link
        to="/admin/university_list"
        className="text-blue-600 hover:underline font-medium"
      >
        ← Back to Universities
      </Link>

      <h2 className="text-3xl font-bold mt-4 mb-6 text-gray-800">
        {university.name}
      </h2>

      {/* COURSES */}
      {university.courses.map((course) => (
        <div
          key={course.id}
          className="mb-6 p-5 border rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow"
        >
          <h3
            className="text-xl font-semibold flex items-center gap-2 cursor-pointer text-blue-700"
            onClick={() =>
              setSelectedCourse(selectedCourse === course.id ? null : course.id)
            }
          >
            <BookOpen className="w-5 h-5 text-blue-500" />
            {course.name}
          </h3>

          <AnimatePresence>
            {selectedCourse === course.id &&
              course.departments.map((dept) => (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="ml-6 mt-3"
                >
                  <h4
                    className="font-medium flex items-center gap-2 cursor-pointer text-green-700"
                    onClick={() =>
                      setSelectedDepartment(
                        selectedDepartment === dept.id ? null : dept.id
                      )
                    }
                  >
                    <Building2 className="w-5 h-5 text-green-500" />
                    {dept.name}
                  </h4>

                  <AnimatePresence>
                    {selectedDepartment === dept.id &&
                      dept.semesters.map((sem) => (
                        <motion.div
                          key={sem.id}
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="ml-6 mt-2"
                        >
                          <h5
                            className="font-medium flex items-center gap-2 cursor-pointer text-purple-700"
                            onClick={() =>
                              setSelectedSemester(
                                selectedSemester === sem.id ? null : sem.id
                              )
                            }
                          >
                            <Layers className="w-5 h-5 text-purple-500" />
                            Semester {sem.number}
                          </h5>

                          <AnimatePresence>
                            {selectedSemester === sem.id && (
                              <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="mt-3"
                              >
                                <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                                  <table className="w-full text-sm text-left text-gray-700">
                                    <thead className="bg-gray-100 text-gray-600">
                                      <tr>
                                        <th className="px-4 py-2 border-b">
                                          Subject
                                        </th>
                                        <th className="px-4 py-2 border-b">
                                          Code
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {sem.subjects.map((sub, index) => (
                                        <tr
                                          key={sub.id}
                                          className={`${
                                            index % 2 === 0
                                              ? "bg-white"
                                              : "bg-gray-50"
                                          } hover:bg-blue-50 transition`}
                                        >
                                          <td className="px-4 py-2 border-b">
                                            <div className="flex items-center gap-2">
                                              <ListChecks className="w-4 h-4 text-blue-500" />
                                              {sub.name}
                                            </div>
                                          </td>
                                          <td className="px-4 py-2 border-b font-mono text-gray-800">
                                            {sub.code}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
