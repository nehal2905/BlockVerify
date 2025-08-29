import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, CheckCircle, XCircle, TrendingUp, Settings } from 'lucide-react';
import { Analytics } from '../../types';

const mockAnalytics: Analytics = {
  totalUploads: 1247,
  totalVerifications: 1098,
  pendingRequests: 23,
  rejectedDocuments: 126
};

const mockUsers = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'verifier', status: 'active', documents: 45 },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'user', status: 'active', documents: 12 },
  { id: '3', name: 'Carol Wilson', email: 'carol@example.com', role: 'user', status: 'inactive', documents: 8 }
];

const mockPendingRequests = [
  { id: '1', title: 'Medical License', user: 'Dr. Sarah Brown', uploadDate: '2025-01-12', type: 'License' },
  { id: '2', title: 'Engineering Degree', user: 'Mike Chen', uploadDate: '2025-01-12', type: 'Educational Certificate' },
  { id: '3', title: 'Business Certificate', user: 'Lisa Garcia', uploadDate: '2025-01-11', type: 'Business Document' }
];

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState('analytics');

  const tabs = [
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'verification', label: 'Pending Verifications', icon: FileText },
    { id: 'settings', label: 'System Settings', icon: Settings }
  ];

  const handleApprove = (requestId: string) => {
    console.log('Approved:', requestId);
  };

  const handleReject = (requestId: string) => {
    console.log('Rejected:', requestId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Admin Panel
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage users, verify documents, and monitor system analytics.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'analytics' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Analytics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Uploads', value: mockAnalytics.totalUploads, icon: FileText, color: 'blue', change: '+12%' },
                  { label: 'Verifications', value: mockAnalytics.totalVerifications, icon: CheckCircle, color: 'green', change: '+8%' },
                  { label: 'Pending Requests', value: mockAnalytics.pendingRequests, icon: Clock, color: 'yellow', change: '-5%' },
                  { label: 'Rejected Documents', value: mockAnalytics.rejectedDocuments, icon: XCircle, color: 'red', change: '+2%' }
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-10 h-10 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-lg flex items-center justify-center`}>
                          <Icon className={`h-5 w-5 text-${stat.color}-600`} />
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded ${
                          stat.change.startsWith('+') 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {stat.change}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value.toLocaleString()}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Chart Placeholder */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 h-64 flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 dark:text-gray-400">Analytics charts would appear here</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {mockUsers.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
                      user.role === 'verifier' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                    }`}>
                      {user.role}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                    }`}>
                      {user.status}
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {user.documents} docs
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'verification' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {mockPendingRequests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{request.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {request.user} • {request.type} • {request.uploadDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleApprove(request.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Approve</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleReject(request.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-1"
                    >
                      <XCircle className="h-4 w-4" />
                      <span>Reject</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                System settings would be configured here
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}