
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gamepad2, Star, Shield, Globe, CheckCircle, Clock, Users, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const GamblingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl shadow-lg">
              <Gamepad2 className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 via-pink-500 to-red-600 bg-clip-text text-transparent">
              Gambling Licensing
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The business model of our clients often expands into online gaming, betting, or casino services — and to do that legally and successfully, 
            a proper license is key. With the right setup, you can unlock access to payment providers, partners, and international markets with confidence.
          </p>
          <div className="mt-8">
            <Link to="/#application">
              <Button size="lg" className="px-8 py-6 text-lg bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-700 hover:to-pink-600">
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
            <h2 className="text-3xl font-bold mb-4">Comprehensive Gambling Licensing</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              We help you get started from scratch — choosing where to register, setting up the company, and preparing the needed documents, 
              including AML, player safety, and platform details.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Online Gambling License */}
            <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50 border-b">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Gamepad2 className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Online Gambling License</CardTitle>
                    <CardDescription>Online casino, sports betting, and gaming operations</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-red-600">$180,000</span>
                    <Badge className="bg-red-100 text-red-800">Full Service</Badge>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Online casino operations
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Sports betting platform
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Live dealer games
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Mobile gaming apps
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Player protection measures
                    </li>
                  </ul>
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        8-12 weeks
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe className="h-4 w-4" />
                        International
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lottery & Gaming License */}
            <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Star className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Lottery & Gaming License</CardTitle>
                    <CardDescription>Lottery operations and skill-based gaming</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-indigo-600">$120,000</span>
                    <Badge variant="outline">Specialized</Badge>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Lottery ticket sales
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Instant win games
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Skill-based competitions
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Prize management
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Random number generation
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
                        Multi-platform
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
            <h2 className="text-3xl font-bold mb-4">Popular Gaming Jurisdictions</h2>
            <p className="text-muted-foreground text-lg">
              Licenses from established gaming authorities with international recognition
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Curaçao", desc: "Most popular online gaming license", badge: "Popular" },
              { name: "Anjouan", desc: "Flexible gaming regulations", badge: "Flexible" },
              { name: "Costa Rica", desc: "Established gaming jurisdiction", badge: "Established" },
              { name: "Kahnawake", desc: "North American gaming authority", badge: "Recognized" }
            ].map((jurisdiction, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300">
                <h3 className="font-semibold text-lg mb-2">{jurisdiction.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{jurisdiction.desc}</p>
                <Badge variant="outline">{jurisdiction.badge}</Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Features */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Compliance & Player Protection</h2>
            <p className="text-muted-foreground text-lg">
              Comprehensive compliance framework ensuring player safety and regulatory adherence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <Shield className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-semibold text-lg mb-2">Player Protection</h3>
              <p className="text-sm text-muted-foreground">
                Responsible gambling tools, age verification, and self-exclusion systems
              </p>
            </Card>

            <Card className="p-6 text-center">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <h3 className="font-semibold text-lg mb-2">AML Compliance</h3>
              <p className="text-sm text-muted-foreground">
                Anti-money laundering procedures and transaction monitoring
              </p>
            </Card>

            <Card className="p-6 text-center">
              <Globe className="h-12 w-12 mx-auto mb-4 text-purple-600" />
              <h3 className="font-semibold text-lg mb-2">International Standards</h3>
              <p className="text-sm text-muted-foreground">
                Compliance with international gaming standards and best practices
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Complete Support Package</h2>
            <p className="text-muted-foreground text-lg">
              Since gaming often connects with other industries, we also support our partners with banking and payment solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Technical Integration</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Gaming platform setup
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Payment gateway integration
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Mobile app development
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Live dealer systems
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Ongoing Compliance</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Regular compliance reviews
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Regulatory reporting
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  License renewals
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Policy updates
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-red-600 to-pink-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Launch Your Gaming Business Today</h2>
          <p className="text-xl mb-8 opacity-90">
            Get your gambling license and start operating in regulated markets worldwide
          </p>
          <Link to="/#application">
            <Button size="lg" variant="secondary" className="px-8 py-6 text-lg">
              Apply for License
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default GamblingPage;
