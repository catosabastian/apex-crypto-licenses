import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Shield, 
  CheckCircle, 
  Star, 
  TrendingUp, 
  Users, 
  Globe, 
  Award, 
  Clock,
  ArrowRight,
  Zap,
  Lock,
  Headphones,
  BarChart3,
  Sparkles
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabaseDataManager } from '@/utils/supabaseDataManager';
import { useNavigate } from 'react-router-dom';

const LicensingSolutions = () => {
  const [settings, setSettings] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadSettings = async () => {
      const settingsData = await supabaseDataManager.getSettings();
      setSettings(settingsData);
    };
    loadSettings();
  }, []);

  const licenseCategories = [
    {
      id: '1',
      name: 'Basic Trader',
      price: settings.category1Price || 'Contact for pricing',
      available: settings.category1Available !== false,
      details: settings.category1Details || 'Perfect for individual traders starting their journey',
      features: [
        'Basic trading support',
        'Email support (48h response)',
        'Standard processing (5-7 days)',
        'Basic compliance tools',
        'Trading volume up to $100K',
        'Single platform license'
      ],
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600',
      recommended: false,
      popular: false
    },
    {
      id: '2',
      name: 'Standard Trader',
      price: settings.category2Price || 'Contact for pricing',
      available: settings.category2Available !== false,
      details: settings.category2Details || 'Enhanced features for growing traders',
      features: [
        'Enhanced trading tools',
        'Priority support (24h response)',
        'Faster processing (3-5 days)',
        'Advanced compliance suite',
        'Trading volume up to $500K',
        'Multi-platform license',
        'Risk management tools'
      ],
      icon: Users,
      color: 'from-green-500 to-green-600',
      recommended: true,
      popular: false
    },
    {
      id: '3',
      name: 'Advanced Trader',
      price: settings.category3Price || 'Contact for pricing',
      available: settings.category3Available !== false,
      details: settings.category3Details || 'Professional-grade tools and support',
      features: [
        'Advanced analytics dashboard',
        'API access for automation',
        'Premium support (12h response)',
        'Advanced compliance monitoring',
        'Trading volume up to $2M',
        'Unlimited platform access',
        'Custom risk parameters',
        'Regulatory reporting tools'
      ],
      icon: Shield,
      color: 'from-purple-500 to-purple-600',
      recommended: false,
      popular: true
    },
    {
      id: '4',
      name: 'Professional Trader',
      price: settings.category4Price || 'Contact for pricing',
      available: settings.category4Available !== false,
      details: settings.category4Details || 'Enterprise-level trading capabilities',
      features: [
        'Professional trading suite',
        'Dedicated account manager',
        'Priority processing (24-48h)',
        'Enterprise compliance tools',
        'Trading volume up to $10M',
        'White-label solutions',
        'Custom integrations',
        'Advanced reporting suite',
        'Multi-jurisdiction support'
      ],
      icon: Globe,
      color: 'from-amber-500 to-amber-600',
      recommended: false,
      popular: false
    },
    {
      id: '5',
      name: 'Institutional Trader',
      price: settings.category5Price || 'Contact for pricing',
      available: settings.category5Available !== false,
      details: settings.category5Details || 'Full institutional trading infrastructure',
      features: [
        'Full institutional suite',
        'Dedicated support team',
        'Express processing (12-24h)',
        'Institutional compliance',
        'Unlimited trading volume',
        'Custom platform development',
        'Prime brokerage access',
        'Institutional-grade security',
        'Global regulatory support',
        'Custom legal framework'
      ],
      icon: Award,
      color: 'from-red-500 to-red-600',
      recommended: false,
      popular: false
    },
    {
      id: '6',
      name: 'Executive Trader',
      price: settings.category6Price || 'Contact for pricing',
      available: settings.category6Available !== false,
      details: settings.category6Details || 'Ultimate trading experience with concierge service',
      features: [
        'Executive concierge service',
        'White-glove support (24/7)',
        'Instant processing (same day)',
        'Executive compliance suite',
        'Unlimited everything',
        'Personal trading infrastructure',
        'Direct regulatory liaison',
        'Custom everything development',
        'Global market access',
        'Personal legal support',
        'Executive networking access'
      ],
      icon: Sparkles,
      color: 'from-indigo-500 to-indigo-600',
      recommended: false,
      popular: false
    }
  ];

  const benefits = [
    {
      icon: Lock,
      title: 'Regulatory Compliance',
      description: 'Stay compliant with global cryptocurrency regulations and standards'
    },
    {
      icon: Zap,
      title: 'Fast Processing',
      description: 'Quick turnaround times with our streamlined approval process'
    },
    {
      icon: Headphones,
      title: 'Expert Support',
      description: '24/7 support from cryptocurrency compliance experts'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Comprehensive reporting and analytics for your trading activities'
    }
  ];

  const handleGetStarted = () => {
    navigate('/apply');
  };

  return (
    <>
      <Helmet>
        <title>Licensing Solutions - Professional Cryptocurrency Trading Licenses</title>
        <meta name="description" content="Explore our comprehensive cryptocurrency trading licensing solutions. From basic to executive levels, find the perfect license for your trading needs." />
        <meta name="keywords" content="cryptocurrency license, trading license, crypto regulation, compliance" />
      </Helmet>

      <Header />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,hsl(var(--muted))_1px,transparent_1px),linear-gradient(-45deg,hsl(var(--muted))_1px,transparent_1px)] bg-[length:60px_60px] opacity-20"></div>
          
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Professional Licensing Solutions</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Choose Your Perfect License
              </h1>
              
              <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                From individual traders to institutional investors, we have the right cryptocurrency trading license for your needs. 
                Professional-grade compliance, expert support, and regulatory peace of mind.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Regulatory Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Expert Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Fast Processing</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* License Categories */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Licensing Categories</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Choose from our comprehensive range of cryptocurrency trading licenses, 
                each designed for different trading volumes and requirements.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {licenseCategories.map((category, index) => {
                const IconComponent = category.icon;
                
                return (
                  <Card 
                    key={category.id} 
                    className={`relative group hover:shadow-2xl transition-all duration-500 border-2 hover:-translate-y-2 ${
                      category.recommended ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {/* Badges */}
                    <div className="absolute -top-3 left-6 flex gap-2">
                      {category.recommended && (
                        <Badge className="bg-primary text-primary-foreground">
                          <Star className="h-3 w-3 mr-1" />
                          Recommended
                        </Badge>
                      )}
                      {category.popular && (
                        <Badge variant="secondary">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Most Popular
                        </Badge>
                      )}
                    </div>

                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 rounded-lg transition-opacity duration-500`}></div>

                    <CardHeader className="pt-8">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      
                      <CardTitle className="text-2xl mb-2">{category.name}</CardTitle>
                      <div className="text-3xl font-bold text-primary mb-2">{category.price}</div>
                      <p className="text-muted-foreground">{category.details}</p>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <Separator />
                      
                      <div className="space-y-3">
                        {category.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4">
                        <Button 
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                          variant={category.recommended ? 'default' : 'outline'}
                          onClick={handleGetStarted}
                          disabled={!category.available}
                        >
                          {category.available ? (
                            <>
                              Get Started
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </>
                          ) : (
                            'Currently Unavailable'
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Why Choose Our Licensing Solutions?</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We provide comprehensive support and cutting-edge compliance tools to ensure your success in the cryptocurrency trading industry.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                
                return (
                  <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <Card className="p-12 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                <h2 className="text-4xl font-bold mb-6">Ready to Get Licensed?</h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join thousands of professional traders who trust us for their cryptocurrency licensing needs. 
                  Start your application today and trade with confidence.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" onClick={handleGetStarted} className="px-8 py-4 text-lg">
                    <Shield className="h-5 w-5 mr-2" />
                    Start Your Application
                  </Button>
                  <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                    <Clock className="h-5 w-5 mr-2" />
                    Schedule Consultation
                  </Button>
                </div>
                
                <p className="text-sm text-muted-foreground mt-6">
                  * No hidden fees • Transparent pricing • 100% secure application process
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default LicensingSolutions;