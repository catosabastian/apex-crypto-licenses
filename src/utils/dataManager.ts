export interface Application {
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

export interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'new' | 'replied' | 'closed';
  response?: string;
}

export interface License {
  id: string;
  holder: string;
  type: string;
  category: number;
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'suspended';
  platforms?: string;
}

export interface WebsiteSettings {
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
  usdtTronAddress: string;
  usdtEthereumAddress: string;
  xrpAddress: string;
  // Contact Information
  companyName: string;
  supportEmail: string;
  salesEmail: string;
  contactEmail: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  website: string;
}

class DataManager {
  private static instance: DataManager;
  private eventListeners: { [key: string]: ((data: any) => void)[] } = {};
  
  private constructor() {}
  
  static getInstance(): DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager();
    }
    return DataManager.instance;
  }

  // Event System for Real-time Updates
  addEventListener(event: string, callback: (data: any) => void): void {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(callback);
  }

  removeEventListener(event: string, callback: (data: any) => void): void {
    if (this.eventListeners[event]) {
      this.eventListeners[event] = this.eventListeners[event].filter(cb => cb !== callback);
    }
  }

  private emit(event: string, data: any): void {
    if (this.eventListeners[event]) {
      this.eventListeners[event].forEach(callback => callback(data));
    }
    // Also dispatch custom event for cross-tab communication
    window.dispatchEvent(new CustomEvent(`apex_${event}`, { detail: data }));
  }

  // Applications Management
  getApplications(): Application[] {
    const data = localStorage.getItem('apex_applications');
    return data ? JSON.parse(data) : this.getDefaultApplications();
  }

  saveApplications(applications: Application[]): void {
    localStorage.setItem('apex_applications', JSON.stringify(applications));
  }

  addApplication(application: Omit<Application, 'id' | 'date'>): Application {
    const applications = this.getApplications();
    const newApplication: Application = {
      ...application,
      id: this.generateId(),
      date: new Date().toISOString().split('T')[0],
    };
    applications.push(newApplication);
    this.saveApplications(applications);
    return newApplication;
  }

  updateApplication(id: string, updates: Partial<Application>): boolean {
    const applications = this.getApplications();
    const index = applications.findIndex(app => app.id === id);
    if (index !== -1) {
      applications[index] = { ...applications[index], ...updates };
      this.saveApplications(applications);
      return true;
    }
    return false;
  }

  deleteApplication(id: string): boolean {
    const applications = this.getApplications();
    const filtered = applications.filter(app => app.id !== id);
    if (filtered.length !== applications.length) {
      this.saveApplications(filtered);
      return true;
    }
    return false;
  }

  // Contacts Management
  getContacts(): Contact[] {
    const data = localStorage.getItem('apex_contacts');
    return data ? JSON.parse(data) : this.getDefaultContacts();
  }

  saveContacts(contacts: Contact[]): void {
    localStorage.setItem('apex_contacts', JSON.stringify(contacts));
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
    this.saveContacts(contacts);
    return newContact;
  }

  updateContact(id: string, updates: Partial<Contact>): boolean {
    const contacts = this.getContacts();
    const index = contacts.findIndex(contact => contact.id === id);
    if (index !== -1) {
      contacts[index] = { ...contacts[index], ...updates };
      this.saveContacts(contacts);
      return true;
    }
    return false;
  }

  // Enhanced Licenses Management
  getLicenses(): License[] {
    const data = localStorage.getItem('apex_licenses');
    return data ? JSON.parse(data) : this.getDefaultLicenses();
  }

  saveLicenses(licenses: License[]): void {
    localStorage.setItem('apex_licenses', JSON.stringify(licenses));
  }

  addLicense(license: Omit<License, 'id'>): License {
    const licenses = this.getLicenses();
    const newLicense: License = {
      ...license,
      id: this.generateLicenseId(license.category),
    };
    licenses.push(newLicense);
    this.saveLicenses(licenses);
    return newLicense;
  }

  updateLicense(id: string, updates: Partial<License>): boolean {
    const licenses = this.getLicenses();
    const index = licenses.findIndex(license => license.id === id);
    if (index !== -1) {
      licenses[index] = { ...licenses[index], ...updates };
      this.saveLicenses(licenses);
      return true;
    }
    return false;
  }

  deleteLicense(id: string): boolean {
    const licenses = this.getLicenses();
    const filtered = licenses.filter(license => license.id !== id);
    if (filtered.length !== licenses.length) {
      this.saveLicenses(filtered);
      return true;
    }
    return false;
  }

  // Enhanced Settings Management with Real-time Updates
  getSettings(): WebsiteSettings {
    const data = localStorage.getItem('apex_settings');
    return data ? JSON.parse(data) : this.getDefaultSettings();
  }

  saveSettings(settings: WebsiteSettings): void {
    localStorage.setItem('apex_settings', JSON.stringify(settings));
    this.emit('settings_updated', settings);
  }

  updateSettings(updates: Partial<WebsiteSettings>): WebsiteSettings {
    const currentSettings = this.getSettings();
    const newSettings = { ...currentSettings, ...updates };
    this.saveSettings(newSettings);
    return newSettings;
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

  // Utility methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private generateLicenseId(category: number): string {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    return `CL-${year}-${randomNum}-T${category}`;
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
      { 
        id: '3', 
        name: 'Acme Corp', 
        email: 'admin@acme.com', 
        category: '5', 
        status: 'review', 
        date: '2024-01-13', 
        amount: '250,000 USDT' 
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
      { 
        id: '2', 
        name: 'Bob Wilson', 
        email: 'bob@example.com', 
        subject: 'Payment Issue', 
        message: 'My payment was not processed...', 
        date: '2024-01-14', 
        status: 'replied' 
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
      {
        id: 'CL-2024-0002-T4',
        holder: 'Sarah Connor',
        type: 'Category 4 - Professional Trading',
        category: 4,
        issueDate: '2024-01-10',
        expiryDate: '2025-01-10',
        status: 'active',
        platforms: 'Binance, Kraken, Coinbase, KuCoin, Bybit'
      }
    ];
  }

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
      usdtTronAddress: "TG3XXyExBkPp9nzdajDGFahC9nyKERJpUN",
      usdtEthereumAddress: "0x742d35Cc6663C65C926d75d60e3B3d97c8a0e0e0",
      xrpAddress: "rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH",
      // Contact Information Defaults
      companyName: "APEX Crypto Licensing Regulatory",
      supportEmail: "support@apexcrypto.reg",
      salesEmail: "sales@apexcrypto.reg",
      contactEmail: "contact@apexcrypto.reg",
      phoneNumber: "+1 (555) 123-4567",
      address: "123 Blockchain Avenue",
      city: "Digital City, DC 12345",
      country: "United States",
      website: "https://apexcrypto.reg"
    };
  }
}

export const dataManager = DataManager.getInstance();
