
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, Building, MapPin } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface EnhancedPersonalInfoSectionProps {
  formData: any;
  onChange: (field: string, value: string) => void;
  currentStep: number;
  onStepChange: (step: number) => void;
}

const EnhancedPersonalInfoSection = ({ 
  formData, 
  onChange, 
  currentStep, 
  onStepChange 
}: EnhancedPersonalInfoSectionProps) => {
  return (
    <Card className="border-2 transition-all duration-200 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Personal Information</CardTitle>
              <p className="text-sm text-muted-foreground">Required information for license application</p>
            </div>
          </div>
          <Badge variant={formData.name && formData.email ? "default" : "secondary"}>
            {formData.name && formData.email ? "Complete" : "Required"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => onChange('name', e.target.value)}
                    placeholder="Enter your full legal name"
                    className={`transition-all duration-200 ${
                      formData.name ? 'border-green-300 bg-green-50/30' : ''
                    }`}
                    required
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Enter your full legal name as it appears on official documents</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => onChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                    className={`transition-all duration-200 ${
                      formData.email ? 'border-green-300 bg-green-50/30' : ''
                    }`}
                    required
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Primary email for all license communications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              className={`transition-all duration-200 ${
                formData.phone ? 'border-green-300 bg-green-50/30' : ''
              }`}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Company/Organization
            </Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => onChange('company', e.target.value)}
              placeholder="Your company name (optional)"
              className={`transition-all duration-200 ${
                formData.company ? 'border-green-300 bg-green-50/30' : ''
              }`}
            />
          </div>
        </div>

        {/* Trading Experience Section */}
        <div className="pt-4 border-t">
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Trading Background
          </h4>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Trading Experience</Label>
              <Select value={formData.tradingExperience} onValueChange={(value) => onChange('tradingExperience', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                  <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                  <SelectItem value="advanced">Advanced (3-5 years)</SelectItem>
                  <SelectItem value="expert">Expert (5+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Monthly Trading Volume</Label>
              <Select value={formData.tradingVolume} onValueChange={(value) => onChange('tradingVolume', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select volume range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-50k">Under $50,000</SelectItem>
                  <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                  <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                  <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                  <SelectItem value="500k-1m">$500,000 - $1,000,000</SelectItem>
                  <SelectItem value="over-1m">Over $1,000,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Primary Trading Platform</Label>
              <Select value={formData.primaryPlatform} onValueChange={(value) => onChange('primaryPlatform', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="binance">Binance</SelectItem>
                  <SelectItem value="coinbase">Coinbase</SelectItem>
                  <SelectItem value="kraken">Kraken</SelectItem>
                  <SelectItem value="kucoin">KuCoin</SelectItem>
                  <SelectItem value="bybit">Bybit</SelectItem>
                  <SelectItem value="multiple">Multiple Platforms</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedPersonalInfoSection;
