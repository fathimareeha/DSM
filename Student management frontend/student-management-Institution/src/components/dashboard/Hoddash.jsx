


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Card from "../common/Card"; // You can reuse your Card component
// import {
//   Users,
//   BookOpen,
//   ClipboardList,
//   User
// } from "lucide-react";

// export default function HODDashboard() {
//   const [cards, setCards] = useState([
//     { icon: Users, label: "Students", total: 0, active: 0, color: "bg-blue-100", text: "text-blue-700" },
//     { icon: User, label: "Faculty", total: 0, active: 0, color: "bg-green-100", text: "text-green-700" },
//     { icon: BookOpen, label: "Courses", total: 0, active: 0, color: "bg-purple-100", text: "text-purple-700" },
//     { icon: ClipboardList, label: "Pending Tasks", total: 0, active: 0, color: "bg-red-100", text: "text-red-700" },
//   ]);

//   const token = localStorage.getItem("token");

//   const updateCardData = (label, total, active) => {
//     setCards(prev =>
//       prev.map(card =>
//         card.label === label
//           ? { ...card, total, active }
//           : card
//       )
//     );
//   };

//   useEffect(() => {
//     const fetchCounts = async () => {
//       try {
//         // Fetch students
//         const studentsRes = await axios.get(
//           "http://127.0.0.1:8000/collegeapp/students/",
//           { headers: { Authorization: `Token ${token}` } }
//         );
//         const students = studentsRes.data;
//         updateCardData("Students", students.length, students.filter(s => s.is_active).length);

//         // Fetch faculty
//         const facultyRes = await axios.get(
//           "http://127.0.0.1:8000/collegeapp/faculties/",
//           { headers: { Authorization: `Token ${token}` } }
//         );
//         const faculty = facultyRes.data;
//         updateCardData("Faculty", faculty.length, faculty.filter(f => f.is_active).length);

//         // Fetch courses
//         const coursesRes = await axios.get(
//           "http://127.0.0.1:8000/superadmin_app/subjects",
//           { headers: { Authorization: `Token ${token}` } }
//         );
//         const courses = coursesRes.data;
//         updateCardData("Courses", courses.length, courses.length); // Assuming all active

//         // Fetch pending tasks
//         const tasksRes = await axios.get(
//           "http://127.0.0.1:8000/collegeapp/tasks/?status=pending",
//           { headers: { Authorization: `Token ${token}` } }
//         );
//         const tasks = tasksRes.data;
//         updateCardData("Pending Tasks", tasks.length, tasks.length); // all pending = active
//       } catch (err) {
//         console.error("Error fetching counts:", err);
//       }
//     };

//     fetchCounts();
//   }, [token]);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">HOD Dashboard</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {cards.map((card) => (
//           <div key={card.label} className={`${card.color} rounded-xl shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition`}>
//             <card.icon className={`w-10 h-10 ${card.text}`} />
//             <div>
//               <p className="text-2xl font-bold text-gray-800">{card.total}</p>
//               <p className={`font-medium ${card.text}`}>{card.label}</p>
//               {card.label !== "Pending Tasks" && (
//                 <p className="text-sm text-gray-600">Active: {card.active}</p>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Add charts like Statistics here if needed */}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, BookOpen, ClipboardList, User } from "lucide-react";

export default function HODDashboard() {
  const [cards, setCards] = useState([
    { icon: Users, label: "Students", total: 0, active: 0, color: "bg-blue-100", text: "text-blue-700" },
    { icon: User, label: "Faculty", total: 0, active: 0, color: "bg-green-100", text: "text-green-700" },
    { icon: BookOpen, label: "Courses", total: 0, active: 0, color: "bg-purple-100", text: "text-purple-700" },
    { icon: ClipboardList, label: "Pending Tasks", total: 0, active: 0, color: "bg-red-100", text: "text-red-700" },
  ]);

  const token = localStorage.getItem("token");

  const updateCardData = (label, total, active) => {
    setCards(prev =>
      prev.map(card =>
        card.label === label ? { ...card, total, active } : card
      )
    );
  };

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // 📌 Fetch students
        const studentsRes = await axios.get(
          "http://127.0.0.1:8000/collegeapp/students/",
          { headers: { Authorization: `Token ${token}` } }
        );
        const students = studentsRes.data;
        updateCardData("Students", students.length, students.filter(s => s.is_active).length);

        // 📌 Fetch faculty
        const facultyRes = await axios.get(
          "http://127.0.0.1:8000/collegeapp/faculties/",
          { headers: { Authorization: `Token ${token}` } }
        );
        const faculty = facultyRes.data;
        updateCardData("Faculty", faculty.length, faculty.filter(f => f.is_active).length);

        // 📌 Fetch subjects (to derive courses)
        const subjectsRes = await axios.get(
          "http://127.0.0.1:8000/superadmin_app/subject",
          { headers: { Authorization: `Token ${token}` } }
        );
        const subjects = subjectsRes.data;

        // ✅ Count unique courses
        const uniqueCourses = new Set(
          subjects.map(subj => subj.semester.department.course.name)
        );

        updateCardData("Courses", uniqueCourses.size, subjects.length);

        // 📌 Fetch pending tasks
        const tasksRes = await axios.get(
          "http://127.0.0.1:8000/collegeapp/tasks/?status=pending",
          { headers: { Authorization: `Token ${token}` } }
        );
        const tasks = tasksRes.data;
        updateCardData("Pending Tasks", tasks.length, tasks.length);

      } catch (err) {
        console.error("Error fetching counts:", err);
      }
    };

    fetchCounts();
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">HOD Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`${card.color} rounded-xl shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition`}
          >
            <card.icon className={`w-10 h-10 ${card.text}`} />
            <div>
              <p className="text-2xl font-bold text-gray-800">{card.total}</p>
              <p className={`font-medium ${card.text}`}>{card.label}</p>
              {card.label !== "Pending Tasks" && (
                <p className="text-sm text-gray-600">
                  Active: {card.active}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
