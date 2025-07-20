
import { BehaviorSubject } from 'rxjs';

// Types
export interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  licenseType: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  walletAddress?: string;
  additionalInfo?: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'replied' | 'resolved';
  date: string;
  phone?: string;
  subject?: string;
}

export interface License {
  id: string;
  applicationId: string;
  licenseKey: string;
  type: string;
  status: 'active' | 'expired' | 'suspended';
  issueDate: string;
  expiryDate: string;
}

export interface ContentSettings {
  // License pricing
  category1Price: string;
  category2Price: string;
  category3Price: string;
  category4Price: string;
  category5Price: string;
  category6Price: string;
  
  // Availability
  category1Available: boolean;
  category2Available: boolean;
  category3Available: boolean;
  category4Available: boolean;
  category5Available: boolean;
  category6Available: boolean;
  
  // Payment addresses
  bitcoinAddress: string;
  ethereumAddress: string;
  usdtAddress: string;
  
  // Contact information
  contactEmail: string;
  contactPhone: string;
  supportEmail: string;
  companyAddress: string;
}

export interface Analytics {
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  activeLicenses: number;
  totalRevenue: number;
  newContacts: number;
}

class UnifiedDataManager {
  private storageKey = 'apex_unified_data';
  private settingsKey = 'apex_settings';
  private eventListeners: { [key: string]: Function[] } = {};
  
