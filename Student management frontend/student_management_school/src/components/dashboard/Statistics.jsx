import React from 'react';
import DashboardCard from '../common/Card';
import CalendarCard from '../common/Calender';
import AttendanceChart from '../common/Chart';
import UpcomingEvents from '../common/Upcomingevents';


function Statistics() {
  // Handle calendar date selection
  const handleDateChange = (date) => {
    console.log('Selected Date:', date);
    // Optional: handle filtering/scheduling logic here
  };

  return (
    <div className="p-6 space-y-6">
      {/* Dashboard Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          icon="/teacher.svg"
          total={3654}
          title="Total Teachers"
          percentage="1.2%"
          active={3643}
          inactive={11}
        />

        <DashboardCard
          icon="/staff.svg"
          total={3654}
          title="Total Staff"
          percentage="1.2%"
          active={3643}
          inactive={11}
        />

        <DashboardCard
          icon="/student.svg"
          total={3654}
          title="Total Students"
          percentage="1.2%"
          active={3643}
          inactive={11}
        />

        <DashboardCard
          icon="/subject.svg"
          total={3654}
          title="Total Subjects"
          percentage="1.2%"
          active={3643}
          inactive={11}
        />
      </div>

      {/* Calendar Component */}
      <div className="flex justify-start gap-15">
        <CalendarCard onDateChange={handleDateChange} />
        <AttendanceChart/>
        <UpcomingEvents/>
      </div>
    
    </div>
  );
}

export default Statistics;
