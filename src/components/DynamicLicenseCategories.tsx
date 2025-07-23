import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApplicationDialog } from '@/components/ApplicationDialog';
import { supabaseDataManager } from '@/utils/supabaseDataManager';
import { DollarSign, Shield, Briefcase, Gamepad2, Building, CheckCircle, Star, Crown, Trophy, Zap, MessageSquareText, ChevronRight, Wifi, Loader2, XCircle } from 'lucide-react';
import SupportDialog from '@/components/SupportDialog';

interface LicenseCategory {
  id: number;
  name: string;
  price: string;
  description: string;
  status: string;
  available: boolean;
  type: 'trading' | 'crypto' | 'fintech' | 'gambling' | 'corporate';
  icon: React.ComponentType<any>;
  features: string[];
  minVolume: string;
  popular?: boolean;
  exclusive?: boolean;
}

const DynamicLicenseCategories = () => {
  const [categories, setCategories] = useState<LicenseCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const [isConnected, setIsConnected] = useState(true);
  const [isSupportDialogOpen, setSupportDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { openApplicationDialog } = useApplicationDialog();

  // Default categories as fallback
  const defaultCategories: LicenseCategory[] = [
    {
      id: 1,
      name: 'Basic Trader',
      price: '$2,500',
      description: 'Individual trader verification with basic compliance',
      status: 'AVAILABLE',
      available: true,
      type: 'trading',
      icon: Shield,
      features: ['Basic trading access', 'Email support', 'Standard documentation', '1-year validity'],
      minVolume: '$50,000',
      popular: false,
      exclusive: false
    },
    {
      id: 2,
      name: 'Professional Trader',
      price: '$5,000',
      description: 'Enhanced verification with advanced compliance',
      status: 'RECOMMENDED',
      available: true,
      type: 'trading',
      icon: Crown,
      features: ['Institutional access', 'Custom integrations', 'Premium support', '1-year validity'],
      minVolume: '$500,000',
      popular: true,
      exclusive: false
    },
    {
      id: 3,
      name: 'Crypto Exchange',
      price: '$15,000',
      description: 'Cryptocurrency exchange licensing',
      status: 'AVAILABLE',
      available: true,
      type: 'crypto',
      icon: Shield,
      features: ['Exchange operations', 'Multi-currency support', 'KYC/AML compliance', '1-year validity'],
      minVolume: 'Variable',
      popular: false,
      exclusive: false
    }
  ];

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Add timeout to prevent infinite loading
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Loading timeout')), 5000)
        );
        
        const settingsPromise = supabaseDataManager.getSettings();
        const settings = await Promise.race([settingsPromise, timeoutPromise]) as Record<string, any>;
        
        const categoryData: LicenseCategory[] = [];
        
        // Define category types with enhanced details
        const categoryTypes = {
          1: { 
            type: 'trading' as const, 
            icon: Shield, 
            features: ['Basic trading access', 'Email support', 'Standard documentation', '1-year validity'],
            minVolume: '$50,000',
            popular: false,
            exclusive: false
          },
          2: { 
            type: 'trading' as const, 
            icon: CheckCircle, 
            features: ['Enhanced trading limits', 'Priority support', 'Advanced analytics', '1-year validity'],
            minVolume: '$100,000',
            popular: false,
            exclusive: false
          },
          3: { 
            type: 'trading' as const, 
            icon: Star, 
            features: ['Professional tools', 'API access', 'Dedicated account manager', '1-year validity'],
            minVolume: '$250,000',
            popular: false,
            exclusive: false
          },
          4: { 
            type: 'trading' as const, 
            icon: Crown, 
            features: ['Institutional access', 'Custom integrations', 'Premium support', '1-year validity'],
            minVolume: '$500,000',
            popular: true,
            exclusive: false
          },
          5: { 
            type: 'trading' as const, 
            icon: Building, 
            features: ['Enterprise solutions', 'White-label options', 'Global compliance', '1-year validity'],
            minVolume: '$1,000,000+',
            popular: false,
            exclusive: false
          },
          6: { 
            type: 'trading' as const, 
            icon: Trophy, 
            features: ['Executive privileges', 'Regulatory assistance', 'Full service package', '1-year validity'],
            minVolume: '$2,500,000+',
            popular: false,
            exclusive: true
          }
        };

        // Only create categories 1-6 for now
        for (let i = 1; i <= 6; i++) {
          const name = settings[`category${i}_name`] || defaultCategories.find(c => c.id === i)?.name || `Category ${i}`;
          const price = settings[`category${i}_price`] || defaultCategories.find(c => c.id === i)?.price || '$0';
          const description = settings[`category${i}_description`] || defaultCategories.find(c => c.id === i)?.description || 'Professional license category';
          const status = settings[`category${i}_status`] || 'AVAILABLE';
          const available = settings[`category${i}_available`] !== false;
          
          const categoryInfo = categoryTypes[i as keyof typeof categoryTypes];
          
          categoryData.push({
            id: i,
            name,
            price,
            description,
            status,
            available,
            type: categoryInfo.type,
            icon: categoryInfo.icon,
            features: categoryInfo.features,
            minVolume: categoryInfo.minVolume,
            popular: categoryInfo.popular,
            exclusive: categoryInfo.exclusive
          });
        }
        
        setCategories(categoryData);
        setLastUpdateTime(new Date());
        setIsConnected(true);
      } catch (error) {
        console.error('Error loading license categories:', error);
        setError('Failed to load license categories');
        setIsConnected(false);
        // Use default categories as fallback
        setCategories(defaultCategories);
      } finally {
        setIsLoading(false);
      }
    };

    const handleSettingsUpdate = () => {
      loadCategories();
    };

    supabaseDataManager.addEventListener('settings_updated', handleSettingsUpdate);
    loadCategories();
    
    return () => {
      supabaseDataManager.removeEventListener('settings_updated', handleSettingsUpdate);
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return 'bg-green-100 text-green-800 border-green-200';
      case 'RECOMMENDED': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'SELLING FAST': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'SOLD OUT': return 'bg-red-100 text-red-800 border-red-200';
      case 'COMING SOON': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'trading': return 'text-blue-600';
      case 'crypto': return 'text-purple-600';
      case 'fintech': return 'text-green-600';
      case 'gambling': return 'text-red-600';
      case 'corporate': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  if (isLoading) {
    return (
      <section id="dynamic-licenses" className="py-12 bg-muted/10">
        <div className="container">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
              <span className="text-sm">Loading additional categories...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="dynamic-licenses" className="py-12 bg-muted/10">
      <div className="container">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent rounded-full"></div>
            <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Additional Categories</span>
            <div className="flex items-center gap-2 ml-auto">
              <Wifi className={`h-4 w-4 ${isConnected ? 'text-green-500' : 'text-red-500'}`} />
              <span className={`text-xs ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                {isConnected ? 'Connected' : 'Offline'}
              </span>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">{error}. Showing default categories.</p>
            </div>
          )}
          
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {categories.map((category) => (
              <LicenseCategory 
                key={category.id}
                category={category}
                onApplyClick={category.available && category.status !== 'SOLD OUT' ? openApplicationDialog : undefined}
              />
            ))}
          </div>
          
          <SupportDialog open={isSupportDialogOpen} onOpenChange={setSupportDialogOpen} />
        </div>
      </div>
    </section>
  );
};

interface LicenseCategoryProps {
  category: LicenseCategory;
  onApplyClick?: () => void;
}

const LicenseCategory = ({ category, onApplyClick }: LicenseCategoryProps) => {
  const getColorClasses = (type: string) => {
    const colorMap = {
      trading: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
      crypto: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
      fintech: 'from-green-500/20 to-green-600/20 border-green-500/30',
      gambling: 'from-red-500/20 to-red-600/20 border-red-500/30',
      corporate: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30'
    };
    return colorMap[type] || colorMap.trading;
  };

  const getStatusBadge = () => {
    const soldOut = !category.available || category.status === 'SOLD OUT';
    
    if (soldOut) {
      return (
        <Badge variant="destructive" className="bg-red-500 text-white border-0 px-4 py-1 text-sm font-semibold">
          <XCircle className="h-4 w-4 mr-1" />
          Sold Out
        </Badge>
      );
    }
    
    if (category.popular && !soldOut) {
      return (
        <Badge className="bg-accent text-white border-0 px-4 py-1 text-sm font-semibold">
          <Star className="h-4 w-4 mr-1" />
          Most Popular
        </Badge>
      );
    }
    
    if (category.exclusive && !soldOut) {
      return (
        <Badge className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0 px-4 py-1 text-sm font-semibold">
          <Zap className="h-4 w-4 mr-1" />
          Exclusive
        </Badge>
      );
    }

    if (category.status === 'RECOMMENDED') {
      return (
        <Badge className="bg-green-500 text-white border-0 px-4 py-1 text-sm font-semibold">
          <Star className="h-4 w-4 mr-1" />
          Recommended
        </Badge>
      );
    }

    if (category.status === 'SELLING FAST') {
      return (
        <Badge className="bg-orange-500 text-white border-0 px-4 py-1 text-sm font-semibold">
          <Zap className="h-4 w-4 mr-1" />
          Selling Fast
        </Badge>
      );
    }

    return null;
  };

  const soldOut = !category.available || category.status === 'SOLD OUT';
  const Icon = category.icon;

  return (
    <Card className={`relative h-full transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${
      category.popular ? 'border-2 border-accent shadow-xl' : 
      category.exclusive ? 'border-2 border-gradient-to-r from-cyan-500 to-purple-500 shadow-2xl' : 
      'border border-border/60'
    } ${soldOut ? 'opacity-70' : ''}`}>
      {getStatusBadge() && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          {getStatusBadge()}
        </div>
      )}
      
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getColorClasses(category.type)} border-2 flex items-center justify-center`}>
              <Icon className="h-7 w-7 text-foreground" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">{category.name}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Category {category.id}
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-sm font-medium">
            {category.type}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="mb-6">
          <div className="text-3xl font-bold text-accent mb-2">{category.price}</div>
          <p className="text-sm text-muted-foreground font-medium">
            Min. Volume: {category.minVolume}
          </p>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          {category.description}
        </p>
        
        <div className="space-y-2">
          {category.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardContent className="pt-0">
        <Button 
          className={`w-full gap-2 py-3 font-semibold ${
            category.popular && !soldOut ? 'btn-primary' : 
            category.exclusive && !soldOut ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600' : 
            'variant-outline'
          }`}
          onClick={onApplyClick}
          disabled={soldOut || !onApplyClick}
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
      </CardContent>
    </Card>
  );
};

export default DynamicLicenseCategories;
