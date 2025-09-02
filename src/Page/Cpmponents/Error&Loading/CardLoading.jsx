import React from "react";

const CardLoading = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-4 w-full max-w-sm border border-green-900/30">
        {/* Image placeholder */}
        <div className="h-32 bg-gray-700 rounded-xl mb-4"></div>

        {/* Title placeholder */}
        <div className="h-5 bg-gray-700 rounded w-3/4 mb-3"></div>

        {/* Subtitle placeholder */}
        <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>

        {/* Buttons/Action placeholder */}
        <div className="flex gap-3">
          <div className="h-9 bg-gray-700 rounded-lg flex-1"></div>
          <div className="h-9 bg-gray-700 rounded-lg flex-1"></div>
        </div>
      </div>
    </div>
  );
};

export default CardLoading;
