
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { unifiedDataManager } from '@/utils/unifiedDataManager';
import { EnhancedCard, EnhancedCardHeader, EnhancedCardContent } from '@/components/ui/enhanced-card';
import { FormProgress } from '@/components/form/FormProgress';
import { ValidationMessage, getFieldValidation } from '@/components/form/FormValidation';
import PersonalInfoSection from '@/components/form/PersonalInfoSection';
import LicenseCategorySection from '@/components/form/LicenseCategorySection';
import PaymentInfoSection from '@/components/form/PaymentInfoSection';
import AdditionalInfoSection from '@/components/form/AdditionalInfoSection';
import { Save, Send, CheckCircle, AlertTriangle, ArrowLeft, ArrowRight } from 'lucide-react';

interface ApplicationFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  category: string;
  notes: string;
}

interface FormValidation {
  [key: string]: {
    isValid: boolean;
    message: string;
  };
}

const UnifiedApplicationForm = () => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    category: '',
    notes: ''
  });
  
  const [settings, setSettings] = useState(unifiedDataManager.getSettings());
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateCount, setUpdateCount] = useState(0);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const [currentStep, setCurrentStep] = useState(1);
  const [validation, setValidation] = useState<FormValidation>({});
  const [isDraftSaved, setIsDraftSaved] = useState(false);

  const mountedRef = useRef(true);
  const draftSaveTimeoutRef = useRef<NodeJS.Timeout>();

  const stepLabels = ['Personal Info', 'License Category', 'Payment Info', 'Review & Submit'];

  useEffect(() => {
    console.log('[UnifiedApplicationForm] Component mounted');
    
    const handleSettingsUpdate = (data: any) => {
      if (!mountedRef.current) return;
      
      console.log('[UnifiedApplicationForm] Settings update received:', data);
      const newSettings = data.settings || data;
      
      setSettings(newSettings);
      setUpdateCount(prev => prev + 1);
      setLastUpdateTime(new Date());
      
      toast({
        title: "Pricing Updated",
        description: "Latest pricing and availability loaded",
      });
    };

    unifiedDataManager.addEventListener('settings_updated', handleSettingsUpdate);

    // Load draft from localStorage
    const savedDraft = localStorage.getItem('application_draft');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData(parsedDraft);
        setIsDraftSaved(true);
        toast({
          title: "Draft Loaded",
          description: "Your previous application draft has been restored",
        });
      } catch (error) {
        console.error('Failed to load draft:', error);
      }
    }

    return () => {
      mountedRef.current = false;
      unifiedDataManager.removeEventListener('settings_updated', handleSettingsUpdate);
      if (draftSaveTimeoutRef.current) {
        clearTimeout(draftSaveTimeoutRef.current);
      }
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
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Real-time validation
    const fieldValidation = getFieldValidation(field, value);
    setValidation(prev => ({
      ...prev,
      [field]: fieldValidation
    }));

    // Auto-save draft
    setIsDraftSaved(false);
    if (draftSaveTimeoutRef.current) {
      clearTimeout(draftSaveTimeoutRef.current);
    }
    
    draftSaveTimeoutRef.current = setTimeout(() => {
      const updatedData = { ...formData, [field]: value };
      localStorage.setItem('application_draft', JSON.stringify(updatedData));
      setIsDraftSaved(true);
    }, 1500);
  };

  const handleCopyAddress = (address: string, type: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(type);
    toast({
      title: "Address Copied",
      description: `${type} address copied to clipboard`,
    });
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const getCompletedSteps = () => {
    const completed = [];
    if (formData.name && formData.email && validation.name?.isValid !== false && validation.email?.isValid !== false) {
      completed.push(1);
    }
    if (formData.category) {
      completed.push(2);
      completed.push(3); // Payment info is auto-filled based on category
    }
    return completed;
  };

  const canProceedToNextStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.name && formData.email && validation.name?.isValid !== false && validation.email?.isValid !== false;
      case 2:
        const selectedCategory = licenseCategories.find(cat => cat.id === formData.category);
        return formData.category && selectedCategory?.available;
      case 3:
        return true; // Payment info is display-only
      default:
        return true;
    }
  };

  const getStepValidationMessage = (step: number) => {
    switch (step) {
      case 1:
        if (!formData.name) return "Please enter your name";
        if (!formData.email) return "Please enter your email";
        if (validation.name?.isValid === false) return validation.name.message;
        if (validation.email?.isValid === false) return validation.email.message;
        return null;
      case 2:
        if (!formData.category) return "Please select a license category";
        const selectedCategory = licenseCategories.find(cat => cat.id === formData.category);
        if (selectedCategory && !selectedCategory.available) return "Selected category is sold out. Please choose an available option.";
        return null;
      default:
        return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.name || !formData.email || !formData.category) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }

      const selectedCategory = licenseCategories.find(cat => cat.id === formData.category);
      
      if (selectedCategory && !selectedCategory.available) {
        toast({
          title: "Category Unavailable",
          description: "The selected license category is currently sold out",
          variant: "destructive",
        });
        return;
      }
      
      const newApplication = unifiedDataManager.addApplication({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        licenseType: selectedCategory?.name || `Category ${formData.category}`,
        additionalInfo: formData.notes
      });

      // Clear draft
      localStorage.removeItem('application_draft');

      toast({
        title: "Application Submitted Successfully!",
        description: `Your application has been received. Application ID: ${newApplication.id}`,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        category: '',
        notes: ''
      });
      setCurrentStep(1);
      setValidation({});
      setIsDraftSaved(false);
    } catch (error) {
      console.error('[UnifiedApplicationForm] Submission error:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again or contact support if the issue persists",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCategory = licenseCategories.find(cat => cat.id === formData.category);
  const stepValidationMessage = getStepValidationMessage(currentStep);

  return (
    <EnhancedCard variant="elevated" className="max-w-4xl mx-auto">
      <EnhancedCardHeader>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Trading License Application</h2>
          <p className="text-muted-foreground">Submit your application for cryptocurrency trading certification</p>
          <div className="flex items-center justify-center gap-4 mt-4 text-xs">
            <div className="flex items-center gap-1 text-green-600">
              <CheckCircle className="h-3 w-3" />
              <span>Real-time sync (Updates: {updateCount})</span>
            </div>
            <div className="text-blue-600">
              Last update: {lastUpdateTime.toLocaleTimeString()}
            </div>
            {isDraftSaved && (
              <div className="flex items-center gap-1 text-green-600">
                <Save className="h-3 w-3" />
                <span>Draft saved</span>
              </div>
            )}
          </div>
        </div>

        <FormProgress 
          currentStep={currentStep}
          totalSteps={4}
          stepLabels={stepLabels}
          completedSteps={getCompletedSteps()}
        />
      </EnhancedCardHeader>

      <EnhancedCardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <PersonalInfoSection 
                formData={formData}
                onChange={handleFieldChange}
              />
              
              {stepValidationMessage && (
                <ValidationMessage type="error" message={stepValidationMessage} />
              )}
              
              <div className="flex justify-end">
                <Button 
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  disabled={!canProceedToNextStep(1)}
                  className="flex items-center gap-2"
                >
                  Next: Choose License
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <LicenseCategorySection
                selectedCategory={formData.category}
                onCategorySelect={(categoryId) => handleFieldChange('category', categoryId)}
              />
              
              {stepValidationMessage && (
                <ValidationMessage type="error" message={stepValidationMessage} />
              )}
              
              <div className="flex justify-between">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button 
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  disabled={!canProceedToNextStep(2)}
                  className="flex items-center gap-2"
                >
                  Next: Payment Info
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <PaymentInfoSection
                selectedCategory={selectedCategory ? { name: selectedCategory.name, price: selectedCategory.price } : null}
                settings={settings}
                copiedAddress={copiedAddress}
                onCopyAddress={handleCopyAddress}
              />
              <div className="flex justify-between">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button 
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="flex items-center gap-2"
                >
                  Next: Review & Submit
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Application Summary
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div><strong>Name:</strong> {formData.name}</div>
                  <div><strong>Email:</strong> {formData.email}</div>
                  <div><strong>Phone:</strong> {formData.phone || 'Not provided'}</div>
                  <div><strong>Company:</strong> {formData.company || 'Not provided'}</div>
                  <div><strong>License:</strong> {selectedCategory?.name}</div>
                  <div><strong>Price:</strong> {selectedCategory?.price}</div>
                </div>
                
                {selectedCategory && !selectedCategory.available && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                    <div className="text-sm text-red-800">
                      <strong>Warning:</strong> The selected category is currently sold out. 
                      Please go back and select an available category.
                    </div>
                  </div>
                )}
              </div>

              <AdditionalInfoSection
                notes={formData.notes}
                onNotesChange={(value) => handleFieldChange('notes', value)}
              />

              <div className="flex justify-between">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  className="px-8 flex items-center gap-2"
                  disabled={!formData.name || !formData.email || !formData.category || isSubmitting || (selectedCategory && !selectedCategory.available)}
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner w-5 h-5"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Application
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>
      </EnhancedCardContent>
    </EnhancedCard>
  );
};

export default UnifiedApplicationForm;
