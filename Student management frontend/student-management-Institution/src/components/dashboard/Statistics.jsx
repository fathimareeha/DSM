


import React from 'react'
import Card from '../common/Card'
import Calendar from '../common/Calender'
import DonutChart from '../common/DonutChart'

function Statistics() {
  const cards = [
    {
      icon: '/public/student.svg',
      label: 'total students',
      total: 3654,
      percentage: '1.2%',
      active: 3643,
      inactive: 11
    },
    {
      icon: '/public/teacher.svg',
      label: 'total teachers',
      total: 123,
      percentage: '0.5%',
      active: 120,
      inactive: 3
    },
    {
      icon: '/public/staff.svg',
      label: 'total staffs',
      total: 56,
      percentage: '0.8%',
      active: 54,
      inactive: 2
    },
    {
      icon: '/public/subject.svg',
      label: 'total subjects',
      total: 30,
      percentage: '0%',
      active: 30,
      inactive: 0
    }
  ];

  const handleDateSelect = (date) => {
    console.log("Selected Date:", date);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6">
      {cards.map((card, idx) => {
        const chartData = [
          { label: 'Active', value: card.active },
          { label: 'Inactive', value: card.inactive },
        ];

        return (
          <div key={idx} className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center">
            {/* Top section with text info */}
            <div className="w-full mb-4">
              <Card
                icon={card.icon}
                label={card.label}
                total={card.total}
                percentage={card.percentage}
                active={card.active}
                inactive={card.inactive}
              />
            </div>

            {/* Donut Chart */}
            <div className="relative w-full flex justify-center">
              <DonutChart data={chartData} centerLabel={`${card.active}/${card.total}`} />
            </div>
          </div>
        );
      })}

      {/* Calendar */}
      <div className="col-span-1 md:col-span-2 lg:col-span-1">
        <Calendar onDateSelect={handleDateSelect} />
      </div>
    </div>
  );
}

export default Statistics;


// import React, { useState } from 'react';
// import Calendar from '../common/Calender';
// import DonutChart from '../common/DonutChart';

// function Statistics() {
//   const cards = [
//     {
//       label: 'Students',
//       total: 3654,
//       active: 3643,
//       inactive: 11,
//     },
//     {
//       label: 'Teachers',
//       total: 123,
//       active: 120,
//       inactive: 3,
//     },
//     {
//       label: 'Staffs',
//       total: 56,
//       active: 54,
//       inactive: 2,
//     },
//     {
//       label: 'Subjects',
//       total: 30,
//       active: 30,
//       inactive: 0,
//     },
//   ];

//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const selected = cards[selectedIndex];

//   const chartData = [
//     { label: 'Active', value: selected.active },
//     { label: 'Inactive', value: selected.inactive },
//   ];

//   const handleDateSelect = (date) => {
//     console.log("Selected Date:", date);
//   };

//   return (
//     <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//       {/* Donut Chart Section */}
//       <div className="bg-white rounded-2xl shadow-md p-6 relative">
//         <h2 className="text-xl font-semibold mb-4 text-center">{selected.label}</h2>
//         <DonutChart data={chartData} centerLabel={`${selected.active}/${selected.total}`} />

//         {/* Button Group */}
//         <div className="mt-6 flex flex-wrap justify-center gap-3">
//           {cards.map((item, idx) => (
//             <button
//               key={idx}
//               onClick={() => setSelectedIndex(idx)}
//               className={`px-4 py-2 rounded-full border text-sm font-medium ${
//                 idx === selectedIndex
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
//               }`}
//             >
//               {item.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Calendar Section */}
//       <div>
//         <Calendar onDateSelect={handleDateSelect} />
//       </div>
//     </div>
//   );
// }

// export default Statistics;



// import React, { useState } from 'react';
// import DonutChart from '../common/DonutChart';
// import Calendar from '../common/Calender';
// import Card from '../common/Card';

// function Statistics() {
//   const cards = [
//     {
//       icon: '/public/student.svg',
//       label: 'Students',
//       total: 3654,
//       percentage: '1.2%',
//       active: 3643,
//       inactive: 11
//     },
//     {
//       icon: '/public/teacher.svg',
//       label: 'Teachers',
//       total: 123,
//       percentage: '0.5%',
//       active: 120,
//       inactive: 3
//     },
//     {
//       icon: '/public/staff.svg',
//       label: 'Staffs',
//       total: 56,
//       percentage: '0.8%',
//       active: 54,
//       inactive: 2
//     },
//     {
//       icon: '/public/subject.svg',
//       label: 'Subjects',
//       total: 30,
//       percentage: '0%',
//       active: 30,
//       inactive: 0
//     }
//   ];

//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const selectedCard = cards[selectedIndex];

//   const chartData = [
//     { label: 'Active', value: selectedCard.active },
//     { label: 'Inactive', value: selectedCard.inactive },
//   ];

//   const handleSliceClick = (entry) => {
//     alert(`${entry.label} clicked!\nCount: ${entry.value}`);
//   };

//   const handleDateSelect = (date) => {
//     console.log("Selected Date:", date);
//   };

//   return (
//     <div className="p-6 grid grid-cols-1 gap-6">
//       {/* Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {cards.map((card, idx) => (
//           <div
//             key={idx}
//             onClick={() => setSelectedIndex(idx)}
//             className={`cursor-pointer transition-transform duration-200 transform ${
//               idx === selectedIndex ? 'ring-2 ring-blue-500 scale-105' : 'hover:scale-105'
//             }`}
//           >
//             <Card
//               icon={card.icon}
//               label={card.label}
//               total={card.total}
//               percentage={card.percentage}
//               active={card.active}
//               inactive={card.inactive}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Donut Chart */}
//       <div className="bg-white rounded-2xl shadow-md p-6 relative">
//         <h2 className="text-xl font-semibold mb-4 text-center text-blue-600">
//           {selectedCard.label} Overview
//         </h2>
//         <DonutChart
//           data={chartData}
//           centerLabel={`${selectedCard.active}/${selectedCard.total}`}
//           onSliceClick={handleSliceClick}
//         />
//       </div>

//       {/* Calendar */}
//       <div className="bg-white rounded-2xl shadow-md p-4">
//         <Calendar onDateSelect={handleDateSelect} />
//       </div>
//     </div>
//   );
// }

// export default Statistics;


// import React, { useState } from 'react';
// import Calendar from '../common/Calender';
// import DonutChart from '../common/DonutChart';
// import Card from '../common/Card'; // Make sure you already created this

// function Statistics() {
//   const cards = [
//     {
//       icon: '/public/student.svg',
//       label: 'Students',
//       total: 3654,
//       active: 3643,
//       inactive: 11,
//       percentage: '1.2%',
//     },
//     {
//       icon: '/public/teacher.svg',
//       label: 'Teachers',
//       total: 123,
//       active: 120,
//       inactive: 3,
//       percentage: '0.5%',
//     },
//     {
//       icon: '/public/staff.svg',
//       label: 'Staffs',
//       total: 56,
//       active: 54,
//       inactive: 2,
//       percentage: '0.8%',
//     },
//     {
//       icon: '/public/subject.svg',
//       label: 'Subjects',
//       total: 30,
//       active: 30,
//       inactive: 0,
//       percentage: '0%',
//     },
//   ];

//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const selected = cards[selectedIndex];

//   const chartData = [
//     { label: 'Active', value: selected.active },
//     { label: 'Inactive', value: selected.inactive },
//   ];

//   const handleSliceClick = (entry) => {
//     alert(`${entry.label} clicked: ${entry.value}`);
//   };

//   const handleDateSelect = (date) => {
//     console.log("Selected Date:", date);
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* Card Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {cards.map((card, idx) => (
//           <div
//             key={idx}
//             onClick={() => setSelectedIndex(idx)}
//             className={`cursor-pointer transition-transform duration-200 transform ${
//               idx === selectedIndex ? 'ring-2 ring-blue-500 scale-105' : 'hover:scale-105'
//             }`}
//           >
//             <Card
//               icon={card.icon}
//               label={card.label}
//               total={card.total}
//               percentage={card.percentage}
//               active={card.active}
//               inactive={card.inactive}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Chart + Calendar Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Donut Chart */}
//         <div className="bg-white rounded-2xl shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4 text-center text-blue-600">
//             {selected.label} Overview
//           </h2>
//           <DonutChart
//             data={chartData}
//             centerLabel={`${selected.active}/${selected.total}`}
//             onSliceClick={handleSliceClick}
//           />
//         </div>

//         {/* Calendar */}
//         <div className="bg-white rounded-2xl shadow-md p-4">
//           <Calendar onDateSelect={handleDateSelect} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Statistics;
