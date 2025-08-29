import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AuthFormProps {
  onBack: () => void;
}

export function AuthForm({ onBack }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'user'
  });
  const { login, signup, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(formData.email, formData.password, formData.role);
      } else {
        await signup(formData.email, formData.password, formData.name, formData.role);
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  const roles = [
    { value: 'user', label: 'Document Owner', desc: 'Upload and manage your documents' },
    { value: 'verifier', label: 'Document Verifier', desc: 'Verify and approve documents' },
    { value: 'admin', label: 'System Administrator', desc: 'Full system access and management' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Background animation */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">BlockVerify</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Join BlockVerify'}
            </h2>
            <p className="text-blue-200">
              {isLogin ? 'Sign in to your account' : 'Create your secure account'}
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                        placeholder="Enter your name"
                        required={!isLogin}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-2">
                      Role
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {roles.map((role) => (
                        <label key={role.value} className="relative">
                          <input
                            type="radio"
                            name="role"
                            value={role.value}
                            checked={formData.role === role.value}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="sr-only"
                          />
                          <div className={`p-3 rounded-lg border cursor-pointer transition-all ${
                            formData.role === role.value
                              ? 'bg-blue-600/30 border-blue-400 text-white'
                              : 'bg-white/10 border-white/20 text-blue-200 hover:bg-white/20'
                          }`}>
                            <div className="font-medium text-sm">{role.label}</div>
                            <div className="text-xs opacity-80">{role.desc}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-200 hover:text-white transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={onBack}
              className="text-blue-300 hover:text-white transition-colors text-sm"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}