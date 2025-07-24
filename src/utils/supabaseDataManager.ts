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

export interface WebsiteSettings {
  id: string;
  site_name: string;
  site_description: string;
  logo_url: string;
  featured_image_url: string | null;
  favicon_url: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string | null;
  social_facebook: string | null;
  social_twitter: string | null;
  social_linkedin: string | null;
  social_instagram: string | null;
  maintenance_mode: boolean;
  announcement_text: string | null;
  announcement_active: boolean;
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
    websiteSettings: new BehaviorSubject<WebsiteSettings | null>(null)
  };
  private isInitialized = false;
  private initializationPromise: Promise<void> | null = null;
  private defaultSettings: Record<string, any> = {};
  private initializationFailed = false;

  constructor() {
    this.initializeDefaultSettings();
    // Don't start initialization immediately - wait for first data request
  }

  private initializeDefaultSettings() {
    this.defaultSettings = {
      // Category settings
      category1_name: 'Basic Trader',
      category1_price: '$5,000',
      category1_status: 'AVAILABLE',
      category1_description: 'Entry-level trading license for beginners',
      category1_available: true,
      category2_name: 'Standard Trader',
      category2_price: '$15,000',
      category2_status: 'RECOMMENDED',
      category2_description: 'Standard license for regular traders',
      category2_available: true,
      category3_name: 'Advanced Trader',
      category3_price: '$25,000',
      category3_status: 'AVAILABLE',
      category3_description: 'Advanced license for experienced traders',
      category3_available: true,
      category4_name: 'Professional Trader',
      category4_price: '$50,000',
      category4_status: 'SELLING FAST',
      category4_description: 'Professional license for high-volume trading',
      category4_available: true,
      category5_name: 'Institutional Trader',
      category5_price: '$100,000',
      category5_status: 'AVAILABLE',
      category5_description: 'Institutional license for large organizations',
      category5_available: true,
      category6_name: 'Executive Trader',
      category6_price: '$200,000',
      category6_status: 'AVAILABLE',
      category6_description: 'Executive license for premium trading services',
      category6_available: true,
      // Payment addresses
      bitcoinAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      ethereumAddress: '0x742d35Cc6634C0532925a3b8D0A78E16d7D4e726',
      usdtTronAddress: 'TG3XXyExBkPp9nzdajDMRHvhwjZNWpNBYt',
      usdtEthereumAddress: '0x742d35Cc6634C0532925a3b8D0A78E16d7D4e726',
      xrpAddress: 'rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH',
      // Contact information
      contact_email: 'info@tradingcerts.com',
      contact_phone: '+1-800-TRADING',
      contact_address: '123 Trading Street, Financial District, NY 10005',
      company_name: 'Professional Trading Certifications',
      // License categories structure
      license_categories: {
        '1': { name: 'Basic Trader', price: '$5,000', minVolume: '$50,000', available: true },
        '2': { name: 'Standard Trader', price: '$15,000', minVolume: '$100,000', available: true },
        '3': { name: 'Advanced Trader', price: '$25,000', minVolume: '$250,000', available: true },
        '4': { name: 'Professional Trader', price: '$50,000', minVolume: '$500,000', available: true },
        '5': { name: 'Institutional Trader', price: '$100,000', minVolume: '$1,000,000+', available: true },
        '6': { name: 'Executive Trader', price: '$200,000', minVolume: '$2,500,000+', available: true }
      }
    };
  }

  private async initialize() {
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = this.performInitialization();
    return this.initializationPromise;
  }

  private async performInitialization() {
    try {
      console.log('[SupabaseDataManager] Starting initialization...');
      
      // Test database connection first
      const { data: testData, error: testError } = await supabase
        .from('settings')
        .select('count')
        .limit(1)
        .single();

      if (testError && testError.code !== 'PGRST116') {
        console.warn('[SupabaseDataManager] Database connection test failed:', testError);
        // Continue with initialization but mark as potentially failed
        this.initializationFailed = true;
      }

      this.initializeRealtimeSubscriptions();
      await this.loadInitialData();
      await this.initializeDefaultContent();
      
      this.isInitialized = true;
      this.initializationFailed = false;
      console.log('[SupabaseDataManager] Initialization complete');
    } catch (error) {
      console.error('[SupabaseDataManager] Initialization failed:', error);
      this.initializationFailed = true;
      this.isInitialized = true; // Mark as initialized to prevent hanging
    }
  }

  private async ensureInitialized() {
    if (!this.isInitialized) {
      try {
        await Promise.race([
          this.initialize(),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Initialization timeout')), 5000))
        ]);
      } catch (error) {
        console.warn('[SupabaseDataManager] Initialization timeout or failed, using defaults');
        this.isInitialized = true;
        this.initializationFailed = true;
      }
    }
  }

  private initializeRealtimeSubscriptions() {
    if (this.initializationFailed) return;

    try {
      const tables = ['applications', 'licenses', 'payment_addresses', 'settings', 'contacts', 'content'];
      
      tables.forEach(table => {
        supabase
          .channel(`${table}-changes`)
          .on('postgres_changes', { event: '*', schema: 'public', table }, () => {
            this.reloadTableData(table);
          })
          .subscribe();
      });
    } catch (error) {
      console.error('[SupabaseDataManager] Error initializing realtime subscriptions:', error);
    }
  }

  private async loadInitialData() {
    try {
      console.log('[SupabaseDataManager] Loading initial data...');
      
      const loadPromises = [
        this.loadApplications(),
        this.loadLicenses(),
        this.loadPaymentAddresses(),
        this.loadSettings(),
        this.loadContacts(),
        this.loadContent(),
        this.loadWebsiteSettings()
      ];

      // Load data with individual error handling
      await Promise.allSettled(loadPromises);
      
      console.log('[SupabaseDataManager] Initial data loaded');
    } catch (error) {
      console.error('[SupabaseDataManager] Error loading initial data:', error);
    }
  }

  private async loadApplications() {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        this.dataSubjects.applications.next(data as Application[]);
        this.notifyListeners('applications_updated', data);
      }
    } catch (error) {
      console.error('[SupabaseDataManager] Error loading applications:', error);
    }
  }

  private async loadLicenses() {
    try {
      const { data, error } = await supabase
        .from('licenses')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        this.dataSubjects.licenses.next(data as License[]);
        this.notifyListeners('licenses_updated', data);
      }
    } catch (error) {
      console.error('[SupabaseDataManager] Error loading licenses:', error);
    }
  }

  private async loadPaymentAddresses() {
    try {
      const { data, error } = await supabase
        .from('payment_addresses')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        this.dataSubjects.paymentAddresses.next(data);
        this.notifyListeners('payment_addresses_updated', data);
      }
    } catch (error) {
      console.error('[SupabaseDataManager] Error loading payment addresses:', error);
    }
  }

  private async loadSettings() {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        this.dataSubjects.settings.next(data);
        this.notifyListeners('settings_updated', data);
      }
    } catch (error) {
      console.error('[SupabaseDataManager] Error loading settings:', error);
    }
  }

  private async loadContacts() {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        this.dataSubjects.contacts.next(data as Contact[]);
        this.notifyListeners('contacts_updated', data);
      }
    } catch (error) {
      console.error('[SupabaseDataManager] Error loading contacts:', error);
    }
  }

  private async loadContent() {
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        this.dataSubjects.content.next(data);
        this.notifyListeners('content_updated', data);
      }
    } catch (error) {
      console.error('[SupabaseDataManager] Error loading content:', error);
    }
  }

  private async loadWebsiteSettings() {
    try {
      const { data, error } = await supabase
        .from('website_settings')
        .select('*')
        .single();

      if (error) {
        console.error('Error loading website settings:', error);
        this.dataSubjects.websiteSettings.next(null);
      } else {
        this.dataSubjects.websiteSettings.next(data);
      }
    } catch (error) {
      console.error('Error loading website settings:', error);
      this.dataSubjects.websiteSettings.next(null);
    }
  }

  private async reloadTableData(table: string) {
    switch (table) {
      case 'applications':
        await this.loadApplications();
        break;
      case 'licenses':
        await this.loadLicenses();
        break;
      case 'payment_addresses':
        await this.loadPaymentAddresses();
        break;
      case 'settings':
        await this.loadSettings();
        break;
      case 'contacts':
        await this.loadContacts();
        break;
      case 'content':
        await this.loadContent();
        break;
      case 'website_settings':
        await this.loadWebsiteSettings();
        break;
    }
  }

  private async initializeDefaultContent() {
    if (this.initializationFailed) return;

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
    try {
      await this.ensureInitialized();
      return this.dataSubjects.applications.value;
    } catch (error) {
      console.error('[SupabaseDataManager] Error getting applications:', error);
      return [];
    }
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
    try {
      await this.ensureInitialized();
      return this.dataSubjects.licenses.value;
    } catch (error) {
      console.error('[SupabaseDataManager] Error getting licenses:', error);
      return [];
    }
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
      console.log('[SupabaseDataManager] Verifying license:', licenseId);
      
      const { data, error } = await supabase
        .from('licenses')
        .select('*')
        .eq('license_id', licenseId)
        .eq('status', 'active')
        .maybeSingle();

      if (error) {
        console.error('[SupabaseDataManager] Error verifying license:', error);
        return null;
      }
      
      console.log('[SupabaseDataManager] License verification result:', data);
      return data as License;
    } catch (error) {
      console.error('[SupabaseDataManager] Error verifying license:', error);
      return null;
    }
  }

  // Payment Addresses
  async getPaymentAddresses(): Promise<PaymentAddress[]> {
    try {
      await this.ensureInitialized();
      return this.dataSubjects.paymentAddresses.value;
    } catch (error) {
      console.error('[SupabaseDataManager] Error getting payment addresses:', error);
      return [];
    }
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
      
      await this.loadPaymentAddresses();
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

  // Settings with fallback
  async getSetting(key: string): Promise<any> {
    try {
      await this.ensureInitialized();
      
      if (this.initializationFailed) {
        return this.defaultSettings[key];
      }

      const settings = this.dataSubjects.settings.value;
      const setting = settings.find(s => s.key === key);
      return setting?.value || this.defaultSettings[key];
    } catch (error) {
      console.error('[SupabaseDataManager] Error getting setting:', error);
      return this.defaultSettings[key];
    }
  }

  async updateSetting(key: string, value: any): Promise<Setting | null> {
    try {
      console.log('[SupabaseDataManager] Updating setting:', { key, value });
      
      // Ensure initialization before updating
      await this.ensureInitialized();
      
      // Handle different value types
      let settingValue = value;
      if (typeof value === 'object' && value !== null) {
        settingValue = value;
      } else if (typeof value === 'boolean') {
        settingValue = value;
      } else {
        settingValue = value;
      }
      
      const settingData = { 
        key, 
        value: settingValue, 
        category: key.startsWith('category') ? 'pricing' : 'general',
        updated_at: new Date().toISOString()
      };
      
      console.log('[SupabaseDataManager] Upserting setting data:', settingData);
      
      const { data, error } = await supabase
        .from('settings')
        .upsert(settingData, {
          onConflict: 'key'
        })
        .select()
        .single();

      if (error) {
        console.error('[SupabaseDataManager] Error updating setting:', error);
        
        // Try insert if upsert fails
        const { data: insertData, error: insertError } = await supabase
          .from('settings')
          .insert(settingData)
          .select()
          .single();
          
        if (insertError) {
          console.error('[SupabaseDataManager] Error inserting setting:', insertError);
          throw insertError;
        }
        
        console.log('[SupabaseDataManager] Setting inserted successfully:', insertData);
        await this.loadSettings();
        this.notifyListeners('settings_updated', insertData);
        return insertData;
      }
      
      console.log('[SupabaseDataManager] Setting updated successfully:', data);
      await this.loadSettings();
      this.notifyListeners('settings_updated', data);
      
      return data;
    } catch (error) {
      console.error('[SupabaseDataManager] Error updating setting:', error);
      throw error;
    }
  }

  async getSettings(): Promise<Record<string, any>> {
    try {
      await this.ensureInitialized();
      
      if (this.initializationFailed) {
        return this.defaultSettings;
      }

      const settings = this.dataSubjects.settings.value;
      const result = settings.reduce((acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {} as Record<string, any>);
      
      const mergedResult = { ...this.defaultSettings, ...result };
      console.log('[SupabaseDataManager] getSettings result:', mergedResult);
      return mergedResult;
    } catch (error) {
      console.error('[SupabaseDataManager] Error getting settings, using defaults:', error);
      return this.defaultSettings;
    }
  }

  // Content
  async getContent(section?: string): Promise<Record<string, any>> {
    try {
      await this.ensureInitialized();
      
      if (this.initializationFailed) {
        return {};
      }

      const content = this.dataSubjects.content.value;
      const filtered = section ? content.filter(c => c.section === section) : content;
      
      return filtered.reduce((acc, item) => {
        acc[`${item.section}_${item.key}`] = item.value;
        return acc;
      }, {} as Record<string, any>);
    } catch (error) {
      console.error('[SupabaseDataManager] Error getting content:', error);
      return {};
    }
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
      await this.loadContent();
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
    try {
      await this.ensureInitialized();
      return this.dataSubjects.contacts.value;
    } catch (error) {
      console.error('[SupabaseDataManager] Error getting contacts:', error);
      return [];
    }
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

  // Bulk settings operations
  async bulkUpdateSettings(settingsToUpdate: Record<string, any>): Promise<boolean> {
    try {
      console.log('[SupabaseDataManager] Bulk updating settings:', settingsToUpdate);
      
      await this.ensureInitialized();
      
      const settingsData = Object.entries(settingsToUpdate).map(([key, value]) => ({
        key,
        value,
        category: key.startsWith('category') ? 'pricing' : 'general',
        updated_at: new Date().toISOString()
      }));
      
      console.log('[SupabaseDataManager] Bulk upsert data:', settingsData);
      
      const { data, error } = await supabase
        .from('settings')
        .upsert(settingsData, {
          onConflict: 'key'
        })
        .select();

      if (error) {
        console.error('[SupabaseDataManager] Error bulk updating settings:', error);
        
        // Try individual inserts if bulk upsert fails
        let success = true;
        for (const setting of settingsData) {
          try {
            await this.updateSetting(setting.key, setting.value);
          } catch (err) {
            console.error(`[SupabaseDataManager] Error updating setting ${setting.key}:`, err);
            success = false;
          }
        }
        return success;
      }
      
      console.log('[SupabaseDataManager] Bulk settings updated successfully:', data);
      await this.loadSettings();
      this.notifyListeners('settings_updated', data);
      
      return true;
    } catch (error) {
      console.error('[SupabaseDataManager] Error bulk updating settings:', error);
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
