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
  status: 'active' | 'pending' | 'expired' | 'rejected' | 'suspended';
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

export interface LicenseCategory {
  id: string;
  category_number: number;
  name: string;
  price: string;
  min_volume: string;
  validity_period_months: number;
  available: boolean;
  features: string[];
  icon: string;
  color: string;
  display_order: number;
  popular: boolean;
  exclusive: boolean;
  description?: string;
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
    content: new BehaviorSubject<ContentItem[]>([]),
    licenseCategories: new BehaviorSubject<LicenseCategory[]>([])
  };

  constructor() {
    this.initializeRealtimeSubscriptions();
    this.loadInitialData();
  }

  private initializeRealtimeSubscriptions() {
    // Subscribe to real-time changes for all tables
    const tables = ['applications', 'licenses', 'payment_addresses', 'settings', 'contacts', 'content', 'license_categories'];
    
    tables.forEach(table => {
      supabase
        .channel(`${table}-changes`)
        .on('postgres_changes', { event: '*', schema: 'public', table }, () => {
          this.loadTableData(table);
        })
        .subscribe();
    });
  }

  private async loadInitialData() {
    await Promise.all([
      this.loadTableData('applications'),
      this.loadTableData('licenses'),
      this.loadTableData('payment_addresses'),
      this.loadTableData('settings'),
      this.loadTableData('contacts'),
      this.loadTableData('content'),
      this.loadTableData('license_categories')
    ]);
  }

  private async loadTableData(table: string) {
    try {
      const { data, error } = await (supabase as any)
        .from(table)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const subjectKey = table === 'payment_addresses' ? 'paymentAddresses' : 
                        table === 'license_categories' ? 'licenseCategories' : 
                        table as keyof typeof this.dataSubjects;
      this.dataSubjects[subjectKey].next(data || []);
      this.notifyListeners(`${table}_updated`, data);
    } catch (error) {
      console.error(`Error loading ${table}:`, error);
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
    return this.dataSubjects.applications.value;
  }

  async updateApplication(id: string, updates: Partial<Application>): Promise<Application | null> {
    try {
      const { data, error } = await (supabase as any)
        .from('applications')
        .update(updates)
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

  // Licenses

  async getLicenses(): Promise<License[]> {
    return this.dataSubjects.licenses.value;
  }

  async verifyLicense(licenseId: string): Promise<License | null> {
    try {
      const { data, error } = await (supabase as any)
        .from('licenses')
        .select('*')
        .eq('license_id', licenseId)
        .eq('status', 'active')
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error verifying license:', error);
      return null;
    }
  }

  // Payment Addresses
  async getPaymentAddresses(): Promise<PaymentAddress[]> {
    return this.dataSubjects.paymentAddresses.value.filter(addr => addr.is_active);
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
      
      // Update local data and emit event
      await this.loadTableData('payment_addresses');
      this.notifyListeners('payment_addresses_updated', data);
      
      return data;
    } catch (error) {
      console.error('Error updating payment address:', error);
      return null;
    }
  }

  // Settings
  async getSetting(key: string): Promise<any> {
    const settings = this.dataSubjects.settings.value;
    const setting = settings.find(s => s.key === key);
    return setting?.value;
  }

  async updateSetting(key: string, value: any): Promise<Setting | null> {
    try {
      const { data, error } = await (supabase as any)
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
      
      // Update local data and emit event
      await this.loadTableData('settings');
      this.notifyListeners('settings_updated', data);
      
      return data;
    } catch (error) {
      console.error('Error updating setting:', error);
      return null;
    }
  }

  async getSettings(): Promise<Record<string, any>> {
    const settings = this.dataSubjects.settings.value;
    return settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {} as Record<string, any>);
  }

  // Content
  async getContent(section?: string): Promise<Record<string, any>> {
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
        .upsert({ section, key, value })
        .select()
        .single();

      if (error) throw error;
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
    return this.dataSubjects.contacts.value;
  }

  async updateContact(id: string, updates: Partial<Contact>): Promise<Contact | null> {
    try {
      const { data, error } = await (supabase as any)
        .from('contacts')
        .update(updates)
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

  // Event system for component updates
  addEventListener(event: string, listener: Function) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(listener);
  }

  removeEventListener(event: string, listener: Function) {
    if (this.eventListeners[event]) {
      this.eventListeners[event] = this.eventListeners[event].filter(l => l !== listener);
    }
  }

  private notifyListeners(event: string, data: any) {
    if (this.eventListeners[event]) {
      this.eventListeners[event].forEach(listener => listener(data));
    }
  }

  // License Management
  async createLicense(licenseData: Omit<License, 'id' | 'created_at' | 'updated_at'>): Promise<License | null> {
    try {
      const { data, error } = await (supabase as any)
        .from('licenses')
        .insert(licenseData)
        .select()
        .single();

      if (error) throw error;
      
      // Update local data and emit event
      await this.loadTableData('licenses');
      this.notifyListeners('licenses_updated', data);
      
      return data;
    } catch (error) {
      console.error('Error creating license:', error);
      return null;
    }
  }

  async updateLicense(id: string, updates: Partial<Omit<License, 'id' | 'created_at' | 'updated_at'>>): Promise<License | null> {
    try {
      const { data, error } = await (supabase as any)
        .from('licenses')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      // Update local data and emit event
      await this.loadTableData('licenses');
      this.notifyListeners('licenses_updated', data);
      
      return data;
    } catch (error) {
      console.error('Error updating license:', error);
      return null;
    }
  }

  // License Categories
  async getLicenseCategories(): Promise<LicenseCategory[]> {
    return this.dataSubjects.licenseCategories.value;
  }

  async createLicenseCategory(categoryData: Omit<LicenseCategory, 'id' | 'created_at' | 'updated_at'>): Promise<LicenseCategory | null> {
    try {
      const { data, error } = await (supabase as any)
        .from('license_categories')
        .insert([categoryData])
        .select()
        .single();

      if (error) throw error;
      
      // Update local data and emit event
      await this.loadTableData('license_categories');
      this.notifyListeners('license_categories_updated', data);
      
      return data;
    } catch (error) {
      console.error('Error creating license category:', error);
      return null;
    }
  }

  async updateLicenseCategory(id: string, updates: Partial<Omit<LicenseCategory, 'id' | 'created_at' | 'updated_at'>>): Promise<LicenseCategory | null> {
    try {
      const { data, error } = await (supabase as any)
        .from('license_categories')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      // Update local data and emit event
      await this.loadTableData('license_categories');
      this.notifyListeners('license_categories_updated', data);
      
      return data;
    } catch (error) {
      console.error('Error updating license category:', error);
      return null;
    }
  }

  async deleteLicenseCategory(id: string): Promise<boolean> {
    try {
      const { error } = await (supabase as any)
        .from('license_categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Update local data and emit event
      await this.loadTableData('license_categories');
      this.notifyListeners('license_categories_updated', null);
      
      return true;
    } catch (error) {
      console.error('Error deleting license category:', error);
      return false;
    }
  }

  // Analytics
  async getAnalytics() {
    const applications = this.dataSubjects.applications.value;
    const licenses = this.dataSubjects.licenses.value;
    const contacts = this.dataSubjects.contacts.value;

    // Calculate revenue from applications with amounts
    const totalRevenue = applications
      .filter(app => app.amount)
      .reduce((sum, app) => {
        const amount = parseFloat(app.amount?.replace(/[^\d.-]/g, '') || '0');
        return sum + (isNaN(amount) ? 0 : amount);
      }, 0);

    return {
      totalApplications: applications.length,
      pendingApplications: applications.filter(a => a.status === 'pending').length,
      approvedApplications: applications.filter(a => a.status === 'approved').length,
      activeLicenses: licenses.filter(l => l.status === 'active').length,
      newContacts: contacts.filter(c => c.status === 'unread').length,
      totalRevenue: Math.round(totalRevenue)
    };
  }
}

export const supabaseDataManager = new SupabaseDataManager();