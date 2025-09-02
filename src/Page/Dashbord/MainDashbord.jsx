// MainDashboard.jsx
import React, { useEffect, useState, useMemo } from "react";
import useAxiosSecure from "../../Hooks/UseAxios";
import UseAuth from "../../Hooks/UseAuth";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import {
  FaBriefcase,
  FaCalendarCheck,
  FaChartLine,
  FaCubes,
  FaUserFriends,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import DashboardLoading from "../Cpmponents/Error&Loading/DBLoding";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const MainDashboard = () => {
  const axiosSecure = useAxiosSecure();


  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch services and bookings
  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const [bookingsRes, servicesRes] = await Promise.all([
          axiosSecure.get("/bookings"),
          axiosSecure.get("/services"),
        ]);

        if (!mounted) return;

        setBookings(bookingsRes.data || []);
        setServices(servicesRes.data || []);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [axiosSecure]);

  // ------------------ derived & memoized data ------------------
  const {
    sortedLabels,
    bookingsSeries,
    bookingsTrend,
    servicesTrend,
  } = useMemo(() => {
    const dates = (bookings || []).map((b) => {
      const d = b?.createdAt ? new Date(b.createdAt) : null;
      return d && !isNaN(d) ? d.toLocaleDateString("en-US") : "Unknown";
    });

    const counts = dates.reduce((acc, date) => {
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(counts).sort((a, b) => new Date(a) - new Date(b));
    const series = labels.map((l) => counts[l]);

    const calcTrend = (arr) => {
      if (!arr || arr.length === 0) return { percent: 0, up: true };
      if (arr.length === 1) return { percent: 0, up: true };
      const last = arr[arr.length - 1];
      const prevAvg = arr.slice(0, -1).reduce((s, v) => s + v, 0) / Math.max(1, arr.length - 1);
      if (prevAvg === 0) return { percent: Math.round(last * 100), up: last >= prevAvg };
      const pct = Math.round(((last - prevAvg) / prevAvg) * 100);
      return { percent: Math.abs(pct), up: pct >= 0 };
    };

    return {
      sortedLabels: labels,
      bookingsSeries: series.length ? series : [0],
      bookingsTrend: calcTrend(series),
      servicesTrend: calcTrend([services.length, Math.max(0, services.length - 1)]),
    };
  }, [bookings, services]);

  // chart datasets/options (memoized)
  const lineData = useMemo(
    () => ({
      labels: sortedLabels.length ? sortedLabels : ["No Data"],
      datasets: [
        {
          label: "Bookings",
          data: bookingsSeries,
          borderColor: "#86efac",
          backgroundColor: "rgba(134,239,172,0.12)",
          tension: 0.32,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: "#10b981",
          fill: true,
          spanGaps: true,
        },
      ],
    }),
    [sortedLabels, bookingsSeries]
  );

  const lineOptions = useMemo(
    () => ({
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#0f172a",
          titleColor: "#e6ffed",
          bodyColor: "#e6ffed",
          callbacks: {
            title: (items) => items[0]?.label,
            label: (item) => `${item.dataset.label}: ${item.formattedValue}`,
          },
        },
      },
      scales: {
        x: {
          ticks: { color: "rgba(255,255,255,0.9)" },
          grid: { color: "rgba(255,255,255,0.04)" },
        },
        y: {
          ticks: { color: "rgba(255,255,255,0.9)", beginAtZero: true, precision: 0 },
          grid: { color: "rgba(255,255,255,0.04)" },
        },
      },
    }),
    []
  );

  const barData = useMemo(
    () => ({
      labels: ["Services", "Bookings"],
      datasets: [
        {
          label: "Count",
          data: [services.length, bookings.length],
          backgroundColor: ["#34d399", "#60a5fa"],
          borderRadius: 8,
          barPercentage: 0.6,
        },
      ],
    }),
    [services.length, bookings.length]
  );

  const barOptions = useMemo(
    () => ({
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#0f172a",
          titleColor: "#e6ffed",
          bodyColor: "#e6ffed",
        },
      },
      scales: {
        x: {
          ticks: { color: "rgba(255,255,255,0.9)" },
          grid: { display: false },
        },
        y: {
          ticks: { color: "rgba(255,255,255,0.9)", beginAtZero: true, precision: 0 },
          grid: { color: "rgba(255,255,255,0.04)" },
        },
      },
    }),
    []
  );

  if (loading) {
    return <DashboardLoading></DashboardLoading>

  }

  return (
    <div className="space-y-8 p-6 mt-13 min-h-screen bg-gradient-to-br from-[#14301a] via-[#030a05] to-[#082c11] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {/* Header without user name or avatar */}
        <header className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Left: Title + Subtitle */}
            <div>
              <h1
                className="text-3xl md:text-4xl font-extrabold leading-tight"
                style={{
                  background:
                    "linear-gradient(90deg, #86efac 0%, #34d399 40%, #059669 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Welcome Back 👋
              </h1>

              <p className="mt-2 text-sm text-green-100/80 max-w-xl">
                Overview of activity — bookings and services. Charts update automatically from your API.
              </p>
            </div>

            {/* Right: small stat chips (no user info) */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white/6 border border-white/8 px-3 py-2 rounded-xl">
                  <svg className="w-4 h-4 text-green-300" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M3 7h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M6 11h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M9 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <div className="text-xs text-green-100/90">Services</div>
                  <div className="ml-2 text-sm font-semibold text-white">{services?.length ?? 0}</div>
                </div>

                <div className="flex items-center gap-2 bg-white/6 border border-white/8 px-3 py-2 rounded-xl">
                  <svg className="w-4 h-4 text-blue-300" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M6 8h.01M6 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <div className="text-xs text-green-100/90">Bookings</div>
                  <div className="ml-2 text-sm font-semibold text-white">{bookings?.length ?? 0}</div>
                </div>
              </div>
            </div>
          </div>
        </header>


        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-2">
          <div className="flex items-center gap-4 p-5 rounded-xl bg-white/6 border border-white/6 shadow-sm">
            <div className="p-3 rounded-lg bg-white/8 border border-white/8">
              <FaCubes className="text-2xl text-green-300" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-green-100">Active Services</h3>
                <div
                  className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${servicesTrend.up ? "bg-green-800/50 text-green-200" : "bg-red-800/50 text-red-200"
                    }`}
                >
                  {servicesTrend.up ? <FaArrowUp /> : <FaArrowDown />} {servicesTrend.percent}%
                </div>
              </div>
              <div className="mt-2 text-3xl font-bold text-white">{services.length}</div>
              <div className="text-xs text-green-200 mt-1">Public services available</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-xl bg-white/6 border border-white/6 shadow-sm">
            <div className="p-3 rounded-lg bg-white/8 border border-white/8">
              <FaUserFriends className="text-2xl text-green-300" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-green-100">Bookings</h3>
                <div
                  className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${bookingsTrend.up ? "bg-green-800/50 text-green-200" : "bg-red-800/50 text-red-200"
                    }`}
                >
                  {bookingsTrend.up ? <FaArrowUp /> : <FaArrowDown />} {bookingsTrend.percent}%
                </div>
              </div>
              <div className="mt-2 text-3xl font-bold text-white">{bookings.length}</div>
              <div className="text-xs text-green-200 mt-1">New bookings (all time)</div>
            </div>
          </div>
        </section>

        {/* Charts */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl bg-white/6 border border-white/6 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <FaChartLine className="text-green-300 text-xl" />
                <h2 className="text-lg font-semibold">Bookings Over Time</h2>
              </div>
              <div className="text-xs text-green-200">Last {sortedLabels.length || 1} points</div>
            </div>

            <div style={{ height: 300 }}>
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>

          <div className="rounded-xl bg-white/6 border border-white/6 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <FaBriefcase className="text-green-300 text-xl" />
                <h2 className="text-lg font-semibold">Services vs Bookings</h2>
              </div>
              <div className="text-xs text-green-200">Realtime snapshot</div>
            </div>

            <div style={{ height: 300 }}>
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MainDashboard;
