
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { supabaseDataManager } from '@/utils/supabaseDataManager';
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
  
  const [settings, setSettings] = useState<any>({});
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Load settings from Supabase
    const loadSettings = async () => {
      try {
        const settingsData = await supabaseDataManager.getSettings();
        setSettings(settingsData || {});
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    };
    loadSettings();
  }, []);

  const licenseCategories = [
    { 
      id: '1', 
      name: settings.category1Details.name, 
      price: settings.category1Price, 
      available: settings.category1Available, 
      minVolume: settings.category1Details.minVolume,
      features: settings.category1Details.features,
      processingTime: settings.category1Details.processingTime
    },
    { 
      id: '2', 
      name: settings.category2Details.name, 
      price: settings.category2Price, 
      available: settings.category2Available, 
      minVolume: settings.category2Details.minVolume,
      features: settings.category2Details.features,
      processingTime: settings.category2Details.processingTime
    },
    { 
      id: '3', 
      name: settings.category3Details.name, 
      price: settings.category3Price, 
      available: settings.category3Available, 
      minVolume: settings.category3Details.minVolume,
      features: settings.category3Details.features,
      processingTime: settings.category3Details.processingTime
    },
    { 
      id: '4', 
      name: settings.category4Details.name, 
      price: settings.category4Price, 
      available: settings.category4Available, 
      minVolume: settings.category4Details.minVolume,
      features: settings.category4Details.features,
      processingTime: settings.category4Details.processingTime
    },
    { 
      id: '5', 
      name: settings.category5Details.name, 
      price: settings.category5Price, 
      available: settings.category5Available, 
      minVolume: settings.category5Details.minVolume,
      features: settings.category5Details.features,
      processingTime: settings.category5Details.processingTime
    },
    { 
      id: '6', 
      name: settings.category6Details.name, 
      price: settings.category6Price, 
      available: settings.category6Available, 
      minVolume: settings.category6Details.minVolume,
      features: settings.category6Details.features,
      processingTime: settings.category6Details.processingTime
    }
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
      
      // Additional validation for sold-out categories
      if (selectedCategory && !selectedCategory.available) {
        toast({
          title: "Category Unavailable",
          description: "The selected license category is currently sold out. Please choose an available category.",
          variant: "destructive",
        });
        return;
      }
      
      const newApplication = await supabaseDataManager.createApplication({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        category: selectedCategory?.name || `Category ${formData.category}`,
        notes: formData.notes,
        status: 'pending'
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

export default DynamicApplicationForm;
