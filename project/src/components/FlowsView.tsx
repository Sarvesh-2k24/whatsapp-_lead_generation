import React, { useState } from 'react';
import { Bot, Plus, Play, Pause, Edit, Copy, Trash2, ArrowRight, MessageSquare, HelpCircle, Zap } from 'lucide-react';
import { mockFlows } from '../data/mockData';
import { ConversationFlow } from '../types';

export const FlowsView: React.FC = () => {
  const [selectedFlow, setSelectedFlow] = useState<ConversationFlow | null>(null);
  const [showCreateFlow, setShowCreateFlow] = useState(false);

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'message': return MessageSquare;
      case 'question': return HelpCircle;
      case 'condition': return ArrowRight;
      case 'action': return Zap;
      default: return MessageSquare;
    }
  };

  const getStepColor = (type: string) => {
    switch (type) {
      case 'message': return 'bg-blue-100 text-blue-600';
      case 'question': return 'bg-green-100 text-green-600';
      case 'condition': return 'bg-yellow-100 text-yellow-600';
      case 'action': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Conversation Flows</h1>
            <p className="text-gray-600 mt-2">Create and manage automated conversation workflows</p>
          </div>
          <button 
            onClick={() => setShowCreateFlow(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Flow
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Flow List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Available Flows</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {mockFlows.map((flow) => (
                <div
                  key={flow.id}
                  onClick={() => setSelectedFlow(flow)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedFlow?.id === flow.id ? 'bg-blue-50 border-r-2 border-blue-600' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-5 h-5 text-blue-600" />
                        <h3 className="font-medium text-gray-900">{flow.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{flow.description}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                          {flow.category}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className={`w-2 h-2 rounded-full ${flow.isActive ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                          <span className="text-xs text-gray-500">
                            {flow.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Flow Details */}
        <div className="lg:col-span-2">
          {selectedFlow ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Flow Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{selectedFlow.name}</h2>
                    <p className="text-gray-600 mt-1">{selectedFlow.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className={`p-2 border rounded-lg transition-colors ${
                      selectedFlow.isActive 
                        ? 'text-red-600 hover:text-red-800 border-red-300 hover:bg-red-50'
                        : 'text-green-600 hover:text-green-800 border-green-300 hover:bg-green-50'
                    }`}>
                      {selectedFlow.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mt-4">
                  <span className="text-sm text-gray-600">
                    Category: <span className="font-medium">{selectedFlow.category}</span>
                  </span>
                  <span className="text-sm text-gray-600">
                    Steps: <span className="font-medium">{selectedFlow.steps.length}</span>
                  </span>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    selectedFlow.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedFlow.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              {/* Flow Steps */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Flow Steps</h3>
                <div className="space-y-4">
                  {selectedFlow.steps.map((step, index) => {
                    const StepIcon = getStepIcon(step.type);
                    
                    return (
                      <div key={step.id} className="relative">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStepColor(step.type)}`}>
                              <StepIcon className="w-5 h-5" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-gray-900 capitalize">
                                {step.type} Step {index + 1}
                              </h4>
                              {step.delay && (
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                  Delay: {step.delay}min
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{step.content}</p>
                            {step.options && (
                              <div className="mt-2">
                                <p className="text-xs text-gray-500 mb-2">Options:</p>
                                <div className="flex flex-wrap gap-2">
                                  {step.options.map((option, optIndex) => (
                                    <span key={optIndex} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                      {option}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        {index < selectedFlow.steps.length - 1 && (
                          <div className="absolute left-5 top-10 w-px h-6 bg-gray-300"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Flow Actions */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Last modified: <span className="font-medium">2 days ago</span>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      Test Flow
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Edit Flow
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-96 flex items-center justify-center">
              <div className="text-center">
                <Bot className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Select a flow to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Flow Templates */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Flow Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: 'Lead Qualification',
              description: 'Qualify leads using BANT criteria',
              category: 'Sales',
              steps: 4
            },
            {
              name: 'Product Demo Booking',
              description: 'Schedule product demonstrations',
              category: 'Sales',
              steps: 3
            },
            {
              name: 'Customer Support',
              description: 'Handle common support queries',
              category: 'Support',
              steps: 5
            }
          ].map((template, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">{template.name}</h3>
                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  {template.category}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{template.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{template.steps} steps</span>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Flow Modal */}
      {showCreateFlow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Flow</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Flow Name</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows={3}></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Sales</option>
                  <option>Support</option>
                  <option>Nurturing</option>
                  <option>Onboarding</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowCreateFlow(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Flow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};