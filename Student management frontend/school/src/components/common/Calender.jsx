import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiPlus } from 'react-icons/fi';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay
} from 'date-fns';

const CalendarCard = ({ onDateChange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
    if (onDateChange) {
      onDateChange(day); // Call parent callback
    }
  };

  const renderHeader = () => (
    <div className="flex items-center justify-between p-3 border-b">
      <h2 className="text-lg font-semibold">Schedules</h2>
      <button className="text-sm text-blue-600 flex items-center gap-1 hover:underline">
        <FiPlus className="w-4 h-4" />
        Add New
      </button>
    </div>
  );

  const renderMonthNavigation = () => (
    <div className="flex items-center justify-between px-3 py-2">
      <button onClick={handlePrevMonth}>
        <FiChevronLeft className="w-5 h-5" />
      </button>
      <span className="text-md font-medium">
        {format(currentMonth, 'MMMM yyyy')}
      </span>
      <button onClick={handleNextMonth}>
        <FiChevronRight className="w-5 h-5" />
      </button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    let startDate = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 });
    const endDate = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 });

    while (startDate <= endDate) {
      const week = [];

      for (let i = 0; i < 7; i++) {
        const day = startDate;
        const isCurrentMonth = isSameMonth(day, currentMonth);
        const isSelected = isSameDay(day, selectedDate);

        week.push(
          <div
            key={day.toISOString()}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm cursor-pointer
              ${isSelected ? 'bg-blue-500 text-white' : ''}
              ${!isCurrentMonth ? 'text-gray-400' : 'text-gray-800 hover:bg-blue-100'}
            `}
            onClick={() => handleDateClick(day)}
          >
            {format(day, 'd')}
          </div>
        );

        startDate = addDays(startDate, 1);
      }

      days.push(
        <div key={startDate.toISOString()} className="flex justify-between px-3">
          {week}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-white shadow rounded-lg w-full max-w-xs">
      {renderHeader()}
      {renderMonthNavigation()}
      <div className="grid grid-cols-7 text-xs px-3 pb-1 text-center font-medium text-gray-500">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="space-y-2 pb-4">{renderDays()}</div>
    </div>
  );
};

export default CalendarCard;
