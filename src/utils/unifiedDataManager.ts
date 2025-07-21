
import { BehaviorSubject } from 'rxjs';

// Types
export interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  country?: string;
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

export interface LicenseCategoryDetails {
  name: string;
  minVolume: string;
  features: string[];
  processingTime: string;
  platforms: string[];
  description: string;
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
  
  // License category details
  category1Details: LicenseCategoryDetails;
  category2Details: LicenseCategoryDetails;
  category3Details: LicenseCategoryDetails;
  category4Details: LicenseCategoryDetails;
  category5Details: LicenseCategoryDetails;
  category6Details: LicenseCategoryDetails;
  
  // Payment addresses - standardized and consistent
  bitcoinAddress: string;
  ethereumAddress: string;
  usdtTronAddress: string;
  usdtEthereumAddress: string;
  xrpAddress: string;
  
  // Contact information
  contactEmail: string;
  contactPhone: string;
  supportEmail: string;
  salesEmail: string;
  companyAddress: string;
  companyName: string;
  website: string;
  city: string;
  country: string;
  
  // Performance metrics (now dynamic)
  processingTime: string;
  successRate: string;
  totalLicensed: string;
  countriesServed: string;
  
  // Social media links
  twitterUrl: string;
  linkedinUrl: string;
  telegramUrl: string;
  
  // Enterprise settings
  enterpriseMinAmount: string;
  enterpriseContactEmail: string;
  enterpriseFeatures: string[];
}

export interface Analytics {
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  activeLicenses: number;
  totalRevenue: number;
  newContacts: number;
}

