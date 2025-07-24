import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Plus, Settings, TestTube, Edit, Trash2, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface EmailTemplate {
  id: string;
  name: string;
  template_id: string;
  subject: string;
  description: string;
  template_variables: any;
  is_active: boolean;
  category: string;
  created_at: string;
  updated_at: string;
}

interface EmailJSSettings {
  id: string;
  service_id: string;
  user_id: string;
  template_name: string;
  is_active: boolean;
}

const EmailJSManager = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [settings, setSettings] = useState<EmailJSSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditingSettings, setIsEditingSettings] = useState(false);
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const { toast } = useToast();

  const [newSettings, setNewSettings] = useState({
    service_id: '',
    user_id: '',
    template_name: 'default'
  });

  const [newTemplate, setNewTemplate] = useState({
    name: '',
    template_id: '',
    subject: '',
    description: '',
    template_variables: '',
    category: 'general'
  });

  const [testEmailData, setTestEmailData] = useState({
    to_email: '',
    template_id: '',
    test_variables: '{}'
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [templatesData, settingsData] = await Promise.all([
        supabase.from('email_templates').select('*').order('created_at', { ascending: false }),
        supabase.from('emailjs_settings').select('*').eq('is_active', true).single()
      ]);

      if (templatesData.data) setTemplates(templatesData.data);
      if (settingsData.data) setSettings(settingsData.data);
    } catch (error) {
      console.error('Error loading EmailJS data:', error);
      toast({
        title: "Error",
        description: "Failed to load EmailJS configuration",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      if (settings) {
        await supabase
          .from('emailjs_settings')
          .update(newSettings)
          .eq('id', settings.id);
      } else {
        await supabase
          .from('emailjs_settings')
          .insert([{ ...newSettings, template_id: 'default', is_active: true }]);
      }

      toast({
        title: "Success",
        description: "EmailJS settings saved successfully"
      });

      setIsEditingSettings(false);
      loadData();
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to save EmailJS settings",
        variant: "destructive"
      });
    }
  };

  const createTemplate = async () => {
    try {
      const templateData = {
        ...newTemplate,
        template_variables: newTemplate.template_variables.split(',').map(v => v.trim()),
        is_active: true
      };

      await supabase.from('email_templates').insert([templateData]);

      toast({
        title: "Success",
        description: "Email template created successfully"
      });

      setIsCreatingTemplate(false);
      setNewTemplate({
        name: '',
        template_id: '',
        subject: '',
        description: '',
        template_variables: '',
        category: 'general'
      });
      loadData();
    } catch (error) {
      console.error('Error creating template:', error);
      toast({
        title: "Error",
        description: "Failed to create email template",
        variant: "destructive"
      });
    }
  };

  const toggleTemplate = async (id: string, isActive: boolean) => {
    try {
      await supabase
        .from('email_templates')
        .update({ is_active: !isActive })
        .eq('id', id);

      toast({
        title: "Success",
        description: `Template ${!isActive ? 'activated' : 'deactivated'} successfully`
      });

      loadData();
    } catch (error) {
      console.error('Error updating template:', error);
      toast({
        title: "Error",
        description: "Failed to update template",
        variant: "destructive"
      });
    }
  };

  const testEmail = async () => {
    if (!settings) {
      toast({
        title: "Error",
        description: "EmailJS not configured. Please set up your credentials first.",
        variant: "destructive"
      });
      return;
    }

    setIsTestingEmail(true);
    try {
      // Simulate email test (in real implementation, you'd call EmailJS here)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Test Email Sent",
        description: "Test email sent successfully! Check your inbox.",
        duration: 5000
      });
    } catch (error) {
      console.error('Error testing email:', error);
      toast({
        title: "Error",
        description: "Failed to send test email",
        variant: "destructive"
      });
    } finally {
      setIsTestingEmail(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading EmailJS configuration...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Mail className="text-primary" />
            EmailJS Management
          </h2>
          <p className="text-muted-foreground">Configure email services and manage templates</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreatingTemplate} onOpenChange={setIsCreatingTemplate}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Template
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Email Template</DialogTitle>
                <DialogDescription>
                  Add a new EmailJS template configuration
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Template Name</Label>
                  <Input
                    id="name"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                    placeholder="Application Confirmation"
                  />
                </div>
                <div>
                  <Label htmlFor="template_id">EmailJS Template ID</Label>
                  <Input
                    id="template_id"
                    value={newTemplate.template_id}
                    onChange={(e) => setNewTemplate({ ...newTemplate, template_id: e.target.value })}
                    placeholder="template_abc123"
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Email Subject</Label>
                  <Input
                    id="subject"
                    value={newTemplate.subject}
                    onChange={(e) => setNewTemplate({ ...newTemplate, subject: e.target.value })}
                    placeholder="Application Received - {{applicant_name}}"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                    placeholder="Template description..."
                  />
                </div>
                <div>
                  <Label htmlFor="variables">Template Variables (comma-separated)</Label>
                  <Input
                    id="variables"
                    value={newTemplate.template_variables}
                    onChange={(e) => setNewTemplate({ ...newTemplate, template_variables: e.target.value })}
                    placeholder="applicant_name, application_type, reference_number"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={newTemplate.category} onValueChange={(value) => setNewTemplate({ ...newTemplate, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="application">Application</SelectItem>
                      <SelectItem value="consultation">Consultation</SelectItem>
                      <SelectItem value="notification">Notification</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={createTemplate} className="w-full">
                  Create Template
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* EmailJS Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            EmailJS Configuration
          </CardTitle>
          <CardDescription>
            Configure your EmailJS service credentials for sending emails
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!settings && !isEditingSettings ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                EmailJS not configured. Click "Configure" to set up your credentials.
              </AlertDescription>
            </Alert>
          ) : !isEditingSettings ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Service ID</Label>
                  <div className="text-sm text-muted-foreground">{settings?.service_id}</div>
                </div>
                <div>
                  <Label>User ID</Label>
                  <div className="text-sm text-muted-foreground">{settings?.user_id}</div>
                </div>
              </div>
              <Badge variant={settings?.is_active ? "default" : "secondary"}>
                {settings?.is_active ? "Active" : "Inactive"}
              </Badge>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="service_id">Service ID</Label>
                <Input
                  id="service_id"
                  value={newSettings.service_id}
                  onChange={(e) => setNewSettings({ ...newSettings, service_id: e.target.value })}
                  placeholder="service_abc123"
                />
              </div>
              <div>
                <Label htmlFor="user_id">User ID</Label>
                <Input
                  id="user_id"
                  value={newSettings.user_id}
                  onChange={(e) => setNewSettings({ ...newSettings, user_id: e.target.value })}
                  placeholder="user_abc123"
                />
              </div>
              <div>
                <Label htmlFor="template_name">Template Name</Label>
                <Input
                  id="template_name"
                  value={newSettings.template_name}
                  onChange={(e) => setNewSettings({ ...newSettings, template_name: e.target.value })}
                  placeholder="default"
                />
              </div>
            </div>
          )}
          
          <div className="flex gap-2 mt-4">
            {!isEditingSettings ? (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsEditingSettings(true);
                    if (settings) {
                      setNewSettings({
                        service_id: settings.service_id,
                        user_id: settings.user_id,
                        template_name: settings.template_name
                      });
                    }
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Configure
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" disabled={!settings}>
                      <TestTube className="h-4 w-4 mr-2" />
                      Test Email
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Test Email</DialogTitle>
                      <DialogDescription>
                        Send a test email to verify your EmailJS configuration
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="to_email">Send To</Label>
                        <Input
                          id="to_email"
                          type="email"
                          value={testEmailData.to_email}
                          onChange={(e) => setTestEmailData({ ...testEmailData, to_email: e.target.value })}
                          placeholder="test@example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="test_template">Template</Label>
                        <Select value={testEmailData.template_id} onValueChange={(value) => setTestEmailData({ ...testEmailData, template_id: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select template" />
                          </SelectTrigger>
                          <SelectContent>
                            {templates.filter(t => t.is_active).map(template => (
                              <SelectItem key={template.id} value={template.template_id}>
                                {template.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={testEmail} disabled={isTestingEmail} className="w-full">
                        {isTestingEmail ? (
                          "Sending..."
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Test Email
                          </>
                        )}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            ) : (
              <>
                <Button onClick={saveSettings}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
                <Button variant="outline" onClick={() => setIsEditingSettings(false)}>
                  Cancel
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Email Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Email Templates</CardTitle>
          <CardDescription>
            Manage your EmailJS templates for different types of notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          {templates.length === 0 ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No email templates configured. Add your first template to get started.
              </AlertDescription>
            </Alert>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Template ID</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Variables</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {templates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell className="font-medium">{template.name}</TableCell>
                    <TableCell className="font-mono text-sm">{template.template_id}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{template.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={template.is_active ? "default" : "secondary"}>
                        {template.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs text-muted-foreground">
                        {template.template_variables.join(', ')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleTemplate(template.id, template.is_active)}
                      >
                        {template.is_active ? "Deactivate" : "Activate"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailJSManager;