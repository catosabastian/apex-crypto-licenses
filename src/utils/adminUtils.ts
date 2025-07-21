import { supabase } from '@/integrations/supabase/client';

// Admin utility functions to prevent token drainage and manage admin operations

export interface AdminUser {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

export interface AuditLogEntry {
  id: string;
  user_id: string;
  action: string;
  table_name: string;
  record_id?: string;
  old_data?: any;
  new_data?: any;
  created_at: string;
}

class AdminUtils {
  private adminRoleCache = new Map<string, { isAdmin: boolean; expires: number }>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  private requestCounter = 0;
  private lastRequestTime = 0;
  private readonly RATE_LIMIT_MS = 1000; // 1 second between requests

  // Rate limiting to prevent token drainage
  private async rateLimit(): Promise<void> {
    const now = Date.now();
    if (now - this.lastRequestTime < this.RATE_LIMIT_MS) {
      await new Promise(resolve => setTimeout(resolve, this.RATE_LIMIT_MS));
    }
    this.lastRequestTime = Date.now();
    this.requestCounter++;
  }

  // Cached admin role check
  async isUserAdmin(userId: string): Promise<boolean> {
    if (!userId) return false;

    // Check cache first
    const cached = this.adminRoleCache.get(userId);
    if (cached && cached.expires > Date.now()) {
      return cached.isAdmin;
    }

    await this.rateLimit();

    try {
      // Use the secure RPC function
      const { data, error } = await supabase.rpc('is_admin');
      
      if (error) {
        console.error('Admin check failed:', error);
        return false;
      }

      const isAdmin = data === true;
      
      // Cache the result
      this.adminRoleCache.set(userId, {
        isAdmin,
        expires: Date.now() + this.CACHE_DURATION
      });

      return isAdmin;
    } catch (error) {
      console.error('Admin role check error:', error);
      return false;
    }
  }

  // Create admin user safely
  async createAdminUser(email: string): Promise<{ success: boolean; message: string }> {
    await this.rateLimit();

    try {
      const { data, error } = await supabase.rpc('create_admin_user', { _email: email });
      
      if (error) {
        return { success: false, message: error.message };
      }

      // Clear cache for this user
      const { data: userData } = await supabase.auth.admin.getUserByEmail(email);
      if (userData.user) {
        this.adminRoleCache.delete(userData.user.id);
      }

      return { success: true, message: data };
    } catch (error) {
      console.error('Error creating admin user:', error);
      return { success: false, message: 'Failed to create admin user' };
    }
  }

  // Get all admin users
  async getAdminUsers(): Promise<AdminUser[]> {
    await this.rateLimit();

    try {
      // Use RPC to get admin users safely
      const { data, error } = await supabase.rpc('get_admin_users');

      if (error) {
        console.error('Error fetching admin users:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching admin users:', error);
      return [];
    }
  }

  // Log admin action for audit trail
  async logAdminAction(
    action: string,
    tableName: string,
    recordId?: string,
    oldData?: any,
    newData?: any
  ): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Use RPC for audit logging to avoid type issues
      await supabase.rpc('log_admin_action', {
        action_type: action,
        table_name: tableName,
        record_id: recordId,
        old_data: oldData,
        new_data: newData
      });
    } catch (error) {
      console.error('Error logging admin action:', error);
    }
  }

  // Get audit logs
  async getAuditLogs(limit = 100): Promise<AuditLogEntry[]> {
    await this.rateLimit();

    try {
      // Use RPC to get audit logs to avoid type issues
      const { data, error } = await supabase.rpc('get_audit_logs', { log_limit: limit });

      if (error) {
        console.error('Error fetching audit logs:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      return [];
    }
  }

  // Clear cache
  clearCache(): void {
    this.adminRoleCache.clear();
  }

  // Get usage statistics
  getUsageStats() {
    return {
      totalRequests: this.requestCounter,
      cacheSize: this.adminRoleCache.size,
      lastRequestTime: this.lastRequestTime
    };
  }
}

export const adminUtils = new AdminUtils();