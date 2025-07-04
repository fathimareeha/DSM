import React from 'react';

function DashboardCard({ icon, title, value, bgColor = 'bg-green-100' }) {
  return (
   <div className={`${bgColor} p-3 rounded-md shadow flex items-center space-x-3`}>
      <div className="rounded-full bg-white w-20 h-20 flex items-center justify-center text-lg text-gray-700">
        {icon}
      </div>
      <div>
        <h1 className="font-semibold text-base">{title}</h1>
        <p className="text-xs">{value}</p>
      </div>
    </div>
  );
}

export default DashboardCard;
