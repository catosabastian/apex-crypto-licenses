import { supabase } from '@/integrations/supabase/client';
import { BehaviorSubject } from 'rxjs';

// Types for database operations
export interface Application {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  category: string;
  notes?: string;
  status: 'pending' | 'approved' | 'rejected' | 'processing';
  amount?: string;
  payment_method?: string;
  transaction_id?: string;
  documents?: any[];
  created_at: string;
  updated_at: string;
}

export interface License {
  id: string;
  license_id: string;
  holder_name: string;
  license_type: string;
  issue_date: string;
  expiry_date: string;
  status: 'active' | 'expired' | 'suspended' | 'revoked';
  platforms?: string;
  application_id?: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentAddress {
  id: string;
  cryptocurrency: string;
  address: string;
  is_active: boolean;
  qr_code_data?: string;
  created_at: string;
  updated_at: string;
}

export interface Setting {
  id: string;
  key: string;
  value: any;
  category: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: 'unread' | 'read' | 'responded' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface ContentItem {
  id: string;
  section: string;
  key: string;
  value: any;
  created_at: string;
  updated_at: string;
}

class SupabaseDataManager {
  private eventListeners: { [key: string]: Function[] } = {};
  private dataSubjects = {
    applications: new BehaviorSubject<Application[]>([]),
    licenses: new BehaviorSubject<License[]>([]),
    paymentAddresses: new BehaviorSubject<PaymentAddress[]>([]),
    settings: new BehaviorSubject<Setting[]>([]),
    contacts: new BehaviorSubject<Contact[]>([]),
    content: new BehaviorSubject<ContentItem[]>([])
  };
  private isInitialized = false;
  private initializationPromise: Promise<void> | null = null;

  constructor() {
    this.initializationPromise = this.initialize();
  }

  private async initialize() {
    try {
      console.log('[SupabaseDataManager] Starting initialization...');
      
      // Check if user is authenticated before initializing
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        console.log('[SupabaseDataManager] No session found, skipping admin data initialization');
        this.isInitialized = true;
        return;
      }

      // Check if user has admin role before loading sensitive data
      try {
        const { data: isAdmin, error } = await supabase.rpc('is_admin');
        if (error || !isAdmin) {
          console.log('[SupabaseDataManager] User is not admin, loading public data only');
          await this.loadPublicData();
        } else {
          console.log('[SupabaseDataManager] Admin user detected, loading all data');
          this.initializeRealtimeSubscriptions();
          await this.loadInitialData();
        }
      } catch (rpcError) {
        console.log('[SupabaseDataManager] RPC call failed, loading public data only');
        await this.loadPublicData();
      }
      
      this.isInitialized = true;
      console.log('[SupabaseDataManager] Initialization complete');
    } catch (error) {
      console.error('[SupabaseDataManager] Initialization failed:', error);
      // Continue with limited functionality
      this.isInitialized = true;
    }
  }

  private async ensureInitialized() {
    if (!this.isInitialized && this.initializationPromise) {
      await this.initializationPromise;
    }
  }

  private initializeRealtimeSubscriptions() {
    // Subscribe to real-time changes for all tables
    const tables = ['applications', 'licenses', 'payment_addresses', 'settings', 'contacts', 'content'];
    
    tables.forEach(table => {
      supabase
        .channel(`${table}-changes`)
        .on('postgres_changes', { event: '*', schema: 'public', table }, (payload) => {
          console.log(`[SupabaseDataManager] Real-time update for ${table}:`, payload);
          this.loadTableData(table);
        })
        .subscribe();
    });
  }

  private async loadInitialData() {
    try {
      console.log('[SupabaseDataManager] Loading initial data...');
      await Promise.all([
        this.loadTableData('applications'),
        this.loadTableData('licenses'),
        this.loadTableData('payment_addresses'),
        this.loadTableData('settings'),
        this.loadTableData('contacts'),
        this.loadTableData('content')
      ]);
      console.log('[SupabaseDataManager] Initial data loaded successfully');
    } catch (error) {
      console.error('[SupabaseDataManager] Error loading initial data:', error);
      // Continue with limited functionality instead of throwing
      console.log('[SupabaseDataManager] Continuing with limited functionality');
    }
  }

  private async loadPublicData() {
    try {
      console.log('[SupabaseDataManager] Loading public data only...');
      await Promise.all([
        this.loadTableData('payment_addresses'),
        this.loadTableData('settings'),
        this.loadTableData('content')
      ]);
      console.log('[SupabaseDataManager] Public data loaded successfully');
    } catch (error) {
      console.error('[SupabaseDataManager] Error loading public data:', error);
      console.log('[SupabaseDataManager] Continuing with empty data');
    }
  }

