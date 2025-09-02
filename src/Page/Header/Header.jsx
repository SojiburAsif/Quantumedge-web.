import React from "react";
import { NavLink, useNavigate } from "react-router";
import { FaListUl, FaSignOutAlt } from "react-icons/fa";
import UseAuth from "../../Hooks/UseAuth";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = UseAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-br from-[#14301a] via-[#0f3519] to-[#031407]  bg-transparent text-white font-sans shadow-md">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 gap-4 flex-wrap">
          {/* LEFT: Logo + Categories */}
          <div className="flex items-center gap-3">
            <NavLink to="/" className="flex items-center gap-2">
              <img
                src="https://i.ibb.co.com/f6zqCs3/521ed31f20ef6319a6b45c9c3855d0e9e1d4837f-1.png"
                alt="QuantumEdge"
                className="h-9 w-auto object-contain drop-shadow-[0_0_12px_rgba(16,185,129,0.35)]"
              />
            </NavLink>

            <button className="hidden sm:flex items-center gap-2 btn btn-sm bg-[#0f3b1f] border border-[#0f6b2f] text-[#a6f0a1] hover:bg-[#155d2d] hover:border-[#19b94a] transition">
              <FaListUl className="text-sm opacity-80" />
              Categories
            </button>
          </div>

          {/* CENTER: Select/Search box */}
          <div className="hidden md:flex grow justify-center">
            <select className="select select-sm w-[320px] sm:w-[420px] bg-[#12261b] text-[#cfe9d0] border border-green-800/40 shadow-md shadow-green-900/30 focus:border-green-500 focus:shadow-green-500/40 transition">
              <option>Freelancer</option>
              <option>Web Developer</option>
              <option>Designer</option>
            </select>
          </div>

          {/* RIGHT: Links / Login / Logout */}
          <div className="flex items-center gap-3 sm:gap-4">
            <NavLink
              to="/dashboard"
              className="hidden lg:inline-block text-xs uppercase tracking-wider text-[#86f29a] hover:text-[#b2f5c0] transition"
            >
              BECOME A SELLER
            </NavLink>

            {user ? (
              <>
                <span className="hidden sm:inline-block text-sm text-green-400 truncate max-w-[120px]">
                  {user.displayName || user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 btn btn-sm rounded-full bg-red-500 border-none text-sm font-medium px-3 py-2 hover:bg-red-600 transition shadow-md shadow-red-900/30 hover:shadow-red-500/40"
                >
                  <FaSignOutAlt className="text-white" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="text-sm hover:text-[#86f29a] transition"
                >
                  LOGIN
                </NavLink>

                <button
                  onClick={() => navigate("/register")}
                  className="btn btn-sm rounded-full bg-[#19b94a] border-none text-sm font-medium hover:bg-[#15963d] transition shadow-md shadow-green-900/30 hover:shadow-green-500/40"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-green-900/50 max-w-[1350px] mx-auto" />
    </header>
  );
}
