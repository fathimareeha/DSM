import React from "react";
import { FaUserFriends, FaCalendarAlt, FaClock } from "react-icons/fa";

const events = [
  {
    id: 1,
    title: "Parents, Teacher Meet",
    date: "15 July 2024",
    time: "09:10 AM - 10:50 PM",
    color: "border-blue-500",
    iconColor: "text-blue-500",
    avatars: [
      "https://randomuser.me/api/portraits/men/32.jpg",
      "https://randomuser.me/api/portraits/women/65.jpg",
      "https://randomuser.me/api/portraits/men/54.jpg"
    ]
  },
  {
    id: 2,
    title: "Parents, Teacher Meet",
    date: "15 July 2024",
    time: "09:10 AM - 10:50 PM",
    color: "border-blue-500",
    iconColor: "text-blue-500",
    avatars: [
      "https://randomuser.me/api/portraits/women/22.jpg",
      "https://randomuser.me/api/portraits/men/75.jpg",
      "https://randomuser.me/api/portraits/women/34.jpg"
    ]
  },
  {
    id: 3,
    title: "Vacation Meeting",
    date: "07 July 2024 - 07 July 2024",
    time: "09:10 AM - 10:50 PM",
    color: "border-red-500",
    iconColor: "text-red-500",
    avatars: [
      "https://randomuser.me/api/portraits/men/12.jpg",
      "https://randomuser.me/api/portraits/women/43.jpg"
    ]
  }
];

const UpcomingEvents = () => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Upcoming Events</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className={`flex items-center justify-between p-4 border-l-4 ${event.color} bg-gray-50 rounded-lg hover:shadow-lg hover:bg-white transition-all duration-200`}
          >
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                <FaUserFriends className={`${event.iconColor} text-lg`} />
                {event.title}
              </h3>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <FaCalendarAlt className="text-gray-500" /> {event.date}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <FaClock className="text-gray-500" /> {event.time}
              </p>
            </div>
            <div className="flex -space-x-2">
              {event.avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt="avatar"
                  className="w-9 h-9 rounded-full border-2 border-white shadow-sm"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
