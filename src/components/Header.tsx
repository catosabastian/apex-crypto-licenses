
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Menu, X } from 'lucide-react';
import { useApplicationDialog } from '@/components/ApplicationDialog';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openApplicationDialog } = useApplicationDialog();
  
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm z-50 border-b border-border py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/319819f6-bda5-4ab2-af50-3b909645c976.png" 
            alt="APEX Crypto License" 
            className="h-12 w-auto rounded-lg shadow-sm"
          />
          <div>
            <h1 className="text-xl font-bold tracking-tight">APEX</h1>
            <p className="text-xs text-muted-foreground">Crypto Licensing Regulatory</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#about" className="text-sm font-medium hover:text-accent transition-colors">About</a>
          <a href="#licenses" className="text-sm font-medium hover:text-accent transition-colors">Licenses</a>
          <a href="#verification" className="text-sm font-medium hover:text-accent transition-colors">Verification</a>
          <Button variant="default" size="sm" onClick={openApplicationDialog}>Apply Now</Button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden text-foreground p-2" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border animate-fade-in">
          <nav className="container flex flex-col py-4 gap-4">
            <a href="#about" className="text-sm font-medium py-2 hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#licenses" className="text-sm font-medium py-2 hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>Licenses</a>
            <a href="#verification" className="text-sm font-medium py-2 hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>Verification</a>
            <Button variant="default" size="sm" className="w-full" onClick={() => {
              openApplicationDialog();
              setIsMenuOpen(false);
            }}>Apply Now</Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
