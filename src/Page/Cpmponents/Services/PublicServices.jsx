// PublicServices.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import UseAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/UseAxios";

const PublicServices = () => {
  const { user } = UseAuth() || {};
  const axiosSecure = useAxiosSecure();
  const client = axiosSecure?.post ? axiosSecure : axios;

  const [data, setData] = useState([]);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openService, setOpenService] = useState(null);
  const [bookingMessage, setBookingMessage] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  const toArray = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    if (typeof value === "string") {
      return value.split(/[,|]/).map((s) => s.trim()).filter(Boolean);
    }
    return [String(value)];
  };

  // Fetch services
  useEffect(() => {
    let mounted = true;
    const fetchServices = async () => {
      setLoading(true);
      try {
        const url = client === axios ? "http://localhost:3000/services" : "/services";
        const res = await client.get(url);
        if (!mounted) return;

        const normalized = (res.data || []).map((item) => {
          const badges = toArray(item.badges);
          const tags = toArray(item.tags);
          const postedBy = item.client || (Array.isArray(item.freelancers) && item.freelancers[0]?.name) || item.name || item.title || "Unknown";
          const price = item.price !== undefined ? item.price : "";
          let formattedDate = "";
          try {
            const d = new Date(item.date);
            formattedDate = !isNaN(d) ? d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : String(item.date || "");
          } catch {
            formattedDate = String(item.date || "");
          }
          return {
            _id: item._id || item.id,
            title: item.title || item.name || "Untitled",
            category: item.category || "",
            projectType: item.projectType || item.type || "",
            description: item.description || "",
            duration: item.duration || "",
            budget: item.budget || "",
            price,
            level: item.level || "",
            client: item.client || "",
            skills: item.skills || "",
            date: formattedDate,
            rawDate: item.date,
            badges,
            tags,
            freelancers: item.freelancers || [],
            postedBy,
          };
        });

        setData(normalized);
        setError(null);
      } catch (err) {
        console.error("Failed fetching services:", err);
        setError("Failed to load services. Check backend or CORS.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
    return () => { mounted = false; };
  }, [client]);

 

  const handleApplyClick = (service, idx) => {
    setFeaturedIndex(idx);
    setOpenService(service);
    setBookingMessage("");
  };

  // Booking handler
  const handleBook = async () => {
    if (!openService) return;
    setBookingLoading(true);

    const payload = {
      serviceId: openService._id,
      serviceTitle: openService.title,
      price: openService.price || openService.budget || "",
      description: openService.description || "",
      category: openService.category || "",
      duration: openService.duration || "",
      badges: openService.badges || [],
      tags: openService.tags || [],
      projectType: openService.projectType || "",
      postedBy: openService.postedBy || "",
      userName: user?.displayName || user?.name || "Guest",
      userEmail: user?.email || "",
      message: bookingMessage || "",
      createdAt: new Date().toISOString(),
    };

    try {
      const postUrl = client === axios ? "http://localhost:3000/bookings" : "/bookings";
      const res = await client.post(postUrl, payload);

      setBookingLoading(false);

      if (res?.data?.insertedId) {
        Swal.fire({ icon: "success", title: "Booked", text: "Your booking has been submitted.", confirmButtonColor: "#16a34a" });
      } else {
        Swal.fire({ icon: "success", title: "Booked", text: "Your booking request was sent.", confirmButtonColor: "#16a34a" });
      }

      setOpenService(null);
      setBookingMessage("");

    } catch (err) {
      setBookingLoading(false);
      console.error("Booking failed:", err);
      Swal.fire({ icon: "error", title: "Booking failed", text: err.response?.data?.message || err.message || "Unable to create booking.", confirmButtonColor: "#dc2626" });
    }
  };

  if (loading) return <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center"><div className="text-lg text-gray-500">Loading services...</div></div>;
  if (error) return <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center"><div className="text-red-500">{error}</div></div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-2xl font-semibold text-gray-800 mb-8">{data.length} search result(s) found</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {data.map((item, idx) => {
            const featured = idx === featuredIndex;
            const shownBadges = (item.badges || []).slice(0, 3);
            const shownTags = (item.tags || []).slice(0, 3);
            const moreTagsCount = Math.max(0, (item.tags || []).length - shownTags.length);
            return (
              <article
                key={item._id || idx}
                className={`relative bg-white rounded-2xl p-6 border border-gray-200 transform transition-transform duration-300 ease-out
                  ${featured ? "-mt-8 scale-105 z-30 shadow-2xl" : "hover:-translate-y-2 hover:shadow-lg"}`}
                onMouseEnter={() => setFeaturedIndex(idx)}
              >
                {featured && <div className="absolute inset-0 -z-10 rounded-2xl" style={{ filter: "blur(28px)", background: "radial-gradient(closest-side, rgba(34,197,94,0.12), rgba(34,197,94,0.03) 40%, rgba(0,0,0,0) 70%)" }} />}
                <div className="text-xs text-gray-400 mb-3">{item.date}</div>
                <div className="flex items-start justify-between gap-4">
                  <h4 className="text-md font-semibold text-gray-800 leading-tight">{item.title}</h4>
                  <div className="flex-shrink-0 text-right">
                    <div className="text-xs text-gray-500 mb-2">{item.projectType}</div>
                    <div className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-md">{item.price || item.budget || "—"}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4 mb-4" style={{ WebkitLineClamp: 3, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.description}</p>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {shownBadges.length === 0 ? <div className="text-xs text-gray-400">No badges</div> : shownBadges.map((b, i) => <span key={i} className="flex items-center gap-2 text-[11px] px-2 py-1 rounded-full whitespace-nowrap bg-green-50 text-green-600"><span className="inline-block w-2 h-2 rounded-full bg-green-600" />{b}</span>)}
                </div>
                <div className="flex flex-wrap gap-2 mb-6">{shownTags.map((t, i) => <span key={i} className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">{t}</span>)}{moreTagsCount > 0 && <span className="text-xs text-gray-500">+{moreTagsCount} more</span>}</div>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between gap-4">
                  <div className="text-xs text-gray-500">Posted by <span className="text-gray-800 font-medium">{item.postedBy}</span></div>
                  <div className="flex items-center gap-3"><button onClick={() => handleApplyClick(item, idx)} className="px-4 py-2 rounded-full text-sm font-medium transition bg-green-500 hover:bg-green-600 text-white shadow-md">Apply Now</button></div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {openService && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 bg-black/40 p-4 overflow-auto">
          <div className="w-full max-w-3xl rounded-lg shadow-2xl" style={{ background: "linear-gradient(135deg, #052e16 0%, #033217 50%, #01220c 100%)", border: "1px solid rgba(34,197,94,0.08)" }}>
            <div className="p-6">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="text-sm text-green-200">{openService.date}</div>
                  <h2 className="text-2xl text-white font-semibold mt-1">{openService.title}</h2>
                  <div className="text-sm text-green-100 mt-1">{openService.projectType} • {openService.duration}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-green-100">{openService.postedBy}</div>
                  <div className="mt-2 text-lg font-medium bg-white/6 text-green-100 px-3 py-1 rounded-md">{openService.price || openService.budget || "—"}</div>
                </div>
              </div>

              <div className="mt-4 text-green-100 text-sm">
                <p className="mb-3">{openService.description}</p>
                <div className="mb-2"><strong className="text-white">Category: </strong>{openService.category || "—"}</div>
                <div className="mb-2"><strong className="text-white">Duration: </strong>{openService.duration || "—"}</div>
                <div className="mb-2"><strong className="text-white">Skills: </strong>{openService.skills || "—"}</div>
                <div className="mb-2"><strong className="text-white">Badges: </strong>{(openService.badges || []).join(", ") || "—"}</div>
                <div className="mb-2"><strong className="text-white">Tags: </strong>{(openService.tags || []).join(", ") || "—"}</div>
              </div>

              <div className="mt-6">
                <h3 className="text-white font-medium mb-2">Book this service</h3>
                <div className="text-sm text-green-100 mb-3">Booking as <span className="font-medium text-white">{user?.displayName || user?.name || "Guest"}</span>{user?.email ? ` (${user.email})` : ""}</div>
                <textarea placeholder="Message / requirements (optional)" value={bookingMessage} onChange={(e) => setBookingMessage(e.target.value)} className="w-full p-3 rounded bg-white/6 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-500" rows={4} />
                <div className="mt-4 flex items-center justify-end gap-3">
                  <button onClick={() => setOpenService(null)} className="px-4 py-2 bg-white/6 text-white rounded hover:bg-white/10">Close</button>
                  <button onClick={handleBook} disabled={bookingLoading} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded inline-flex items-center gap-2 disabled:opacity-60">{bookingLoading ? "Booking..." : "Book"}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicServices;
