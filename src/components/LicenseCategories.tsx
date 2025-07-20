
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { CheckCircle, Star, TrendingUp, Shield, Users, DollarSign, Crown } from 'lucide-react';
import { unifiedDataManager } from '@/utils/unifiedDataManager';
import UnifiedApplicationForm from './UnifiedApplicationForm';

const LicenseCategories = () => {
  const [settings, setSettings] = useState(unifiedDataManager.getSettings());

  useEffect(() => {
    const handleSettingsUpdate = (updatedSettings: any) => {
      setSettings(updatedSettings);
    };

    unifiedDataManager.addEventListener('settings_updated', handleSettingsUpdate);
    return () => {
      unifiedDataManager.removeEventListener('settings_updated', handleSettingsUpdate);
    };
  }, []);

  const categories = [
    {
      id: 1,
      name: 'Basic Trader',
      price: settings.category1Price,
      available: settings.category1Available,
      description: 'Perfect for beginners entering the crypto trading world',
      features: [
        'Basic trading strategies',
        'Educational resources',
        'Community access',
        'Mobile app support',
        'Email support'
      ],
      minVolume: '$50,000',
      processingTime: '5-7 days',
      icon: Shield,
      badge: 'Beginner',
      popularity: false
    },
    {
      id: 2,
      name: 'Standard Trader',
      price: settings.category2Price,
      available: settings.category2Available,
      description: 'Ideal for traders with some experience looking to expand',
      features: [
        'Intermediate strategies',
        'Technical analysis tools',
        'Priority support',
        'Advanced charting',
        'Risk management tools'
      ],
      minVolume: '$100,000',
      processingTime: '3-5 days',
      icon: TrendingUp,
      badge: 'Popular',
      popularity: true
    },
    {
      id: 3,
      name: 'Advanced Trader',
      price: settings.category3Price,
      available: settings.category3Available,
      description: 'For experienced traders seeking professional certification',
      features: [
        'Advanced trading strategies',
        'Portfolio management',
        'API access',
        'Custom indicators',
        'Dedicated account manager'
      ],
      minVolume: '$250,000',
      processingTime: '2-3 days',
      icon: Star,
      badge: 'Professional',
      popularity: false
    },
    {
      id: 4,
      name: 'Professional Trader',
      price: settings.category4Price,
      available: settings.category4Available,
      description: 'Premium certification for high-volume professional traders',
      features: [
        'Professional strategies',
        'Institutional tools',
        'White-label solutions',
        'Custom development',
        '24/7 priority support'
      ],
      minVolume: '$500,000',
      processingTime: '1-2 days',
      icon: Users,
      badge: 'Premium',
      popularity: false
    },
    {
      id: 5,
      name: 'Institutional Trader',
      price: settings.category5Price,
      available: settings.category5Available,
      description: 'Designed for institutions and large-scale operations',
      features: [
        'Institutional grade tools',
        'Compliance management',
        'Multi-user access',
        'Custom integrations',
        'Regulatory reporting'
      ],
      minVolume: '$1,000,000+',
      processingTime: '24-48 hours',
      icon: DollarSign,
      badge: 'Enterprise',
      popularity: false
    },
    {
      id: 6,
      name: 'Executive Trader',
      price: settings.category6Price,
      available: settings.category6Available,
      description: 'Ultimate certification for the most demanding traders',
      features: [
        'Executive level access',
        'Personalized strategies',
        'Exclusive market insights',
        'VIP event access',
        'Personal trading advisor'
      ],
      minVolume: '$2,500,000+',
      processingTime: '12-24 hours',
      icon: Crown,
      badge: 'Elite',
      popularity: false
    }
  ];

  return (
    <section id="license-categories" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 border-primary/30">
            Choose Your Level
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Trading License Categories
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the perfect license category that matches your trading experience and volume requirements.
          </p>
        </div>

        {/* License Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            
            return (
              <Card 
                key={category.id} 
                className={`
                  relative border transition-all duration-300 hover:shadow-lg
                  ${category.popularity ? 'border-primary/50 shadow-md' : 'border-border'}
                  ${!category.available ? 'opacity-60' : ''}
                `}
              >
                {/* Popularity Badge */}
                {category.popularity && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}

                {/* Availability Badge */}
                {!category.available && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary">
                      Sold Out
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  {/* Icon and Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {category.badge}
                    </Badge>
                  </div>

                  <CardTitle className="text-xl mb-2">
                    {category.name}
                  </CardTitle>
                  
                  <div className="text-2xl font-bold text-primary mb-2">
                    {category.price}
                  </div>

                  <CardDescription className="text-sm">
                    {category.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-b">
                    <div className="text-center">
                      <div className="text-sm font-semibold text-primary">{category.minVolume}</div>
                      <div className="text-xs text-muted-foreground">Min Volume</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-accent">{category.processingTime}</div>
                      <div className="text-xs text-muted-foreground">Processing</div>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2">
                    {category.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <div className="pt-4">
                    {category.available ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            className={`
                              w-full
                              ${category.popularity 
                                ? 'bg-gradient-to-r from-primary to-accent hover:opacity-90' 
                                : ''
                              }
                            `}
                            variant={category.popularity ? 'default' : 'default'}
                          >
                            Apply Now
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" aria-describedby="license-application-form">
                          <div id="license-application-form" className="sr-only">
                            Apply for {category.name} trading license certification
                          </div>
                          <UnifiedApplicationForm />
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Button 
                        disabled 
                        variant="secondary" 
                        className="w-full opacity-50"
                      >
                        Currently Unavailable
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Card className="p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Not sure which license is right for you?</h3>
            <p className="text-muted-foreground mb-6">
              Our expert team can help you choose the perfect license category based on your trading experience and goals.
            </p>
            <Button variant="outline" size="lg">
              Get Free Consultation
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LicenseCategories;
