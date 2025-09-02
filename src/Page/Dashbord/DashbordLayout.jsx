import React from "react";
import { NavLink, Outlet } from "react-router"; // <-- react-router-dom use করতে হবে
import {
  FaHome,
  FaBriefcase,
  FaUser,
  FaCog,
  FaPlusCircle,
  FaClipboardList,
  FaCalendarCheck,
} from "react-icons/fa";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
    <aside className="w-64 text-white flex flex-col p-5 shadow-lg border-r   border-green-500 ">

        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <nav className="space-y-3">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-lg transition ${
                isActive
                  ? "bg-gray-700 text-green-500"
                  : "hover:bg-gray-700 hover:text-green-300"
              }`
            }
          >
            <FaHome /> Home
          </NavLink>

          <NavLink
            to="/dashboard/jobs"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-lg transition ${
                isActive
                  ? "bg-gray-700 text-green-500"
                  : "hover:bg-gray-700 hover:text-green-300"
              }`
            }
          >
            <FaBriefcase /> Jobs
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-lg transition ${
                isActive
                  ? "bg-gray-700 text-green-500"
                  : "hover:bg-gray-700 hover:text-green-300"
              }`
            }
          >
            <FaUser /> Profile
          </NavLink>

          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-lg transition ${
                isActive
                  ? "bg-gray-700 text-green-500"
                  : "hover:bg-gray-700 hover:text-green-300"
              }`
            }
          >
            <FaCog /> Settings
          </NavLink>

          <hr className="border-gray-700 my-4" />

          {/* Extra Menu */}
          <NavLink
            to="/dashboard/add-services"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-lg transition ${
                isActive
                  ? "bg-gray-700 text-green-500"
                  : "hover:bg-gray-700 hover:text-green-300"
              }`
            }
          >
            <FaPlusCircle /> Add Services
          </NavLink>

          <NavLink
            to="/dashboard/manage-services"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-lg transition ${
                isActive
                  ? "bg-gray-700 text-green-500"
                  : "hover:bg-gray-700 hover:text-green-300"
              }`
            }
          >
            <FaClipboardList /> Manage Services
          </NavLink>

          <NavLink
            to="/dashboard/booking-services"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-lg transition ${
                isActive
                  ? "bg-gray-700 text-green-500"
                  : "hover:bg-gray-700 hover:text-green-300"
              }`
            }
          >
            <FaCalendarCheck /> Booking Services
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
