import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  CreditCard, 
  Shield, 
  Globe, 
  CheckCircle, 
  ArrowRight, 
  Banknote,
  Users,
  Clock,
  FileText
} from 'lucide-react';

const FinTechServicesPage = () => {
  const fintechLicenses = [
    {
      id: 'emi-cyprus',
      name: 'EMI Cyprus',
      jurisdiction: 'Cyprus',
      description: 'Electronic Money Institution license with full payment capabilities',
      features: ['EU Passport Rights', 'IBAN Issuance', 'Payment Processing', 'E-Money Services'],
      timeline: '6-12 months',
      flag: '🇨🇾',
      type: 'Payment Institution'
    },
    {
      id: 'sro-switzerland',
      name: 'SRO Switzerland',
      jurisdiction: 'Switzerland',
      description: 'Self-regulatory organization for fiat and crypto operations',
      features: ['Banking Compatibility', 'Crypto & Fiat', 'Institutional Grade', 'Global Recognition'],
      timeline: '3-6 months',
      flag: '🇨🇭',
      type: 'Fintech License'
    },
    {
      id: 'mso-hong-kong',
      name: 'MSO Hong Kong',
      jurisdiction: 'Hong Kong',
      description: 'Money Service Operator for global remittance services',
      features: ['Asian Market Access', 'Remittance Services', 'Currency Exchange', 'Cross-border Payments'],
      timeline: '4-6 months',
      flag: '🇭🇰',
      type: 'Money Services'
    },
    {
      id: 'casp-malta',
      name: 'CASP Malta',
      jurisdiction: 'Malta',
      description: 'Crypto Asset Service Provider with EU recognition',
      features: ['EU Compliance', 'DLT Framework', 'Asset Management', 'Trading Platform'],
      timeline: '6-9 months',
      flag: '🇲🇹',
      type: 'Crypto License'
    },
    {
      id: 'casp-czech',
      name: 'CASP Czech',
      jurisdiction: 'Czech Republic',
      description: 'Crypto Asset Service Provider license',
      features: ['EU Market Access', 'Competitive Costs', 'Digital Assets', 'Exchange Services'],
      timeline: '4-8 months',
      flag: '🇨🇿',
      type: 'Crypto License'
    },
    {
      id: 'dasp-salvador',
      name: 'DASP El Salvador',
      jurisdiction: 'El Salvador',
      description: 'Digital Asset Service Provider in crypto-friendly environment',
      features: ['Bitcoin Legal Tender', 'Tax Benefits', 'Fast Processing', 'Innovative Framework'],
      timeline: '2-4 months',
      flag: '🇸🇻',
      type: 'Digital Assets'
    }
  ];

  const services = [
    {
      icon: CreditCard,
      title: 'Payment Institution Licensing',
      description: 'Complete EMI and PI licensing services with EU passport rights',
      features: ['IBAN Issuance', 'Payment Processing', 'E-Money Services', 'Cross-border Payments']
    },
    {
      icon: Building2,
      title: 'Banking Solutions',
      description: 'Core banking platforms and payment infrastructure',
      features: ['Core Banking Systems', 'Payment Gateways', 'API Integration', 'Compliance Tools']
    },
    {
      icon: Shield,
      title: 'Compliance & Legal',
      description: 'Full AML, compliance, and regulatory support',
      features: ['Policy Drafting', 'AML Procedures', 'Regulatory Reporting', 'Ongoing Compliance']
    },
    {
      icon: Globe,
      title: 'Global Operations',
      description: 'Multi-jurisdiction setup and international expansion',
      features: ['Jurisdiction Selection', 'Local Representation', 'Regulatory Strategy', 'Market Entry']
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
              <Badge className="mb-6">FinTech Licensing</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                FinTech Licensing Solutions
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Professional support in financial licensing, legal compliance, and tailored solutions 
                for fintech businesses. From EMI licenses to global payment operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  <Users className="h-5 w-5" />
                  Book Free Consultation
                </Button>
                <Button variant="outline" size="lg">
                  Download FinTech Guide
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our FinTech Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive fintech solutions from licensing to operational setup
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
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
                        <li key={idx} className="text-sm flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
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
              <h2 className="text-3xl font-bold mb-4">Available FinTech Licenses</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose from regulated and self-regulated options across multiple jurisdictions
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fintechLicenses.map((license) => (
                <Card key={license.id} className="border-2 hover:border-primary/50 transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{license.flag}</span>
                        <Badge variant="secondary" className="text-xs">{license.type}</Badge>
                      </div>
                      <Badge variant="outline" className="text-xs">{license.timeline}</Badge>
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

        {/* Process Section */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Licensing Process</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                End-to-end support from jurisdiction selection to license approval
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Consultation', desc: 'Business analysis and jurisdiction selection' },
                { step: '02', title: 'Preparation', desc: 'Company setup and document preparation' },
                { step: '03', title: 'Application', desc: 'License application and regulatory submission' },
                { step: '04', title: 'Compliance', desc: 'Ongoing support and regulatory maintenance' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold">{item.step}</span>
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
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
                <h2 className="text-3xl font-bold mb-4">Ready to Launch Your FinTech Business?</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Get expert guidance on fintech licensing, compliance, and operational setup. 
                  Our team has 7+ years of experience helping fintech companies succeed globally.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="gap-2">
                    <Clock className="h-5 w-5" />
                    Schedule Consultation
                  </Button>
                  <Button variant="outline" size="lg" className="gap-2">
                    <FileText className="h-5 w-5" />
                    Get Licensing Guide
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

export default FinTechServicesPage;