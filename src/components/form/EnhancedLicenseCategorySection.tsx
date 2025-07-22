
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Shield, Clock, CheckCircle, AlertCircle, Star, TrendingUp, Users, Globe, Building2, Gamepad2, CreditCard, Coins, Landmark, Briefcase } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';

interface LicenseCategory {
  id: string;
  name: string;
  price: string;
  available: boolean;
  details: any;
  features: string[];
  icon: any;
  color: string;
  description: string;
  processingTime: string;
  minVolume: string;
  category: string;
}

interface EnhancedLicenseCategorySectionProps {
  categories: LicenseCategory[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
  settings: any;
}

const EnhancedLicenseCategorySection = ({ 
  categories, 
  selectedCategory, 
  onCategorySelect,
  settings 
}: EnhancedLicenseCategorySectionProps) => {
  
  // Enhanced license categories with all types
  const enhancedCategories = [
    {
      id: 'crypto_exchange',
      name: 'Crypto Exchange License',
      price: settings.cryptoExchangePrice || '250,000 USDT',
      available: settings.cryptoExchangeAvailable ?? true,
      description: 'Full cryptocurrency exchange operations with trading pairs',
      processingTime: '6-12 weeks',
      minVolume: '$1,000,000+',
      category: 'Crypto',
      icon: Coins,
      color: 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 text-yellow-800',
      features: [
        'Multi-currency trading platform',
        'Spot & margin trading',
        'API access for institutional clients',
        'Cold storage integration',
        'KYC/AML compliance framework',
        'Global market access'
      ]
    },
    {
      id: 'crypto_wallet',
      name: 'Crypto Wallet License',
      price: settings.cryptoWalletPrice || '150,000 USDT',
      available: settings.cryptoWalletAvailable ?? true,
      description: 'Digital wallet services for cryptocurrency custody',
      processingTime: '4-8 weeks',
      minVolume: '$500,000+',
      category: 'Crypto',
      icon: Shield,
      color: 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 text-blue-800',
      features: [
        'Multi-signature wallet technology',
        'Hardware security modules',
        'Mobile & web applications',
        'Cross-chain compatibility',
        'Institutional custody solutions',
        'Insurance coverage'
      ]
    },
    {
      id: 'fintech_emi',
      name: 'Electronic Money Institution',
      price: settings.fintechEmiPrice || '350,000 USDT',
      available: settings.fintechEmiAvailable ?? true,
      description: 'Issue electronic money and provide payment services',
      processingTime: '8-16 weeks',
      minVolume: '$2,000,000+',
      category: 'FinTech',
      icon: CreditCard,
      color: 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 text-green-800',
      features: [
        'Electronic money issuance',
        'Payment processing',
        'SEPA integration',
        'Cross-border transfers',
        'Merchant services',
        'Banking partnerships'
      ]
    },
    {
      id: 'fintech_msp',
      name: 'Money Service Provider',
      price: settings.fintechMspPrice || '200,000 USDT',
      available: settings.fintechMspAvailable ?? true,
      description: 'Money transmission and payment services',
      processingTime: '6-10 weeks',
      minVolume: '$750,000+',
      category: 'FinTech',
      icon: TrendingUp,
      color: 'bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 text-purple-800',
      features: [
        'Money transmission services',
        'Foreign exchange',
        'Remittance services',
        'Digital payment solutions',
        'Compliance monitoring',
        'Risk management systems'
      ]
    },
    {
      id: 'gambling_online',
      name: 'Online Gambling License',
      price: settings.gamblingOnlinePrice || '180,000 USDT',
      available: settings.gamblingOnlineAvailable ?? true,
      description: 'Online casino, sports betting, and gaming operations',
      processingTime: '8-12 weeks',
      minVolume: '$500,000+',
      category: 'Gambling',
      icon: Gamepad2,
      color: 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200 text-red-800',
      features: [
        'Online casino operations',
        'Sports betting platform',
        'Live dealer games',
        'Mobile gaming apps',
        'Player protection measures',
        'Responsible gambling tools'
      ]
    },
    {
      id: 'gambling_lottery',
      name: 'Lottery & Gaming License',
      price: settings.gamblingLotteryPrice || '120,000 USDT',
      available: settings.gamblingLotteryAvailable ?? true,
      description: 'Lottery operations and skill-based gaming',
      processingTime: '4-8 weeks',
      minVolume: '$300,000+',
      category: 'Gambling',
      icon: Star,
      color: 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 text-indigo-800',
      features: [
        'Lottery ticket sales',
        'Instant win games',
        'Skill-based competitions',
        'Prize management',
        'Random number generation',
        'Regulatory compliance'
      ]
    },
    {
      id: 'corporate_offshore',
      name: 'Offshore Corporate License',
      price: settings.corporateOffshorePrice || '80,000 USDT',
      available: settings.corporateOffshoreAvailable ?? true,
      description: 'International business company formation',
      processingTime: '2-4 weeks',
      minVolume: '$100,000+',
      category: 'Corporate',
      icon: Building2,
      color: 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200 text-gray-800',
      features: [
        'Tax optimization structures',
        'Asset protection',
        'International banking',
        'Privacy protection',
        'Nominee services',
        'Corporate governance'
      ]
    },
    {
      id: 'corporate_consulting',
      name: 'Business Consulting License',
      price: settings.corporateConsultingPrice || '60,000 USDT',
      available: settings.corporateConsultingAvailable ?? true,
      description: 'Professional consulting and advisory services',
      processingTime: '2-3 weeks',
      minVolume: '$50,000+',
      category: 'Corporate',
      icon: Briefcase,
      color: 'bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200 text-teal-800',
      features: [
        'Management consulting',
        'Financial advisory',
        'Legal compliance support',
        'Market research',
        'Strategic planning',
        'Risk assessment'
      ]
    }
  ];

  // Group categories by type
  const groupedCategories = enhancedCategories.reduce((acc, category) => {
    if (!acc[category.category]) {
      acc[category.category] = [];
    }
    acc[category.category].push(category);
    return acc;
  }, {} as Record<string, typeof enhancedCategories>);

  const availableCategories = enhancedCategories.filter(cat => cat.available);
  const soldOutCategories = enhancedCategories.filter(cat => !cat.available);

  return (
    <Card className="border-2 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-background to-muted/20">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/20 rounded-xl">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Professional License Selection
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Choose from our comprehensive range of financial services licenses
              </p>
            </div>
          </div>
          <Badge variant={selectedCategory ? "default" : "secondary"} className="px-4 py-2">
            {selectedCategory ? "Selected" : "Required"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-8 p-6">
        {/* Availability Status */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <span className="font-semibold text-green-800">{availableCategories.length} Licenses Available</span>
              <p className="text-sm text-green-600">Ready for immediate processing</p>
            </div>
          </div>
          {soldOutCategories.length > 0 && (
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              <span className="text-sm text-amber-700 font-medium">
                {soldOutCategories.length} Currently Unavailable
              </span>
            </div>
          )}
        </div>

        {/* License Categories by Type */}
        {Object.entries(groupedCategories).map(([categoryType, categoryList]) => (
          <div key={categoryType} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px bg-gradient-to-r from-primary/30 to-transparent flex-1" />
              <h3 className="text-lg font-semibold text-primary bg-background px-4 py-2 rounded-full border">
                {categoryType} Licenses
              </h3>
              <div className="h-px bg-gradient-to-l from-primary/30 to-transparent flex-1" />
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <TooltipProvider>
                {categoryList.map((category) => {
                  const IconComponent = category.icon;
                  const isSelected = selectedCategory === category.id;
                  
                  return (
                    <Tooltip key={category.id}>
                      <TooltipTrigger asChild>
                        <Card 
                          className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                            isSelected 
                              ? 'ring-2 ring-primary border-primary shadow-lg scale-105' 
                              : category.available 
                                ? 'border-border hover:border-primary/50 hover:shadow-md' 
                                : 'opacity-60 border-muted cursor-not-allowed grayscale'
                          } ${category.color}`}
                          onClick={() => {
                            if (category.available) {
                              onCategorySelect(category.id);
                            }
                          }}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`p-3 rounded-xl bg-white/70 shadow-sm`}>
                                  <IconComponent className="h-6 w-6" />
                                </div>
                                <div>
                                  <h3 className="font-bold text-lg leading-tight">{category.name}</h3>
                                  <p className="text-3xl font-bold text-primary mt-1">{category.price}</p>
                                </div>
                              </div>
                              
                              <div className="flex flex-col items-end gap-2">
                                {!category.available && (
                                  <Badge variant="destructive" className="text-xs font-semibold">
                                    SOLD OUT
                                  </Badge>
                                )}
                                {isSelected && (
                                  <Badge className="text-xs font-semibold bg-green-600">
                                    ✓ SELECTED
                                  </Badge>
                                )}
                                {category.id.includes('crypto') && category.available && (
                                  <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                                    HOT
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                              {category.description}
                            </p>
                          </CardHeader>
                          
                          <CardContent className="pt-0">
                            <div className="space-y-4">
                              {/* Processing Time & Volume */}
                              <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2 text-sm">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <span>{category.processingTime}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                  <span>{category.minVolume}</span>
                                </div>
                              </div>

                              <Separator />

                              {/* Features */}
                              <div className="space-y-3">
                                <h4 className="text-sm font-semibold flex items-center gap-2">
                                  <Star className="h-4 w-4 text-yellow-500" />
                                  Key Features
                                </h4>
                                <div className="grid gap-2">
                                  {category.features.slice(0, 4).map((feature, index) => (
                                    <div key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                                      <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                                      {feature}
                                    </div>
                                  ))}
                                  {category.features.length > 4 && (
                                    <div className="text-xs text-muted-foreground font-medium">
                                      +{category.features.length - 4} more features
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TooltipTrigger>
                      
                      <TooltipContent side="top" className="max-w-sm p-4">
                        <div className="space-y-3">
                          <div>
                            <p className="font-semibold">{category.name}</p>
                            <p className="text-sm text-muted-foreground">{category.description}</p>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-sm"><strong>Processing:</strong> {category.processingTime}</p>
                            <p className="text-sm"><strong>Min Volume:</strong> {category.minVolume}</p>
                          </div>
                          
                          <div className="pt-2 border-t">
                            <p className="text-xs text-muted-foreground">
                              {category.available 
                                ? `Click to select this license for ${category.price}` 
                                : 'This license type is currently unavailable'
                              }
                            </p>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </TooltipProvider>
            </div>
          </div>
        ))}

        {/* Selection Summary */}
        {selectedCategory && (
          <div className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-primary text-lg">Selected License</h4>
                <p className="text-muted-foreground">
                  {enhancedCategories.find(c => c.id === selectedCategory)?.name} - {enhancedCategories.find(c => c.id === selectedCategory)?.price}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Processing time: {enhancedCategories.find(c => c.id === selectedCategory)?.processingTime}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onCategorySelect('')}
                className="hover:bg-primary/10"
              >
                Change Selection
              </Button>
            </div>
          </div>
        )}

        {!selectedCategory && (
          <div className="text-center py-8 text-muted-foreground">
            <AlertCircle className="h-8 w-8 mx-auto mb-3 text-amber-500" />
            <p className="text-lg font-medium">Please select a license category to continue</p>
            <p className="text-sm">Choose from our comprehensive range of professional licenses above</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedLicenseCategorySection;
