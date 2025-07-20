
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
      console.log('Updated settings:', newSettings);
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
    { id: '1', name: 'Basic Trader', price: settings.category1Price, available: true, minVolume: '$50,000' },
    { id: '2', name: 'Standard Trader', price: settings.category2Price, available: true, minVolume: '$100,000' },
    { id: '3', name: 'Advanced Trader', price: settings.category3Price, available: settings.category3Available, minVolume: '$250,000' },
    { id: '4', name: 'Professional Trader', price: settings.category4Price, available: settings.category4Available, minVolume: '$500,000' },
    { id: '5', name: 'Institutional Trader', price: settings.category5Price, available: settings.category5Available, minVolume: '$1,000,000+' },
    { id: '6', name: 'Executive Trader', price: settings.category6Price, available: settings.category6Available, minVolume: '$2,500,000+' }
  ];

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
    setIsLoading(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.category) {
        console.error('Required fields missing:', { name: formData.name, email: formData.email, category: formData.category });
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields (Name, Email, and License Category)",
          variant: "destructive",
        });
        return;
      }

      // Add application to dataManager
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
        documents: formData.documents,
        notes: formData.notes
      });

      console.log('Application added successfully:', newApplication);

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

  if (isLoading && !isSubmitting) {
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
                  onChange={(e) => {
                    console.log('Name changed:', e.target.value);
                    setFormData(prev => ({ ...prev, name: e.target.value }));
                  }}
                  required
                  className="mt-2"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    console.log('Email changed:', e.target.value);
                    setFormData(prev => ({ ...prev, email: e.target.value }));
                  }}
                  required
                  className="mt-2"
                  placeholder="Enter your email address"
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
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <Label htmlFor="company">Company/Organization</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  className="mt-2"
                  placeholder="Enter your company name"
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
            <h3 className="text-xl font-semibold">License Category *</h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {licenseCategories.map((category) => (
              <div
                key={category.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  formData.category === category.id 
                    ? 'border-primary bg-primary/10 ring-2 ring-primary' 
                    : 'border-border hover:border-primary/50'
                } ${!category.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => {
                  if (category.available) {
                    console.log('Category selected:', category.id, category.name);
                    setFormData(prev => ({ ...prev, category: category.id }));
                  }
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{category.name}</h4>
                  {!category.available && <Badge variant="destructive">Sold Out</Badge>}
                  {category.available && formData.category === category.id && <Badge>Selected</Badge>}
                </div>
                <p className="text-2xl font-bold text-primary mb-2">{category.price}</p>
                <p className="text-sm text-muted-foreground">Min Volume: {category.minVolume}</p>
              </div>
            ))}
          </div>
          {!formData.category && (
            <p className="text-sm text-destructive mt-2">Please select a license category</p>
          )}
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
            
            <div className="p-4 bg-muted/30 rounded-lg mb-4">
              <p><strong>Selected License:</strong> {selectedCategory.name} - {selectedCategory.price}</p>
              <p className="text-sm text-muted-foreground">Please send payment to one of the addresses below and include your application details.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">Bitcoin Address</Label>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 p-3 bg-muted rounded font-mono text-sm break-all">{settings.bitcoinAddress}</div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyAddress(settings.bitcoinAddress, 'Bitcoin')}
                    className={copiedAddress === 'Bitcoin' ? 'bg-green-100 text-green-700' : ''}
                  >
                    {copiedAddress === 'Bitcoin' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div>
                <Label className="text-base font-medium">Ethereum Address</Label>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 p-3 bg-muted rounded font-mono text-sm break-all">{settings.ethereumAddress}</div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyAddress(settings.ethereumAddress, 'Ethereum')}
                    className={copiedAddress === 'Ethereum' ? 'bg-green-100 text-green-700' : ''}
                  >
                    {copiedAddress === 'Ethereum' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div>
                <Label className="text-base font-medium">USDT Address</Label>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 p-3 bg-muted rounded font-mono text-sm break-all">{settings.usdtAddress}</div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyAddress(settings.usdtAddress, 'USDT')}
                    className={copiedAddress === 'USDT' ? 'bg-green-100 text-green-700' : ''}
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
            className="px-12 py-6 text-lg"
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
