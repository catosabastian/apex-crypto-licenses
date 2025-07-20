import { BehaviorSubject } from 'rxjs';

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  licenseType: string;
  status: string;
  date: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  date: string;
}

interface License {
  id: string;
  holder: string;
  type: string;
  issueDate: string;
  expiryDate: string;
  status: string;
  platforms: string;
}

export interface ContentSettings {
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaSecondaryText: string;
    stats: Array<{
      value: string;
      label: string;
      icon: string;
      color: string;
    }>;
    trustBadges: Array<{
      name: string;
      color: string;
    }>;
  };
  about: {
    subtitle: string;
    title: string;
    description: string[];
    legalNotice: string;
    features: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  whatIsLicense: {
    subtitle: string;
    title: string;
    description: string[];
    ctaText: string;
    features: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  process: {
    subtitle: string;
    title: string;
    description: string;
    ctaText: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
      icon: string;
    }>;
  };
  features: {
    subtitle: string;
    title: string;
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
    trustIndicator: {
      title: string;
      description: string;
    };
  };
  verification: {
    subtitle: string;
    title: string;
    description: string;
    cards: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
    timeline: {
      title: string;
      steps: Array<{
        number: number;
        title: string;
        description: string;
        badge: string;
        isCompleted: boolean;
      }>;
    };
    sampleLicense: {
      title: string;
      description: string;
    };
  };
}

interface AnalyticsData {
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  totalRevenue: number;
  newContacts: number;
  activeLicenses: number;
}

interface SettingsData {
  applicationFee: number;
  licenseFee: number;
  renewalFee: number;
  taxRate: number;
  supportEmail: string;
  companyName: string;
  category1Price: string;
  category1Available: boolean;
  category2Price: string;
  category2Available: boolean;
  category3Price: string;
  category3Available: boolean;
  category4Price: string;
  category4Available: boolean;
  category5Price: string;
  category5Available: boolean;
  category6Price: string;
  category6Available: boolean;
  bitcoinAddress: string;
  ethereumAddress: string;
  usdtAddress: string;
}

class DataManager {
  private listeners: { [event: string]: Function[] } = {};
  private applicationsSubject = new BehaviorSubject<Application[]>(this.getDefaultApplications());
  private contactsSubject = new BehaviorSubject<Contact[]>(this.getDefaultContacts());
  private licensesSubject = new BehaviorSubject<License[]>(this.getDefaultLicenses());

