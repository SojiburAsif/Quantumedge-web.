import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaPlusCircle,
  FaClipboardList,
  FaCalendarCheck,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#030a05] text-white">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-[#0f1e14] border-r border-green-500 shadow-lg transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-green-700">
          <img className="w-35" src="https://i.ibb.co.com/f6zqCs3/521ed31f20ef6319a6b45c9c3855d0e9e1d4837f-1.png" alt="" />
          {/* Close button (only mobile) */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-green-400"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <nav className="p-5 space-y-2">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md transition text-sm ${isActive
                ? "bg-gray-700 text-green-500"
                : "hover:bg-gray-700 hover:text-green-300"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <FaHome className="text-sm" /> Home
          </NavLink>

          <hr className="border-gray-700 my-4" />

          <NavLink
            to="/dashboard/add-services"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md transition text-sm ${isActive
                ? "bg-gray-700 text-green-500"
                : "hover:bg-gray-700 hover:text-green-300"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <FaPlusCircle className="text-sm" /> Add Services
          </NavLink>

          <NavLink
            to="/dashboard/manage-services"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md transition text-sm ${isActive
                ? "bg-gray-700 text-green-500"
                : "hover:bg-gray-700 hover:text-green-300"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <FaClipboardList className="text-sm" /> Manage Services
          </NavLink>

          <NavLink
            to="/dashboard/booking-services"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md transition text-sm ${isActive
                ? "bg-gray-700 text-green-500"
                : "hover:bg-gray-700 hover:text-green-300"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <FaCalendarCheck className="text-sm" /> Booking Services
          </NavLink>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar for mobile */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-green-700">
          <button
            onClick={() => setIsOpen(true)}
            className="text-green-400"
          >
            <FaBars size={22} />
          </button>
          <h2 className="text-lg font-semibold text-green-300">Dashboard</h2>
        </div>

        <div className="">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
