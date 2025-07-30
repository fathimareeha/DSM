import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { PieChart, Pie, Cell } from 'recharts';
import { CalendarDays, Eye } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const AttendanceChart = ({ data }) => {
  const total = data.total || 1;
  const present = total - (data.emergency + data.absent + data.late);
  const rate = ((present / total) * 100).toFixed(1);

  const chartData = [
    { name: 'Present', value: present },
    { name: 'Absent', value: data.absent },
    { name: 'Late', value: data.late },
    { name: 'Emergency', value: data.emergency },
  ];

  return (
    <div className="relative flex justify-center">
      <PieChart width={160} height={160}>
        <Pie
          data={chartData}
          innerRadius={60}
          outerRadius={80}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
        >
          {chartData.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold text-sm">
        {rate}%
      </div>
    </div>
  );
};

const AttendancePanel = ({ label, data }) => (
  <div>
    <div className="grid grid-cols-3 text-center my-4">
      <div>
        <p className="text-xl font-bold">{data.emergency}</p>
        <p className="text-sm text-gray-500">Emergency</p>
      </div>
      <div>
        <p className="text-xl font-bold">{data.absent}</p>
        <p className="text-sm text-gray-500">Absent</p>
      </div>
      <div>
        <p className="text-xl font-bold">{data.late}</p>
        <p className="text-sm text-gray-500">Late</p>
      </div>
    </div>

    <AttendanceChart data={data} />

    <div className="mt-6 flex justify-center">
      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm font-medium">
        <Eye size={16} />
        View All
      </button>
    </div>
  </div>
);

const AttendanceWidget = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabKeys = Object.keys(data);

  return (
    <div className="w-full max-w-sm mx-auto mt-5 bg-white rounded-xl shadow p-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Attendance</h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <CalendarDays size={16} />
          <span>Today</span>
        </div>
      </div>

      <Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)}>
        <TabList className="flex border-b text-sm font-medium">
          {tabKeys.map((key) => (
            <Tab key={key} className="px-3 py-1 cursor-pointer focus:outline-none">
              {key}
            </Tab>
          ))}
        </TabList>

        {tabKeys.map((key) => (
          <TabPanel key={key}>
            <AttendancePanel label={key} data={data[key]} />
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default AttendanceWidget;
