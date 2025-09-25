import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Q1: 2023", collected: 30, total: 75 },
  { name: "Q2: 2023", collected: 40, total: 90 },
  { name: "Q3: 2023", collected: 38, total: 85 },
  { name: "Q4: 2023", collected: 39, total: 90 },
  { name: "Q1: 2024", collected: 37, total: 86 },
  { name: "Q2: 2024", collected: 28, total: 70 },
  { name: "Q3: 2024", collected: 33, total: 75 },
  { name: "Q4: 2024", collected: 36, total: 88 },
];

const FeesCollectionChart = () => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-full max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Fees Collection</h2>
        <span className="text-sm text-gray-500">Last 8 Quarters</span>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} barCategoryGap={30}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
          <Tooltip />
          <Legend verticalAlign="top" align="left" />
          <Bar mt-10 dataKey="collected" stackId="a" fill="#2563eb" name="Collected Fee" />
          <Bar  dataKey="total" stackId="a" fill="#e5e7eb" name="Total Fee" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FeesCollectionChart;
