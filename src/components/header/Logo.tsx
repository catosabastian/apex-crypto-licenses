
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img 
        src="/lovable-uploads/b2cc4e8d-8018-486d-b638-bdf6fd39a656.png" 
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
