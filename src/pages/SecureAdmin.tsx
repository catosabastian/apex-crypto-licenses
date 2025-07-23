
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
import AdminDashboard from '@/components/admin/AdminDashboard';
import UserManager from '@/components/admin/UserManager';
import FileManager from '@/components/admin/FileManager';
import NotificationManager from '@/components/admin/NotificationManager';
import { UnifiedSettingsManager } from '@/components/admin/UnifiedSettingsManager';
import EnhancedContentManager from '@/components/admin/EnhancedContentManager';
import SystemConfigManager from '@/components/admin/SystemConfigManager';
import DataExportManager from '@/components/admin/DataExportManager';
import { LogOut, Shield } from 'lucide-react';

const SecureAdmin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
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
              <h1 className="text-2xl font-bold">Secure Admin Panel</h1>
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
          <TabsList className="grid w-full grid-cols-7 lg:grid-cols-14">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="applications">Apps</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="licenses">Licenses</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="notifications">Alerts</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="website">Website</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
            <TabsTrigger value="audit">Audit</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <AdminDashboard />
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <ApplicationsManager />
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <ContactsManager />
          </TabsContent>

          <TabsContent value="licenses" className="space-y-6">
            <LicenseManager />
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <UserManager />
          </TabsContent>

          <TabsContent value="files" className="space-y-6">
            <FileManager />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <NotificationManager />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <UnifiedSettingsManager />
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Tabs defaultValue="enhanced" className="w-full">
              <TabsList>
                <TabsTrigger value="enhanced">Enhanced Editor</TabsTrigger>
                <TabsTrigger value="dynamic">Dynamic Manager</TabsTrigger>
              </TabsList>
              <TabsContent value="enhanced">
                <EnhancedContentManager />
              </TabsContent>
              <TabsContent value="dynamic">
                <DynamicContentManager />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="website" className="space-y-6">
            <WebsiteSettingsManager />
            <PlanValidityManager />
            <ContactSettingsManager />
            <EmailJSManager />
          </TabsContent>

          <TabsContent value="seo" className="space-y-6">
            <SEOSettingsManager />
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <SystemConfigManager />
          </TabsContent>

          <TabsContent value="export" className="space-y-6">
            <DataExportManager />
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <AuditLogViewer />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SecureAdmin;
