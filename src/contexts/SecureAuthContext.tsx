
import React, { createContext, useContext, useState, useEffect } from "react";
import { secureDataManager } from "@/utils/secureDataManager";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  sessionInfo: any;
  connectionStatus: 'connected' | 'disconnected' | 'reconnecting';
}

const SecureAuthContext = createContext<AuthContextType | undefined>(undefined);

export const SecureAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [sessionInfo, setSessionInfo] = useState<any>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'reconnecting'>('connected');

  useEffect(() => {
    // Check existing session
    const session = secureDataManager.getCurrentSession();
    if (session && session.isActive) {
      setIsAuthenticated(true);
      setSessionInfo(session);
    }

    // Listen for session events
    const handleSessionExpired = () => {
      setIsAuthenticated(false);
      setSessionInfo(null);
    };

    const handleSessionEnded = () => {
      setIsAuthenticated(false);
      setSessionInfo(null);
    };

    secureDataManager.addEventListener('session_expired', handleSessionExpired);
    secureDataManager.addEventListener('session_ended', handleSessionEnded);

    // Monitor connection status
    const checkConnection = () => {
      try {
        // Simple connection test
        localStorage.setItem('connection_test', Date.now().toString());
        setConnectionStatus('connected');
      } catch (error) {
        setConnectionStatus('disconnected');
      }
    };

    const connectionInterval = setInterval(checkConnection, 30000);
    
    return () => {
      secureDataManager.removeEventListener('session_expired', handleSessionExpired);
      secureDataManager.removeEventListener('session_ended', handleSessionEnded);
      clearInterval(connectionInterval);
    };
  }, []);

  const login = (username: string, password: string): boolean => {
    const success = secureDataManager.createSession({ username, password });
    if (success) {
      const session = secureDataManager.getCurrentSession();
      setIsAuthenticated(true);
      setSessionInfo(session);
    }
    return success;
  };

  const logout = () => {
    secureDataManager.endSession();
    setIsAuthenticated(false);
    setSessionInfo(null);
  };

  return (
    <SecureAuthContext.Provider value={{ 
      isAuthenticated, 
      login, 
      logout, 
      sessionInfo,
      connectionStatus 
    }}>
      {children}
    </SecureAuthContext.Provider>
  );
};

export const useSecureAuth = (): AuthContextType => {
  const context = useContext(SecureAuthContext);
  if (context === undefined) {
    throw new Error("useSecureAuth must be used within a SecureAuthProvider");
  }
  return context;
};
