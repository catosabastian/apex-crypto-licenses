
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EnhancedCard, EnhancedCardHeader, EnhancedCardContent, EnhancedCardFooter } from '@/components/ui/enhanced-card';
import { useApplicationDialog } from '@/components/ApplicationDialog';
import { CheckCircle, Star, Crown, Zap, Clock, AlertTriangle, TrendingUp, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { unifiedDataManager } from '@/utils/unifiedDataManager';

const LicenseCategories = () => {
  const [settings, setSettings] = useState(unifiedDataManager.getSettings());
  const { openApplicationDialog } = useApplicationDialog();

  useEffect(() => {
    const handleSettingsUpdate = () => {
      setSettings(unifiedDataManager.getSettings());
    };

    unifiedDataManager.addEventListener('settings_updated', handleSettingsUpdate);
    
    return () => {
      unifiedDataManager.removeEventListener('settings_updated', handleSettingsUpdate);
    };
  }, []);

  const categories = [
    {
      id: 'category1',
      title: 'Basic Trader License',
      subtitle: 'Individual Retail Trading',
      price: settings.category1Price,
      originalPrice: '15,000 USDT',
      available: false,
      popular: false,
      recommended: false,
      urgency: 'Sold Out',
      description: 'Entry-level trading certification for individual crypto traders',
      features: [
        'Personal trading authorization',
        'Basic compliance coverage',
        'Email support',
        'Standard processing time',
        'Single jurisdiction validity'
      ],
      processingTime: '72 hours',
      color: 'from-gray-400 to-gray-500',
      status: 'soldout'
    },
    {
      id: 'category2',
      title: 'Standard Trader License',
      subtitle: 'Enhanced Individual Trading',
      price: settings.category2Price,
      originalPrice: '35,000 USDT',
      available: false,
      popular: false,
      recommended: false,
      urgency: 'Sold Out',
      description: 'Enhanced trading capabilities for serious individual traders',
      features: [
        'Enhanced trading limits',
        'Priority email support',
        'Multi-asset coverage',
        'Faster processing',
        'Regional validity'
      ],
      processingTime: '48 hours',
      color: 'from-gray-400 to-gray-500',
      status: 'soldout'
    },
    {
      id: 'category3',
      title: 'Advanced Trader License',
      subtitle: 'Professional Trading',
      price: settings.category3Price,
      originalPrice: '75,000 USDT',
      available: false,
      popular: false,
      recommended: false,
      urgency: 'Sold Out - High Demand',
      description: 'Professional-grade licensing for advanced traders',
      features: [
        'High-volume trading authorization',
        'Priority support channel',
        'Advanced compliance tools',
        'Fast-track processing',
        'Multi-jurisdiction validity',
        'Risk management tools'
      ],
      processingTime: '48 hours',
      color: 'from-gray-400 to-gray-500',
      status: 'soldout'
    },
    {
      id: 'category4',
      title: 'Professional Trader License',
      subtitle: 'High-Volume Professional',
      price: settings.category4Price,
      originalPrice: '200,000 USDT',
      available: true,
      popular: true,
      recommended: false,
      urgency: 'Most Popular Choice',
      description: 'Premium licensing for high-volume professional traders',
      features: [
        'Unlimited trading volume',
        'Dedicated account manager',
        '24/7 phone support',
        'Priority processing (24h)',
        'Global jurisdiction validity',
        'Advanced analytics dashboard',
        'Custom compliance solutions',
        'White-glove onboarding'
      ],
      processingTime: '24 hours',
      color: 'from-purple-500 to-pink-500',
      status: 'popular'
    },
    {
      id: 'category5',
      title: 'Institutional License',
      subtitle: 'Enterprise & Institutions',
      price: settings.category5Price,
      originalPrice: '500,000 USDT',
      available: true,
      popular: false,
      recommended: true,
      urgency: 'Best Value - Premium',
      description: 'Comprehensive institutional-grade licensing solution',
      features: [
        'Enterprise-level authorization',
        'Dedicated compliance team',
        'Custom regulatory framework',
        'Expedited processing (12h)',
        'Worldwide jurisdiction coverage',
        'Real-time compliance monitoring',
        'Executive support line',
        'Custom integration support',
        'Regulatory consulting included'
      ],
      processingTime: '12 hours',
      color: 'from-amber-500 to-orange-500',
      status: 'recommended'
    },
    {
      id: 'category6',
      title: 'Elite Enterprise License',
      subtitle: 'Ultimate Premium Solution',
      price: settings.category6Price,
      originalPrice: '1,000,000 USDT',
      available: true,
      popular: false,
      recommended: true,
      urgency: 'Exclusive Premium Choice',
      description: 'The ultimate licensing solution for elite enterprises',
      features: [
        'Unlimited enterprise authorization',
        'Executive compliance team',
        'Bespoke regulatory solutions',
        'Instant processing (6h)',
        'Global regulatory immunity',
        'AI-powered compliance suite',
        'C-suite direct access',
        'Custom platform development',
        'Regulatory lobbying support',
        'International legal team access'
      ],
      processingTime: '6 hours',
      color: 'from-gradient-start to-gradient-end',
      status: 'premium'
    }
  ];

  const getStatusBadge = (category: any) => {
    switch (category.status) {
      case 'soldout':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200 animate-pulse">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Sold Out
          </Badge>
        );
      case 'popular':
        return (
          <Badge className="bg-purple-100 text-purple-800 border-purple-200 animate-bounce">
            <TrendingUp className="h-3 w-3 mr-1" />
            Most Popular
          </Badge>
        );
      case 'recommended':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <Star className="h-3 w-3 mr-1" />
            Best Value
          </Badge>
        );
      case 'premium':
        return (
          <Badge className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-amber-200">
            <Crown className="h-3 w-3 mr-1" />
            <Sparkles className="h-3 w-3 ml-1" />
          </Badge>
        );
      default:
        return null;
    }
  };

  const getCardVariant = (category: any) => {
    if (!category.available) return "default";
    if (category.recommended || category.status === 'premium') return "gradient";
    if (category.popular) return "elevated";
    return "default";
  };

  const handleApplyNow = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (category && category.available) {
      openApplicationDialog();
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-accent/5">
      <div className="container">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Zap className="h-4 w-4 mr-2" />
              License Categories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Choose Your Trading License
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional cryptocurrency trading licenses designed for traders, institutions, and enterprises
            </p>
          </div>

          {/* Urgency Banner */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg p-4 mb-12 text-center animate-pulse">
            <div className="flex items-center justify-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-semibold">Limited Time Availability</span>
            </div>
            <p className="text-sm opacity-90">
              Entry-level licenses are sold out due to high demand. Secure your Professional or Institutional license today!
            </p>
          </div>

          {/* License Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <EnhancedCard 
                key={category.id} 
                variant={getCardVariant(category)}
                className={`relative transition-all duration-300 hover:scale-105 ${
                  !category.available ? 'opacity-60' : ''
                } ${
                  category.recommended ? 'ring-2 ring-amber-400 ring-offset-2' : ''
                } ${
                  category.popular ? 'ring-2 ring-purple-400 ring-offset-2' : ''
                }`}
              >
                {/* Ribbons */}
                {category.recommended && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-4 py-1 rounded-full text-sm font-medium z-10">
                    Recommended
                  </div>
                )}
                {category.popular && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white px-4 py-1 rounded-full text-sm font-medium z-10">
                    Most Popular
                  </div>
                )}

                <EnhancedCardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                      <p className="text-base font-medium text-muted-foreground">
                        {category.subtitle}
                      </p>
                    </div>
                    {getStatusBadge(category)}
                  </div>

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-3xl font-bold ${
                        !category.available ? 'text-gray-400' : 'text-foreground'
                      }`}>
                        {category.price}
                      </span>
                      {category.originalPrice !== category.price && category.available && (
                        <span className="text-lg text-muted-foreground line-through">
                          {category.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Processing: {category.processingTime}</span>
                    </div>
                  </div>
                </EnhancedCardHeader>

                <EnhancedCardContent scrollable>
                  <p className="text-muted-foreground mb-6">{category.description}</p>

                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                      Included Features
                    </h4>
                    <div className="space-y-2">
                      {category.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                            category.available ? 'text-green-500' : 'text-gray-400'
                          }`} />
                          <span className={`text-sm ${
                            category.available ? 'text-foreground' : 'text-gray-400'
                          }`}>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </EnhancedCardContent>

                <EnhancedCardFooter>
                  <div className="w-full space-y-4">
                    <Button 
                      className="w-full" 
                      size="lg"
                      disabled={!category.available}
                      onClick={() => handleApplyNow(category.id)}
                      variant={category.recommended ? "default" : category.popular ? "default" : "outline"}
                    >
                      {!category.available ? (
                        <>
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Sold Out
                        </>
                      ) : (
                        <>
                          Apply Now
                          <Zap className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>

                    {category.available && (
                      <p className="text-xs text-center text-muted-foreground">
                        Secure payment • Instant processing • Money-back guarantee
                      </p>
                    )}
                  </div>
                </EnhancedCardFooter>
              </EnhancedCard>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <EnhancedCard variant="gradient" className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Need Help Choosing?</h3>
              <p className="mb-6 opacity-90">
                Our licensing experts are here to help you select the perfect license for your needs
              </p>
              <Button variant="secondary" size="lg">
                Schedule Consultation
              </Button>
            </EnhancedCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LicenseCategories;
