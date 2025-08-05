import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
} from 'recharts';

const COLORS = ['#3B82F6', '#22D3EE', '#FBBF24', '#EF4444']; // blue, cyan, yellow, red

const DonutChart = ({ data, centerLabel, onSliceClick }) => {
  return (
    <div className="w-full h-72 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            innerRadius="70%"
            outerRadius="100%"
            paddingAngle={1}
            labelLine={false}
            onClick={(e) => onSliceClick && onSliceClick(e)}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                cursor="pointer"
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* Center label */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <p className="text-lg font-bold text-blue-600">{centerLabel}</p>
      </div>
    </div>
  );
};

export default DonutChart;

