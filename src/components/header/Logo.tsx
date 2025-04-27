
import React from 'react';

const Logo = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className="flex items-center gap-2 cursor-pointer" 
      onClick={scrollToTop}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && scrollToTop()}
    >
      <img 
        src="/lovable-uploads/02d8cd79-362f-4ede-b81f-5fef233fbf32.png" 
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
