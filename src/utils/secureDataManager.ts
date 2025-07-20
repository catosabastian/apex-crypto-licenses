import CryptoJS from 'crypto-js';

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
  companyName: string;
  supportEmail: string;
  salesEmail: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  website: string;
}

export interface AdminSession {
  id: string;
  loginTime: string;
  lastActivity: string;
  isActive: boolean;
  ipAddress?: string;
}

export interface SecurityEvent {
  id: string;
  type: 'login' | 'logout' | 'failed_login' | 'data_change' | 'security_alert';
  timestamp: string;
  details: string;
  ipAddress?: string;
  userAgent?: string;
}

class SecureDataManager {
  private static instance: SecureDataManager;
  private eventListeners: { [key: string]: ((data: any) => void)[] } = {};
  private encryptionKey: string;
  private sessionCheckInterval?: NodeJS.Timeout;
  private retryQueue: Array<{ event: string; data: any; attempts: number }> = [];
  
  private constructor() {
    // Generate or retrieve encryption key
    this.encryptionKey = this.getOrCreateEncryptionKey();
    this.startSessionMonitoring();
    this.startRetryQueue();
  }
  
  static getInstance(): SecureDataManager {
    if (!SecureDataManager.instance) {
      SecureDataManager.instance = new SecureDataManager();
    }
    return SecureDataManager.instance;
  }

  // Enhanced Event System with Retry Logic
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

  private emit(event: string, data: any, retryOnFailure: boolean = true): void {
    try {
      // Emit to local listeners
      if (this.eventListeners[event]) {
        this.eventListeners[event].forEach(callback => callback(data));
      }
      
      // Cross-tab communication
      window.dispatchEvent(new CustomEvent(`apex_${event}`, { detail: data }));
      
      // Cross-window communication for multiple admin sessions
      localStorage.setItem(`apex_event_${Date.now()}`, JSON.stringify({
        event: `apex_${event}`,
        data,
        timestamp: Date.now()
      }));
      
    } catch (error) {
      console.error(`Event emission failed for ${event}:`, error);
      if (retryOnFailure) {
        this.addToRetryQueue(event, data);
      }
    }
  }

  private addToRetryQueue(event: string, data: any): void {
    this.retryQueue.push({ event, data, attempts: 0 });
  }

  private startRetryQueue(): void {
    setInterval(() => {
      this.retryQueue = this.retryQueue.filter(item => {
        if (item.attempts < 3) {
          item.attempts++;
          this.emit(item.event, item.data, false);
          return item.attempts < 3;
        }
        return false;
      });
    }, 5000);
  }

  // Encryption/Decryption Methods
  private encrypt(data: string): string {
    try {
      return CryptoJS.AES.encrypt(data, this.encryptionKey).toString();
    } catch (error) {
      console.error('Encryption failed:', error);
      return data;
    }
  }

