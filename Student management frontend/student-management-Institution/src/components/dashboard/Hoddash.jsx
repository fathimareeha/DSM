import React, { useEffect, useState } from "react";
import { Settings } from "lucide-react";

function Hoddash() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
     
      {/* Greeting Card */}
      <div className="bg-blue-600 text-white rounded-xl shadow-lg p-6 flex justify-between items-center relative overflow-hidden">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Good Morning {user ? ` ${user.username}` : "HOD"}
          </h2>
          <p className="text-sm mb-2">Have a great day at work 🎉</p>
          {/* <p className="text-sm">
            Notice: There is a staff meeting at <span className="font-semibold">9 AM</span> today, don’t forget to attend!
          </p> */}
        </div>

       

        {/* Settings Button */}
        <button className="absolute top-3 right-3 bg-white text-blue-600 p-2 rounded-full shadow hover:bg-blue-100 transition">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default Hoddash;
