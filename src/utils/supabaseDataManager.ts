import { supabase } from '@/integrations/supabase/client';

export interface PaymentAddress {
  id: string;
  cryptocurrency: string;
  address: string;
  is_active: boolean;
  qr_code_data?: string;
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  category: string;
  notes?: string;
  status: string;
  amount?: string;
  payment_method?: string;
  transaction_id?: string;
  documents: any;
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
  status: string;
  platforms?: string;
  application_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: string;
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

export interface ContentData {
  id: string;
  key: string;
  section: string;
  value: any;
  created_at: string;
  updated_at: string;
}

class SupabaseDataManager {
  private listeners: Map<string, Set<Function>> = new Map();
  private cache: Map<string, any> = new Map();
  private lastUpdate: Map<string, number> = new Map();

  constructor() {
    this.initializeRealTimeSubscriptions();
  }

  private initializeRealTimeSubscriptions() {
    // Subscribe to settings changes
    supabase
      .channel('settings-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'settings' }, 
        (payload) => this.handleRealtimeUpdate('settings', payload))
      .subscribe();

    // Subscribe to payment addresses changes
    supabase
      .channel('payment-addresses-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'payment_addresses' }, 
        (payload) => this.handleRealtimeUpdate('payment_addresses', payload))
      .subscribe();

    // Subscribe to applications changes
    supabase
      .channel('applications-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'applications' }, 
        (payload) => this.handleRealtimeUpdate('applications', payload))
      .subscribe();

    // Subscribe to content changes
    supabase
      .channel('content-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'content' }, 
        (payload) => this.handleRealtimeUpdate('content', payload))
      .subscribe();

    // Subscribe to license changes
    supabase
      .channel('license-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'licenses' }, 
        (payload) => this.handleRealtimeUpdate('licenses', payload))
      .subscribe();
  }

  private handleRealtimeUpdate(table: string, payload: any) {
    console.log(`[SupabaseDataManager] Realtime update for ${table}:`, payload);
    this.cache.delete(table);
    this.cache.delete(`${table}_${payload.new?.section || payload.old?.section}`);
    this.notifyListeners(`${table}_updated`, payload);
    this.notifyListeners('content_updated', payload);
  }

  addEventListener(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
  }

  removeEventListener(event: string, callback: Function) {
    if (this.listeners.has(event)) {
      this.listeners.get(event)!.delete(callback);
    }
  }

