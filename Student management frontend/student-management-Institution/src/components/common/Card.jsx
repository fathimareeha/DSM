import React from "react";

const Card = ({ icon, total, percentage, active, inactive, label }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm hover:shadow-lg transition">
      <div className="flex justify-between items-center">
        {/* Left: Icon + Info */}
        <div className="flex items-center gap-4">
          {/* ✅ In Vite: use icon path directly (public/bus.svg → /bus.svg) */}
          <img 
            src={icon} 
            alt={`${label} Icon`} 
            className="w-12 h-12 object-contain"
          />
          <div>
            <h3 className="text-3xl font-bold text-gray-800">{total}</h3>
            <p className="text-sm text-gray-600">{label}</p>
          </div>
        </div>

        {/* Percentage badge */}
        {/* <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-md font-semibold">
          {percentage}
        </span> */}
      </div>

      {/* Divider */}
      <hr className="my-4" />

      {/* Active/Inactive */}
      <div className="flex justify-between text-sm text-gray-700 font-medium">
        <span>
          Active : <span className="font-bold text-green-600">{active}</span>
        </span>
        <span>
          Inactive : <span className="font-bold text-red-600">{inactive}</span>
        </span>
      </div>
    </div>
  );
};

export default Card;
