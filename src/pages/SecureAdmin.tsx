
import { useState, useEffect } from 'react';
import { validLicenses, generateLicenseId } from '@/utils/licenseData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Copy, Search, Download, Filter, LogOut, BarChart3, FileText, Settings, Mail, Globe, Layers, AlertTriangle, Activity } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useSecureAuth } from '@/contexts/SecureAuthContext';
import { useNavigate } from 'react-router-dom';
import { secureDataManager } from '@/utils/secureDataManager';
import { ApplicationsManager } from '@/components/admin/ApplicationsManager';
import { ContactsManager } from '@/components/admin/ContactsManager';
import { SettingsManager } from '@/components/admin/SettingsManager';
import { LicenseManager } from '@/components/admin/LicenseManager';
import { ContentManager } from '@/components/admin/ContentManager';
import { ConnectionStatus } from '@/components/ConnectionStatus';
import { Alert, AlertDescription } from '@/components/ui/alert';

const SecureAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [analytics, setAnalytics] = useState(secureDataManager.getAnalytics());
  const [securityEvents, setSecurityEvents] = useState(secureDataManager.getSecurityEvents());
  const { logout, sessionInfo, connectionStatus } = useSecureAuth();
  const navigate = useNavigate();

  // Real-time updates with enhanced error handling
  useEffect(() => {
    const updateAnalytics = () => {
      try {
        setAnalytics(secureDataManager.getAnalytics());
        setSecurityEvents(secureDataManager.getSecurityEvents());
      } catch (error) {
        console.error('Failed to update analytics:', error);
        toast({
          title: "Update Failed",
          description: "Failed to refresh analytics data",
          variant: "destructive",
        });
      }
    };

    updateAnalytics();

    // Enhanced event listeners
    const handleDataUpdate = () => updateAnalytics();
    const handleSettingsUpdate = () => {
      updateAnalytics();
      toast({
        title: "Settings Updated",
        description: "Changes have been applied across the system",
      });
    };

    secureDataManager.addEventListener('applications_updated', handleDataUpdate);
    secureDataManager.addEventListener('contacts_updated', handleDataUpdate);
    secureDataManager.addEventListener('licenses_updated', handleDataUpdate);
    secureDataManager.addEventListener('settings_updated', handleSettingsUpdate);
    secureDataManager.addEventListener('settings_force_update', handleSettingsUpdate);

    // Activity tracking
    const activityInterval = setInterval(() => {
      secureDataManager.updateSessionActivity();
    }, 60000);

    return () => {
      secureDataManager.removeEventListener('applications_updated', handleDataUpdate);
      secureDataManager.removeEventListener('contacts_updated', handleDataUpdate);
      secureDataManager.removeEventListener('licenses_updated', handleDataUpdate);
      secureDataManager.removeEventListener('settings_updated', handleSettingsUpdate);
      secureDataManager.removeEventListener('settings_force_update', handleSettingsUpdate);
      clearInterval(activityInterval);
    };
  }, [activeTab]);

  // Copy license ID to clipboard
  const handleCopy = (licenseId: string) => {
    navigator.clipboard.writeText(licenseId)
      .then(() => {
        toast({
          title: "Copied!",
          description: `License ID ${licenseId} copied to clipboard`,
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to copy to clipboard",
          variant: "destructive",
        });
      });
  };
  
  // Extract tier from license ID
  const getLicenseTier = (licenseId: string): number => {
    const tierMatch = licenseId.match(/T(\d)/);
    return tierMatch ? parseInt(tierMatch[1], 10) : 0;
  };
  
  // Filter licenses based on search term and tier filter
  const filteredLicenses = validLicenses.filter(license => {
    const matchesSearch = searchTerm === '' || license.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = filterTier === null || getLicenseTier(license) === filterTier;
    return matchesSearch && matchesTier;
  });
  
  // Generate CSV of licenses with security logging
  const exportCsv = () => {
    try {
      const csvContent = "data:text/csv;charset=utf-8," 
        + "License ID,Tier\n" 
        + validLicenses.map(license => `${license},${getLicenseTier(license)}`).join("\n");
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "apex_crypto_licenses.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      secureDataManager.logSecurityEvent('data_change', 'License data exported');
      toast({
        title: "Exported!",
        description: "Licenses exported as CSV",
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Export Failed",
        description: "Failed to export data",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Get recent security alerts
  const recentSecurityAlerts = securityEvents
    .filter(event => event.type === 'security_alert' || event.type === 'failed_login')
    .slice(-5);

  return (
    <div className="container mx-auto py-10 px-4">
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Shield className="text-primary" />
              APEX Secure Admin Dashboard
            </h1>
            <ConnectionStatus />
          </div>
          <p className="text-muted-foreground">
            Comprehensive business management system with enhanced security
          </p>
          {sessionInfo && (
            <p className="text-xs text-muted-foreground mt-1">
              Session: {sessionInfo.id.slice(0, 8)}... | Active since: {new Date(sessionInfo.loginTime).toLocaleTimeString()}
            </p>
          )}
        </div>
        
        <div className="flex gap-3">
          <Button onClick={exportCsv} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Security Alerts */}
      {recentSecurityAlerts.length > 0 && (
        <Alert className="mb-6 border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            {recentSecurityAlerts.length} recent security events detected. 
            Check the Security tab for details.
          </AlertDescription>
        </Alert>
      )}

      {/* Connection Status Alert */}
      {connectionStatus !== 'connected' && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            Connection issues detected. Some features may not work properly.
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="licenses" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Licenses
          </TabsTrigger>
          <TabsTrigger value="applications" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Applications
          </TabsTrigger>
          <TabsTrigger value="contacts" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Contacts
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="legacy" className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            Legacy
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
                <CardTitle className="text-sm font-medium">Security Events</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.securityEvents}</div>
                <p className="text-xs text-muted-foreground">
                  {recentSecurityAlerts.length} recent alerts
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Security Dashboard</h2>
            <Badge variant="outline" className="text-xs">
              {securityEvents.length} Total Events
            </Badge>
          </div>
          
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Security Events</CardTitle>
                <CardDescription>Last 20 security-related activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {securityEvents.slice(-20).reverse().map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="text-sm font-medium">
                          {event.type.replace('_', ' ').toUpperCase()}
                        </p>
                        <p className="text-xs text-muted-foreground">{event.details}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          {new Date(event.timestamp).toLocaleString()}
                        </p>
                        {event.ipAddress && (
                          <p className="text-xs text-muted-foreground">{event.ipAddress}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="licenses" className="space-y-6">
          <LicenseManager />
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <ApplicationsManager />
        </TabsContent>

        <TabsContent value="contacts" className="space-y-6">
          <ContactsManager />
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <ContentManager />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <SettingsManager />
        </TabsContent>

        <TabsContent value="legacy" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search licenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm whitespace-nowrap">Filter by tier:</span>
              {[1, 2, 3].map((tier) => (
                <Button
                  key={tier}
                  variant={filterTier === tier ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterTier(filterTier === tier ? null : tier)}
                  className="min-w-[40px]"
                >
                  {tier}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableCaption>
                Showing {filteredLicenses.length} of {validLicenses.length} total licenses
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>License ID</TableHead>
                  <TableHead className="w-[100px]">Tier</TableHead>
                  <TableHead className="text-right w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLicenses.map((license, index) => (
                  <TableRow key={license}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{license}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        getLicenseTier(license) === 1 ? 'bg-blue-100 text-blue-800' : 
                        getLicenseTier(license) === 2 ? 'bg-purple-100 text-purple-800' : 
                        'bg-amber-100 text-amber-800'
                      }`}>
                        Tier {getLicenseTier(license)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleCopy(license)}
                        title="Copy license ID"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecureAdmin;
