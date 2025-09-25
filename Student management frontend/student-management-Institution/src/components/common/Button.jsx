// import React from 'react'

// function Button({label,onclick}) {
//   return (
//     <button onClick={onclick} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
//       {label}
//     </button>
//   )
// }

// export default Button



// ✅ Fix Button component (keep prop name `onclick`, but bind using `onClick`)
function Button({ label, onclick }) {
  return (
    <button
      onClick={onclick}  // ✅ DOM binding must be camelCase
      className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
    >
      {label}
    </button>
  );
}

export default Button;
