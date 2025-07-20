
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ChevronRight, MessageSquareText, XCircle, Shield, Star, Crown, Building, Zap, Trophy, Wifi } from 'lucide-react';
import { useApplicationDialog } from '@/components/ApplicationDialog';
import SupportDialog from '@/components/SupportDialog';
import { unifiedDataManager, WebsiteSettings } from '@/utils/unifiedDataManager';

const LicenseCategories = () => {
  const { openApplicationDialog } = useApplicationDialog();
  const [isSupportDialogOpen, setSupportDialogOpen] = useState(false);
  const [settings, setSettings] = useState<WebsiteSettings>(unifiedDataManager.getSettings());
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    console.log('[LicenseCategories] Component mounted, listening for settings updates');
    
    const handleSettingsUpdate = (data: any) => {
      console.log('[LicenseCategories] Settings update received:', data);
      const newSettings = data.settings || data;
      setSettings(newSettings);
      setLastUpdateTime(new Date());
      setIsConnected(true);
    };

    unifiedDataManager.addEventListener('settings_updated', handleSettingsUpdate);

    return () => {
      unifiedDataManager.removeEventListener('settings_updated', handleSettingsUpdate);
    };
  }, []);
  
  return (
    <section id="licenses" className="py-24 bg-muted/20">
      <div className="container">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent rounded-full"></div>
            <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">License Categories</span>
            <div className="flex items-center gap-2 ml-auto">
              <Wifi className={`h-4 w-4 ${isConnected ? 'text-green-500' : 'text-red-500'}`} />
              <span className={`text-xs ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                {isConnected ? 'Live Updates' : 'Disconnected'}
              </span>
              <span className="text-xs text-muted-foreground">
                {lastUpdateTime.toLocaleTimeString()}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Comprehensive Licensing
                <span className="block gradient-text">Solutions</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Choose from our six specialized license categories, each designed to meet different trading volumes and regulatory requirements.
              </p>
            </div>
          </div>
          
          {/* Main License Categories - 3x2 Grid */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-12">
            <LicenseCategory 
              category={1}
              title="Basic Trader"
              price={settings.category1Price}
              minVolume="$50,000"
              icon={Shield}
              color="blue"
              features={[
                "1-year validity period",
                "Individual trader verification",
                "Basic compliance certification",
                "Standard support response",
                "Recognized on major exchanges",
                "Email support during business hours"
              ]}
              soldOut={!settings.category1Available}
            />
            
            <LicenseCategory 
              category={2}
              title="Standard Trader"
              price={settings.category2Price}
              minVolume="$100,000"
              icon={CheckCircle}
              color="green"
              features={[
                "1-year validity period",
                "Enhanced verification process",
                "Standard compliance certification",
                "Priority support response",
                "Recognized on major exchanges",
                "Basic trading protection coverage",
                "Phone support during business hours"
              ]}
              soldOut={!settings.category2Available}
            />
            
            <LicenseCategory 
              category={3}
              title="Advanced Trader"
              price={settings.category3Price}
              minVolume="$250,000"
              icon={Star}
              color="purple"
              features={[
                "1-year validity period",
                "Priority verification process",
                "Advanced compliance certification",
                "24/7 support response",
                "Recognized on major exchanges",
                "Trading strategy protection",
                "Dedicated account manager",
                "Advanced risk management tools"
              ]}
              soldOut={!settings.category3Available}
              onApplyClick={openApplicationDialog}
            />

            <LicenseCategory 
              category={4}
              title="Professional Trader"
              price={settings.category4Price}
              minVolume="$500,000"
              icon={Crown}
              color="gold"
              features={[
                "1-year validity period",
                "Fast-track verification",
                "Professional compliance cert",
                "Dedicated support line",
                "Global regulatory recognition",
                "Advanced trading protection",
                "Multi-exchange access privileges",
                "Custom compliance framework",
                "Premium trading tools access"
              ]}
              popular
              soldOut={!settings.category4Available}
              onApplyClick={openApplicationDialog}
            />
            
            <LicenseCategory 
              category={5}
              title="Institutional Trader"
              price={settings.category5Price}
              minVolume="$1,000,000+"
              icon={Building}
              color="platinum"
              features={[
                "1-year validity period",
                "Expedited verification process",
                "Comprehensive compliance cert",
                "Dedicated account representative",
                "Global regulatory recognition",
                "Full trading strategy protection",
                "Multi-user access controls",
                "Custom compliance framework",
                "White-label solutions available",
                "API access for system integration"
              ]}
              soldOut={!settings.category5Available}
              onApplyClick={openApplicationDialog}
            />

            <LicenseCategory 
              category={6}
              title="Executive Trader"
              price={settings.category6Price}
              minVolume="$2,500,000+"
              icon={Trophy}
              color="diamond"
              features={[
                "1-year validity period",
                "Instant verification process",
                "Executive compliance certification",
                "Personal account executive",
                "Worldwide regulatory recognition",
                "Complete trading ecosystem protection",
                "Unlimited user access controls",
                "Bespoke compliance framework",
                "Private trading infrastructure",
                "Direct regulatory liaison",
                "Custom integration solutions"
              ]}
              exclusive
              soldOut={!settings.category6Available}
              onApplyClick={openApplicationDialog}
            />
          </div>
          
          {/* Enterprise Solution Card */}
          <Card className="border-2 border-accent/30 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <MessageSquareText className="h-6 w-6 text-accent" />
                Enterprise Solution
              </CardTitle>
              <CardDescription className="text-lg">
                Tailored licensing solutions for large corporations and institutional clients requiring customized regulatory frameworks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Corporate entity verification</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Custom compliance framework</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Dedicated legal advisors</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Global regulatory coordination</span>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Button 
                    size="lg"
                    variant="outline" 
                    className="gap-3 border-2 border-accent/30 hover:bg-accent/10 px-8 py-6" 
                    onClick={() => setSupportDialogOpen(true)}
                  >
                    <MessageSquareText className="h-5 w-5" />
                    Contact Enterprise Team
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <SupportDialog open={isSupportDialogOpen} onOpenChange={setSupportDialogOpen} />
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
  icon: any;
  color: string;
  features: string[];
  popular?: boolean;
  exclusive?: boolean;
  soldOut?: boolean;
  onApplyClick?: () => void;
}

const LicenseCategory = ({ category, title, price, minVolume, icon: Icon, color, features, popular, exclusive, soldOut, onApplyClick }: LicenseCategoryProps) => {
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
      green: 'from-green-500/20 to-green-600/20 border-green-500/30',
      purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
      gold: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30',
      platinum: 'from-gray-400/20 to-gray-600/20 border-gray-500/30',
      diamond: 'from-cyan-500/20 to-purple-500/20 border-cyan-500/30'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <Card className={`relative h-full transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${
      popular ? 'border-2 border-accent shadow-xl' : 
      exclusive ? 'border-2 border-gradient-to-r from-cyan-500 to-purple-500 shadow-2xl' : 
      'border border-border/60'
    } ${soldOut ? 'opacity-70' : ''}`}>
      {popular && !soldOut && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <Badge className="bg-accent text-white border-0 px-4 py-1 text-sm font-semibold">
            <Star className="h-4 w-4 mr-1" />
            Most Popular
          </Badge>
        </div>
      )}
      
      {exclusive && !soldOut && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <Badge className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0 px-4 py-1 text-sm font-semibold">
            <Zap className="h-4 w-4 mr-1" />
            Exclusive
          </Badge>
        </div>
      )}
      
      {soldOut && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <Badge variant="destructive" className="bg-red-500 text-white border-0 px-4 py-1 text-sm font-semibold">
            <XCircle className="h-4 w-4 mr-1" />
            Sold Out
          </Badge>
        </div>
      )}
      
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getColorClasses(color)} border-2 flex items-center justify-center`}>
            <Icon className="h-7 w-7 text-foreground" />
          </div>
          <Badge variant="outline" className="text-sm font-medium">
            Category {category}
          </Badge>
        </div>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription className="text-base">
          Trade Volume: {minVolume} minimum
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="mb-6">
          <div className="text-4xl font-bold text-accent mb-2">{price}</div>
          <p className="text-sm text-muted-foreground font-medium">1-year license validity</p>
        </div>
        
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className={`w-full gap-2 py-3 font-semibold ${
            popular && !soldOut ? 'btn-primary' : 
            exclusive && !soldOut ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600' : 
            'variant-outline'
          }`}
          onClick={onApplyClick}
          disabled={soldOut}
        >
          {soldOut ? (
            <>
              <XCircle className="h-4 w-4" />
              Sold Out
            </>
          ) : (
            <>
              Apply Now
              <ChevronRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LicenseCategories;
