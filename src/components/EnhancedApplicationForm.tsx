
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { CheckCircle, Clock, Shield, TrendingUp, Users, Globe, Wallet, Copy, Check, QrCode, AlertCircle, Info, Building2, Gamepad2, CreditCard, Coins, Landmark, Briefcase, Star } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import QRCode from 'react-qr-code';
import { supabaseDataManager } from '@/utils/supabaseDataManager';
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
  applicantType: string;
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
    paymentMethod: 'BTC',
    applicantType: 'business'
  });
  
  const [settings, setSettings] = useState<any>({});
  const [paymentAddresses, setPaymentAddresses] = useState<any[]>([]);
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
      try {
        const [settingsData, addressesData] = await Promise.all([
          supabaseDataManager.getSettings(),
          supabaseDataManager.getPaymentAddresses()
        ]);
        
        console.log('Loaded settings:', settingsData);
        console.log('Loaded payment addresses:', addressesData);
        
        setSettings(settingsData);
        setPaymentAddresses(addressesData);
      } catch (error) {
        console.error('Error loading application data:', error);
        toast({
          title: "Loading Error",
          description: "Failed to load application data. Please refresh the page.",
          variant: "destructive",
        });
      }
    };

    const handleSettingsUpdate = () => {
      if (!mountedRef.current) return;
      
      loadData();
      setUpdateCount(prev => prev + 1);
      
      toast({
        title: "Settings Updated",
        description: "Latest pricing and configuration loaded",
      });
    };

    loadData();
    supabaseDataManager.addEventListener('settings_updated', handleSettingsUpdate);
    supabaseDataManager.addEventListener('payment_addresses_updated', handleSettingsUpdate);

    return () => {
      mountedRef.current = false;
      supabaseDataManager.removeEventListener('settings_updated', handleSettingsUpdate);
      supabaseDataManager.removeEventListener('payment_addresses_updated', handleSettingsUpdate);
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
      console.log('Starting application submission...');
      
      if (!formData.name || !formData.email || !formData.category) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }

      const applicationData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        category: formData.category,
        notes: formData.notes,
        status: 'pending' as const,
        payment_method: formData.paymentMethod,
        amount: 'Contact for pricing'
      };

      console.log('Submitting application data:', applicationData);
      
      const newApplication = await supabaseDataManager.createApplication(applicationData);

      if (newApplication) {
        toast({
          title: "Application Submitted Successfully",
          description: `Application ID: ${newApplication.id}. You will receive confirmation shortly.`,
        });
        
        console.log('Application submitted successfully:', newApplication);
        
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
          paymentMethod: 'BTC',
          applicantType: 'business'
        });
        setCurrentStep(1);
      } else {
        throw new Error('Failed to create application');
      }
    } catch (error) {
      console.error('Application submission error:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again or contact support if the issue persists.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPayment = paymentOptions.find(opt => opt.id === formData.paymentMethod);

  return (
    <div className="max-w-6xl mx-auto space-y-8 bg-gradient-to-br from-background via-background to-muted/20 p-6 rounded-2xl">
      {/* Enhanced Header with Progress */}
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-br from-primary to-primary/70 rounded-2xl shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Professional License Application
          </h1>
        </div>
        <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
          Apply for your professional cryptocurrency, fintech, gambling, or corporate license with our streamlined, 
          secure application process. Choose from our comprehensive range of regulated services.
        </p>
        
        {/* Enhanced Live Status Indicators */}
        <div className="flex items-center justify-center gap-8 text-sm bg-muted/30 rounded-full px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-pulse shadow-lg"></div>
            <span className="text-green-700 font-medium">Real-time sync active</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="text-blue-600 font-medium">Updates: {updateCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-purple-600" />
            <span className="text-purple-600 font-medium">Progress: {Math.round(formProgress)}%</span>
          </div>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="max-w-md mx-auto space-y-2">
          <Progress value={formProgress} className="h-3 bg-muted" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Getting Started</span>
            <span className="font-medium">{Math.round(formProgress)}% Complete</span>
            <span>Submission Ready</span>
          </div>
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

        {/* Applicant Type Selection */}
        <Card className="border-2 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-background to-muted/20">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/20 rounded-xl">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Application Type
                </CardTitle>
                <p className="text-muted-foreground mt-1">
                  Are you applying as a Business or Individual?
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <Card 
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  formData.applicantType === 'business' 
                    ? 'ring-2 ring-primary border-primary shadow-lg scale-105' 
                    : 'border-border hover:border-primary/50 hover:shadow-md'
                }`}
                onClick={() => handleFieldChange('applicantType', 'business')}
              >
                <CardContent className="p-6 text-center">
                  <Building2 className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-bold text-lg">Business</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Corporate entities, LLCs, partnerships, and other business structures
                  </p>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  formData.applicantType === 'individual' 
                    ? 'ring-2 ring-primary border-primary shadow-lg scale-105' 
                    : 'border-border hover:border-primary/50 hover:shadow-md'
                }`}
                onClick={() => handleFieldChange('applicantType', 'individual')}
              >
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-bold text-lg">Individual</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Personal applications for individual entrepreneurs and professionals
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced License Categories */}
        <EnhancedLicenseCategorySection
          categories={[]}
          selectedCategory={formData.category}
          onCategorySelect={(categoryId) => handleFieldChange('category', categoryId)}
          settings={settings}
        />

        {/* Payment Information */}
        <EnhancedPaymentSection
          selectedCategory={undefined}
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

        {/* Enhanced Submit Button */}
        <div className="flex justify-center pt-6">
          <Button
            type="submit"
            size="lg"
            className="px-16 py-8 text-xl font-bold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            disabled={!formData.name || !formData.email || !formData.category || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                Processing Application...
              </>
            ) : (
              <>
                <Shield className="h-6 w-6 mr-3" />
                Submit Professional License Application
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
                <div className="bg-white p-4 rounded-lg shadow-inner">
                  <QRCode
                    size={200}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={selectedQrAddress.address}
                    viewBox="0 0 256 256"
                  />
                </div>
                <div className="text-center w-full">
                  <p className="text-xs text-muted-foreground mb-2">Wallet Address:</p>
                  <p className="font-mono text-xs break-all bg-muted p-3 rounded border">
                    {selectedQrAddress.address}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => handleCopyAddress(selectedQrAddress.address, selectedQrAddress.type)}
                  >
                    {copiedAddress === selectedQrAddress.type ? (
                      <>
                        <Check className="h-4 w-4 mr-2 text-green-600" />
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
