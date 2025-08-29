import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LandingPage } from './pages/LandingPage';
import { AuthForm } from './components/Auth/AuthForm';
import { DashboardPage } from './pages/DashboardPage';

function AppContent() {
  const [showAuth, setShowAuth] = useState(false);
  const { user } = useAuth();

  if (user) {
    return <DashboardPage />;
  }

  if (showAuth) {
    return <AuthForm onBack={() => setShowAuth(false)} />;
  }

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