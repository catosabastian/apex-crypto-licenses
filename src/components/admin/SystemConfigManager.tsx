import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { 
  Settings, 
  Save, 
  RefreshCw, 
  Shield, 
  Globe, 
  Bell,
  Database,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface SystemConfig {
  maintenance_mode: boolean;
  feature_flags: Record<string, boolean>;
  api_rate_limits: {
    requests_per_minute: number;
    requests_per_hour: number;
    max_concurrent_requests: number;
  };
  security_settings: {
    session_timeout_minutes: number;
    max_login_attempts: number;
    password_reset_expiry_hours: number;
  };
  system_info: {
    version: string;
    last_backup: string;
    database_status: string;
  };
  notifications: {
    admin_alerts: boolean;
    new_application_alerts: boolean;
    system_health_alerts: boolean;
    email_notifications: boolean;
  };
}

export const SystemConfigManager: React.FC = () => {
  const [config, setConfig] = useState<SystemConfig>({
    maintenance_mode: false,
    feature_flags: {
      new_user_registration: true,
      license_verification: true,
      payment_processing: true,
      file_uploads: true,
      email_notifications: true,
    },
    api_rate_limits: {
      requests_per_minute: 60,
      requests_per_hour: 1000,
      max_concurrent_requests: 10,
    },
    security_settings: {
      session_timeout_minutes: 60,
      max_login_attempts: 5,
      password_reset_expiry_hours: 24,
    },
    system_info: {
      version: '1.0.0',
      last_backup: 'Never',
      database_status: 'Healthy',
    },
    notifications: {
      admin_alerts: true,
      new_application_alerts: true,
      system_health_alerts: true,
      email_notifications: true,
    },
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSystemConfig();
  }, []);

  const loadSystemConfig = async () => {
    try {
      setLoading(true);
      
      // Load system configuration from settings table
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .eq('category', 'system');

      if (error) {
        console.error('Error loading system config:', error);
        toast.error('Failed to load system configuration');
        return;
      }

      // Convert settings array to config object
      if (data && data.length > 0) {
        const configData = data.reduce((acc, setting) => {
          acc[setting.key] = setting.value;
          return acc;
        }, {} as any);

        setConfig(prevConfig => ({
          ...prevConfig,
          ...configData,
        }));
      }
    } catch (error) {
      console.error('Error loading system config:', error);
      toast.error('Failed to load system configuration');
    } finally {
      setLoading(false);
    }
  };

  const saveSystemConfig = async () => {
    try {
      setSaving(true);

      // Convert config object to settings format
      const settingsToSave = Object.entries(config).map(([key, value]) => ({
        key,
        value,
        category: 'system',
        description: `System configuration: ${key}`,
      }));

      // Delete existing system settings
      await supabase
        .from('settings')
        .delete()
        .eq('category', 'system');

      // Insert new settings
      const { error } = await supabase
        .from('settings')
        .insert(settingsToSave);

      if (error) {
        console.error('Error saving system config:', error);
        toast.error('Failed to save system configuration');
        return;
      }

      toast.success('System configuration saved successfully');
    } catch (error) {
      console.error('Error saving system config:', error);
      toast.error('Failed to save system configuration');
    } finally {
      setSaving(false);
    }
  };

  const handleFeatureFlagChange = (flag: string, enabled: boolean) => {
    setConfig(prev => ({
      ...prev,
      feature_flags: {
        ...prev.feature_flags,
        [flag]: enabled,
      },
    }));
  };

  const handleNotificationChange = (setting: string, enabled: boolean) => {
    setConfig(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [setting]: enabled,
      },
    }));
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
        <p className="text-muted-foreground">Loading system configuration...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">System Configuration</h2>
          <p className="text-muted-foreground">Manage global system settings and features</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={loadSystemConfig} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={saveSystemConfig} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Configuration'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              System Status
            </CardTitle>
            <CardDescription>Current system health and information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>System Version</Label>
              <Badge variant="outline">{config.system_info.version}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <Label>Database Status</Label>
              <Badge variant={config.system_info.database_status === 'Healthy' ? 'default' : 'destructive'}>
                <CheckCircle className="h-3 w-3 mr-1" />
                {config.system_info.database_status}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <Label>Last Backup</Label>
              <span className="text-sm text-muted-foreground">{config.system_info.last_backup}</span>
            </div>
            <div className="flex justify-between items-center">
              <Label>Maintenance Mode</Label>
              <Switch
                checked={config.maintenance_mode}
                onCheckedChange={(checked) => setConfig(prev => ({ ...prev, maintenance_mode: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Feature Flags */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Feature Flags
            </CardTitle>
            <CardDescription>Enable or disable application features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(config.feature_flags).map(([flag, enabled]) => (
              <div key={flag} className="flex justify-between items-center">
                <Label className="capitalize">{flag.replace(/_/g, ' ')}</Label>
                <Switch
                  checked={enabled}
                  onCheckedChange={(checked) => handleFeatureFlagChange(flag, checked)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Settings
            </CardTitle>
            <CardDescription>Configure security parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Input
                id="session-timeout"
                type="number"
                value={config.security_settings.session_timeout_minutes}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  security_settings: {
                    ...prev.security_settings,
                    session_timeout_minutes: parseInt(e.target.value) || 60,
                  },
                }))}
              />
            </div>
            <div>
              <Label htmlFor="max-attempts">Max Login Attempts</Label>
              <Input
                id="max-attempts"
                type="number"
                value={config.security_settings.max_login_attempts}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  security_settings: {
                    ...prev.security_settings,
                    max_login_attempts: parseInt(e.target.value) || 5,
                  },
                }))}
              />
            </div>
            <div>
              <Label htmlFor="reset-expiry">Password Reset Expiry (hours)</Label>
              <Input
                id="reset-expiry"
                type="number"
                value={config.security_settings.password_reset_expiry_hours}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  security_settings: {
                    ...prev.security_settings,
                    password_reset_expiry_hours: parseInt(e.target.value) || 24,
                  },
                }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* API Rate Limits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              API Rate Limits
            </CardTitle>
            <CardDescription>Configure API usage limits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="rpm">Requests per Minute</Label>
              <Input
                id="rpm"
                type="number"
                value={config.api_rate_limits.requests_per_minute}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  api_rate_limits: {
                    ...prev.api_rate_limits,
                    requests_per_minute: parseInt(e.target.value) || 60,
                  },
                }))}
              />
            </div>
            <div>
              <Label htmlFor="rph">Requests per Hour</Label>
              <Input
                id="rph"
                type="number"
                value={config.api_rate_limits.requests_per_hour}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  api_rate_limits: {
                    ...prev.api_rate_limits,
                    requests_per_hour: parseInt(e.target.value) || 1000,
                  },
                }))}
              />
            </div>
            <div>
              <Label htmlFor="concurrent">Max Concurrent Requests</Label>
              <Input
                id="concurrent"
                type="number"
                value={config.api_rate_limits.max_concurrent_requests}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  api_rate_limits: {
                    ...prev.api_rate_limits,
                    max_concurrent_requests: parseInt(e.target.value) || 10,
                  },
                }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>Configure system notification preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(config.notifications).map(([setting, enabled]) => (
                <div key={setting} className="flex flex-col space-y-2">
                  <Label className="capitalize text-sm">{setting.replace(/_/g, ' ')}</Label>
                  <Switch
                    checked={enabled}
                    onCheckedChange={(checked) => handleNotificationChange(setting, checked)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {config.maintenance_mode && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-orange-800">
              <AlertTriangle className="h-5 w-5" />
              <strong>Maintenance Mode Active</strong>
            </div>
            <p className="text-orange-700 mt-2">
              The system is currently in maintenance mode. New users will see a maintenance page.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SystemConfigManager;