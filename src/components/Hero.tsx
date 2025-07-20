
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, TrendingUp, Users, Award, Star, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import UnifiedApplicationForm from './UnifiedApplicationForm';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stats, setStats] = useState({
    licenses: 0,
    traders: 0,
    volume: 0,
    satisfaction: 0
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Animate stats on mount with staggered timing
    const animateStats = () => {
      const targetStats = { licenses: 2847, traders: 15642, volume: 2.8, satisfaction: 98 };
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        setStats({
          licenses: Math.floor(targetStats.licenses * easeOut),
          traders: Math.floor(targetStats.traders * easeOut),
          volume: parseFloat((targetStats.volume * easeOut).toFixed(1)),
          satisfaction: Math.floor(targetStats.satisfaction * easeOut)
        });
        
        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);
    };

    const timer = setTimeout(animateStats, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background/95 to-accent/5">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
        
        {/* Floating Particles with Staggered Animation */}
        <div className="absolute inset-0">
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${4 + Math.random() * 6}s`,
              }}
            />
          ))}
        </div>

        {/* Interactive Mouse Glow Effect */}
        <div
          className="absolute w-96 h-96 bg-gradient-radial from-primary/15 via-primary/5 to-transparent rounded-full pointer-events-none transition-all duration-500 ease-out opacity-80"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transform: 'translate3d(0, 0, 0)',
          }}
        />

        {/* Geometric Patterns with Enhanced Animation */}
        <div className="absolute top-20 left-20 w-32 h-32 border border-primary/20 rounded-full animate-spin-slow opacity-60" />
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-accent/30 rotate-45 animate-bounce-slow opacity-50" />
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg animate-pulse-slow" />
        <div className="absolute top-1/3 right-16 w-20 h-20 border-2 border-accent-emerald/20 rounded-xl animate-float opacity-40" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Status Badge with Enhanced Animation */}
          <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
            <Badge variant="outline" className="mb-8 px-6 py-3 glass-card border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105">
              <Shield className="w-4 h-4 mr-2" />
              Regulated & Certified Authority
            </Badge>
          </div>

          {/* Main Heading with Staggered Animation */}
          <div className="space-y-4">
            <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                <span className="gradient-text bg-gradient-to-r from-primary via-accent-emerald to-primary bg-clip-text text-transparent block">
                  Professional
                </span>
              </h1>
            </div>
            <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.6s' }}>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-foreground block">Crypto Trading</span>
              </h1>
            </div>
            <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.8s' }}>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                <span className="gradient-text bg-gradient-to-r from-accent-amber via-primary to-accent-emerald bg-clip-text text-transparent block">
                  Licenses
                </span>
              </h1>
            </div>
          </div>

          {/* Enhanced Subtitle */}
          <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '1.0s' }}>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed mt-8">
              Get officially certified to trade cryptocurrencies with our globally recognized licensing program. 
              <span className="text-primary font-medium"> Join thousands of professional traders</span> who trust our certification.
            </p>
          </div>

          {/* Enhanced Stats Grid with Staggered Animation */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { value: stats.licenses.toLocaleString() + '+', label: 'Active Licenses', color: 'primary', delay: '1.2s' },
              { value: stats.traders.toLocaleString() + '+', label: 'Certified Traders', color: 'accent', delay: '1.3s' },
              { value: '$' + stats.volume + 'B+', label: 'Trading Volume', color: 'accent-emerald', delay: '1.4s' },
              { value: stats.satisfaction + '%', label: 'Satisfaction', color: 'accent-amber', delay: '1.5s' }
            ].map((stat, index) => (
              <div 
                key={index}
                className="animate-fade-in-up opacity-0 glass-card p-6 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all duration-500 group hover:scale-105 hover:shadow-2xl"
                style={{ animationDelay: stat.delay }}
              >
                <div className={`text-3xl lg:text-4xl font-bold text-${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="animate-fade-in-up opacity-0 flex flex-col sm:flex-row gap-6 justify-center items-center mb-16" style={{ animationDelay: '1.6s' }}>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="group px-10 py-4 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 min-w-[200px]"
                >
                  Start Your Application
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" aria-describedby="application-form-description">
                <div id="application-form-description" className="sr-only">
                  Complete the trading license application form to get certified
                </div>
                <UnifiedApplicationForm />
              </DialogContent>
            </Dialog>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="group px-10 py-4 text-lg font-semibold glass-card border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105 min-w-[200px]"
            >
              View License Types
              <Award className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            </Button>
          </div>

          {/* Enhanced Trust Indicators */}
          <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '1.8s' }}>
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
              {[
                { icon: Shield, text: 'Globally Recognized', color: 'text-primary' },
                { icon: Star, text: '5-Star Rated', color: 'text-accent-amber' },
                { icon: TrendingUp, text: 'Fast Processing', color: 'text-accent-emerald' },
                { icon: Users, text: 'Expert Support', color: 'text-accent' }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