  // Event Listener Methods
  addEventListener(event: string, listener: Function): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  removeEventListener(event: string, listener: Function): void {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(l => l !== listener);
    }
  }

  private notifyListeners(event: string, data?: any): void {
    if (this.listeners[event]) {
      this.listeners[event].forEach(listener => listener(data));
    }
  }

  // Application Management Methods
  getApplications(): Application[] {
    const stored = localStorage.getItem('apex_applications');
    return stored ? JSON.parse(stored) : this.getDefaultApplications();
  }

  addApplication(application: Omit<Application, 'id' | 'date'>): Application {
    const newApplication: Application = {
      ...application,
      id: `APP-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    const applications = [...this.getApplications(), newApplication];
    localStorage.setItem('apex_applications', JSON.stringify(applications));
    this.applicationsSubject.next(applications);
    this.notifyListeners('application_added', newApplication);
    return newApplication;
  }

  updateApplication(id: string, updates: Partial<Application>): void {
    const applications = this.getApplications().map(app =>
      app.id === id ? { ...app, ...updates } : app
    );
    localStorage.setItem('apex_applications', JSON.stringify(applications));
    this.applicationsSubject.next(applications);
    this.notifyListeners('application_updated', { id, updates });
  }

  deleteApplication(id: string): void {
    const applications = this.getApplications().filter(app => app.id !== id);
    localStorage.setItem('apex_applications', JSON.stringify(applications));
    this.applicationsSubject.next(applications);
    this.notifyListeners('application_deleted', id);
  }

  private getDefaultApplications(): Application[] {
    return [
      {
        id: 'APP-2024-0001',
        name: 'Alice Johnson',
        email: 'alice.j@example.com',
        phone: '555-0001',
        company: 'Tech Corp',
        country: 'USA',
        licenseType: 'Basic',
        status: 'Pending',
        date: '2024-05-01'
      },
      {
        id: 'APP-2024-0002',
        name: 'Bob Williams',
        email: 'bob.w@example.com',
        phone: '555-0002',
        company: 'Trading LLC',
        country: 'Canada',
        licenseType: 'Standard',
        status: 'Approved',
        date: '2024-05-01'
      },
    ];
  }

  // Contact Management Methods
  getContacts(): Contact[] {
    const stored = localStorage.getItem('apex_contacts');
    return stored ? JSON.parse(stored) : this.getDefaultContacts();
  }

  addContact(contact: Contact): void {
    const contacts = [...this.getContacts(), contact];
    localStorage.setItem('apex_contacts', JSON.stringify(contacts));
    this.contactsSubject.next(contacts);
    this.notifyListeners('contact_added', contact);
  }

   updateContact(id: string, updates: Partial<Contact>): void {
    const contacts = this.getContacts().map(contact =>
      contact.id === id ? { ...contact, ...updates } : contact
    );
    localStorage.setItem('apex_contacts', JSON.stringify(contacts));
    this.contactsSubject.next(contacts);
    this.notifyListeners('contact_updated', { id, updates });
  }

  deleteContact(id: string): void {
    const contacts = this.getContacts().filter(contact => contact.id !== id);
    localStorage.setItem('apex_contacts', JSON.stringify(contacts));
    this.contactsSubject.next(contacts);
    this.notifyListeners('contact_deleted', id);
  }

  private getDefaultContacts(): Contact[] {
    return [
      {
        id: 'CON-2024-0001',
        name: 'Charlie Brown',
        email: 'charlie.b@example.com',
        message: 'Inquiry about licensing',
        status: 'New',
        date: '2024-05-02'
      },
      {
        id: 'CON-2024-0002',
        name: 'Diana Green',
        email: 'diana.g@example.com',
        message: 'Question about application process',
        status: 'Replied',
        date: '2024-05-02'
      },
    ];
  }

  // License Management Methods
  getLicenses(): License[] {
    const stored = localStorage.getItem('apex_licenses');
    return stored ? JSON.parse(stored) : this.getDefaultLicenses();
  }

  addLicense(license: License): void {
    const licenses = [...this.getLicenses(), license];
    localStorage.setItem('apex_licenses', JSON.stringify(licenses));
    this.licensesSubject.next(licenses);
    this.notifyListeners('license_added', license);
  }

  updateLicense(id: string, updates: Partial<License>): void {
    const licenses = this.getLicenses().map(license =>
      license.id === id ? { ...license, ...updates } : license
    );
    localStorage.setItem('apex_licenses', JSON.stringify(licenses));
    this.licensesSubject.next(licenses);
    this.notifyListeners('license_updated', { id, updates });
  }

  deleteLicense(id: string): void {
    const licenses = this.getLicenses().filter(license => license.id !== id);
    localStorage.setItem('apex_licenses', JSON.stringify(licenses));
    this.licensesSubject.next(licenses);
    this.notifyListeners('license_deleted', id);
  }

  private getDefaultLicenses(): License[] {
    return [
      {
        id: 'LIC-2024-0001',
        holder: 'Eve White',
        type: 'Premium',
        issueDate: '2024-05-03',
        expiryDate: '2025-05-03',
        status: 'Active',
        platforms: 'All'
      },
      {
        id: 'LIC-2024-0002',
        holder: 'Frank Black',
        type: 'Standard',
        issueDate: '2024-05-03',
        expiryDate: '2025-05-03',
        status: 'Inactive',
        platforms: 'Limited'
      },
    ];
  }

  // Settings Management Methods
  getSettings(): SettingsData {
    const stored = localStorage.getItem('apex_settings');
    return stored ? JSON.parse(stored) : this.getDefaultSettings();
  }

  updateSettings(updates: Partial<SettingsData>): SettingsData {
    const currentSettings = this.getSettings();
    const newSettings = { ...currentSettings, ...updates };
    localStorage.setItem('apex_settings', JSON.stringify(newSettings));
    this.notifyListeners('settings_updated', { settings: newSettings });
    return newSettings;
  }

  private getDefaultSettings(): SettingsData {
    return {
      applicationFee: 100,
      licenseFee: 500,
      renewalFee: 200,
      taxRate: 0.05,
      supportEmail: 'support@apex.com',
      companyName: 'Apex Regulations Ltd',
      category1Price: '$99',
      category1Available: true,
      category2Price: '$199',
      category2Available: true,
      category3Price: '$399',
      category3Available: true,
      category4Price: '$799',
      category4Available: true,
      category5Price: '$1,599',
      category5Available: true,
      category6Price: '$3,199',
      category6Available: true,
      bitcoinAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      ethereumAddress: '0x0000000000000000000000000000000000000000',
      usdtAddress: 'TQn9Y2khEsLJuQgZiKfSTjJXy6QLykqSSi'
    };
  }

  // Analytics Methods
  getAnalytics(): AnalyticsData {
    const applications = this.getApplications();
    const licenses = this.getLicenses();
    const contacts = this.getContacts();
    const settings = this.getSettings();

    const totalRevenue = licenses.length * settings.licenseFee;
    const pendingApplications = applications.filter(app => app.status === 'Pending').length;
    const approvedApplications = applications.filter(app => app.status === 'Approved').length;
    const activeLicenses = licenses.filter(license => license.status === 'Active').length;
    const newContacts = contacts.filter(contact => contact.status === 'New').length;

    return {
      totalApplications: applications.length,
      pendingApplications: pendingApplications,
      approvedApplications: approvedApplications,
      totalRevenue: totalRevenue,
      newContacts: newContacts,
      activeLicenses: activeLicenses
    };
  }

  // Content Management Methods
  getContent(): ContentSettings {
    const stored = localStorage.getItem('apex_content_settings');
    if (stored) {
      return JSON.parse(stored);
    }
    
    return this.getDefaultContent();
  }

  updateContent(updates: Partial<ContentSettings>): void {
    const currentContent = this.getContent();
    const newContent = { ...currentContent, ...updates };
    localStorage.setItem('apex_content_settings', JSON.stringify(newContent));
    this.notifyListeners('content_updated');
  }

  private getDefaultContent(): ContentSettings {
    return {
      hero: {
        headline: "World's Leading Crypto Trading License Provider",
        subheadline: "Get your official cryptocurrency trading license with our streamlined regulatory compliance process. Join thousands of certified traders worldwide.",
        ctaText: "Get Licensed Now",
        ctaSecondaryText: "Verify License",
        stats: [
          { value: "15K+", label: "Licensed Traders", icon: "Users", color: "text-primary" },
          { value: "60+", label: "Countries", icon: "Globe", color: "text-accent" },
          { value: "99.9%", label: "Success Rate", icon: "Award", color: "text-accent-emerald" },
          { value: "24/7", label: "Support", icon: "Shield", color: "text-accent-amber" }
        ],
        trustBadges: [
          { name: "ISO Certified", color: "bg-accent-emerald/10" },
          { name: "GDPR Compliant", color: "bg-primary/10" },
          { name: "SSL Secured", color: "bg-accent/10" },
          { name: "24/7 Support", color: "bg-accent-amber/10" }
        ]
      },
      about: {
        subtitle: "About APEX",
        title: "The Leading Cryptocurrency Trading License Authority",
        description: [
          "APEX is a globally recognized regulatory authority specializing in cryptocurrency trading licenses and compliance. We provide comprehensive licensing solutions that ensure traders and businesses operate within legal frameworks across multiple jurisdictions.",
          "Our expert team has processed thousands of applications, maintaining the highest standards of regulatory compliance while streamlining the certification process for our clients."
        ],
        legalNotice: "APEX operates as an independent regulatory body. All licenses issued are subject to local jurisdiction requirements and ongoing compliance obligations.",
        features: [
          {
            title: "Global Recognition",
            description: "Our licenses are recognized and accepted by major exchanges worldwide",
            icon: "Shield"
          },
          {
            title: "Fast Processing",
            description: "Average processing time of 2-3 business days for complete applications",
            icon: "CheckCircle"
          },
          {
            title: "Full Compliance",
            description: "Comprehensive regulatory framework ensuring full legal compliance",
            icon: "FileCheck"
          }
        ]
      },
      whatIsLicense: {
        subtitle: "Understanding Licensing",
        title: "What is a Trading License?",
        ctaText: "Get Certified",
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
      },
      process: {
        subtitle: "Simple Process",
        title: "Get Started With APEX",
        description: "Our seamless platform helps you obtain the necessary permits quickly and efficiently.",
        ctaText: "Start Your Application",
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
      features: {
        subtitle: "Our Features",
        title: "Why Choose Our Licensing Services",
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
        ],
        trustIndicator: {
          title: "Regulatory Excellence",
          description: "Certified by leading regulatory bodies worldwide, ensuring the highest standards of compliance and security for all our licensed traders."
        }
      },
      verification: {
        subtitle: "Verification Process",
        title: "Rigorous Verification Standards",
        description: "Our comprehensive verification process ensures only qualified traders receive official licensing, maintaining the integrity of the regulatory framework.",
        cards: [
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
        timeline: {
          title: "Verification Timeline",
          steps: [
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
        sampleLicense: {
          title: "Sample License Verification",
          description: "Try verifying this sample license to see how the system works"
        }
      }
    };
  }
}

export const unifiedDataManager = new DataManager();

// Legacy alias for backward compatibility
export type WebsiteSettings = ContentSettings;
