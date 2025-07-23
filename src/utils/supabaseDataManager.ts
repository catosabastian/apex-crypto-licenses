
import { supabase } from "@/integrations/supabase/client";

class SupabaseDataManager {
  private eventListeners: { [key: string]: Function[] } = {};

  // Event system for real-time updates
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

  // Initialize default content if not exists
  async initializeDefaultContent() {
    try {
      // Initialize hero content
      const heroContent = await this.getContentByKey('hero_section');
      if (!heroContent) {
        await this.updateContent('hero_section', 'homepage', {
          title: "Professional Cryptocurrency Trading Licenses",
          subtitle: "Secure Your Future in Digital Finance",
          description: "Get certified with our comprehensive cryptocurrency trading licenses. Join thousands of professionals who have advanced their careers with our industry-recognized certifications.",
          primaryCTA: "Start Application",
          secondaryCTA: "Learn More",
          stats: {
            licenses: "10,000+",
            countries: "50+",
            satisfaction: "98%"
          },
          features: [
            "Industry-recognized certifications",
            "Comprehensive trading curriculum",
            "Professional networking opportunities",
            "Ongoing regulatory updates"
          ]
        });
      }

      // Initialize all 12 license categories if not exists
      for (let i = 1; i <= 12; i++) {
        const categoryName = await this.getSetting(`category${i}_name`);
        if (!categoryName) {
          const categoryData = this.getDefaultCategoryData(i);
          await this.updateSetting(`category${i}_name`, categoryData.name);
          await this.updateSetting(`category${i}_price`, categoryData.price);
          await this.updateSetting(`category${i}_available`, categoryData.available);
          await this.updateSetting(`category${i}_status`, categoryData.status);
          await this.updateSetting(`category${i}_description`, categoryData.description);
          await this.updateSetting(`category${i}_minVolume`, categoryData.minVolume);
        }
      }
    } catch (error) {
      console.error('Error initializing default content:', error);
    }
  }

  private getDefaultCategoryData(categoryId: number) {
    const categories = {
      1: { name: 'Basic Trader', price: '$5,000', minVolume: '$50,000', description: 'Entry-level trading license for beginners' },
      2: { name: 'Standard Trader', price: '$10,000', minVolume: '$100,000', description: 'Standard trading license for regular operations' },
      3: { name: 'Advanced Trader', price: '$25,000', minVolume: '$250,000', description: 'Advanced trading license for experienced traders' },
      4: { name: 'Professional Trader', price: '$50,000', minVolume: '$500,000', description: 'Professional trading license for serious traders' },
      5: { name: 'Institutional Trader', price: '$100,000', minVolume: '$1,000,000', description: 'Institutional trading license for large operations' },
      6: { name: 'Executive Trader', price: '$250,000', minVolume: '$2,500,000', description: 'Executive trading license for premium services' },
      7: { name: 'Crypto Wallet License', price: '$75,000', minVolume: '$500,000', description: 'Cryptocurrency wallet management license' },
      8: { name: 'Fintech EMI License', price: '$150,000', minVolume: '$1,000,000', description: 'Electronic Money Institution license' },
      9: { name: 'Fintech MSP License', price: '$200,000', minVolume: '$2,000,000', description: 'Money Service Provider license' },
      10: { name: 'Gambling Online License', price: '$300,000', minVolume: '$5,000,000', description: 'Online gambling operations license' },
      11: { name: 'Gambling Lottery License', price: '$400,000', minVolume: '$10,000,000', description: 'Lottery operations license' },
      12: { name: 'Corporate Offshore License', price: '$500,000', minVolume: '$25,000,000', description: 'Offshore corporate structure license' }
    };

    return {
      ...categories[categoryId as keyof typeof categories],
      available: true,
      status: 'AVAILABLE'
    };
  }

