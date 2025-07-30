import React from 'react';

function Inputfield({ label, type = 'text', name, id }) {
  return (
    
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id || name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id || name}
        name={name}
        type={type}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}

export default Inputfield;
