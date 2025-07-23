
import { reinitializeSupabase } from '@/integrations/supabase/client';
import { supabaseDataManager } from './supabaseDataManager';

export class SupabaseConnectionManager {
  private static instance: SupabaseConnectionManager;
  private retryCount = 0;
  private maxRetries = 3;
  
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
    this.reinitializeDataManager();
  }

  // Clear custom configuration and return to defaults
  clearConfig(): void {
    localStorage.removeItem('supabase_url');
    localStorage.removeItem('supabase_key');
    
    // Reinitialize with default credentials
    reinitializeSupabase();
    
    // Reinitialize the data manager
    this.reinitializeDataManager();
  }

  private reinitializeDataManager(): void {
    try {
      if (supabaseDataManager) {
        // Force reload all data with new credentials
        (supabaseDataManager as any).loadInitialData();
      }
    } catch (error) {
      console.error('Error reinitializing data manager:', error);
    }
  }

  // Check if database is properly set up with retry mechanism
  async testDatabaseConnection(): Promise<{ success: boolean; error?: string }> {
    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        const applications = await supabaseDataManager.getApplications();
        const settings = await supabaseDataManager.getSettings();
        
        this.retryCount = 0; // Reset on success
        return { 
          success: true,
          error: undefined
        };
      } catch (error: any) {
        this.retryCount++;
        console.error(`Database connection attempt ${attempt + 1} failed:`, error);
        
        if (attempt === this.maxRetries - 1) {
          return { 
            success: false, 
            error: `Database connection failed after ${this.maxRetries} attempts: ${error.message || 'Unknown error'}`
          };
        }
        
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
    
    return { success: false, error: 'Maximum retry attempts reached' };
  }

  // Test connection with timeout
  async testConnectionWithTimeout(timeoutMs: number = 10000): Promise<{ success: boolean; error?: string }> {
    try {
      const connectionPromise = this.testDatabaseConnection();
      const timeoutPromise = new Promise<{ success: boolean; error: string }>((_, reject) => 
        setTimeout(() => reject({ success: false, error: 'Connection timeout' }), timeoutMs)
      );
      
      return await Promise.race([connectionPromise, timeoutPromise]);
    } catch (error: any) {
      return {
        success: false,
        error: error.error || 'Connection test failed'
      };
    }
  }

  // Get connection status
  getConnectionStatus(): { connected: boolean; lastTest: Date | null; retryCount: number } {
    return {
      connected: this.retryCount === 0,
      lastTest: new Date(),
      retryCount: this.retryCount
    };
  }

  // Reset connection state
  resetConnection(): void {
    this.retryCount = 0;
    this.reinitializeDataManager();
  }
}

export const connectionManager = SupabaseConnectionManager.getInstance();
