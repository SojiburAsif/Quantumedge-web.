import React from "react";
import { NavLink, useNavigate } from "react-router";
import { FaListUl, FaSignOutAlt } from "react-icons/fa";
import UseAuth from "../../Hooks/UseAuth";

// 🌿 FancySelect component
function FancySelect({ options = [], value, onChange }) {
  const [val, setVal] = React.useState(value ?? options[0] ?? "");

  return (
    <div className="relative w-[220px] sm:w-[260px]">
      {/* Native select */}
      <select
        value={val}
        onChange={(e) => {
          setVal(e.target.value);
          onChange?.(e.target.value);
        }}
        className="appearance-none w-full bg-[#373b37] text-[#e5fbe3] 
                   rounded-md py-2.5 pl-28 pr-10 
                   shadow-[0_4px_12px_rgba(0,0,0,0.6)] 
                   focus:outline-none"
      >
        {options.map((o) => (
          <option
            key={o}
            value={o}
            className="text-[#0b150c] bg-[#e5fbe3] hover:bg-[#22c55e] hover:text-white"
          >
            {o}
          </option>
        ))}
      </select>

      {/* Left pill */}
      <div
        className="absolute left-3 top-1/2 -translate-y-1/2 
                   bg-[#484947] text-[#ffffff] px-3 py-1 
                   rounded-md text-sm font-medium
                   shadow-inner select-none pointer-events-none"
      >
        {val}
      </div>

      {/* Chevron */}
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#e5fbe3]">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

// 🌿 Header Component
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
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-br from-[#000000] via-[#031107] to-[#031407] text-white font-sans shadow-md">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-20 gap-4 flex-wrap">
          {/* LEFT: Logo + Categories */}
          <div className="flex items-center gap-6 sm:gap-8">
            <NavLink to="/" className="flex items-center gap-2">
              <img
                src="https://i.ibb.co.com/f6zqCs3/521ed31f20ef6319a6b45c9c3855d0e9e1d4837f-1.png"
                alt="QuantumEdge"
                className="h-13 w-auto object-contain drop-shadow-[0_0_12px_rgba(16,185,129,0.35)]"
              />
            </NavLink>

            <button className="hidden sm:flex items-center gap-2 badge badge-outline badge-successrounded-full bg-[#0f3b1f] border rounded-full border-[#0f6b2f] text-[#6df364] hover:bg-[#155d2d] hover:border-[#19b94a] transition">
              <FaListUl className="text-sm opacity-80" />
              Categories
            </button>
          </div>

          {/* RIGHT: Links / Dropdown / Login / Logout */}
          <div className="flex items-center gap-6 sm:gap-8">
            <FancySelect
              options={["Freelancer", "Web Developer", "Designer"]}
              onChange={(v) => console.log("Selected:", v)}
            />

            <NavLink
              to="/dashboard"
              className="hidden lg:inline-block text-sm uppercase tracking-wider text-[#86f29a] hover:text-[#b2f5c0] transition"
            >
              BECOME A SELLER
            </NavLink>

            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 btn btn-sm rounded-full bg-red-500 border-none text-sm font-medium px-3 py-2 hover:bg-red-600 transition shadow-md shadow-red-900/30 hover:shadow-red-500/40"
              >
                <FaSignOutAlt className="text-white" />
                <span className="hidden sm:inline">Logout</span>
              </button>
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
                  className="py-2 rounded-full bg-[#19b94a] border-none text-sm font-medium hover:bg-[#15963d] px-6 transition shadow-md shadow-green-900/30 hover:shadow-green-500/40"
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
