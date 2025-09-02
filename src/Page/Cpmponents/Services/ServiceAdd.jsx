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
  FaCalendarAlt,
  FaAward,
  FaTag,
  FaTimes,
} from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/UseAxios";
import Swal from "sweetalert2";

export default function ServicesAdd() {
  const axiosSecure = useAxiosSecure();

  const [product, setProduct] = useState({
    title: "",
    category: "",
    projectType: "",
    description: "",
    duration: "",
    budget: "",
    price: "",
    level: "",
    client: "",
    skills: "",
    date: "",
    badges: "",
    tags: "",
    freelancers: [],
  });

  const [freelancerInput, setFreelancerInput] = useState("");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleAddFreelancer = () => {
    const value = freelancerInput.trim();
    if (!value) return;
    if (product.freelancers.includes(value)) {
      setFreelancerInput("");
      return Swal.fire({
        icon: "info",
        title: "Already added",
        text: "This freelancer entry is already added.",
        confirmButtonColor: "#16a34a",
      });
    }
    setProduct((prev) => ({ ...prev, freelancers: [...prev.freelancers, value] }));
    setFreelancerInput("");
  };

  const handleRemoveFreelancer = (index) => {
    setProduct((prev) => {
      const arr = [...prev.freelancers];
      arr.splice(index, 1);
      return { ...prev, freelancers: arr };
    });
  };

  const handleFreelancerKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddFreelancer();
    }
  };

  const splitToArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (typeof val === "string") {
      return val
        .split(/[,|]/)
        .map((s) => s.trim())
        .filter(Boolean);
    }
    return [String(val)];
  };

  const formatDatePretty = (isoDate) => {
    if (!isoDate) return "";
    const d = new Date(isoDate);
    if (isNaN(d)) return String(isoDate);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "title",
      "category",
      "projectType",
      "description",
      "duration",
      "budget",
      "level",
      "date",
    ];

    for (let field of requiredFields) {
      if (!product[field]) {
        return Swal.fire({
          icon: "warning",
          title: "Missing Field",
          text: `${field} is required`,
          confirmButtonColor: "#16a34a",
        });
      }
    }

    const badgesArr = splitToArray(product.badges);
    const tagsArr = splitToArray(product.tags);

    let priceStr = "";
    if (product.budget && product.budget.trim()) {
      priceStr = product.budget.trim();
    } else if (product.price !== "" && product.price !== null) {
      const num = Number(product.price);
      if (!isNaN(num)) {
        priceStr = `$${num.toLocaleString()}`;
      } else {
        priceStr = String(product.price);
      }
    }

    const postedBy =
      (product.client && product.client.trim()) ||
      (product.freelancers && product.freelancers.length > 0
        ? product.freelancers[0]
        : product.title || "Unknown");

    const prettyDate = formatDatePretty(product.date);

    const payload = {
      name: product.title,
      title: product.title,
      category: product.category,
      projectType: product.projectType,
      description: product.description,
      duration: product.duration,
      budget: product.budget,
      price: priceStr,
      level: product.level,
      client: product.client,
      skills: product.skills,
      date: prettyDate,
      rawDate: product.date,
      badges: badgesArr,
      tags: tagsArr,
      freelancers: product.freelancers,
      postedBy,
    };

    try {
      console.log("Sending payload:", payload);
      const res = await axiosSecure.post("/services", payload);
      console.log("Server response:", res.data);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Project Added!",
          text: "Your project/service has been added successfully.",
          confirmButtonColor: "#16a34a",
        });
        setProduct({
          title: "",
          category: "",
          projectType: "",
          description: "",
          duration: "",
          budget: "",
          price: "",
          level: "",
          client: "",
          skills: "",
          date: "",
          badges: "",
          tags: "",
          freelancers: [],
        });
        setFreelancerInput("");
      }
    } catch (error) {
      console.error("Axios error:", error);
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Unable to add project/service. Try again.";
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: message,
        confirmButtonColor: "#dc2626",
      });
    }
  };

  // Smaller / responsive input style
  const cardInput =
    "w-full bg-white/8 text-white placeholder-white/60 border border-white/8 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition text-sm";

  return (
    <div className="min-h-screen md:mt-16 bg-gradient-to-br from-[#14301a] via-[#030a05] to-[#082c11] text-white text-base py-6 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* TOP BANNER - smaller */}
        <div className="rounded-lg p-4 mb-6 shadow-lg bg-white/6 border border-white/8 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold leading-tight ">Add New Project / Service</h1>
              <p className="mt-1 text-sm text-white/85 max-w-lg">
                Create a public service listing — add tags, badges, freelancers, and budget.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-xs text-white/90 bg-white/6 px-2 py-1 rounded-full font-medium">
                Gradient: #14301a → #030a05 → #082c11
              </div>
            </div>
          </div>
        </div>

        {/* FORM GRID (responsive, smaller padding/gaps) */}
        <form
          onSubmit={handleSubmit}
          className="p-4 rounded-lg shadow-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          style={{
            background:
              "linear-gradient(135deg, rgba(20,48,26,0.14) 0%, rgba(3,10,5,0.14) 50%, rgba(8,44,17,0.14) 100%)",
            border: "1px solid rgba(255,255,255,0.05)",
            backdropFilter: "blur(4px)",
          }}
        >
          {/* Card 1 */}
          <div className="bg-white/6 text-white rounded-lg p-4 border border-white/8 shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5">
            <div className="flex items-center gap-2 mb-2">
              <FaBoxOpen className="text-white/85 text-sm" />
              <div className="text-xs font-medium text-white">Title</div>
            </div>
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={product.title}
              onChange={handleChange}
              className={cardInput}
            />

            <div className="mt-3 flex items-center gap-2">
              <FaCalendarAlt className="text-white/85 text-sm" />
              <div className="text-xs font-medium text-white">Date</div>
            </div>
            <input
              type="date"
              name="date"
              value={product.date}
              onChange={handleChange}
              className={`${cardInput} mt-1`}
            />

            <div className="mt-3 flex items-center gap-2">
              <FaTags className="text-white/85 text-sm" />
              <div className="text-xs font-medium text-white">Category</div>
            </div>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className={`${cardInput} mt-1 bg-black appearance-none`}
            >
              <option value="">Select Category</option>
              <option value="Web Development">Web Development</option>
              <option value="Design">Design</option>
              <option value="Freelancer">Freelancer</option>
              <option value="App Design">App Design</option>
              <option value="Illustration">Illustration</option>
            </select>
          </div>

          {/* Card 2 */}
          <div className="bg-white/6 text-white rounded-lg p-4 border border-white/8 shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5">
            <div className="flex items-center gap-2 mb-2">
              <FaLaptopCode className="text-white/85 text-sm" />
              <div className="text-xs font-medium text-white">Project Type</div>
            </div>
            <select
              name="projectType"
              value={product.projectType}
              onChange={handleChange}
              className={cardInput}
            >
              <option value="">Select Project Type</option>
              <option value="Fixed Price Project">Fixed Price Project</option>
              <option value="Hourly Project">Hourly Project</option>
            </select>

            <div className="mt-3 flex items-center gap-2">
              <FaInfoCircle className="text-white/85 text-sm" />
              <div className="text-xs font-medium text-white">Description</div>
            </div>
            <textarea
              name="description"
              placeholder="Short description"
              value={product.description}
              onChange={handleChange}
              className={`${cardInput} mt-1 resize-none h-20 text-sm`}
            />
          </div>

          {/* Card 3 */}
          <div className="bg-white/6 text-white rounded-lg p-4 border border-white/8 shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5">
            <div className="flex items-center gap-2 mb-2">
              <FaClock className="text-white/85 text-sm" />
              <div className="text-xs font-medium text-white">Duration</div>
            </div>
            <input
              type="text"
              name="duration"
              placeholder="e.g. 3 months"
              value={product.duration}
              onChange={handleChange}
              className={cardInput}
            />

            <div className="mt-3 flex items-center gap-2">
              <FaDollarSign className="text-white/85 text-sm" />
              <div className="text-xs font-medium text-white">Budget Range</div>
            </div>
            <input
              type="text"
              name="budget"
              placeholder='e.g. "$1,200-$1,400"'
              value={product.budget}
              onChange={handleChange}
              className={`${cardInput} mt-1`}
            />

            <div className="mt-3 flex items-center gap-2">
              <FaDollarSign className="text-white/85 text-sm" />
              <div className="text-xs font-medium text-white">Exact Price</div>
            </div>
            <input
              type="number"
              name="price"
              placeholder="Exact price (number)"
              value={product.price}
              onChange={handleChange}
              className={`${cardInput} mt-1`}
            />
          </div>

          {/* Card 4 */}
          <div className="bg-white/6 text-white rounded-lg p-4 border border-white/8 shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5">
            <div className="flex items-center gap-2 mb-2">
              <FaUser className="text-white/85 text-sm" />
              <div className="text-xs font-medium text-white">Level</div>
            </div>
            <select
              name="level"
              value={product.level}
              onChange={handleChange}
              className={cardInput}
            >
              <option value="">Select Level</option>
              <option value="Entry">Entry</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Senior">Senior</option>
            </select>

            <div className="mt-3 flex items-center gap-2">
              <FaUser className="text-white/85 text-sm" />
              <div className="text-xs font-medium text-white">Client (optional)</div>
            </div>
            <input
              type="text"
              name="client"
              placeholder="Client / Posted by"
              value={product.client}
              onChange={handleChange}
              className={`${cardInput} mt-1`}
            />
          </div>

          {/* Card 5 (wider) */}
          <div className="bg-white/6 text-white rounded-lg p-4 border border-white/8 shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5 col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <FaLaptopCode className="text-white/85 text-sm" />
              <div className="text-xs font-medium text-white">Skills</div>
            </div>
            <textarea
              name="skills"
              placeholder="Skills required (comma separated)"
              value={product.skills}
              onChange={handleChange}
              className={`${cardInput} resize-none h-20 text-sm`}
            />
          </div>

          {/* Card 6 */}
          <div className="bg-white/6 text-white rounded-lg p-4 border border-white/8 shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5">
            <div className="flex items-center gap-2 mb-2">
              <FaAward className="text-white/85 text-sm" />
              <div className="text-xs font-medium text-white">Badges</div>
            </div>
            <input
              type="text"
              name="badges"
              placeholder='e.g. "Remote, Senior level"'
              value={product.badges}
              onChange={handleChange}
              className={cardInput}
            />

            <div className="mt-3 flex items-center gap-2">
              <FaTag className="text-white/85 text-sm" />
              <div className="text-xs font-medium text-white">Tags</div>
            </div>
            <input
              type="text"
              name="tags"
              placeholder='e.g. "App Design, Illustration"'
              value={product.tags}
              onChange={handleChange}
              className={`${cardInput} mt-1`}
            />
          </div>

          {/* Card 7: Freelancers (full width on small) */}
          <div className="bg-white/6 text-white rounded-lg p-4 border border-white/8 shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5 col-span-1 sm:col-span-2 lg:col-span-3">
            <div className="flex items-center gap-2 mb-2">
              <FaUser className="text-white/85 text-sm" />
              <div className="text-xs font-medium text-white">Freelancers (add multiple)</div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. John Doe - Senior"
                value={freelancerInput}
                onChange={(e) => setFreelancerInput(e.target.value)}
                onKeyDown={handleFreelancerKeyDown}
                className={`${cardInput} flex-1`}
              />
              <button
                type="button"
                onClick={handleAddFreelancer}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-green-500 hover:bg-green-600 text-white text-sm font-medium shadow-sm transition"
              >
                <FaPlusCircle className="text-sm" />
                <span className="text-sm">Add</span>
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {product.freelancers.length === 0 ? (
                <div className="text-white/75 text-xs">No freelancers added yet.</div>
              ) : (
                product.freelancers.map((f, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-white/10 border border-white/8 px-2 py-0.5 rounded-full text-xs"
                  >
                    <FaUser className="text-white/85 text-xs" />
                    <span className="whitespace-nowrap">{f}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFreelancer(idx)}
                      className="ml-1 p-0.5 rounded-full hover:bg-white/10"
                      aria-label={`Remove ${f}`}
                    >
                      <FaTimes className="text-white/85 text-xs" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Submit area */}
            <div className="mt-3 flex items-center justify-between">
              <div className="text-xs text-white/85">
                Fill the fields and click <span className="font-medium text-white text-sm">Add Project</span>
              </div>

              <button
                type="submit"
                className="px-4 py-1.5 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold shadow-sm transition"
              >
                Add Project
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
