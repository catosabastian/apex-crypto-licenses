import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit, Save, Globe, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { secureDataManager, WebsiteSettings } from '@/utils/secureDataManager';

export const ContactSettingsManager = () => {
  const [settings, setSettings] = useState<WebsiteSettings>(secureDataManager.getSettings());
  const [isEditing, setIsEditing] = useState(false);
  const [tempSettings, setTempSettings] = useState<WebsiteSettings>(settings);

  const contactFields = [
    { key: 'companyName', label: 'Company Name', icon: Globe, type: 'text' },
    { key: 'supportEmail', label: 'Support Email', icon: Mail, type: 'email' },
    { key: 'salesEmail', label: 'Sales Email', icon: Mail, type: 'email' },
    { key: 'phoneNumber', label: 'Phone Number', icon: Phone, type: 'tel' },
    { key: 'address', label: 'Address', icon: MapPin, type: 'text' },
    { key: 'city', label: 'City', icon: MapPin, type: 'text' },
    { key: 'country', label: 'Country', icon: Globe, type: 'text' },
    { key: 'website', label: 'Website', icon: Globe, type: 'url' }
  ];

  const handleSaveSettings = () => {
    const updatedSettings = secureDataManager.updateSettings(tempSettings);
    setSettings(updatedSettings);
    setIsEditing(false);
    toast({
      title: "Contact Settings Updated",
      description: "Website contact information has been updated successfully",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Contact Information
          </CardTitle>
          <CardDescription>Manage website contact details and company information</CardDescription>
        </div>
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
                Update company and contact details displayed on the website
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              {contactFields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label htmlFor={field.key} className="flex items-center gap-2">
                    <field.icon className="h-4 w-4" />
                    {field.label}
                  </Label>
                  <Input
                    id={field.key}
                    type={field.type}
                    value={tempSettings[field.key as keyof WebsiteSettings] as string}
                    onChange={(e) => setTempSettings(prev => ({
                      ...prev,
                      [field.key]: e.target.value
                    }))}
                    placeholder={field.label}
                  />
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-4">
        {contactFields.map((field) => (
          <div key={field.key} className="flex items-center justify-between p-4 border rounded-lg modern-card">
            <div className="flex items-center gap-3">
              <field.icon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{field.label}</p>
                <p className="text-sm text-muted-foreground">
                  {settings[field.key as keyof WebsiteSettings] as string}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
