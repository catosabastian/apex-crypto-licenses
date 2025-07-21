import { reinitializeSupabase } from '@/integrations/supabase/client';
import { supabaseDataManager } from './supabaseDataManager';

export class SupabaseConnectionManager {
  private static instance: SupabaseConnectionManager;
  
  static getInstance(): SupabaseConnectionManager {
    if (!SupabaseConnectionManager.instance) {
      SupabaseConnectionManager.instance = new SupabaseConnectionManager();
    }
    return SupabaseConnectionManager.instance;
  }

  // Check if custom Supabase credentials are configured
  isCustomSupabaseConfigured(): boolean {
    const url = localStorage.getItem('supabase_url');
    const key = localStorage.getItem('supabase_key');
    return !!(url && key);
  }

  // Get current Supabase configuration
  getCurrentConfig(): { url: string | null; key: string | null } {
    return {
      url: localStorage.getItem('supabase_url'),
      key: localStorage.getItem('supabase_key')
    };
  }

  // Update Supabase configuration
  updateConfig(url: string, key: string): void {
    localStorage.setItem('supabase_url', url);
    localStorage.setItem('supabase_key', key);
    
    // Reinitialize the Supabase client
    reinitializeSupabase();
    
    // Reinitialize the data manager
    if (supabaseDataManager) {
      // Force reload all data with new credentials
      (supabaseDataManager as any).loadInitialData();
    }
  }

  // Clear custom configuration and return to defaults
  clearConfig(): void {
    localStorage.removeItem('supabase_url');
    localStorage.removeItem('supabase_key');
    
    // Reinitialize with default credentials
    reinitializeSupabase();
    
    // Reinitialize the data manager
    if (supabaseDataManager) {
      (supabaseDataManager as any).loadInitialData();
    }
  }

  // Check if database is properly set up
  async testDatabaseConnection(): Promise<{ success: boolean; error?: string }> {
    try {
      const applications = await supabaseDataManager.getApplications();
      const settings = await supabaseDataManager.getSettings();
      
      return { 
        success: true,
        error: undefined
      };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.message || 'Database connection failed'
      };
    }
  }
}

export const connectionManager = SupabaseConnectionManager.getInstance();