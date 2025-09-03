import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import UseAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/UseAxios";
import Search from "../Search";

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

    const [searchText, setSearchText] = useState("");

    const toArray = (value) => {
        if (!value) return [];
        if (Array.isArray(value)) return value;
        if (typeof value === "string") {
            return value.split(/[,|]/).map((s) => s.trim()).filter(Boolean);
        }
        return [String(value)];
    };

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
            console.log(res);

            setBookingLoading(false);

            Swal.fire({
                icon: "success",
                title: "Booked",
                text: "Your booking has been submitted.",
                confirmButtonColor: "#16a34a"
            });

            setOpenService(null);
            setBookingMessage("");

        } catch (err) {
            setBookingLoading(false);
            console.error("Booking failed:", err);
            Swal.fire({
                icon: "error",
                title: "Booking failed",
                text: err.response?.data?.message || err.message || "Unable to create booking.",
                confirmButtonColor: "#dc2626"
            });
        }
    };

    if (loading) return <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center"><div className="text-lg text-gray-500">Loading services...</div></div>;
    if (error) return <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center"><div className="text-red-500">{error}</div></div>;

    const filteredData = data.filter(item => {
        const text = searchText.toLowerCase();
        return (
            item.title.toLowerCase().includes(text) ||
            item.category.toLowerCase().includes(text) ||
            item.tags.some(tag => tag.toLowerCase().includes(text)) ||
            item.badges.some(badge => badge.toLowerCase().includes(text))
        );
    });

    return (
        <div className="">
            <Search currentText={searchText} setCurrentText={setSearchText} />

            <div className="p-8 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-8">{filteredData.length} result(s) found</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                        {filteredData.map((item, idx) => {
                            const featured = idx === featuredIndex;
                            const shownBadges = (item.badges || []).slice(0, 3);
                            const shownTags = (item.tags || []).slice(0, 3);
                            const moreTagsCount = Math.max(0, (item.tags || []).length - shownTags.length);

                            return (
                                <article
                                    key={item._id || idx}
                                    className={`relative bg-white rounded-2xl p-6 border border-gray-100 transition-transform duration-300 ease-out 
    ${featured
                                            ? "-mt-6 transform scale-[1.03] shadow-[0_30px_50px_rgba(0,0,0,0.12)] z-20"
                                            : "shadow-sm hover:shadow-md hover:-translate-y-1"
                                        }`}
                                    onMouseEnter={() => setFeaturedIndex(idx)}
                                    style={{ minHeight: "420px" }} // ✅ fixed height
                                >
                                    {/* Top row: date */}
                                    <div className="text-xs text-gray-400 mb-3">{item.date}</div>

                                    {/* Title + top pill */}
                                    <div className="mb-3">
                                        <h4 className="text-lg font-semibold text-gray-800 leading-tight mb-3">
                                            {item.title}
                                        </h4>

                                        {/* pill: left = project type, right = price */}
                                        <div className="flex items-center justify-between bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[13px] bg-transparent px-2 py-1 rounded-md">
                                                    {item.projectType || "Fixed Price Project"}
                                                </span>
                                            </div>
                                            <div className="font-medium text-gray-800">
                                                {item.price || item.budget || "$1,200-$1,400"}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p
                                        className="text-sm text-gray-500 mt-4 mb-4"
                                        style={{
                                            WebkitLineClamp: 3,
                                            display: "-webkit-box",
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {item.description}
                                    </p>

                                    {/* badges row (colored) */}
                                    <div className="flex flex-wrap items-center gap-2 mb-4">
                                        {shownBadges.length === 0 ? (
                                            <div className="text-xs text-gray-400">No badges</div>
                                        ) : (
                                            shownBadges.map((b, i) => (
                                                <span
                                                    key={i}
                                                    className={`flex items-center gap-2 text-[11px] px-3 py-1 rounded-full whitespace-nowrap  ${i === 0 ? "bg-purple-50 text-purple-600" : i === 1 ? "bg-pink-50 text-pink-600" : "bg-green-50 text-green-600"
                                                        }`}
                                                >
                                                    <span
                                                        className="inline-block w-2 h-2 rounded-full bg-current"
                                                        style={{
                                                            color: i === 0 ? "#7c3aed" : i === 1 ? "#ec4899" : "#16a34a",
                                                        }}
                                                    />
                                                    {b}
                                                </span>
                                            ))
                                        )}
                                    </div>

                                    {/* tags chips */}
                                    {/* tags chips */}
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {shownTags.map((t, i) => (
                                            <span
                                                key={i}
                                                className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    {/* ✅ more count on new line */}
                                    {moreTagsCount > 0 && (
                                        <div className="text-xs text-gray-500 mb-4">+{moreTagsCount} more</div>
                                    )}


                                    <div className="border-t border-gray-200 pt-4 flex items-center justify-between gap-4">
                                        <div className="text-xs text-gray-500">
                                            Posted by{" "}
                                            <span className="text-gray-800 font-medium">{item.postedBy}</span>
                                        </div>
                                    </div>

                                    {/* ✅ Apply button moved below with spacing */}
                                    <button
                                        onClick={() => handleApplyClick(item, idx)}
                                        className={`px-5 py-2 rounded-full mt-4 text-sm font-medium transition   ${featured
                                                ? "bg-black hover:bg-green-500 text-white shadow-md"
                                                : "bg-black hover:bg-green-500 text-white"
                                            }`}
                                    >
                                        Apply Now
                                    </button>

                                    {/* subtle focus ring to mimic center card glow */}
                                    {featured && (
                                        <div
                                            className="pointer-events-none absolute inset-0 rounded-2xl -z-10"
                                            aria-hidden
                                        >
                                            <div
                                                className="w-full h-full rounded-2xl"
                                                style={{ boxShadow: "0 60px 100px rgba(0,0,0,0.06)" }}
                                            />
                                        </div>
                                    )}
                                </article>

                            );
                        })}
                    </div>
                </div>

                {openService && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 overflow-auto">
                        <div className="w-full max-w-3xl rounded-lg shadow-2xl transform transition-all duration-500 ease-in-out scale-95 opacity-0 animate-modal-in" style={{ background: "linear-gradient(135deg, #052e16 0%, #033217 50%, #01220c 100%)", border: "1px solid rgba(34,197,94,0.08)" }}>
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
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        {openService.badges?.map((b, i) => <span key={i} className="text-xs px-2 py-1 rounded-full bg-green-800 text-green-100">{b}</span>)}
                                    </div>
                                    <textarea className="w-full p-3 bg-gray-300 rounded-lg mt-4 text-black" placeholder="Message (optional)" value={bookingMessage} onChange={(e) => setBookingMessage(e.target.value)} />
                                    <div className="mt-4 flex justify-end">
                                        <button onClick={handleBook} disabled={bookingLoading} className="px-6 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white font-medium shadow-md">
                                            {bookingLoading ? "Booking..." : "Book Now"}
                                        </button>
                                        <button onClick={() => setOpenService(null)} className="ml-2 px-4 py-2 rounded-full bg-gray-600 hover:bg-gray-700 text-white">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default PublicServices;
