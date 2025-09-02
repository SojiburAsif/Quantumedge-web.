// DashboardLoading.jsx
import React from "react";

const DashboardLoading = () => {
  return (
    <div className="space-y-8 p-6 min-h-screen bg-gradient-to-br from-[#14301a] via-[#030a05] to-[#082c11] text-white animate-pulse">
      {/* Header Skeleton */}
      <header>
        <div className="h-8 w-64 bg-green-800 rounded mb-2"></div>
        <div className="h-4 w-96 bg-green-900 rounded"></div>
      </header>

      {/* Stats Section Skeleton */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-green-900 p-6 rounded-xl shadow border border-green-700 space-y-3"
          >
            <div className="h-5 w-28 bg-green-800 rounded"></div>
            <div className="h-10 w-16 bg-green-700 rounded"></div>
            <div className="h-4 w-20 bg-green-800 rounded"></div>
          </div>
        ))}
      </section>

      {/* Charts Section Skeleton */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="bg-green-900 p-6 rounded-xl shadow border border-green-700"
          >
            <div className="h-5 w-40 bg-green-800 rounded mb-4"></div>
            <div className="h-48 w-full bg-green-950 rounded"></div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default DashboardLoading;
