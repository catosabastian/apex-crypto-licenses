
import React, { createContext, useContext, useState, useEffect } from "react";
import { secureDataManager } from "@/utils/secureDataManager";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  sessionInfo: any;
  connectionStatus: 'connected' | 'disconnected' | 'reconnecting';
  loading: boolean;
  error: string | null;
}

const SecureAuthContext = createContext<AuthContextType | undefined>(undefined);

export const SecureAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [sessionInfo, setSessionInfo] = useState<any>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'reconnecting'>('connected');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check existing session
        const session = secureDataManager.getCurrentSession();
        if (session && session.isActive) {
          setIsAuthenticated(true);
          setSessionInfo(session);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError('Failed to initialize authentication');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for session events
    const handleSessionExpired = () => {
      setIsAuthenticated(false);
      setSessionInfo(null);
      setError('Session expired');
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

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      const success = secureDataManager.createSession({ username, password });
      if (success) {
        const session = secureDataManager.getCurrentSession();
        setIsAuthenticated(true);
        setSessionInfo(session);
        return true;
      }
      
      setError('Invalid credentials');
      return false;
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      secureDataManager.endSession();
      setIsAuthenticated(false);
      setSessionInfo(null);
      setError(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <SecureAuthContext.Provider value={{ 
      isAuthenticated, 
      login, 
      logout, 
      sessionInfo,
      connectionStatus,
      loading,
      error
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
