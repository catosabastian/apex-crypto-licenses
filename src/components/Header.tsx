
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm z-50 border-b border-border py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </Link>
          <div>
            <Link to="/">
              <h1 className="text-xl font-bold tracking-tight">APEX</h1>
              <p className="text-xs text-muted-foreground">Global Crypto Compliance</p>
            </Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/about" 
            className={`text-sm font-medium transition-colors ${isActive('/about') ? 'text-accent' : 'hover:text-accent'}`}
          >
            About
          </Link>
          <Link 
            to="/licenses" 
            className={`text-sm font-medium transition-colors ${isActive('/licenses') ? 'text-accent' : 'hover:text-accent'}`}
          >
            Licenses
          </Link>
          <Link 
            to="/verification" 
            className={`text-sm font-medium transition-colors ${isActive('/verification') ? 'text-accent' : 'hover:text-accent'}`}
          >
            Verification
          </Link>
          <Link 
            to="/application" 
            className={`text-sm font-medium transition-colors ${isActive('/application') ? 'text-accent' : 'hover:text-accent'}`}
          >
            Application
          </Link>
          <Button variant="default" size="sm" asChild>
            <Link to="/application">Apply Now</Link>
          </Button>
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
            <Link 
              to="/about" 
              className={`text-sm font-medium py-2 ${isActive('/about') ? 'text-accent' : 'hover:text-accent transition-colors'}`} 
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/licenses" 
              className={`text-sm font-medium py-2 ${isActive('/licenses') ? 'text-accent' : 'hover:text-accent transition-colors'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Licenses
            </Link>
            <Link 
              to="/verification" 
              className={`text-sm font-medium py-2 ${isActive('/verification') ? 'text-accent' : 'hover:text-accent transition-colors'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Verification
            </Link>
            <Link 
              to="/application" 
              className={`text-sm font-medium py-2 ${isActive('/application') ? 'text-accent' : 'hover:text-accent transition-colors'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Application
            </Link>
            <Button variant="default" size="sm" className="w-full" asChild onClick={() => setIsMenuOpen(false)}>
              <Link to="/application">Apply Now</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
