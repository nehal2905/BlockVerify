import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthService } from '../services/authService';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize auth state
    AuthService.getCurrentUser().then(setUser).finally(() => setIsLoading(false));

    // Listen for auth changes
    const { data: { subscription } } = AuthService.onAuthStateChange(setUser);

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string, role: string) => {
    setIsLoading(true);
    try {
      await AuthService.signIn(email, password);
      // User state will be updated via onAuthStateChange
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, role: string) => {
    setIsLoading(true);
    try {
      await AuthService.signUp(email, password, name, role);
      // User state will be updated via onAuthStateChange
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    AuthService.signOut();
    // User state will be updated via onAuthStateChange
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}