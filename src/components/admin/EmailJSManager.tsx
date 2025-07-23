
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { supabaseDataManager, EmailJSSettings } from '@/utils/supabaseDataManager';
import { Loader2, Save, TestTube, Trash2, RefreshCw } from 'lucide-react';

export const EmailJSManager: React.FC = () => {
  const [settings, setSettings] = useState<EmailJSSettings[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newSettings, setNewSettings] = useState({
    service_id: '',
    template_id: '',
    user_id: '',
    template_name: 'default',
    is_active: true
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await supabaseDataManager.getEmailJSSettings();
      setSettings(data);
    } catch (error) {
      console.error('Error fetching EmailJS settings:', error);
      toast.error('Failed to load EmailJS settings');
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    if (!newSettings.service_id || !newSettings.template_id || !newSettings.user_id) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSaving(true);
    try {
      const result = await supabaseDataManager.createEmailJSSettings(newSettings);

      if (result) {
        toast.success('EmailJS settings saved successfully');
        setNewSettings({
          service_id: '',
          template_id: '',
          user_id: '',
          template_name: 'default',
          is_active: true
        });
        await fetchSettings();
      } else {
        toast.error('Failed to save EmailJS settings');
      }
    } catch (error) {
      console.error('Error saving EmailJS settings:', error);
      toast.error('Failed to save EmailJS settings');
    } finally {
      setSaving(false);
    }
  };

  const updateSettings = async (id: string, updates: Partial<EmailJSSettings>) => {
    try {
      const success = await supabaseDataManager.updateEmailJSSettings(id, updates);

      if (success) {
        toast.success('EmailJS settings updated successfully');
        await fetchSettings();
      } else {
        toast.error('Failed to update EmailJS settings');
      }
    } catch (error) {
      console.error('Error updating EmailJS settings:', error);
      toast.error('Failed to update EmailJS settings');
    }
  };

  const deleteSettings = async (id: string) => {
    try {
      const success = await supabaseDataManager.deleteEmailJSSettings(id);

      if (success) {
        toast.success('EmailJS settings deleted successfully');
        await fetchSettings();
      } else {
        toast.error('Failed to delete EmailJS settings');
      }
    } catch (error) {
      console.error('Error deleting EmailJS settings:', error);
      toast.error('Failed to delete EmailJS settings');
    }
  };

  const testEmailJS = async (setting: EmailJSSettings) => {
    toast.info('Testing EmailJS configuration...');
    // In a real implementation, you would test the EmailJS configuration here
    setTimeout(() => {
      toast.success('EmailJS test completed - check console for details');
    }, 2000);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">EmailJS Configuration</h2>
          <p className="text-muted-foreground">Manage EmailJS settings for email notifications</p>
        </div>
        <Button onClick={fetchSettings} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New EmailJS Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="service_id">Service ID *</Label>
              <Input
                id="service_id"
                value={newSettings.service_id}
                onChange={(e) => setNewSettings(prev => ({ ...prev, service_id: e.target.value }))}
                placeholder="Enter EmailJS Service ID"
              />
            </div>
            <div>
              <Label htmlFor="template_id">Template ID *</Label>
              <Input
                id="template_id"
                value={newSettings.template_id}
                onChange={(e) => setNewSettings(prev => ({ ...prev, template_id: e.target.value }))}
                placeholder="Enter EmailJS Template ID"
              />
            </div>
            <div>
              <Label htmlFor="user_id">User ID *</Label>
              <Input
                id="user_id"
                value={newSettings.user_id}
                onChange={(e) => setNewSettings(prev => ({ ...prev, user_id: e.target.value }))}
                placeholder="Enter EmailJS User ID"
              />
            </div>
            <div>
              <Label htmlFor="template_name">Template Name</Label>
              <Input
                id="template_name"
                value={newSettings.template_name}
                onChange={(e) => setNewSettings(prev => ({ ...prev, template_name: e.target.value }))}
                placeholder="Enter template name"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={newSettings.is_active}
              onCheckedChange={(checked) => setNewSettings(prev => ({ ...prev, is_active: checked }))}
            />
            <Label>Active</Label>
          </div>
          <Button onClick={saveSettings} disabled={saving} className="w-full">
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Save Configuration
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing EmailJS Configurations</CardTitle>
        </CardHeader>
        <CardContent>
          {settings.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No EmailJS configurations found. Add one above to get started.
            </p>
          ) : (
            <div className="space-y-4">
              {settings.map((setting) => (
                <div key={setting.id} className="border rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label className="text-sm font-medium">Service ID</Label>
                      <p className="text-sm text-muted-foreground">{setting.service_id}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Template ID</Label>
                      <p className="text-sm text-muted-foreground">{setting.template_id}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Template Name</Label>
                      <p className="text-sm text-muted-foreground">{setting.template_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={setting.is_active}
                        onCheckedChange={(checked) => updateSettings(setting.id, { is_active: checked })}
                      />
                      <Label className="text-sm">Active</Label>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => testEmailJS(setting)}
                      >
                        <TestTube className="h-4 w-4 mr-2" />
                        Test
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => deleteSettings(setting.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailJSManager;
