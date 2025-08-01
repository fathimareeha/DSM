import React from 'react'

function Button({label,onclick}) {
  return (
    <button onClick={onclick} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
      {label}
    </button>
  )
}

export default Button