  private notifyListeners(event: string, data: any) {
    if (this.listeners.has(event)) {
      this.listeners.get(event)!.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`[SupabaseDataManager] Error in event listener for ${event}:`, error);
        }
      });
    }
  }

  async getContent(section: string): Promise<any> {
    try {
      const cacheKey = `content_${section}`;
      const now = Date.now();
      
      if (this.cache.has(cacheKey) && (now - (this.lastUpdate.get(cacheKey) || 0)) < 5000) {
        return this.cache.get(cacheKey);
      }

      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('section', section);

      if (error) {
        console.error(`[SupabaseDataManager] Error loading content for ${section}:`, error);
        return {};
      }

      if (!data || data.length === 0) {
        console.log(`[SupabaseDataManager] No content found for section: ${section}`);
        return {};
      }

      // Convert array of content records to a single object
      const contentObject: any = {};
      data.forEach((item: ContentData) => {
        contentObject[item.key] = item.value;
      });

      this.cache.set(cacheKey, contentObject);
      this.lastUpdate.set(cacheKey, now);
      
      console.log(`[SupabaseDataManager] Loaded content for ${section}:`, contentObject);
      return contentObject;
    } catch (error) {
      console.error(`[SupabaseDataManager] Error loading content for ${section}:`, error);
      return {};
    }
  }

  async verifyLicense(licenseId: string): Promise<License | null> {
    try {
      const { data, error } = await supabase
        .from('licenses')
        .select('*')
        .eq('license_id', licenseId)
        .eq('status', 'active')
        .single();

      if (error) {
        console.error(`[SupabaseDataManager] Error verifying license ${licenseId}:`, error);
        return null;
      }

      console.log(`[SupabaseDataManager] License verification result for ${licenseId}:`, data);
      return data;
    } catch (error) {
      console.error(`[SupabaseDataManager] Error verifying license ${licenseId}:`, error);
      return null;
    }
  }

  async getSettings(): Promise<Record<string, any>> {
    try {
      const cacheKey = 'settings';
      const now = Date.now();
      
      if (this.cache.has(cacheKey) && (now - (this.lastUpdate.get(cacheKey) || 0)) < 5000) {
        return this.cache.get(cacheKey);
      }

      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .order('key');

      if (error) throw error;

      const settings: Record<string, any> = {};
      data?.forEach((setting: Setting) => {
        settings[setting.key] = setting.value;
      });

      this.cache.set(cacheKey, settings);
      this.lastUpdate.set(cacheKey, now);
      
      console.log('[SupabaseDataManager] Loaded settings:', settings);
      return settings;
    } catch (error) {
      console.error('[SupabaseDataManager] Error loading settings:', error);
      return {};
    }
  }

  async updateSetting(key: string, value: any): Promise<Setting | null> {
    try {
      const { data, error } = await supabase
        .from('settings')
        .upsert({ 
          key, 
          value, 
          category: key.startsWith('category') ? 'pricing' : 'general',
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      
      // Clear cache and notify listeners
      this.cache.delete('settings');
      this.notifyListeners('settings_updated', data);
      
      return data;
    } catch (error) {
      console.error('[SupabaseDataManager] Error updating setting:', error);
      throw error;
    }
  }

  async getPaymentAddresses(): Promise<PaymentAddress[]> {
    try {
      const cacheKey = 'payment_addresses';
      const now = Date.now();
      
      if (this.cache.has(cacheKey) && (now - (this.lastUpdate.get(cacheKey) || 0)) < 5000) {
        return this.cache.get(cacheKey);
      }

      const { data, error } = await supabase
        .from('payment_addresses')
        .select('*')
        .eq('is_active', true)
        .order('cryptocurrency');

      if (error) throw error;

      this.cache.set(cacheKey, data || []);
      this.lastUpdate.set(cacheKey, now);
      
      console.log('[SupabaseDataManager] Loaded payment addresses:', data);
      return data || [];
    } catch (error) {
      console.error('[SupabaseDataManager] Error loading payment addresses:', error);
      return [];
    }
  }

  async updatePaymentAddress(cryptocurrency: string, updates: Partial<PaymentAddress>): Promise<PaymentAddress | null> {
    try {
      const { data, error } = await supabase
        .from('payment_addresses')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('cryptocurrency', cryptocurrency)
        .select()
        .single();

      if (error) throw error;
      
      // Clear cache and notify listeners
      this.cache.delete('payment_addresses');
      this.notifyListeners('payment_addresses_updated', data);
      
      return data;
    } catch (error) {
      console.error('[SupabaseDataManager] Error updating payment address:', error);
      throw error;
    }
  }

  async getApplications(): Promise<Application[]> {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Convert the data to match our Application interface
      const applications: Application[] = (data || []).map(item => ({
        ...item,
        documents: Array.isArray(item.documents) ? item.documents : 
                   typeof item.documents === 'string' ? JSON.parse(item.documents) : 
                   item.documents || []
      }));

      return applications;
    } catch (error) {
      console.error('[SupabaseDataManager] Error loading applications:', error);
      return [];
    }
  }

  async createApplication(application: Partial<Application>): Promise<Application | null> {
    try {
      // Ensure required fields are present
      if (!application.name || !application.email || !application.category) {
        throw new Error('Missing required fields: name, email, and category are required');
      }

      const applicationData = {
        name: application.name,
        email: application.email,
        category: application.category,
        phone: application.phone || null,
        company: application.company || null,
        notes: application.notes || null,
        status: application.status || 'pending',
        amount: application.amount || null,
        payment_method: application.payment_method || null,
        transaction_id: application.transaction_id || null,
        documents: application.documents || []
      };

      const { data, error } = await supabase
        .from('applications')
        .insert(applicationData)
        .select()
        .single();

      if (error) throw error;
      
      // Convert the data to match our Application interface
      const result: Application = {
        ...data,
        documents: Array.isArray(data.documents) ? data.documents : 
                   typeof data.documents === 'string' ? JSON.parse(data.documents) : 
                   data.documents || []
      };
      
      this.notifyListeners('applications_updated', result);
      return result;
    } catch (error) {
      console.error('[SupabaseDataManager] Error creating application:', error);
      throw error;
    }
  }

  async updateApplication(id: string, updates: Partial<Application>): Promise<Application | null> {
    try {
      const { data, error } = await supabase
        .from('applications')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      // Convert the data to match our Application interface
      const result: Application = {
        ...data,
        documents: Array.isArray(data.documents) ? data.documents : 
                   typeof data.documents === 'string' ? JSON.parse(data.documents) : 
                   data.documents || []
      };
      
      this.notifyListeners('applications_updated', result);
      return result;
    } catch (error) {
      console.error('[SupabaseDataManager] Error updating application:', error);
      throw error;
    }
  }

  async getLicenses(): Promise<License[]> {
    try {
      const { data, error } = await supabase
        .from('licenses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('[SupabaseDataManager] Error loading licenses:', error);
      return [];
    }
  }

  async getContacts(): Promise<Contact[]> {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('[SupabaseDataManager] Error loading contacts:', error);
      return [];
    }
  }

  async createContact(contact: Partial<Contact>): Promise<Contact | null> {
    try {
      // Ensure required fields are present
      if (!contact.name || !contact.email || !contact.message) {
        throw new Error('Missing required fields: name, email, and message are required');
      }

      const contactData = {
        name: contact.name,
        email: contact.email,
        message: contact.message,
        subject: contact.subject || null,
        status: contact.status || 'unread'
      };

      const { data, error } = await supabase
        .from('contacts')
        .insert(contactData)
        .select()
        .single();

      if (error) throw error;
      
      this.notifyListeners('contacts_updated', data);
      return data;
    } catch (error) {
      console.error('[SupabaseDataManager] Error creating contact:', error);
      throw error;
    }
  }

  // Clear all caches
  clearCache() {
    this.cache.clear();
    this.lastUpdate.clear();
  }
}

export const supabaseDataManager = new SupabaseDataManager();
