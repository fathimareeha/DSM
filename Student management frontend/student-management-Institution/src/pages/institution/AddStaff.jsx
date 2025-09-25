// import React, { useState } from "react";
// import axios from "axios";

// const CreateCoordinator = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     coordinators_role: "",
//     can_access_library: false,
//     can_access_exam: false,
//     can_access_finance: false,
//     can_access_placement: false,
//     can_access_sports: false,
//     can_access_lab: false,
//     can_access_hostel: false,
//   });

//   const rolePermissionMap = {
//     librarian: "can_access_library",
//     controller_of_exam: "can_access_exam",
//     finance_officer: "can_access_finance",
//     placement_officer: "can_access_placement",
//     sports_coordinator: "can_access_sports",
//     lab_coordinator: "can_access_lab",
//     hostel_manager: "can_access_hostel",
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (name === "coordinators_role") {
//       const updatedForm = { ...formData, [name]: value };
//       Object.keys(rolePermissionMap).forEach((role) => {
//         updatedForm[rolePermissionMap[role]] = false;
//       });
//       if (rolePermissionMap[value]) {
//         updatedForm[rolePermissionMap[value]] = true;
//       }
//       setFormData(updatedForm);
//     } else {
//       setFormData({
//         ...formData,
//         [name]: type === "checkbox" ? checked : value,
//       });
//     }
//   };

  
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   const token = localStorage.getItem("token"); // token you got from login API

//   try {
//     const res = await axios.post(
//       "http://127.0.0.1:8000/collegeapp/coordinators/",
//       {
//         username: formData.username,
//         email: formData.email,
//         password: formData.password,
//         coordinators_role: formData.coordinators_role,
//         can_access_library: formData.can_access_library,
//         can_access_exam: formData.can_access_exam,
//         can_access_finance: formData.can_access_finance,
//         can_access_placement: formData.can_access_placement,
//         can_access_sports: formData.can_access_sports,
//         can_access_lab: formData.can_access_lab,
//         can_access_hostel: formData.can_access_hostel,
//       },
//       {
//         headers: {
//            Authorization: `Token ${token}`
          
//         },
//       }
//     );

//     console.log("Staff created:", res.data);
//   } catch (err) {
//     console.error(err.response?.data || err.message);
//   }
// };

//   return (
//     <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6 mt-6">
//       <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//         Create Staff (Coordinator)
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Username */}
//         <div>
//           <label className="block font-semibold mb-1">Username</label>
//           <input
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Email */}
//         <div>
//           <label className="block font-semibold mb-1">Email</label>
//           <input
//             type="email"
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Password */}
//         <div>
//           <label className="block font-semibold mb-1">Password</label>
//           <input
//             type="password"
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Role Dropdown */}
//         <div>
//           <label className="block font-semibold mb-1">Coordinator Role</label>
//           <select
//             name="coordinators_role"
//             value={formData.coordinators_role}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//             required
//           >
//             <option value="">-- Select Role --</option>
//             <option value="librarian">Librarian</option>
//             <option value="controller_of_exam">Controller of Exam</option>
//             <option value="finance_officer">Finance Officer</option>
//             <option value="placement_officer">Placement Officer</option>
//             <option value="sports_coordinator">Sports Coordinator</option>
//             <option value="lab_coordinator">Lab Coordinator</option>
//             <option value="hostel_manager">Hostel Manager</option>
//           </select>
//         </div>

//         {/* Permissions */}
//         <div>
//           <h4 className="font-semibold mb-2">Permissions</h4>
//           <div className="grid grid-cols-2 gap-2">
//             {Object.keys(rolePermissionMap).map((roleKey) => (
//               <label
//                 key={roleKey}
//                 className="flex items-center space-x-2 text-sm"
//               >
//                 <input
//                   type="checkbox"
//                   name={rolePermissionMap[roleKey]}
//                   checked={formData[rolePermissionMap[roleKey]]}
//                   onChange={handleChange}
//                   className="w-4 h-4"
//                 />
//                 <span>
//                   {rolePermissionMap[roleKey]
//                     .replace("can_access_", "")
//                     .replace("_", " ")
//                     .toUpperCase()}
//                 </span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
//         >
//           Create Coordinator
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateCoordinator;




import React, { useState } from "react";
import Inputfield from "../../components/common/Inputfield";
import Button from "../../components/common/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { UserPlus, Briefcase } from "lucide-react";

function CreateCoordinator() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    coordinators_role: "",
    can_access_library: false,
    can_access_exam: false,
    can_access_finance: false,
    can_access_placement: false,
    can_access_sports: false,
    can_access_lab: false,
    can_access_hostel: false,
  });

  const rolePermissionMap = {
    librarian: "can_access_library",
    controller_of_exam: "can_access_exam",
    finance_officer: "can_access_finance",
    placement_officer: "can_access_placement",
    sports_coordinator: "can_access_sports",
    lab_coordinator: "can_access_lab",
    hostel_manager: "can_access_hostel",
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "coordinators_role") {
      const updatedForm = { ...formData, [name]: value };
      Object.keys(rolePermissionMap).forEach((role) => {
        updatedForm[rolePermissionMap[role]] = false;
      });
      if (rolePermissionMap[value]) {
        updatedForm[rolePermissionMap[value]] = true;
      }
      setFormData(updatedForm);
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://127.0.0.1:8000/collegeapp/coordinators/",
        formData,
        { headers: { Authorization: `Token ${token}` } }
      );

      toast.success("🎉 Coordinator Created Successfully!");
      setFormData({
        username: "",
        email: "",
        password: "",
        coordinators_role: "",
        can_access_library: false,
        can_access_exam: false,
        can_access_finance: false,
        can_access_placement: false,
        can_access_sports: false,
        can_access_lab: false,
        can_access_hostel: false,
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("❌ Failed to create Coordinator");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white shadow-xl rounded-2xl border border-gray-100 p-8 relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 opacity-70 pointer-events-none rounded-2xl"></div>

        {/* Content */}
        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-full">
              <UserPlus className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Create Coordinator
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Inputfield
              label="Username"
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />

            <Inputfield
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <Inputfield
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            {/* Role Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Coordinator Role
              </label>
              <div className="relative">
                <select
                  name="coordinators_role"
                  value={formData.coordinators_role}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none shadow-sm"
                >
                  <option value="">-- Select Role --</option>
                  <option value="librarian">Librarian</option>
                  <option value="controller_of_exam">Controller of Exam</option>
                  <option value="finance_officer">Finance Officer</option>
                  <option value="placement_officer">Placement Officer</option>
                  <option value="sports_coordinator">Sports Coordinator</option>
                  <option value="lab_coordinator">Lab Coordinator</option>
                  <option value="hostel_manager">Hostel Manager</option>
                </select>
                <Briefcase className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Permissions */}
            <div>
              <h4 className="font-semibold mb-2">Permissions</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(rolePermissionMap).map((roleKey) => (
                  <label
                    key={roleKey}
                    className="flex items-center space-x-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      name={rolePermissionMap[roleKey]}
                      checked={formData[rolePermissionMap[roleKey]]}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span className="capitalize">
                      {rolePermissionMap[roleKey]
                        .replace("can_access_", "")
                        .replace("_", " ")}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                label="Create Coordinator"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 rounded-xl shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateCoordinator;
