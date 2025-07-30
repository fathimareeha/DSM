import React from 'react'

function Inputfield({label}) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm text-gray-600 capitalize">{label}</label>
      <input
        type={label === 'password' ? 'password' : 'text'}
        className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={`Enter your ${label}`}
      />
    </div>
  )
}

export default Inputfield