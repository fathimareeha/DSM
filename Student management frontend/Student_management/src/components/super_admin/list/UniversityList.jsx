// UniversityListPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function UniversityList() {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/superadmin_app/list_university", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setUniversities(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🎓 Universities</h2>
      <div className="space-y-3">
        {universities.map((uni) => (
          <Link
            key={uni.id}
            to={`/admin/universities/${uni.id}`}
            className="block px-4 py-3 bg-white shadow rounded-lg hover:bg-gray-100 font-medium"
          >
            {uni.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
