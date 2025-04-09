import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Globe, Shield, AlertTriangle } from 'lucide-react';
import { useApplicationDialog } from '@/components/ApplicationDialog';

const Hero = () => {
  const [scrolled, setScrolled] = useState(false);
  const { openApplicationDialog } = useApplicationDialog();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen pt-16 flex flex-col">
      <div className="container flex-1 flex flex-col justify-center py-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm mb-6">
            <Shield className="h-4 w-4" />
            <span>Official Regulatory Service</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Crypto Trading License Authority
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Secure official recognition for your cryptocurrency trading activities with government-compliant licensing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2" onClick={openApplicationDialog}>
              Apply for License
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2" onClick={() => document.getElementById('verification')?.scrollIntoView({ behavior: 'smooth' })}>
              Verify License
              <Globe className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-12 flex items-center gap-8 justify-center flex-wrap">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="text-sm">Regulatory Compliance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              <span className="text-sm">Identity Verification</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-purple-500"></div>
              <span className="text-sm">Trade Protection</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-6 left-0 right-0 flex justify-center animate-bounce">
        <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
          <ChevronDown className="h-6 w-6" />
        </a>
      </div>
      
      <CryptoBubbles />
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-32"></div>
    </section>
  );
};

const CryptoBubbles = () => {
  const cryptoIcons = [
    { name: 'Bitcoin', symbol: 'BTC', color: '#F7931A' },
    { name: 'Ethereum', symbol: 'ETH', color: '#627EEA' },
    { name: 'Tether', symbol: 'USDT', color: '#26A17B' },
    { name: 'XRP', symbol: 'XRP', color: '#23292F' },
    { name: 'Binance', symbol: 'BNB', color: '#F3BA2F' },
    { name: 'Kraken', symbol: 'KRK', color: '#5741D9' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {cryptoIcons.map((crypto, idx) => (
        <div 
          key={crypto.symbol}
          className="bubble"
          style={{
            width: `${40 + Math.random() * 30}px`,
            height: `${40 + Math.random() * 30}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${idx * 0.5}s`,
            background: 'white',
            border: `2px solid ${crypto.color}`
          }}
        >
          <span className="font-bold text-xs">{crypto.symbol}</span>
        </div>
      ))}
    </div>
  );
};

export default Hero;
