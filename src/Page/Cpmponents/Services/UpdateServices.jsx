import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
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

import Swal from "sweetalert2";
import CardLoading from "../Error&Loading/CardLoading";
import useAxiosSecure from "../../../Hooks/UseAxios";

export default function ServicesUpdate(props) {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const initialData = location.state?.initialData ?? props.initialData ?? null;

  const [loading, setLoading] = useState(false);
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

  const cardInput =
    "w-full bg-black text-white placeholder-white/60 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition text-sm";
  const cardSelect = `${cardInput} appearance-none`;

  /* ---------- helpers ---------- */
  const toYYYYMMDD = (value) => {
    if (!value) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    const d = new Date(value);
    if (isNaN(d)) return "";
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const mapServiceToProduct = (svc) => ({
    title: svc.title || svc.name || "",
    category: svc.category || "",
    projectType: svc.projectType || svc.type || "",
    description: svc.description || "",
    duration: svc.duration || "",
    budget: svc.budget || "",
    price: svc.price || "",
    level: svc.level || "",
    client: svc.client || "",
    skills: svc.skills || "",
    date: toYYYYMMDD(svc.rawDate ?? svc.date ?? ""),
    badges: Array.isArray(svc.badges) ? svc.badges.join(", ") : svc.badges || "",
    tags: Array.isArray(svc.tags) ? svc.tags.join(", ") : svc.tags || "",
    freelancers: Array.isArray(svc.freelancers)
      ? svc.freelancers
      : svc.freelancers
      ? [svc.freelancers]
      : [],
  });

  const splitToArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (typeof val === "string") return val.split(/[,|]/).map((s) => s.trim()).filter(Boolean);
    return [String(val)];
  };

  const formatDatePretty = (isoDate) => {
    if (!isoDate) return "";
    const d = new Date(isoDate);
    if (isNaN(d)) return String(isoDate);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  /* ---------- load initial data ---------- */
  useEffect(() => {
    const loadService = async () => {
      if (initialData) {
        setProduct(mapServiceToProduct(initialData));
        return;
      }
      if (!id) return;

      setLoading(true);
      try {
        const res = await axiosSecure.get(`/services/${id}`);
        const svc = res.data?.data ?? res.data ?? res;
        if (!svc?._id) throw new Error("Service not found");
        setProduct(mapServiceToProduct(svc));
      } catch (err) {
        console.error("Failed to fetch service:", err);
        Swal.fire({
          icon: "error",
          title: "Service not found",
          text: "This service may have been deleted or the ID is invalid.",
          confirmButtonColor: "#dc2626",
        }).then(() => navigate("/dashboard/manage-services"));
      } finally {
        setLoading(false);
      }
    };
    loadService();
  }, [id, initialData, axiosSecure, navigate]);

  /* ---------- handlers ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
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

    const payload = {
      ...product,
      badges: splitToArray(product.badges),
      tags: splitToArray(product.tags),
      rawDate: product.date,
      date: formatDatePretty(product.date),
      postedBy: product.client || product.freelancers[0] || product.title || "Unknown",
    };

    try {
      setLoading(true);
      await axiosSecure.patch(`/services/${id}`, payload);
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Your project/service has been updated successfully.",
        confirmButtonColor: "#16a34a",
      }).then(() => navigate("/dashboard/manage-services"));
    } catch (err) {
      console.error("Update failed:", err);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: err?.response?.data?.message || "Unable to update service.",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ---------- render ---------- */
  if (loading && !initialData) return <CardLoading />;

  return (
    <div className="min-h-screen py-8 px-4 mt-12 sm:px-6 bg-gradient-to-br from-[#0b2f17] via-[#04220f] to-[#07260c] text-white">
      <div className="max-w-5xl mx-auto">
        {/* header */}
        <div className="mb-6 p-5 rounded-xl bg-white/6 border border-white/8 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-white">Edit Service</h1>
              <p className="text-sm text-white/80 mt-1">Update the details for this project/service.</p>
            </div>
            <div className="text-sm text-white/80">
              ID: <span className="font-mono text-xs text-white/90 ml-2">{id}</span>
            </div>
          </div>
        </div>

        {/* single form wrapping all inputs */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          {/* top row: title + date + category */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/6">
              <label className="text-xs font-medium mb-2 flex items-center gap-2">
                <FaBoxOpen /> Title
              </label>
              <input
                name="title"
                value={product.title}
                onChange={handleChange}
                className={cardInput}
                placeholder="Project title"
              />
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/6">
              <label className="text-xs font-medium mb-2 flex items-center gap-2">
                <FaCalendarAlt /> Date
              </label>
              <input
                name="date"
                type="date"
                value={product.date}
                onChange={handleChange}
                className={cardInput}
              />
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/6">
              <label className="text-xs font-medium mb-2 flex items-center gap-2">
                <FaTags /> Category
              </label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className={cardSelect}
              >
                <option value="">Select Category</option>
                <option value="Web Development">Web Development</option>
                <option value="Design">Design</option>
                <option value="Freelancer">Freelancer</option>
                <option value="App Design">App Design</option>
                <option value="Illustration">Illustration</option>
              </select>
            </div>
          </div>

          {/* middle row: type + description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/6">
              <label className="text-xs font-medium mb-2 flex items-center gap-2">
                <FaLaptopCode /> Project Type
              </label>
              <select
                name="projectType"
                value={product.projectType}
                onChange={handleChange}
                className={cardSelect}
              >
                <option value="">Select Project Type</option>
                <option value="Fixed Price Project">Fixed Price Project</option>
                <option value="Hourly Project">Hourly Project</option>
              </select>

              <label className="text-xs font-medium mt-4 mb-2 flex items-center gap-2">
                <FaClock /> Duration
              </label>
              <input
                name="duration"
                value={product.duration}
                onChange={handleChange}
                className={cardInput}
                placeholder="e.g. 2 weeks"
              />
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/6">
              <label className="text-xs font-medium mb-2 flex items-center gap-2">
                <FaInfoCircle /> Description
              </label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                className={`${cardInput} h-36 resize-none`}
                placeholder="Write a short description..."
              />
            </div>
          </div>

          {/* pricing & client */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/6">
              <label className="text-xs font-medium mb-2 flex items-center gap-2">
                <FaDollarSign /> Budget Range
              </label>
              <input
                name="budget"
                value={product.budget}
                onChange={handleChange}
                className={cardInput}
                placeholder="e.g. $100 - $500"
              />

              <label className="text-xs font-medium mt-3 mb-2 flex items-center gap-2">
                <FaDollarSign /> Exact Price
              </label>
              <input
                name="price"
                type="number"
                value={product.price}
                onChange={handleChange}
                className={cardInput}
                placeholder="Optional exact price"
              />
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/6">
              <label className="text-xs font-medium mb-2 flex items-center gap-2">
                <FaUser /> Level
              </label>
              <select
                name="level"
                value={product.level}
                onChange={handleChange}
                className={cardSelect}
              >
                <option value="">Select Level</option>
                <option value="Entry">Entry</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Senior">Senior</option>
              </select>

              <label className="text-xs font-medium mt-3 mb-2 flex items-center gap-2">
                <FaUser /> Client
              </label>
              <input
                name="client"
                value={product.client}
                onChange={handleChange}
                className={cardInput}
                placeholder="Optional client name"
              />
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/6">
              <label className="text-xs font-medium mb-2 flex items-center gap-2">
                <FaLaptopCode /> Skills
              </label>
              <textarea
                name="skills"
                value={product.skills}
                onChange={handleChange}
                className={`${cardInput} h-24 resize-none`}
                placeholder="Comma separated skills"
              />
            </div>
          </div>

          {/* badges & tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/6">
              <label className="text-xs font-medium mb-2 flex items-center gap-2">
                <FaAward /> Badges
              </label>
              <input
                name="badges"
                value={product.badges}
                onChange={handleChange}
                className={cardInput}
                placeholder="Comma separated badges"
              />
              <p className="text-xs text-white/60 mt-2">
                Use comma (,) or pipe (|) to separate multiple badges.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/6">
              <label className="text-xs font-medium mb-2 flex items-center gap-2">
                <FaTag /> Tags
              </label>
              <input
                name="tags"
                value={product.tags}
                onChange={handleChange}
                className={cardInput}
                placeholder="Comma separated tags"
              />
              <p className="text-xs text-white/60 mt-2">Tags help users find your service.</p>
            </div>
          </div>

          {/* freelancers + submit */}
          <div className="p-4 rounded-lg bg-white/5 border border-white/6">
            <label className="text-xs font-medium mb-2 flex items-center gap-2">
              <FaUser /> Freelancers
            </label>
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
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white text-sm"
              >
                <FaPlusCircle /> Add
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {product.freelancers.length === 0 ? (
                <div className="text-xs text-white/60">No freelancers added yet.</div>
              ) : (
                product.freelancers.map((f, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-white/10 border border-white/8 px-3 py-1 rounded-full text-xs"
                  >
                    <FaUser />
                    <span>{f}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFreelancer(idx)}
                      className="ml-2 p-1 rounded hover:bg-white/10"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/dashboard/manage-services")}
                className="px-4 py-2 rounded-md bg-white/6 hover:bg-white/10 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-md bg-green-500 hover:bg-green-600 text-sm font-semibold"
              >
                Update Service
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