  private decrypt(encryptedData: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.encryptionKey);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedData || encryptedData;
    } catch (error) {
      console.error('Decryption failed:', error);
      return encryptedData;
    }
  }

  private getOrCreateEncryptionKey(): string {
    let key = localStorage.getItem('apex_encryption_key');
    if (!key) {
      key = CryptoJS.lib.WordArray.random(256/8).toString();
      localStorage.setItem('apex_encryption_key', key);
    }
    return key;
  }

  // Secure Storage Methods
  private secureSetItem(key: string, data: any): void {
    try {
      const serializedData = JSON.stringify(data);
      const encryptedData = this.encrypt(serializedData);
      localStorage.setItem(key, encryptedData);
      
      // Create backup
      const backupKey = `${key}_backup_${Date.now()}`;
      localStorage.setItem(backupKey, encryptedData);
      
      // Clean old backups (keep last 5)
      this.cleanOldBackups(key);
      
    } catch (error) {
      console.error(`Secure storage failed for ${key}:`, error);
      this.logSecurityEvent('security_alert', `Storage encryption failed for ${key}`);
    }
  }

  private secureGetItem<T>(key: string, defaultValue: T): T {
    try {
      const encryptedData = localStorage.getItem(key);
      if (!encryptedData) return defaultValue;
      
      const decryptedData = this.decrypt(encryptedData);
      return JSON.parse(decryptedData);
    } catch (error) {
      console.error(`Secure retrieval failed for ${key}:`, error);
      
      // Try to restore from backup
      const backup = this.restoreFromBackup(key);
      if (backup) return backup;
      
      return defaultValue;
    }
  }

  private cleanOldBackups(key: string): void {
    const backupKeys = Object.keys(localStorage)
      .filter(k => k.startsWith(`${key}_backup_`))
      .sort()
      .reverse();
    
    if (backupKeys.length > 5) {
      backupKeys.slice(5).forEach(backupKey => {
        localStorage.removeItem(backupKey);
      });
    }
  }

  private restoreFromBackup<T>(key: string): T | null {
    const backupKeys = Object.keys(localStorage)
      .filter(k => k.startsWith(`${key}_backup_`))
      .sort()
      .reverse();
    
    for (const backupKey of backupKeys) {
      try {
        const encryptedData = localStorage.getItem(backupKey);
        if (encryptedData) {
          const decryptedData = this.decrypt(encryptedData);
          return JSON.parse(decryptedData);
        }
      } catch (error) {
        continue;
      }
    }
    return null;
  }

  // Session Management
  private startSessionMonitoring(): void {
    this.sessionCheckInterval = setInterval(() => {
      this.validateSession();
    }, 60000); // Check every minute
  }

  private validateSession(): void {
    const session = this.getCurrentSession();
    if (session) {
      const now = Date.now();
      const lastActivity = new Date(session.lastActivity).getTime();
      const sessionTimeout = 30 * 60 * 1000; // 30 minutes
      
      if (now - lastActivity > sessionTimeout) {
        this.endSession();
        this.emit('session_expired', { reason: 'timeout' });
      } else {
        this.updateSessionActivity();
      }
    }
  }

  createSession(credentials: { username: string; password: string }): boolean {
    // Enhanced credential validation
    if (this.validateCredentials(credentials)) {
      const session: AdminSession = {
        id: this.generateSecureId(),
        loginTime: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        isActive: true,
        ipAddress: this.getClientIP()
      };
      
      this.secureSetItem('apex_admin_session', session);
      this.logSecurityEvent('login', 'Admin login successful');
      return true;
    }
    
    this.logSecurityEvent('failed_login', 'Invalid credentials attempted');
    return false;
  }

  private validateCredentials(credentials: { username: string; password: string }): boolean {
    // In production, these would be environment variables or secure configuration
    const validUsername = 'admin';
    const validPassword = 'apex2025';
    
    return credentials.username === validUsername && credentials.password === validPassword;
  }

  getCurrentSession(): AdminSession | null {
    return this.secureGetItem('apex_admin_session', null);
  }

  updateSessionActivity(): void {
    const session = this.getCurrentSession();
    if (session) {
      session.lastActivity = new Date().toISOString();
      this.secureSetItem('apex_admin_session', session);
    }
  }

  endSession(): void {
    const session = this.getCurrentSession();
    if (session) {
      this.logSecurityEvent('logout', 'Admin session ended');
      localStorage.removeItem('apex_admin_session');
      this.emit('session_ended', {});
    }
  }

  // Security Event Logging
  logSecurityEvent(type: SecurityEvent['type'], details: string): void {
    const events = this.getSecurityEvents();
    const newEvent: SecurityEvent = {
      id: this.generateSecureId(),
      type,
      timestamp: new Date().toISOString(),
      details,
      ipAddress: this.getClientIP(),
      userAgent: navigator.userAgent
    };
    
    events.push(newEvent);
    
    // Keep only last 1000 events
    if (events.length > 1000) {
      events.splice(0, events.length - 1000);
    }
    
    this.secureSetItem('apex_security_events', events);
  }

  getSecurityEvents(): SecurityEvent[] {
    return this.secureGetItem('apex_security_events', []);
  }

  // Enhanced Data Management with Security
  getApplications(): Application[] {
    return this.secureGetItem('apex_applications', this.getDefaultApplications());
  }

  addApplication(application: Omit<Application, 'id' | 'date'>): Application {
    const applications = this.getApplications();
    const newApplication: Application = {
      ...application,
      id: this.generateSecureId(),
      date: new Date().toISOString().split('T')[0],
    };
    applications.push(newApplication);
    this.secureSetItem('apex_applications', applications);
    this.logSecurityEvent('data_change', `New application added: ${newApplication.id}`);
    this.emit('applications_updated', applications);
    return newApplication;
  }

  updateApplication(id: string, updates: Partial<Application>): boolean {
    const applications = this.getApplications();
    const index = applications.findIndex(app => app.id === id);
    if (index !== -1) {
      applications[index] = { ...applications[index], ...updates };
      this.secureSetItem('apex_applications', applications);
      this.logSecurityEvent('data_change', `Application updated: ${id}`);
      this.emit('applications_updated', applications);
      return true;
    }
    return false;
  }

  deleteApplication(id: string): boolean {
    const applications = this.getApplications();
    const filtered = applications.filter(app => app.id !== id);
    if (filtered.length !== applications.length) {
      this.secureSetItem('apex_applications', filtered);
      this.logSecurityEvent('data_change', `Application deleted: ${id}`);
      this.emit('applications_updated', filtered);
      return true;
    }
    return false;
  }

  // Enhanced Settings with Immediate Propagation
  getSettings(): WebsiteSettings {
    return this.secureGetItem('apex_settings', this.getDefaultSettings());
  }

  updateSettings(updates: Partial<WebsiteSettings>): WebsiteSettings {
    const currentSettings = this.getSettings();
    const newSettings = { ...currentSettings, ...updates };
    this.secureSetItem('apex_settings', newSettings);
    this.logSecurityEvent('data_change', 'Website settings updated');
    
    // Immediate propagation with multiple channels
    this.emit('settings_updated', newSettings);
    
    // Force update all listeners immediately
    setTimeout(() => {
      this.emit('settings_force_update', newSettings);
    }, 100);
    
    return newSettings;
  }

  // Utility Methods
  private generateSecureId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
  }

  private getClientIP(): string {
    // This is a simplified version - in production, you'd get this from server
    return 'client';
  }

  // Analytics with Security Context
  getAnalytics() {
    const applications = this.getApplications();
    const contacts = this.getContacts();
    const licenses = this.getLicenses();
    const securityEvents = this.getSecurityEvents();

    return {
      totalApplications: applications.length,
      pendingApplications: applications.filter(app => app.status === 'pending').length,
      approvedApplications: applications.filter(app => app.status === 'approved').length,
      activeLicenses: licenses.filter(license => license.status === 'active').length,
      newContacts: contacts.filter(contact => contact.status === 'new').length,
      totalRevenue: applications
        .filter(app => app.status === 'approved')
        .reduce((sum, app) => sum + parseFloat(app.amount.replace(/[^0-9.]/g, '')), 0),
      securityEvents: securityEvents.length,
      recentSecurityEvents: securityEvents.slice(-10)
    };
  }

  // Contact Management
  getContacts(): Contact[] {
    return this.secureGetItem('apex_contacts', this.getDefaultContacts());
  }

  addContact(contact: Omit<Contact, 'id' | 'date' | 'status'>): Contact {
    const contacts = this.getContacts();
    const newContact: Contact = {
      ...contact,
      id: this.generateSecureId(),
      date: new Date().toISOString().split('T')[0],
      status: 'new',
    };
    contacts.push(newContact);
    this.secureSetItem('apex_contacts', contacts);
    this.emit('contacts_updated', contacts);
    return newContact;
  }

  updateContact(id: string, updates: Partial<Contact>): boolean {
    const contacts = this.getContacts();
    const index = contacts.findIndex(contact => contact.id === id);
    if (index !== -1) {
      contacts[index] = { ...contacts[index], ...updates };
      this.secureSetItem('apex_contacts', contacts);
      this.emit('contacts_updated', contacts);
      return true;
    }
    return false;
  }

  // License Management
  getLicenses(): License[] {
    return this.secureGetItem('apex_licenses', this.getDefaultLicenses());
  }

  addLicense(license: Omit<License, 'id'>): License {
    const licenses = this.getLicenses();
    const newLicense: License = {
      ...license,
      id: this.generateLicenseId(license.category),
    };
    licenses.push(newLicense);
    this.secureSetItem('apex_licenses', licenses);
    this.emit('licenses_updated', licenses);
    return newLicense;
  }

  updateLicense(id: string, updates: Partial<License>): boolean {
    const licenses = this.getLicenses();
    const index = licenses.findIndex(license => license.id === id);
    if (index !== -1) {
      licenses[index] = { ...licenses[index], ...updates };
      this.secureSetItem('apex_licenses', licenses);
      this.emit('licenses_updated', licenses);
      return true;
    }
    return false;
  }

  deleteLicense(id: string): boolean {
    const licenses = this.getLicenses();
    const filtered = licenses.filter(license => license.id !== id);
    if (filtered.length !== licenses.length) {
      this.secureSetItem('apex_licenses', filtered);
      this.emit('licenses_updated', filtered);
      return true;
    }
    return false;
  }

  private generateLicenseId(category: number): string {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    return `CL-${year}-${randomNum}-T${category}`;
  }

  // Default Data
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

  // Cleanup
  destroy(): void {
    if (this.sessionCheckInterval) {
      clearInterval(this.sessionCheckInterval);
    }
  }
}

export const secureDataManager = SecureDataManager.getInstance();
