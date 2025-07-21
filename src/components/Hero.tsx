
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, TrendingUp, Users, Shield, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useApplicationDialog } from './ApplicationDialog';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

const Hero = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [content, setContent] = useState<any>({});
  const [isVisible, setIsVisible] = useState(false);
  const { openApplicationDialog } = useApplicationDialog();
  
  useEffect(() => {
    setIsVisible(true);
    const loadContent = async () => {
      try {
        const data = await supabaseDataManager.getContent('hero');
        setContent(data);
      } catch (error) {
        console.error('Failed to load hero content:', error);
      }
    };

    loadContent();
  }, []);

  const statsData = content.stats || [
    { number: "10K+", label: "Licensed Professionals", description: "Trusted by industry leaders" },
    { number: "98%", label: "Success Rate", description: "Application approval rate" },
    { number: "24/7", label: "Expert Support", description: "Professional assistance" }
  ];

  useEffect(() => {
    if (statsData.length > 0) {
      const interval = setInterval(() => {
        setCurrentStat((prev) => (prev + 1) % statsData.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [statsData.length]);

  const defaultContent = {
    badge: "Industry Leading Solutions",
    title: {
      line1: "Professional",
      line2: "Cryptocurrency",
      line3: "Licensing"
    },
    subtitle: "Secure your future in digital finance with our comprehensive licensing solutions. Join thousands of professionals who trust our platform.",
    primaryCTA: "Get Licensed Now",
    secondaryCTA: "Watch Demo",
    trustIndicators: [
      "Regulatory Compliant",
      "Industry Certified", 
      "Globally Recognized"
    ]
  };

  const displayContent = { ...defaultContent, ...content };

  return (
    <section className="relative min-h-screen bg-background">
      {/* Simple background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      <div className="container relative z-10 flex flex-col justify-center min-h-screen py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Main Content */}
            <div className={`space-y-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Badge */}
              <div className="inline-flex">
                <Badge 
                  variant="outline" 
                  className="text-primary border-primary/30 px-4 py-2 text-sm font-medium bg-primary/5"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  {displayContent.badge}
                </Badge>
              </div>

              {/* Main Headline */}
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="block text-foreground">{displayContent.title?.line1}</span>
                  <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {displayContent.title?.line2}
                  </span>
                  <span className="block text-foreground">{displayContent.title?.line3}</span>
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                  {displayContent.subtitle}
                </p>
              </div>

              {/* CTA Section */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6"
                  onClick={openApplicationDialog}
                >
                  {displayContent.primaryCTA}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6"
                >
                  <Play className="w-5 h-5 mr-2" />
                  {displayContent.secondaryCTA}
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-8">
                {displayContent.trustIndicators?.map((indicator, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>{indicator}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Stats Card */}
            <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="bg-card border rounded-2xl p-8 shadow-lg">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Trusted Worldwide
                    </h3>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
                  </div>
                  
                  {/* Current Stat Display */}
                  {statsData.length > 0 && (
                    <div className="text-center space-y-4 min-h-[160px] flex flex-col justify-center">
                      <div className="p-6 bg-primary/5 rounded-xl border border-primary/10">
                        <div className="text-4xl font-bold text-primary mb-3">
                          {statsData[currentStat]?.number}
                        </div>
                        <div className="text-lg font-semibold text-foreground mb-2">
                          {statsData[currentStat]?.label}
                        </div>
                        <div className="text-muted-foreground text-sm">
                          {statsData[currentStat]?.description}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Stat Navigation */}
                  <div className="flex justify-center gap-2">
                    {statsData.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentStat 
                            ? 'bg-primary scale-125' 
                            : 'bg-primary/30 hover:bg-primary/50'
                        }`}
                        onClick={() => setCurrentStat(index)}
                      />
                    ))}
                  </div>

                  {/* Feature Icons */}
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    {[
                      { icon: Shield, label: "Secure" },
                      { icon: TrendingUp, label: "Growth" },
                      { icon: Users, label: "Community" }
                    ].map(({ icon: Icon, label }, index) => (
                      <div key={index} className="flex flex-col items-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                        <Icon className="w-5 h-5 text-primary mb-1" />
                        <span className="text-xs text-muted-foreground">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-2 text-muted-foreground">
          <div className="w-6 h-10 border-2 border-border rounded-full p-1">
            <div className="w-1 h-3 bg-primary rounded-full mx-auto animate-bounce" />
          </div>
          <span className="text-xs">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
