
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Award, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import UnifiedApplicationForm from './UnifiedApplicationForm';

const Hero = () => {
  const [stats, setStats] = useState({
    licenses: 0,
    traders: 0,
    volume: 0,
    satisfaction: 0
  });

  useEffect(() => {
    // Simple stats animation
    const animateStats = () => {
      const targetStats = { licenses: 2847, traders: 15642, volume: 2.8, satisfaction: 98 };
      const duration = 1500;
      const steps = 30;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setStats({
          licenses: Math.floor(targetStats.licenses * progress),
          traders: Math.floor(targetStats.traders * progress),
          volume: parseFloat((targetStats.volume * progress).toFixed(1)),
          satisfaction: Math.floor(targetStats.satisfaction * progress)
        });
        
        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);
    };

    const timer = setTimeout(animateStats, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-accent/5">
      {/* Simple background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Status Badge */}
          <Badge variant="outline" className="mb-8 px-4 py-2 border-primary/30 text-primary">
            <Shield className="w-4 h-4 mr-2" />
            Regulated & Certified Authority
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Professional Crypto Trading
            </span>
            <br />
            <span className="text-foreground">Licenses</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Get officially certified to trade cryptocurrencies with our globally recognized licensing program. 
            Join thousands of professional traders who trust our certification.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { value: stats.licenses.toLocaleString() + '+', label: 'Active Licenses' },
              { value: stats.traders.toLocaleString() + '+', label: 'Certified Traders' },
              { value: '$' + stats.volume + 'B+', label: 'Trading Volume' },
              { value: stats.satisfaction + '%', label: 'Satisfaction' }
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border hover:border-primary/30 transition-colors duration-300"
              >
                <div className="text-2xl lg:text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                >
                  Start Your Application
                  <ChevronRight className="ml-2 h-5 w-5" />
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
              className="px-8 py-3 text-lg font-semibold border-primary/30 hover:bg-primary/10 transition-colors"
            >
              View License Types
              <Award className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            {[
              { icon: Shield, text: 'Globally Recognized' },
              { icon: Users, text: 'Expert Support' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <item.icon className="w-4 h-4 text-primary" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
