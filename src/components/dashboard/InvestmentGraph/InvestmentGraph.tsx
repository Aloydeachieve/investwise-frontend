import React from "react";

const InvestmentGraph = () => {
  return (
    <div className="relative w-full h-20">
      <div className="absolute top-0 left-0 text-xs text-gray-500 flex gap-3">
        <span className="flex items-center gap-1">
          <span className="w-3 h-0.5 bg-indigo-500"></span>Investment
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-0.5 bg-purple-500"></span>Profit
        </span>
      </div>
      <svg
        className="w-full h-full mt-4"
        viewBox="0 0 300 60"
        preserveAspectRatio="none"
      >
        <path
          d="M0,45 L50,35 L80,50 L120,25 L160,45 L200,15 L240,30 L280,20 L300,35"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="2"
          className="opacity-70"
        />
        <path
          d="M0,50 L50,42 L80,52 L120,38 L160,48 L200,28 L240,38 L280,32 L300,40"
          fill="none"
          stroke="#6366f1"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default InvestmentGraph;
