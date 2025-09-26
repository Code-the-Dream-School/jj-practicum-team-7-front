import React from "react";

export default function PastChallengeCard({
  title,
  category,
  progress,
  total,
  status,
  onClick,
}) {
  const statusStyles = {
    Completed:
      "border border-gray-600 text-gray-700 text-xs px-2 py-1 rounded-full",
    Failed:
      "border border-red-500 text-red-600 text-xs px-2 py-1 rounded-full shadow shadow-red-300",
  };

  return (
    <div
      onClick={onClick} // call handler when clicked
      className="cursor-pointer border border-[#4CAF50] rounded-lg p-4 
                 shadow-[0_0_8px_2px_rgba(76,175,80,0.4)]
                 hover:shadow-xl hover:scale-105 
                 transition-transform transition-shadow duration-200 ease-out
                 flex flex-col bg-white"
    >
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <div className="flex space-x-2 mt-1">
        <span className="text-xs border border-gray-600 text-gray-700 px-2 py-1 rounded-full">
          {category}
        </span>
        <span
          className={
            statusStyles[status] ||
            "border border-gray-400 text-gray-600 text-xs px-2 py-1 rounded-full"
          }
        >
          {status}
        </span>
      </div>
      <p className="text-sm text-gray-600 mt-3">
        {progress}/{total} days completed
      </p>
    </div>
  );
}
