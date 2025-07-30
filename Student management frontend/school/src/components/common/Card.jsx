import React from 'react';

const DashboardCard = ({
  icon,
  total,
  title,
  percentage,
  active,
  inactive,
  percentageColor = 'bg-red-100 text-red-600',
}) => {
  return (
    <div className="w-[223px] h-[130px] bg-white shadow rounded-lg p-4 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div className="flex gap-2">
          <img
            src={icon}
            alt="Icon"
            className="w-12 h-12 rounded object-cover"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-800">{total}</h3>
            <p className="text-xs text-gray-500">{title}</p>
          </div>
        </div>
        <div className={`text-xs font-semibold px-2 py-1 rounded ${percentageColor}`}>
          {percentage}
        </div>
      </div>

      <div className="mt-2 border-t pt-2 flex justify-between text-sm text-gray-600">
        <span>
          Active: <span className="font-semibold text-gray-800">{active}</span>
        </span>
        <span className="border-l pl-3">
          Inactive: <span className="font-semibold text-gray-800">{inactive}</span>
        </span>
      </div>
    </div>
  );
};

export default DashboardCard;
