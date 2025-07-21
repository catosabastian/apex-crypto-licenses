
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, TrendingUp, Users, Shield, Zap, ArrowRight, CheckCircle, Star, Globe, Award } from 'lucide-react';
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
    <section className="relative min-h-screen bg-background overflow-hidden">
      {/* Advanced Layered Background */}
      <div className="absolute inset-0">
        {/* Primary Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-accent-amber/5 animate-gradient bg-[length:400%_400%]" />
        
        {/* Glass Morphism Layer */}
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>

      {/* Floating Geometric Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Floating Circle */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl animate-float" />
        
        {/* Medium Floating Elements */}
        <div className="absolute top-1/3 left-10 w-64 h-64 bg-gradient-to-br from-accent-amber/15 to-accent-emerald/15 rounded-full blur-2xl animate-float-delay" />
        
        {/* Small Accent Elements */}
        <div className="absolute bottom-1/4 right-1/3 w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-xl animate-pulse-glow" />
        
        {/* Geometric Shapes */}
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-primary/30 rotate-45 animate-spin-slow" />
        <div className="absolute bottom-1/3 left-1/2 w-12 h-12 bg-accent/20 transform rotate-12 animate-float" />
      </div>

      {/* Main Content Container */}
      <div className="container relative z-10 flex flex-col justify-center min-h-screen py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Enhanced Main Content */}
            <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              {/* Enhanced Badge with Glow */}
              <div className="inline-flex">
                <Badge 
                  variant="outline" 
                  className="text-primary border-primary/40 px-6 py-3 text-sm font-semibold glass-card hover-glow animate-fade-in"
                >
                  <Shield className="w-5 h-5 mr-3 animate-pulse-glow" />
                  {displayContent.badge}
                </Badge>
              </div>

              {/* Enhanced Main Headline with Gradient Text */}
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in-up">
                  <span className="block text-foreground hover-lift">{displayContent.title?.line1}</span>
                  <span className="block gradient-text animate-glow text-transparent bg-clip-text">
                    {displayContent.title?.line2}
                  </span>
                  <span className="block text-foreground hover-lift">{displayContent.title?.line3}</span>
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed animate-fade-in-delay">
                  {displayContent.subtitle}
                </p>
              </div>

              {/* Enhanced CTA Section with Advanced Styling */}
              <div className="flex flex-col sm:flex-row gap-6 pt-8">
                <Button
                  size="lg"
                  className="btn-primary text-lg px-10 py-6 enhanced-shadow hover-lift"
                  onClick={openApplicationDialog}
                >
                  {displayContent.primaryCTA}
                  <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1" />
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-10 py-6 glass-button hover-glow border-2"
                >
                  <Play className="w-6 h-6 mr-3" />
                  {displayContent.secondaryCTA}
                </Button>
              </div>

              {/* Enhanced Trust Indicators */}
              <div className="flex flex-wrap items-center gap-8 pt-10">
                {displayContent.trustIndicators?.map((indicator, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm text-muted-foreground hover-lift">
                    <div className="p-2 bg-primary/10 rounded-lg vibrant-glow">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium">{indicator}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Advanced Stats Dashboard */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              {/* Main Stats Card with Glass Morphism */}
              <div className="glass-card modern-card enhanced-shadow hover-lift space-y-8">
                {/* Header Section */}
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-xl vibrant-glow">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold gradient-text">
                      Trusted Worldwide
                    </h3>
                  </div>
                  <div className="w-20 h-1 bg-gradient-to-r from-primary via-accent to-accent-amber mx-auto rounded-full animate-gradient bg-[length:200%_200%]" />
                </div>
                
                {/* Enhanced Current Stat Display */}
                {statsData.length > 0 && (
                  <div className="text-center space-y-6 min-h-[180px] flex flex-col justify-center">
                    <div className="glass-card p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 hover-glow animate-scale-in">
                      <div className="text-5xl font-bold gradient-text mb-4 animate-pulse-glow">
                        {statsData[currentStat]?.number}
                      </div>
                      <div className="text-xl font-semibold text-foreground mb-3">
                        {statsData[currentStat]?.label}
                      </div>
                      <div className="text-muted-foreground">
                        {statsData[currentStat]?.description}
                      </div>
                    </div>
                  </div>
                )}

                {/* Enhanced Stat Navigation */}
                <div className="flex justify-center gap-3">
                  {statsData.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-500 hover-lift ${
                        index === currentStat 
                          ? 'bg-gradient-to-r from-primary to-accent scale-150 vibrant-glow' 
                          : 'bg-primary/40 hover:bg-primary/70 hover:scale-125'
                      }`}
                      onClick={() => setCurrentStat(index)}
                    />
                  ))}
                </div>

                {/* Enhanced Feature Icons Grid */}
                <div className="grid grid-cols-3 gap-6 pt-6">
                  {[
                    { icon: Shield, label: "Secure", color: "text-primary" },
                    { icon: TrendingUp, label: "Growth", color: "text-accent" },
                    { icon: Award, label: "Certified", color: "text-accent-amber" }
                  ].map(({ icon: Icon, label, color }, index) => (
                    <div key={index} className="flex flex-col items-center p-4 glass-card hover-lift hover-glow transition-all duration-300">
                      <div className="p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl mb-3 vibrant-glow">
                        <Icon className={`w-6 h-6 ${color}`} />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Additional Visual Elements */}
                <div className="flex justify-center pt-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Star className="w-4 h-4 text-accent-amber animate-pulse-glow" />
                    <span>Premium Service</span>
                    <Star className="w-4 h-4 text-accent-amber animate-pulse-glow" />
                  </div>
                </div>
              </div>

              {/* Secondary Enhancement Card */}
              <div className="mt-8 glass-card p-6 bg-gradient-to-br from-accent/5 to-accent-emerald/5 border border-accent/20 hover-glow">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-accent mb-1">Live Updates</div>
                    <div className="text-xs text-muted-foreground">Real-time processing</div>
                  </div>
                  <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse-glow"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center space-y-3 text-muted-foreground hover-lift">
          <div className="w-8 h-14 border-2 border-primary/40 rounded-full p-2 glass-card">
            <div className="w-2 h-4 bg-gradient-to-b from-primary to-accent rounded-full mx-auto animate-scroll" />
          </div>
          <span className="text-xs font-medium tracking-wide">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
