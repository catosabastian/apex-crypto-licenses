
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Copy, Check, Upload, User, Building, CreditCard, FileText, Wallet, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { dataManager, WebsiteSettings } from '@/utils/dataManager';

interface ApplicationFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  category: string;
  tradingExperience: string;
  expectedVolume: string;
  jurisdiction: string;
  businessModel: string;
  documents: string[];
  notes: string;
}

const DynamicApplicationForm = () => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    category: '',
    tradingExperience: '',
    expectedVolume: '',
    jurisdiction: '',
    businessModel: '',
    documents: [],
    notes: ''
  });
  
  const [settings, setSettings] = useState<WebsiteSettings>(dataManager.getSettings());
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Update settings when they change in admin with real-time updates
  useEffect(() => {
    const updateSettings = () => {
      const newSettings = dataManager.getSettings();
      setSettings(newSettings);
    };
    
    // Listen for storage changes
    window.addEventListener('storage', updateSettings);
    
    // Check for updates more frequently for better real-time experience
    const interval = setInterval(updateSettings, 500);
    
    return () => {
      window.removeEventListener('storage', updateSettings);
      clearInterval(interval);
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

  const handleCopyAddress = (address: string, type: string) => {
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
    setIsSubmitting(true);
    setIsLoading(true);

    try {
      // Add application to dataManager
      const selectedCategory = licenseCategories.find(cat => cat.id === formData.category);
      const newApplication = dataManager.addApplication({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        category: selectedCategory?.name || `Category ${formData.category}`,
        status: 'pending' as const,
        amount: selectedCategory?.price || '0',
        documents: formData.documents,
        notes: formData.notes
      });

      toast({
        title: "Application Submitted Successfully",
        description: `Your application has been submitted. Application ID: ${newApplication.id}`,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        category: '',
        tradingExperience: '',
        expectedVolume: '',
        jurisdiction: '',
        businessModel: '',
        documents: [],
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
      setIsLoading(false);
    }
  };

  const selectedCategory = licenseCategories.find(cat => cat.id === formData.category);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading application form...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Trading License Application</h2>
        <p className="text-lg text-muted-foreground">Submit your application for cryptocurrency trading certification</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="form-section">
          <div className="section-heading">
            <div className="section-icon">
              <User className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold">Personal Information</h3>
          </div>
          
          <div className="form-field-group">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="mt-2"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="company">Company/Organization</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* License Category Selection */}
        <div className="form-section">
          <div className="section-heading">
            <div className="section-icon">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold">License Category</h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {licenseCategories.map((category) => (
              <div
                key={category.id}
                className={`category-card cursor-pointer ${
                  formData.category === category.id ? 'selected' : ''
                } ${!category.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => category.available && setFormData(prev => ({ ...prev, category: category.id }))}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{category.name}</h4>
                  {!category.available && <Badge variant="destructive">Sold Out</Badge>}
                  {category.available && formData.category === category.id && <Badge>Selected</Badge>}
                </div>
                <p className="text-2xl font-bold text-accent mb-2">{category.price}</p>
                <p className="text-sm text-muted-foreground">Min Volume: {category.minVolume}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Information */}
        {selectedCategory && (
          <div className="form-section">
            <div className="section-heading">
              <div className="section-icon">
                <Wallet className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">Payment Information</h3>
            </div>
            
            <div className="payment-notice">
              <p><strong>Selected License:</strong> {selectedCategory.name} - {selectedCategory.price}</p>
              <p>Please send payment to one of the addresses below and include your application details.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">Bitcoin Address</Label>
                <div className="flex items-center gap-2 mt-2">
                  <div className="wallet-address flex-1">{settings.bitcoinAddress}</div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyAddress(settings.bitcoinAddress, 'Bitcoin')}
                    className={copiedAddress === 'Bitcoin' ? 'copy-button-success' : ''}
                  >
                    {copiedAddress === 'Bitcoin' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div>
                <Label className="text-base font-medium">Ethereum Address</Label>
                <div className="flex items-center gap-2 mt-2">
                  <div className="wallet-address flex-1">{settings.ethereumAddress}</div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyAddress(settings.ethereumAddress, 'Ethereum')}
                    className={copiedAddress === 'Ethereum' ? 'copy-button-success' : ''}
                  >
                    {copiedAddress === 'Ethereum' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div>
                <Label className="text-base font-medium">USDT Address</Label>
                <div className="flex items-center gap-2 mt-2">
                  <div className="wallet-address flex-1">{settings.usdtAddress}</div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyAddress(settings.usdtAddress, 'USDT')}
                    className={copiedAddress === 'USDT' ? 'copy-button-success' : ''}
                  >
                    {copiedAddress === 'USDT' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional Information */}
        <div className="form-section">
          <div className="section-heading">
            <div className="section-icon">
              <FileText className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold">Additional Information</h3>
          </div>
          
          <div className="form-field-group">
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Any additional information about your application..."
                className="min-h-[120px] mt-2"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            size="lg"
            className="btn-primary px-12 py-6 text-lg"
            disabled={!formData.name || !formData.email || !formData.category || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
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
