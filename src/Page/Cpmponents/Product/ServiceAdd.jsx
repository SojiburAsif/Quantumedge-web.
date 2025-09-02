import React, { useState } from "react";
import {
  FaBoxOpen,
  FaTags,
  FaInfoCircle,
  FaDollarSign,
  FaClock,
  FaUser,
  FaLaptopCode,
  FaPlusCircle,
} from "react-icons/fa";
import UseAxiosSecure from "../../../Hooks/UseAxios";
import Swal from "sweetalert2";

export default function ServicesAdd() {
  const axiosSecure = UseAxiosSecure();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.post("/services", product);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Project Added!",
          text: "Your project/service has been added successfully.",
          confirmButtonColor: "#16a34a",
        });
        setProduct({
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
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Unable to add project/service. Try again.",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  const inputBase =
    "w-full bg-gray-900 text-white placeholder-gray-400 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#14301a] via-[#030a05] to-[#031407] flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-4xl bg-black rounded-xl shadow-2xl border border-green-400 p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-green-500 mb-8 text-center flex items-center justify-center gap-3">
          <FaPlusCircle className="text-green-400 text-3xl" />
          Add New Project / Service
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Name */}
          <div className="col-span-1 md:col-span-2 flex items-center gap-3">
            <FaBoxOpen className="text-green-400 text-xl md:text-2xl" />
            <input
              type="text"
              name="name"
              placeholder="Project / Service Name"
              value={product.name}
              onChange={handleChange}
              className={inputBase}
              required
            />
          </div>

          {/* Category */}
          <div className="flex items-center gap-3">
            <FaTags className="text-green-400 text-xl" />
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className={inputBase + " appearance-none"}
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
            <FaLaptopCode className="text-green-400 text-xl" />
            <select
              name="type"
              value={product.type}
              onChange={handleChange}
              className={inputBase + " appearance-none"}
              required
            >
              <option value="">Select Project Type</option>
              <option value="Fixed Price Project">Fixed Price Project</option>
              <option value="Hourly Project">Hourly Project</option>
            </select>
          </div>

          {/* Description */}
          <div className="col-span-1 md:col-span-2 flex items-start gap-3">
            <FaInfoCircle className="text-green-400 text-xl mt-2" />
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
            <FaClock className="text-green-400 text-xl" />
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
            <FaDollarSign className="text-green-400 text-xl" />
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
            <FaUser className="text-green-400 text-xl" />
            <select
              name="level"
              value={product.level}
              onChange={handleChange}
              className={inputBase + " appearance-none"}
              required
            >
              <option value="">Select Level</option>
              <option value="Entry">Entry</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Senior">Senior</option>
            </select>
          </div>

          {/* Client */}
          <div className="flex items-center gap-3">
            <FaUser className="text-green-400 text-xl" />
            <input
              type="text"
              name="client"
              placeholder="Client Name (optional)"
              value={product.client}
              onChange={handleChange}
              className={inputBase}
            />
          </div>

          {/* Skills */}
          <div className="col-span-1 md:col-span-2 flex items-start gap-3">
            <FaLaptopCode className="text-green-400 text-xl mt-2" />
            <textarea
              name="skills"
              placeholder="Skills Required (comma separated)"
              value={product.skills}
              onChange={handleChange}
              className={`${inputBase} resize-none h-20`}
            />
          </div>

          {/* Submit */}
          <div className="col-span-1 md:col-span-2 flex justify-end mt-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-md bg-green-500 hover:bg-green-600 text-white font-semibold shadow-md transition"
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
