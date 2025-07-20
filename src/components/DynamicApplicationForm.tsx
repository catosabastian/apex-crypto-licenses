
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { dataManager, WebsiteSettings } from '@/utils/dataManager';
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

const DynamicApplicationForm = () => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    category: '',
    notes: ''
  });
  
  const [settings, setSettings] = useState<WebsiteSettings>(dataManager.getSettings());
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Real-time settings update handler
    const handleSettingsUpdate = (updatedSettings: WebsiteSettings) => {
      console.log('Settings updated in form:', updatedSettings);
      setSettings(updatedSettings);
    };

    // Listen to dataManager events
    dataManager.addEventListener('settings_updated', handleSettingsUpdate);

    // Listen to cross-tab events
    const handleStorageChange = (event: CustomEvent) => {
      if (event.type === 'apex_settings_updated') {
        setSettings(event.detail);
      }
    };

    window.addEventListener('apex_settings_updated', handleStorageChange as EventListener);

    // Also listen to direct localStorage changes
    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key === 'apex_settings' && event.newValue) {
        const newSettings = JSON.parse(event.newValue);
        setSettings(newSettings);
      }
    };

    window.addEventListener('storage', handleStorageEvent);

    return () => {
      dataManager.removeEventListener('settings_updated', handleSettingsUpdate);
      window.removeEventListener('apex_settings_updated', handleStorageChange as EventListener);
      window.removeEventListener('storage', handleStorageEvent);
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
    console.log(`${field} changed:`, value);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCopyAddress = (address: string, type: string) => {
    console.log('Copying address:', type, address);
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
    console.log('Form submission started');
    console.log('Form data:', formData);
    
    setIsSubmitting(true);

    try {
      if (!formData.name || !formData.email || !formData.category) {
        console.error('Required fields missing:', { name: formData.name, email: formData.email, category: formData.category });
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields (Name, Email, and License Category)",
          variant: "destructive",
        });
        return;
      }

      const selectedCategory = licenseCategories.find(cat => cat.id === formData.category);
      console.log('Selected category:', selectedCategory);
      
      const newApplication = dataManager.addApplication({
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

      console.log('Application added successfully:', newApplication);

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
      console.error('Application submission error:', error);
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
            disabled={!formData.name || !formData.email || !formData.category || isSubmitting}
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

export default DynamicApplicationForm;
