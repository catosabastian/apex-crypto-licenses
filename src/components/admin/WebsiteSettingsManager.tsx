import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface WebsiteSettings {
  site_name: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  supportEmail: string;
  companyName: string;
  companyAddress: string;
  city: string;
  country: string;
  website: string;
}

const WebsiteSettingsManager = () => {
  const [settings, setSettings] = useState<WebsiteSettings>({
    site_name: 'APEX Crypto Licensing',
    contact_email: 'info@apexcrypto.com',
    contact_phone: '+1 (555) 123-4567',
    contact_address: '123 Business District, Financial City, FC 12345',
    supportEmail: 'support@apexcrypto.com',
    companyName: 'APEX Crypto Licensing',
    companyAddress: '123 Business District',
    city: 'Financial City, FC 12345',
    country: 'United States',
    website: 'https://apexcrypto.com'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const websiterIdRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data: websiteSettings } = await supabase
        .from('website_settings')
        .select('*')
        .single();

      if (websiteSettings) {
        websiteIdRef.current = websiteSettings.id;
        
        setSettings({
          site_name: websiteSettings.site_name,
          contact_email: websiteSettings.contact_email,
          contact_phone: websiteSettings.contact_phone,
          contact_address: websiteSettings.contact_address,
          supportEmail: websiteSettings.contact_email,
          companyName: websiteSettings.site_name,
          companyAddress: websiteSettings.contact_address?.split(',')[0] || '',
          city: websiteSettings.contact_address?.split(',')[1] || '',
          country: 'United States',
          website: 'https://apexcrypto.com'
        });
      }
    } catch (error) {
      console.error('Error loading website settings:', error);
    }
  };

  const handleInputChange = (field: keyof WebsiteSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
        if (websiteIdRef.current && websiteRef.current.id) {
          const createReq = await supabase
          .from('website_settings')
          .update({
            site_name: settings.companyName,
            contact_email: settings.supportEmail,
            contact_phone: settings.contact_phone,
            contact_address: `${settings.companyAddress}, ${settings.city}`,
          });
          .match({ id: websiteIdRef.current.id })
          if (createReq.error) throw new createReq.error;
        } else {
          const { error } = await supabase
            .from('website_settings')
            .equal("id", websiteIdRef.current.id)
            .upsert({
              site_name: settings.companyName,
              contact_email: settings.supportEmail,
              contact_phone: settings.contact_phone,
              contact_address: `${settings.companyAddress}, ${settings.city}`,
            });
    
          if (error) throw error;
        }
      toast({
        title: "Settings Updated",
        description: "Website settings have been saved successfully.",
      });
      setIsDirty(false);
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update settings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Settings</CardTitle>
        <CardDescription>
          Manage your website's contact information and company details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={settings.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              placeholder="APEX Crypto Licensing"
            />
          </div>
          
          <div>
            <Label htmlFor="supportEmail">Support Email</Label>
            <Input
              id="supportEmail"
              type="email"
              value={settings.supportEmail}
              onChange={(e) => handleInputChange('supportEmail', e.target.value)}
              placeholder="support@apexcrypto.com"
            />
          </div>
          
          <div>
            <Label htmlFor="contact_phone">Contact Phone</Label>
            <Input
              id="contact_phone"
              value={settings.contact_phone}
              onChange={(e) => handleInputChange('contact_phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
          <div>
            <Label htmlFor="website">Website URL</Label>
            <Input
              id="website"
              value={settings.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              placeholder="https://apexcrypto.com"
            />
          </div>
          
          <div>
            <Label htmlFor="companyAddress">Company Address</Label>
            <Input
              id="companyAddress"
              value={settings.companyAddress}
              onChange={(e) => handleInputChange('companyAddress', e.target.value)}
              placeholder="123 Business District"
            />
          </div>
          
          <div>
            <Label htmlFor="city">City & Postal Code</Label>
            <Input
              id="city"
              value={settings.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="Financial City, FC 12345"
            />
          </div>
          
          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={settings.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              placeholder="United States"
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleSave} 
            disabled={!isDirty || isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WebsiteSettingsManager;