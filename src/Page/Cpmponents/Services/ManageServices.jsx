// ManageServices.jsx
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/UseAxios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

const ManageServices = () => {
  const axiosSecure = useAxiosSecure();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [serverError, setServerError] = useState(null);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/services");
      setServices(Array.isArray(res.data) ? res.data : []);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch services:", err);
      setError("Failed to load services. Check backend or CORS.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const getIdFromItem = (item) => {
    if (!item) return null;
    if (item._id) return item._id;
    if (item.id) return item.id;
    if (item._id && typeof item._id === "object" && item._id.$oid) return item._id.$oid;
    return null;
  };

  const openEdit = (item) => {
    setEditingItem({
      ...item,
      rawDate: item.rawDate
        ? String(item.rawDate).slice(0, 10)
        : item.date
        ? new Date(item.date).toISOString().slice(0, 10)
        : "",
      badges: Array.isArray(item.badges) ? item.badges.join(", ") : item.badges || "",
      tags: Array.isArray(item.tags) ? item.tags.join(", ") : item.tags || "",
      extraTags: Array.isArray(item.extraTags) ? item.extraTags.join(", ") : item.extraTags || "",
      freelancers: Array.isArray(item.freelancers) ? item.freelancers.join(", ") : item.freelancers || "",
    });
    setServerError(null);
    setIsEditing(true);
  };

  const closeEdit = () => {
    setIsEditing(false);
    setEditingItem(null);
    setServerError(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingItem((prev) => ({ ...prev, [name]: value }));
  };

  const toArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    return String(val).split(/[,|]/).map((s) => s.trim()).filter(Boolean);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setServerError(null);

    if (!editingItem) return;

    const id = getIdFromItem(editingItem);
    if (!id) {
      Swal.fire({
        icon: "error",
        title: "ID missing",
        text: "Cannot update service. ID is missing.",
        confirmButtonColor: "#dc2626",
      });
      return;
    }

    const payload = {
      title: editingItem.title,
      category: editingItem.category,
      projectType: editingItem.projectType,
      description: editingItem.description,
      duration: editingItem.duration,
      budget: editingItem.budget,
      price: editingItem.price,
      level: editingItem.level,
      client: editingItem.client,
      skills: editingItem.skills,
      rawDate: editingItem.rawDate || undefined,
      date: editingItem.rawDate
        ? new Date(editingItem.rawDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : editingItem.date,
      badges: toArray(editingItem.badges),
      tags: toArray(editingItem.tags),
      extraTags: toArray(editingItem.extraTags),
      freelancers: toArray(editingItem.freelancers),
    };

    try {
      console.log("Updating service:", id, payload);
      // use PATCH (backend should support PATCH /services/:id) — change to put if your server expects PUT
      const res = await axiosSecure.patch(`/services/${id}`, payload);

      const updatedDoc = res?.data || { ...editingItem, ...payload };

      setServices((prev) =>
        prev.map((s) => {
          const sid = getIdFromItem(s);
          return String(sid) === String(id) ? { ...s, ...updatedDoc } : s;
        })
      );

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Service updated successfully.",
        confirmButtonColor: "#16a34a",
      });

      closeEdit();
    } catch (err) {
      console.error("Update failed:", err);
      setServerError(err.response?.data || err.message);
      Swal.fire({
        icon: "error",
        title: "Failed to update",
        text: err.response?.data?.message || err.message || "See console for details.",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  const handleDelete = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: "Delete service?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Delete",
    });
    if (!isConfirmed) return;

    try {
      await axiosSecure.delete(`/services/${id}`);
      setServices((prev) => prev.filter((s) => getIdFromItem(s) !== id));

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Service deleted successfully.",
        confirmButtonColor: "#16a34a",
      });
    } catch (err) {
      console.error("Delete failed:", err);
      Swal.fire({
        icon: "error",
        title: "Failed to delete",
        text: err.response?.data?.message || err.message || "See console for details.",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-[#0b2a13] via-[#07210f] to-[#021006]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-green-200 mb-6">Manage Services</h2>

        {loading ? (
          <div className="text-green-200">Loading services...</div>
        ) : error ? (
          <div className="text-red-400 mb-4">{error}</div>
        ) : services.length === 0 ? (
          <div className="text-green-200">No services found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => {
              const id = getIdFromItem(s);
              const badges = Array.isArray(s.badges) ? s.badges : toArray(s.badges);
              const tags = Array.isArray(s.tags) ? s.tags : toArray(s.tags);
              const postedBy =
                s.client || (Array.isArray(s.freelancers) && s.freelancers[0]) || s.postedBy || s.name || s.title;
              return (
                <article
                  key={id}
                  className="relative overflow-hidden rounded-2xl p-6 shadow-lg transform transition hover:-translate-y-1 hover:shadow-2xl"
                >
                  {/* card gradient background */}
                  <div
                    className="absolute inset-0 -z-10"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(4, 44, 22, 0.95) 0%, rgba(3, 30, 14, 0.9) 50%, rgba(2, 16, 6, 0.95) 100%)",
                      border: "1px solid rgba(34,197,94,0.06)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
                    }}
                  />
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-xs text-green-200">{s.rawDate ? new Date(s.rawDate).toLocaleDateString() : s.date || ""}</div>
                      <h3 className="text-lg font-semibold text-white mt-1">{s.title || s.name}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-green-100 mb-2">{s.projectType || s.type}</div>
                      <div className="text-sm font-medium bg-white/6 text-green-100 px-3 py-1 rounded-md">
                        {s.price || s.budget || ""}
                      </div>
                    </div>
                  </div>

                  <p
                    className="text-sm text-green-100 mb-4"
                    style={{ WebkitLineClamp: 3, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden" }}
                  >
                    {s.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {badges.length === 0 ? (
                      <span className="text-xs text-green-200">No badges</span>
                    ) : (
                      badges.slice(0, 3).map((b, i) => (
                        <span
                          key={i}
                          className={`text-[11px] px-2 py-1 rounded-full ${
                            i === 0
                              ? "bg-white/6 text-green-200"
                              : i === 1
                              ? "bg-white/6 text-green-200"
                              : "bg-white/6 text-green-200"
                          }`}
                        >
                          {b}
                        </span>
                      ))
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {tags.slice(0, 4).map((t, i) => (
                      <span key={i} className="text-xs bg-white/4 text-green-100 px-3 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="border-t border-white/6 pt-4 flex items-center justify-between gap-4">
                    <div className="text-xs text-green-200">
                      Posted by <span className="text-white font-medium">{postedBy}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(s)}
                        className="px-3 py-1 rounded-full bg-green-500 hover:bg-green-600 text-white inline-flex items-center gap-2 shadow"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(id)}
                        className="px-3 py-1 rounded-full bg-red-600 hover:bg-red-700 text-white inline-flex items-center gap-2 shadow"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* EDIT MODAL */}
        {isEditing && editingItem && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 bg-black/50 p-4 overflow-auto">
            <form
              onSubmit={handleUpdate}
              className="relative rounded-lg w-full max-w-3xl shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #052e16 0%, #033217 50%, #01220c 100%)",
                border: "1px solid rgba(34,197,94,0.08)",
                padding: "20px",
              }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-green-100">Edit Service</h3>
                <button type="button" onClick={closeEdit} className="text-green-100 hover:text-white">
                  <FaTimes />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  name="title"
                  value={editingItem.title || ""}
                  onChange={handleEditChange}
                  className="border border-white/6 p-2 rounded bg-white/6 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Title"
                  required
                />
                <input
                  name="category"
                  value={editingItem.category || ""}
                  onChange={handleEditChange}
                  className="border border-white/6 p-2 rounded bg-white/6 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Category"
                />
                <input
                  name="projectType"
                  value={editingItem.projectType || ""}
                  onChange={handleEditChange}
                  className="border border-white/6 p-2 rounded bg-white/6 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Project Type"
                />
                <input
                  name="duration"
                  value={editingItem.duration || ""}
                  onChange={handleEditChange}
                  className="border border-white/6 p-2 rounded bg-white/6 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Duration"
                />
                <input
                  name="budget"
                  value={editingItem.budget || ""}
                  onChange={handleEditChange}
                  className="border border-white/6 p-2 rounded bg-white/6 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Budget"
                />
                <input
                  name="price"
                  value={editingItem.price || ""}
                  onChange={handleEditChange}
                  className="border border-white/6 p-2 rounded bg-white/6 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Price"
                />
                <input
                  name="level"
                  value={editingItem.level || ""}
                  onChange={handleEditChange}
                  className="border border-white/6 p-2 rounded bg-white/6 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Level"
                />
                <input
                  name="client"
                  value={editingItem.client || ""}
                  onChange={handleEditChange}
                  className="border border-white/6 p-2 rounded bg-white/6 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Client"
                />
                <input
                  name="skills"
                  value={editingItem.skills || ""}
                  onChange={handleEditChange}
                  className="border border-white/6 p-2 rounded bg-white/6 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Skills"
                />
                <input
                  name="rawDate"
                  type="date"
                  value={editingItem.rawDate || ""}
                  onChange={handleEditChange}
                  className="border border-white/6 p-2 rounded bg-white/6 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <textarea
                name="description"
                value={editingItem.description || ""}
                onChange={handleEditChange}
                className="border border-white/6 p-2 rounded bg-white/6 text-white w-full mt-3 placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Description"
                rows={3}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <input
                  name="badges"
                  value={editingItem.badges || ""}
                  onChange={handleEditChange}
                  className="border border-white/6 p-2 rounded bg-white/6 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Badges"
                />
                <input
                  name="tags"
                  value={editingItem.tags || ""}
                  onChange={handleEditChange}
                  className="border border-white/6 p-2 rounded bg-white/6 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Tags"
                />
                <input
                  name="extraTags"
                  value={editingItem.extraTags || ""}
                  onChange={handleEditChange}
                  className="border border-white/6 p-2 rounded bg-white/6 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Extra Tags"
                />
                <input
                  name="freelancers"
                  value={editingItem.freelancers || ""}
                  onChange={handleEditChange}
                  className="border border-white/6 p-2 rounded bg-white/6 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Freelancers"
                />
              </div>

              {serverError && (
                <pre className="mt-3 p-3 bg-red-50 text-sm text-red-700 rounded overflow-auto">
                  {typeof serverError === "string" ? serverError : JSON.stringify(serverError, null, 2)}
                </pre>
              )}

              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={closeEdit} className="px-4 py-2 bg-white/6 text-white rounded hover:bg-white/10">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded inline-flex items-center gap-2 shadow"
                >
                  <FaSave /> Save
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageServices;
