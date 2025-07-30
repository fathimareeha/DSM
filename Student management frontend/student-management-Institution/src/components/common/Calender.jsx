import React, { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  format,
  isSameMonth,
  isSameDay
} from "date-fns";

const Calendar = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const renderHeader = () => (
    <div className="flex justify-between items-center px-4 py-2">
      <button onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
        &lt;
      </button>
      <h2 className="font-semibold text-lg">
        {format(currentDate, "MMMM yyyy")}
      </h2>
      <button onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
        &gt;
      </button>
    </div>
  );

  const renderDays = () => {
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    return (
      <div className="grid grid-cols-7 text-center text-gray-500 font-medium">
        {days.map((day) => (
          <div key={day} className="py-2">{day}</div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, "d");
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isToday = isSameDay(day, new Date());

        days.push(
          <div
            key={day}
            className={`text-sm text-center py-2 cursor-pointer transition rounded-lg mx-auto w-10 h-10 flex items-center justify-center
              ${isCurrentMonth ? "" : "text-gray-300"}
              ${isToday ? "border border-blue-500" : ""}
              ${selectedDate && isSameDay(day, selectedDate)
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-100"}`}
            onClick={() => {
              setSelectedDate(day);
              if (onDateSelect) onDateSelect(day);
            }}
          >
            {formattedDate}
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(<div className="grid grid-cols-7">{days}</div>);
      days = [];
    }

    return <div>{rows}</div>;
  };

  return (
    <div className="bg-white rounded-xl shadow-md w-fit p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">Schedules</h2>
        <button className="text-blue-500 text-sm hover:underline">
          + Add New
        </button>
      </div>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
