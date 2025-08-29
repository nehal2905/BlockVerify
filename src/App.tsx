import React, { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LandingPage } from './pages/LandingPage';
import { AuthForm } from './components/Auth/AuthForm';
import { DashboardPage } from './pages/DashboardPage';
import { useAuth } from './contexts/AuthContext';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'auth' | 'dashboard'>('landing');
  const { user } = useAuth();

  // Redirect to dashboard when user logs in
  useEffect(() => {
    if (user && currentPage === 'auth') {
      setCurrentPage('dashboard');
    }
  }, [user, currentPage]);

  // Redirect to landing page when user logs out
  useEffect(() => {
    if (!user && currentPage === 'dashboard') {
      setCurrentPage('landing');
    }
  }, [user, currentPage]);

  if (currentPage === 'dashboard') {
    return <DashboardPage />;
  }

  if (currentPage === 'auth') {
    return <AuthForm onBack={() => setCurrentPage('landing')} />;
  }

  // Default: Landing Page
  return <LandingPage onGetStarted={() => setCurrentPage('auth')} />;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
