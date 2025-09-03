import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router"; // <-- react-router-dom
import useAxiosSecure from "../../../Hooks/UseAxios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import CardLoading from "../Error&Loading/CardLoading";

const ManageServices = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/services");
      setServices(Array.isArray(res.data) ? res.data : []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load services. Check backend or CORS.");
    } finally {
      setLoading(false);
    }
  };

  const getIdFromItem = (item) => {
    if (!item) return null;
    if (item._id?.$oid) return item._id.$oid;
    if (item._id) return item._id;
    if (item.id) return item.id;
    return null;
  };

  const handleEdit = (service) => {
    const id = service?._id; // MongoDB ObjectId field
    if (!id) {
      Swal.fire({
        icon: "error",
        title: "ID missing",
        text: "Cannot edit service. ID is missing.",
        confirmButtonColor: "#dc2626",
      });
      return;
    }

    // Navigate to update page with correct ID and initial data
    navigate(`/dashboard/services/update/${id}`, { state: { initialData: service } });
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
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed to delete",
        text: err.response?.data?.message || err.message || "See console for details.",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  const toArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    return String(val).split(/[,|]/).map((s) => s.trim()).filter(Boolean);
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-[#0b2a13] via-[#07210f] to-[#021006]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-green-200 mb-6">Manage Services</h2>

        {loading ? (
          <CardLoading />
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
                      <div className="text-xs text-green-200">
                        {s.rawDate ? new Date(s.rawDate).toLocaleDateString() : s.date || ""}
                      </div>
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
                        <span key={i} className="text-[11px] px-2 py-1 rounded-full bg-white/6 text-green-200">
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
                        onClick={() => handleEdit(s)}
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
      </div>
    </div>
  );
};

export default ManageServices;
