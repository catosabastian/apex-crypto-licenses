
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useApplicationDialog } from '@/components/ApplicationDialog';
import { supabaseDataManager } from '@/utils/supabaseDataManager';
import { ArrowRight, Shield, TrendingUp, Users, Globe, CheckCircle, Star, Zap, Sparkles, ChevronDown } from 'lucide-react';

interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  cta_text: string;
  stats: Array<{ value: string; label: string }>;
}

const DynamicHero = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);
  const [content, setContent] = useState<HeroContent>({
    title: 'Professional Trading License Services',
    subtitle: 'Secure Your Trading Future',
    description: 'Get licensed to trade across major cryptocurrency exchanges with our comprehensive licensing services. Fast, secure, and legally compliant.',
    cta_text: 'Get Licensed Now',
    stats: [
      { value: '2000+', label: 'Licensed Traders' },
      { value: '15+', label: 'Supported Exchanges' },
      { value: '99.9%', label: 'Approval Rate' }
    ]
  });
  
  const { openApplicationDialog } = useApplicationDialog();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const heroContent = await supabaseDataManager.getContent('hero');
        if (heroContent && heroContent.hero_title) {
          setContent({
            title: heroContent.hero_title || content.title,
            subtitle: heroContent.hero_subtitle || content.subtitle,
            description: heroContent.hero_description || content.description,
            cta_text: heroContent.hero_cta_text || content.cta_text,
            stats: heroContent.hero_stats || content.stats
          });
        }
      } catch (error) {
        console.error('Error loading hero content:', error);
      }
    };

    const handleContentUpdate = () => {
      loadContent();
    };

    loadContent();
    supabaseDataManager.addEventListener('content_updated', handleContentUpdate);
    
    return () => {
      supabaseDataManager.removeEventListener('content_updated', handleContentUpdate);
    };
  }, []);

  const iconMap: Record<string, any> = {
    Users,
    Globe,
    Shield,
    TrendingUp
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % content.stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [content.stats.length]);

  return (
    <section className="relative min-h-screen pt-16 flex flex-col overflow-hidden">
      {/* Modern Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
      
      {/* Glass Morphism Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent backdrop-blur-3xl" />
      
      {/* Floating Elements with Modern Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-3 h-3 bg-primary/30 rounded-full animate-float" style={{top: '20%', left: '10%', animationDelay: '0s'}} />
        <div className="absolute w-2 h-2 bg-accent/40 rounded-full animate-float" style={{top: '40%', left: '90%', animationDelay: '1s'}} />
        <div className="absolute w-4 h-4 bg-primary/20 rounded-full animate-float" style={{top: '70%', left: '15%', animationDelay: '2s'}} />
        <div className="absolute w-2 h-2 bg-accent-amber/30 rounded-full animate-float" style={{top: '80%', left: '85%', animationDelay: '3s'}} />
        <div className="absolute w-3 h-3 bg-accent-emerald/25 rounded-full animate-float" style={{top: '30%', left: '80%', animationDelay: '4s'}} />
      </div>
      
      <div className="container flex-1 flex flex-col justify-center py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-10 animate-fade-in-up">
              <div className="inline-flex items-center gap-3 glass-card px-6 py-3 rounded-full text-sm font-medium">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-primary font-semibold">Official Regulatory Authority</span>
                <Sparkles className="h-4 w-4 text-accent animate-pulse" />
              </div>
              
              <h1 className="text-display leading-tight animate-slide-up">
                <span className="block text-foreground">World's Leading</span>
                <span className="block gradient-text font-black">
                  Crypto Trading
                </span>
                <span className="block text-foreground">License Provider</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl animate-fade-in" style={{animationDelay: '0.2s'}}>
                {content.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start animate-fade-in" style={{animationDelay: '0.4s'}}>
                <Button 
                  size="lg" 
                  className="glass-button gap-3 px-10 py-8 text-lg font-bold rounded-2xl hover-lift hover-glow" 
                  onClick={openApplicationDialog}
                >
                  <Zap className="h-6 w-6" />
                  {content.cta_text}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="gap-3 px-10 py-8 text-lg font-bold rounded-2xl glass-card hover-lift"
                  onClick={() => document.getElementById('verification')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Shield className="h-6 w-6" />
                  Learn More
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 animate-fade-in" style={{animationDelay: '0.6s'}}>
                {['ISO Certified', 'Bank Grade', 'Regulated', 'Secure'].map((badge, index) => (
                  <div key={index} className={`flex items-center gap-3 justify-center lg:justify-start p-4 rounded-xl glass-card hover-lift`}>
                    <CheckCircle className="h-5 w-5 text-accent-emerald" />
                    <span className="text-sm font-semibold">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Content - Enhanced Statistics Dashboard */}
            <div className="relative animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="modern-card hover-lift">
                <div className="text-center mb-10">
                  <h3 className="text-section gradient-text mb-4">Live Platform Metrics</h3>
                  <p className="text-lg text-muted-foreground">Real-time global statistics</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  {content.stats.map((stat, index) => {
                    const icons = [Shield, TrendingUp, Users];
                    const Icon = icons[index] || Shield;
                    
                    return (
                      <div 
                        key={index}
                        className={`text-center p-6 rounded-2xl transition-all duration-500 hover-lift ${
                          index === currentStat 
                            ? 'bg-primary/10 border-2 border-primary shadow-lg shadow-primary/20 animate-glow' 
                            : 'bg-muted/30 border border-border/50 hover:border-primary/30'
                        }`}
                      >
                        <div className="flex justify-center mb-4">
                          <Icon className={`h-8 w-8 ${
                            index === currentStat ? 'text-primary' : 'text-muted-foreground'
                          }`} />
                        </div>
                        <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                        <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="space-y-6">
                  <div className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-muted-foreground">Processing Speed</span>
                      <span className="text-sm font-bold text-primary">18 hours avg</span>
                    </div>
                    <div className="w-full bg-muted/50 rounded-full h-3">
                      <div className="bg-gradient-to-r from-primary to-accent h-3 rounded-full w-[90%] animate-pulse-glow"></div>
                    </div>
                  </div>
                  
                  <div className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-muted-foreground">Success Rate</span>
                      <span className="text-sm font-bold text-accent-emerald">99.9%</span>
                    </div>
                    <div className="w-full bg-muted/50 rounded-full h-3">
                      <div className="bg-gradient-to-r from-accent-emerald to-primary h-3 rounded-full w-[99%] animate-pulse-glow"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce z-10">
        <a href="#about" className="glass-card p-3 rounded-full hover-lift text-muted-foreground hover:text-primary transition-colors">
          <ChevronDown className="h-6 w-6" />
        </a>
      </div>
    </section>
  );
};

export default DynamicHero;
