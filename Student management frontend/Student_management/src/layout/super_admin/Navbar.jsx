import React, { useState, useEffect } from 'react';
import { Mail, Bell, Menu } from 'lucide-react';

function Navbar({ onMenuClick }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount,setUnreadCount]=useState(0)

  // 👇 Fetch notifications from your API
  useEffect(() => {
  const token = localStorage.getItem('token');
  fetch('http://127.0.0.1:8000/superadmin_app/notification', {
    headers: {
      Authorization: `Token ${token}`
    }
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("🔔 Notification API Response:", data);
      setNotifications(data);
      const unread = data.filter(note => !note.is_read);  // filter unread
      setUnreadCount(unread.length);                   // set unread count
    })
    .catch((err) => console.error('Failed to fetch notifications', err));
}, []);


const handleBellClick = () => {
  const token = localStorage.getItem('token');
  fetch('http://127.0.0.1:8000/superadmin_app/mark_all_read/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log("🔕 All marked as read:", data);
      setUnreadCount(0); // ✅ Clear unread count
      setNotifications(prev => prev.map(note => ({ ...note, is_read: true }))); // Optionally update local state
    })
    .catch(err => console.error("Failed to mark as read", err));
};






  return (
    <header className="p-4 flex justify-between items-center bg-white shadow-md relative">
      {/* Hamburger menu for mobile view */}
      <div className="md:hidden">
        <button onClick={onMenuClick}>
          <Menu size={24} />
        </button>
      </div>

      {/* Search input */}
      <div className="flex-1 mx-6 hidden sm:block">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4 relative">
        <Mail />
        <div className="relative">
          <button onClick={() => {
    setShowNotifications(!showNotifications);  // toggle dropdown
    handleBellClick();                         // mark as read
  }}>
    <Bell className="w-6 h-6 text-gray-700" />
    {unreadCount > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5">
        {unreadCount}
      </span>
    )}
  </button>

          {/* Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
              <div className="p-4 font-bold border-b">Notifications</div>
              {notifications.length === 0 ? (
                <div className="p-4 text-sm text-gray-500">No notifications</div>
              ) : (
                notifications.map((note) => (
                  <div key={note.id} className="p-4 border-b hover:bg-gray-100">
                    <p className="font-semibold">{note.title}</p>
                    <p className="text-sm text-gray-600">{note.message}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(note.created_at).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
