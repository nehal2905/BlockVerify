function AppContent() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'auth' | 'dashboard'>('landing');

  if (currentPage === 'dashboard') {
    return <DashboardPage />;
  }

  if (currentPage === 'auth') {
    return <AuthForm 
             onBack={() => setCurrentPage('landing')} 
             onLogin={() => setCurrentPage('dashboard')} 
           />;
  }

  // Default: Landing Page
  return <LandingPage onGetStarted={() => setCurrentPage('auth')} />;
}
