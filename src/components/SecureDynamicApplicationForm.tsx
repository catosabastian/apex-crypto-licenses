
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { secureDataManager, WebsiteSettings } from '@/utils/secureDataManager';
import { dataMigration } from '@/utils/dataMigration';
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
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'syncing' | 'error'>('connected');

  useEffect(() => {
    console.log('[SecureDynamicApplicationForm] Component mounted, setting up event listeners');
    
    // Ensure data migration runs
    if (dataMigration.isMigrationNeeded()) {
      dataMigration.migrateToSecureStorage();
    }

    // Enhanced settings update handler with comprehensive logging
    const handleSettingsUpdate = (updatedSettings: WebsiteSettings) => {
      console.log('[SecureDynamicApplicationForm] Settings update received:', updatedSettings);
      setSettings(updatedSettings);
      setUpdateCount(prev => prev + 1);
      setConnectionStatus('syncing');
      
      setTimeout(() => setConnectionStatus('connected'), 1000);
      
      toast({
        title: "Settings Updated",
        description: "Pricing and availability have been refreshed automatically",
      });
    };

    const handleForceUpdate = (updatedSettings: WebsiteSettings) => {
      console.log('[SecureDynamicApplicationForm] Force update received:', updatedSettings);
      setSettings(updatedSettings);
      setUpdateCount(prev => prev + 1);
      setConnectionStatus('syncing');
      setTimeout(() => setConnectionStatus('connected'), 500);
    };

    const handleBackupUpdate = (updatedSettings: WebsiteSettings) => {
      console.log('[SecureDynamicApplicationForm] Backup update received:', updatedSettings);
      setSettings(updatedSettings);
      setUpdateCount(prev => prev + 1);
    };

    // Register multiple event listeners for robust updates
    secureDataManager.addEventListener('settings_updated', handleSettingsUpdate);
    secureDataManager.addEventListener('settings_force_update', handleForceUpdate);
    secureDataManager.addEventListener('settings_backup_update', handleBackupUpdate);

    // Cross-tab communication listener
    const handleCustomEvent = (event: CustomEvent) => {
      console.log('[SecureDynamicApplicationForm] Custom event received:', event.type, event.detail);
      if (event.type === 'apex_settings_updated' || event.type === 'apex_settings_force_update') {
        setSettings(event.detail);
        setUpdateCount(prev => prev + 1);
        setConnectionStatus('syncing');
        setTimeout(() => setConnectionStatus('connected'), 500);
      }
    };

    window.addEventListener('apex_settings_updated', handleCustomEvent as EventListener);
    window.addEventListener('apex_settings_force_update', handleCustomEvent as EventListener);
    window.addEventListener('apex_settings_backup_update', handleCustomEvent as EventListener);

    // Direct localStorage listener for immediate updates
    const handleStorageEvent = (event: StorageEvent) => {
      console.log('[SecureDynamicApplicationForm] Storage event received:', event.key, event.newValue);
      
      if (event.key === 'apex_last_update' && event.newValue) {
        try {
          const updateData = JSON.parse(event.newValue);
          if (updateData.event === 'settings_updated' || updateData.event === 'settings_force_update') {
            console.log('[SecureDynamicApplicationForm] Direct storage update detected:', updateData);
            setSettings(updateData.data);
            setUpdateCount(prev => prev + 1);
            setConnectionStatus('syncing');
            setTimeout(() => setConnectionStatus('connected'), 500);
          }
        } catch (error) {
          console.error('[SecureDynamicApplicationForm] Failed to parse storage update:', error);
        }
      }
      
      if (event.key === 'apex_settings_manual_trigger' && event.newValue) {
        try {
          const triggerData = JSON.parse(event.newValue);
          console.log('[SecureDynamicApplicationForm] Manual trigger detected:', triggerData);
          setSettings(triggerData.settings);
          setUpdateCount(prev => prev + 1);
          setConnectionStatus('syncing');
          setTimeout(() => setConnectionStatus('connected'), 500);
        } catch (error) {
          console.error('[SecureDynamicApplicationForm] Failed to parse manual trigger:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageEvent);

    // Window message listener for cross-frame communication
    const handleWindowMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'apex_settings_updated') {
        console.log('[SecureDynamicApplicationForm] Window message received:', event.data);
        setSettings(event.data.data);
        setUpdateCount(prev => prev + 1);
        setConnectionStatus('syncing');
        setTimeout(() => setConnectionStatus('connected'), 500);
      }
    };

    window.addEventListener('message', handleWindowMessage);

    // Aggressive periodic refresh with error handling
    const refreshInterval = setInterval(() => {
      try {
        const currentSettings = secureDataManager.getSettings();
        const settingsChanged = JSON.stringify(currentSettings) !== JSON.stringify(settings);
        
        if (settingsChanged) {
          console.log('[SecureDynamicApplicationForm] Periodic refresh detected settings change');
          setSettings(currentSettings);
          setUpdateCount(prev => prev + 1);
          setConnectionStatus('syncing');
          setTimeout(() => setConnectionStatus('connected'), 500);
        }
      } catch (error) {
        console.error('[SecureDynamicApplicationForm] Periodic refresh error:', error);
        setConnectionStatus('error');
        setTimeout(() => setConnectionStatus('connected'), 2000);
      }
    }, 2000); // Check every 2 seconds

    // Force initial refresh after component mount
    setTimeout(() => {
      try {
        const freshSettings = secureDataManager.getSettings();
        console.log('[SecureDynamicApplicationForm] Initial force refresh:', freshSettings);
        setSettings(freshSettings);
      } catch (error) {
        console.error('[SecureDynamicApplicationForm] Initial refresh error:', error);
      }
    }, 100);

    return () => {
      console.log('[SecureDynamicApplicationForm] Cleaning up event listeners');
      secureDataManager.removeEventListener('settings_updated', handleSettingsUpdate);
      secureDataManager.removeEventListener('settings_force_update', handleForceUpdate);
      secureDataManager.removeEventListener('settings_backup_update', handleBackupUpdate);
      window.removeEventListener('apex_settings_updated', handleCustomEvent as EventListener);
      window.removeEventListener('apex_settings_force_update', handleCustomEvent as EventListener);
      window.removeEventListener('apex_settings_backup_update', handleCustomEvent as EventListener);
      window.removeEventListener('storage', handleStorageEvent);
      window.removeEventListener('message', handleWindowMessage);
      clearInterval(refreshInterval);
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
    console.log('[SecureDynamicApplicationForm] Form data:', formData);
    
    setIsSubmitting(true);

    try {
      if (!formData.name || !formData.email || !formData.category) {
        console.error('[SecureDynamicApplicationForm] Required fields missing:', { name: formData.name, email: formData.email, category: formData.category });
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields (Name, Email, and License Category)",
          variant: "destructive",
        });
        return;
      }

      const selectedCategory = licenseCategories.find(cat => cat.id === formData.category);
      console.log('[SecureDynamicApplicationForm] Selected category:', selectedCategory);
      
      // Additional validation for sold-out categories
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

      console.log('[SecureDynamicApplicationForm] Application added successfully:', newApplication);

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

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'syncing': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-green-600';
    }
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'syncing': return 'Syncing...';
      case 'error': return 'Connection Error';
      default: return 'Connected';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Trading License Application</h2>
        <p className="text-muted-foreground">Submit your application for cryptocurrency trading certification</p>
        <div className="flex items-center justify-center gap-4 mt-2">
          {updateCount > 0 && (
            <p className="text-xs text-green-600">
              ✓ Real-time updates active (#{updateCount})
            </p>
          )}
          <p className={`text-xs ${getConnectionStatusColor()}`}>
            • {getConnectionStatusText()}
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
