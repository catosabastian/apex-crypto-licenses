
import { useState, useEffect, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Loader2, ShieldCheck, RefreshCw, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { sendAdminNotification } from "@/utils/emailService";
import { supabaseDataManager } from "@/utils/supabaseDataManager";
import PaymentSection from "@/components/form/PaymentSection";

const ADMIN_EMAIL = "catosabastian@gmail.com";

interface ApplicationFormProps {
  onClose?: () => void;
}

interface LicenseCategory {
  id: string;
  name: string;
  price: string;
  available: boolean;
  description: string;
  minVolume: string;
  processingTime: string;
  features: string[];
}

const ApplicationForm = ({ onClose }: ApplicationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [applicantType, setApplicantType] = useState<'individual' | 'corporate'>('individual');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCrypto, setSelectedCrypto] = useState<'BTC' | 'ETH' | 'USDT_TRON' | 'USDT_ETH' | 'XRP'>('BTC');
  const [settings, setSettings] = useState<any>({});
  const [categories, setCategories] = useState<LicenseCategory[]>([]);

  // Enhanced license categories with all types
  const getAllCategories = (settings: any): LicenseCategory[] => {
    return [
      {
        id: 'category_1',
        name: 'Category 1 - Basic Trader',
        price: settings.category1Price || '25,000 USDT',
        available: settings.category1_available ?? false,
        description: 'Entry-level trading license for basic operations',
        minVolume: '$50,000',
        processingTime: '2-4 weeks',
        features: ['Basic trading operations', 'Limited trading volume', 'Standard support']
      },
      {
        id: 'category_2',
        name: 'Category 2 - Standard Trader',
        price: settings.category2Price || '50,000 USDT',
        available: settings.category2_available ?? false,
        description: 'Standard trading license with enhanced features',
        minVolume: '$100,000',
        processingTime: '3-6 weeks',
        features: ['Enhanced trading operations', 'Moderate trading volume', 'Priority support']
      },
      {
        id: 'category_3',
        name: 'Category 3 - Advanced Trader',
        price: settings.category3Price || '70,000 USDT',
        available: settings.category3_available ?? true,
        description: 'Advanced trading license for professional operations (Lifetime Validity)',
        minVolume: '$250,000',
        processingTime: '4-8 weeks',
        features: ['Professional trading platform', 'High volume trading', 'Premium support']
      },
      {
        id: 'category_4',
        name: 'Category 4 - Professional Trader',
        price: settings.category4Price || '150,000 USDT',
        available: settings.category4_available ?? true,
        description: 'Professional-grade license for institutional trading (Lifetime Validity)',
        minVolume: '$500,000',
        processingTime: '6-10 weeks',
        features: ['Institutional trading access', 'Unlimited trading volume', 'Dedicated account manager']
      },
      {
        id: 'category_5',
        name: 'Category 5 - Institutional Trader',
        price: settings.category5Price || '250,000 USDT',
        available: settings.category5_available ?? true,
        description: 'Top-tier institutional license for enterprise operations (Lifetime Validity)',
        minVolume: '$1,000,000+',
        processingTime: '8-12 weeks',
        features: ['Enterprise-grade platform', 'Unlimited institutional access', 'Priority regulatory support']
      },
      {
        id: 'crypto_wallet',
        name: 'Crypto Wallet License',
        price: settings.cryptoWalletPrice || '150,000 USDT',
        available: settings.cryptoWalletAvailable ?? true,
        description: 'Digital wallet services for cryptocurrency custody',
        minVolume: '$500,000+',
        processingTime: '4-8 weeks',
        features: ['Multi-signature wallet technology', 'Hardware security modules', 'Mobile & web applications']
      },
      {
        id: 'fintech_emi',
        name: 'Electronic Money Institution',
        price: settings.fintechEmiPrice || '350,000 USDT',
        available: settings.fintechEmiAvailable ?? true,
        description: 'Issue electronic money and provide payment services',
        minVolume: '$2,000,000+',
        processingTime: '8-16 weeks',
        features: ['Electronic money issuance', 'Payment processing', 'SEPA integration']
      },
      {
        id: 'fintech_msp',
        name: 'Money Service Provider',
        price: settings.fintechMspPrice || '200,000 USDT',
        available: settings.fintechMspAvailable ?? true,
        description: 'Money transmission and payment services',
        minVolume: '$750,000+',
        processingTime: '6-10 weeks',
        features: ['Money transmission services', 'Foreign exchange', 'Remittance services']
      },
      {
        id: 'gambling_online',
        name: 'Online Gambling License',
        price: settings.gamblingOnlinePrice || '180,000 USDT',
        available: settings.gamblingOnlineAvailable ?? true,
        description: 'Online casino, sports betting, and gaming operations',
        minVolume: '$500,000+',
        processingTime: '8-12 weeks',
        features: ['Online casino operations', 'Sports betting platform', 'Live dealer games']
      },
      {
        id: 'gambling_lottery',
        name: 'Lottery & Gaming License',
        price: settings.gamblingLotteryPrice || '120,000 USDT',
        available: settings.gamblingLotteryAvailable ?? true,
        description: 'Lottery operations and skill-based gaming',
        minVolume: '$300,000+',
        processingTime: '4-8 weeks',
        features: ['Lottery ticket sales', 'Instant win games', 'Skill-based competitions']
      },
      {
        id: 'corporate_offshore',
        name: 'Offshore Corporate License',
        price: settings.corporateOffshorePrice || '80,000 USDT',
        available: settings.corporateOffshoreAvailable ?? true,
        description: 'International business company formation',
        minVolume: '$100,000+',
        processingTime: '2-4 weeks',
        features: ['Tax optimization structures', 'Asset protection', 'International banking']
      },
      {
        id: 'corporate_consulting',
        name: 'Business Consulting License',
        price: settings.corporateConsultingPrice || '60,000 USDT',
        available: settings.corporateConsultingAvailable ?? true,
        description: 'Professional consulting and advisory services',
        minVolume: '$50,000+',
        processingTime: '2-3 weeks',
        features: ['Management consulting', 'Financial advisory', 'Legal compliance support']
      }
    ];
  };

  const loadData = async (attempt = 1) => {
    try {
      console.log(`[ApplicationForm] Loading data, attempt ${attempt}`);
      setIsLoading(true);
      setLoadingError(null);

      // Wait for data manager to be ready
      await new Promise(resolve => setTimeout(resolve, 100 * attempt)); // Exponential backoff
      
      const currentSettings = await supabaseDataManager.getSettings();
      console.log('[ApplicationForm] Settings loaded successfully:', currentSettings);
      
      setSettings(currentSettings);
      const allCategories = getAllCategories(currentSettings);
      setCategories(allCategories);
      setIsLoading(false);
    } catch (error) {
      console.error(`[ApplicationForm] Error loading data (attempt ${attempt}):`, error);
      setLoadingError(`Failed to load application data: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsLoading(false);
      
      // Auto-retry up to 3 times
      if (attempt < 3) {
        console.log(`[ApplicationForm] Auto-retrying in ${attempt * 1000}ms...`);
        setTimeout(() => {
          setRetryCount(attempt);
          loadData(attempt + 1);
        }, attempt * 1000);
      }
    }
  };

  const handleRetry = () => {
    console.log('[ApplicationForm] Manual retry triggered');
    loadData(1);
  };

  useEffect(() => {
    loadData();

    const handleSettingsUpdate = (data: any) => {
      try {
        console.log('[ApplicationForm] Settings updated via event:', data);
        const newSettings = data.settings || data;
        setSettings(newSettings);
        const allCategories = getAllCategories(newSettings);
        setCategories(allCategories);
      } catch (error) {
        console.error('[ApplicationForm] Error handling settings update:', error);
      }
    };

    supabaseDataManager.addEventListener('settings_updated', handleSettingsUpdate);
    return () => {
      supabaseDataManager.removeEventListener('settings_updated', handleSettingsUpdate);
    };
  }, []);

  const getCategoryPrice = (category: string): string => {
    const categoryData = categories.find(c => c.id === category);
    return categoryData ? categoryData.price : 'Price not available';
  };

  const isCategoryAvailable = (category: string): boolean => {
    const categoryData = categories.find(c => c.id === category);
    return categoryData ? categoryData.available : false;
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('[ApplicationForm] Starting form submission');
      const formData = new FormData(e.target as HTMLFormElement);
      const formDataObj = Object.fromEntries(formData.entries());
      
      // Validate that the selected category is still available
      if (!isCategoryAvailable(selectedCategory)) {
        toast({
          title: "Category Unavailable",
          description: "The selected license category is currently sold out. Please choose another category.",
          variant: "destructive",
        });
        return;
      }

      // Get wallet address first (await the async function)
      console.log('[ApplicationForm] Getting wallet address...');
      const walletAddress = await getSelectedWalletAddress();
      console.log('[ApplicationForm] Wallet address retrieved:', walletAddress);

      const completeFormData = {
        ...formDataObj,
        submissionTime: new Date().toISOString(),
        applicantType,
        selectedCategory,
        selectedCrypto,
        categoryPrice: getCategoryPrice(selectedCategory),
        walletAddress
      };
      
      console.log('[ApplicationForm] Complete form data:', completeFormData);
      
      // Save application to Supabase
      const applicationData = {
        name: `${formDataObj.firstName || formDataObj.companyName} ${formDataObj.lastName || ''}`.trim(),
        email: (formDataObj.email || formDataObj.businessEmail) as string,
        phone: formDataObj.phone as string,
        company: formDataObj.companyName as string,
        category: selectedCategory,
        notes: JSON.stringify(completeFormData),
        status: 'pending' as const,
        amount: getCategoryPrice(selectedCategory),
        payment_method: selectedCrypto,
        transaction_id: null
      };

      console.log('[ApplicationForm] Saving application to database...');
      const savedApplication = await supabaseDataManager.createApplication(applicationData);
      
      if (!savedApplication) {
        throw new Error('Failed to save application to database');
      }

      console.log('[ApplicationForm] Application saved successfully:', savedApplication.id);

      const notificationSent = await sendAdminNotification(
        completeFormData,
        ADMIN_EMAIL
      );
      
      if (!notificationSent) {
        toast({
          title: "Admin Notification Status",
          description: "There was an issue sending the notification to administrators, but your application was received.",
          variant: "default",
        });
      } else {
        console.log("Admin notification email sent successfully to:", ADMIN_EMAIL);
      }
      
      toast({
        title: "Application Submitted Successfully",
        description: "Your payment is being verified. License will be emailed shortly.",
      });
      
      (e.target as HTMLFormElement).reset();
      
      if (onClose) {
        setTimeout(onClose, 1500);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSelectedWalletAddress = async (): Promise<string> => {
    try {
      console.log('[ApplicationForm] Getting payment addresses...');
      const paymentAddresses = await supabaseDataManager.getPaymentAddresses();
      console.log('[ApplicationForm] Payment addresses retrieved:', paymentAddresses);
      
      const addressMap: Record<string, string> = {};
      
      paymentAddresses.forEach(addr => {
        addressMap[addr.cryptocurrency] = addr.address;
      });

      const address = (() => {
        switch (selectedCrypto) {
          case 'BTC': return addressMap['BTC'] || '';
          case 'ETH': return addressMap['ETH'] || '';
          case 'USDT_TRON': return addressMap['USDT_TRON'] || '';
          case 'USDT_ETH': return addressMap['USDT_ETH'] || '';
          case 'XRP': return addressMap['XRP'] || '';
          default: return '';
        }
      })();

      console.log(`[ApplicationForm] Selected ${selectedCrypto} address:`, address);
      return address;
    } catch (error) {
      console.error('Error getting wallet address:', error);
      return '';
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div id="application" className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading application form...</p>
        {retryCount > 0 && (
          <p className="text-xs text-muted-foreground">Retry attempt {retryCount}/3</p>
        )}
      </div>
    );
  }

  // Show error state
  if (loadingError) {
    return (
      <div id="application" className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <AlertCircle className="h-8 w-8 text-destructive" />
        <p className="text-destructive font-medium">Failed to Load Application Form</p>
        <p className="text-sm text-muted-foreground text-center max-w-md">{loadingError}</p>
        <Button onClick={handleRetry} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  const availableCategories = categories.filter(cat => cat.available);
  const soldOutCategories = categories.filter(cat => !cat.available);

  return (
    <div id="application">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-1 w-12 bg-primary"></div>
        <span className="text-sm text-muted-foreground uppercase tracking-wider">Apply Now</span>
      </div>
      
      <h2 className="text-3xl font-bold mb-6">
        Professional License Application
      </h2>
      
      <p className="text-muted-foreground mb-8">
        Complete the form below to apply for your official license. All information is securely processed and verified.
      </p>
      
      <form id="licenseApplicationForm" onSubmit={handleSubmit}>
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="mb-6 p-4 border border-amber-300 bg-amber-50 rounded-md flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-amber-800">Important Notice</h4>
                <p className="text-xs text-amber-800">
                  All information submitted is subject to verification. Providing false information may result in immediate license revocation and potential legal consequences.
                </p>
              </div>
            </div>

            {/* Availability Status */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <div>
                  <span className="font-semibold text-green-800">{availableCategories.length} Licenses Available</span>
                  <p className="text-sm text-green-600">Ready for immediate processing</p>
                </div>
              </div>
              {soldOutCategories.length > 0 && (
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  <span className="text-sm text-amber-700 font-medium">
                    {soldOutCategories.length} Currently Unavailable
                  </span>
                </div>
              )}
            </div>
          
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Applicant Type</h3>
              <RadioGroup 
                name="applicantType" 
                defaultValue="individual" 
                className="flex flex-col space-y-1"
                required
                onValueChange={(value) => setApplicantType(value as 'individual' | 'corporate')}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="individual" id="individual" />
                  <Label htmlFor="individual">Individual Trader</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="corporate" id="corporate" />
                  <Label htmlFor="corporate">Corporate Entity</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {applicantType === "individual" ? "Personal Information" : "Corporate Information"}
            </h3>
            
            {applicantType === "individual" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input id="dateOfBirth" name="dateOfBirth" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country of Residence</Label>
                  <Select name="country" defaultValue="US" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="AU">Australia</SelectItem>
                      <SelectItem value="SG">Singapore</SelectItem>
                      <SelectItem value="DE">Germany</SelectItem>
                      <SelectItem value="FR">France</SelectItem>
                      <SelectItem value="JP">Japan</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idType">ID Type</Label>
                  <Select name="idType" defaultValue="passport" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="driverLicense">Driver's License</SelectItem>
                      <SelectItem value="nationalId">National ID</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="idNumber">ID Number</Label>
                  <Input id="idNumber" name="idNumber" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Textarea id="address" name="address" placeholder="Street address, city, state/province, postal code" required />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" name="companyName" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="registrationNumber">Registration Number</Label>
                  <Input id="registrationNumber" name="registrationNumber" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="businessEmail">Business Email</Label>
                  <Input id="businessEmail" name="businessEmail" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country of Registration</Label>
                  <Select name="country" defaultValue="US" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="AU">Australia</SelectItem>
                      <SelectItem value="SG">Singapore</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input id="contactPerson" name="contactPerson" required />
                </div>
              </div>
            )}
          </div>
          
          {/* Trading Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Trading Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tradingPlatforms">Primary Trading Platform</Label>
                <Select name="tradingPlatforms" defaultValue="binance" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="binance">Binance</SelectItem>
                    <SelectItem value="kraken">Kraken</SelectItem>
                    <SelectItem value="coinbase">Coinbase</SelectItem>
                    <SelectItem value="kucoin">KuCoin</SelectItem>
                    <SelectItem value="bybit">Bybit</SelectItem>
                    <SelectItem value="okx">OKX</SelectItem>
                    <SelectItem value="multiple">Multiple Platforms</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tradeVolume">Monthly Trade Volume (USD)</Label>
                <Select name="tradeVolume" defaultValue="500k-1m" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select volume" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="500k-1m">$500,000 - $1,000,000</SelectItem>
                    <SelectItem value="1m-5m">$1,000,000 - $5,000,000</SelectItem>
                    <SelectItem value="5m-10m">$5,000,000 - $10,000,000</SelectItem>
                    <SelectItem value="10m+">More than $10,000,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tradingExperience">Trading Experience (Years)</Label>
                <Select name="tradingExperience" defaultValue="3-5" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-3">1-3 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5-10">5-10 years</SelectItem>
                    <SelectItem value="10+">More than 10 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tradingStyle">Primary Trading Style</Label>
                <Select name="tradingStyle" defaultValue="spot" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spot">Spot Trading</SelectItem>
                    <SelectItem value="margin">Margin Trading</SelectItem>
                    <SelectItem value="futures">Futures/Derivatives</SelectItem>
                    <SelectItem value="arbitrage">Arbitrage</SelectItem>
                    <SelectItem value="mixed">Mixed Strategies</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="tradingGoals">Trading Goals & Objectives</Label>
                <Textarea 
                  id="tradingGoals" 
                  name="tradingGoals" 
                  placeholder="Describe your trading goals, risk management strategy, and planned use of the license" 
                  required 
                />
              </div>
            </div>
          </div>
          
          {/* License Selection - All Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">License Selection</h3>
            
            <RadioGroup 
              name="licenseCategory" 
              defaultValue="" 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              required
              onValueChange={(value) => setSelectedCategory(value)}
            >
              {categories.map((category) => (
                <div key={category.id} className={`border rounded-lg p-4 transition-all duration-300 ${
                  selectedCategory === category.id ? 'border-primary bg-primary/5 ring-2 ring-primary' : 
                  category.available ? 'border-border hover:border-primary/50' : 
                  'opacity-60 border-muted cursor-not-allowed bg-muted/20'
                }`}>
                  <div className="flex items-start gap-2">
                    <RadioGroupItem 
                      value={category.id} 
                      id={category.id} 
                      className="mt-1" 
                      disabled={!category.available} 
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <Label htmlFor={category.id} className="font-semibold text-sm leading-tight">
                            {category.name}
                          </Label>
                          <p className="text-xl font-bold text-primary mt-1">{category.price}</p>
                        </div>
                        <Badge 
                          variant={category.available ? "default" : "destructive"}
                          className="text-xs ml-2 flex-shrink-0"
                        >
                          {!category.available ? "SOLD OUT" : "AVAILABLE"}
                        </Badge>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {category.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{category.processingTime}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Min Volume: {category.minVolume}
                        </div>
                      </div>
                      
                      {!category.available && (
                        <div className="mt-2 flex items-center gap-1 text-xs text-red-600">
                          <AlertCircle className="h-3 w-3" />
                          Currently Unavailable
                        </div>
                      )}
                      
                      {selectedCategory === category.id && category.available && (
                        <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                          <CheckCircle className="h-3 w-3" />
                          Selected
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          {/* Enhanced Payment Section */}
          <PaymentSection
            selectedCrypto={selectedCrypto}
            onCryptoChange={(crypto) => setSelectedCrypto(crypto as 'BTC' | 'ETH' | 'USDT_TRON' | 'USDT_ETH' | 'XRP')}
            selectedCategory={selectedCategory}
          />
          
          {/* Additional Information */}
          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
            <Textarea 
              id="additionalInfo" 
              name="additionalInfo" 
              placeholder="Any additional information you would like to provide, including special requirements or questions"
            />
          </div>
          
          {/* Agreements */}
          <div className="space-y-4">
            <div className="flex items-top space-x-2">
              <Checkbox id="termsAgreement" name="termsAgreement" required />
              <label
                htmlFor="termsAgreement"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I certify that all information provided is accurate and complete. I understand that providing false information may result in license revocation and potential legal consequences.
              </label>
            </div>
            
            <div className="flex items-top space-x-2">
              <Checkbox id="privacyAgreement" name="privacyAgreement" required />
              <label
                htmlFor="privacyAgreement"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I consent to the verification of my identity and trading history as part of the licensing process, including KYC/AML procedures.
              </label>
            </div>

            <div className="flex items-top space-x-2">
              <Checkbox id="complianceAgreement" name="complianceAgreement" required />
              <label
                htmlFor="complianceAgreement"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to comply with all applicable regulations and maintain the licensing requirements throughout the validity period.
              </label>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col gap-4">
          <p className="text-sm text-muted-foreground text-center w-full">
            By submitting this application, you agree to our <a href="#" className="text-primary underline">Terms of Service</a> and <a href="#" className="text-primary underline">Privacy Policy</a>.
          </p>
          
          <Button 
            className="w-full gap-2" 
            size="lg"
            type="submit"
            disabled={isSubmitting || !selectedCategory || !isCategoryAvailable(selectedCategory)}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing Application...
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" />
                Submit Application
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
