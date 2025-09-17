import React from "react";

export default function ChallengeCard({ title, category, total, days, onOpenDetails }) {
  const getColor = (status) => {
    if (status === "done") return "bg-[#4CAF50]";
    if (status === "missed") return "bg-red-500";
    return "bg-gray-300";
  };

  return (
    <div className="border border-[#4CAF50] rounded-lg p-4 shadow-[0_0_8px_2px_rgba(76,175,80,0.4)] bg-white flex flex-col">
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <div className="mt-1">
        <span className="text-xs border border-gray-600 text-gray-700 px-2 py-1 rounded-full">{category}</span>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="flex space-x-1">
          {days.map((status, i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${getColor(status)}`} />
          ))}
        </div>
        <p className="text-sm text-gray-600">{days.filter(d => d === "done").length}/{total} days</p>
      </div>

      <button
        onClick={onOpenDetails}
        className="mt-3 w-full py-2 rounded-lg bg-[#4CAF50] text-white font-semibold hover:bg-green-600 transition"
      >
        Check-In Today
      </button>
    </div>
  );
}
