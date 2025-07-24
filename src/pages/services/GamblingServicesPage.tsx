import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Dices, 
  Shield, 
  Globe, 
  CreditCard, 
  CheckCircle, 
  ArrowRight, 
  Users,
  Clock,
  FileText,
  Star
} from 'lucide-react';

const GamblingServicesPage = () => {
  const gamblingLicenses = [
    {
      id: 'kahnawake',
      name: 'Kahnawake',
      jurisdiction: 'Kahnawake Gaming Commission',
      description: 'Established gaming jurisdiction with global recognition',
      features: ['Online Gaming', 'Sports Betting', 'Casino Operations', 'Global Market Access'],
      timeline: '2-4 months',
      flag: '🇨🇦',
      type: 'Gaming License'
    },
    {
      id: 'curacao',
      name: 'Curaçao',
      jurisdiction: 'Curaçao eGaming',
      description: 'Popular offshore gaming license with broad coverage',
      features: ['Cost-Effective', 'Quick Processing', 'Multiple Verticals', 'Payment Solutions'],
      timeline: '6-12 weeks',
      flag: '🇨🇼',
      type: 'eGaming License'
    },
    {
      id: 'anjouan',
      name: 'Anjouan',
      jurisdiction: 'Anjouan Gaming Authority',
      description: 'Flexible gaming license for emerging markets',
      features: ['Low Barriers', 'Fast Approval', 'Competitive Fees', 'Global Operations'],
      timeline: '4-8 weeks',
      flag: '🇰🇲',
      type: 'Gaming License'
    },
    {
      id: 'costa-rica',
      name: 'Costa Rica',
      jurisdiction: 'Costa Rica Gaming',
      description: 'Established Central American gaming jurisdiction',
      features: ['Stable Jurisdiction', 'Reasonable Costs', 'B2B/B2C Options', 'Regional Access'],
      timeline: '8-12 weeks',
      flag: '🇨🇷',
      type: 'Gaming License'
    }
  ];

  const gameTypes = [
    {
      icon: Dices,
      title: 'Online Casino',
      description: 'Full casino operations including slots, table games, and live dealer',
      coverage: 'Global'
    },
    {
      icon: Star,
      title: 'Sports Betting',
      description: 'Comprehensive sportsbook with pre-match and live betting',
      coverage: 'Worldwide'
    },
    {
      icon: Users,
      title: 'Poker & Games',
      description: 'Poker rooms, tournaments, and skill-based gaming',
      coverage: 'International'
    },
    {
      icon: Globe,
      title: 'Virtual Sports',
      description: 'Virtual sports betting and simulated events',
      coverage: 'Global Markets'
    }
  ];

  const benefits = [
    'Global market access and player acceptance',
    'Payment processor and banking relationships',
    'Regulatory compliance and legal protection',
    'White-label and B2B partnership opportunities',
    'Player protection and responsible gaming frameworks',
    'Anti-money laundering and fraud prevention'
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6">Gaming & Gambling Licenses</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Gaming License Solutions
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Launch your online gaming, betting, or casino business with proper licensing. 
                From established jurisdictions to emerging markets - we handle the complete process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  <Users className="h-5 w-5" />
                  Book Gaming Consultation
                </Button>
                <Button variant="outline" size="lg">
                  Compare Licenses
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Game Types Section */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Gaming Verticals We Cover</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive licensing solutions for all types of online gaming operations
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {gameTypes.map((type, index) => (
                <Card key={index} className="border-2 hover:border-primary/50 transition-all duration-200 text-center">
                  <CardHeader>
                    <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-4">
                      <type.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{type.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </CardHeader>
                  
                  <CardContent>
                    <Badge variant="outline" className="text-xs">{type.coverage}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Available Licenses */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Available Gaming Licenses</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose the right gaming license based on your target markets and business model
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {gamblingLicenses.map((license) => (
                <Card key={license.id} className="border-2 hover:border-primary/50 transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{license.flag}</span>
                        <div>
                          <h3 className="text-xl font-bold">{license.name}</h3>
                          <p className="text-sm text-muted-foreground">{license.jurisdiction}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-xs mb-1">{license.type}</Badge>
                        <div className="text-xs text-muted-foreground">{license.timeline}</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{license.description}</p>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          License Coverage
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {license.features.map((feature, index) => (
                            <div key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                              <div className="w-1 h-1 bg-primary rounded-full"></div>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button className="flex-1" variant="outline">
                          Learn More
                        </Button>
                        <Button className="flex-1">
                          Get Quote
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Why Gaming Licensing Matters</h2>
                <p className="text-muted-foreground mb-8">
                  Proper gaming licensing is essential for operating legally, accessing payment solutions, 
                  and building trust with players and partners. Our expertise ensures you get the right 
                  license for your business model and target markets.
                </p>
                
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="lg:pl-8">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-xl">Complete Gaming Setup</CardTitle>
                    <p className="text-muted-foreground">End-to-end support for your gaming business</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {[
                      'License application and approval',
                      'Company incorporation and setup',
                      'Payment processing arrangements',
                      'Gaming platform integration',
                      'AML and compliance policies',
                      'Ongoing regulatory support'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary text-sm font-semibold">{index + 1}</span>
                        </div>
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Launch Your Gaming Business?</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Get expert guidance on gaming licenses, platform setup, and regulatory compliance. 
                  Our team specializes in helping gaming operators navigate complex licensing requirements.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="gap-2">
                    <Clock className="h-5 w-5" />
                    Schedule Gaming Consultation
                  </Button>
                  <Button variant="outline" size="lg" className="gap-2">
                    <FileText className="h-5 w-5" />
                    Download Gaming Guide
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

export default GamblingServicesPage;