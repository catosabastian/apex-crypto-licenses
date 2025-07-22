
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coins, CreditCard, Gamepad2, Building2, Shield, TrendingUp, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesOverview = () => {
  const services = [
    {
      icon: Coins,
      title: "Crypto Licensing",
      description: "Exchange, wallet, and token project licenses with global compliance framework",
      features: ["Multi-currency trading", "Cold storage integration", "KYC/AML compliance", "Global market access"],
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-800",
      link: "/crypto-licensing",
      badge: "Popular"
    },
    {
      icon: CreditCard,
      title: "FinTech",
      description: "EMI, MSP, and payment service licenses for financial technology companies",
      features: ["Electronic money issuance", "SEPA integration", "Cross-border transfers", "Banking partnerships"],
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      textColor: "text-green-800",
      link: "/fintech",
      badge: "Premium"
    },
    {
      icon: Gamepad2,
      title: "Gambling",
      description: "Online casino, sports betting, and lottery licenses for gaming operations",
      features: ["Online casino operations", "Sports betting platform", "Live dealer games", "Player protection"],
      color: "from-red-500 to-pink-500",
      bgColor: "from-red-50 to-pink-50",
      borderColor: "border-red-200",
      textColor: "text-red-800",
      link: "/gambling",
      badge: "Regulated"
    },
    {
      icon: Building2,
      title: "Corporate Services",
      description: "Company formation, offshore structures, and corporate governance solutions",
      features: ["Tax optimization", "Asset protection", "International banking", "Nominee services"],
      color: "from-gray-500 to-slate-500",
      bgColor: "from-gray-50 to-slate-50",
      borderColor: "border-gray-200",
      textColor: "text-gray-800",
      link: "/#about",
      badge: "Essential"
    }
  ];

  return (
    <section id="services" className="py-20 px-6 bg-gradient-to-br from-background via-background to-muted/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-primary to-primary/70 rounded-2xl shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Professional Licensing Services
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            BMP Global offers comprehensive, end-to-end support across a wide range of jurisdictions, helping you navigate 
            licensing requirements, company formation, policy drafting, and ongoing compliance.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className={`group border-2 ${service.borderColor} hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br ${service.bgColor}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 bg-gradient-to-br ${service.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                        <CardDescription className="text-base">{service.description}</CardDescription>
                      </div>
                    </div>
                    <Badge className={`${service.textColor} bg-white/80 border-0 font-semibold`}>
                      {service.badge}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Key Features */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      Key Features
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 border-t border-white/50">
                    <Link to={service.link}>
                      <Button 
                        className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90 text-white font-semibold py-6 text-base group-hover:scale-105 transition-all duration-300`}
                        size="lg"
                      >
                        Learn More
                        <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Services Preview */}
        <div className="text-center space-y-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Additional Professional Services</h3>
            <p className="text-muted-foreground text-lg mb-8">
              Our team of 10 seasoned professionals brings deep insight from banking, law, compliance, and international business backgrounds.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Banking Solutions", desc: "Access to hundreds of banking partners worldwide" },
                { title: "Payment Gateways", desc: "Custom payment solutions and integrations" },
                { title: "Software Development", desc: "Core banking and crypto exchange platforms" }
              ].map((item, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-8">
            <Link to="/#application">
              <Button size="lg" className="px-12 py-6 text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <Shield className="h-6 w-6 mr-3" />
                Start Your Application Today
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
