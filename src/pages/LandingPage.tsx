import React from 'react';
import { Navbar } from '../components/Layout/Navbar';
import { Hero } from '../components/Landing/Hero';
import { Features } from '../components/Landing/Features';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar onGetStarted={onGetStarted} />
      <Hero onGetStarted={onGetStarted} />
      <Features />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 BlockVerify. Securing documents with blockchain technology.
          </p>
        </div>
      </footer>
    </div>
  );
}