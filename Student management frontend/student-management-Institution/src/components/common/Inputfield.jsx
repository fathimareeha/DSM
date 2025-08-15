// import React from 'react'

// function Inputfield({label,value,onchange}) {
//   return (
//     <div className="flex flex-col">
//       <label className="mb-1 text-sm text-gray-600 capitalize">{label}</label>
//       <input
//       onChange={onchange}
      
//         type={label === 'password' ? 'password' : 'text'}
//         className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         placeholder={`Enter your ${label}`}
//       />
//     </div>
//   )
// }

// export default Inputfield


import React from 'react';

function Inputfield({ label, value, onChange }) {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-1 text-sm text-gray-600 capitalize">{label}</label>
      <input
        value={value} // ✅ bind the input to parent state
        onChange={onChange} // ✅ notice the case
        type={label === 'password' ? 'password' : 'text'}
        className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={`Enter your ${label}`}
      />
    </div>
  );
}

export default Inputfield;
