import React from "react";

interface StatCardProps {
  title: string;
  value: number;
  percentage: number;
  isIncrease: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, percentage, isIncrease }) => {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-sm text-gray-500">{title}</h2>
      <div className="text-3xl font-bold mt-1">{value.toLocaleString()}</div>
      <div className="mt-2 text-sm flex items-center gap-1">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
          isIncrease ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
        }`}>
          {isIncrease ? "↑" : "↓"} {Math.abs(percentage)}%
        </span>
      </div>
    </div>
  );
};

export default StatCard;
