import React from "react";

const MainDashbord = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back, Asif 👋</h1>
        <p className="text-gray-500">Here’s what’s happening in your dashboard today.</p>
      </header>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700">Total Jobs</h2>
          <p className="text-3xl font-bold text-indigo-600 mt-2">12</p>
          <span className="text-sm text-gray-500">+2 new this week</span>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700">Active Services</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">5</p>
          <span className="text-sm text-gray-500">Updated 2 days ago</span>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700">Bookings</h2>
          <p className="text-3xl font-bold text-pink-600 mt-2">8</p>
          <span className="text-sm text-gray-500">3 pending approval</span>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
        <ul className="space-y-3 text-gray-600">
          <li className="flex justify-between">
            <span>✅ New Job Posted: React Developer</span>
            <span className="text-sm text-gray-400">2 hours ago</span>
          </li>
          <li className="flex justify-between">
            <span>📌 Service Updated: UI/UX Design</span>
            <span className="text-sm text-gray-400">1 day ago</span>
          </li>
          <li className="flex justify-between">
            <span>📝 Booking Confirmed: Full-Stack Project</span>
            <span className="text-sm text-gray-400">3 days ago</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default MainDashbord;
