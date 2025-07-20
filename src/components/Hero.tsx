
import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Shield, Award, Users, Globe, CheckCircle, Star, Zap, Sparkles, TrendingUp, Clock, Cpu } from 'lucide-react';
import { useApplicationDialog } from '@/components/ApplicationDialog';
import { unifiedDataManager } from '@/utils/unifiedDataManager';

const Hero = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);
  const [content, setContent] = useState(unifiedDataManager.getContent().hero);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [animatedStats, setAnimatedStats] = useState<Record<string, number>>({});
  const { openApplicationDialog } = useApplicationDialog();
  
  // Enhanced scroll handler with parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse movement tracking for interactive effects
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Content updates
  useEffect(() => {
    const handleContentUpdate = () => {
      setContent(unifiedDataManager.getContent().hero);
    };

    unifiedDataManager.addEventListener('content_updated', handleContentUpdate);
    
    return () => {
      unifiedDataManager.removeEventListener('content_updated', handleContentUpdate);
    };
  }, []);

  const iconMap: Record<string, any> = {
    Users,
    Globe,
    Award,
    Shield,
    TrendingUp,
    Clock,
    Cpu
  };

  // Enhanced stat rotation with animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % content.stats.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [content.stats.length]);

  // Animated number counting for stats
  useEffect(() => {
    const animateNumber = (target: number, key: string) => {
      let current = 0;
      const increment = target / 60; // 60 frames for smooth animation
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setAnimatedStats(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, 16); // ~60fps
    };

    content.stats.forEach((stat, index) => {
      const numericValue = parseInt(stat.value.replace(/[^0-9]/g, ''));
      if (numericValue) {
        setTimeout(() => animateNumber(numericValue, `stat-${index}`), index * 200);
      }
    });
  }, [content.stats]);

  // Generate floating particles
  const generateParticles = () => {
    return Array.from({ length: 8 }, (_, i) => (
      <div
        key={i}
        className="particle"
        style={{
          left: `${10 + (i * 12)}%`,
          top: `${20 + (i * 8)}%`,
          width: `${4 + (i % 3) * 2}px`,
          height: `${4 + (i % 3) * 2}px`,
          animationDelay: `${i * 0.5}s`,
          animationDuration: `${6 + (i % 3) * 2}s`,
        }}
      />
    ));
  };

  return (
    <section className="relative min-h-screen pt-16 flex flex-col overflow-hidden">
      {/* Advanced Gradient Background with Parallax */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10 transition-all duration-1000"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
        }}
      />
      
      {/* Enhanced Glass Morphism Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/8 to-transparent backdrop-blur-3xl" />
      
      {/* Dynamic Mesh Gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            hsl(var(--primary) / 0.3) 0%, 
            hsl(var(--accent-amber) / 0.2) 30%, 
            hsl(var(--accent-emerald) / 0.1) 60%, 
            transparent 100%)`,
          transition: 'background 0.3s ease',
        }}
      />
      
      {/* Floating Particles System */}
      <div className="floating-particles">
        {generateParticles()}
      </div>
      
      <div className="container flex-1 flex flex-col justify-center py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Enhanced Left Content */}
            <div className="text-center lg:text-left space-y-12 animate-fade-in-up">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-3 glass-card px-8 py-4 rounded-full text-sm font-medium hover-lift">
                <Shield className="h-6 w-6 text-primary animate-pulse" />
                <span className="text-primary font-bold text-base">Official Regulatory Authority</span>
                <Sparkles className="h-5 w-5 text-accent-amber animate-pulse" />
              </div>
              
              {/* Enhanced Hero Title */}
              <div className="space-y-4">
                <h1 className="text-display leading-tight animate-slide-up">
                  <span className="block text-foreground font-light">World's Leading</span>
                  <span className="block gradient-text font-black text-6xl lg:text-7xl mb-2">
                    Crypto Trading
                  </span>
                  <span className="block text-foreground font-light">License Provider</span>
                </h1>
                
                {/* Animated Underline */}
                <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent-amber to-accent-emerald rounded-full mx-auto lg:mx-0 animate-pulse-glow"></div>
              </div>
              
              {/* Enhanced Subtitle */}
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl animate-fade-in font-medium" style={{animationDelay: '0.2s'}}>
                {content.subheadline}
              </p>
              
              {/* Premium CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start animate-fade-in" style={{animationDelay: '0.4s'}}>
                <Button 
                  size="lg" 
                  className="glass-button gap-4 px-12 py-8 text-lg font-bold rounded-2xl hover-lift hover-glow group relative overflow-hidden" 
                  onClick={openApplicationDialog}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent-amber/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Zap className="h-7 w-7 relative z-10" />
                  <span className="relative z-10">{content.ctaText}</span>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="gap-4 px-12 py-8 text-lg font-bold rounded-2xl glass-card hover-lift border-2 border-primary/30 hover:border-primary/60 group"
                  onClick={() => document.getElementById('verification')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Award className="h-7 w-7 group-hover:rotate-12 transition-transform duration-300" />
                  <span>{content.ctaSecondaryText}</span>
                </Button>
              </div>
              
              {/* Enhanced Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 animate-fade-in" style={{animationDelay: '0.6s'}}>
                {content.trustBadges.map((badge, index) => (
                  <div 
                    key={index} 
                    className="trust-badge flex items-center gap-3 justify-center lg:justify-start p-4 rounded-xl hover-lift"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    <CheckCircle className="h-5 w-5 text-accent-emerald animate-pulse" />
                    <span className="text-sm font-bold">{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Enhanced Right Content - Advanced Statistics Dashboard */}
            <div className="relative animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="modern-card hover-lift relative overflow-hidden">
                {/* Card Header */}
                <div className="text-center mb-10">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse"></div>
                    <h3 className="text-section gradient-text">Live Platform Metrics</h3>
                    <div className="w-3 h-3 bg-accent-amber rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-lg text-muted-foreground font-medium">Real-time global statistics</p>
                </div>
                
                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-2 gap-6 mb-10">
                  {content.stats.map((stat, index) => {
                    const IconComponent = iconMap[stat.icon];
                    const animatedValue = animatedStats[`stat-${index}`];
                    const displayValue = animatedValue ? 
                      stat.value.replace(/\d+/, animatedValue.toString()) : 
                      stat.value;
                    
                    return (
                      <div 
                        key={index}
                        className={`stat-card text-center p-6 transition-all duration-500 hover-lift ${
                          index === currentStat 
                            ? 'bg-primary/10 border-2 border-primary shadow-lg shadow-primary/20 animate-glow' 
                            : 'hover:border-primary/30'
                        }`}
                      >
                        <div className="flex justify-center mb-4">
                          {IconComponent && (
                            <div className={`p-3 rounded-full ${
                              index === currentStat 
                                ? 'bg-primary/20 text-primary' 
                                : 'bg-muted/30 text-muted-foreground'
                            } transition-all duration-300`}>
                              <IconComponent className="h-8 w-8" />
                            </div>
                          )}
                        </div>
                        <div className="text-3xl font-black text-primary mb-2 font-mono">
                          {displayValue}
                        </div>
                        <div className="text-sm text-muted-foreground font-semibold">
                          {stat.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Enhanced Progress Sections */}
                <div className="space-y-6">
                  <div className="glass-card p-6 rounded-2xl hover-lift">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <span className="text-sm font-bold text-muted-foreground">Processing Speed</span>
                      </div>
                      <span className="text-sm font-black text-primary bg-primary/10 px-3 py-1 rounded-full">
                        18 hours avg
                      </span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-4 overflow-hidden">
                      <div className="progress-enhanced h-4 w-[90%]"></div>
                    </div>
                  </div>
                  
                  <div className="glass-card p-6 rounded-2xl hover-lift">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-5 w-5 text-accent-emerald" />
                        <span className="text-sm font-bold text-muted-foreground">Success Rate</span>
                      </div>
                      <span className="text-sm font-black text-accent-emerald bg-accent-emerald/10 px-3 py-1 rounded-full">
                        99.9%
                      </span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-4 overflow-hidden">
                      <div className="bg-gradient-to-r from-accent-emerald to-primary h-4 rounded-full w-[99%] progress-enhanced"></div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent-amber/30 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent-emerald/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce z-10">
        <a 
          href="#about" 
          className="glass-card p-4 rounded-full hover-lift text-muted-foreground hover:text-primary transition-all duration-300 group"
        >
          <ChevronDown className="h-6 w-6 group-hover:scale-110 transition-transform" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
