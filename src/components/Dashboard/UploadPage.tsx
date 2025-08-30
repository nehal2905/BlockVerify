import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, File, X, CheckCircle, Shield } from 'lucide-react';
import { DocumentService } from '../../services/documentService';

export function UploadPage() {
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [documentDetails, setDocumentDetails] = useState<{[key: string]: {title: string, type: string, tags: string[]}}>({});
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(selectedFiles);
    
    // Initialize document details for new files
    const newDetails: {[key: string]: {title: string, type: string, tags: string[]}} = {};
    selectedFiles.forEach(file => {
      newDetails[file.name] = {
        title: file.name.split('.')[0],
        type: 'General Document',
        tags: []
      };
    });
    setDocumentDetails(newDetails);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    const removedFile = files[index];
    const newDetails = { ...documentDetails };
    delete newDetails[removedFile.name];
    setFiles(newFiles);
    setDocumentDetails(newDetails);
  };

  const updateDocumentDetail = (fileName: string, field: string, value: any) => {
    setDocumentDetails(prev => ({
      ...prev,
      [fileName]: {
        ...prev[fileName],
        [field]: value
      }
    }));
  };
  const handleUpload = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    setError(null);

    try {
      for (const file of files) {
        const details = documentDetails[file.name];
        await DocumentService.uploadDocument(
          file,
          details.title,
          details.type,
          details.tags
        );
      }
      
      setUploaded(true);
      setTimeout(() => {
        setUploaded(false);
        setFiles([]);
        setDocumentDetails({});
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Upload Documents
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Securely upload your documents for blockchain verification and storage.
        </p>
      </div>

      {/* Upload Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-dashed border-gray-300 dark:border-gray-600 overflow-hidden"
      >
        <motion.div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          whileHover={{ scale: 1.01 }}
          className={`p-12 text-center transition-all duration-300 ${
            dragOver ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-400' : ''
          }`}
        >
          <motion.div
            animate={{
              scale: dragOver ? 1.1 : 1,
              rotate: dragOver ? 5 : 0
            }}
            className="mb-6"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="h-12 w-12 text-white" />
            </div>
          </motion.div>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Drop your documents here
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            or click to browse your files
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fileInputRef.current?.click()}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
          >
            Browse Files
          </motion.button>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
        </motion.div>
      </motion.div>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Selected Files ({files.length})
              </h3>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {files.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <File className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{file.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFile(index)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </motion.button>
                  </div>

                  {/* Document Details Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Document Title
                      </label>
                      <input
                        type="text"
                        value={documentDetails[file.name]?.title || ''}
                        onChange={(e) => updateDocumentDetail(file.name, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter document title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Document Type
                      </label>
                      <select
                        value={documentDetails[file.name]?.type || 'General Document'}
                        onChange={(e) => updateDocumentDetail(file.name, 'type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="General Document">General Document</option>
                        <option value="Educational Certificate">Educational Certificate</option>
                        <option value="Professional License">Professional License</option>
                        <option value="Healthcare Document">Healthcare Document</option>
                        <option value="Legal Document">Legal Document</option>
                        <option value="Financial Document">Financial Document</option>
                        <option value="Identity Document">Identity Document</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}
            <div className="p-6 bg-gray-50 dark:bg-gray-700/50">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleUpload}
                disabled={uploading || files.length === 0}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {uploading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Encrypting & Uploading...</span>
                  </>
                ) : uploaded ? (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    <span>Upload Complete!</span>
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5" />
                    <span>Encrypt & Upload</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Progress */}
      <AnimatePresence>
        {uploading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Upload Progress
            </h3>
            <div className="space-y-3">
              {['Encrypting files...', 'Generating blockchain hash...', 'Uploading to secure storage...'].map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 1 }}
                  className="flex items-center space-x-3"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{step}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}