import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building, 
  FileText, 
  Users, 
  CreditCard, 
  Shield, 
  Globe, 
  CheckCircle, 
  ArrowRight, 
  Calculator,
  MapPin,
  Clock,
  Briefcase
} from 'lucide-react';

const CorporateServicesPage = () => {
  const corporateServices = [
    {
      icon: Building,
      title: 'Company Incorporation',
      description: 'Global company formation and registration services',
      features: [
        'Jurisdiction selection and analysis',
        'Company registration and documentation',
        'Share capital and structure setup',
        'Director and shareholder arrangements'
      ]
    },
    {
      icon: FileText,
      title: 'Corporate Administration',
      description: 'Ongoing corporate management and compliance',
      features: [
        'Statutory reporting and filings',
        'Board meeting management',
        'Corporate record maintenance',
        'Annual compliance requirements'
      ]
    },
    {
      icon: Calculator,
      title: 'Accounting & Tax',
      description: 'Professional accounting and tax optimization',
      features: [
        'Monthly bookkeeping services',
        'Tax planning and optimization',
        'Financial statement preparation',
        'Multi-jurisdiction tax compliance'
      ]
    },
    {
      icon: Users,
      title: 'Nominee Services',
      description: 'Professional nominee directors and shareholders',
      features: [
        'Nominee director services',
        'Nominee shareholder arrangements',
        'Privacy and confidentiality',
        'Local representation'
      ]
    },
    {
      icon: MapPin,
      title: 'Office Solutions',
      description: 'Physical and virtual office arrangements',
      features: [
        'Registered office addresses',
        'Virtual office services',
        'Meeting room facilities',
        'Mail forwarding services'
      ]
    },
    {
      icon: CreditCard,
      title: 'Banking & Payments',
      description: 'Corporate banking and payment solutions',
      features: [
        'Corporate bank account opening',
        'Multi-currency accounts',
        'Payment gateway setup',
        'Merchant account services'
      ]
    }
  ];

  const jurisdictions = [
    { name: 'Cyprus', flag: '🇨🇾', strengths: ['EU Access', 'Tax Benefits', 'Financial Services'] },
    { name: 'Malta', flag: '🇲🇹', strengths: ['DLT Framework', 'Gaming Hub', 'EU Compliance'] },
    { name: 'Estonia', flag: '🇪🇪', strengths: ['Digital Nomad', 'E-Residency', 'Fintech Friendly'] },
    { name: 'Switzerland', flag: '🇨🇭', strengths: ['Banking Hub', 'Stability', 'Innovation'] },
    { name: 'Singapore', flag: '🇸🇬', strengths: ['Asian Gateway', 'Fintech Hub', 'Low Tax'] },
    { name: 'Hong Kong', flag: '🇭🇰', strengths: ['Asian Finance', 'Business Hub', 'Global Access'] },
    { name: 'BVI', flag: '🇻🇬', strengths: ['Privacy', 'Tax Neutral', 'Flexibility'] },
    { name: 'Cayman', flag: '🇰🇾', strengths: ['Fund Structures', 'No Tax', 'Legal System'] }
  ];

  const benefits = [
    'Expert jurisdiction selection based on your business needs',
    'Complete end-to-end corporate setup and administration',
    'Ongoing compliance and regulatory support',
    'Multi-jurisdiction coordination and management',
    'Cost-effective solutions for global operations',
    'Professional team with international experience'
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6">Corporate Services</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Corporate Services & Solutions
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Complete corporate support from company formation to ongoing administration. 
                We handle the operational details so you can focus on growing your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  <Briefcase className="h-5 w-5" />
                  Get Corporate Consultation
                </Button>
                <Button variant="outline" size="lg">
                  Compare Jurisdictions
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Corporate Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive corporate solutions tailored to your business needs
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {corporateServices.map((service, index) => (
                <Card key={index} className="border-2 hover:border-primary/50 transition-all duration-200">
                  <CardHeader>
                    <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0 mt-1" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Button className="w-full mt-4" variant="outline" size="sm">
                      Learn More <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Jurisdictions Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Popular Jurisdictions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We offer company formation and corporate services across multiple jurisdictions
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {jurisdictions.map((jurisdiction, index) => (
                <Card key={index} className="border-2 hover:border-primary/50 transition-all duration-200 text-center">
                  <CardHeader>
                    <div className="text-4xl mb-2">{jurisdiction.flag}</div>
                    <CardTitle className="text-lg">{jurisdiction.name}</CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-2">
                      {jurisdiction.strengths.map((strength, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs mr-1 mb-1">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process & Benefits */}
        <section className="py-16">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Why Choose Our Corporate Services</h2>
                <p className="text-muted-foreground mb-8">
                  With our extensive network and experience, we provide comprehensive corporate 
                  solutions that adapt to your business needs and growth trajectory.
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
                    <CardTitle className="text-xl">Corporate Setup Process</CardTitle>
                    <p className="text-muted-foreground">Our streamlined approach to corporate services</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {[
                      { step: 'Consultation', desc: 'Business analysis and jurisdiction selection' },
                      { step: 'Documentation', desc: 'Preparation of incorporation documents' },
                      { step: 'Registration', desc: 'Company registration and official setup' },
                      { step: 'Banking', desc: 'Corporate account opening assistance' },
                      { step: 'Compliance', desc: 'Ongoing administrative support' },
                      { step: 'Growth', desc: 'Scaling and expansion assistance' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-primary text-sm font-semibold">{index + 1}</span>
                        </div>
                        <div>
                          <div className="font-medium text-sm">{item.step}</div>
                          <div className="text-xs text-muted-foreground">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Expert Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                10+ seasoned professionals with backgrounds in banking, law, compliance, and international business
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 text-center">
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

        {/* CTA Section */}
        <section className="py-16">
          <div className="container">
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Set Up Your Business?</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Let our experienced team handle your corporate setup and ongoing administration. 
                  We'll help you choose the right jurisdiction and structure for your business goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="gap-2">
                    <Clock className="h-5 w-5" />
                    Schedule Consultation
                  </Button>
                  <Button variant="outline" size="lg" className="gap-2">
                    <FileText className="h-5 w-5" />
                    Get Corporate Guide
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

export default CorporateServicesPage;