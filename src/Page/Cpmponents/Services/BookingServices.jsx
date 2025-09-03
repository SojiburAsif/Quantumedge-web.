// BookingServices.jsx
import React, { useEffect, useState } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/UseAxios";
import Swal from "sweetalert2";
import {
  FaTrash,
  FaCheckCircle,
  FaClock,
  FaUser,
  FaEnvelope,
  FaInfoCircle,
  FaRegCalendar,
  FaRegClock,
} from "react-icons/fa";

const BookingServices = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const client = axiosSecure?.get ? axiosSecure : null;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // pretty date
  const formatDatePretty = (iso) => {
    try {
      const d = new Date(iso);
      if (isNaN(d)) return String(iso || "—");
      return d.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric" });
    } catch {
      return String(iso || "—");
    }
  };

  // Fetch user bookings
  useEffect(() => {
    if (!user?.email || !client) return;

    let mounted = true;
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await client.get(`/bookings?userEmail=${user.email}`);
        if (!mounted) return;
        setBookings(res.data || []);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
    return () => { mounted = false; };
  }, [user?.email, client]);

  // Delete a booking
  const handleDelete = async (bookingId) => {
    if (!client) return;
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This booking will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!"
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await client.delete(`/bookings/${bookingId}`);
      if (res.data?.deletedCount > 0 || res.status === 200) {
        Swal.fire("Deleted!", "Your booking has been deleted.", "success");
        setBookings(prev => prev.filter(b => b._id !== bookingId));
      } else {
        throw new Error("Delete failed");
      }
    } catch (err) {
      console.error("Failed to delete booking:", err);
      Swal.fire("Error!", "Failed to delete booking.", "error");
    }
  };

  // Update booking status
  const handleStatusChange = async (bookingId, newStatus) => {
    if (!client) return;
    try {
      const res = await client.put(`/bookings/${bookingId}`, { status: newStatus });
      if (res.status === 200 || res.data?.modifiedCount > 0) {
        setBookings(prev =>
          prev.map(b => (b._id === bookingId ? { ...b, status: newStatus } : b))
        );
        Swal.fire("Updated!", "Booking status has been updated.", "success");
      } else {
        throw new Error("Update failed");
      }
    } catch (err) {
      console.error("Failed to update status:", err);
      Swal.fire("Error!", "Failed to update status.", "error");
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="p-6 min-h-screen bg-gradient-to-br from-[#14301a] via-[#030a05] to-[#082c11]">
        <div className="max-w-7xl mx-auto">
          <div className="h-10 w-56 bg-white/10 rounded mb-6 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl p-6 bg-white/6 border border-white/6 shadow-sm animate-pulse">
                <div className="h-6 w-40 bg-white/8 rounded mb-4" />
                <div className="h-3 w-48 bg-white/8 rounded mb-2" />
                <div className="h-3 w-32 bg-white/8 rounded mb-6" />
                <div className="flex gap-3">
                  <div className="h-10 flex-1 bg-white/8 rounded-lg" />
                  <div className="h-10 flex-1 bg-white/8 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!loading && bookings.length === 0) {
    return (
      <div className="p-6 min-h-screen bg-gradient-to-br from-[#14301a] via-[#030a05] to-[#082c11] flex items-center justify-center">
        <div className="text-center max-w-xl">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/6 mb-4">
            <FaRegCalendar className="text-2xl text-green-200" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-2">No bookings yet</h3>
          <p className="text-sm text-green-200">You have not booked any services. When you do, they will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen mt-12 bg-gradient-to-br from-[#14301a] via-[#030a05] to-[#082c11]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mt-12 mb-6">
          <h2 className="text-3xl font-bold text-white">My Bookings</h2>
          <div className="text-sm text-green-200">Total: <span className="font-semibold text-white">{bookings.length}</span></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((b) => (
            <article
              key={b._id}
              className="rounded-2xl p-6 bg-white/6 border border-white/8 shadow-lg flex flex-col justify-between transition transform hover:-translate-y-2 hover:shadow-2xl"
            >
              <div>
                {/* header row: icon + title + status badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/8 flex items-center justify-center">
                      <FaInfoCircle className="text-2xl text-green-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white leading-tight">{b.serviceTitle || "Untitled Service"}</h3>
                      <div className="text-xs text-green-200 mt-1 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1">
                          <FaUser className="text-sm" /> <span className="font-medium">{b.userName || "Anonymous"}</span>
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <FaEnvelope className="text-sm" /> <span>{b.userEmail}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{
                      background: b.status === "Completed" ? "rgba(16,185,129,0.12)" : "rgba(250,204,21,0.12)",
                      color: b.status === "Completed" ? "#86efac" : "#facc15",
                      border: b.status === "Completed" ? "1px solid rgba(134,239,172,0.12)" : "1px solid rgba(250,204,21,0.08)"
                    }}
                  >
                    {b.status || "Pending"}
                  </div>
                </div>

                {/* message and meta */}
                <p className="text-sm text-green-200 mt-4 line-clamp-3">{b.message || "No additional message provided."}</p>

                <div className="mt-4 flex items-center gap-3 text-xs text-green-300">
                  <div className="inline-flex items-center gap-2">
                    <FaRegCalendar /> <span>{formatDatePretty(b.createdAt)}</span>
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <FaRegClock /> <span>{b.duration || "—"}</span>
                  </div>
                </div>
              </div>

              {/* actions */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleStatusChange(b._id, b.status === "Completed" ? "Pending" : "Completed")}
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white font-medium transition text-sm"
                >
                  <FaCheckCircle /> {b.status === "Completed" ? "Mark Pending" : "Mark Completed"}
                </button>

                <button
                  onClick={() => handleDelete(b._id)}
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition text-sm"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingServices;
