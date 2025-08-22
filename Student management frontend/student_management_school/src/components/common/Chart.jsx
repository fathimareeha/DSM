import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function AttendanceChart() {
  const tabData = {
    Students: {
      stats: { emergency: 28, absent: 1, late: 1 },
      presentPercent: 98.8
    },
    Teachers: {
      stats: { emergency: 2, absent: 0, late: 1 },
      presentPercent: 96.5
    },
    Staff: {
      stats: { emergency: 1, absent: 1, late: 0 },
      presentPercent: 97.2
    }
  };

  const [activeTab, setActiveTab] = useState("Students");
  const activeData = tabData[activeTab];

  const pieData = [
    { name: "Present", value: activeData.presentPercent },
    { name: "Absent", value: 100 - activeData.presentPercent }
  ];

  // Gradient blue for Present, soft red for Absent
  const COLORS = ["url(#presentGradient)", "#F87171"];

  // Custom tooltip with cleaner style
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-xl shadow-lg text-sm border border-gray-100">
          <p className="font-semibold text-gray-700">{payload[0].name}</p>
          <p className="text-blue-600">{payload[0].value.toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg w-full max-w-sm transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">📊 Attendance</h2>
        <span className="text-gray-500 text-sm cursor-pointer hover:text-gray-700">
          📅 Today
        </span>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        {Object.keys(tabData).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-t-lg ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 text-center mb-6">
        {[
          { label: "Emergency", value: activeData.stats.emergency, color: "bg-red-50" },
          { label: "Absent", value: activeData.stats.absent.toString().padStart(2, "0"), color: "bg-yellow-50" },
          { label: "Late", value: activeData.stats.late.toString().padStart(2, "0"), color: "bg-purple-50" }
        ].map((stat, i) => (
          <div
            key={i}
            className={`${stat.color} rounded-xl py-3 shadow-sm hover:shadow-md transition`}
          >
            <p className="text-xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="relative w-full h-52 mb-4">
        <ResponsiveContainer>
          <PieChart>
            {/* Define Gradient for Present */}
            <defs>
              <linearGradient id="presentGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
            </defs>

            <Pie
              data={pieData}
              innerRadius={50}
              outerRadius={85}
              paddingAngle={1}
              cornerRadius={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-gray-800">
          {activeData.presentPercent}%
        </div>
      </div>

      {/* Button */}
      <button className="w-full py-2 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow hover:shadow-md transition-all duration-300">
        📅 View All
      </button>
    </div>
  );
}
