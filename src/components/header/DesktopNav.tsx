
import React from 'react';
import { Button } from '@/components/ui/button';
import { useApplicationDialog } from '@/components/ApplicationDialog';
import { Link } from 'react-router-dom';

const DesktopNav = () => {
  const { openApplicationDialog } = useApplicationDialog();
  
  return (
    <nav className="hidden md:flex items-center gap-6">
      <a href="#about" className="text-sm font-medium hover:text-accent transition-colors">About</a>
      <a href="#licenses" className="text-sm font-medium hover:text-accent transition-colors">Licenses</a>
      <a href="#verification" className="text-sm font-medium hover:text-accent transition-colors">Verification</a>
      <Button variant="outline" size="sm" asChild>
        <Link to="/setup">Setup</Link>
      </Button>
      <Button variant="default" size="sm" onClick={openApplicationDialog}>Apply Now</Button>
    </nav>
  );
};

export default DesktopNav;
