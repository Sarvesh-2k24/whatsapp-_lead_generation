import React, { useState } from 'react';
import { MessageSquare, Search, Clock, User, Bot, Send } from 'lucide-react';
import { mockContacts, mockConversations } from '../data/mockData';
import { format } from 'date-fns';

export const ConversationsView: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const selectedConv = selectedConversation 
    ? mockConversations.find(c => c.id === selectedConversation)
    : null;

  const selectedContact = selectedConv
    ? mockContacts.find(c => c.id === selectedConv.contactId)
    : null;

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message via API
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Conversations</h1>
        <p className="text-gray-600 mt-2">Manage active conversations and engage with leads</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversation List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Search Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  All
                </button>
                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-full text-xs font-medium">
                  Active
                </button>
                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-full text-xs font-medium">
                  Qualified
                </button>
              </div>
            </div>

            {/* Conversation List */}
            <div className="max-h-96 overflow-y-auto">
              {mockConversations.map((conversation) => {
                const contact = mockContacts.find(c => c.id === conversation.contactId);
                const lastMessage = conversation.messages[conversation.messages.length - 1];
                
                return (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedConversation === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold text-sm">
                          {contact?.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">{contact?.name}</p>
                          <p className="text-xs text-gray-500">
                            {format(new Date(lastMessage?.timestamp || conversation.updatedAt), 'HH:mm')}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 truncate mt-1">
                          {contact?.company}
                        </p>
                        <p className="text-sm text-gray-600 truncate mt-1">
                          {lastMessage?.content}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            conversation.status === 'active' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {conversation.status}
                          </span>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-gray-500">Score:</span>
                            <span className="text-xs font-medium text-blue-600">{conversation.leadScore}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-2">
          {selectedConv && selectedContact ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {selectedContact.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedContact.name}</h3>
                    <p className="text-sm text-gray-500">{selectedContact.company}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    selectedContact.status === 'qualified'
                      ? 'bg-green-100 text-green-800'
                      : selectedContact.status === 'followup'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedContact.status}
                  </span>
                  <div className="text-sm text-gray-500">
                    Score: <span className="font-medium text-blue-600">{selectedConv.leadScore}</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedConv.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === 'sent'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <div className={`flex items-center justify-between mt-2 text-xs ${
                        message.type === 'sent' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        <span>{format(new Date(message.timestamp), 'HH:mm')}</span>
                        <div className="flex items-center space-x-1">
                          {message.isAutomated ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                          <span>{message.isAutomated ? 'Auto' : 'Manual'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span>Press Enter to send</span>
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-700">Templates</button>
                    <button className="text-blue-600 hover:text-blue-700">Quick Replies</button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[600px] flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Chats</p>
              <p className="text-2xl font-bold text-blue-600">{mockConversations.filter(c => c.status === 'active').length}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Response Time</p>
              <p className="text-2xl font-bold text-green-600">2.5m</p>
            </div>
            <Clock className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Messages Today</p>
              <p className="text-2xl font-bold text-purple-600">124</p>
            </div>
            <Send className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Automation Rate</p>
              <p className="text-2xl font-bold text-orange-600">78%</p>
            </div>
            <Bot className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );
};