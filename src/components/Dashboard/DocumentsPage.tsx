import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, Filter, CheckCircle, Clock, AlertCircle, Download, Eye } from 'lucide-react';
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
  },
  {
    id: '4',
    title: 'Technical Certification',
    type: 'Professional Certificate',
    status: 'verified',
    uploadDate: '2025-01-05',
    hash: '0xa1b2c3d4e5f6g7h8i9j0',
    size: 1024000,
    tags: ['technology', 'aws'],
    verifiedBy: 'AWS Training',
    verificationDate: '2025-01-06'
  }
];

export function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || doc.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

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
        return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'rejected':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          My Documents
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage and track all your uploaded documents in one place.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search documents..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDocuments.map((doc, index) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {doc.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{doc.type}</p>
                  </div>
                </div>

                <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(doc.status)}`}>
                  {getStatusIcon(doc.status)}
                  <span className="capitalize">{doc.status}</span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Upload Date:</span>
                  <span className="text-gray-900 dark:text-white">{doc.uploadDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">File Size:</span>
                  <span className="text-gray-900 dark:text-white">
                    {(doc.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Hash:</span>
                  <span className="text-gray-900 dark:text-white font-mono text-xs">
                    {doc.hash.substring(0, 16)}...
                  </span>
                </div>
                {doc.verificationDate && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Verified:</span>
                    <span className="text-gray-900 dark:text-white">{doc.verificationDate}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {doc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  <span>View</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}