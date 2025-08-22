import React, { useContext } from "react";
import DashboardCard from "../common/Card";
import CalendarCard from "../common/Calender";
import AttendanceChart from "../common/Chart";
import UpcomingEvents from "../common/Upcomingevents";
import { AuthContext } from "../../context/institution/Authcontext"; // ✅ import context

function Statistics() {
  const { user } = useContext(AuthContext); // ✅ get logged-in user

  // Handle calendar date selection
  const handleDateChange = (date) => {
    console.log("Selected Date:", date);
    // Optional: handle filtering/scheduling logic here
  };

  return (
    <div className="p-6 space-y-6">
      {/* ✅ Navbar with Username */}
      <div className="flex items-center justify-between bg-white shadow-md rounded-lg px-6 py-4">
        <h1 className="text-2xl font-bold text-indigo-700">📊 Dashboard</h1>
        <div className="flex items-center gap-3">
          <span className="text-gray-700 font-medium">
            Welcome, {user?.username || "Guest"}
          </span>
          <img
            src="/user-avatar.png"
            alt="profile"
            className="w-10 h-10 rounded-full border"
          />
        </div>
      </div>

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

      {/* Calendar + Charts */}
      <div className="flex justify-start gap-6">
        <CalendarCard onDateChange={handleDateChange} />
        <AttendanceChart />
        <UpcomingEvents />
      </div>
    </div>
  );
}

export default Statistics;
