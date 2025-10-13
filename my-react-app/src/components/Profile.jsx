// src/components/Progression.jsx
import React from "react";
import { useNavigate } from 'react-router-dom';
import { Home, Layout, Bell, Settings } from "lucide-react";

const Progression = () => {
  const navigate = useNavigate();

  // Example data (this can later come from ProgressContext or an API)
  const user = {
    username: "lnwza007",
    avatar: "https://raw.githubusercontent.com/Sammypef/software-engineer-group/image/gif-host/lyricicon.png", // replace with real user avatar
    level: 1,
    exp: 150,
    maxExp: 300,
    rank: "Beginner",
  };

  const progressPercent = (user.exp / user.maxExp) * 100;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-purple-700 p-5 text-center text-3xl font-bold">
        Progression
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center flex-1 p-6 space-y-4">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-32 h-32 rounded-2xl object-cover"
        />
        <h2 className="text-xl font-semibold">{user.username}</h2>

        {/* Progress Info */}
        <div className="w-full max-w-xs text-center">
          <p className="text-lg mb-2">Level: {user.level}</p>
          <div className="w-full bg-gray-700 rounded-full h-5 overflow-hidden">
            <div
              className="h-5 bg-gradient-to-r from-purple-500 to-yellow-400"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-300 mt-1">
            <span>{user.rank}</span>
            <span>{user.exp}/{user.maxExp} exp</span>
          </div>
        </div>

        {/* Go Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-6 bg-gray-100 text-black px-4 py-2 rounded-md hover:bg-gray-300"
        >
          Go Back
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-purple-700 flex justify-around items-center py-3">
        <Home className="w-8 h-8 cursor-pointer" onClick={() => navigate("/")} />
        <Layout className="w-8 h-8 cursor-pointer" />
        <Bell className="w-8 h-8 cursor-pointer" />
        <Settings className="w-8 h-8 cursor-pointer" />
      </div>
    </div>
  );
};

export default Progression;