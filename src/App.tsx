import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LandingPage } from './pages/LandingPage';
import { AuthForm } from './components/Auth/AuthForm';
import { DashboardPage } from './pages/DashboardPage';

function AppContent() {
  const [showAuth, setShowAuth] = useState(false);
  const { user, loading } = useAuth();

  // Show a loading screen while authentication status is loading (if applicable)
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render Dashboard if authenticated
  if (user) {
    return <DashboardPage />;
  }

  // Render Auth form if triggered
  if (showAuth) {
    return <AuthForm onBack={() => setShowAuth(false)} />;
  }

  // Default: Render Landing Page
  return <LandingPage onGetStarted={() => setShowAuth(true)} />;
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
