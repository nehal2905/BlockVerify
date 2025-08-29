import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Shield, CheckCircle, Clock, AlertCircle, Lock, Unlock } from 'lucide-react';
import { VerificationStep } from '../../types';

export function VerificationPage() {
  const [documentId, setDocumentId] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    status: 'verified' | 'pending' | 'rejected' | null;
    document?: any;
    steps?: VerificationStep[];
  }>({ status: null });

  const handleVerification = async () => {
    if (!documentId.trim()) return;

    setVerifying(true);
    
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockResult = {
      status: Math.random() > 0.3 ? 'verified' : 'pending' as const,
      document: {
        title: 'University Diploma',
        type: 'Educational Certificate',
        uploadDate: '2025-01-10',
        hash: documentId,
        verifiedBy: 'Academic Registrar'
      },
      steps: [
        { id: '1', title: 'Document Hash Verification', completed: true, timestamp: '2025-01-10 10:30:00' },
        { id: '2', title: 'Blockchain Validation', completed: true, timestamp: '2025-01-10 10:31:15' },
        { id: '3', title: 'Authority Verification', completed: true, timestamp: '2025-01-10 10:32:45' },
        { id: '4', title: 'Final Approval', completed: Math.random() > 0.3, timestamp: Math.random() > 0.3 ? '2025-01-10 10:35:20' : undefined }
      ]
    };

    setVerificationResult(mockResult);
    setVerifying(false);
  };

  const getStatusIcon = () => {
    switch (verificationResult.status) {
      case 'verified':
        return <Unlock className="h-12 w-12 text-green-500" />;
      case 'pending':
        return <Clock className="h-12 w-12 text-yellow-500" />;
      case 'rejected':
        return <Lock className="h-12 w-12 text-red-500" />;
      default:
        return <Shield className="h-12 w-12 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Document Verification
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Enter a document ID or hash to verify its authenticity and status.
        </p>
      </div>

      {/* Search Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={documentId}
              onChange={(e) => setDocumentId(e.target.value)}
              placeholder="Enter document ID or blockchain hash..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleVerification}
            disabled={verifying || !documentId.trim()}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 disabled:opacity-50 flex items-center space-x-2"
          >
            {verifying ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <Shield className="h-5 w-5" />
            )}
            <span>{verifying ? 'Verifying...' : 'Verify'}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Verification Result */}
      <AnimatePresence>
        {verificationResult.status && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="space-y-6"
          >
            {/* Status Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="mb-6"
              >
                {getStatusIcon()}
              </motion.div>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {verificationResult.status === 'verified' && 'Document Verified'}
                {verificationResult.status === 'pending' && 'Verification Pending'}
                {verificationResult.status === 'rejected' && 'Verification Failed'}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {verificationResult.status === 'verified' && 'This document has been successfully verified and is authentic.'}
                {verificationResult.status === 'pending' && 'This document is currently under review by our verification team.'}
                {verificationResult.status === 'rejected' && 'This document could not be verified or has been tampered with.'}
              </p>

              {verificationResult.document && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Document Title
                      </label>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {verificationResult.document.title}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Document Type
                      </label>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {verificationResult.document.type}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Upload Date
                      </label>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {verificationResult.document.uploadDate}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Blockchain Hash
                      </label>
                      <p className="font-mono text-sm text-gray-900 dark:text-white">
                        {verificationResult.document.hash}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Verification Steps */}
            {verificationResult.steps && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Verification Audit Trail
                  </h3>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {verificationResult.steps.map((step, index) => (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="flex items-center space-x-4"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.2 + 0.3 }}
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step.completed 
                              ? 'bg-green-100 dark:bg-green-900/30' 
                              : 'bg-gray-100 dark:bg-gray-700'
                          }`}
                        >
                          {step.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <Clock className="h-5 w-5 text-gray-400" />
                          )}
                        </motion.div>

                        <div className="flex-1">
                          <p className={`font-medium ${
                            step.completed 
                              ? 'text-gray-900 dark:text-white' 
                              : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {step.title}
                          </p>
                          {step.timestamp && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {step.timestamp}
                            </p>
                          )}
                        </div>

                        {index < verificationResult.steps!.length - 1 && (
                          <div className="absolute left-4 mt-8 w-0.5 h-6 bg-gray-200 dark:bg-gray-600" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}