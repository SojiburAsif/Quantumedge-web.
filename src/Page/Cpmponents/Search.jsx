import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";

const options = [
  "Web Developer",
  "Digital Marketing",
  "Graphic Designer",
  "Content Writer",
  "SEO Specialist",
];

const Search = () => {
  const [currentText, setCurrentText] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSelect = (option) => {
    setCurrentText(option);
    setDropdownOpen(false);
  };

  return (
    <div className="w-full">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-10 sm:py-14 mt-8 sm:mt-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-0">
          {/* Search Section */}
          <div className="w-full flex justify-center">
            <div className="w-full">
              {/* Search input + Advanced search */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Search Box */}
                <div className="relative w-full sm:w-[420px] p-[2px] rounded-xl bg-gradient-to-r from-pink-500 via-green-500 to-blue-500">
                  {/* Inner Box */}
                  <div className="flex items-center w-full bg-[#112217] rounded-xl px-3 border-2 border-transparent shadow-md shadow-green-900/40 focus-within:shadow-green-500/40 transition relative">
                    <input
                      type="text"
                      placeholder="Search your needs"
                      value={currentText}
                      onChange={(e) => setCurrentText(e.target.value)}
                      className="grow bg-transparent text-sm sm:text-base text-white placeholder-gray-400 px-2 py-2 outline-none"
                    />

                    {/* Dropdown toggle */}
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="ml-2 w-8 h-8 flex items-center justify-center rounded-full bg-[#0f3b1f] hover:bg-[#155d2d] transition"
                    >
                      <FaChevronDown
                        className={`text-green-400 text-xs transition-transform ${
                          dropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Search button */}
                    <button className="ml-2 w-8 h-8 flex items-center justify-center rounded-full bg-[#19b94a] hover:bg-[#15963d] transition shadow-md shadow-green-900/30 hover:shadow-green-500/40">
                      <FaSearch className="text-[#00210a] text-xs" />
                    </button>
                  </div>

                  {/* Dropdown menu */}
                  {dropdownOpen && (
                    <div className="absolute top-[110%] left-0 w-full bg-[#0f3b1f] rounded-xl border border-green-800 shadow-lg shadow-green-900/40 z-50">
                      {options.map((option, i) => (
                        <div
                          key={i}
                          onClick={() => handleSelect(option)}
                          className="px-4 py-2 text-sm text-green-100 hover:bg-[#155d2d] cursor-pointer"
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Advanced Search button */}
                <button className="w-full sm:w-auto btn btn-sm rounded-full bg-[#19b94a] border-none hover:bg-[#15963d] transition shadow-md shadow-green-900/30 hover:shadow-green-500/40">
                  Advanced search
                </button>
              </div>
            </div>
          </div>

          {/* Decorative circle (hidden on small screens) */}
          <div className="hidden lg:flex items-center justify-end w-1/4 pr-6">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-30 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]"
            >
              <circle cx="32" cy="32" r="16" fill="#17311b" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
