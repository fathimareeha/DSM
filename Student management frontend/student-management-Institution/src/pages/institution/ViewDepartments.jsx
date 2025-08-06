// import React, { useContext, useEffect, useState } from 'react';
// import { Authcontext } from '../../context/institution/Authcontext';

// function ViewDepartments() {
 
//   const {departmentlist} = useContext(Authcontext)
//   const [departments, setDepartments] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   useEffect(() => {
//     const staticDepartments = [
//       {
//         id: 1,
//         name: 'Computer Science',
//         code: 'CSE',
//         description: 'Department of Computer Science and Engineering',
//       },
//       {
//         id: 2,
//         name: 'Electronics',
//         code: 'ECE',
//         description: 'Department of Electronics and Communication Engineering',
//       },
//       {
//         id: 3,
//         name: 'Mechanical',
//         code: 'MECH',
//         description: 'Department of Mechanical Engineering',
//       },
//     ];

//     // simulate delay
//     setTimeout(() => {
//       setDepartments(staticDepartments);
//       setLoading(false);
//     }, 500); // half second delay
//   }, []);
  
//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-md">
//       <h2 className="text-xl font-bold text-indigo-700 mb-6">Departments List</h2>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading...</p>
//       ) : departments.length === 0 ? (
//         <p className="text-center text-gray-500">No departments found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-200 rounded-md">
//             <thead>
//               <tr className="bg-indigo-100">
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">id</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">College_id</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">update</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Delete</th>
                
                
                
//               </tr>
//             </thead>
//             <tbody>
//               {departmentlist.map((departments) => (
//                 <tr  className="border-t">
                
//                   <td className="px-4 py-2 text-sm">{departments.id}</td>
//                    <td className="px-4 py-2 text-sm">{departments.name}</td>
//                   <td className="px-4 py-2 text-sm">{departments.college}</td> 
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }




// export default ViewDepartments;



// import React, { useContext, useEffect, useState } from 'react';
// import { Authcontext } from '../../context/institution/Authcontext';
// import { useNavigate } from 'react-router-dom';

// function ViewDepartments() {
//   const navigate = useNavigate();
//   const { departmentlist } = useContext(Authcontext);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (departmentlist && departmentlist.length >= 0) {
//       setLoading(false);
//     }
//   }, [departmentlist]);

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-md">
//       <h2 className="text-xl font-bold text-indigo-700 mb-6">Departments List</h2>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading...</p>
//       ) : departmentlist.length === 0 ? (
//         <p className="text-center text-gray-500">No departments found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-200 rounded-md">
//             <thead>
//               <tr className="bg-indigo-100">
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">College ID</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Update</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Delete</th>
//               </tr>
//             </thead>
//             <tbody>
//               {departmentlist.map((dept) => (
//                 <tr key={dept.id} className="border-t">
//                   <td className="px-4 py-2 text-sm">{dept.id}</td>
//                   <td className="px-4 py-2 text-sm">{dept.name}</td>
//                   <td className="px-4 py-2 text-sm">{dept.college}</td>
//                   <td className="px-4 py-2 text-sm">
//                     <button onClick={(department) => navigate(`/admin/edit-department/${department.id}`)} className="text-blue-600 hover:underline">Edit</button>
//                   </td>
//                   <td className="px-4 py-2 text-sm">
//                     <button onClick={() => handleDelete(dept.id)} className="text-red-600 hover:underline">Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ViewDepartments;



import React, { useContext, useEffect, useState } from 'react';
import { Authcontext } from '../../context/institution/Authcontext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DeleteDepartment from './DeleteDepartment';

function ViewDepartments() {
  const navigate = useNavigate();
  const { departmentlist, deleteDepartment } = useContext(Authcontext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (departmentlist && departmentlist.length >= 0) {
      setLoading(false);
    }
  }, [departmentlist]);

  const handleDelete = async (id) => {
    try {
      await deleteDepartment(id);
      toast.success("Department deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete department.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-xl font-bold text-indigo-700 mb-6">Departments List</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : departmentlist.length === 0 ? (
        <p className="text-center text-gray-500">No departments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-md">
            <thead>
              <tr className="bg-indigo-100">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">College ID</th>
                
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Delete</th>
              </tr>
            </thead>
            <tbody>
              {departmentlist.map((dept) => (
                <tr key={dept.id} className="border-t">
                  <td className="px-4 py-2 text-sm">{dept.id}</td>
                  <td className="px-4 py-2 text-sm">{dept.name}</td>
                  <td className="px-4 py-2 text-sm">{dept.college}</td>
                  
                  <td className="px-4 py-2 text-sm">
                    <button
                    
                      onClick={() => deleteDepartment(dept.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
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

export default ViewDepartments;
