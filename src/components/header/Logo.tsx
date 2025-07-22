
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

const Logo = () => {
  const navigate = useNavigate();
  const [logoUrl, setLogoUrl] = useState('/lovable-uploads/294fecc6-7027-4dcd-adc8-c71f110e7314.png');

  useEffect(() => {
    const loadLogo = async () => {
      try {
        const settings = await supabaseDataManager.getSettings();
        const currentLogo = settings.websiteLogo;
        if (currentLogo) {
          setLogoUrl(currentLogo);
        }
      } catch (error) {
        console.error('Error loading logo:', error);
        // Keep default logo on error
      }
    };

    loadLogo();
    
    // Listen for logo updates
    const handleSettingsUpdate = () => {
      loadLogo();
    };

    supabaseDataManager.addEventListener('settings_updated', handleSettingsUpdate);
    
    return () => {
      supabaseDataManager.removeEventListener('settings_updated', handleSettingsUpdate);
    };
  }, []);

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
        src={logoUrl} 
        alt="APEX Crypto License" 
        className="h-12 w-auto rounded-lg shadow-sm"
        onError={() => {
          // Fallback to default logo on error
          setLogoUrl('/lovable-uploads/294fecc6-7027-4dcd-adc8-c71f110e7314.png');
        }}
      />
      <div>
        <h1 className="text-xl font-bold tracking-tight">APEX</h1>
        <p className="text-xs text-muted-foreground">Crypto Licensing Regulatory</p>
      </div>
    </div>
  );
};

export default Logo;
