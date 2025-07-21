import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabaseDataManager } from "@/utils/supabaseDataManager";

interface AdminAuthContextType {
  isAdminAuthenticated: boolean;
  isCheckingAdminRole: boolean;
  adminError: string | null;
  checkAdminRole: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isCheckingAdminRole, setIsCheckingAdminRole] = useState(true);
  const [adminError, setAdminError] = useState<string | null>(null);

  const checkAdminRole = async () => {
    if (!isAuthenticated) {
      setIsAdminAuthenticated(false);
      setIsCheckingAdminRole(false);
      return;
    }

    try {
      setIsCheckingAdminRole(true);
      setAdminError(null);
      
      const hasAdminRole = await supabaseDataManager.checkAdminRole();
      setIsAdminAuthenticated(hasAdminRole);
      
      if (!hasAdminRole) {
        setAdminError('Access denied. Admin privileges required.');
      }
    } catch (error) {
      console.error('Error checking admin role:', error);
      setAdminError('Failed to verify admin privileges');
      setIsAdminAuthenticated(false);
    } finally {
      setIsCheckingAdminRole(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      checkAdminRole();
    } else {
      setIsAdminAuthenticated(false);
      setIsCheckingAdminRole(false);
      setAdminError(null);
    }
  }, [isAuthenticated]);

  return (
    <AdminAuthContext.Provider value={{ 
      isAdminAuthenticated, 
      isCheckingAdminRole, 
      adminError,
      checkAdminRole
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};