
import { supabase } from "@/integrations/supabase/client";

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
  category?: number;
}

export interface Application {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  category: string;
  amount?: string;
  payment_method?: string;
  transaction_id?: string;
  status: 'pending' | 'processing' | 'approved' | 'rejected';
  notes?: string;
  documents?: any[];
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

export interface PaymentAddress {
  id: string;
  cryptocurrency: string;
  address: string;
  qr_code_data?: string;
  is_active: boolean;
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

export interface EmailJSSettings {
  id: string;
  service_id: string;
  template_id: string;
  user_id: string;
  template_name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

class SupabaseDataManager {
  private eventListeners: { [key: string]: Function[] } = {};

  addEventListener(event: string, callback: Function) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(callback);
  }

  removeEventListener(event: string, callback: Function) {
    if (this.eventListeners[event]) {
      this.eventListeners[event] = this.eventListeners[event].filter(cb => cb !== callback);
    }
  }

  private emit(event: string, data?: any) {
    if (this.eventListeners[event]) {
      this.eventListeners[event].forEach(callback => callback(data));
    }
  }

  // License management
  async getLicenses(): Promise<License[]> {
    try {
      const { data, error } = await supabase
        .from('licenses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching licenses:', error);
        return [];
      }

      return (data || []).map(license => ({
        ...license,
        status: license.status as 'active' | 'expired' | 'suspended' | 'revoked'
      }));
    } catch (error) {
      console.error('Error fetching licenses:', error);
      return [];
    }
  }

  async createLicense(license: Omit<License, 'id' | 'created_at' | 'updated_at'>): Promise<License | null> {
    try {
      const { data, error } = await supabase
        .from('licenses')
        .insert([license])
        .select()
        .single();

      if (error) {
        console.error('Error creating license:', error);
        return null;
      }

      const updatedLicenses = await this.getLicenses();
      this.emit('licenses_updated', updatedLicenses);

      return {
        ...data,
        status: data.status as 'active' | 'expired' | 'suspended' | 'revoked'
      };
    } catch (error) {
      console.error('Error creating license:', error);
      return null;
    }
  }

  async updateLicense(id: string, updates: Partial<License>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('licenses')
        .update(updates)
        .eq('id', id);

      if (error) {
        console.error('Error updating license:', error);
        return false;
      }

      const updatedLicenses = await this.getLicenses();
      this.emit('licenses_updated', updatedLicenses);

      return true;
    } catch (error) {
      console.error('Error updating license:', error);
      return false;
    }
  }

  // Application management
  async getApplications(): Promise<Application[]> {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching applications:', error);
        return [];
      }

