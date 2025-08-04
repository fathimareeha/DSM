import React from "react";

const Card = ({ icon, total, percentage, active, inactive,label }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-full max-w-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img src={icon} alt="Student Icon" className="w-12 h-12" />
          <div>
            <h3 className="text-3xl font-bold">{total}</h3>
            <p className="text-sm text-gray-600">{label}</p>
          </div>
        </div>
        <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-md font-semibold">
          {percentage}
        </span>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between text-sm text-gray-700 font-medium">
        <span>Active : <span className="font-bold">{active}</span></span>
        <span>Inactive : <span className="font-bold">{inactive}</span></span>
      </div>
    </div>
  );
};

export default Card;
