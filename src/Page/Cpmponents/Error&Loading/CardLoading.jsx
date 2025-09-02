import React from "react";
import { FaRegCalendar } from "react-icons/fa";

const CardLoading = () => {
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
};

export default CardLoading;
