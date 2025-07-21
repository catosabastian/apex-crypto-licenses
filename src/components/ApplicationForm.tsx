
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
import { AlertTriangle, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { sendAdminNotification } from "@/utils/emailService";
import { supabaseDataManager } from "@/utils/supabaseDataManager";
import PaymentSection from "@/components/form/PaymentSection";

const ADMIN_EMAIL = "catosabastian@gmail.com";

interface ApplicationFormProps {
  onClose?: () => void;
}

const ApplicationForm = ({ onClose }: ApplicationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicantType, setApplicantType] = useState<'individual' | 'corporate'>('individual');
  const [selectedCategory, setSelectedCategory] = useState<'3' | '4' | '5'>('3');
  const [selectedCrypto, setSelectedCrypto] = useState<'BTC' | 'ETH' | 'USDT_TRON' | 'USDT_ETH' | 'XRP'>('BTC');
  const [settings, setSettings] = useState<any>({});

  // Listen for settings updates
  useEffect(() => {
    const handleSettingsUpdate = (data: any) => {
      const newSettings = data.settings || data;
      setSettings(newSettings);
      console.log('[ApplicationForm] Settings updated:', newSettings);
    };

    unifiedDataManager.addEventListener('settings_updated', handleSettingsUpdate);
    return () => {
      unifiedDataManager.removeEventListener('settings_updated', handleSettingsUpdate);
    };
  }, []);

  const getCategoryPrice = (category: string): string => {
    switch (category) {
      case '3': return settings.category3Price || '70,000 USDT';
      case '4': return settings.category4Price || '150,000 USDT';
      case '5': return settings.category5Price || '250,000 USDT';
      default: return 'Price not available';
    }
  };

  const isCategoryAvailable = (category: string): boolean => {
    switch (category) {
      case '3': return settings.category3Available ?? true;
      case '4': return settings.category4Available ?? true;
      case '5': return settings.category5Available ?? true;
      default: return false;
    }
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const formDataObj = Object.fromEntries(formData.entries());
    
    try {
      // Validate that the selected category is still available
      if (!isCategoryAvailable(selectedCategory)) {
        toast({
          title: "Category Unavailable",
          description: "The selected license category is currently sold out. Please choose another category.",
          variant: "destructive",
        });
        return;
      }

      const completeFormData = {
        ...formDataObj,
        submissionTime: new Date().toISOString(),
        applicantType,
        selectedCategory,
        selectedCrypto,
        categoryPrice: getCategoryPrice(selectedCategory),
        walletAddress: getSelectedWalletAddress()
      };
      
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

  const getSelectedWalletAddress = (): string => {
    switch (selectedCrypto) {
      case 'BTC': return settings.bitcoinAddress || '';
      case 'ETH': return settings.ethereumAddress || '';
      case 'USDT_TRON': return settings.usdtTronAddress || '';
      case 'USDT_ETH': return settings.usdtEthereumAddress || '';
      case 'XRP': return settings.xrpAddress || '';
      default: return '';
    }
  };

  return (
    <div id="application">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-1 w-12 bg-primary"></div>
        <span className="text-sm text-muted-foreground uppercase tracking-wider">Apply Now</span>
      </div>
      
      <h2 className="text-3xl font-bold mb-6">
        Crypto License Application
      </h2>
      
      <p className="text-muted-foreground mb-8">
        Complete the form below to apply for your official crypto trading license. All information is securely processed and verified.
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
          
          {/* License Selection - Categories 3, 4 & 5 Available */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">License Selection</h3>
            
            <RadioGroup 
              name="licenseCategory" 
              defaultValue="3" 
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              required
              onValueChange={(value) => setSelectedCategory(value as '3' | '4' | '5')}
            >
              <div className={`border rounded-lg p-4 ${selectedCategory === '3' ? 'border-primary bg-primary/5' : ''} ${!isCategoryAvailable('3') ? 'opacity-50' : ''}`}>
                <div className="flex items-start gap-2">
                  <RadioGroupItem value="3" id="category3" className="mt-1" disabled={!isCategoryAvailable('3')} />
                  <div>
                    <Label htmlFor="category3" className="font-semibold">Category 3 - Advanced Trader</Label>
                    <p className="text-sm text-muted-foreground">{getCategoryPrice('3')}</p>
                    <p className="text-xs text-muted-foreground mt-2">For trade volumes of $250,000+ minimum</p>
                    <div className="flex gap-2 mt-2">
                      {isCategoryAvailable('3') ? (
                        <Badge variant="secondary" className="bg-accent text-white">Popular</Badge>
                      ) : (
                        <Badge variant="destructive">Sold Out</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={`border rounded-lg p-4 ${selectedCategory === '4' ? 'border-primary bg-primary/5' : ''} ${!isCategoryAvailable('4') ? 'opacity-50' : ''}`}>
                <div className="flex items-start gap-2">
                  <RadioGroupItem value="4" id="category4" className="mt-1" disabled={!isCategoryAvailable('4')} />
                  <div>
                    <Label htmlFor="category4" className="font-semibold">Category 4 - Professional Trader</Label>
                    <p className="text-sm text-muted-foreground">{getCategoryPrice('4')}</p>
                    <p className="text-xs text-muted-foreground mt-2">For trade volumes of $500,000+ minimum</p>
                    <div className="flex gap-2 mt-2">
                      {isCategoryAvailable('4') ? (
                        <Badge variant="outline">Premium</Badge>
                      ) : (
                        <Badge variant="destructive">Sold Out</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={`border rounded-lg p-4 ${selectedCategory === '5' ? 'border-primary bg-primary/5' : ''} ${!isCategoryAvailable('5') ? 'opacity-50' : ''}`}>
                <div className="flex items-start gap-2">
                  <RadioGroupItem value="5" id="category5" className="mt-1" disabled={!isCategoryAvailable('5')} />
                  <div>
                    <Label htmlFor="category5" className="font-semibold">Category 5 - Institutional Trader</Label>
                    <p className="text-sm text-muted-foreground">{getCategoryPrice('5')}</p>
                    <p className="text-xs text-muted-foreground mt-2">For trade volumes of $1,000,000+ minimum</p>
                    <div className="flex gap-2 mt-2">
                      {isCategoryAvailable('5') ? (
                        <Badge variant="outline">Enterprise</Badge>
                      ) : (
                        <Badge variant="destructive">Sold Out</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
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
            disabled={isSubmitting || !isCategoryAvailable(selectedCategory)}
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
