// import React, { useState, useEffect } from "react";
// import axios from "axios";

// // ✅ Axios instance with auth
// const api = axios.create({
//   baseURL: "http://127.0.0.1:8000/schoolapp/",
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Token ${token}`; // 🔑 DRF TokenAuth
//   }
//   return config;
// });

// // 🔢 Convert number → Roman numeral
// const toRoman = (num) => {
//   if (!num) return "";
//   const romans = [
//     ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400],
//     ["C", 100], ["XC", 90], ["L", 50], ["XL", 40],
//     ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1],
//   ];
//   let result = "";
//   for (let [letter, value] of romans) {
//     while (num >= value) {
//       result += letter;
//       num -= value;
//     }
//   }
//   return result;
// };

// export default function AddTeachers() {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     phone: "",
//     gender: "Male",
//     profilePic: null,
//     standard: "",
//     section: "",
//     subjects: [],
//     is_class_teacher: false,
//   });

//   const [standards, setStandards] = useState([]);
//   const [sections, setSections] = useState([]);
//   const [subjects, setSubjects] = useState([]);

//   // ✅ Fetch Standards & Subjects
//   const fetchData = async () => {
//     try {
//       const stdRes = await api.get("standards/");
//       setStandards(Array.isArray(stdRes.data) ? stdRes.data : []);

//       const subRes = await api.get("subjectcreate/");
//       setSubjects(Array.isArray(subRes.data) ? subRes.data : []);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // ✅ When standard changes, update sections
//   const handleStandardChange = (e) => {
//     const standardId = e.target.value;
//     setFormData({ ...formData, standard: standardId, section: "" });

//     const selectedStandard = standards.find(
//       (std) => String(std.id) === String(standardId)
//     );

//     // ✅ Extract sections from standard
//     setSections(selectedStandard ? selectedStandard.sections || [] : []);
//   };

//   // ✅ Handle other form inputs
//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;
//     if (type === "checkbox" && name === "is_class_teacher") {
//       setFormData({ ...formData, [name]: checked });
//     } else if (type === "file") {
//       setFormData({ ...formData, [name]: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   // ✅ Handle multiple subjects
//   const handleSubjectsChange = (e) => {
//     const values = Array.from(e.target.selectedOptions, (opt) => opt.value);
//     setFormData({ ...formData, subjects: values });
//   };

//   // ✅ Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formPayload = new FormData();
//       Object.entries(formData).forEach(([key, value]) => {
//         if (Array.isArray(value)) {
//           value.forEach((v) => formPayload.append(key, v)); // ✅ no [] in key
//         } else {
//           formPayload.append(key, value);
//         }
//       });

//       await api.post("teachers/", formPayload, {
//         headers: { "Content-Type": "multipart/form-data" },
//         Authorization: token ? `Token ${token}` : undefined,
//       });

//       alert("Teacher created successfully ✅");
//       setFormData({
//         username: "",
//         email: "",
//         password: "",
//         phone: "",
//         gender: "Male",
//         profilePic: null,
//         standard: "",
//         section: "",
//         subjects: [],
//         is_class_teacher: false,
//       });
//       setSections([]); // reset sections when cleared
//     } catch (error) {
//       console.error("Error creating teacher:", error.response?.data || error);
//       alert("Error creating teacher ❌");
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-bold mb-4">Create Teacher</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Username */}
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />

//         {/* Email */}
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />

//         {/* Password */}
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />

//         {/* Phone */}
//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone Number"
//           value={formData.phone}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />

//         {/* Gender */}
//         <select
//           name="gender"
//           value={formData.gender}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         >
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>

//         {/* Profile Pic */}
//         <input
//           type="file"
//           name="profilePic"
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />

//         {/* Standard Dropdown */}
//         <select
//           name="standard"
//           value={formData.standard}
//           onChange={handleStandardChange}
//           className="w-full p-2 border rounded"
//         >
//           <option value="">Select Standard</option>
//           {standards.map((std) => (
//             <option key={std.id} value={std.id}>
//               Standard {toRoman(Number(std.name))}
//             </option>
//           ))}
//         </select>

//         {/* Section Dropdown */}
//         <select
//           name="section"
//           value={formData.section}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           disabled={!sections.length}
//         >
//           <option value="">Select Section</option>
//           {sections.map((sec) => (
//             <option key={sec.id} value={sec.id}>
//               Section {sec.name}
//             </option>
//           ))}
//         </select>

//         {/* Subjects Dropdown */}
//         <div className="flex justify-between items-center">
//           <label className="font-medium">Assign Subjects</label>
//           <button
//             type="button"
//             onClick={fetchData}
//             className="text-sm text-blue-600 hover:underline"
//           >
//             🔄 Refresh Subjects
//           </button>
//         </div>
//         <select
//           multiple
//           name="subjects"
//           value={formData.subjects}
//           onChange={handleSubjectsChange}
//           className="w-full p-2 border rounded h-32"
//         >
//           {subjects.map((sub) => (
//             <option key={sub.id} value={sub.id}>
//               {sub.name} ({sub.code}) – Standard{" "}
//               {sub.standard ? toRoman(Number(sub.standard.name)) : "—"}
//             </option>
//           ))}
//         </select>

//         {/* Class Teacher Checkbox */}
//         <label className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             name="is_class_teacher"
//             checked={formData.is_class_teacher}
//             onChange={handleChange}
//           />
//           <span>Assign as Class Teacher</span>
//         </label>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Create Teacher
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";

// ✅ Axios instance with Token Auth
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/schoolapp/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`; // 🔑 DRF TokenAuth
  }
  return config;
});

