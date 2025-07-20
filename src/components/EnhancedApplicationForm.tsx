
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
import { unifiedDataManager, ContentSettings } from '@/utils/unifiedDataManager';
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
  
  const [settings, setSettings] = useState<ContentSettings>(unifiedDataManager.getSettings());
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedQrAddress, setSelectedQrAddress] = useState<{ address: string; type: string; }>({ address: '', type: '' });
  const [formProgress, setFormProgress] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);

  const mountedRef = useRef(true);

  // Real-time settings updates
  useEffect(() => {
    const handleSettingsUpdate = (data: any) => {
      if (!mountedRef.current) return;
      
      const newSettings = data.settings || data;
      setSettings(newSettings);
      setUpdateCount(prev => prev + 1);
      
      toast({
        title: "Settings Updated",
        description: "Latest pricing and configuration loaded",
      });
    };

    unifiedDataManager.addEventListener('settings_updated', handleSettingsUpdate);

    return () => {
      mountedRef.current = false;
      unifiedDataManager.removeEventListener('settings_updated', handleSettingsUpdate);
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

  const licenseCategories = [
    {
      id: '1',
      name: 'Basic Trader',
      price: settings.category1Price,
      available: settings.category1Available,
      details: settings.category1Details,
      features: ['Basic trading support', 'Email support', 'Standard processing'],
      icon: TrendingUp,
      color: 'bg-blue-50 border-blue-200 text-blue-800'
    },
    {
      id: '2',
      name: 'Standard Trader', 
      price: settings.category2Price,
      available: settings.category2Available,
      details: settings.category2Details,
      features: ['Enhanced trading tools', 'Priority support', 'Faster processing'],
      icon: Users,
      color: 'bg-green-50 border-green-200 text-green-800'
    },
    {
      id: '3',
      name: 'Advanced Trader',
      price: settings.category3Price,
      available: settings.category3Available,
      details: settings.category3Details,
      features: ['Advanced analytics', 'API access', 'Premium support'],
      icon: Shield,
      color: 'bg-purple-50 border-purple-200 text-purple-800'
    },
    {
      id: '4',
      name: 'Professional Trader',
      price: settings.category4Price,
      available: settings.category4Available,
      details: settings.category4Details,
      features: ['Professional tools', 'Dedicated support', 'Custom solutions'],
      icon: Globe,
      color: 'bg-amber-50 border-amber-200 text-amber-800'
    },
    {
      id: '5',
      name: 'Institutional Trader',
      price: settings.category5Price,
      available: settings.category5Available,
      details: settings.category5Details,
      features: ['Enterprise features', '24/7 support', 'Custom integration'],
      icon: CheckCircle,
      color: 'bg-red-50 border-red-200 text-red-800'
    },
    {
      id: '6',
      name: 'Executive Trader',
      price: settings.category6Price,
      available: settings.category6Available,
      details: settings.category6Details,
      features: ['Executive access', 'White-glove service', 'Custom everything'],
      icon: Clock,
      color: 'bg-indigo-50 border-indigo-200 text-indigo-800'
    }
  ];

  const paymentOptions = [
    { id: 'BTC', name: 'Bitcoin', address: settings.bitcoinAddress, icon: '₿' },
    { id: 'ETH', name: 'Ethereum', address: settings.ethereumAddress, icon: 'Ξ' },
    { id: 'USDT_TRON', name: 'USDT (Tron)', address: settings.usdtTronAddress, icon: '₮' },
    { id: 'USDT_ETH', name: 'USDT (Ethereum)', address: settings.usdtEthereumAddress, icon: '₮' },
    { id: 'XRP', name: 'XRP', address: settings.xrpAddress, icon: '◉' }
  ];

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
        licenseType: selectedCategory?.name || `Category ${formData.category}`
      });

      toast({
        title: "Application Submitted Successfully",
        description: `Application ID: ${newApplication.id}. You will receive confirmation shortly.`,
      });

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
      console.error('Application submission error:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCategory = licenseCategories.find(cat => cat.id === formData.category);
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
          categories={licenseCategories}
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
