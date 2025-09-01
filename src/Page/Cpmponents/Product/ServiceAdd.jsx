import React, { useState } from "react";
import {
  FaBoxOpen,
  FaTags,
  FaInfoCircle,
  FaDollarSign,
  FaClock,
  FaUser,
  FaLaptopCode,
} from "react-icons/fa";

export default function ServicesAdd() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    duration: "",
    budget: "",
    type: "",
    level: "",
    client: "",
    skills: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Data:", product);
    // TODO: send data to backend API
  };

  const inputBase =
    "w-full bg-gray-950 text-white placeholder-gray-400 border border-transparent rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#14301a] via-[#030a05] to-[#031407] flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-4xl  bg-black rounded-sm shadow-2xl border border-green-400 p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-green-900 mb-6 text-center">
          Add New Project / Service
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name (full width) */}
          <div className="col-span-1 md:col-span-2 flex items-center gap-3">
            <FaBoxOpen className="text-green-700 text-lg md:text-xl" />
            <input
              type="text"
              name="name"
              placeholder="Project / Service Name"
              value={product.name}
              onChange={handleChange}
              className={`${inputBase} text-sm md:text-base`}
              required
            />
          </div>

          {/* Category */}
          <div className="flex items-center gap-3">
            <FaTags className="text-green-700 text-lg" />
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className={`${inputBase} appearance-none`}
              required
            >
              <option value="">Select Category</option>
              <option value="Web Development">Web Development</option>
              <option value="Design">Design</option>
              <option value="Freelancer">Freelancer</option>
              <option value="App Design">App Design</option>
              <option value="Illustration">Illustration</option>
            </select>
          </div>

          {/* Project Type */}
          <div className="flex items-center gap-3">
            <FaLaptopCode className="text-green-700 text-lg" />
            <select
              name="type"
              value={product.type}
              onChange={handleChange}
              className={`${inputBase} appearance-none`}
              required
            >
              <option value="">Select Project Type</option>
              <option value="Fixed Price Project">Fixed Price Project</option>
              <option value="Hourly Project">Hourly Project</option>
            </select>
          </div>

          {/* Description (full width) */}
          <div className="col-span-1 md:col-span-2 flex items-start gap-3">
            <FaInfoCircle className="text-green-700 text-lg mt-2" />
            <textarea
              name="description"
              placeholder="Description"
              value={product.description}
              onChange={handleChange}
              className={`${inputBase} resize-none h-28 md:h-32`}
              required
            />
          </div>

          {/* Duration */}
          <div className="flex items-center gap-3">
            <FaClock className="text-green-700 text-lg" />
            <input
              type="text"
              name="duration"
              placeholder="Duration (e.g., 12M)"
              value={product.duration}
              onChange={handleChange}
              className={inputBase}
              required
            />
          </div>

          {/* Budget */}
          <div className="flex items-center gap-3">
            <FaDollarSign className="text-green-700 text-lg" />
            <input
              type="text"
              name="budget"
              placeholder="Budget Range (e.g., $1,200-$1,400)"
              value={product.budget}
              onChange={handleChange}
              className={inputBase}
              required
            />
          </div>

          {/* Level */}
          <div className="flex items-center gap-3">
            <FaUser className="text-green-700 text-lg" />
            <select
              name="level"
              value={product.level}
              onChange={handleChange}
              className={`${inputBase} appearance-none`}
              required
            >
              <option value="">Select Level</option>
              <option value="Entry">Entry</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Senior">Senior</option>
            </select>
          </div>

          {/* Client Name */}
          <div className="flex items-center gap-3">
            <FaUser className="text-green-700 text-lg" />
            <input
              type="text"
              name="client"
              placeholder="Client Name (optional)"
              value={product.client}
              onChange={handleChange}
              className={inputBase}
            />
          </div>

          {/* Skills (full width) */}
          <div className="col-span-1 md:col-span-2 flex items-start gap-3">
            <FaLaptopCode className="text-green-700 text-lg mt-2" />
            <textarea
              name="skills"
              placeholder="Skills Required (comma separated)"
              value={product.skills}
              onChange={handleChange}
              className={`${inputBase} resize-none h-20`}
            />
          </div>

          {/* Action buttons (full width on mobile, right aligned on md) */}
          <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row items-center md:justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={() => setProduct({
                name: "",
                category: "",
                description: "",
                duration: "",
                budget: "",
                type: "",
                level: "",
                client: "",
                skills: "",
              })}
              className="w-full md:w-auto px-4 py-2 rounded-md border border-green-600 text-green-900 bg-green-100 hover:bg-white transition"
            >
              Reset
            </button>

            <button
              type="submit"
              className="w-full md:w-auto px-5 py-2 rounded-md bg-green-700 hover:bg-green-800 text-white font-semibold shadow-md transition"
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
