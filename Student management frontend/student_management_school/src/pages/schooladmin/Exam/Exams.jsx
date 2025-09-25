import React from "react";

const exams = [
  { id: 1, name: "Week Test", date: "13 May 2024", start: "09:30 AM", end: "10:45 AM" },
  { id: 2, name: "Monthly Test", date: "27 May 2024", start: "09:30 AM", end: "11:00 AM" },
  { id: 3, name: "Chapter Wise Test", date: "05 Jun 2024", start: "09:30 AM", end: "10:30 AM" },
  { id: 4, name: "Unit Test", date: "15 Jun 2024", start: "10:30 AM", end: "11:30 AM" },
  { id: 5, name: "Progress Test", date: "20 Jun 2024", start: "11:00 AM", end: "12:00 PM" },
  { id: 6, name: "Oral Test", date: "03 Jul 2024", start: "12:30 PM", end: "01:30 PM" },
  { id: 7, name: "Semester Exam", date: "18 Jul 2024", start: "10:30 AM", end: "12:30 PM" },
  { id: 8, name: "Quarterly Exam", date: "26 Aug 2024", start: "09:00 AM", end: "12:00 PM" },
  { id: 9, name: "Half Yearly Exam", date: "15 Nov 2024", start: "09:30 AM", end: "12:30 PM" },
];

export default function ExamTable() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Examinations</h2>
          <input
            type="text"
            placeholder="Search"
            className="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Exam Name</th>
                <th className="p-3 text-left">Exam Date</th>
                <th className="p-3 text-left">Start Time</th>
                <th className="p-3 text-left">End Time</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam) => (
                <tr
                  key={exam.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{exam.id}</td>
                  <td className="p-3">{exam.name}</td>
                  <td className="p-3">{exam.date}</td>
                  <td className="p-3">{exam.start}</td>
                  <td className="p-3">{exam.end}</td>
                  <td className="p-3 text-center">
                    <button className="text-gray-500 hover:text-blue-600">
                      ⋮
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
