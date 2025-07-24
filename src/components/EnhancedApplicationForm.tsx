
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { CheckCircle, Clock, Shield, TrendingUp, Users, Globe, Wallet, Copy, Check, QrCode, AlertCircle, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import QRCode from 'react-qr-code';
import { supabaseDataManager, type LicenseCategory } from '@/utils/supabaseDataManager';
import { supabase } from '@/integrations/supabase/client';
import EnhancedPersonalInfoSection from '@/components/form/EnhancedPersonalInfoSection';
import EnhancedLicenseCategorySection from '@/components/form/EnhancedLicenseCategorySection';
import EnhancedPaymentSection from '@/components/form/EnhancedPaymentSection';
import EnhancedAdditionalInfoSection from '@/components/form/EnhancedAdditionalInfoSection';

interface ApplicationFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  category: string;
  notes: string;
  tradingExperience: string;
  tradingVolume: string;
  primaryPlatform: string;
  paymentMethod: string;
}

const EnhancedApplicationForm = () => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    category: '',
    notes: '',
    tradingExperience: '',
    tradingVolume: '',
    primaryPlatform: '',
    paymentMethod: 'BTC'
  });
  
  const [settings, setSettings] = useState<any>({});
  const [paymentAddresses, setPaymentAddresses] = useState<any[]>([]);
  const [licenseCategories, setLicenseCategories] = useState<LicenseCategory[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedQrAddress, setSelectedQrAddress] = useState<{ address: string; type: string; }>({ address: '', type: '' });
  const [formProgress, setFormProgress] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);

  const mountedRef = useRef(true);

  // Load initial data and set up real-time updates
  useEffect(() => {
    const loadData = async () => {
      const [settingsData, addressesData, categoriesData] = await Promise.all([
        supabaseDataManager.getSettings(),
        supabaseDataManager.getPaymentAddresses(),
        supabaseDataManager.getLicenseCategories()
      ]);
      
      setSettings(settingsData);
      setPaymentAddresses(addressesData);
      setLicenseCategories(categoriesData.sort((a, b) => a.display_order - b.display_order));
    };

    const handleDataUpdate = () => {
      if (!mountedRef.current) return;
      
      loadData();
      setUpdateCount(prev => prev + 1);
      
      toast({
        title: "Data Updated",
        description: "Latest pricing and configuration loaded",
      });
    };

    loadData();
    supabaseDataManager.addEventListener('settings_updated', handleDataUpdate);
    supabaseDataManager.addEventListener('payment_addresses_updated', handleDataUpdate);
    supabaseDataManager.addEventListener('license_categories_updated', handleDataUpdate);

    return () => {
      mountedRef.current = false;
      supabaseDataManager.removeEventListener('settings_updated', handleDataUpdate);
      supabaseDataManager.removeEventListener('payment_addresses_updated', handleDataUpdate);
      supabaseDataManager.removeEventListener('license_categories_updated', handleDataUpdate);
    };
  }, []);

  // Calculate form progress
  useEffect(() => {
    const requiredFields = ['name', 'email', 'category'];
    const optionalFields = ['phone', 'company', 'tradingExperience', 'tradingVolume', 'primaryPlatform'];
    
    const requiredCompleted = requiredFields.filter(field => formData[field as keyof ApplicationFormData]).length;
    const optionalCompleted = optionalFields.filter(field => formData[field as keyof ApplicationFormData]).length;
    
    const progress = ((requiredCompleted * 60) + (optionalCompleted * 8)) / 100 * 100;
    setFormProgress(Math.min(progress, 100));
  }, [formData]);

  // Transform database categories to component format
  const transformedCategories = licenseCategories.map(cat => ({
    id: cat.id,
    name: cat.name,
    price: cat.price,
    available: cat.available,
    details: cat.min_volume,
    features: cat.features,
    icon: cat.icon === 'TrendingUp' ? TrendingUp :
          cat.icon === 'Users' ? Users :
          cat.icon === 'Shield' ? Shield :
          cat.icon === 'Globe' ? Globe :
          cat.icon === 'CheckCircle' ? CheckCircle :
          cat.icon === 'Clock' ? Clock : Shield,
    color: cat.color === 'blue' ? 'bg-blue-50 border-blue-200 text-blue-800' :
           cat.color === 'green' ? 'bg-green-50 border-green-200 text-green-800' :
           cat.color === 'purple' ? 'bg-purple-50 border-purple-200 text-purple-800' :
           cat.color === 'gold' ? 'bg-amber-50 border-amber-200 text-amber-800' :
           cat.color === 'platinum' ? 'bg-gray-50 border-gray-200 text-gray-800' :
           cat.color === 'diamond' ? 'bg-indigo-50 border-indigo-200 text-indigo-800' :
           'bg-blue-50 border-blue-200 text-blue-800',
    popular: cat.popular,
    exclusive: cat.exclusive
  }));

  const paymentOptions = paymentAddresses.map(addr => ({
    id: addr.cryptocurrency,
    name: addr.cryptocurrency === 'BTC' ? 'Bitcoin' :
          addr.cryptocurrency === 'ETH' ? 'Ethereum' :
          addr.cryptocurrency === 'USDT_TRON' ? 'USDT (Tron)' :
          addr.cryptocurrency === 'USDT_ETH' ? 'USDT (Ethereum)' :
          addr.cryptocurrency === 'XRP' ? 'XRP' : addr.cryptocurrency,
    address: addr.address,
    icon: addr.cryptocurrency === 'BTC' ? '₿' :
          addr.cryptocurrency === 'ETH' ? 'Ξ' :
          addr.cryptocurrency.includes('USDT') ? '₮' :
          addr.cryptocurrency === 'XRP' ? '◉' : '₿'
  }));

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCopyAddress = async (address: string, type: string) => {
    if (!address) {
      toast({
        title: "Address Not Available",
        description: "This wallet address hasn't been configured yet.",
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(type);
      toast({
        title: "Address Copied",
        description: `${type} address copied to clipboard`,
      });
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy address to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleShowQR = (address: string, type: string) => {
    if (!address) {
      toast({
        title: "Address Not Available",
        description: "This wallet address hasn't been configured yet.",
        variant: "destructive",
      });
      return;
    }
    setSelectedQrAddress({ address, type });
    setQrDialogOpen(true);
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

      const selectedCategory = transformedCategories.find(cat => cat.id === formData.category);
      
      if (selectedCategory && !selectedCategory.available) {
        toast({
          title: "Category Unavailable",
          description: "The selected license category is currently sold out",
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
        status: 'pending',
        payment_method: formData.paymentMethod,
        amount: selectedCategory?.price || 'Contact for pricing'
      });
      console.log("Application failed")

      if (newApplication) {
        toast({
          title: "Application Submitted Successfully",
          description: `Application ID: ${newApplication.id}. You will receive confirmation shortly.`,
        });
      } else {
        throw new Error('Failed to create application');
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        category: '',
        notes: '',
        tradingExperience: '',
        tradingVolume: '',
        primaryPlatform: '',
        paymentMethod: 'BTC'
      });
      setCurrentStep(1);
    } catch (error) {
      // Application submission error handled by toast
      toast({
        title: "Submission Failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCategory = transformedCategories.find(cat => cat.id === formData.category);
  const selectedPayment = paymentOptions.find(opt => opt.id === formData.paymentMethod);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with Progress */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Enhanced License Application</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Complete your professional cryptocurrency trading license application with our enhanced, user-friendly form.
        </p>
        
        {/* Live Status Indicators */}
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-600">Real-time sync active</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="text-blue-600">Updates: {updateCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-purple-600" />
            <span className="text-purple-600">Progress: {Math.round(formProgress)}%</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto">
          <Progress value={formProgress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">
            Form completion: {Math.round(formProgress)}%
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <EnhancedPersonalInfoSection 
          formData={formData}
          onChange={handleFieldChange}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />

        {/* License Categories */}
        <EnhancedLicenseCategorySection
          categories={transformedCategories}
          selectedCategory={formData.category}
          onCategorySelect={(categoryId) => handleFieldChange('category', categoryId)}
          settings={settings}
        />

        {/* Payment Information */}
        <EnhancedPaymentSection
          selectedCategory={selectedCategory}
          paymentOptions={paymentOptions}
          selectedPayment={formData.paymentMethod}
          onPaymentSelect={(method) => handleFieldChange('paymentMethod', method)}
          onCopyAddress={handleCopyAddress}
          onShowQR={handleShowQR}
          copiedAddress={copiedAddress}
          settings={settings}
        />

        {/* Additional Information */}
        <EnhancedAdditionalInfoSection
          formData={formData}
          onChange={handleFieldChange}
        />

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <Button
            type="submit"
            size="lg"
            className="px-12 py-6 text-lg font-semibold"
            disabled={!formData.name || !formData.email || !formData.category || isSubmitting || (selectedCategory && !selectedCategory.available)}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Processing Application...
              </>
            ) : (
              <>
                <Shield className="h-5 w-5 mr-2" />
                Submit License Application
              </>
            )}
          </Button>
        </div>
      </form>

      {/* QR Code Dialog */}
      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center">
              {selectedQrAddress.type} Payment Address
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4 p-4">
            {selectedQrAddress.address ? (
              <>
                <div className="bg-white p-4 rounded-lg">
                  <QRCode
                    size={200}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={selectedQrAddress.address}
                    viewBox="0 0 256 256"
                  />
                </div>
                <div className="text-center w-full">
                  <p className="text-xs text-muted-foreground mb-2">Wallet Address:</p>
                  <p className="font-mono text-xs break-all bg-muted p-2 rounded border">
                    {selectedQrAddress.address}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => handleCopyAddress(selectedQrAddress.address, selectedQrAddress.type)}
                  >
                    {copiedAddress === selectedQrAddress.type ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Address
                      </>
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center p-8">
                <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Wallet address not configured
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnhancedApplicationForm;
