import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, LogOut, BarChart3, FileText, Settings, Mail, Globe, Download, RefreshCw, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { useSecureAuth } from '@/contexts/SecureAuthContext';
import { useNavigate } from 'react-router-dom';
import { supabaseDataManager } from '@/utils/supabaseDataManager';
import { ApplicationsManager } from '@/components/admin/ApplicationsManager';
import { ContactsManager } from '@/components/admin/ContactsManager';
import { UnifiedSettingsManager } from '@/components/admin/UnifiedSettingsManager';
import { LicenseManager } from '@/components/admin/LicenseManager';
import { ContentManager } from '@/components/admin/ContentManager';
import { AdminErrorBoundary } from '@/components/admin/AdminErrorBoundary';

const SecureAdmin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [analytics, setAnalytics] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    activeLicenses: 0,
    newContacts: 0,
    totalRevenue: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [systemHealth, setSystemHealth] = useState<{ status: string; issues: string[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { logout, connectionStatus, loading: authLoading } = useSecureAuth();
  const navigate = useNavigate();

  // Update analytics when tab changes
  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const [analyticsData, healthData] = await Promise.all([
          supabaseDataManager.getAnalytics(),
          supabaseDataManager.checkSystemHealth()
        ]);
        
        setAnalytics(analyticsData);
        setSystemHealth(healthData);
      } catch (error) {
        console.error('Error loading analytics:', error);
        setError('Failed to load dashboard data');
        toast({
          title: "Error",
          description: "Failed to load analytics data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading) {
      loadAnalytics();
    }
  }, [activeTab, authLoading]);

  const handleLogout = () => {
    try {
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout Error",
        description: "There was an issue logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const exportData = async () => {
    try {
      const allData = await supabaseDataManager.exportAllData();
      const csvContent = "data:text/csv;charset=utf-8," 
        + "Type,ID,Name,Email,Status,Date,Additional_Info\n" 
        + allData.applications.map(app => `Application,${app.id},${app.name},${app.email},${app.status},${app.created_at},Category: ${app.category}`).join("\n")
        + "\n"
        + allData.contacts.map(contact => `Contact,${contact.id},${contact.name},${contact.email},${contact.status},${contact.created_at},Subject: ${contact.subject || 'None'}`).join("\n")
        + "\n"
        + allData.licenses.map(license => `License,${license.id},${license.holder_name},,${license.status},${license.created_at},License ID: ${license.license_id}`).join("\n");
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `apex_secure_admin_data_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Data Exported!",
        description: "All data exported as CSV",
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export Failed",
        description: "Failed to export data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const refreshData = async () => {
    try {
      const [analyticsData, healthData] = await Promise.all([
        supabaseDataManager.getAnalytics(),
        supabaseDataManager.checkSystemHealth()
      ]);
      
      setAnalytics(analyticsData);
      setSystemHealth(healthData);
      setError(null);
      
      toast({
        title: "Data Refreshed",
        description: "Dashboard data has been updated",
      });
    } catch (error) {
      console.error('Refresh error:', error);
      setError('Failed to refresh data');
      toast({
        title: "Refresh Failed",
        description: "Failed to refresh data. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (authLoading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading admin dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AdminErrorBoundary>
      <div className="container mx-auto py-10 px-4">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Shield className="text-primary" />
              APEX Secure Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Secure business management system with real-time sync
            </p>
            {systemHealth && systemHealth.status !== 'healthy' && (
              <Alert className="mt-2">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  System status: {systemHealth.status}. Issues: {systemHealth.issues.join(', ')}
                </AlertDescription>
              </Alert>
            )}
          </div>
          
          <div className="flex gap-3">
            <Button onClick={refreshData} variant="outline" className="flex items-center gap-2" disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
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

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

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
            
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                <span className="mt-2 block">Loading analytics...</span>
              </div>
            ) : (
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
            )}
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <AdminErrorBoundary>
              <ApplicationsManager />
            </AdminErrorBoundary>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <AdminErrorBoundary>
              <ContactsManager />
            </AdminErrorBoundary>
          </TabsContent>

          <TabsContent value="licenses" className="space-y-6">
            <AdminErrorBoundary>
              <LicenseManager />
            </AdminErrorBoundary>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <AdminErrorBoundary>
              <ContentManager />
            </AdminErrorBoundary>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <AdminErrorBoundary>
              <UnifiedSettingsManager />
            </AdminErrorBoundary>
          </TabsContent>
        </Tabs>
      </div>
    </AdminErrorBoundary>
  );
};

export default SecureAdmin;
