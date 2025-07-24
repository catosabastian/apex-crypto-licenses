
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className="flex items-center gap-2 cursor-pointer" 
      onClick={handleLogoClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleLogoClick()}
    >
      <img 
        src="https://res.cloudinary.com/dxayc3s2a/image/upload/v1753382775/apex-logo_tvrcy6.png"
        alt="APEX Crypto License" 
        className="h-12 w-auto rounded-lg shadow-sm"
      />
      <div>
        <h1 className="text-xl font-bold tracking-tight">APEX</h1>
        <p className="text-xs text-muted-foreground">Crypto Licensing Regulatory</p>
      </div>
    </div>
  );
};

export default Logo;
