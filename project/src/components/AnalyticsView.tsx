import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, MessageSquare, Star, Download, Calendar } from 'lucide-react';
import { mockAnalytics, mockContacts, mockCampaigns } from '../data/mockData';

type ConversionDataPoint = {
  date: string;
  contacts: number;
  conversations: number;
  qualified: number;
  conversionRate: number;
};

export const AnalyticsView: React.FC = () => {
  const conversionData = mockAnalytics.dailyMetrics.map(day => ({
    ...day,
    conversionRate: parseFloat(((day.qualified / day.contacts) * 100).toFixed(1))
  }));

  const statusDistribution = [
    { name: 'Qualified', value: mockContacts.filter(c => c.status === 'qualified').length, color: '#10B981' },
    { name: 'Follow-up', value: mockContacts.filter(c => c.status === 'followup').length, color: '#F59E0B' },
    { name: 'New', value: mockContacts.filter(c => c.status === 'new').length, color: '#6B7280' },
    { name: 'Contacted', value: mockContacts.filter(c => c.status === 'contacted').length, color: '#3B82F6' },
    { name: 'Cold', value: mockContacts.filter(c => c.status === 'cold').length, color: '#EF4444' }
  ];

  const leadScoreDistribution = [
    { range: '80-100', count: mockContacts.filter(c => c.leadScore >= 80).length, color: '#10B981' },
    { range: '60-79', count: mockContacts.filter(c => c.leadScore >= 60 && c.leadScore < 80).length, color: '#F59E0B' },
    { range: '40-59', count: mockContacts.filter(c => c.leadScore >= 40 && c.leadScore < 60).length, color: '#FF6B35' },
    { range: '0-39', count: mockContacts.filter(c => c.leadScore < 40).length, color: '#EF4444' }
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-2">Comprehensive insights into your WhatsApp automation performance</p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              <Calendar className="w-4 h-4 mr-2" />
              Last 7 days
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-green-600 text-sm font-medium">+12.5%</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{mockAnalytics.totalContacts.toLocaleString()}</p>
            <p className="text-gray-600 text-sm">Total Contacts</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-green-600 text-sm font-medium">+8.3%</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{mockAnalytics.totalConversations.toLocaleString()}</p>
            <p className="text-gray-600 text-sm">Conversations Started</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-green-600 text-sm font-medium">+23.1%</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{mockAnalytics.qualifiedLeads}</p>
            <p className="text-gray-600 text-sm">Qualified Leads</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-green-600 text-sm font-medium">+5.2%</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{mockAnalytics.conversionRate}%</p>
            <p className="text-gray-600 text-sm">Conversion Rate</p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Daily Activity Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Activity Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockAnalytics.dailyMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="contacts" stroke="#3B82F6" strokeWidth={2} name="Contacts" />
              <Line type="monotone" dataKey="conversations" stroke="#10B981" strokeWidth={2} name="Conversations" />
              <Line type="monotone" dataKey="qualified" stroke="#8B5CF6" strokeWidth={2} name="Qualified" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion Rate Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Rate Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={conversionData as ConversionDataPoint[]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value: number) => [`${value}%`, 'Conversion Rate']} />
              <Bar dataKey="conversionRate" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Contact Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Status Distribution</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {statusDistribution.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Score Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Score Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={leadScoreDistribution} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="range" type="category" />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Average Lead Score: <span className="font-semibold text-blue-600">{mockAnalytics.avgLeadScore}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Campaign Performance Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Campaign Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Campaign</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Messages Sent</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Delivery Rate</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Response Rate</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Qualified Rate</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">ROI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockCampaigns.map((campaign) => {
                const deliveryRate = ((campaign.metrics.delivered / campaign.metrics.sent) * 100).toFixed(1);
                const responseRate = ((campaign.metrics.replied / campaign.metrics.sent) * 100).toFixed(1);
                const qualifiedRate = ((campaign.metrics.qualified / campaign.metrics.sent) * 100).toFixed(1);
                const roi = (Math.random() * 400 + 100).toFixed(0); // Mock ROI
                
                return (
                  <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{campaign.name}</div>
                        <div className="text-sm text-gray-500">{campaign.status}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{campaign.metrics.sent}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 mr-2">{deliveryRate}%</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${deliveryRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 mr-2">{responseRate}%</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${responseRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 mr-2">{qualifiedRate}%</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full"
                            style={{ width: `${qualifiedRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-green-600">{roi}%</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};