      return (data || []).map(app => ({
        ...app,
        status: app.status as 'pending' | 'processing' | 'approved' | 'rejected',
        documents: Array.isArray(app.documents) ? app.documents : [],
        phone: app.phone || '',
        company: app.company || '',
        amount: app.amount || '',
        payment_method: app.payment_method || '',
        transaction_id: app.transaction_id || '',
        notes: app.notes || ''
      }));
    } catch (error) {
      console.error('Error fetching applications:', error);
      return [];
    }
  }

  async updateApplication(id: string, updates: Partial<Application>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('applications')
        .update(updates)
        .eq('id', id);

      if (error) {
        console.error('Error updating application:', error);
        return false;
      }

      const updatedApplications = await this.getApplications();
      this.emit('applications_updated', updatedApplications);

      return true;
    } catch (error) {
      console.error('Error updating application:', error);
      return false;
    }
  }

  async createApplication(application: Omit<Application, 'id' | 'created_at' | 'updated_at'>): Promise<Application | null> {
    try {
      const { data, error } = await supabase
        .from('applications')
        .insert([{
          ...application,
          documents: application.documents || []
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating application:', error);
        return null;
      }

      const updatedApplications = await this.getApplications();
      this.emit('applications_updated', updatedApplications);

      return {
        ...data,
        status: data.status as 'pending' | 'processing' | 'approved' | 'rejected',
        documents: Array.isArray(data.documents) ? data.documents : [],
        phone: data.phone || '',
        company: data.company || '',
        amount: data.amount || '',
        payment_method: data.payment_method || '',
        transaction_id: data.transaction_id || '',
        notes: data.notes || ''
      };
    } catch (error) {
      console.error('Error creating application:', error);
      return null;
    }
  }

  // Contact management
  async getContacts(): Promise<Contact[]> {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching contacts:', error);
        return [];
      }

      return (data || []).map(contact => ({
        ...contact,
        status: contact.status as 'unread' | 'read' | 'responded' | 'archived'
      }));
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return [];
    }
  }

  async updateContact(id: string, updates: Partial<Contact>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('contacts')
        .update(updates)
        .eq('id', id);

      if (error) {
        console.error('Error updating contact:', error);
        return false;
      }

      const updatedContacts = await this.getContacts();
      this.emit('contacts_updated', updatedContacts);

      return true;
    } catch (error) {
      console.error('Error updating contact:', error);
      return false;
    }
  }

  async deleteContact(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting contact:', error);
        return false;
      }

      const updatedContacts = await this.getContacts();
      this.emit('contacts_updated', updatedContacts);

      return true;
    } catch (error) {
      console.error('Error deleting contact:', error);
      return false;
    }
  }

  // Payment address management
  async getPaymentAddresses(): Promise<PaymentAddress[]> {
    try {
      const { data, error } = await supabase
        .from('payment_addresses')
        .select('*')
        .order('cryptocurrency');

      if (error) {
        console.error('Error fetching payment addresses:', error);
        return this.getDefaultPaymentAddresses();
      }

      if (!data || data.length === 0) {
        return this.getDefaultPaymentAddresses();
      }

      return data;
    } catch (error) {
      console.error('Error fetching payment addresses:', error);
      return this.getDefaultPaymentAddresses();
    }
  }

  private getDefaultPaymentAddresses(): PaymentAddress[] {
    return [
      {
        id: 'btc-default',
        cryptocurrency: 'BTC',
        address: '',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'eth-default',
        cryptocurrency: 'ETH',
        address: '',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'usdt-tron-default',
        cryptocurrency: 'USDT_TRON',
        address: '',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'usdt-eth-default',
        cryptocurrency: 'USDT_ETH',
        address: '',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
  }

  async updatePaymentAddress(cryptocurrency: string, updates: { address: string; is_active: boolean }): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('payment_addresses')
        .upsert({
          cryptocurrency,
          address: updates.address,
          is_active: updates.is_active
        }, {
          onConflict: 'cryptocurrency'
        })
        .select();

      if (error) {
        console.error('Error updating payment address:', error);
        return false;
      }

      const updatedAddresses = await this.getPaymentAddresses();
      this.emit('payment_addresses_updated', updatedAddresses);

      return true;
    } catch (error) {
      console.error('Error updating payment address:', error);
      return false;
    }
  }

  // Settings management
  async getSettings(): Promise<Record<string, any>> {
    try {
      console.log('[SupabaseDataManager] Starting getSettings...');
      
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Settings fetch timeout after 10 seconds')), 10000)
      );
      
      const fetchPromise = supabase
        .from('settings')
        .select('*');
      
      const { data, error } = await Promise.race([fetchPromise, timeoutPromise]) as any;

      if (error) {
        console.error('Error fetching settings:', error);
        return this.getDefaultSettings();
      }

      if (!data || data.length === 0) {
        console.log('[SupabaseDataManager] No settings found, using defaults');
        return this.getDefaultSettings();
      }

      const settings: Record<string, any> = {};
      data.forEach(setting => {
        settings[setting.key] = setting.value;
      });

      console.log('[SupabaseDataManager] Successfully loaded settings:', Object.keys(settings).length);
      return settings;
    } catch (error) {
      console.error('Error fetching settings:', error);
      return this.getDefaultSettings();
    }
  }

  private getDefaultSettings(): Record<string, any> {
    return {
      category1_name: 'Basic Trader',
      category1_price: '$5,000',
      category1_available: true,
      category2_name: 'Standard Trader', 
      category2_price: '$15,000',
      category2_available: true,
      category3_name: 'Advanced Trader',
      category3_price: '$25,000', 
      category3_available: true,
      category4_name: 'Professional Trader',
      category4_price: '$50,000',
      category4_available: true,
      category5_name: 'Institutional Trader',
      category5_price: '$100,000',
      category5_available: true,
      category6_name: 'Executive Trader',
      category6_price: '$200,000',
      category6_available: true
    };
  }

  async updateSetting(key: string, value: any): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('settings')
        .upsert({
          key,
          value,
          category: 'general'
        }, {
          onConflict: 'key'
        });

      if (error) {
        console.error('Error updating setting:', error);
        return false;
      }

      const updatedSettings = await this.getSettings();
      this.emit('settings_updated', updatedSettings);

      return true;
    } catch (error) {
      console.error('Error updating setting:', error);
      return false;
    }
  }

  // Content management
  async getContent(section: string): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('section', section)
        .single();

      if (error) {
        console.error('Error fetching content:', error);
        return null;
      }

      return data?.value || null;
    } catch (error) {
      console.error('Error fetching content:', error);
      return null;
    }
  }

  async updateContent(key: string, value: any): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('content')
        .upsert({
          key,
          value,
          section: key.split('.')[0] || 'general'
        }, {
          onConflict: 'key'
        });

      if (error) {
        console.error('Error updating content:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error updating content:', error);
      return false;
    }
  }

  async verifyLicense(licenseId: string): Promise<License | null> {
    try {
      const { data, error } = await supabase
        .from('licenses')
        .select('*')
        .eq('license_id', licenseId)
        .single();

      if (error) {
        console.error('Error verifying license:', error);
        return null;
      }

      return {
        ...data,
        status: data.status as 'active' | 'expired' | 'suspended' | 'revoked'
      };
    } catch (error) {
      console.error('Error verifying license:', error);
      return null;
    }
  }

  async exportAllData(): Promise<any> {
    try {
      const [licenses, applications, contacts, settings] = await Promise.all([
        this.getLicenses(),
        this.getApplications(),
        this.getContacts(),
        this.getSettings()
      ]);

      return {
        licenses,
        applications,
        contacts,
        settings,
        exportDate: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error exporting data:', error);
      return null;
    }
  }

  // EmailJS Settings management
  async getEmailJSSettings(): Promise<EmailJSSettings[]> {
    try {
      const { data, error } = await supabase
        .from('emailjs_settings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching EmailJS settings:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching EmailJS settings:', error);
      return [];
    }
  }

  async createEmailJSSettings(settings: Omit<EmailJSSettings, 'id' | 'created_at' | 'updated_at'>): Promise<EmailJSSettings | null> {
    try {
      const { data, error } = await supabase
        .from('emailjs_settings')
        .insert([settings])
        .select()
        .single();

      if (error) {
        console.error('Error creating EmailJS settings:', error);
        return null;
      }

      const updatedSettings = await this.getEmailJSSettings();
      this.emit('emailjs_settings_updated', updatedSettings);

      return data;
    } catch (error) {
      console.error('Error creating EmailJS settings:', error);
      return null;
    }
  }

  async updateEmailJSSettings(id: string, updates: Partial<EmailJSSettings>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('emailjs_settings')
        .update(updates)
        .eq('id', id);

      if (error) {
        console.error('Error updating EmailJS settings:', error);
        return false;
      }

      const updatedSettings = await this.getEmailJSSettings();
      this.emit('emailjs_settings_updated', updatedSettings);

      return true;
    } catch (error) {
      console.error('Error updating EmailJS settings:', error);
      return false;
    }
  }

  async deleteEmailJSSettings(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('emailjs_settings')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting EmailJS settings:', error);
        return false;
      }

      const updatedSettings = await this.getEmailJSSettings();
      this.emit('emailjs_settings_updated', updatedSettings);

      return true;
    } catch (error) {
      console.error('Error deleting EmailJS settings:', error);
      return false;
    }
  }

  // Utility methods
  async isAdminUser(): Promise<boolean> {
    try {
      const { data, error } = await supabase.rpc('is_admin');
      
      if (error) {
        console.error('Error checking admin status:', error);
        return false;
      }

      return data === true;
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  }

  async hasAdminUsers(): Promise<boolean> {
    try {
      const { data, error } = await supabase.rpc('has_admin_users');
      
      if (error) {
        console.error('Error checking admin users:', error);
        return false;
      }

      return data === true;
    } catch (error) {
      console.error('Error checking admin users:', error);
      return false;
    }
  }
}

export const supabaseDataManager = new SupabaseDataManager();
