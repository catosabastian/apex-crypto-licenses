
import React from 'react';
import { Button } from '@/components/ui/button';

interface DesktopNavProps {
  onApplyClick: () => void;
}

const DesktopNav = ({ onApplyClick }: DesktopNavProps) => {
  return (
    <nav className="hidden md:flex items-center gap-6">
      <a href="#about" className="text-sm font-medium hover:text-accent transition-colors">About</a>
      <a href="#licenses" className="text-sm font-medium hover:text-accent transition-colors">Licenses</a>
      <a href="#verification" className="text-sm font-medium hover:text-accent transition-colors">Verification</a>
      <Button variant="default" size="sm" onClick={onApplyClick}>Apply Now</Button>
    </nav>
  );
};

export default DesktopNav;
