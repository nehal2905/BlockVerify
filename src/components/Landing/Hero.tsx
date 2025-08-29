import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, Play, Sparkles, Zap, Star } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  const [easterEggCount, setEasterEggCount] = React.useState(0);
  const [showSecret, setShowSecret] = React.useState(false);

  const handleEasterEgg = () => {
    setEasterEggCount(prev => prev + 1);
    if (easterEggCount >= 4) {
      setShowSecret(true);
      setTimeout(() => setShowSecret(false), 3000);
      setEasterEggCount(0);
    }
  };

  return (
    <motion.nav
      className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Hidden Interactive Elements */}
      <motion.div
        className="absolute top-20 left-10 w-8 h-8 cursor-pointer"
        whileHover={{ scale: 1.2, rotate: 180 }}
        onClick={handleEasterEgg}
      >
        <Sparkles className="w-full h-full text-blue-400/50 hover:text-blue-600" />
      </motion.div>

      <motion.div
        className="absolute top-32 right-20 w-6 h-6 cursor-pointer"
        whileHover={{ scale: 1.3, y: -5 }}
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        onClick={() => {
          const colors = ['text-purple-500', 'text-pink-500', 'text-green-500', 'text-yellow-500'];
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          document.querySelector('.zap-icon')?.setAttribute('class', `w-full h-full ${randomColor}`);
        }}
      >
        <Zap className="zap-icon w-full h-full text-yellow-400/60 hover:text-yellow-500" />
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-16 w-5 h-5 cursor-pointer"
        whileHover={{ scale: 1.4, rotate: 360 }}
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 3, repeat: Infinity }}
        onClick={() => {
          // Create a ripple effect
          const ripple = document.createElement('div');
          ripple.className = 'absolute w-20 h-20 bg-blue-400/20 rounded-full animate-ping';
          ripple.style.left = '50%';
          ripple.style.top = '50%';
          ripple.style.transform = 'translate(-50%, -50%)';
          document.querySelector('.star-container')?.appendChild(ripple);
          setTimeout(() => ripple.remove(), 1000);
        }}
      >
        <div className="star-container relative">
          <Star className="w-full h-full text-purple-400/60 hover:text-purple-500" />
        </div>
      </motion.div>

      {/* Secret Message */}
      {showSecret && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: -50 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl shadow-2xl z-50"
        >
          <div className="text-center">
            <Sparkles className="w-8 h-8 mx-auto mb-2" />
            <p className="font-bold text-lg">🎉 You found the secret!</p>
            <p className="text-sm opacity-90">You're a true explorer!</p>
          </div>
        </motion.div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Trust Every{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Document
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Secure, transparent, and tamper-proof document verification powered by blockchain technology.
              Verify credentials, certificates, and official documents with absolute confidence.
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onGetStarted}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Hidden feature: Demo mode
                  alert('🚀 Demo mode activated! This would show a live demo of document verification.');
                }}
                className="group px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-xl font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Play className="h-5 w-5" />
                <span>Watch Demo</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Verification Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-2xl p-8">
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                  <span className="text-sm font-semibold text-green-600">
                    VERIFIED DOCUMENT
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  University Diploma
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Bachelor of Computer Science
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Hash: 0x7f8a9b...
                  </span>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-3 h-3 bg-green-500 rounded-full"
                  />
                </div>
              </motion.div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                whileHover={{ scale: 1.2, rotate: 90 }}
                onClick={() => {
                  alert('🔮 You discovered a floating element! These represent blockchain nodes securing your documents.');
                }}
                className="cursor-pointer"
                className="absolute top-4 right-4 w-12 h-12 bg-blue-500/20 rounded-full"
              />
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity }}
                whileHover={{ scale: 1.3, rotate: -90 }}
                onClick={() => {
                  alert('⚡ Another hidden element! Click around to find more surprises.');
                }}
                className="cursor-pointer"
                className="absolute bottom-4 left-4 w-8 h-8 bg-cyan-500/20 rounded-full"
              />
            </div>

            {/* Hidden Floating Action Button */}
            <motion.div
              className="absolute -bottom-4 right-4 lg:right-0"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, type: "spring" }}
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                animate={{ 
                  y: [-5, 5, -5],
                  boxShadow: [
                    '0 0 20px rgba(59, 130, 246, 0.3)',
                    '0 0 30px rgba(59, 130, 246, 0.5)',
                    '0 0 20px rgba(59, 130, 246, 0.3)'
                  ]
                }}
                transition={{ 
                  y: { duration: 2, repeat: Infinity },
                  boxShadow: { duration: 2, repeat: Infinity }
                }}
                onClick={() => {
                  // Hidden feature: Quick stats
                  const stats = ['🔒 99.9% Security Rate', '⚡ 2.3s Average Verification', '🌍 150+ Countries Served'];
                  const randomStat = stats[Math.floor(Math.random() * stats.length)];
                  alert(`💡 Quick Stat: ${randomStat}`);
                }}
                className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg"
              >
                <Shield className="w-6 h-6" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}

                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  // Hidden feature: Document preview
                  alert('📄 This would open a detailed document preview with blockchain verification details!');
                }}
                className="cursor-pointer"