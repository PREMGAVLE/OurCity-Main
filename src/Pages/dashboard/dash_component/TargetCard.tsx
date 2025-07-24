import React from "react";

interface TargetCardProps {
  percentage: number;
  amount: number;
  target: number;
}

const TargetCard: React.FC<TargetCardProps> = ({ percentage, amount, target }) => {
  return (
    <div className="bg-white shadow rounded-xl p-6 flex flex-col justify-between">
      <h2 className="text-lg font-semibold mb-1">Monthly Target</h2>
      <p className="text-sm text-gray-500 mb-4">Target you’ve set for each month</p>

      <div className="flex justify-center my-4">
        <div className="relative w-32 h-32">
          <svg className="transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#E5E7EB"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#4F46E5"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={282.6}
              strokeDashoffset={282.6 - (percentage / 100) * 282.6}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold">
            {percentage.toFixed(2)}%
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-gray-600 mt-2">
        You earn <span className="font-semibold">${amount}</span> today, it’s higher than last month. Keep up your good work!
      </p>

      <div className="mt-4 flex justify-between text-sm font-medium text-gray-700">
        <div>
          <p>Target</p>
          <p className="text-red-500">${target}K ↓</p>
        </div>
        <div>
          <p>Revenue</p>
          <p className="text-green-500">${target}K ↑</p>
        </div>
        <div>
          <p>Today</p>
          <p className="text-green-500">${amount}K ↑</p>
        </div>
      </div>
    </div>
  );
};

export default TargetCard;
