
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Menu } from 'lucide-react';
import { useApplicationDialog } from '@/components/ApplicationDialog';

interface MobileNavProps {
  isOpen: boolean;
  onToggle: () => void;
  onNavItemClick: () => void;
}

const MobileNav = ({ isOpen, onToggle, onNavItemClick }: MobileNavProps) => {
  const { openApplicationDialog } = useApplicationDialog();
  
  const handleApplyClick = () => {
    openApplicationDialog();
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
        <div className="md:hidden bg-background border-t border-border animate-fade-in">
          <nav className="container flex flex-col py-4 gap-4">
            <a 
              href="#about" 
              className="text-sm font-medium py-2 hover:text-accent transition-colors" 
              onClick={onNavItemClick}
            >
              About
            </a>
            <a 
              href="#licenses" 
              className="text-sm font-medium py-2 hover:text-accent transition-colors" 
              onClick={onNavItemClick}
            >
              Licenses
            </a>
            <a 
              href="#verification" 
              className="text-sm font-medium py-2 hover:text-accent transition-colors" 
              onClick={onNavItemClick}
            >
              Verification
            </a>
            <Button 
              variant="default" 
              size="sm" 
              className="w-full" 
              onClick={handleApplyClick}
            >
              Apply Now
            </Button>
          </nav>
        </div>
      )}
    </>
  );
};

export default MobileNav;
