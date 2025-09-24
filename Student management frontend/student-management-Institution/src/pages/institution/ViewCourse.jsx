import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function CourseDetails() {
  const { id } = useParams(); // course id from URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/collegeapp/courses/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching course details:", err);
        setLoading(false);
      });
  }, [id, token]);

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (!course) return <p className="text-center mt-6">Course not found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-6">{course.name}</h1>

      {course.departments.map((dept) => (
        <div key={dept.id} className="mb-4 border rounded-lg">
          <h2 className="w-full text-left px-4 py-2 bg-gray-100 font-semibold">
            Department: {dept.name}
          </h2>

          <div className="p-4">
            {dept.semesters.length === 0 ? (
              <p className="text-gray-500">No semesters available</p>
            ) : (
              dept.semesters.map((sem) => (
                <div key={sem.id} className="mb-3">
                  <h3 className="w-full text-left px-3 py-1 bg-gray-50 border rounded">
                    Semester {sem.number}
                  </h3>

                  <ul className="list-disc ml-6 mt-2">
                    {sem.subjects.length === 0 ? (
                      <li className="text-gray-500">No subjects</li>
                    ) : (
                      sem.subjects.map((sub) => (
                        <li key={sub.id}>
                          {sub.name}{" "}
                          {sub.code && (
                            <span className="text-sm text-gray-500">
                              ({sub.code})
                            </span>
                          )}
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CourseDetails;
