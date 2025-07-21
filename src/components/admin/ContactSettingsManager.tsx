
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit, Save, Globe, Mail, Phone, MapPin, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

export const ContactSettingsManager = () => {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [tempSettings, setTempSettings] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const contactFields = [
    { key: 'companyName', label: 'Company Name', icon: Globe, type: 'text', placeholder: 'Enter company name' },
    { key: 'supportEmail', label: 'Support Email', icon: Mail, type: 'email', placeholder: 'support@company.com' },
    { key: 'salesEmail', label: 'Sales Email', icon: Mail, type: 'email', placeholder: 'sales@company.com' },
    { key: 'contactPhone', label: 'Phone Number', icon: Phone, type: 'tel', placeholder: '+1 (555) 123-4567' },
    { key: 'companyAddress', label: 'Address', icon: MapPin, type: 'text', placeholder: '123 Business Ave' },
    { key: 'city', label: 'City', icon: MapPin, type: 'text', placeholder: 'New York, NY 10001' },
    { key: 'country', label: 'Country', icon: Globe, type: 'text', placeholder: 'United States' },
    { key: 'website', label: 'Website', icon: Globe, type: 'url', placeholder: 'https://company.com' }
  ];

  useEffect(() => {
    loadSettings();
    
    // Listen for settings updates
    const handleSettingsUpdate = () => {
      loadSettings();
    };

    supabaseDataManager.addEventListener('settings_updated', handleSettingsUpdate);

    return () => {
      supabaseDataManager.removeEventListener('settings_updated', handleSettingsUpdate);
    };
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      const allSettings = await supabaseDataManager.getSettings();
      setSettings(allSettings);
      setTempSettings(allSettings);
    } catch (error) {
      console.error('Error loading contact settings:', error);
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
      
      // Update each contact field in the database
      for (const field of contactFields) {
        const value = tempSettings[field.key];
        if (value !== undefined) {
          await supabaseDataManager.updateSetting(field.key, value);
        }
      }

      setSettings(tempSettings);
      setIsEditing(false);
      
      toast({
        title: "Contact Settings Updated",
        description: "Website contact information has been updated successfully",
      });
    } catch (error) {
      console.error('Error saving contact settings:', error);
      toast({
        title: "Error",
        description: "Failed to save contact settings",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const validateField = (field: any, value: string) => {
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    }
    if (field.type === 'url' && value) {
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    }
    return true;
  };

  const getFieldError = (field: any, value: string) => {
    if (!validateField(field, value)) {
      if (field.type === 'email') return 'Please enter a valid email address';
      if (field.type === 'url') return 'Please enter a valid URL';
    }
    return null;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            Loading contact settings...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Contact Information
          </CardTitle>
          <CardDescription>
            Manage website contact details and company information displayed in the footer
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={loadSettings}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" onClick={() => setTempSettings(settings)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Contact Info
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Contact Information</DialogTitle>
                <DialogDescription>
                  Update company and contact details displayed on the website footer
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                {contactFields.map((field) => {
                  const value = tempSettings[field.key] || '';
                  const error = getFieldError(field, value);
                  
                  return (
                    <div key={field.key} className="space-y-2">
                      <Label htmlFor={field.key} className="flex items-center gap-2">
                        <field.icon className="h-4 w-4" />
                        {field.label}
                      </Label>
                      <Input
                        id={field.key}
                        type={field.type}
                        value={value}
                        onChange={(e) => setTempSettings(prev => ({
                          ...prev,
                          [field.key]: e.target.value
                        }))}
                        placeholder={field.placeholder}
                        className={error ? 'border-red-500' : ''}
                      />
                      {error && (
                        <p className="text-sm text-red-500">{error}</p>
                      )}
                    </div>
                  );
                })}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveSettings} 
                  disabled={isSaving || contactFields.some(field => getFieldError(field, tempSettings[field.key] || ''))}
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {contactFields.map((field) => (
          <div key={field.key} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <field.icon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{field.label}</p>
                <p className="text-sm text-muted-foreground">
                  {settings[field.key] || <span className="italic">Not set</span>}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