  private async loadTableData(table: string) {
    try {
      console.log(`[SupabaseDataManager] Loading ${table} data...`);
      const { data, error } = await (supabase as any)
        .from(table)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error(`[SupabaseDataManager] Error loading ${table}:`, error);
        throw error;
      }

      const subjectKey = table === 'payment_addresses' ? 'paymentAddresses' : table as keyof typeof this.dataSubjects;
      this.dataSubjects[subjectKey].next(data || []);
      this.notifyListeners(`${table}_updated`, data);
      console.log(`[SupabaseDataManager] ${table} data loaded:`, data?.length || 0, 'records');
    } catch (error) {
      console.error(`Error loading ${table}:`, error);
      throw error;
    }
  }

  // Applications
  async createApplication(application: Omit<Application, 'id' | 'created_at' | 'updated_at'>): Promise<Application | null> {
    try {
      const { data, error } = await (supabase as any)
        .from('applications')
        .insert([application])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating application:', error);
      return null;
    }
  }

  async getApplications(): Promise<Application[]> {
    await this.ensureInitialized();
    return this.dataSubjects.applications.value;
  }

  async updateApplication(id: string, updates: Partial<Application>): Promise<Application | null> {
    try {
      const { data, error } = await (supabase as any)
        .from('applications')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating application:', error);
      return null;
    }
  }

  async deleteApplication(id: string): Promise<boolean> {
    try {
      const { error } = await (supabase as any)
        .from('applications')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting application:', error);
      return false;
    }
  }

  // Enhanced Licenses methods with proper error handling
  async createLicense(license: Omit<License, 'id' | 'created_at' | 'updated_at'>): Promise<License | null> {
    try {
      console.log('[SupabaseDataManager] Creating license:', license);
      const { data, error } = await (supabase as any)
        .from('licenses')
        .insert([license])
        .select()
        .single();

      if (error) {
        console.error('[SupabaseDataManager] Error creating license:', error);
        throw error;
      }
      
      console.log('[SupabaseDataManager] License created successfully:', data);
      await this.loadTableData('licenses');
      return data;
    } catch (error) {
      console.error('Error creating license:', error);
      return null;
    }
  }

  async getLicenses(): Promise<License[]> {
    await this.ensureInitialized();
    return this.dataSubjects.licenses.value;
  }

