import React, { useEffect, useState } from 'react';

import {
  TrendingUp, Users, Building2, DollarSign,
  ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import axios from '@/axois';
// import axios from 'axios';

interface StatItem {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ElementType;
}

const Overview: React.FC = () => {
  const [stats, setStats] = useState<StatItem[]>([]);
  const userId = localStorage.getItem('userId') || '';

  useEffect(() => {
    const fetchOverview = async () => {
      if (!userId) return console.warn("No userId found in localStorage!");

      try {
        const res = await axios.get(`/dashboard/overview/${userId}`, {
          headers: {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            Expires: '0',
          },
        });
         console.log(res.data);
        const data = res.data;
        
        

        setStats([
          {
            title: 'Total Revenue',
            value: `$${(data.totalRevenue ?? 0).toLocaleString()}`,
            change: `${data.revenueChange > 0 ? '+' : ''}${data.revenueChange ?? 0}%`,
            trend: (data.revenueChange ?? 0) >= 0 ? 'up' : 'down',
            icon: DollarSign,
          },
          {
            title: 'Active Leads',
            value: (data.activeLeads ?? 0).toLocaleString(),
            change: `${data.leadsChange > 0 ? '+' : ''}${data.leadsChange ?? 0}%`,
            trend: (data.leadsChange ?? 0) >= 0 ? 'up' : 'down',
            icon: Users,
          },
          {
            title: 'Business Listings',
            value: String(data.businessCount ?? 0),
            change: `${data.listingChange > 0 ? '+' : ''}${data.listingChange ?? 0}%`,
            trend: (data.listingChange ?? 0) >= 0 ? 'up' : 'down',
            icon: Building2,
          },
          {
            title: 'Conversion Rate',
            value: `${data.conversionRate ?? 0}%`,
            change: `${data.conversionChange > 0 ? '+' : ''}${data.conversionChange ?? 0}%`,
            trend: (data.conversionChange ?? 0) >= 0 ? 'up' : 'down',
            icon: TrendingUp,
          },
        ]);

      } catch (error) {
        console.error('Error fetching dashboard overview:', error);
      }
    };

    fetchOverview();
  }, [userId]);

  const barData = [
    { name: 'Jan', revenue: 65000, leads: 400 },
    { name: 'Feb', revenue: 59000, leads: 300 },
    { name: 'Mar', revenue: 80000, leads: 500 },
    { name: 'Apr', revenue: 81000, leads: 450 },
    { name: 'May', revenue: 56000, leads: 350 },
    { name: 'Jun', revenue: 95000, leads: 600 }
  ];

  const lineData = [
    { name: 'Week 1', conversions: 240 },
    { name: 'Week 2', conversions: 300 },
    { name: 'Week 3', conversions: 200 },
    { name: 'Week 4', conversions: 278 }
  ];

  const pieData = [
    { name: 'Organic', value: 45, color: '#7C3AED' },
    { name: 'Paid Ads', value: 30, color: '#8B5CF6' },
    { name: 'Referral', value: 15, color: '#A78BFA' },
    { name: 'Social', value: 10, color: '#C4B5FD' }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">{stat.title}</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  <div className="flex items-center">
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-xs sm:text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 ml-3 sm:ml-4">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-100">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Revenue & Leads Trend</h3>
          <div className="h-48 sm:h-56 md:h-64 lg:h-80 text-primary">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={11} />
                <YAxis stroke="#6b7280" fontSize={11} />
                <Bar dataKey="revenue" fill="currentColor" radius={4} />
                <Bar dataKey="leads" fill="#A78BFA" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-100">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Conversion Trend</h3>
          <div className="h-48 sm:h-56 md:h-64 lg:h-80 text-primary">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={11} />
                <YAxis stroke="#6b7280" fontSize={11} />
                <Line
                  type="monotone"
                  dataKey="conversions"
                  stroke="currentColor"
                  strokeWidth={3}
                  dot={{ fill: 'currentColor', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-100">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Lead Sources</h3>
          <div className="h-40 sm:h-48 md:h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={25} outerRadius={50} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 sm:mt-4 space-y-2">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                  <span className="text-xs sm:text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-100">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Recent Activity</h3>
          <div className="space-y-3 sm:space-y-4 max-h-48 sm:max-h-56 md:max-h-64 overflow-y-auto">
            {[
              { action: 'New lead from Website', time: '2 minutes ago' },
              { action: 'Business listing updated', time: '15 minutes ago' },
              { action: 'Payment received from Client A', time: '1 hour ago' },
              { action: 'New message from Support', time: '2 hours ago' },
              { action: 'Lead converted to customer', time: '4 hours ago' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
