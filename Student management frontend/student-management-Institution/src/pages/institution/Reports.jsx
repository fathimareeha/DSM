import React from 'react';
import CountUp from 'react-countup';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, PieChart,
  Pie, Cell, Legend,
} from 'recharts';

function Reports() {
  // 🔢 Sample Stats (you can fetch these via API later)
  const summaryStats = [
    { label: 'Total Students', value: 420 },
    { label: 'Total HODs', value: 10 },
    { label: 'Faculty Members', value: 38 },
    { label: 'Complaints Logged', value: 18 },
  ];

  const studentPerDepartment = [
    { department: 'CSE', count: 120 },
    { department: 'ECE', count: 90 },
    { department: 'MECH', count: 70 },
    { department: 'CIVIL', count: 40 },
  ];

  const studentPerSemester = [
    { semester: 'Sem 1', value: 60 },
    { semester: 'Sem 3', value: 75 },
    { semester: 'Sem 5', value: 80 },
    { semester: 'Sem 7', value: 105 },
  ];

  const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="p-6 space-y-12">
      <h2 className="text-2xl font-bold text-indigo-800">System Reports</h2>

      {/* 🔢 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md border border-indigo-100 text-center"
          >
            <h4 className="text-gray-500 text-sm font-medium mb-2">{stat.label}</h4>
            <p className="text-3xl font-bold text-indigo-700">
              <CountUp end={stat.value} duration={1.5} />
            </p>
          </div>
        ))}
      </div>

      {/* 📊 Bar Chart - Students per Department */}
      <div className="bg-white p-6 rounded-xl shadow border border-indigo-100">
        <h3 className="text-lg font-semibold text-indigo-800 mb-4">Students per Department</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={studentPerDepartment}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 🥧 Pie Chart - Students per Semester */}
      <div className="bg-white p-6 rounded-xl shadow border border-indigo-100">
        <h3 className="text-lg font-semibold text-indigo-800 mb-4">Students by Semester</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={studentPerSemester}
              dataKey="value"
              nameKey="semester"
              cx="50%"
              cy="50%"
              outerRadius={90}
              fill="#8884d8"
              label
            >
              {studentPerSemester.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Reports;
