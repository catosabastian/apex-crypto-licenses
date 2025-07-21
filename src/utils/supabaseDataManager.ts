
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
  documents: any[];
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
  }

  private handleRealtimeUpdate(table: string, payload: any) {
    console.log(`[SupabaseDataManager] Realtime update for ${table}:`, payload);
    this.cache.delete(table);
    this.notifyListeners(`${table}_updated`, payload);
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
      return data || [];
    } catch (error) {
      console.error('[SupabaseDataManager] Error loading applications:', error);
      return [];
    }
  }

  async createApplication(application: Partial<Application>): Promise<Application | null> {
    try {
      const { data, error } = await supabase
        .from('applications')
        .insert(application)
        .select()
        .single();

      if (error) throw error;
      
      this.notifyListeners('applications_updated', data);
      return data;
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
      
      this.notifyListeners('applications_updated', data);
      return data;
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
      const { data, error } = await supabase
        .from('contacts')
        .insert(contact)
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
