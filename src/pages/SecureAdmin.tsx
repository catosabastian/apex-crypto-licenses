
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Users, FileText, Award, Settings, Shield, Activity } from 'lucide-react';
import { useSecureAuth } from '@/contexts/SecureAuthContext';
import { unifiedDataManager } from '@/utils/unifiedDataManager';
import { UnifiedSettingsManager } from '@/components/admin/UnifiedSettingsManager';
import { ApplicationsManager } from '@/components/admin/ApplicationsManager';
import { ContactsManager } from '@/components/admin/ContactsManager';
import { LicenseManager } from '@/components/admin/LicenseManager';

const SecureAdmin = () => {
  const { logout } = useSecureAuth();
  const [analytics, setAnalytics] = useState(unifiedDataManager.getAnalytics());

  useEffect(() => {
    // Update analytics when data changes
    const updateAnalytics = () => {
      setAnalytics(unifiedDataManager.getAnalytics());
    };

    unifiedDataManager.addEventListener('applications_updated', updateAnalytics);
    unifiedDataManager.addEventListener('contacts_updated', updateAnalytics);
    unifiedDataManager.addEventListener('licenses_updated', updateAnalytics);

    return () => {
      unifiedDataManager.removeEventListener('applications_updated', updateAnalytics);
      unifiedDataManager.removeEventListener('contacts_updated', updateAnalytics);
      unifiedDataManager.removeEventListener('licenses_updated', updateAnalytics);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-purple-400" />
            <div>
              <h1 className="text-3xl font-bold text-white">APEX Admin Panel</h1>
              <p className="text-purple-200">Secure Administrative Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="default" className="bg-green-500 text-white">
              <Activity className="h-4 w-4 mr-1" />
              System Online
            </Badge>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="modern-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalApplications}</div>
              <p className="text-xs text-muted-foreground">
                {analytics.pendingApplications} pending
              </p>
            </CardContent>
          </Card>

          <Card className="modern-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Licenses</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.activeLicenses}</div>
              <p className="text-xs text-muted-foreground">
                Currently active
              </p>
            </CardContent>
          </Card>

          <Card className="modern-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Contacts</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.newContacts}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting response
              </p>
            </CardContent>
          </Card>

          <Card className="modern-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${analytics.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                From approved applications
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="settings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="licenses">Licenses</TabsTrigger>
          </TabsList>

          <TabsContent value="settings">
            <UnifiedSettingsManager />
          </TabsContent>

          <TabsContent value="applications">
            <ApplicationsManager />
          </TabsContent>

          <TabsContent value="contacts">
            <ContactsManager />
          </TabsContent>

          <TabsContent value="licenses">
            <LicenseManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SecureAdmin;
