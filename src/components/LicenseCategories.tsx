
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, ChevronRight, CreditCard, DollarSign, Bitcoin, MessageSquareText } from 'lucide-react';
import { useApplicationDialog } from '@/components/ApplicationDialog';

const LicenseCategories = () => {
  const [currency, setCurrency] = useState<'USD' | 'USDT' | 'BTC' | 'ETH' | 'XRP'>('USD');
  const [rates, setRates] = useState({
    USDT: 1,
    BTC: 0.000333,  // Roughly 1 BTC = $60,000
    ETH: 0.00333,   // Roughly 1 ETH = $3,000 
    XRP: 16.67      // Roughly 1 XRP = $0.06
  });
  const { openApplicationDialog } = useApplicationDialog();
  
  // Fetch real exchange rates
  useEffect(() => {
    const fetchRates = async () => {
      try {
        // In a real application, you would fetch actual rates from a crypto API
        // For now, using example rates that match approximately real market values
        // These rates ensure that the displayed crypto amounts equal the USD values
        setRates({
          USDT: 1,        // 1 USDT = $1
          BTC: 0.000333,  // $1 = 0.000333 BTC (1 BTC ≈ $60,000)
          ETH: 0.00333,   // $1 = 0.00333 ETH (1 ETH ≈ $3,000)
          XRP: 16.67      // $1 = 16.67 XRP (1 XRP ≈ $0.06)
        });
      } catch (error) {
        console.error("Error fetching crypto rates:", error);
      }
    };
    
    fetchRates();
    // In a production environment, we'd update rates periodically
    // const interval = setInterval(fetchRates, 60000);
    // return () => clearInterval(interval);
  }, []);
  
  const formatPrice = (usdPrice: number): string => {
    if (currency === 'USD') return `$${usdPrice.toLocaleString()}`;
    
    const converted = usdPrice * rates[currency as keyof typeof rates];
    
    switch(currency) {
      case 'USDT':
        return `${converted.toLocaleString()} USDT`;
      case 'BTC':
        return `${converted.toFixed(6)} BTC`;
      case 'ETH':
        return `${converted.toFixed(4)} ETH`;
      case 'XRP':
        return `${converted.toFixed(2)} XRP`;
      default:
        return `${converted} ${currency}`;
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
              category={1}
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
              onApplyClick={openApplicationDialog}
            />
            
            <LicenseCategory 
              category={2}
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
              onApplyClick={openApplicationDialog}
            />
            
            <LicenseCategory 
              category={3}
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
              onApplyClick={openApplicationDialog}
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
                <Button variant="outline" className="gap-2" onClick={openApplicationDialog}>
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
  category: number;
  title: string;
  price: string;
  minVolume: string;
  features: string[];
  popular?: boolean;
  onApplyClick: () => void;
}

const LicenseCategory = ({ category, title, price, minVolume, features, popular, onApplyClick }: LicenseCategoryProps) => {
  return (
    <Card className={`relative h-full ${popular ? 'border-accent shadow-lg' : ''}`}>
      {popular && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <Badge variant="secondary" className="bg-accent text-white border-0">Recommended</Badge>
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="mb-2">Category {category}</Badge>
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
        <Button className="w-full gap-2" variant={popular ? "default" : "outline"} onClick={onApplyClick}>
          Apply Now
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LicenseCategories;
