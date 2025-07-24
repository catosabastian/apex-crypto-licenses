
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, LogOut, BarChart3, FileText, Settings, Mail, Globe, Layers, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useSecureAuth } from '@/contexts/SecureAuthContext';
import { useNavigate } from 'react-router-dom';
import { unifiedDataManager } from '@/utils/unifiedDataManager';
import { ApplicationsManager } from '@/components/admin/ApplicationsManager';
import { ContactsManager } from '@/components/admin/ContactsManager';
import UnifiedSettingsManager from '@/components/admin/UnifiedSettingsManager';
import { LicenseManager } from '@/components/admin/LicenseManager';
import { ContentManager } from '@/components/admin/ContentManager';

const SecureAdmin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [analytics, setAnalytics] = useState(unifiedDataManager.getAnalytics());
  const { logout } = useSecureAuth();
  const navigate = useNavigate();

  // Update analytics when tab changes
  useEffect(() => {
    setAnalytics(unifiedDataManager.getAnalytics());
  }, [activeTab]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const exportData = () => {
    const applications = unifiedDataManager.getApplications();
    const contacts = unifiedDataManager.getContacts();
    const licenses = unifiedDataManager.getLicenses();
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Type,ID,Name,Email,Status,Date\n" 
      + applications.map(app => `Application,${app.id},${app.name},${app.email},${app.status},${app.date}`).join("\n")
      + "\n"
      + contacts.map(contact => `Contact,${contact.id},${contact.name},${contact.email},${contact.status},${contact.date}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "apex_admin_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Data Exported!",
      description: "All data exported as CSV",
    });
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="text-primary" />
            APEX Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Unified business management system with real-time sync
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button onClick={exportData} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="applications" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Applications
          </TabsTrigger>
          <TabsTrigger value="contacts" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Contacts
          </TabsTrigger>
          <TabsTrigger value="licenses" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Licenses
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <h2 className="text-2xl font-semibold">Analytics Dashboard</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalApplications}</div>
                <p className="text-xs text-muted-foreground">
                  {analytics.pendingApplications} pending review
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Licenses</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.activeLicenses}</div>
                <p className="text-xs text-muted-foreground">
                  {analytics.approvedApplications} approved this month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${analytics.totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">From approved applications</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Messages</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.newContacts}</div>
                <p className="text-xs text-muted-foreground">Requiring attention</p>
              </CardContent>
            </Card>
          </div>
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

        <TabsContent value="content" className="space-y-6">
          <ContentManager />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <UnifiedSettingsManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecureAdmin;
