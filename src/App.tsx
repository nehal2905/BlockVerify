import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LandingPage } from './pages/LandingPage';
import { AuthForm } from './components/Auth/AuthForm';
import { DashboardPage } from './pages/DashboardPage';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'auth' | 'dashboard'>('landing');
  const { user } = useAuth();

  // If user is logged in, always go to dashboard
  if (user) {
    return <DashboardPage />;
  }

  if (currentPage === 'auth') {
    return <AuthForm onBack={() => setCurrentPage('landing')} />;
  }

  // Default: show landing page
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
