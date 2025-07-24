import { useState } from 'react';
import { Search, Filter, Plus, Phone, Mail, MoreVertical } from 'lucide-react';

export const LeadsManagement = () => {
  const [filterStatus, setFilterStatus] = useState('all');

  const leads = [
    { id: 1, name: 'Alice Johnson', email: 'alice@email.com', phone: '+1 234-567-8901', status: 'new', source: 'Website', value: '$5,000', date: '2024-01-15' },
    { id: 2, name: 'Bob Smith', email: 'bob@email.com', phone: '+1 234-567-8902', status: 'contacted', source: 'Referral', value: '$3,200', date: '2024-01-14' },
    { id: 3, name: 'Carol Davis', email: 'carol@email.com', phone: '+1 234-567-8903', status: 'qualified', source: 'Social Media', value: '$7,500', date: '2024-01-13' },
    { id: 4, name: 'David Wilson', email: 'david@email.com', phone: '+1 234-567-8904', status: 'converted', source: 'Google Ads', value: '$12,000', date: '2024-01-12' },
    { id: 5, name: 'Eva Brown', email: 'eva@email.com', phone: '+1 234-567-8905', status: 'lost', source: 'Website', value: '$2,800', date: '2024-01-11' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-primary/10 text-primary';
      case 'contacted': return 'bg-yellow-100 text-yellow-700';
      case 'qualified': return 'bg-purple-100 text-purple-700';
      case 'converted': return 'bg-green-100 text-green-700';
      case 'lost': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredLeads = filterStatus === 'all' ? leads : leads.filter(lead => lead.status === filterStatus);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary">Leads Management</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Track and manage your business leads</p>
        </div>
        <button className="bg-primary text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center text-sm sm:text-base">
          <Plus size={18} className="mr-2" />
          Add New Lead
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="text"
              placeholder="Search leads..."
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-muted-foreground" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="converted">Converted</option>
              <option value="lost">Lost</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="block md:hidden space-y-4">
        {filteredLeads.map((lead) => (
          <div key={lead.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-primary">{lead.name}</h3>
                <p className="text-sm text-muted-foreground">{lead.email}</p>
                <p className="text-sm text-muted-foreground">{lead.phone}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(lead.status)}`}>
                {lead.status}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm text-muted-foreground mb-3">
              <span>{lead.source}</span>
              <span className="font-semibold text-primary">{lead.value}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{lead.date}</span>
              <div className="flex gap-2">
                <button className="p-1.5 text-primary hover:bg-primary/10 rounded-md">
                  <Phone size={14} />
                </button>
                <button className="p-1.5 text-primary hover:bg-primary/10 rounded-md">
                  <Mail size={14} />
                </button>
                <button className="p-1.5 text-muted-foreground hover:bg-gray-50 rounded-md">
                  <MoreVertical size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Contact', 'Status', 'Source', 'Value', 'Date', 'Actions'].map((heading) => (
                  <th key={heading} className="text-left px-6 py-4 font-semibold text-muted-foreground text-sm">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-primary text-sm">{lead.name}</div>
                      <div className="text-xs text-muted-foreground">{lead.email}</div>
                      <div className="text-xs text-muted-foreground">{lead.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">{lead.source}</td>
                  <td className="px-6 py-4 font-semibold text-primary text-sm">{lead.value}</td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">{lead.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-primary hover:text-primary/80 hover:bg-primary/10 rounded-lg">
                        <Phone size={14} />
                      </button>
                      <button className="p-2 text-primary hover:text-primary/80 hover:bg-primary/10 rounded-lg">
                        <Mail size={14} />
                      </button>
                      <button className="p-2 text-muted-foreground hover:text-gray-700 hover:bg-gray-50 rounded-lg">
                        <MoreVertical size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <h3 className="text-base sm:text-lg font-semibold text-primary mb-6">Conversion Funnel</h3>
        <div className="space-y-4">
          {[
            { stage: 'Total Leads', count: 2847, percentage: 100 },
            { stage: 'Contacted', count: 1982, percentage: 70 },
            { stage: 'Qualified', count: 1139, percentage: 40 },
            { stage: 'Proposals', count: 569, percentage: 20 },
            { stage: 'Converted', count: 285, percentage: 10 },
          ].map((stage, index) => (
            <div key={index} className="flex items-center">
              <div className="w-28 text-sm font-medium text-muted-foreground">{stage.stage}</div>
              <div className="flex-1 mx-4">
                <div className="bg-gray-200 rounded-full h-6 flex items-center overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                    style={{ width: `${stage.percentage}%` }}
                  >
                    <span className="text-white text-sm font-medium">{stage.count}</span>
                  </div>
                </div>
              </div>
              <div className="w-12 text-right text-sm font-medium text-muted-foreground">{stage.percentage}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
