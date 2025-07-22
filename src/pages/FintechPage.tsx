
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, TrendingUp, Shield, Globe, CheckCircle, Clock, Users, Building2, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';

const FintechPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl shadow-lg">
              <CreditCard className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 bg-clip-text text-transparent">
              FinTech Licensing
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Professional support in financial and crypto licensing, legal compliance, and tailored solutions for fintech businesses. 
            Obtaining a fintech license is critical but complex due to strict AML, compliance, and operational requirements.
          </p>
          <div className="mt-8">
            <Link to="/#application">
              <Button size="lg" className="px-8 py-6 text-lg bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600">
                Start Your Application
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Landmark, title: "Banking Solutions", desc: "Access to banking and financial services" },
              { icon: Shield, title: "Legal Services", desc: "Comprehensive legal compliance support" },
              { icon: Globe, title: "Global Coverage", desc: "Worldwide jurisdiction options" },
              { icon: TrendingUp, title: "High-risk Industries", desc: "Specialized support for complex sectors" }
            ].map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300">
                <feature.icon className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">FinTech Licensing Solutions</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              From selecting the right jurisdiction and forming the company to drafting robust AML, compliance, 
              and operational policies, we handle the full process end-to-end.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Electronic Money Institution */}
            <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CreditCard className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Electronic Money Institution (EMI)</CardTitle>
                    <CardDescription>Issue electronic money and provide payment services</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-600">$350,000</span>
                    <Badge className="bg-green-100 text-green-800">Premium</Badge>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Electronic money issuance
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Payment processing services
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      SEPA integration
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Cross-border transfers
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Banking partnerships
                    </li>
                  </ul>
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        8-16 weeks
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe className="h-4 w-4" />
                        EU Passporting
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Money Service Provider */}
            <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 border-b">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Money Service Provider (MSP)</CardTitle>
                    <CardDescription>Money transmission and payment services</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-purple-600">$200,000</span>
                    <Badge variant="outline">Popular</Badge>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Money transmission services
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Foreign exchange services
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Remittance services
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Digital payment solutions
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Risk management systems
                    </li>
                  </ul>
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        6-10 weeks
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        Multi-state
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Licenses */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Additional FinTech Licenses</h2>
            <p className="text-muted-foreground text-lg">
              Specialized licensing options for various financial service requirements
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "MSB Canada", desc: "Money Services Business registration", jurisdiction: "Canada" },
              { name: "VASP Bulgaria", desc: "Virtual Asset Service Provider", jurisdiction: "Bulgaria" },
              { name: "CASP Poland", desc: "Crypto Asset Service Provider", jurisdiction: "Poland" },
              { name: "VASP Georgia", desc: "Virtual Asset Service Provider", jurisdiction: "Georgia" },
              { name: "SRO Switzerland", desc: "Self-Regulatory Organization", jurisdiction: "Switzerland" },
              { name: "EMI Cyprus", desc: "Electronic Money Institution", jurisdiction: "Cyprus" }
            ].map((license, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="text-center">
                  <h3 className="font-semibold text-lg mb-2">{license.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{license.desc}</p>
                  <Badge variant="outline">{license.jurisdiction}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Support */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Legal Experts</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Our team also supports clients beyond license approval, assisting with ongoing compliance, 
              reporting obligations, and regulatory maintenance. With our help, you'll build a fully compliant 
              fintech business equipped for long-term success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Pre-License Support</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Business model assessment
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Jurisdiction selection
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  AML policy drafting
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Compliance framework setup
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Post-License Support</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Ongoing compliance monitoring
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Regulatory reporting
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  License maintenance
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Regulatory updates
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-green-600 to-emerald-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Launch Your FinTech Business?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get professional support for your fintech licensing and compliance needs
          </p>
          <Link to="/#application">
            <Button size="lg" variant="secondary" className="px-8 py-6 text-lg">
              Start Application
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FintechPage;