// Default content structure with dynamic capabilities
const defaultContent = {
  hero: {
    headline: "World's Leading Crypto Trading License Provider",
    subheadline: "Get your official cryptocurrency trading license from a globally recognized regulatory authority. Fast, secure, and compliant with international standards.",
    ctaText: "Get Licensed Now",
    ctaSecondaryText: "Verify License",
    stats: [
      { icon: 'Users', value: '10,000+', label: 'Licensed Traders', color: 'text-blue-500' },
      { icon: 'Globe', value: '150+', label: 'Countries Served', color: 'text-green-500' },
      { icon: 'Award', value: '99.9%', label: 'Success Rate', color: 'text-purple-500' },
      { icon: 'Shield', value: '24/7', label: 'Support Available', color: 'text-orange-500' }
    ],
    trustBadges: [
      { name: 'ISO Certified', color: 'bg-green-50' },
      { name: 'Regulatory Approved', color: 'bg-blue-50' },
      { name: 'Globally Recognized', color: 'bg-purple-50' },
      { name: 'Secure Platform', color: 'bg-orange-50' }
    ]
  },
  about: {
    subtitle: "About Our Authority",
    title: "The Global Standard for Crypto Trading Compliance",
    description: [
      "As the world's leading cryptocurrency regulatory authority, we provide comprehensive licensing solutions for traders, exchanges, and financial institutions operating in the digital asset space.",
      "Our licenses are recognized globally and ensure full compliance with international cryptocurrency trading regulations, giving you the confidence to operate legally in any jurisdiction."
    ],
    features: [
      {
        icon: 'Shield',
        title: 'Regulatory Compliance',
        description: 'Full compliance with international crypto trading laws and regulations.'
      },
      {
        icon: 'CheckCircle',
        title: 'Global Recognition',
        description: 'Our licenses are accepted and recognized in over 150 countries worldwide.'
      },
      {
        icon: 'FileCheck',
        title: 'Legal Protection',
        description: 'Complete legal protection for your trading activities and business operations.'
      }
    ],
    legalNotice: "This regulatory authority is duly authorized to issue cryptocurrency trading licenses under international financial regulations. All licenses issued are legally binding and provide full regulatory compliance for cryptocurrency trading activities."
  },
  features: {
    subtitle: "Why Choose Us",
    title: "Comprehensive Licensing Solutions",
    description: "Our platform offers everything you need to obtain and maintain your cryptocurrency trading license.",
    items: [
      {
        icon: 'Zap',
        title: 'Fast Processing',
        description: 'Get your license approved in as little as 24 hours with our streamlined process.'
      },
      {
        icon: 'Shield',
        title: 'Secure & Compliant',
        description: 'Bank-level security with full regulatory compliance and legal backing.'
      },
      {
        icon: 'Users',
        title: 'Expert Support',
        description: '24/7 dedicated support from our team of regulatory and compliance experts.'
      },
      {
        icon: 'Lock',
        title: 'Data Protection',
        description: 'Your sensitive information is protected with military-grade encryption.'
      },
      {
        icon: 'Building',
        title: 'Institutional Grade',
        description: 'Solutions designed for both individual traders and large institutions.'
      },
      {
        icon: 'HeadphonesIcon',
        title: 'Ongoing Support',
        description: 'Continuous support and guidance throughout your licensing journey.'
      }
    ]
  },
  stats: {
    subtitle: "Our Impact",
    title: "Trusted by Thousands Worldwide",
    description: "Join the growing community of licensed cryptocurrency traders and institutions.",
    items: [
      {
        icon: 'TrendingUp',
        number: '15,000+',
        label: 'Active Licenses',
        description: 'Currently active trading licenses',
        bgColor: 'bg-primary/10',
        color: 'text-primary'
      },
      {
        icon: 'Users',
        number: '8,500+',
        label: 'Licensed Traders',
        description: 'Individual traders licensed',
        bgColor: 'bg-accent-emerald/10',
        color: 'text-accent-emerald'
      },
      {
        icon: 'Globe',
        number: '180+',
        label: 'Countries',
        description: 'Global market coverage',
        bgColor: 'bg-accent-amber/10',
        color: 'text-accent-amber'
      },
      {
        icon: 'Award',
        number: '99.8%',
        label: 'Success Rate',
        description: 'Application approval rate',
        bgColor: 'bg-accent/10',
        color: 'text-accent'
      }
    ],
    trustIndicator: {
      title: "Regulatory Authority Certification",
      description: "All licenses are issued under the authority of international cryptocurrency regulatory frameworks and are legally binding in participating jurisdictions."
    }
  },
  process: {
    subtitle: "How It Works",
    title: "Simple 3-Step Process",
    description: "Getting your cryptocurrency trading license is easier than ever with our streamlined process.",
    steps: [
      {
        number: 1,
        icon: 'CreditCard',
        title: 'Submit Application',
        description: 'Complete our secure online application form with your details and trading requirements.'
      },
      {
        number: 2,
        icon: 'Upload',
        title: 'Document Review',
        description: 'Our compliance team reviews your application and supporting documents within 24 hours.'
      },
      {
        number: 3,
        icon: 'Award',
        title: 'License Issued',
        description: 'Receive your official cryptocurrency trading license and start trading legally.'
      }
    ],
    ctaText: "Start Your Application"
  },
  verification: {
    subtitle: "License Verification",
    title: "Verify Any Trading License",
    description: "Use our secure verification system to check the authenticity of any cryptocurrency trading license.",
    cards: [
      {
        icon: 'Shield',
        title: 'Secure Verification',
        description: 'Advanced cryptographic verification ensures authenticity.'
      },
      {
        icon: 'Search',
        title: 'Instant Results',
        description: 'Get verification results in seconds with our real-time system.'
      },
      {
        icon: 'Clock',
        title: 'Always Available',
        description: 'Our verification system is available 24/7 for your convenience.'
      }
    ],
    timeline: {
      title: "Verification Process Timeline",
      steps: [
        {
          number: 1,
          title: 'License Submission',
          description: 'Submit your license ID for verification',
          badge: 'Instant',
          isCompleted: true
        },
        {
          number: 2,
          title: 'Database Check',
          description: 'System checks our secure license database',
          badge: '< 5 seconds',
          isCompleted: true
        },
        {
          number: 3,
          title: 'Verification Result',
          description: 'Receive detailed verification report',
          badge: 'Complete',
          isCompleted: true
        }
      ]
    }
  },
  whatIsLicense: {
    subtitle: "Understanding Licenses",
    title: "What is a Crypto Trading License?",
    description: [
      "A cryptocurrency trading license is an official authorization that allows individuals and organizations to legally trade digital assets in compliance with regulatory requirements.",
      "Our licenses provide comprehensive legal coverage, ensuring your trading activities are fully compliant with international cryptocurrency regulations and local jurisdiction requirements."
    ],
    features: [
      {
        icon: 'Shield',
        title: 'Legal Protection',
        description: 'Complete legal framework for your trading operations'
      },
      {
        icon: 'FileText',
        title: 'Regulatory Compliance',
        description: 'Full compliance with international crypto regulations'
      },
      {
        icon: 'Globe',
        title: 'Global Recognition',
        description: 'Accepted in 180+ countries worldwide'
      },
      {
        icon: 'CheckCircle',
        title: 'Verified Status',
        description: 'Officially verified and registered license status'
      }
    ],
    ctaText: "Apply for License"
  }
};

class UnifiedDataManager {
  private storageKey = 'apex_unified_data';
  private settingsKey = 'apex_settings';
  private contentKey = 'apex_content';
  private eventListeners: { [key: string]: Function[] } = {};
  
