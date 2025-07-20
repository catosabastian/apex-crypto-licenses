
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, CheckCircle, Star, Crown, Building } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useApplicationDialog } from '@/components/ApplicationDialog';

const LicenseTypesPage = () => {
  const { openApplicationDialog } = useApplicationDialog();
  
  const licenseTypes = [
    {
      id: 1,
      name: "Basic Trader License",
      category: "Category 1",
      price: "25,000 USDT",
      minVolume: "$50,000",
      icon: Shield,
      color: "blue",
      soldOut: true,
      features: [
        "1-year validity period",
        "Individual trader verification",
        "Basic compliance certification",
        "Standard support response",
        "Recognized on all major exchanges",
        "Email support during business hours"
      ],
      description: "Perfect for individual traders starting their cryptocurrency journey with basic compliance requirements."
    },
    {
      id: 2,
      name: "Standard Trader License",
      category: "Category 2",
      price: "50,000 USDT",
      minVolume: "$100,000",
      icon: CheckCircle,
      color: "green",
      soldOut: true,
      features: [
        "1-year validity period",
        "Enhanced verification process",
        "Standard compliance certification",
        "Priority support response",
        "Recognized on all major exchanges",
        "Basic trading protection coverage",
        "Phone support during business hours"
      ],
      description: "Ideal for active traders who need enhanced verification and priority support services."
    },
    {
      id: 3,
      name: "Advanced Trader License",
      category: "Category 3",
      price: "70,000 USDT",
      minVolume: "$250,000",
      icon: Star,
      color: "purple",
      available: true,
      features: [
        "1-year validity period",
        "Priority verification process",
        "Advanced compliance certification",
        "24/7 support response",
        "Recognized on all major exchanges",
        "Trading strategy protection",
        "Dedicated account manager",
        "Advanced risk management tools"
      ],
      description: "Designed for serious traders requiring advanced compliance and comprehensive support."
    },
    {
      id: 4,
      name: "Professional Trader License",
      category: "Category 4",
      price: "150,000 USDT",
      minVolume: "$500,000",
      icon: Crown,
      color: "gold",
      available: true,
      popular: true,
      features: [
        "1-year validity period",
        "Fast-track verification process",
        "Professional compliance certification",
        "Dedicated support line",
        "Global regulatory recognition",
        "Advanced trading protection",
        "Multi-exchange access privileges",
        "Custom compliance framework",
        "Premium trading tools access"
      ],
      description: "Our most popular license for professional traders and small institutions."
    },
    {
      id: 5,
      name: "Institutional Trader License",
      category: "Category 5",
      price: "250,000 USDT",
      minVolume: "$1,000,000+",
      icon: Building,
      color: "platinum",
      available: true,
      features: [
        "1-year validity period",
        "Expedited verification process",
        "Comprehensive compliance certification",
        "Dedicated account representative",
        "Global regulatory recognition",
        "Full trading strategy protection",
        "Multi-user access controls",
        "Custom compliance framework",
        "White-label solutions available",
        "API access for system integration"
      ],
      description: "Enterprise-grade licensing for institutional traders and large organizations."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Cryptocurrency Trading License Types - APEX Regulatory Authority</title>
        <meta name="description" content="Explore our comprehensive range of cryptocurrency trading licenses. From basic trader certification to institutional-grade licensing solutions." />
        <meta name="keywords" content="crypto trading license types, cryptocurrency certification, trading license categories, regulatory compliance levels" />
        <link rel="canonical" href="https://apexregulations.com/licenses" />
      </Helmet>
      
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-accent/20 text-accent border-accent/30">License Types</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Choose Your Perfect
                <span className="block text-accent">Trading License</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                From individual traders to institutional organizations, we offer comprehensive 
                licensing solutions tailored to your trading volume and regulatory requirements.
              </p>
            </div>
          </div>
        </section>

        {/* License Categories */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="grid gap-8">
                {licenseTypes.map((license) => (
                  <Card key={license.id} className={`relative ${license.popular ? 'border-2 border-accent shadow-lg' : ''}`}>
                    {license.popular && (
                      <div className="absolute -top-4 left-8">
                        <Badge className="bg-accent text-white">Most Popular</Badge>
                      </div>
                    )}
                    
                    {license.soldOut && (
                      <div className="absolute -top-4 right-8">
                        <Badge variant="destructive">Sold Out</Badge>
                      </div>
                    )}
                    
                    <div className="grid md:grid-cols-3 gap-6 p-6">
                      {/* License Info */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${license.color}-100`}>
                            <license.icon className={`h-6 w-6 text-${license.color}-600`} />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold">{license.name}</h3>
                            <p className="text-sm text-muted-foreground">{license.category}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-3xl font-bold text-accent">{license.price}</div>
                          <p className="text-sm text-muted-foreground">
                            Minimum trade volume: {license.minVolume}
                          </p>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          {license.description}
                        </p>
                        
                        <Button 
                          className="w-full" 
                          onClick={openApplicationDialog}
                          disabled={license.soldOut}
                          variant={license.popular ? "default" : "outline"}
                        >
                          {license.soldOut ? "Sold Out" : "Apply Now"}
                        </Button>
                      </div>
                      
                      {/* Features */}
                      <div className="md:col-span-2">
                        <h4 className="font-semibold mb-4">What's Included:</h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {license.features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">License Comparison</h2>
                <p className="text-lg text-muted-foreground">
                  Compare features across all license categories
                </p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-background rounded-lg overflow-hidden shadow-lg">
                  <thead>
                    <tr className="bg-muted">
                      <th className="text-left p-4 font-semibold">Feature</th>
                      <th className="text-center p-4 font-semibold">Category 1</th>
                      <th className="text-center p-4 font-semibold">Category 2</th>
                      <th className="text-center p-4 font-semibold">Category 3</th>
                      <th className="text-center p-4 font-semibold">Category 4</th>
                      <th className="text-center p-4 font-semibold">Category 5</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-4 font-medium">Validity Period</td>
                      <td className="p-4 text-center">1 Year</td>
                      <td className="p-4 text-center">1 Year</td>
                      <td className="p-4 text-center">1 Year</td>
                      <td className="p-4 text-center">1 Year</td>
                      <td className="p-4 text-center">1 Year</td>
                    </tr>
                    <tr className="border-t bg-muted/50">
                      <td className="p-4 font-medium">Support Level</td>
                      <td className="p-4 text-center">Email</td>
                      <td className="p-4 text-center">Email + Phone</td>
                      <td className="p-4 text-center">24/7</td>
                      <td className="p-4 text-center">Dedicated Line</td>
                      <td className="p-4 text-center">Account Rep</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-4 font-medium">Verification Speed</td>
                      <td className="p-4 text-center">Standard</td>
                      <td className="p-4 text-center">Enhanced</td>
                      <td className="p-4 text-center">Priority</td>
                      <td className="p-4 text-center">Fast-track</td>
                      <td className="p-4 text-center">Expedited</td>
                    </tr>
                    <tr className="border-t bg-muted/50">
                      <td className="p-4 font-medium">Trading Protection</td>
                      <td className="p-4 text-center">-</td>
                      <td className="p-4 text-center">Basic</td>
                      <td className="p-4 text-center">Strategy</td>
                      <td className="p-4 text-center">Advanced</td>
                      <td className="p-4 text-center">Full</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-4 font-medium">Multi-User Access</td>
                      <td className="p-4 text-center">-</td>
                      <td className="p-4 text-center">-</td>
                      <td className="p-4 text-center">-</td>
                      <td className="p-4 text-center">-</td>
                      <td className="p-4 text-center">✓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Get Licensed?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of successful traders who have chosen APEX for their regulatory compliance needs.
              </p>
              <Button size="lg" onClick={openApplicationDialog} className="gap-2">
                Start Your Application
                <Shield className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LicenseTypesPage;
