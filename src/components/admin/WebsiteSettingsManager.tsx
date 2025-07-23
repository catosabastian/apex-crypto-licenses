import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, RefreshCw, Globe, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

interface WebsiteSettings {
  id: string;
  site_name: string;
  site_description: string;
  logo_url: string;
  featured_image_url: string | null;
  favicon_url: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string | null;
  social_facebook: string | null;
  social_twitter: string | null;
  social_linkedin: string | null;
  social_instagram: string | null;
  maintenance_mode: boolean;
  announcement_text: string | null;
  announcement_active: boolean;
}

const WebsiteSettingsManager = () => {
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('website_settings')
        .select('*')
        .single();

      if (error) {
        console.error('Error loading website settings:', error);
        toast({
          title: "Error",
          description: "Failed to load website settings",
          variant: "destructive",
        });
      } else {
        setSettings(data);
      }
    } catch (error) {
      console.error('Error loading website settings:', error);
      toast({
        title: "Error",
        description: "Failed to load website settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field: keyof WebsiteSettings, value: any) => {
    if (!settings) return;
    
    setSettings(prev => prev ? { ...prev, [field]: value } : null);
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!settings || !hasChanges) return;

    try {
      setSaving(true);
      const { error } = await supabase
        .from('website_settings')
        .update(settings)
        .eq('id', settings.id);

      if (error) {
        console.error('Error saving website settings:', error);
        toast({
          title: "Error",
          description: "Failed to save website settings",
          variant: "destructive",
        });
      } else {
        setHasChanges(false);
        toast({
          title: "Success",
          description: "Website settings saved successfully",
        });
      }
    } catch (error) {
      console.error('Error saving website settings:', error);
      toast({
        title: "Error",
        description: "Failed to save website settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Website Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!settings) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Website Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-8">
            <p className="text-muted-foreground mb-4">Failed to load website settings</p>
            <Button onClick={loadSettings} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Website Settings
        </CardTitle>
        <CardDescription>
          Manage your website's basic information, branding, and contact details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="site_name">Site Name</Label>
                <Input
                  id="site_name"
                  value={settings.site_name}
                  onChange={(e) => handleFieldChange('site_name', e.target.value)}
                  placeholder="Enter site name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="site_description">Site Description</Label>
                <Textarea
                  id="site_description"
                  value={settings.site_description}
                  onChange={(e) => handleFieldChange('site_description', e.target.value)}
                  placeholder="Enter site description"
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Put the website in maintenance mode
                    </p>
                  </div>
                  <Switch
                    checked={settings.maintenance_mode}
                    onCheckedChange={(checked) => handleFieldChange('maintenance_mode', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Announcement</Label>
                    <p className="text-sm text-muted-foreground">
                      Display announcement banner
                    </p>
                  </div>
                  <Switch
                    checked={settings.announcement_active}
                    onCheckedChange={(checked) => handleFieldChange('announcement_active', checked)}
                  />
                </div>

                {settings.announcement_active && (
                  <div className="space-y-2">
                    <Label htmlFor="announcement_text">Announcement Text</Label>
                    <Textarea
                      id="announcement_text"
                      value={settings.announcement_text || ''}
                      onChange={(e) => handleFieldChange('announcement_text', e.target.value)}
                      placeholder="Enter announcement text"
                      rows={2}
                    />
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="branding" className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="logo_url">Logo URL</Label>
                <Input
                  id="logo_url"
                  value={settings.logo_url}
                  onChange={(e) => handleFieldChange('logo_url', e.target.value)}
                  placeholder="Enter logo URL"
                />
                {settings.logo_url && (
                  <div className="mt-2">
                    <img 
                      src={settings.logo_url} 
                      alt="Logo preview" 
                      className="h-12 w-auto rounded border"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="featured_image_url">Featured Image URL</Label>
                <Input
                  id="featured_image_url"
                  value={settings.featured_image_url || ''}
                  onChange={(e) => handleFieldChange('featured_image_url', e.target.value)}
                  placeholder="Enter featured image URL"
                />
                {settings.featured_image_url && (
                  <div className="mt-2">
                    <img 
                      src={settings.featured_image_url} 
                      alt="Featured image preview" 
                      className="h-24 w-auto rounded border"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="favicon_url">Favicon URL</Label>
                <Input
                  id="favicon_url"
                  value={settings.favicon_url}
                  onChange={(e) => handleFieldChange('favicon_url', e.target.value)}
                  placeholder="Enter favicon URL"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact_email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Contact Email
                </Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={settings.contact_email}
                  onChange={(e) => handleFieldChange('contact_email', e.target.value)}
                  placeholder="Enter contact email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Contact Phone
                </Label>
                <Input
                  id="contact_phone"
                  value={settings.contact_phone}
                  onChange={(e) => handleFieldChange('contact_phone', e.target.value)}
                  placeholder="Enter contact phone"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_address" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Contact Address
                </Label>
                <Textarea
                  id="contact_address"
                  value={settings.contact_address || ''}
                  onChange={(e) => handleFieldChange('contact_address', e.target.value)}
                  placeholder="Enter contact address"
                  rows={3}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="social_facebook" className="flex items-center gap-2">
                  <Facebook className="h-4 w-4" />
                  Facebook URL
                </Label>
                <Input
                  id="social_facebook"
                  value={settings.social_facebook || ''}
                  onChange={(e) => handleFieldChange('social_facebook', e.target.value)}
                  placeholder="Enter Facebook URL"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="social_twitter" className="flex items-center gap-2">
                  <Twitter className="h-4 w-4" />
                  Twitter URL
                </Label>
                <Input
                  id="social_twitter"
                  value={settings.social_twitter || ''}
                  onChange={(e) => handleFieldChange('social_twitter', e.target.value)}
                  placeholder="Enter Twitter URL"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="social_linkedin" className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn URL
                </Label>
                <Input
                  id="social_linkedin"
                  value={settings.social_linkedin || ''}
                  onChange={(e) => handleFieldChange('social_linkedin', e.target.value)}
                  placeholder="Enter LinkedIn URL"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="social_instagram" className="flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  Instagram URL
                </Label>
                <Input
                  id="social_instagram"
                  value={settings.social_instagram || ''}
                  onChange={(e) => handleFieldChange('social_instagram', e.target.value)}
                  placeholder="Enter Instagram URL"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {hasChanges && (
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg mt-6">
            <p className="text-sm text-muted-foreground">
              You have unsaved changes
            </p>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save Changes
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WebsiteSettingsManager;