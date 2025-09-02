import React, { useEffect, useState } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/UseAxios";
import Swal from "sweetalert2";

const BookingServices = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchBookings = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // fetch all bookings
        const res = await axiosSecure.get("/bookings");
        if (!mounted) return;

        // filter by logged-in user email
        const userBookings = (res.data || []).filter(
          (b) => b.userEmail === user.email
        );

        setBookings(userBookings);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
        setError("Failed to load your bookings.");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response?.data?.message || err.message,
          confirmButtonColor: "#dc2626",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
    return () => {
      mounted = false;
    };
  }, [user, axiosSecure]);

  if (loading)
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-500">Loading your bookings...</div>
      </div>
    );

  if (error)
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );

  if (bookings.length === 0)
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center text-gray-500">
        No bookings found.
      </div>
    );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          My Bookings ({bookings.length})
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
            >
              <h3 className="text-lg font-medium text-gray-800 mb-1">
                {b.serviceTitle || "Untitled Service"}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                Booked on:{" "}
                {new Date(b.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              {b.message && (
                <p className="text-sm text-gray-600">
                  Message: {b.message}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingServices;
