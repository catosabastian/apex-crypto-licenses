
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Shield, TrendingUp, Award, Users, Globe, CheckCircle, Star, Zap } from 'lucide-react';
import { useApplicationDialog } from '@/components/ApplicationDialog';

const Hero = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);
  const { openApplicationDialog } = useApplicationDialog();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced statistics with better animations
  const stats = [
    { value: '45,000+', label: 'Licensed Traders', icon: Users },
    { value: '180+', label: 'Countries Served', icon: Globe },
    { value: '99.9%', label: 'Success Rate', icon: Award },
    { value: '24/7', label: 'Support Available', icon: Shield }
  ];

  const trustBadges = [
    { name: 'SEC Approved', verified: true },
    { name: 'CFTC Certified', verified: true },
    { name: 'FCA Licensed', verified: true },
    { name: 'MiCA Compliant', verified: true }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen pt-16 flex flex-col overflow-hidden">
      {/* Enhanced Professional Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)'
        }}
      />
      
      {/* Improved gradient overlay with better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/96 via-background/92 to-primary/15" />
      
      {/* Enhanced animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-3 h-3 bg-accent/60 rounded-full animate-pulse" style={{top: '15%', left: '8%', animationDelay: '0s'}} />
        <div className="absolute w-2 h-2 bg-primary/50 rounded-full animate-pulse" style={{top: '35%', left: '85%', animationDelay: '1s'}} />
        <div className="absolute w-4 h-4 bg-accent/40 rounded-full animate-pulse" style={{top: '65%', left: '12%', animationDelay: '2s'}} />
        <div className="absolute w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{top: '85%', left: '75%', animationDelay: '3s'}} />
        <div className="absolute w-3 h-3 bg-accent/50 rounded-full animate-pulse" style={{top: '25%', left: '95%', animationDelay: '4s'}} />
      </div>
      
      <div className="container flex-1 flex flex-col justify-center py-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Enhanced Left Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-3 bg-accent/15 text-accent px-6 py-3 rounded-full text-sm font-semibold backdrop-blur-sm border border-accent/30 shadow-lg">
                <Shield className="h-5 w-5" />
                <span>Official Regulatory Authority</span>
                <Star className="h-4 w-4 fill-current" />
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
                <span className="block text-foreground">World's Leading</span>
                <span className="block gradient-text text-6xl md:text-7xl lg:text-8xl font-black">
                  Crypto Trading
                </span>
                <span className="block text-foreground">License Provider</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                Secure your regulatory compliance with our internationally recognized trading certificates. 
                Join <span className="font-semibold text-accent">45,000+</span> successful traders worldwide.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="btn-primary gap-3 px-10 py-6 text-lg font-semibold shadow-2xl" 
                  onClick={openApplicationDialog}
                >
                  <Zap className="h-6 w-6" />
                  Start Your Application
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="gap-3 border-2 border-accent/30 px-10 py-6 text-lg font-semibold shadow-xl hover:bg-accent/10 transition-all duration-300"
                  onClick={() => document.getElementById('verification')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Award className="h-6 w-6" />
                  Verify License
                </Button>
              </div>
              
              {/* Enhanced Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                {trustBadges.map((badge, index) => (
                  <div key={index} className="flex items-center gap-3 justify-center lg:justify-start p-4 glass-card">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium">{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Enhanced Right Content - Statistics Dashboard */}
            <div className="relative">
              <div className="glass-card p-10 shadow-2xl">
                <div className="text-center mb-10">
                  <h3 className="text-3xl font-bold text-foreground mb-3">Live Platform Metrics</h3>
                  <p className="text-muted-foreground text-lg">Real-time global statistics</p>
                </div>
                
                <div className="grid grid-cols-2 gap-8 mb-10">
                  {stats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <div 
                        key={index}
                        className={`text-center p-6 rounded-xl transition-all duration-700 ${
                          index === currentStat 
                            ? 'bg-accent/20 border-2 border-accent shadow-lg scale-105' 
                            : 'bg-muted/30 border border-muted-foreground/20'
                        }`}
                      >
                        <div className="flex justify-center mb-3">
                          <IconComponent className={`h-8 w-8 ${
                            index === currentStat ? 'text-accent' : 'text-muted-foreground'
                          }`} />
                        </div>
                        <div className="text-4xl font-bold text-accent mb-2">{stat.value}</div>
                        <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground font-medium">Processing Speed</span>
                    <span className="text-sm font-semibold text-accent">Average 18 hours</span>
                  </div>
                  <div className="w-full bg-muted/50 rounded-full h-3">
                    <div className="bg-gradient-to-r from-accent to-accent/80 h-3 rounded-full w-[90%] animate-pulse shadow-lg"></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground font-medium">Global Coverage</span>
                    <span className="text-sm font-semibold text-green-500">180+ countries</span>
                  </div>
                  <div className="w-full bg-muted/50 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full w-[96%] animate-pulse shadow-lg"></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground font-medium">Success Rate</span>
                    <span className="text-sm font-semibold text-primary">99.9%</span>
                  </div>
                  <div className="w-full bg-muted/50 rounded-full h-3">
                    <div className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full w-[99%] animate-pulse shadow-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce z-10">
        <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full bg-background/20 backdrop-blur-sm">
          <ChevronDown className="h-6 w-6" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
