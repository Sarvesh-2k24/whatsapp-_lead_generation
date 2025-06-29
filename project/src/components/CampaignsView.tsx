import React, { useState } from 'react';
import { Target, Plus, Play, Pause, Users, MessageSquare, TrendingUp } from 'lucide-react';
import { mockCampaigns } from '../data/mockData';
import { Campaign } from '../types';

export const CampaignsView: React.FC = () => {
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);

  const getStatusColor = (status: Campaign['status']) => {
    const colors = {
      'draft': 'bg-gray-100 text-gray-800',
      'running': 'bg-green-100 text-green-800',
      'paused': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-blue-100 text-blue-800'
    };
    return colors[status];
  };

  const getStatusIcon = (status: Campaign['status']) => {
    switch (status) {
      case 'running': return <Play className="w-4 h-4" />;
      case 'paused': return <Pause className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
            <p className="text-gray-600 mt-2">Manage your outreach campaigns and track performance</p>
          </div>
          <button 
            onClick={() => setShowCreateCampaign(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </button>
        </div>
      </div>

      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">{mockCampaigns.length}</p>
            </div>
            <Target className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Campaigns</p>
              <p className="text-2xl font-bold text-green-600">
                {mockCampaigns.filter(c => c.status === 'running').length}
              </p>
            </div>
            <Play className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Messages Sent</p>
              <p className="text-2xl font-bold text-purple-600">
                {mockCampaigns.reduce((sum, c) => sum + c.metrics.sent, 0)}
              </p>
            </div>
            <MessageSquare className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Response Rate</p>
              <p className="text-2xl font-bold text-orange-600">
                {(mockCampaigns.reduce((sum, c) => sum + (c.metrics.replied / c.metrics.sent), 0) / mockCampaigns.length * 100).toFixed(1)}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Campaign List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Campaigns</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Campaign</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Targets</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Sent</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Delivered</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Replied</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Qualified</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-sm text-gray-500">{campaign.description}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        Created: {new Date(campaign.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                      {getStatusIcon(campaign.status)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-900">
                      <Users className="w-4 h-4 mr-2 text-gray-400" />
                      {campaign.targetContacts.length}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{campaign.metrics.sent}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{campaign.metrics.delivered}</div>
                    <div className="text-xs text-gray-500">
                      {((campaign.metrics.delivered / campaign.metrics.sent) * 100).toFixed(1)}%
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{campaign.metrics.replied}</div>
                    <div className="text-xs text-gray-500">
                      {((campaign.metrics.replied / campaign.metrics.sent) * 100).toFixed(1)}%
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{campaign.metrics.qualified}</div>
                    <div className="text-xs text-gray-500">
                      {((campaign.metrics.qualified / campaign.metrics.sent) * 100).toFixed(1)}%
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View</button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">Edit</button>
                      {campaign.status === 'running' ? (
                        <button className="text-yellow-600 hover:text-yellow-800 text-sm font-medium">Pause</button>
                      ) : campaign.status === 'paused' ? (
                        <button className="text-green-600 hover:text-green-800 text-sm font-medium">Resume</button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Campaign Performance Chart */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Performance Overview</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockCampaigns.map((campaign) => (
            <div key={campaign.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                  {campaign.status}
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Messages Sent</span>
                  <span className="font-medium text-gray-900">{campaign.metrics.sent}</span>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Delivery Rate</span>
                    <span className="font-medium text-green-600">
                      {((campaign.metrics.delivered / campaign.metrics.sent) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(campaign.metrics.delivered / campaign.metrics.sent) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Response Rate</span>
                    <span className="font-medium text-blue-600">
                      {((campaign.metrics.replied / campaign.metrics.sent) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(campaign.metrics.replied / campaign.metrics.sent) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Qualification Rate</span>
                    <span className="font-medium text-purple-600">
                      {((campaign.metrics.qualified / campaign.metrics.sent) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${(campaign.metrics.qualified / campaign.metrics.sent) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Campaign Modal */}
      {showCreateCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Campaign</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Flow</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Lead Qualification Flow</option>
                    <option>Follow-up Sequence</option>
                    <option>Product Demo Flow</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows={3}></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="ml-2 text-sm text-gray-700">All contacts</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="ml-2 text-sm text-gray-700">New leads only</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="ml-2 text-sm text-gray-700">By lead score ({'>'} 50)</span>
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Immediate</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowCreateCampaign(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};