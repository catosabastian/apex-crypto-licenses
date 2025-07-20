
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { secureDataManager, WebsiteSettings } from '@/utils/secureDataManager';
import { dataMigration } from '@/utils/dataMigration';
import { crossTabCommunication } from '@/utils/crossTabCommunication';
import PersonalInfoSection from '@/components/form/PersonalInfoSection';
import LicenseCategorySection from '@/components/form/LicenseCategorySection';
import PaymentInfoSection from '@/components/form/PaymentInfoSection';
import AdditionalInfoSection from '@/components/form/AdditionalInfoSection';

interface ApplicationFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  category: string;
  notes: string;
}

const SecureDynamicApplicationForm = () => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    category: '',
    notes: ''
  });
  
  const [settings, setSettings] = useState<WebsiteSettings>(secureDataManager.getSettings());
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateCount, setUpdateCount] = useState(0);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());

  useEffect(() => {
    console.log('[SecureDynamicApplicationForm] Component mounted, setting up bulletproof event listeners');
    
    // Ensure data migration runs
    if (dataMigration.isMigrationNeeded()) {
      dataMigration.migrateToSecureStorage();
    }

    // BULLETPROOF SETTINGS UPDATE HANDLER
    const handleSettingsUpdate = (updatedSettings: WebsiteSettings) => {
      console.log('[SecureDynamicApplicationForm] Settings update received:', updatedSettings);
      setSettings(updatedSettings);
      setUpdateCount(prev => prev + 1);
      setLastUpdateTime(new Date());
      
      toast({
        title: "Pricing Updated",
        description: "Latest pricing and availability loaded automatically",
      });
    };

    const handleForceRefresh = (updatedSettings: WebsiteSettings) => {
      console.log('[SecureDynamicApplicationForm] Force refresh received:', updatedSettings);
      setSettings(updatedSettings);
      setUpdateCount(prev => prev + 1);
      setLastUpdateTime(new Date());
    };

    const handleEmergencySync = (updatedSettings: WebsiteSettings) => {
      console.log('[SecureDynamicApplicationForm] Emergency sync received:', updatedSettings);
      setSettings(updatedSettings);
      setUpdateCount(prev => prev + 1);
      setLastUpdateTime(new Date());
      
      toast({
        title: "Emergency Sync",
        description: "Settings forcibly synchronized from admin",
      });
    };

    // Register with secureDataManager
    secureDataManager.addEventListener('settings_updated', handleSettingsUpdate);
    secureDataManager.addEventListener('settings_force_refresh', handleForceRefresh);
    
    // Register with cross-tab communication
    crossTabCommunication.addEventListener('settings_updated', handleSettingsUpdate);
    crossTabCommunication.addEventListener('settings_force_refresh', handleForceRefresh);
    crossTabCommunication.addEventListener('emergency_settings_sync', handleEmergencySync);

    // Aggressive polling fallback (every 2 seconds)
    const aggressivePolling = setInterval(() => {
      try {
        const currentSettings = secureDataManager.getSettings();
        const settingsChanged = JSON.stringify(currentSettings) !== JSON.stringify(settings);
        
        if (settingsChanged) {
          console.log('[SecureDynamicApplicationForm] Polling detected settings change');
          setSettings(currentSettings);
          setUpdateCount(prev => prev + 1);
          setLastUpdateTime(new Date());
        }
      } catch (error) {
        console.error('[SecureDynamicApplicationForm] Polling error:', error);
      }
    }, 2000);

    // Force initial refresh
    setTimeout(() => {
      const freshSettings = secureDataManager.getSettings();
      console.log('[SecureDynamicApplicationForm] Initial force refresh:', freshSettings);
      setSettings(freshSettings);
    }, 100);

    return () => {
      console.log('[SecureDynamicApplicationForm] Cleaning up event listeners');
      secureDataManager.removeEventListener('settings_updated', handleSettingsUpdate);
      secureDataManager.removeEventListener('settings_force_refresh', handleForceRefresh);
      crossTabCommunication.removeEventListener('settings_updated', handleSettingsUpdate);
      crossTabCommunication.removeEventListener('settings_force_refresh', handleForceRefresh);
      crossTabCommunication.removeEventListener('emergency_settings_sync', handleEmergencySync);
      clearInterval(aggressivePolling);
    };
  }, []);

  const licenseCategories = [
    { id: '1', name: 'Basic Trader', price: settings.category1Price, available: settings.category1Available, minVolume: '$50,000' },
    { id: '2', name: 'Standard Trader', price: settings.category2Price, available: settings.category2Available, minVolume: '$100,000' },
    { id: '3', name: 'Advanced Trader', price: settings.category3Price, available: settings.category3Available, minVolume: '$250,000' },
    { id: '4', name: 'Professional Trader', price: settings.category4Price, available: settings.category4Available, minVolume: '$500,000' },
    { id: '5', name: 'Institutional Trader', price: settings.category5Price, available: settings.category5Available, minVolume: '$1,000,000+' },
    { id: '6', name: 'Executive Trader', price: settings.category6Price, available: settings.category6Available, minVolume: '$2,500,000+' }
  ];

  const handleFieldChange = (field: string, value: string) => {
    console.log(`[SecureDynamicApplicationForm] ${field} changed:`, value);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCopyAddress = (address: string, type: string) => {
    console.log('[SecureDynamicApplicationForm] Copying address:', type, address);
    navigator.clipboard.writeText(address);
    setCopiedAddress(type);
    toast({
      title: "Address Copied",
      description: `${type} address copied to clipboard`,
    });
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[SecureDynamicApplicationForm] Form submission started');
    
    setIsSubmitting(true);

    try {
      if (!formData.name || !formData.email || !formData.category) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields (Name, Email, and License Category)",
          variant: "destructive",
        });
        return;
      }

      const selectedCategory = licenseCategories.find(cat => cat.id === formData.category);
      
      if (selectedCategory && !selectedCategory.available) {
        toast({
          title: "Category Unavailable",
          description: "The selected license category is currently sold out. Please choose an available category.",
          variant: "destructive",
        });
        return;
      }
      
      const newApplication = secureDataManager.addApplication({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        category: selectedCategory?.name || `Category ${formData.category}`,
        status: 'pending' as const,
        amount: selectedCategory?.price || '0',
        documents: [],
        notes: formData.notes
      });

      console.log('[SecureDynamicApplicationForm] Application submitted successfully:', newApplication);

      toast({
        title: "Application Submitted Successfully",
        description: `Your application has been submitted. Application ID: ${newApplication.id}`,
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        category: '',
        notes: ''
      });
    } catch (error) {
      console.error('[SecureDynamicApplicationForm] Application submission error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCategory = licenseCategories.find(cat => cat.id === formData.category);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Trading License Application</h2>
        <p className="text-muted-foreground">Submit your application for cryptocurrency trading certification</p>
        <div className="flex items-center justify-center gap-4 mt-2">
          <p className="text-xs text-green-600">
            ✓ Real-time sync active (Updates: {updateCount})
          </p>
          <p className="text-xs text-blue-600">
            Last update: {lastUpdateTime.toLocaleTimeString()}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <PersonalInfoSection 
          formData={formData}
          onChange={handleFieldChange}
        />

        <LicenseCategorySection
          categories={licenseCategories}
          selectedCategory={formData.category}
          onCategorySelect={(categoryId) => handleFieldChange('category', categoryId)}
        />

        <PaymentInfoSection
          selectedCategory={selectedCategory ? { name: selectedCategory.name, price: selectedCategory.price } : null}
          settings={settings}
          copiedAddress={copiedAddress}
          onCopyAddress={handleCopyAddress}
        />

        <AdditionalInfoSection
          notes={formData.notes}
          onNotesChange={(value) => handleFieldChange('notes', value)}
        />

        <div className="flex justify-center pt-4">
          <Button
            type="submit"
            size="lg"
            className="px-12 py-6 text-lg btn-primary"
            disabled={!formData.name || !formData.email || !formData.category || isSubmitting || (selectedCategory && !selectedCategory.available)}
          >
            {isSubmitting ? (
              <>
                <div className="loading-spinner w-5 h-5 mr-2"></div>
                Submitting...
              </>
            ) : (
              'Submit Application'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SecureDynamicApplicationForm;
