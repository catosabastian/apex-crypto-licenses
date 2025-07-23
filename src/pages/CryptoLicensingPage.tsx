
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coins, Shield, TrendingUp, Globe, CheckCircle, Clock, Users, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CryptoLicensingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg">
              <Coins className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-600 via-orange-500 to-yellow-600 bg-clip-text text-transparent">
              Crypto Licensing
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The right crypto license is crucial for building trust, ensuring compliance, and accessing essential financial services. 
            Whether you're launching a crypto exchange, wallet service, or token project, proper licensing opens doors to banking and liquidity providers.
          </p>
          <div className="mt-8">
            <Link to="/#application">
              <Button size="lg" className="px-8 py-6 text-lg bg-gradient-to-r from-yellow-600 to-orange-500 hover:from-yellow-700 hover:to-orange-600">
                Start Your Application
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Crypto Licensing Solutions</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              We offer end-to-end support for licensing and company registration in most demanded jurisdictions worldwide — 
              from fully regulated environments like European Union to non-regulated options such as Caribbean offshore solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Crypto Exchange License */}
            <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Crypto Exchange License</CardTitle>
                    <CardDescription>Full cryptocurrency exchange operations</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-yellow-600">$250,000</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Most Popular</Badge>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Multi-currency trading platform
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Spot & margin trading capabilities
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      API access for institutional clients
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Cold storage integration
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      KYC/AML compliance framework
                    </li>
                  </ul>
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        6-12 weeks
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe className="h-4 w-4" />
                        Global access
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Crypto Wallet License */}
            <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Crypto Wallet License</CardTitle>
                    <CardDescription>Digital wallet services for cryptocurrency custody</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">$150,000</span>
                    <Badge variant="outline">Secure</Badge>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Multi-signature wallet technology
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Hardware security modules
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Mobile & web applications
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Cross-chain compatibility
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Insurance coverage
                    </li>
                  </ul>
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        4-8 weeks
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        Institutional
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Jurisdiction Options */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Global Jurisdiction Coverage</h2>
            <p className="text-muted-foreground text-lg">
              Choose from regulated and self-regulated options based on your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center p-6">
              <div className="mb-4">
                <Building2 className="h-12 w-12 mx-auto text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fully Regulated</h3>
              <p className="text-muted-foreground mb-4">European Union, US States, Singapore</p>
              <Badge className="bg-blue-100 text-blue-800">Premium Compliance</Badge>
            </Card>

            <Card className="text-center p-6">
              <div className="mb-4">
                <Globe className="h-12 w-12 mx-auto text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Moderate Regulation</h3>
              <p className="text-muted-foreground mb-4">Canada, Australia, Switzerland</p>
              <Badge className="bg-green-100 text-green-800">Balanced Approach</Badge>
            </Card>

            <Card className="text-center p-6">
              <div className="mb-4">
                <Shield className="h-12 w-12 mx-auto text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Self-Regulated</h3>
              <p className="text-muted-foreground mb-4">Caribbean, Offshore Solutions</p>
              <Badge className="bg-yellow-100 text-yellow-800">Flexible Framework</Badge>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Licensing Process</h2>
            <p className="text-muted-foreground text-lg">
              End-to-end support from initial consultation to license approval
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, title: "Consultation", desc: "Assess your business model and goals" },
              { step: 2, title: "Jurisdiction Selection", desc: "Choose the optimal regulatory framework" },
              { step: 3, title: "Documentation", desc: "Prepare all required documentation" },
              { step: 4, title: "License Approval", desc: "Submit and obtain your license" }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-yellow-600 to-orange-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Your Crypto License?</h2>
          <p className="text-xl mb-8 opacity-90">
            Start your application today and join the regulated cryptocurrency ecosystem
          </p>
          <Link to="/#application">
            <Button size="lg" variant="secondary" className="px-8 py-6 text-lg">
              Apply Now
            </Button>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CryptoLicensingPage;
