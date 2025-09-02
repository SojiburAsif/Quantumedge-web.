// DashboardLoading.jsx
import React from "react";

const DashboardLoading = () => {
  return (
    <div className="space-y-6 p-4 min-h-screen max-w-4xl mx-auto  text-white animate-pulse">
      {/* Header Skeleton */}
      <header>
        <div className="h-6 w-48 bg-green-800 rounded mb-2"></div>
        <div className="h-3 w-72 bg-green-900 rounded"></div>
      </header>

      {/* Stats Section Skeleton */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-green-900 p-4 rounded-lg shadow border border-green-700 space-y-2"
          >
            <div className="h-4 w-20 bg-green-800 rounded"></div>
            <div className="h-7 w-14 bg-green-700 rounded"></div>
            <div className="h-3 w-16 bg-green-800 rounded"></div>
          </div>
        ))}
      </section>

      {/* Charts Section Skeleton */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="bg-green-900 p-4 rounded-lg shadow border border-green-700"
          >
            <div className="h-4 w-32 bg-green-800 rounded mb-3"></div>
            <div className="h-36 w-full bg-green-950 rounded"></div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default DashboardLoading;
