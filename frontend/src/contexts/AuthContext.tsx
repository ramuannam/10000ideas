import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/authService';

interface AuthContextType {
  isUserSignedIn: boolean;
  userData: any;
  login: (userData: any) => void;
  logout: () => void;
  openAuthModal: (mode: 'signin' | 'signup') => void;
  closeAuthModal: () => void;
  isAuthModalOpen: boolean;
  authModalMode: 'signin' | 'signup';
  setAuthModalMode: (mode: 'signin' | 'signup') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  // Check if user is already authenticated on component mount
  useEffect(() => {
    const token = authService.getToken();
    if (token) {
      setIsUserSignedIn(true);
      // You can also fetch user data here if needed
    }
  }, []);

  const login = (userData: any) => {
    setIsUserSignedIn(true);
    setUserData(userData);
  };

  const logout = () => {
    authService.logout();
    setIsUserSignedIn(false);
    setUserData(null);
  };

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const value: AuthContextType = {
    isUserSignedIn,
    userData,
    login,
    logout,
    openAuthModal,
    closeAuthModal,
    isAuthModalOpen,
    authModalMode,
    setAuthModalMode
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
