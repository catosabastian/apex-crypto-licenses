
interface Application {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  category: string;
  status: 'pending' | 'approved' | 'rejected' | 'review';
  date: string;
  amount: string;
  documents?: string[];
  notes?: string;
  licenseId?: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'new' | 'replied' | 'closed';
  response?: string;
}

interface License {
  id: string;
  holder: string;
  type: string;
  category: number;
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'suspended';
  platforms?: string;
}

interface WebsiteSettings {
  category1Price: string;
  category2Price: string;
  category3Price: string;
  category4Price: string;
  category5Price: string;
  category6Price: string;
  category1Available: boolean;
  category2Available: boolean;
  category3Available: boolean;
  category4Available: boolean;
  category5Available: boolean;
  category6Available: boolean;
  bitcoinAddress: string;
  ethereumAddress: string;
  usdtAddress: string;
  companyName: string;
  supportEmail: string;
  salesEmail: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  website: string;
}

class UnifiedDataManager {
  private static instance: UnifiedDataManager;
  private eventListeners: Map<string, Set<(data: any) => void>> = new Map();
  private broadcastChannel: BroadcastChannel;
  
  private constructor() {
    this.broadcastChannel = new BroadcastChannel('apex_unified_sync');
    this.setupMessageListener();
  }
  
  static getInstance(): UnifiedDataManager {
    if (!UnifiedDataManager.instance) {
      UnifiedDataManager.instance = new UnifiedDataManager();
    }
    return UnifiedDataManager.instance;
  }

  private setupMessageListener(): void {
    this.broadcastChannel.addEventListener('message', (event) => {
      const { type, data } = event.data;
      this.triggerLocalListeners(type, data);
    });
  }

