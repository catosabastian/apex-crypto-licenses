
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
  category?: number;
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
      this.initializeRealtimeSubscriptions();
      await this.loadInitialData();
      await this.initializeDefaultContent();
      this.isInitialized = true;
      console.log('[SupabaseDataManager] Initialization complete');
    } catch (error) {
      console.error('[SupabaseDataManager] Initialization failed:', error);
      throw error;
    }
  }

  private async ensureInitialized() {
    if (!this.isInitialized && this.initializationPromise) {
      await this.initializationPromise;
    }
  }

  private initializeRealtimeSubscriptions() {
    const tables = ['applications', 'licenses', 'payment_addresses', 'settings', 'contacts', 'content'];
    
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
      throw error;
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

  private async initializeDefaultContent() {
    try {
      const existingContent = await this.getContent();
      
      // Initialize hero content if it doesn't exist
      if (!existingContent.hero_title) {
        await this.updateContent('hero', 'title', 'Professional Trading License Services');
        await this.updateContent('hero', 'subtitle', 'Secure Your Trading Future');
        await this.updateContent('hero', 'description', 'Get licensed to trade across major cryptocurrency exchanges with our comprehensive licensing services. Fast, secure, and legally compliant.');
        await this.updateContent('hero', 'cta_text', 'Get Licensed Now');
        await this.updateContent('hero', 'stats', [
          { value: '2000+', label: 'Licensed Traders' },
          { value: '15+', label: 'Supported Exchanges' },
          { value: '99.9%', label: 'Approval Rate' }
        ]);
      }

      // Initialize about content if it doesn't exist
      if (!existingContent.about_title) {
        await this.updateContent('about', 'title', 'Why Choose Our Licensing Services?');
        await this.updateContent('about', 'subtitle', 'Industry Leading Expertise');
        await this.updateContent('about', 'description', 'With years of experience in cryptocurrency regulation and compliance, we provide the most comprehensive licensing services in the industry.');
        await this.updateContent('about', 'services', [
          {
            icon: 'Shield',
            title: 'Regulatory Compliance',
            description: 'Full compliance with international trading regulations and standards.'
          },
          {
            icon: 'Clock',
            title: 'Fast Processing',
            description: 'Quick turnaround times with our streamlined application process.'
          },
          {
            icon: 'Users',
            title: 'Expert Support',
            description: '24/7 support from our team of regulatory experts.'
          }
        ]);
      }

      // Initialize process content if it doesn't exist
      if (!existingContent.process_title) {
        await this.updateContent('process', 'title', 'How to Get Your License');
        await this.updateContent('process', 'subtitle', 'Simple Process');
        await this.updateContent('process', 'description', 'Follow our streamlined process to get your trading license quickly and efficiently.');
        await this.updateContent('process', 'steps', [
          {
            number: '01',
            title: 'Choose Your License Category',
            description: 'Select the appropriate license category based on your trading needs and volume requirements.'
          },
          {
            number: '02',
            title: 'Submit Application',
            description: 'Fill out our comprehensive application form with all required documentation.'
          },
          {
            number: '03',
            title: 'Payment & Verification',
            description: 'Complete secure payment and undergo our verification process.'
          },
          {
            number: '04',
            title: 'Receive Your License',
            description: 'Get your official trading license and start trading on supported exchanges.'
          }
        ]);
        await this.updateContent('process', 'cta_text', 'Start Your Application');
      }

      // Initialize all 12 license categories with default pricing
      const defaultCategories = [
        { id: 1, name: 'Basic Trader', price: '$5,000', status: 'AVAILABLE', description: 'Entry-level trading license for beginners' },
        { id: 2, name: 'Standard Trader', price: '$15,000', status: 'RECOMMENDED', description: 'Standard license for regular traders' },
        { id: 3, name: 'Advanced Trader', price: '$25,000', status: 'AVAILABLE', description: 'Advanced license for experienced traders' },
        { id: 4, name: 'Professional Trader', price: '$50,000', status: 'SELLING FAST', description: 'Professional license for high-volume trading' },
        { id: 5, name: 'Institutional Trader', price: '$100,000', status: 'AVAILABLE', description: 'Institutional license for large organizations' },
        { id: 6, name: 'Executive Trader', price: '$200,000', status: 'AVAILABLE', description: 'Executive license for premium trading services' },
        { id: 7, name: 'Crypto Wallet License', price: '$75,000', status: 'AVAILABLE', description: 'License for cryptocurrency wallet operations' },
        { id: 8, name: 'Fintech EMI License', price: '$125,000', status: 'AVAILABLE', description: 'Electronic Money Institution license' },
        { id: 9, name: 'Fintech MSP License', price: '$150,000', status: 'AVAILABLE', description: 'Money Service Provider license' },
        { id: 10, name: 'Gambling Online License', price: '$300,000', status: 'AVAILABLE', description: 'Online gambling operations license' },
        { id: 11, name: 'Gambling Lottery License', price: '$250,000', status: 'AVAILABLE', description: 'Lottery operations license' },
        { id: 12, name: 'Corporate Offshore License', price: '$400,000', status: 'AVAILABLE', description: 'Offshore corporate license' }
      ];

      for (const category of defaultCategories) {
        const nameKey = `category${category.id}_name`;
        const priceKey = `category${category.id}_price`;
        const statusKey = `category${category.id}_status`;
        const descriptionKey = `category${category.id}_description`;
        const availableKey = `category${category.id}_available`;

        if (!existingContent[nameKey]) {
          await this.updateSetting(nameKey, category.name);
          await this.updateSetting(priceKey, category.price);
          await this.updateSetting(statusKey, category.status);
          await this.updateSetting(descriptionKey, category.description);
          await this.updateSetting(availableKey, true);
        }
      }

      console.log('[SupabaseDataManager] Default content initialized');
    } catch (error) {
      console.error('[SupabaseDataManager] Error initializing default content:', error);
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

  // Licenses
  async createLicense(license: Omit<License, 'id' | 'created_at' | 'updated_at'>): Promise<License | null> {
    try {
      const { data, error } = await (supabase as any)
        .from('licenses')
        .insert([license])
        .select()
        .single();

      if (error) throw error;
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
      const { data, error } = await (supabase as any)
        .from('licenses')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating license:', error);
      return null;
    }
  }

  async deleteLicense(id: string): Promise<boolean> {
    try {
      const { error } = await (supabase as any)
        .from('licenses')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting license:', error);
      return false;
    }
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
    
    return filtered.reduce((acc, item) => {
      acc[`${item.section}_${item.key}`] = item.value;
      return acc;
    }, {} as Record<string, any>);
  }

  async updateContent(section: string, key: string, value: any): Promise<ContentItem | null> {
    try {
      const { data, error } = await (supabase as any)
        .from('content')
        .upsert({ section, key, value, updated_at: new Date().toISOString() }, {
          onConflict: 'section,key'
        })
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
}

export const supabaseDataManager = new SupabaseDataManager();
