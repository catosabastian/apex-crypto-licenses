
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Menu } from 'lucide-react';
import { useApplicationDialog } from '@/components/ApplicationDialog';
import { Link } from 'react-router-dom';

interface MobileNavProps {
  isOpen: boolean;
  onToggle: () => void;
  onNavItemClick: () => void;
  scrollToSection: (sectionId: string) => void;
}

const MobileNav = ({ isOpen, onToggle, onNavItemClick, scrollToSection }: MobileNavProps) => {
  const { openApplicationDialog } = useApplicationDialog();
  
  const handleApplyClick = () => {
    openApplicationDialog();
    onNavItemClick();
  };

  const handleScrollClick = (sectionId: string) => {
    scrollToSection(sectionId);
    onNavItemClick();
  };

  return (
    <>
      {/* Mobile Navigation Toggle */}
      <button 
        className="md:hidden text-foreground p-2" 
        onClick={onToggle}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X /> : <Menu />}
      </button>
      
      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 md:hidden bg-background/95 backdrop-blur-sm border-t border-border animate-fade-in">
          <nav className="container flex flex-col py-4 gap-4">
            <button 
              onClick={() => handleScrollClick('about')}
              className="text-sm font-medium py-2 hover:text-accent transition-colors text-left" 
            >
              About
            </button>
            <button 
              onClick={() => handleScrollClick('licenses')}
              className="text-sm font-medium py-2 hover:text-accent transition-colors text-left" 
            >
              Licenses
            </button>
            <button 
              onClick={() => handleScrollClick('process')}
              className="text-sm font-medium py-2 hover:text-accent transition-colors text-left" 
            >
              Process
            </button>
            <Link 
              to="/verify" 
              className="text-sm font-medium py-2 hover:text-accent transition-colors" 
              onClick={onNavItemClick}
            >
              Verify
            </Link>
            <div className="border-t border-border pt-4">
              <Button 
                variant="default" 
                size="sm" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold" 
                onClick={handleApplyClick}
              >
                Start Application
              </Button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default MobileNav;