  async updateLicense(id: string, updates: Partial<License>): Promise<License | null> {
    try {
      console.log('[SupabaseDataManager] Updating license:', id, updates);
      const { data, error } = await (supabase as any)
        .from('licenses')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('[SupabaseDataManager] Error updating license:', error);
        throw error;
      }
      
      console.log('[SupabaseDataManager] License updated successfully:', data);
      await this.loadTableData('licenses');
      this.notifyListeners('licenses_updated', data);
      return data;
    } catch (error) {
      console.error('Error updating license:', error);
      return null;
    }
  }

  async deleteLicense(id: string): Promise<boolean> {
    try {
      console.log('[SupabaseDataManager] Deleting license:', id);
      const { error } = await (supabase as any)
        .from('licenses')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('[SupabaseDataManager] Error deleting license:', error);
        throw error;
      }
      
      console.log('[SupabaseDataManager] License deleted successfully');
      await this.loadTableData('licenses');
      this.notifyListeners('licenses_updated', null);
      return true;
    } catch (error) {
      console.error('Error deleting license:', error);
      return false;
    }
  }

  async verifyLicense(licenseId: string): Promise<License | null> {
    try {
      console.log('[SupabaseDataManager] Verifying license:', licenseId);
      const { data, error } = await (supabase as any)
        .from('licenses')
        .select('*')
        .eq('license_id', licenseId)
        .eq('status', 'active')
        .single();

      if (error) {
        console.error('[SupabaseDataManager] Error verifying license:', error);
        return null;
      }
      
      console.log('[SupabaseDataManager] License verified:', data);
      return data;
    } catch (error) {
      console.error('Error verifying license:', error);
      return null;
    }
  }

  // Payment Addresses
  async getPaymentAddresses(): Promise<PaymentAddress[]> {
    await this.ensureInitialized();
    return this.dataSubjects.paymentAddresses.value;
  }

  async updatePaymentAddress(cryptocurrency: string, updates: Partial<PaymentAddress>): Promise<PaymentAddress | null> {
    try {
      const { data, error } = await (supabase as any)
        .from('payment_addresses')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('cryptocurrency', cryptocurrency)
        .select()
        .single();

      if (error) throw error;
      
      await this.loadTableData('payment_addresses');
      this.notifyListeners('payment_addresses_updated', data);
      
      return data;
    } catch (error) {
      console.error('Error updating payment address:', error);
      return null;
    }
  }

  async createPaymentAddress(address: Omit<PaymentAddress, 'id' | 'created_at' | 'updated_at'>): Promise<PaymentAddress | null> {
    try {
      const { data, error } = await (supabase as any)
        .from('payment_addresses')
        .insert([address])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating payment address:', error);
      return null;
    }
  }

  // Settings
  async getSetting(key: string): Promise<any> {
    await this.ensureInitialized();
    const settings = this.dataSubjects.settings.value;
    const setting = settings.find(s => s.key === key);
    return setting?.value;
  }

  async updateSetting(key: string, value: any): Promise<Setting | null> {
    try {
      // Ensure value is properly formatted for JSON storage
      const settingValue = typeof value === 'string' ? value : value;
      
      const { data, error } = await (supabase as any)
        .from('settings')
        .upsert({ 
          key, 
          value: settingValue, 
          category: key.startsWith('category') ? 'pricing' : 'general',
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'key'
        })
        .select()
        .single();

      if (error) {
        console.error('Error updating setting:', error);
        throw error;
      }
      
      // Force reload settings data to ensure consistency
      await this.loadTableData('settings');
      this.notifyListeners('settings_updated', data);
      
      console.log('Setting updated successfully:', { key, value: settingValue, data });
      return data;
    } catch (error) {
      console.error('Error updating setting:', error);
      throw error;
    }
  }

  async getSettings(): Promise<Record<string, any>> {
    await this.ensureInitialized();
    const settings = this.dataSubjects.settings.value;
    const result = settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {} as Record<string, any>);
    console.log('[SupabaseDataManager] getSettings result:', result);
    return result;
  }

  // Content
  async getContent(section?: string): Promise<Record<string, any>> {
    await this.ensureInitialized();
    const content = this.dataSubjects.content.value;
    const filtered = section ? content.filter(c => c.section === section) : content;
    
    if (section === 'process') {
      const processContent = filtered.find(c => c.key === 'steps');
      if (processContent) {
        const steps = Array.isArray(processContent.value) ? processContent.value : [];
        const title = filtered.find(c => c.key === 'title')?.value || 'How to Get Your License';
        const subtitle = filtered.find(c => c.key === 'subtitle')?.value || 'Simple Process';
        const description = filtered.find(c => c.key === 'description')?.value || 'Follow our streamlined process';
        const ctaText = filtered.find(c => c.key === 'cta_text')?.value || 'Start Your Application';
        
        return { title, subtitle, description, steps, ctaText };
      }
    }
    
    return filtered.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {} as Record<string, any>);
  }

  async updateContent(section: string, key: string, value: any): Promise<ContentItem | null> {
    try {
      const { data, error } = await (supabase as any)
        .from('content')
        .upsert({ section, key, value, updated_at: new Date().toISOString() })
        .select()
        .single();

      if (error) throw error;
      await this.loadTableData('content');
      return data;
    } catch (error) {
      console.error('Error updating content:', error);
      return null;
    }
  }

  // Contacts
  async createContact(contact: Omit<Contact, 'id' | 'created_at' | 'updated_at'>): Promise<Contact | null> {
    try {
      const { data, error } = await (supabase as any)
        .from('contacts')
        .insert([contact])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating contact:', error);
      return null;
    }
  }

  async getContacts(): Promise<Contact[]> {
    await this.ensureInitialized();
    return this.dataSubjects.contacts.value;
  }

  async updateContact(id: string, updates: Partial<Contact>): Promise<Contact | null> {
    try {
      const { data, error } = await (supabase as any)
        .from('contacts')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating contact:', error);
      return null;
    }
  }

  async deleteContact(id: string): Promise<boolean> {
    try {
      const { error } = await (supabase as any)
        .from('contacts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting contact:', error);
      return false;
    }
  }

  // Bulk operations
  async bulkUpdateApplications(ids: string[], updates: Partial<Application>): Promise<boolean> {
    try {
      const { error } = await (supabase as any)
        .from('applications')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .in('id', ids);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error bulk updating applications:', error);
      return false;
    }
  }

  async bulkDeleteApplications(ids: string[]): Promise<boolean> {
    try {
      const { error } = await (supabase as any)
        .from('applications')
        .delete()
        .in('id', ids);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error bulk deleting applications:', error);
      return false;
    }
  }

  // Enhanced bulk operations with better error handling
  async bulkUpdateLicenses(ids: string[], updates: Partial<License>): Promise<boolean> {
    try {
      console.log('[SupabaseDataManager] Bulk updating licenses:', ids, updates);
      const { error } = await (supabase as any)
        .from('licenses')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .in('id', ids);

      if (error) {
        console.error('[SupabaseDataManager] Error bulk updating licenses:', error);
        throw error;
      }
      
      console.log('[SupabaseDataManager] Licenses bulk updated successfully');
      await this.loadTableData('licenses');
      this.notifyListeners('licenses_updated', null);
      return true;
    } catch (error) {
      console.error('Error bulk updating licenses:', error);
      return false;
    }
  }

  async bulkDeleteLicenses(ids: string[]): Promise<boolean> {
    try {
      console.log('[SupabaseDataManager] Bulk deleting licenses:', ids);
      const { error } = await (supabase as any)
        .from('licenses')
        .delete()
        .in('id', ids);

      if (error) {
        console.error('[SupabaseDataManager] Error bulk deleting licenses:', error);
        throw error;
      }
      
      console.log('[SupabaseDataManager] Licenses bulk deleted successfully');
      await this.loadTableData('licenses');
      this.notifyListeners('licenses_updated', null);
      return true;
    } catch (error) {
      console.error('Error bulk deleting licenses:', error);
      return false;
    }
  }

  // Event system for component updates
  addEventListener(event: string, listener: Function) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(listener);
    console.log(`[SupabaseDataManager] Event listener added for: ${event}`);
  }

  removeEventListener(event: string, listener: Function) {
    if (this.eventListeners[event]) {
      this.eventListeners[event] = this.eventListeners[event].filter(l => l !== listener);
      console.log(`[SupabaseDataManager] Event listener removed for: ${event}`);
    }
  }

  private notifyListeners(event: string, data: any) {
    if (this.eventListeners[event]) {
      console.log(`[SupabaseDataManager] Notifying ${this.eventListeners[event].length} listeners for: ${event}`);
      this.eventListeners[event].forEach(listener => {
        try {
          listener(data);
        } catch (error) {
          console.error(`[SupabaseDataManager] Error in event listener for ${event}:`, error);
        }
      });
    }
  }

  // Admin role management
  async checkUserRole(userId: string): Promise<string | null> {
    try {
      const { data, error } = await (supabase as any)
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (error) return null;
      return data?.role || null;
    } catch (error) {
      console.error('Error checking user role:', error);
      return null;
    }
  }

  async assignAdminRole(userId: string): Promise<boolean> {
    try {
      const { error } = await (supabase as any)
        .from('user_roles')
        .upsert({
          user_id: userId,
          role: 'admin'
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error assigning admin role:', error);
      return false;
    }
  }

  // Enhanced analytics with better data handling
  async getAnalytics() {
    await this.ensureInitialized();
    const applications = this.dataSubjects.applications.value;
    const licenses = this.dataSubjects.licenses.value;
    const contacts = this.dataSubjects.contacts.value;

    const totalRevenue = applications
      .filter(a => a.status === 'approved' && a.amount)
      .reduce((sum, a) => {
        const amount = parseFloat(a.amount?.replace(/[^0-9.]/g, '') || '0');
        return sum + amount;
      }, 0);

    return {
      totalApplications: applications.length,
      pendingApplications: applications.filter(a => a.status === 'pending').length,
      approvedApplications: applications.filter(a => a.status === 'approved').length,
      activeLicenses: licenses.filter(l => l.status === 'active').length,
      newContacts: contacts.filter(c => c.status === 'unread').length,
      totalRevenue
    };
  }

  // Export data
  async exportAllData() {
    await this.ensureInitialized();
    return {
      applications: this.dataSubjects.applications.value,
      licenses: this.dataSubjects.licenses.value,
      contacts: this.dataSubjects.contacts.value,
      paymentAddresses: this.dataSubjects.paymentAddresses.value,
      settings: this.dataSubjects.settings.value,
      content: this.dataSubjects.content.value,
      exportedAt: new Date().toISOString()
    };
  }

  // Add system health check
  async checkSystemHealth(): Promise<{ status: 'healthy' | 'degraded' | 'unhealthy', issues: string[] }> {
    const issues: string[] = [];
    
    try {
      // Test database connection
      const { error: dbError } = await supabase.from('settings').select('count').limit(1);
      if (dbError) {
        issues.push('Database connection issue');
      }
      
      // Test real-time subscriptions
      if (!this.isInitialized) {
        issues.push('Real-time subscriptions not initialized');
      }
      
      // Check data freshness
      const settings = this.dataSubjects.settings.value;
      if (settings.length === 0) {
        issues.push('No settings data loaded');
      }
      
      const status = issues.length === 0 ? 'healthy' : issues.length < 3 ? 'degraded' : 'unhealthy';
      
      return { status, issues };
    } catch (error) {
      console.error('[SupabaseDataManager] Health check failed:', error);
      return { status: 'unhealthy', issues: ['System health check failed'] };
    }
  }
}

export const supabaseDataManager = new SupabaseDataManager();
