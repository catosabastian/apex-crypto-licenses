import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

interface AdminAuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  checkAdminRole: () => Promise<boolean>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkAdminRole = async (): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Use the secure function we created in the database
      const { data, error } = await (supabase as any)
        .rpc('is_admin');

      if (error) {
        console.log('Error checking admin role with RPC:', error);
        // Fallback to direct query if RPC fails
        const { data: roleData, error: roleError } = await (supabase as any)
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .maybeSingle();

        if (roleError) {
          console.error('Fallback admin role check failed:', roleError);
          return false;
        }

        return !!roleData;
      }

      return data === true;
    } catch (error) {
      console.error('Error checking admin role:', error);
      return false;
    }
  };

  useEffect(() => {
    let isUnmounted = false;
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (isUnmounted) return;
        
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer admin role check to prevent auth loops
          setTimeout(async () => {
            if (isUnmounted) return;
            try {
              const adminStatus = await checkAdminRole();
              if (!isUnmounted) {
                setIsAdmin(adminStatus);
                setIsLoading(false);
              }
            } catch (error) {
              console.error('Admin role check error:', error);
              if (!isUnmounted) {
                setIsAdmin(false);
                setIsLoading(false);
              }
            }
          }, 100);
        } else {
          setIsAdmin(false);
          setIsLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (isUnmounted) return;
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(async () => {
          if (isUnmounted) return;
          try {
            const adminStatus = await checkAdminRole();
            if (!isUnmounted) {
              setIsAdmin(adminStatus);
              setIsLoading(false);
            }
          } catch (error) {
            console.error('Initial admin role check error:', error);
            if (!isUnmounted) {
              setIsAdmin(false);
              setIsLoading(false);
            }
          }
        }, 100);
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      isUnmounted = true;
      subscription.unsubscribe();
    };
  }, []);

  // Cache admin role to prevent repeated checks
  const [adminRoleCache, setAdminRoleCache] = useState<{ [userId: string]: boolean }>({});
  
  // Update checkAdminRole to use cache
  const checkAdminRoleWithCache = async (): Promise<boolean> => {
    if (!user) return false;
    
    // Check cache first
    if (adminRoleCache[user.id] !== undefined) {
      return adminRoleCache[user.id];
    }
    
    const isAdminUser = await checkAdminRole();
    setAdminRoleCache(prev => ({ ...prev, [user.id]: isAdminUser }));
    return isAdminUser;
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setIsAdmin(false);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    session,
    isAuthenticated: !!user,
    isAdmin,
    isLoading,
    signIn,
    signUp,
    signOut,
    checkAdminRole,
  };

  return (
    <AdminAuthContext.Provider value={value}>
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