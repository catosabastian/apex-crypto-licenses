
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Shield, User, Building, Phone, Mail, FileText, CreditCard, AlertCircle, CheckCircle, Clock, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

interface ApplicationFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  category: string;
  notes: string;
  paymentMethod: string;
  transactionId: string;
  amount: string;
}

interface LicenseCategory {
  id: string;
  name: string;
  price: string;
  available: boolean;
  minVolume: string;
  status: string;
  description: string;
}

const UnifiedApplicationForm = () => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    category: '',
    notes: '',
    paymentMethod: '',
    transactionId: '',
    amount: ''
  });

  const [categories, setCategories] = useState<LicenseCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        const settings = await supabaseDataManager.getSettings();
        const licenseCategories = settings.license_categories || {};
        
        const categoryList: LicenseCategory[] = Object.entries(licenseCategories).map(([key, category]: [string, any]) => ({
          id: key,
          name: category.name,
          price: category.price,
          minVolume: category.minVolume,
          available: category.available,
          status: category.available ? 'AVAILABLE' : 'SOLD OUT',
          description: category.description || 'Professional license for trading operations'
        }));

        setCategories(categoryList);
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Error loading categories:', error);
        toast({
          title: "Error",
          description: "Failed to load license categories",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    const handleSettingsUpdate = () => {
      console.log('Settings updated event received');
      loadCategories();
    };

    supabaseDataManager.addEventListener('settings_updated', handleSettingsUpdate);
    loadCategories();

    return () => {
      supabaseDataManager.removeEventListener('settings_updated', handleSettingsUpdate);
    };
  }, []);

  const handleInputChange = (field: keyof ApplicationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category) {
      toast({
        title: "Error",
        description: "Please select a license category",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const selectedCategory = categories.find(cat => cat.id === formData.category);
      
      if (!selectedCategory?.available) {
        toast({
          title: "Error",
          description: "Selected category is currently unavailable",
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
        payment_method: formData.paymentMethod,
        transaction_id: formData.transactionId,
        amount: selectedCategory.price,
        status: 'pending' as const
      };

      const result = await supabaseDataManager.createApplication(applicationData);
      
      if (result) {
        toast({
          title: "Success",
          description: "Application submitted successfully",
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          category: '',
          notes: '',
          paymentMethod: '',
          transactionId: '',
          amount: ''
        });
      } else {
        throw new Error('Failed to create application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Error",
        description: "Failed to submit application",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCategory = categories.find(cat => cat.id === formData.category);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mr-3" />
          <span className="text-lg">Loading application form...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="border-2 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            License Application Form
          </CardTitle>
          <CardDescription>
            Submit your application for a professional trading license
          </CardDescription>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Personal Information</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="Enter your company name"
                  />
                </div>
              </div>
            </div>

            {/* License Category Selection */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">License Category *</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {categories.map((category) => (
                  <Card
                    key={category.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      formData.category === category.id 
                        ? 'ring-2 ring-primary border-primary shadow-lg' 
                        : category.available 
                          ? 'border-border hover:border-primary/50' 
                          : 'opacity-60 border-muted cursor-not-allowed'
                    }`}
                    onClick={() => {
                      if (category.available) {
                        handleInputChange('category', category.id);
                      }
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-sm">{category.name}</h4>
                        <Badge 
                          variant={category.available ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {category.status}
                        </Badge>
                      </div>
                      <p className="text-xl font-bold text-primary mb-1">{category.price}</p>
                      <p className="text-xs text-muted-foreground">Min Volume: {category.minVolume}</p>
                      <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
                      
                      {formData.category === category.id && (
                        <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                          <CheckCircle className="h-3 w-3" />
                          Selected
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {!formData.category && (
                <div className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  Please select a license category
                </div>
              )}
            </div>

            {/* Payment Information */}
            {selectedCategory && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Payment Information</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="paymentMethod">Payment Method *</Label>
                    <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usdt">USDT (Tether)</SelectItem>
                        <SelectItem value="bitcoin">Bitcoin</SelectItem>
                        <SelectItem value="ethereum">Ethereum</SelectItem>
                        <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="transactionId">Transaction ID</Label>
                    <Input
                      id="transactionId"
                      value={formData.transactionId}
                      onChange={(e) => handleInputChange('transactionId', e.target.value)}
                      placeholder="Enter transaction ID"
                    />
                  </div>
                </div>
                
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm font-medium">Selected License: {selectedCategory.name}</p>
                  <p className="text-lg font-bold text-primary">Amount: {selectedCategory.price}</p>
                </div>
              </div>
            )}

            {/* Additional Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Additional Information</h3>
              </div>
              
              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Any additional information or special requirements"
                  rows={3}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={isSubmitting || !formData.category}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting Application...
                </>
              ) : (
                'Submit Application'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnifiedApplicationForm;
