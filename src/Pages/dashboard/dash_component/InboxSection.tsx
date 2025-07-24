import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, ResponsiveContainer
} from "recharts";

const focusData = [
  { name: "Week 1", Focus: 30, Distraction: 70 },
  { name: "Week 2", Focus: 45, Distraction: 55 },
  { name: "Week 3", Focus: 60, Distraction: 40 },
  { name: "Week 4", Focus: 80, Distraction: 20 },
];

const leadsData = [
  { name: "Mon", Leads: 24 },
  { name: "Tue", Leads: 30 },
  { name: "Wed", Leads: 20 },
  { name: "Thu", Leads: 27 },
  { name: "Fri", Leads: 18 },
  { name: "Sat", Leads: 23 },
];

const InboxSection: React.FC = () => {
  return (
    <div id="inbox" className="scroll-mt-24 px-6 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Inbox</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Focus Analysis */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Focus Analysis</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={focusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Focus" stroke="#22c55e" strokeWidth={3} />
              <Line type="monotone" dataKey="Distraction" stroke="#ef4444" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Leads */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Weekly Leads</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={leadsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Leads" fill="#3b82f6" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default InboxSection;