  // Default settings with proper pricing
  private defaultSettings: ContentSettings = {
    category1Price: '10,000 USDT',
    category2Price: '25,000 USDT',
    category3Price: '50,000 USDT',
    category4Price: '100,000 USDT',
    category5Price: '250,000 USDT',
    category6Price: '500,000 USDT',
    category1Available: true,
    category2Available: true,
    category3Available: true,
    category4Available: true,
    category5Available: true,
    category6Available: true,
    bitcoinAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    ethereumAddress: '0x742d35Cc6634C0532925a3b8D404E2a8e2eEb9',
    usdtAddress: 'TQn9Y2khEsLJW1ChVWFMSMeRDow5oMANA',
    contactEmail: 'info@apexlicensing.com',
    contactPhone: '+1 (555) 123-4567',
    supportEmail: 'support@apexlicensing.com',
    companyAddress: '123 Business District, Financial City, FC 12345'
  };

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    try {
      // Initialize settings if they don't exist
      const existingSettings = localStorage.getItem(this.settingsKey);
      if (!existingSettings) {
        this.updateSettings(this.defaultSettings);
        console.log('[UnifiedDataManager] Initialized with default settings');
      }
      
      // Initialize data structure if it doesn't exist
      const existingData = localStorage.getItem(this.storageKey);
      if (!existingData) {
        const initialData = {
          applications: [],
          contacts: [],
          licenses: []
        };
        localStorage.setItem(this.storageKey, JSON.stringify(initialData));
        console.log('[UnifiedDataManager] Initialized with empty data structure');
      }
    } catch (error) {
      console.error('[UnifiedDataManager] Failed to initialize:', error);
      // Fallback: ensure we have valid settings
      this.updateSettings(this.defaultSettings);
    }
  }

  // Settings management
  getSettings(): ContentSettings {
    try {
      const settings = localStorage.getItem(this.settingsKey);
      if (settings) {
        const parsed = JSON.parse(settings);
        // Merge with defaults to ensure all properties exist
        return { ...this.defaultSettings, ...parsed };
      }
    } catch (error) {
      console.error('[UnifiedDataManager] Failed to get settings:', error);
    }
    return this.defaultSettings;
  }

  updateSettings(updates: Partial<ContentSettings>): ContentSettings {
    try {
      const currentSettings = this.getSettings();
      const newSettings = { ...currentSettings, ...updates };
      
      localStorage.setItem(this.settingsKey, JSON.stringify(newSettings));
      console.log('[UnifiedDataManager] Settings updated:', newSettings);
      
      // Emit update event
      this.emit('settings_updated', { settings: newSettings });
      
      return newSettings;
    } catch (error) {
      console.error('[UnifiedDataManager] Failed to update settings:', error);
      throw error;
    }
  }

  // Applications management
  getApplications(): Application[] {
    try {
      const data = this.getData();
      return data.applications || [];
    } catch (error) {
      console.error('[UnifiedDataManager] Failed to get applications:', error);
      return [];
    }
  }

  addApplication(application: Omit<Application, 'id' | 'date' | 'status'>): Application {
    try {
      const newApplication: Application = {
        ...application,
        id: `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: 'pending',
        date: new Date().toISOString()
      };

      const data = this.getData();
      data.applications = [...(data.applications || []), newApplication];
      this.saveData(data);
      
      this.emit('application_added', newApplication);
      return newApplication;
    } catch (error) {
      console.error('[UnifiedDataManager] Failed to add application:', error);
      throw error;
    }
  }

  // Contacts management
  getContacts(): Contact[] {
    try {
      const data = this.getData();
      return data.contacts || [];
    } catch (error) {
      console.error('[UnifiedDataManager] Failed to get contacts:', error);
      return [];
    }
  }

  addContact(contact: Omit<Contact, 'id' | 'date' | 'status'>): Contact {
    try {
      const newContact: Contact = {
        ...contact,
        id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: 'new',
        date: new Date().toISOString()
      };

      const data = this.getData();
      data.contacts = [...(data.contacts || []), newContact];
      this.saveData(data);
      
      this.emit('contact_added', newContact);
      return newContact;
    } catch (error) {
      console.error('[UnifiedDataManager] Failed to add contact:', error);
      throw error;
    }
  }

  // Licenses management
  getLicenses(): License[] {
    try {
      const data = this.getData();
      return data.licenses || [];
    } catch (error) {
      console.error('[UnifiedDataManager] Failed to get licenses:', error);
      return [];
    }
  }

  // Analytics
  getAnalytics(): Analytics {
    try {
      const applications = this.getApplications();
      const contacts = this.getContacts();
      const licenses = this.getLicenses();

      return {
        totalApplications: applications.length,
        pendingApplications: applications.filter(app => app.status === 'pending').length,
        approvedApplications: applications.filter(app => app.status === 'approved').length,
        activeLicenses: licenses.filter(license => license.status === 'active').length,
        totalRevenue: applications.filter(app => app.status === 'approved').length * 50000,
        newContacts: contacts.filter(contact => contact.status === 'new').length
      };
    } catch (error) {
      console.error('[UnifiedDataManager] Failed to get analytics:', error);
      return {
        totalApplications: 0,
        pendingApplications: 0,
        approvedApplications: 0,
        activeLicenses: 0,
        totalRevenue: 0,
        newContacts: 0
      };
    }
  }

  // Private helper methods
  private getData() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : { applications: [], contacts: [], licenses: [] };
    } catch (error) {
      console.error('[UnifiedDataManager] Failed to parse data:', error);
      return { applications: [], contacts: [], licenses: [] };
    }
  }

  private saveData(data: any) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('[UnifiedDataManager] Failed to save data:', error);
      throw error;
    }
  }

  // Event system
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

  private emit(event: string, data: any) {
    if (this.eventListeners[event]) {
      this.eventListeners[event].forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`[UnifiedDataManager] Event callback error for ${event}:`, error);
        }
      });
    }
  }

  // Reset method for troubleshooting
  resetToDefaults() {
    try {
      localStorage.removeItem(this.settingsKey);
      localStorage.removeItem(this.storageKey);
      this.initializeData();
      console.log('[UnifiedDataManager] Reset to defaults completed');
      this.emit('settings_updated', { settings: this.defaultSettings });
    } catch (error) {
      console.error('[UnifiedDataManager] Failed to reset:', error);
    }
  }
}

export const unifiedDataManager = new UnifiedDataManager();