  addEventListener(event: string, callback: (data: any) => void): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }
    this.eventListeners.get(event)?.add(callback);
  }

  removeEventListener(event: string, callback: (data: any) => void): void {
    this.eventListeners.get(event)?.delete(callback);
  }

  private triggerLocalListeners(event: string, data: any): void {
    this.eventListeners.get(event)?.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error('Event listener error:', error);
      }
    });
  }

  private emit(event: string, data: any): void {
    // Broadcast to other tabs/windows
    this.broadcastChannel.postMessage({ type: event, data });
    
    // Trigger local listeners
    this.triggerLocalListeners(event, data);
  }

  // Settings Management with Immediate Sync
  getSettings(): WebsiteSettings {
    const stored = localStorage.getItem('apex_unified_settings');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Settings parse error:', error);
      }
    }
    return this.getDefaultSettings();
  }

  updateSettings(updates: Partial<WebsiteSettings>): WebsiteSettings {
    const current = this.getSettings();
    const newSettings = { ...current, ...updates };
    
    // Save immediately
    localStorage.setItem('apex_unified_settings', JSON.stringify(newSettings));
    
    // Emit with timestamp for tracking
    this.emit('settings_updated', {
      settings: newSettings,
      timestamp: Date.now(),
      updateKeys: Object.keys(updates)
    });
    
    return newSettings;
  }

  // Applications Management
  getApplications(): Application[] {
    const stored = localStorage.getItem('apex_unified_applications');
    return stored ? JSON.parse(stored) : this.getDefaultApplications();
  }

  addApplication(application: Omit<Application, 'id' | 'date'>): Application {
    const applications = this.getApplications();
    const newApplication: Application = {
      ...application,
      id: this.generateId(),
      date: new Date().toISOString().split('T')[0],
    };
    applications.push(newApplication);
    localStorage.setItem('apex_unified_applications', JSON.stringify(applications));
    this.emit('applications_updated', applications);
    return newApplication;
  }

  updateApplication(id: string, updates: Partial<Application>): boolean {
    const applications = this.getApplications();
    const index = applications.findIndex(app => app.id === id);
    if (index !== -1) {
      applications[index] = { ...applications[index], ...updates };
      localStorage.setItem('apex_unified_applications', JSON.stringify(applications));
      this.emit('applications_updated', applications);
      return true;
    }
    return false;
  }

  // Contacts Management
  getContacts(): Contact[] {
    const stored = localStorage.getItem('apex_unified_contacts');
    return stored ? JSON.parse(stored) : this.getDefaultContacts();
  }

  addContact(contact: Omit<Contact, 'id' | 'date' | 'status'>): Contact {
    const contacts = this.getContacts();
    const newContact: Contact = {
      ...contact,
      id: this.generateId(),
      date: new Date().toISOString().split('T')[0],
      status: 'new',
    };
    contacts.push(newContact);
    localStorage.setItem('apex_unified_contacts', JSON.stringify(contacts));
    this.emit('contacts_updated', contacts);
    return newContact;
  }

  updateContact(id: string, updates: Partial<Contact>): boolean {
    const contacts = this.getContacts();
    const index = contacts.findIndex(contact => contact.id === id);
    if (index !== -1) {
      contacts[index] = { ...contacts[index], ...updates };
      localStorage.setItem('apex_unified_contacts', JSON.stringify(contacts));
      this.emit('contacts_updated', contacts);
      return true;
    }
    return false;
  }

  // Licenses Management
  getLicenses(): License[] {
    const stored = localStorage.getItem('apex_unified_licenses');
    return stored ? JSON.parse(stored) : this.getDefaultLicenses();
  }

  addLicense(license: Omit<License, 'id'>): License {
    const licenses = this.getLicenses();
    const newLicense: License = {
      ...license,
      id: this.generateLicenseId(license.category),
    };
    licenses.push(newLicense);
    localStorage.setItem('apex_unified_licenses', JSON.stringify(licenses));
    this.emit('licenses_updated', licenses);
    return newLicense;
  }

  updateLicense(id: string, updates: Partial<License>): boolean {
    const licenses = this.getLicenses();
    const index = licenses.findIndex(license => license.id === id);
    if (index !== -1) {
      licenses[index] = { ...licenses[index], ...updates };
      localStorage.setItem('apex_unified_licenses', JSON.stringify(licenses));
      this.emit('licenses_updated', licenses);
      return true;
    }
    return false;
  }

  deleteLicense(id: string): boolean {
    const licenses = this.getLicenses();
    const filtered = licenses.filter(license => license.id !== id);
    if (filtered.length !== licenses.length) {
      localStorage.setItem('apex_unified_licenses', JSON.stringify(filtered));
      this.emit('licenses_updated', filtered);
      return true;
    }
    return false;
  }

  // Utility Methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private generateLicenseId(category: number): string {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    return `CL-${year}-${randomNum}-T${category}`;
  }

  // Default Data
  private getDefaultSettings(): WebsiteSettings {
    return {
      category1Price: '25,000 USDT',
      category2Price: '50,000 USDT',
      category3Price: '70,000 USDT',
      category4Price: '150,000 USDT',
      category5Price: '250,000 USDT',
      category6Price: '500,000 USDT',
      category1Available: false,
      category2Available: false,
      category3Available: true,
      category4Available: true,
      category5Available: true,
      category6Available: true,
      bitcoinAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      ethereumAddress: "0x742d35Cc6663C65C926d75d60e3B3d97c8a0e0e0",
      usdtAddress: "TG3XXyExBkPp9nzdajDGFahC9nyKERJpUN",
      companyName: "APEX Crypto Licensing Regulatory",
      supportEmail: "support@apexcrypto.reg",
      salesEmail: "sales@apexcrypto.reg",
      phoneNumber: "+1 (555) 123-4567",
      address: "123 Blockchain Avenue",
      city: "Digital City, DC 12345",
      country: "United States",
      website: "https://apexcrypto.reg"
    };
  }

  private getDefaultApplications(): Application[] {
    return [
      { 
        id: '1', 
        name: 'John Doe', 
        email: 'john@example.com', 
        category: '3', 
        status: 'pending', 
        date: '2024-01-15', 
        amount: '70,000 USDT' 
      },
      { 
        id: '2', 
        name: 'Jane Smith', 
        email: 'jane@example.com', 
        category: '4', 
        status: 'approved', 
        date: '2024-01-14', 
        amount: '150,000 USDT' 
      },
    ];
  }

  private getDefaultContacts(): Contact[] {
    return [
      { 
        id: '1', 
        name: 'Alice Johnson', 
        email: 'alice@example.com', 
        subject: 'License Inquiry', 
        message: 'I need help with my application...', 
        date: '2024-01-15', 
        status: 'new' 
      },
    ];
  }

  private getDefaultLicenses(): License[] {
    return [
      {
        id: 'CL-2024-0001-T3',
        holder: 'Thomas Anderson',
        type: 'Category 3 - Advanced Trading',
        category: 3,
        issueDate: '2024-01-15',
        expiryDate: '2025-01-15',
        status: 'active',
        platforms: 'Binance, Kraken, Coinbase, KuCoin'
      },
    ];
  }

  // Analytics
  getAnalytics() {
    const applications = this.getApplications();
    const contacts = this.getContacts();
    const licenses = this.getLicenses();

    return {
      totalApplications: applications.length,
      pendingApplications: applications.filter(app => app.status === 'pending').length,
      approvedApplications: applications.filter(app => app.status === 'approved').length,
      activeLicenses: licenses.filter(license => license.status === 'active').length,
      newContacts: contacts.filter(contact => contact.status === 'new').length,
      totalRevenue: applications
        .filter(app => app.status === 'approved')
        .reduce((sum, app) => sum + parseFloat(app.amount.replace(/[^0-9.]/g, '')), 0),
    };
  }

  destroy(): void {
    this.broadcastChannel.close();
    this.eventListeners.clear();
  }
}

export const unifiedDataManager = UnifiedDataManager.getInstance();
export type { Application, Contact, License, WebsiteSettings };
