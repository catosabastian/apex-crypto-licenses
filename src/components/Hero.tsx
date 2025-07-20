
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Shield, Award, Users, Globe, CheckCircle, Star, Zap } from 'lucide-react';
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
      {/* Clean Professional Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)'
        }}
      />
      
      {/* Improved gradient overlay with better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/70 to-background/60" />
      
      {/* Subtle animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-2 h-2 bg-primary/30 rounded-full animate-pulse" style={{top: '20%', left: '10%', animationDelay: '0s'}} />
        <div className="absolute w-1 h-1 bg-accent/40 rounded-full animate-pulse" style={{top: '40%', left: '90%', animationDelay: '1s'}} />
        <div className="absolute w-2 h-2 bg-primary/20 rounded-full animate-pulse" style={{top: '70%', left: '15%', animationDelay: '2s'}} />
        <div className="absolute w-1 h-1 bg-accent/30 rounded-full animate-pulse" style={{top: '80%', left: '85%', animationDelay: '3s'}} />
      </div>
      
      <div className="container flex-1 flex flex-col justify-center py-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20">
                <Shield className="h-4 w-4" />
                <span>Official Regulatory Authority</span>
                <Star className="h-3 w-3 fill-current" />
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                <span className="block text-foreground">World's Leading</span>
                <span className="block text-primary text-5xl md:text-6xl lg:text-7xl font-black">
                  Crypto Trading
                </span>
                <span className="block text-foreground">License Provider</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Secure your regulatory compliance with our internationally recognized trading certificates. 
                Join <span className="font-semibold text-primary">45,000+</span> successful traders worldwide.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="gap-2 px-8 py-6 text-lg font-semibold" 
                  onClick={openApplicationDialog}
                >
                  <Zap className="h-5 w-5" />
                  Start Your Application
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="gap-2 px-8 py-6 text-lg font-semibold"
                  onClick={() => document.getElementById('verification')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Award className="h-5 w-5" />
                  Verify License
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6">
                {trustBadges.map((badge, index) => (
                  <div key={index} className="flex items-center gap-2 justify-center lg:justify-start p-3 bg-card/50 rounded-lg border border-border/50">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-xs font-medium">{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Content - Statistics Dashboard */}
            <div className="relative">
              <div className="bg-card/80 backdrop-blur-sm p-8 rounded-2xl border border-border shadow-xl">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Live Platform Metrics</h3>
                  <p className="text-muted-foreground">Real-time global statistics</p>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {stats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <div 
                        key={index}
                        className={`text-center p-4 rounded-xl transition-all duration-500 ${
                          index === currentStat 
                            ? 'bg-primary/10 border-2 border-primary shadow-md' 
                            : 'bg-muted/30 border border-border'
                        }`}
                      >
                        <div className="flex justify-center mb-2">
                          <IconComponent className={`h-6 w-6 ${
                            index === currentStat ? 'text-primary' : 'text-muted-foreground'
                          }`} />
                        </div>
                        <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                        <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Processing Speed</span>
                    <span className="text-sm font-semibold text-primary">18 hours avg</span>
                  </div>
                  <div className="w-full bg-muted/50 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-[90%]"></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Success Rate</span>
                    <span className="text-sm font-semibold text-green-600">99.9%</span>
                  </div>
                  <div className="w-full bg-muted/50 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full w-[99%]"></div>
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
