import React from 'react';
import { Users, MessageSquare, TrendingUp, Star } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { mockAnalytics, mockContacts, mockCampaigns } from '../data/mockData';

export const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Contacts',
      value: mockAnalytics.totalContacts.toLocaleString(),
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Conversations',
      value: mockAnalytics.totalConversations.toLocaleString(),
      change: '+8.3%',
      changeType: 'positive' as const,
      icon: MessageSquare,
      color: 'green'
    },
    {
      title: 'Qualified Leads',
      value: mockAnalytics.qualifiedLeads.toLocaleString(),
      change: '+23.1%',
      changeType: 'positive' as const,
      icon: Star,
      color: 'purple'
    },
    {
      title: 'Conversion Rate',
      value: `${mockAnalytics.conversionRate}%`,
      change: '+5.2%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'orange'
    }
  ];

  const recentContacts = mockContacts.slice(0, 3);
  const activeCampaigns = mockCampaigns.filter(c => c.status === 'running');

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'qualified': 'bg-green-100 text-green-800',
      'followup': 'bg-blue-100 text-blue-800',
      'new': 'bg-gray-100 text-gray-800',
      'contacted': 'bg-yellow-100 text-yellow-800',
      'cold': 'bg-red-100 text-red-800',
      'opted_out': 'bg-gray-100 text-gray-600'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Monitor your WhatsApp automation performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-500 text-white',
            green: 'bg-green-500 text-white',
            purple: 'bg-purple-500 text-white',
            orange: 'bg-orange-500 text-white'
          };

          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  stat.changeType === 'positive' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Daily Activity Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockAnalytics.dailyMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="contacts" fill="#3B82F6" name="Contacts" />
              <Bar dataKey="conversations" fill="#10B981" name="Conversations" />
              <Bar dataKey="qualified" fill="#8B5CF6" name="Qualified" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockAnalytics.dailyMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="qualified" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                name="Qualified Leads"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Contacts</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {recentContacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{contact.name}</p>
                    <p className="text-sm text-gray-500">{contact.company}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                    {contact.status}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">Score: {contact.leadScore}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Campaigns */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Active Campaigns</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Manage</button>
          </div>
          <div className="space-y-4">
            {activeCampaigns.map((campaign) => (
              <div key={campaign.id} className="p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    {campaign.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{campaign.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Sent:</span>
                    <span className="font-medium text-gray-900 ml-1">{campaign.metrics.sent}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Qualified:</span>
                    <span className="font-medium text-gray-900 ml-1">{campaign.metrics.qualified}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Response Rate</span>
                    <span>{((campaign.metrics.replied / campaign.metrics.sent) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(campaign.metrics.replied / campaign.metrics.sent) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};