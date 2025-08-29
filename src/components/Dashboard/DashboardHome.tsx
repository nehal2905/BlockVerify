import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, Clock, CheckCircle, AlertCircle, Upload } from 'lucide-react';
import { Document } from '../../types';

const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'University Diploma',
    type: 'Educational Certificate',
    status: 'verified',
    uploadDate: '2025-01-10',
    hash: '0x7f8a9b2c1d4e5f6g7h8i9j',
    size: 2048576,
    tags: ['education', 'bachelor'],
    verifiedBy: 'Academic Registrar',
    verificationDate: '2025-01-11'
  },
  {
    id: '2',
    title: 'Professional License',
    type: 'License',
    status: 'pending',
    uploadDate: '2025-01-12',
    hash: '0x1a2b3c4d5e6f7g8h9i0j',
    size: 1536000,
    tags: ['professional', 'license']
  },
  {
    id: '3',
    title: 'Medical Certificate',
    type: 'Healthcare Document',
    status: 'rejected',
    uploadDate: '2025-01-08',
    hash: '0x9z8y7x6w5v4u3t2s1r0q',
    size: 3072000,
    tags: ['medical', 'certificate']
  }
];

export function DashboardHome() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'rejected':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Documents', value: '24', icon: FileText, color: 'blue' },
          { label: 'Verified', value: '18', icon: CheckCircle, color: 'green' },
          { label: 'Pending', value: '4', icon: Clock, color: 'yellow' },
          { label: 'Security Score', value: '98%', icon: Shield, color: 'purple' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-lg flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Upload New Document</h3>
            <p className="text-blue-100">
              Securely upload and verify your important documents with blockchain protection.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/20 hover:bg-white/30 p-4 rounded-xl transition-all duration-300 backdrop-blur-sm"
          >
            <Upload className="h-8 w-8" />
          </motion.button>
        </div>
      </motion.div>

      {/* Recent Documents */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Documents</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track the status of your uploaded documents
          </p>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {mockDocuments.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
              className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {doc.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {doc.type} • Uploaded {doc.uploadDate}
                    </p>
                    <div className="flex space-x-2 mt-1">
                      {doc.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(doc.status)}`}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(doc.status)}
                      <span className="capitalize">{doc.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}