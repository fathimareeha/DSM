
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 

// Function to convert number → Roman numeral
const toRoman = (num) => {
  const romans = [
    ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400],
    ["C", 100], ["XC", 90], ["L", 50], ["XL", 40],
    ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1],
  ];
  let result = "";
  for (let [letter, value] of romans) {
    while (num >= value) {
      result += letter;
      num -= value;
    }
  }
  return result;
};

function StandardSectionList() {
  const [standards, setStandards] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all standards with their sections
  const fetchStandards = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://127.0.0.1:8000/schoolapp/standards/");
      setStandards(res.data);
    } catch (err) {
      console.error("Error fetching standards:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStandards();
  }, []);

  // Toggle section active/inactive
  const toggleSectionStatus = async (sectionId) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/schoolapp/sections/${sectionId}/toggle/`
      );
      fetchStandards(); // Refresh the list after toggling
    } catch (error) {
      console.error("Error updating section status:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      {/* Header with Create Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700">
          Standards & Sections
        </h2>

        <Link
          to="/admin/create/std&sec/"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          + Create Section
        </Link>
      </div>

      {loading ? (
        <p>Loading standards...</p>
      ) : (
        standards.map((standard, index) => (
          <div
            key={standard.id}
            className="mb-6 p-4 bg-white shadow rounded-lg border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold text-gray-800">
                Standard {toRoman(index + 1)} {/* Roman numeral */}
              </h3>
            </div>

            {standard.sections && standard.sections.length > 0 ? (
              <ul className="space-y-2 bg-gray-50 p-3 rounded">
                {standard.sections.map((sec) => (
                  <li
                    key={sec.id}
                    className="flex justify-between items-center px-3 py-2 border rounded-md"
                  >
                    <span>
                      Section {sec.name}{" "}
                      <span
                        className={`ml-2 text-sm ${
                          sec.is_active ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {sec.is_active ? "Active" : "Inactive"}
                      </span>
                    </span>

                    {/* Only Activate / Deactivate button */}
                    <button
                      onClick={() => toggleSectionStatus(sec.id)}
                      className={`px-3 py-1 rounded text-white ${
                        sec.is_active
                          ? "bg-red-700 hover:bg-red-500"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {sec.is_active ? "Deactivate" : "Activate"}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No sections available.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default StandardSectionList;
