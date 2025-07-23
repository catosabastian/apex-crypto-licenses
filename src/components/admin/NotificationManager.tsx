
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  AlertTriangle,
  CheckCircle,
  Settings,
  Send
} from 'lucide-react';

interface NotificationSettings {
  emailNotifications: boolean;
  newApplications: boolean;
  newContacts: boolean;
  licenseExpiry: boolean;
  systemAlerts: boolean;
  emailAddress: string;
}

export const NotificationManager: React.FC = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    newApplications: true,
    newContacts: true,
    licenseExpiry: true,
    systemAlerts: false,
    emailAddress: 'admin@example.com'
  });

  const [testMessage, setTestMessage] = useState({
    subject: 'Test Notification',
    message: 'This is a test notification from the admin panel.'
  });

  const [sending, setSending] = useState(false);

  const updateSetting = (key: keyof NotificationSettings, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveSettings = async () => {
    try {
      // In a real implementation, save to database
      toast.success('Notification settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    }
  };

  const sendTestNotification = async () => {
    setSending(true);
    try {
      // In a real implementation, send actual notification
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Test notification sent successfully');
      setTestMessage({
        subject: 'Test Notification',
        message: 'This is a test notification from the admin panel.'
      });
    } catch (error) {
      toast.error('Failed to send test notification');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Notification Management</h2>
          <p className="text-muted-foreground">Configure system notifications and alerts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="email">Admin Email Address</Label>
              <Input
                id="email"
                type="email"
                value={settings.emailAddress}
                onChange={(e) => updateSetting('emailAddress', e.target.value)}
                placeholder="admin@example.com"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable email notifications for admin events
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Applications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when new applications are submitted
                  </p>
                </div>
                <Switch
                  checked={settings.newApplications}
                  onCheckedChange={(checked) => updateSetting('newApplications', checked)}
                  disabled={!settings.emailNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Contact Messages</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when new contact messages arrive
                  </p>
                </div>
                <Switch
                  checked={settings.newContacts}
                  onCheckedChange={(checked) => updateSetting('newContacts', checked)}
                  disabled={!settings.emailNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>License Expiry Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when licenses are about to expire
                  </p>
                </div>
                <Switch
                  checked={settings.licenseExpiry}
                  onCheckedChange={(checked) => updateSetting('licenseExpiry', checked)}
                  disabled={!settings.emailNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>System Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about system errors and warnings
                  </p>
                </div>
                <Switch
                  checked={settings.systemAlerts}
                  onCheckedChange={(checked) => updateSetting('systemAlerts', checked)}
                  disabled={!settings.emailNotifications}
                />
              </div>
            </div>

            <Button onClick={saveSettings} className="w-full">
              Save Settings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Test Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={testMessage.subject}
                onChange={(e) => setTestMessage(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Test notification subject"
              />
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={testMessage.message}
                onChange={(e) => setTestMessage(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Test notification message"
                rows={4}
              />
            </div>

            <Button 
              onClick={sendTestNotification} 
              disabled={sending || !settings.emailNotifications}
              className="w-full"
            >
              {sending ? 'Sending...' : 'Send Test Notification'}
            </Button>

            {!settings.emailNotifications && (
              <p className="text-sm text-muted-foreground">
                Enable email notifications to send test messages
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Recent Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Mock notification history */}
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <Mail className="h-5 w-5 text-blue-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">New application received</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <Badge variant="secondary">Email</Badge>
            </div>

            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <MessageSquare className="h-5 w-5 text-green-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">New contact message</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
              <Badge variant="secondary">Email</Badge>
            </div>

            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">License expiry reminder</p>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
              <Badge variant="outline">System</Badge>
            </div>

            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Test notification sent</p>
                <p className="text-xs text-muted-foreground">1 week ago</p>
              </div>
              <Badge variant="secondary">Test</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationManager;
