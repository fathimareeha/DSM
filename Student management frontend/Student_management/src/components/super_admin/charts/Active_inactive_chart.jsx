// InstitutionStatusBarChart.js
import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { SuperadminContext } from '../../../context/super_admin/Superadmin_Context';


// Register chart types
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InstitutionStatusBarChart = () => {
  const {
    schoolActive = 0,
    schoolInactive = 0,
    collegeActive = 0,
    collegeInactive = 0,
  } = useContext(SuperadminContext);
  console.log('active schhol',schoolActive,'active college',collegeActive,'inactive school',schoolInactive,'inactive college',collegeInactive);
  

  const data = {
    labels: ['Schools', 'Colleges'],
    datasets: [
      {
        label: 'Active',
        data: [schoolActive,collegeActive],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
      },
      {
        label: 'Inactive',
        data: [schoolInactive, collegeInactive],
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: {
        display: true,
        text: 'Institution Active vs Inactive Count',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center">
      <Bar data={data} options={options} />
    </div>
  );
};

export default InstitutionStatusBarChart;
