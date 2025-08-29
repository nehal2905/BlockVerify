import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Moon, Sun } from 'lucide-react';
import { Sidebar } from '../components/Layout/Sidebar';
import { DashboardHome } from '../components/Dashboard/DashboardHome';
import { UploadPage } from '../components/Dashboard/UploadPage';
import { VerificationPage } from '../components/Dashboard/VerificationPage';
import { DocumentsPage } from '../components/Dashboard/DocumentsPage';
import { AdminPanel } from '../components/Dashboard/AdminPanel';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export function DashboardPage() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardHome />;
      case 'documents':
        return <DocumentsPage />;
      case 'upload':
        return <UploadPage />;
      case 'verification':
        return <VerificationPage />;
      case 'admin':
        return user?.role === 'admin' ? <AdminPanel /> : <DashboardHome />;
      case 'notifications':
        return (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No new notifications</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">Settings page coming soon</p>
          </div>
        );
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Top Bar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50"
      >
        <div className="h-full flex items-center justify-between px-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            BlockVerify Dashboard
          </h2>
          
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.button>
            
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative"
              >
                <Bell className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />

      {/* Main Content */}
      <main className="ml-64 pt-16 p-6">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderCurrentPage()}
        </motion.div>
      </main>
    </div>
  );
}