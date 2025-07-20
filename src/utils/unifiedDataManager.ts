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

interface ContentSettings {
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaSecondaryText: string;
    trustBadges: Array<{
      name: string;
      verified: boolean;
      color: string;
    }>;
    stats: Array<{
      value: string;
      label: string;
      icon: string;
      color: string;
    }>;
  };
  about: {
    title: string;
    subtitle: string;
    description: string[];
    features: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
    legalNotice: string;
  };
  features: {
    title: string;
    subtitle: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  stats: {
    title: string;
    subtitle: string;
    description: string;
    items: Array<{
      number: string;
      label: string;
      description: string;
      icon: string;
      color: string;
      bgColor: string;
    }>;
  };
  process: {
    title: string;
    subtitle: string;
    description: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
      icon: string;
    }>;
  };
  verification: {
    title: string;
    subtitle: string;
    description: string;
    verificationCards: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
    timeline: Array<{
      number: number;
      title: string;
      description: string;
      badge: string;
      isCompleted: boolean;
    }>;
  };
  whatIsLicense: {
    title: string;
    subtitle: string;
    description: string[];
    features: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
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

  // Content Management
  getContent(): ContentSettings {
    const stored = localStorage.getItem('apex_unified_content');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Content parse error:', error);
      }
    }
    return this.getDefaultContent();
  }

  updateContent(updates: Partial<ContentSettings>): ContentSettings {
    const current = this.getContent();
    const newContent = { ...current, ...updates };
    
    // Save immediately
    localStorage.setItem('apex_unified_content', JSON.stringify(newContent));
    
    // Emit with timestamp for tracking
    this.emit('content_updated', {
      content: newContent,
      timestamp: Date.now(),
      updateKeys: Object.keys(updates)
    });
    
    return newContent;
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

  private getDefaultContent(): ContentSettings {
    return {
      hero: {
        headline: "World's Leading Crypto Trading License Provider",
        subheadline: "Secure your regulatory compliance with our internationally recognized trading certificates. Join 45,000+ successful traders worldwide.",
        ctaText: "Start Your Application",
        ctaSecondaryText: "Verify License",
        trustBadges: [
          { name: 'SEC Approved', verified: true, color: 'bg-primary/10 text-primary' },
          { name: 'CFTC Certified', verified: true, color: 'bg-accent/10 text-accent' },
          { name: 'FCA Licensed', verified: true, color: 'bg-accent-emerald/10 text-accent-emerald' },
          { name: 'MiCA Compliant', verified: true, color: 'bg-accent-amber/10 text-accent-amber' }
        ],
        stats: [
          { value: '45,000+', label: 'Licensed Traders', icon: 'Users', color: 'text-primary' },
          { value: '180+', label: 'Countries Served', icon: 'Globe', color: 'text-accent' },
          { value: '99.9%', label: 'Success Rate', icon: 'Award', color: 'text-accent-emerald' },
          { value: '24/7', label: 'Support Available', icon: 'Shield', color: 'text-accent-amber' }
        ]
      },
      about: {
        title: "Ensuring Regulatory Compliance for Digital Asset Trading",
        subtitle: "About the Authority",
        description: [
          "The APEX Crypto Licensing Authority is the premier regulatory body ensuring compliance, security, and legitimacy in digital asset trading operations worldwide.",
          "Our licensing framework establishes a foundation for traders and institutions to operate within recognized legal standards, ensuring both consumer protection and market integrity."
        ],
        features: [
          {
            title: "Regulatory Protection",
            description: "Operate with confidence under our internationally recognized licensing framework.",
            icon: "Shield"
          },
          {
            title: "Verified Status",
            description: "Enhance trust with clients and platforms through verified trader status.",
            icon: "CheckCircle"
          },
          {
            title: "Official Documentation",
            description: "Receive tamper-proof documentation recognized by major trading platforms.",
            icon: "FileCheck"
          }
        ],
        legalNotice: "APEX Crypto Licensing Authority provides official licensing documentation for cryptocurrency traders and institutions based on verification of trading activity and identity. Our licenses are designed to ensure compliance with evolving digital asset regulations worldwide."
      },
      features: {
        title: "Why Choose Our Licensing Services",
        subtitle: "Our Features",
        description: "We provide comprehensive licensing solutions with unmatched expertise and support",
        items: [
          {
            title: "Fast Licensing",
            description: "Get your trading certificate quickly with our streamlined process",
            icon: "Zap"
          },
          {
            title: "Regulatory Compliance",
            description: "Ensure full adherence to local and international regulations",
            icon: "Shield"
          },
          {
            title: "Expert Assistance",
            description: "Our team guides you through every step for a hassle-free experience",
            icon: "Users"
          },
          {
            title: "Secure Document Handling",
            description: "Your sensitive information is protected with top-tier security",
            icon: "Lock"
          },
          {
            title: "Multi-Industry Support",
            description: "Suitable for businesses across various sectors",
            icon: "Building"
          },
          {
            title: "24/7 Support",
            description: "Round-the-clock assistance for all your licensing needs",
            icon: "HeadphonesIcon"
          }
        ]
      },
      stats: {
        title: "Trusted Globally",
        subtitle: "Proven Track Record",
        description: "Our track record speaks for itself - delivering excellence in regulatory compliance worldwide",
        items: [
          {
            number: "60+",
            label: "Support Countries",
            description: "Global regulatory coverage",
            icon: "Globe",
            color: "text-primary",
            bgColor: "bg-primary/10"
          },
          {
            number: "30K+",
            label: "Certifications",
            description: "Successfully issued licenses",
            icon: "Award",
            color: "text-accent",
            bgColor: "bg-accent/10"
          },
          {
            number: "15K+",
            label: "Businesses",
            description: "Trusted by companies worldwide",
            icon: "Users",
            color: "text-accent-emerald",
            bgColor: "bg-accent-emerald/10"
          },
          {
            number: "24+",
            label: "Years of Experience",
            description: "Industry expertise and knowledge",
            icon: "TrendingUp",
            color: "text-accent-amber",
            bgColor: "bg-accent-amber/10"
          }
        ]
      },
      process: {
        title: "Get Started With APEX",
        subtitle: "Simple Process",
        description: "Our seamless platform helps you obtain the necessary permits quickly and efficiently.",
        steps: [
          {
            number: "1",
            title: "Choose a Plan",
            description: "Explore and select the best licensing plan for your needs.",
            icon: "CreditCard"
          },
          {
            number: "2",
            title: "Make Payment & Upload Documents",
            description: "Securely pay for your plan and submit the required documents.",
            icon: "Upload"
          },
          {
            number: "3",
            title: "Get Certified",
            description: "Our experts process your application, ensuring quick approval.",
            icon: "Award"
          }
        ]
      },
      verification: {
        title: "Rigorous Verification Standards",
        subtitle: "Verification Process",
        description: "Our comprehensive verification process ensures only qualified traders receive official licensing, maintaining the integrity of the regulatory framework.",
        verificationCards: [
          {
            title: "Identity Verification",
            description: "Secure multi-factor identity verification using governmental databases and biometric verification systems.",
            icon: "Shield"
          },
          {
            title: "Trading History Analysis",
            description: "Comprehensive review of trading history, volume, and patterns to determine appropriate licensing category.",
            icon: "Search"
          },
          {
            title: "Compliance Review",
            description: "Assessment of trading practices against regulatory standards to ensure alignment with legal requirements.",
            icon: "Clock"
          }
        ],
        timeline: [
          {
            number: 1,
            title: "Application Submission",
            description: "Complete the application form with all required documentation and submit payment.",
            badge: "Day 1",
            isCompleted: true
          },
          {
            number: 2,
            title: "Initial Review",
            description: "Our system performs automated checks on submitted information and documentation.",
            badge: "Day 1",
            isCompleted: true
          },
          {
            number: 3,
            title: "Detailed Verification",
            description: "Our compliance team manually reviews your application, trading history, and identity documentation.",
            badge: "Day 2",
            isCompleted: false
          },
          {
            number: 4,
            title: "License Issuance",
            description: "Upon successful verification, your official license is generated and sent via email.",
            badge: "Day 3",
            isCompleted: false
          }
        ]
      },
      whatIsLicense: {
        title: "What is a Trading License?",
        subtitle: "Understanding Licensing",
        description: [
          "A crypto trading certificate is a regulatory permit that allows a company to legally operate a cryptocurrency exchange or trading platform. It ensures compliance with financial laws, anti-money laundering (AML), and know-your-customer (KYC) regulations.",
          "Requirements vary by jurisdiction, with some countries having strict licensing frameworks. Obtaining one enhances credibility and legal security for crypto businesses."
        ],
        features: [
          {
            title: "Legal Compliance",
            description: "Full adherence to financial regulations and legal requirements",
            icon: "FileText"
          },
          {
            title: "AML & KYC",
            description: "Anti-money laundering and know-your-customer compliance",
            icon: "Shield"
          },
          {
            title: "Global Recognition",
            description: "Accepted across multiple jurisdictions and platforms",
            icon: "Globe"
          },
          {
            title: "Enhanced Credibility",
            description: "Builds trust with clients and business partners",
            icon: "CheckCircle"
          }
        ]
      }
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
export type { Application, Contact, License, WebsiteSettings, ContentSettings };
