import React from "react";

export default function ChallengeCard({
  title,
  category,
  total,
  days,
  currentDay,
  checkedDaysCount,
  onOpenDetails,
}) {
  const getCircleStyle = (status) => {
    const baseClasses =
      "w-3 h-3 rounded-full border-2 flex items-center justify-center";

    switch (status) {
      case "checked":
        return `${baseClasses} bg-green-600 border-green-600 text-white`;
      case "missed":
        return `${baseClasses} bg-red-400 border-red-400 text-white`;
      case "current":
        return `${baseClasses} bg-blue-100 border-blue-500 text-blue-800`;
      case "future":
        return `${baseClasses} bg-gray-200 border-gray-300 text-gray-600`;
      default:
        return `${baseClasses} bg-gray-100 border-gray-200 text-gray-600`;
    }
  };

  return (
    <div className="border border-[#4CAF50] rounded-lg p-4 shadow-[0_0_8px_2px_rgba(76,175,80,0.4)] bg-white flex flex-col">
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <div className="mt-1">
        <span className="text-xs border border-gray-600 text-gray-700 px-2 py-1 rounded-full">
          {category}
        </span>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="flex space-x-1">
          {days.map((status, index) => (
            <div key={index} className={getCircleStyle(status)}></div>
          ))}
        </div>
        <p className="text-sm text-gray-600">
          {checkedDaysCount}/{total} days
        </p>
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