  // Settings management
  async getSetting(key: string) {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('value')
        .eq('key', key)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return data?.value || null;
    } catch (error) {
      console.error('Error getting setting:', error);
      return null;
    }
  }

  async updateSetting(key: string, value: any) {
    try {
      const { error } = await supabase
        .from('settings')
        .upsert({
          key,
          value,
          category: 'general',
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      this.emit('settings_updated');
      return true;
    } catch (error) {
      console.error('Error updating setting:', error);
      return false;
    }
  }

  async getSettings() {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('key, value');

      if (error) throw error;

      const settings: Record<string, any> = {};
      data?.forEach(item => {
        settings[item.key] = item.value;
      });

      return settings;
    } catch (error) {
      console.error('Error getting settings:', error);
      return {};
    }
  }

  // Content management
  async getContentByKey(key: string) {
    try {
      const { data, error } = await supabase
        .from('content')
        .select('value')
        .eq('key', key)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return data?.value || null;
    } catch (error) {
      console.error('Error getting content:', error);
      return null;
    }
  }

  async updateContent(key: string, section: string, value: any) {
    try {
      const { error } = await supabase
        .from('content')
        .upsert({
          key,
          section,
          value,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      this.emit('content_updated');
      return true;
    } catch (error) {
      console.error('Error updating content:', error);
      return false;
    }
  }

  // Applications management
  async createApplication(applicationData: any) {
    try {
      const { data, error } = await supabase
        .from('applications')
        .insert([applicationData])
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error creating application:', error);
      return null;
    }
  }

  async getApplications() {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('Error getting applications:', error);
      return [];
    }
  }

  async updateApplication(id: string, updates: any) {
    try {
      const { error } = await supabase
        .from('applications')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error updating application:', error);
      return false;
    }
  }

  // Contacts management
  async createContact(contactData: any) {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([contactData])
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error creating contact:', error);
      return null;
    }
  }

  async getContacts() {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('Error getting contacts:', error);
      return [];
    }
  }

  async updateContact(id: string, updates: any) {
    try {
      const { error } = await supabase
        .from('contacts')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error updating contact:', error);
      return false;
    }
  }

  // Licenses management
  async createLicense(licenseData: any) {
    try {
      const { data, error } = await supabase
        .from('licenses')
        .insert([licenseData])
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error creating license:', error);
      return null;
    }
  }

  async getLicenses() {
    try {
      const { data, error } = await supabase
        .from('licenses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('Error getting licenses:', error);
      return [];
    }
  }

  async updateLicense(id: string, updates: any) {
    try {
      const { error } = await supabase
        .from('licenses')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error updating license:', error);
      return false;
    }
  }

  // Analytics
  async getAnalytics() {
    try {
      const [applications, contacts, licenses] = await Promise.all([
        this.getApplications(),
        this.getContacts(),
        this.getLicenses()
      ]);

      const pendingApplications = applications.filter(app => app.status === 'pending').length;
      const approvedApplications = applications.filter(app => app.status === 'approved').length;
      const activeLicenses = licenses.filter(license => license.status === 'active').length;
      const newContacts = contacts.filter(contact => contact.status === 'unread').length;

      // Calculate revenue from approved applications
      const totalRevenue = applications
        .filter(app => app.status === 'approved')
        .reduce((sum, app) => {
          const amount = parseFloat(app.amount?.replace(/[^0-9.]/g, '') || '0');
          return sum + amount;
        }, 0);

      return {
        totalApplications: applications.length,
        pendingApplications,
        approvedApplications,
        activeLicenses,
        newContacts,
        totalRevenue
      };
    } catch (error) {
      console.error('Error getting analytics:', error);
      return {
        totalApplications: 0,
        pendingApplications: 0,
        approvedApplications: 0,
        activeLicenses: 0,
        newContacts: 0,
        totalRevenue: 0
      };
    }
  }

  // Export all data
  async exportAllData() {
    try {
      const [applications, contacts, licenses] = await Promise.all([
        this.getApplications(),
        this.getContacts(),
        this.getLicenses()
      ]);

      return {
        applications,
        contacts,
        licenses
      };
    } catch (error) {
      console.error('Error exporting data:', error);
      return {
        applications: [],
        contacts: [],
        licenses: []
      };
    }
  }
}

export const supabaseDataManager = new SupabaseDataManager();
