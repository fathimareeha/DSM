
// DoughnutChart.js
import React, { useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { SuperadminContext } from '../../../context/super_admin/Superadmin_Context';

// Register needed elements
ChartJS.register(ArcElement, Tooltip, Legend);

const  Institution_count = () => {

  const {totalInstitutions=0,schoolCount=0,collegeCount=0} =useContext(SuperadminContext)
  console.log("College:", collegeCount, "School:", schoolCount, "Total:", totalInstitutions);

  
  const data = {
    labels: ['Colleges', 'Schools'],
    datasets: [
      {
        label: 'Votes',
        data: [collegeCount, schoolCount],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
  <div className="flex flex-col items-center">
    <div className="w-[270px] h-[270px]">
      <Doughnut data={data} options={options} />
    </div>
    <p className="mt-4 text-lg font-semibold">
      Total Institutions: {totalInstitutions}
    </p>
  </div>
);
};

export default  Institution_count;
