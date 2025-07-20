
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Shield, TrendingUp, Award, Users, Globe, CheckCircle } from 'lucide-react';
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

  // Animated statistics
  const stats = [
    { value: '30,000+', label: 'Licensed Traders' },
    { value: '150+', label: 'Countries Served' },
    { value: '99.9%', label: 'Success Rate' },
    { value: '24/7', label: 'Support Available' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen pt-16 flex flex-col overflow-hidden">
      {/* Professional Trading Floor Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)'
        }}
      />
      
      {/* Clear gradient overlay without cloudiness */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-primary/20" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-2 h-2 bg-accent rounded-full animate-pulse" style={{top: '20%', left: '10%', animationDelay: '0s'}} />
        <div className="absolute w-1 h-1 bg-primary rounded-full animate-pulse" style={{top: '40%', left: '80%', animationDelay: '1s'}} />
        <div className="absolute w-3 h-3 bg-accent/50 rounded-full animate-pulse" style={{top: '60%', left: '15%', animationDelay: '2s'}} />
        <div className="absolute w-2 h-2 bg-primary/50 rounded-full animate-pulse" style={{top: '80%', left: '70%', animationDelay: '3s'}} />
      </div>
      
      <div className="container flex-1 flex flex-col justify-center py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm mb-8 backdrop-blur-sm border border-accent/20">
                <Shield className="h-4 w-4" />
                <span className="font-semibold">Official Regulatory Authority</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
                World's Leading
                <span className="block text-accent bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
                  Crypto Trading License
                </span>
                <span className="block">Provider</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Secure your regulatory compliance with our internationally recognized trading certificates. Join thousands of successful traders worldwide.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Button 
                  size="lg" 
                  className="gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300" 
                  onClick={openApplicationDialog}
                >
                  Start Your Application
                  <TrendingUp className="h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="gap-2 border-2 px-8 py-6 text-lg shadow-lg hover:bg-accent/5 transition-all duration-300"
                  onClick={() => document.getElementById('verification')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Verify License
                  <Award className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto lg:mx-0">
                <div className="flex items-center gap-3 justify-center lg:justify-start p-4 bg-background/10 backdrop-blur-sm rounded-lg border border-border/50">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">SEC Approved</span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start p-4 bg-background/10 backdrop-blur-sm rounded-lg border border-border/50">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">CFTC Certified</span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start p-4 bg-background/10 backdrop-blur-sm rounded-lg border border-border/50">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">FCA Licensed</span>
                </div>
              </div>
            </div>
            
            {/* Right Content - Statistics */}
            <div className="relative">
              <div className="bg-background/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-border/50">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Real-Time Statistics</h3>
                  <p className="text-muted-foreground">Live platform metrics</p>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {stats.map((stat, index) => (
                    <div 
                      key={index}
                      className={`text-center p-4 rounded-lg transition-all duration-500 ${
                        index === currentStat ? 'bg-accent/20 border-2 border-accent' : 'bg-muted/50'
                      }`}
                    >
                      <div className="text-3xl font-bold text-accent mb-2">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Processing Speed</span>
                    <span className="text-sm font-semibold">24 hours avg</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full w-[85%] animate-pulse"></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Global Coverage</span>
                    <span className="text-sm font-semibold">150+ countries</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full w-[92%] animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-6 left-0 right-0 flex justify-center animate-bounce z-10">
        <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
          <ChevronDown className="h-6 w-6" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
