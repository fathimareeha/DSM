// src/pages/UpcomingEvents.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token"); // store your DRF token here
      const res = await axios.get(
        "http://127.0.0.1:8000/collegeapp/create/",
        {
          headers: {
            Authorization: `Token ${token}`, // <-- Token auth
          },
        }
      );
      setEvents(res.data);
    } catch (err) {
      setError("Failed to fetch events");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>{error}</p>;
  if (events.length === 0) return <p>No upcoming events.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <p className="mb-2">{event.description}</p>
            <p className="text-sm text-gray-600">
              Start: {new Date(event.start_date).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              End: {new Date(event.end_date).toLocaleString()}
            </p>

            <div className="mb-2">
              <strong>Students:</strong>{" "}
              {event.students.length > 0
                ? event.students.map((s) => s.username).join(", ")
                : "None"}
            </div>
            <div className="mb-2">
              <strong>Faculties:</strong>{" "}
              {event.faculties.length > 0
                ? event.faculties.map((f) => f.username).join(", ")
                : "None"}
            </div>
            <div className="mb-2">
              <strong>HODs:</strong>{" "}
              {event.hods.length > 0
                ? event.hods.map((h) => h.username).join(", ")
                : "None"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
