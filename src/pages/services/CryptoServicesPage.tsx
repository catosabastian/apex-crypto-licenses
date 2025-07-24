import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Shield, 
  Globe, 
  Building, 
  CheckCircle, 
  ArrowRight, 
  Banknote,
  FileCheck,
  Users,
  Clock
} from 'lucide-react';

const CryptoServicesPage = () => {
  const cryptoLicenses = [
    {
      id: 'msb-canada',
      name: 'MSB Canada',
      jurisdiction: 'Canada',
      description: 'Money Services Business license for comprehensive crypto operations',
      features: ['Virtual Currency Dealing', 'Money Transmitting', 'Foreign Exchange'],
      timeline: '3-6 months',
      flag: '🇨🇦'
    },
    {
      id: 'vasp-bulgaria',
      name: 'VASP Bulgaria',
      jurisdiction: 'Bulgaria',
      description: 'Virtual Asset Service Provider license for EU market access',
      features: ['EU Passport Rights', 'Exchange Services', 'Custody Solutions'],
      timeline: '6-12 months',
      flag: '🇧🇬'
    },
    {
      id: 'casp-poland',
      name: 'CASP Poland',
      jurisdiction: 'Poland',
      description: 'Crypto Asset Service Provider license with EU recognition',
      features: ['Trading Platforms', 'Wallet Services', 'Asset Management'],
      timeline: '4-8 months',
      flag: '🇵🇱'
    },
    {
      id: 'vasp-georgia',
      name: 'VASP Georgia',
      jurisdiction: 'Georgia',
      description: 'Crypto-friendly jurisdiction with streamlined licensing',
      features: ['Favorable Regulations', 'Tax Benefits', 'Fast Processing'],
      timeline: '2-4 months',
      flag: '🇬🇪'
    },
    {
      id: 'sro-switzerland',
      name: 'SRO Switzerland',
      jurisdiction: 'Switzerland',
      description: 'Self-regulatory organization membership for fintech operations',
      features: ['Banking Compatible', 'Institutional Grade', 'Global Recognition'],
      timeline: '3-6 months',
      flag: '🇨🇭'
    },
    {
      id: 'mso-hong-kong',
      name: 'MSO Hong Kong',
      jurisdiction: 'Hong Kong',
      description: 'Money Service Operator license for Asian market presence',
      features: ['Asian Gateway', 'Remittance Services', 'Currency Exchange'],
      timeline: '4-6 months',
      flag: '🇭🇰'
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Regulatory Compliance',
      description: 'Full compliance with local and international regulations'
    },
    {
      icon: Globe,
      title: 'Global Market Access',
      description: 'Access to international markets and banking partnerships'
    },
    {
      icon: Building,
      title: 'Institutional Trust',
      description: 'Build credibility with institutions and enterprise clients'
    },
    {
      icon: FileCheck,
      title: 'Complete Documentation',
      description: 'Full policy drafting and compliance documentation'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6">Crypto Licensing Services</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Cryptocurrency Licensing Solutions
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Get the right crypto license to build trust, ensure compliance, and access essential 
                financial services. From fully regulated EU environments to flexible offshore solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  <Users className="h-5 w-5" />
                  Book Free Consultation
                </Button>
                <Button variant="outline" size="lg">
                  View All Licenses
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-b">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">75+</div>
                <div className="text-sm text-muted-foreground">Licenses Obtained</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">7+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">350+</div>
                <div className="text-sm text-muted-foreground">Clients Served</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Successful Cases</div>
              </div>
            </div>
          </div>
        </section>

        {/* Crypto Licenses Grid */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Available Crypto Licenses</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose from our comprehensive range of cryptocurrency licenses across multiple jurisdictions
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cryptoLicenses.map((license) => (
                <Card key={license.id} className="border-2 hover:border-primary/50 transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-2xl">{license.flag}</div>
                      <Badge variant="outline">{license.timeline}</Badge>
                    </div>
                    <CardTitle className="text-xl">{license.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{license.description}</p>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Key Features
                        </h4>
                        <ul className="space-y-1">
                          {license.features.map((feature, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                              <div className="w-1 h-1 bg-primary rounded-full"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button className="w-full" variant="outline">
                        Learn More <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Crypto Licensing Matters</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The right crypto license opens doors to banking, liquidity providers, and global markets
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container">
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Get Your Crypto License?</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Our team of experts will guide you through the entire licensing process, 
                  from jurisdiction selection to license approval and ongoing compliance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="gap-2">
                    <Clock className="h-5 w-5" />
                    Schedule Consultation
                  </Button>
                  <Button variant="outline" size="lg">
                    Download Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CryptoServicesPage;