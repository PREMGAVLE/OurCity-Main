import React from "react";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

const Clients: React.FC = () => {
  const weeklyProgressData = [
    { week: "Week 1", Completed: 12, Incomplete: 8 },
    { week: "Week 2", Completed: 15, Incomplete: 5 },
    { week: "Week 3", Completed: 18, Incomplete: 2 },
    { week: "Week 4", Completed: 20, Incomplete: 0 },
  ];

  return (
    <div className="scroll-mt-24 p-6">
      <h1 className="text-2xl font-bold mb-4">Clients</h1>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Weekly Progress</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weeklyProgressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Completed" fill="#16a34a" radius={[5, 5, 0, 0]} />
            <Bar dataKey="Incomplete" fill="#f43f5e" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Clients;
