import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NotificationsPanel() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get('/api/superadmin/notifications/', {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}` // or your method
      }
    })
    .then(res => setNotifications(res.data))
    .catch(err => console.error("Failed to fetch notifications", err));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul className="space-y-3 max-h-[300px] overflow-y-auto">
          {notifications.map(notification => (
            <li key={notification.id} className="border-b pb-2">
              <strong>{notification.title}</strong>
              <p className="text-sm text-gray-600">{notification.message}</p>
              <p className="text-xs text-gray-400">{new Date(notification.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NotificationsPanel;
