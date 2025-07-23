
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ApplicationsManager } from '@/components/admin/ApplicationsManager';
import { ContactsManager } from '@/components/admin/ContactsManager';
import { LicenseManager } from '@/components/admin/LicenseManager';
import { SettingsManager } from '@/components/admin/SettingsManager';
import { PaymentAddressManager } from '@/components/admin/PaymentAddressManager';
import { DynamicContentManager } from '@/components/admin/DynamicContentManager';
import WebsiteSettingsManager from '@/components/admin/WebsiteSettingsManager';
import SEOSettingsManager from '@/components/admin/SEOSettingsManager';
import PlanValidityManager from '@/components/admin/PlanValidityManager';
import AuditLogViewer from '@/components/admin/AuditLogViewer';
import { ContactSettingsManager } from '@/components/admin/ContactSettingsManager';
import EmailJSManager from '@/components/admin/EmailJSManager';
import { LogOut, Shield } from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('applications');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Admin Panel</h1>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10">
            <TabsTrigger value="applications">Apps</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="licenses">Licenses</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="website">Website</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="emailjs">EmailJS</TabsTrigger>
            <TabsTrigger value="audit">Audit</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-6">
            <ApplicationsManager />
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <ContactsManager />
          </TabsContent>

          <TabsContent value="licenses" className="space-y-6">
            <LicenseManager />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <SettingsManager />
            <ContactSettingsManager />
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <PaymentAddressManager />
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <DynamicContentManager />
          </TabsContent>

          <TabsContent value="website" className="space-y-6">
            <WebsiteSettingsManager />
            <PlanValidityManager />
          </TabsContent>

          <TabsContent value="seo" className="space-y-6">
            <SEOSettingsManager />
          </TabsContent>

          <TabsContent value="emailjs" className="space-y-6">
            <EmailJSManager />
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <AuditLogViewer />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