// 🔢 Convert number → Roman numeral
const toRoman = (num) => {
  if (!num) return "";
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

export default function AddTeachers() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    gender: "Male",
    profilePic: null,
    standard: "",
    section: "",
    subjects: [],
    is_class_teacher: false,
  });

  const [standards, setStandards] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // ✅ Fetch Standards & Subjects
  const fetchData = async () => {
    try {
      const stdRes = await api.get("standards/");
      setStandards(Array.isArray(stdRes.data) ? stdRes.data : []);

      const subRes = await api.get("subjectcreate/");
      setSubjects(Array.isArray(subRes.data) ? subRes.data : []);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ When standard changes, update sections
  const handleStandardChange = (e) => {
    const standardId = e.target.value;
    setFormData({ ...formData, standard: standardId, section: "", subjects: [] });

    const selectedStandard = standards.find(
      (std) => String(std.id) === String(standardId)
    );

    // ✅ Extract sections from standard
    setSections(selectedStandard ? selectedStandard.sections || [] : []);
  };

  // ✅ Handle other form inputs
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox" && name === "is_class_teacher") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Handle multiple subjects
  const handleSubjectsChange = (e) => {
    const values = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setFormData({ ...formData, subjects: values });
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => formPayload.append(key, v)); // ✅ no [] in key
        } else {
          formPayload.append(key, value);
        }
      });

      await api.post("teachers/", formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
        Authorization: token ? `Token ${token}` : undefined,
      });

      alert("Teacher created successfully ✅");
      setFormData({
        username: "",
        email: "",
        password: "",
        phone: "",
        gender: "Male",
        profilePic: null,
        standard: "",
        section: "",
        subjects: [],
        is_class_teacher: false,
      });
      setSections([]); // reset sections when cleared
    } catch (error) {
      console.error("Error creating teacher:", error.response?.data || error);
      alert("Error creating teacher ❌");
    }
  };

 // ✅ Filter subjects for the chosen standard
const filteredSubjects = formData.standard
  ? subjects.filter(
      (sub) => String(sub.standard?.id) === String(formData.standard)
    )
  : [];

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Create Teacher</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* Phone */}
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* Gender */}
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        {/* Profile Pic */}
        <input
          type="file"
          name="profilePic"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* Standard Dropdown */}
        <select
          name="standard"
          value={formData.standard}
          onChange={handleStandardChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Standard</option>
          {standards.map((std) => (
            <option key={std.id} value={std.id}>
              Standard {toRoman(Number(std.name))}
            </option>
          ))}
        </select>

        {/* Section Dropdown */}
        <select
          name="section"
          value={formData.section}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled={!sections.length}
        >
          <option value="">Select Section</option>
          {sections.map((sec) => (
            <option key={sec.id} value={sec.id}>
              Section {sec.name}
            </option>
          ))}
        </select>
{/* Subjects Dropdown */}
<div className="flex justify-between items-center">
  <label className="font-medium">Assign Subjects</label>
  <button
    type="button"
    onClick={fetchData}
    className="text-sm text-blue-600 hover:underline"
  >
    🔄 Refresh Subjects
  </button>
</div>
<select
  multiple
  name="subjects"
  value={formData.subjects}
  onChange={handleSubjectsChange}
  className="w-full p-2 border rounded h-32"
>
  {subjects.map((sub) => (
    <option key={sub.id} value={sub.id}>
      {sub.name} ({sub.code}) – Standard{" "}
      {sub.standard ? toRoman(Number(sub.standard.name)) : "—"}
    </option>
  ))}
</select>


        {/* Class Teacher Checkbox */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="is_class_teacher"
            checked={formData.is_class_teacher}
            onChange={handleChange}
          />
          <span>Assign as Class Teacher</span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create Teacher
        </button>
      </form>
    </div>
  );
}




// create class teacher(std&sec)---->cls teachr list--->assign butn(cls,section,sub)--->list

// all teachrs list newpage