  // Updated comprehensive default settings
  private defaultSettings: ContentSettings = {
    // License pricing
    category1Price: '10,000 USDT',
    category2Price: '25,000 USDT',
    category3Price: '50,000 USDT',
    category4Price: '100,000 USDT',
    category5Price: '250,000 USDT',
    category6Price: '500,000 USDT',
    
    // Availability
    category1Available: true,
    category2Available: true,
    category3Available: true,
    category4Available: true,
    category5Available: true,
    category6Available: true,
    
    // License category details
    category1Details: {
      name: 'Basic Trader',
      minVolume: '$50,000',
      features: ['Basic trading rights', 'Standard compliance', 'Email support'],
      processingTime: '24-48 hours',
      platforms: ['Binance', 'Coinbase'],
      description: 'Entry-level license for individual traders'
    },
    category2Details: {
      name: 'Standard Trader',
      minVolume: '$100,000',
      features: ['Extended trading rights', 'Enhanced compliance', 'Priority support'],
      processingTime: '12-24 hours',
      platforms: ['Binance', 'Coinbase', 'Kraken'],
      description: 'Standard license for active traders'
    },
    category3Details: {
      name: 'Advanced Trader',
      minVolume: '$250,000',
      features: ['Advanced trading rights', 'Full compliance suite', 'Phone support'],
      processingTime: '6-12 hours',
      platforms: ['Binance', 'Coinbase', 'Kraken', 'KuCoin'],
      description: 'Advanced license for professional traders'
    },
    category4Details: {
      name: 'Professional Trader',
      minVolume: '$500,000',
      features: ['Professional trading rights', 'Premium compliance', 'Dedicated support'],
      processingTime: '3-6 hours',
      platforms: ['Binance', 'Coinbase', 'Kraken', 'KuCoin', 'Bybit'],
      description: 'Professional license for high-volume traders'
    },
    category5Details: {
      name: 'Institutional Trader',
      minVolume: '$1,000,000+',
      features: ['Institutional trading rights', 'Enterprise compliance', 'Account manager'],
      processingTime: '1-3 hours',
      platforms: ['All major exchanges', 'OTC desks', 'Institutional platforms'],
      description: 'Institutional license for large organizations'
    },
    category6Details: {
      name: 'Executive Trader',
      minVolume: '$2,500,000+',
      features: ['Executive trading rights', 'White-glove service', 'Custom solutions'],
      processingTime: '1 hour',
      platforms: ['All exchanges', 'Private markets', 'Exclusive access'],
      description: 'Executive license for ultra-high-net-worth clients'
    },
    
    // Standardized payment addresses (real format examples - admins should replace)
    bitcoinAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    ethereumAddress: '0x742d35Cc6663C65C926d75d60e3B3d97c8a0e0e0',
    usdtTronAddress: 'TG3XXyExBkPp9nzdajDGFahC9nyKERJpUN',
    usdtEthereumAddress: '0x742d35Cc6663C65C926d75d60e3B3d97c8a0e0e0',
    xrpAddress: 'rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH',
    
    // Contact information
    contactEmail: 'info@apexlicensing.com',
    contactPhone: '+1 (555) 123-4567',
    supportEmail: 'support@apexlicensing.com',
    salesEmail: 'sales@apexlicensing.com',
    companyAddress: '123 Business District, Financial City, FC 12345',
    companyName: 'APEX Crypto Licensing Regulatory',
    website: 'https://apexcrypto.reg',
    city: 'Financial City, FC 12345',
    country: 'United States',
    
    // Performance metrics (now dynamic)
    processingTime: '18 hours avg',
    successRate: '99.9%',
    totalLicensed: '15,000+',
    countriesServed: '180+',
    
    // Social media links
    twitterUrl: 'https://twitter.com/apexcrypto',
    linkedinUrl: 'https://linkedin.com/company/apexcrypto',
    telegramUrl: 'https://t.me/apexcrypto',
    
    // Enterprise settings
    enterpriseMinAmount: '1,000,000 USDT',
    enterpriseContactEmail: 'enterprise@apexlicensing.com',
    enterpriseFeatures: [
      'Custom compliance solutions',
      'Dedicated account manager',
      'Priority processing',
      'Bulk licensing discounts',
      'White-label solutions'
    ]
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
      
      // Initialize content if it doesn't exist
      const existingContent = localStorage.getItem(this.contentKey);
      if (!existingContent) {
        this.updateContent(defaultContent);
        console.log('[UnifiedDataManager] Initialized with default content');
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
      // Fallback: ensure we have valid settings and content
      this.updateSettings(this.defaultSettings);
      this.updateContent(defaultContent);
    }
  }

  // Content management
  getContent(): any {
    try {
      const content = localStorage.getItem(this.contentKey);
      if (content) {
        const parsed = JSON.parse(content);
        // Merge with defaults to ensure all properties exist
        return { ...defaultContent, ...parsed };
      }
    } catch (error) {
      console.error('[UnifiedDataManager] Failed to get content:', error);
    }
    return defaultContent;
  }

  updateContent(updates: any): any {
    try {
      const currentContent = this.getContent();
      const newContent = { ...currentContent, ...updates };
      
      localStorage.setItem(this.contentKey, JSON.stringify(newContent));
      console.log('[UnifiedDataManager] Content updated:', newContent);
      
      // Emit update event
      this.emit('content_updated', { content: newContent });
      
      return newContent;
    } catch (error) {
      console.error('[UnifiedDataManager] Failed to update content:', error);
      throw error;
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
      localStorage.removeItem(this.contentKey);
      this.initializeData();
      console.log('[UnifiedDataManager] Reset to defaults completed');
      this.emit('settings_updated', { settings: this.defaultSettings });
      this.emit('content_updated', { content: defaultContent });
    } catch (error) {
      console.error('[UnifiedDataManager] Failed to reset:', error);
    }
  }
}

export const unifiedDataManager = new UnifiedDataManager();
