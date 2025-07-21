
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, TrendingUp, Users, Shield, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useApplicationDialog } from './ApplicationDialog';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

const Hero = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);
  const [content, setContent] = useState<any>({});
  const [isVisible, setIsVisible] = useState(false);
  const { openApplicationDialog } = useApplicationDialog();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const iconMap: Record<string, any> = {
    TrendingUp,
    Users,
    Shield,
    Zap,
    Play,
    CheckCircle
  };

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
    ],
    statsTitle: "Trusted Worldwide"
  };

  const displayContent = { ...defaultContent, ...content };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25% 75%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
                         radial-gradient(circle at 75% 25%, rgba(255, 183, 77, 0.08) 0%, transparent 50%)`
      }} />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23183B4A' fill-opacity='0.06'%3e%3ccircle cx='30' cy='30' r='1.5'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`,
      }} />

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/8 rounded-full blur-2xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/8 rounded-full blur-2xl animate-float-delay" />

      <div className="container relative z-10 flex flex-col justify-center min-h-screen py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Main Content */}
            <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'}`}>
              {/* Badge */}
              <div className="inline-flex">
                <Badge 
                  variant="outline" 
                  className="text-primary border-primary/20 px-6 py-3 text-sm font-medium bg-primary/5 hover:bg-primary/10 transition-all duration-300"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  {displayContent.badge}
                </Badge>
              </div>

              {/* Main Headline */}
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                  <span className="block text-foreground">{displayContent.title?.line1}</span>
                  <span className="block bg-gradient-to-r from-primary via-accent to-accent-amber bg-clip-text text-transparent">{displayContent.title?.line2}</span>
                  <span className="block text-foreground">{displayContent.title?.line3}</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                  {displayContent.subtitle}
                </p>
              </div>

              {/* CTA Section */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={openApplicationDialog}
                >
                  {displayContent.primaryCTA}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 border-2 hover:border-primary/30 transition-all duration-300"
                >
                  <Play className="w-5 h-5 mr-2" />
                  {displayContent.secondaryCTA}
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-8">
                {displayContent.trustIndicators?.map((indicator, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>{indicator}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Stats Dashboard */}
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in-delay' : 'opacity-0 translate-y-8'}`}>
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-xl">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                      {displayContent.statsTitle}
                    </h3>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
                  </div>
                  
                  {/* Animated Stat Display */}
                  {statsData.length > 0 && (
                    <div className="text-center space-y-4 min-h-[200px] flex flex-col justify-center">
                      <div className="p-6 bg-primary/5 rounded-xl border border-primary/10">
                        <div className="text-5xl font-bold text-primary mb-3">
                          {statsData[currentStat]?.number}
                        </div>
                        <div className="text-xl font-semibold text-foreground mb-2">
                          {statsData[currentStat]?.label}
                        </div>
                        <div className="text-muted-foreground">
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
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentStat 
                            ? 'bg-primary scale-125' 
                            : 'bg-primary/30 hover:bg-primary/50'
                        }`}
                        onClick={() => setCurrentStat(index)}
                      />
                    ))}
                  </div>

                  {/* Icon Grid */}
                  <div className="grid grid-cols-3 gap-3 pt-4">
                    {[CheckCircle, Shield, TrendingUp].map((Icon, index) => (
                      <div key={index} className="flex flex-col items-center p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-float" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-float-delay" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full p-1">
            <div className="w-1 h-3 bg-primary rounded-full mx-auto animate-scroll" />
          </div>
          <span className="text-xs text-muted-foreground">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
