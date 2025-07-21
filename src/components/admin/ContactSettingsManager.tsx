
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Save, Globe, Mail, Phone, MapPin, Eye, EyeOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

export const ContactSettingsManager = () => {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [tempSettings, setTempSettings] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const contactFields = [
    { key: 'companyName', label: 'Company Name', icon: Globe, type: 'text', category: 'company' },
    { key: 'companyTagline', label: 'Company Tagline', icon: Globe, type: 'text', category: 'company' },
    { key: 'companyDescription', label: 'Company Description', icon: Globe, type: 'textarea', category: 'company' },
    { key: 'supportEmail', label: 'Support Email', icon: Mail, type: 'email', category: 'contact' },
    { key: 'salesEmail', label: 'Sales Email', icon: Mail, type: 'email', category: 'contact' },
    { key: 'phoneNumber', label: 'Phone Number', icon: Phone, type: 'tel', category: 'contact' },
    { key: 'website', label: 'Website', icon: Globe, type: 'url', category: 'contact' },
    { key: 'address', label: 'Street Address', icon: MapPin, type: 'text', category: 'address' },
    { key: 'city', label: 'City & Postal Code', icon: MapPin, type: 'text', category: 'address' },
    { key: 'country', label: 'Country', icon: Globe, type: 'text', category: 'address' }
  ];

  const displayFields = [
    { key: 'showSupportEmail', label: 'Show Support Email', category: 'footer_display' },
    { key: 'showPhoneNumber', label: 'Show Phone Number', category: 'footer_display' },
    { key: 'showAddress', label: 'Show Address', category: 'footer_display' },
    { key: 'showWebsite', label: 'Show Website Link', category: 'footer_display' },
    { key: 'showFooterLinks', label: 'Show Footer Legal Links', category: 'footer_links' }
  ];

  const linkFields = [
    { key: 'privacyPolicyUrl', label: 'Privacy Policy URL', type: 'url', category: 'footer_links' },
    { key: 'termsOfServiceUrl', label: 'Terms of Service URL', type: 'url', category: 'footer_links' },
    { key: 'legalNoticeUrl', label: 'Legal Notice URL', type: 'url', category: 'footer_links' },
    { key: 'copyrightText', label: 'Custom Copyright Text', type: 'text', category: 'footer_display' }
  ];

  useEffect(() => {
    loadSettings();
    
    const handleSettingsUpdate = (data: any) => {
      if (data && typeof data === 'object') {
        setSettings(prev => ({ ...prev, ...data }));
      }
    };

    supabaseDataManager.addEventListener('settings_updated', handleSettingsUpdate);
    
    return () => {
      supabaseDataManager.removeEventListener('settings_updated', handleSettingsUpdate);
    };
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      const loadedSettings = await supabaseDataManager.getSettings();
      setSettings(loadedSettings || {});
      setTempSettings(loadedSettings || {});
    } catch (error) {
      console.error('Error loading settings:', error);
      toast({
        title: "Error",
        description: "Failed to load contact settings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      setIsSaving(true);
      
      // Save each setting individually
      for (const [key, value] of Object.entries(tempSettings)) {
        if (settings[key] !== value) {
          await supabaseDataManager.updateSetting(key, value);
        }
      }
      
      setSettings(tempSettings);
      setIsEditing(false);
      
      toast({
        title: "Contact Settings Updated",
        description: "Website contact information has been updated successfully",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to save contact settings",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="ml-2">Loading contact settings...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact & Footer Information
            </CardTitle>
            <CardDescription>Manage website contact details, company information, and footer settings</CardDescription>
          </div>
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" onClick={() => setTempSettings(settings)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Settings
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Contact & Footer Settings</DialogTitle>
                <DialogDescription>
                  Update company and contact details displayed throughout the website
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-8">
                {/* Company & Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Company & Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {contactFields.map((field) => (
                      <div key={field.key} className="space-y-2">
                        <Label htmlFor={field.key} className="flex items-center gap-2">
                          <field.icon className="h-4 w-4" />
                          {field.label}
                        </Label>
                        {field.type === 'textarea' ? (
                          <Textarea
                            id={field.key}
                            value={tempSettings[field.key] || ''}
                            onChange={(e) => setTempSettings(prev => ({
                              ...prev,
                              [field.key]: e.target.value
                            }))}
                            placeholder={field.label}
                            rows={3}
                          />
                        ) : (
                          <Input
                            id={field.key}
                            type={field.type}
                            value={tempSettings[field.key] || ''}
                            onChange={(e) => setTempSettings(prev => ({
                              ...prev,
                              [field.key]: e.target.value
                            }))}
                            placeholder={field.label}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Display Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Footer Display Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {displayFields.map((field) => (
                      <div key={field.key} className="flex items-center justify-between p-3 border rounded-lg">
                        <Label htmlFor={field.key} className="flex items-center gap-2">
                          {tempSettings[field.key] ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                          {field.label}
                        </Label>
                        <Switch
                          id={field.key}
                          checked={tempSettings[field.key] === true || tempSettings[field.key] === 'true'}
                          onCheckedChange={(checked) => setTempSettings(prev => ({
                            ...prev,
                            [field.key]: checked
                          }))}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Links */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Footer Links & Legal</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {linkFields.map((field) => (
                      <div key={field.key} className="space-y-2">
                        <Label htmlFor={field.key}>{field.label}</Label>
                        <Input
                          id={field.key}
                          type={field.type}
                          value={tempSettings[field.key] || ''}
                          onChange={(e) => setTempSettings(prev => ({
                            ...prev,
                            [field.key]: e.target.value
                          }))}
                          placeholder={field.type === 'url' ? 'https://example.com/page' : field.label}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isSaving}>
                  Cancel
                </Button>
                <Button onClick={handleSaveSettings} disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Company Information Section */}
          <div>
            <h4 className="font-semibold mb-3">Company Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contactFields.filter(f => f.category === 'company').map((field) => (
                <div key={field.key} className="flex items-start gap-3 p-3 border rounded-lg">
                  <field.icon className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium">{field.label}</p>
                    <p className="text-sm text-muted-foreground break-words">
                      {settings[field.key] || 'Not set'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information Section */}
          <div>
            <h4 className="font-semibold mb-3">Contact Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contactFields.filter(f => f.category === 'contact').map((field) => (
                <div key={field.key} className="flex items-center gap-3 p-3 border rounded-lg">
                  <field.icon className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">{field.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {settings[field.key] || 'Not set'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Address Information Section */}
          <div>
            <h4 className="font-semibold mb-3">Address Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contactFields.filter(f => f.category === 'address').map((field) => (
                <div key={field.key} className="flex items-center gap-3 p-3 border rounded-lg">
                  <field.icon className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">{field.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {settings[field.key] || 'Not set'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
