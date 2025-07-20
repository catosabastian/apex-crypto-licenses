
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Users, Globe, Award, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>About APEX - Leading Crypto Trading License Authority</title>
        <meta name="description" content="Learn about APEX, the world's premier cryptocurrency trading license provider. Established regulatory authority with 24+ years of experience serving 150+ countries." />
        <meta name="keywords" content="crypto trading license, regulatory authority, cryptocurrency compliance, trading certification, financial regulation" />
        <link rel="canonical" href="https://apexregulations.com/about" />
      </Helmet>
      
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-accent/20 text-accent border-accent/30">About APEX</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Leading the Future of
                <span className="block text-accent">Crypto Trading Regulation</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                For over two decades, APEX has been the trusted authority in cryptocurrency trading licenses, 
                providing regulatory compliance solutions to traders and institutions worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <Card className="border-accent/20">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Shield className="h-6 w-6 text-accent" />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    To democratize access to legitimate cryptocurrency trading through comprehensive 
                    regulatory compliance solutions, ensuring every trader can operate with confidence 
                    and legal protection in the global digital asset marketplace.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-accent/20">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Globe className="h-6 w-6 text-accent" />
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    To be the world's most trusted and innovative cryptocurrency regulatory authority, 
                    setting the standard for trading license provision and compliance excellence 
                    across all jurisdictions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Company History */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-6">Our Journey</h2>
                <p className="text-lg text-muted-foreground">
                  From traditional finance to cryptocurrency regulation leadership
                </p>
              </div>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2000 - Foundation</h3>
                    <p className="text-muted-foreground">
                      APEX was established as a traditional financial regulatory consultancy, 
                      providing compliance solutions to investment firms and financial institutions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2010 - Digital Transformation</h3>
                    <p className="text-muted-foreground">
                      Recognizing the emerging digital finance landscape, APEX began developing 
                      specialized expertise in cryptocurrency and blockchain technology regulation.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2017 - Crypto Specialization</h3>
                    <p className="text-muted-foreground">
                      Launched our first cryptocurrency trading license program, becoming one of 
                      the first authorities to offer comprehensive crypto trader certification.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2024 - Global Leadership</h3>
                    <p className="text-muted-foreground">
                      Today, APEX serves over 30,000 licensed traders across 150+ countries, 
                      maintaining our position as the world's leading crypto trading license provider.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Statistics */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">By the Numbers</h2>
              <p className="text-lg text-muted-foreground">
                Our impact in the cryptocurrency regulation space
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">30,000+</div>
                <p className="text-muted-foreground">Licensed Traders</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">150+</div>
                <p className="text-muted-foreground">Countries Served</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">24+</div>
                <p className="text-muted-foreground">Years Experience</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">99.9%</div>
                <p className="text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Leadership Team</h2>
              <p className="text-lg text-muted-foreground">
                Meet the experts behind APEX's success
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card>
                <CardHeader>
                  <div className="w-20 h-20 bg-accent rounded-full mx-auto mb-4"></div>
                  <CardTitle className="text-center">Dr. Sarah Chen</CardTitle>
                  <CardDescription className="text-center">Chief Executive Officer</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    Former SEC Commissioner with 15+ years in financial regulation. 
                    PhD in Financial Economics from MIT.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="w-20 h-20 bg-accent rounded-full mx-auto mb-4"></div>
                  <CardTitle className="text-center">Michael Rodriguez</CardTitle>
                  <CardDescription className="text-center">Chief Technology Officer</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    Blockchain technology pioneer with 12+ years in fintech. 
                    Former senior engineer at major cryptocurrency exchanges.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="w-20 h-20 bg-accent rounded-full mx-auto mb-4"></div>
                  <CardTitle className="text-center">Emma Thompson</CardTitle>
                  <CardDescription className="text-center">Chief Compliance Officer</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    International regulatory expert with experience across 
                    US, EU, and Asia-Pacific compliance frameworks.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Regulatory Partners */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Regulatory Partners</h2>
              <p className="text-lg text-muted-foreground">
                Working with leading regulatory bodies worldwide
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="font-bold text-sm">SEC</span>
                </div>
                <p className="text-xs text-muted-foreground">US Securities & Exchange Commission</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="font-bold text-sm">CFTC</span>
                </div>
                <p className="text-xs text-muted-foreground">Commodity Futures Trading Commission</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="font-bold text-sm">FCA</span>
                </div>
                <p className="text-xs text-muted-foreground">Financial Conduct Authority</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="font-bold text-sm">ESMA</span>
                </div>
                <p className="text-xs text-muted-foreground">European Securities Markets Authority</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="font-bold text-sm">MAS</span>
                </div>
                <p className="text-xs text-muted-foreground">Monetary Authority of Singapore</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
