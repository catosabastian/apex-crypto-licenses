
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, ChevronRight, CreditCard, DollarSign, Bitcoin, MessageSquareText } from 'lucide-react';

const LicenseTiers = () => {
  const [currency, setCurrency] = useState<'USD' | 'USDT' | 'BTC' | 'ETH' | 'XRP'>('USD');
  
  // Live conversion rates
  const rates = {
    USDT: 1,
    BTC: 0.00003846, // Approximate rate for $26,000 BTC
    ETH: 0.00055556, // Approximate rate for $1,800 ETH
    XRP: 1.42857143  // Approximate rate for $0.70 XRP
  };
  
  const formatPrice = (usdPrice: number): string => {
    if (currency === 'USD') return `$${usdPrice.toLocaleString()}`;
    
    const converted = usdPrice * rates[currency as keyof typeof rates];
    
    return currency === 'USDT' 
      ? `${converted.toLocaleString()} USDT`
      : `${converted.toFixed(currency === 'BTC' ? 6 : currency === 'ETH' ? 4 : 2)} ${currency}`;
  };
  
  const scrollToApplication = () => {
    const applicationSection = document.getElementById('application');
    if (applicationSection) {
      applicationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section id="licenses" className="py-20 bg-muted/30">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 w-12 bg-primary"></div>
            <span className="text-sm text-muted-foreground uppercase tracking-wider">License Categories</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Regulatory Licensing Categories
              </h2>
              <p className="text-lg text-muted-foreground mt-2">
                Select the appropriate license category based on your trading volume and activity.
              </p>
            </div>
            
            <div className="bg-card rounded-lg border">
              <Tabs defaultValue="USD" className="w-full">
                <TabsList className="grid grid-cols-5 w-full">
                  <TabsTrigger value="USD" onClick={() => setCurrency('USD')}>
                    <DollarSign className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="USDT" onClick={() => setCurrency('USDT')}>USDT</TabsTrigger>
                  <TabsTrigger value="BTC" onClick={() => setCurrency('BTC')}>BTC</TabsTrigger>
                  <TabsTrigger value="ETH" onClick={() => setCurrency('ETH')}>ETH</TabsTrigger>
                  <TabsTrigger value="XRP" onClick={() => setCurrency('XRP')}>XRP</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <LicenseCategory 
              level={1}
              title="Individual Trader"
              price={formatPrice(20000)}
              minVolume="$50,000"
              features={[
                "1-year validity period",
                "Individual trader verification",
                "Basic compliance certification",
                "Standard support response",
                "Recognized on all exchanges"
              ]}
              onApply={scrollToApplication}
            />
            
            <LicenseCategory 
              level={2}
              title="Advanced Trader"
              price={formatPrice(40000)}
              minVolume="$250,000"
              features={[
                "1-year validity period",
                "Priority verification process",
                "Advanced compliance certification",
                "24/7 support response",
                "Recognized on all exchanges",
                "Trading strategy protection"
              ]}
              popular
              onApply={scrollToApplication}
            />
            
            <LicenseCategory 
              level={3}
              title="Institutional Trader"
              price={formatPrice(70000)}
              minVolume="$1,000,000+"
              features={[
                "1-year validity period",
                "Expedited verification process",
                "Comprehensive compliance certification",
                "Dedicated account representative",
                "Global regulatory recognition",
                "Trading strategy protection",
                "Multi-user access controls"
              ]}
              onApply={scrollToApplication}
            />
          </div>
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquareText className="h-5 w-5" />
                Enterprise Solution
              </CardTitle>
              <CardDescription>For corporate entities and institutional clients requiring customized licensing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Corporate entity verification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Custom compliance framework</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Dedicated legal advisors</span>
                  </div>
                </div>
                <Button variant="outline" className="gap-2" onClick={scrollToApplication}>
                  Contact Support
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

interface LicenseCategoryProps {
  level: number;
  title: string;
  price: string;
  minVolume: string;
  features: string[];
  popular?: boolean;
  onApply: () => void;
}

const LicenseCategory = ({ level, title, price, minVolume, features, popular, onApply }: LicenseCategoryProps) => {
  return (
    <Card className={`relative h-full ${popular ? 'border-accent shadow-lg' : ''}`}>
      {popular && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <Badge variant="secondary" className="bg-accent text-white border-0">Recommended</Badge>
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="mb-2">Level {level}</Badge>
          {popular && <CheckCircle className="h-5 w-5 text-accent" />}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Monthly Volume: {minVolume} minimum</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="mb-6">
          <div className="text-3xl font-bold">{price}</div>
          <p className="text-sm text-muted-foreground">1-year license validity</p>
        </div>
        
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary mt-1 shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full gap-2" 
          variant={popular ? "default" : "outline"}
          onClick={onApply}
        >
          Apply Now
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const AlertCircle = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
};

export default LicenseTiers;
