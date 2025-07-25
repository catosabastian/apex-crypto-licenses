import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, LogOut, BarChart3, FileText, Wallet, Mail } from 'lucide-react';
import { useSimpleAuth } from '@/contexts/SimpleAuthContext';
import { useNavigate } from 'react-router-dom';
import { supabaseDataManager } from '@/utils/supabaseDataManager';
import SupabaseApplicationsManager from '@/components/admin/SupabaseApplicationsManager';
import { PaymentAddressManager } from '@/components/admin/PaymentAddressManager';
import WebsiteSettingsManager from '@/components/admin/WebsiteSettingsManager';
import LicenseManager from '@/components/admin/LicenseManager';
import LicenseCategoriesManager from '@/components/admin/LicenseCategoriesManager';
import EmailJSManager from '@/components/admin/EmailJSManager';
import SEOManager from '@/components/admin/SEOManager';
import SupabaseManager from '@/components/admin/SupabaseManager';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [analytics, setAnalytics] = useState({ totalApplications: 0, pendingApplications: 0, approvedApplications: 0, activeLicenses: 0, totalRevenue: 0, newContacts: 0 });
  const { logout } = useSimpleAuth();
  const navigate = useNavigate();

  // Load analytics data from Supabase
  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const analyticsData = await supabaseDataManager.getAnalytics();
        setAnalytics(analyticsData);
      } catch (error) {
        // Error loading analytics handled silently
      }
    };
    
    loadAnalytics();
  }, [activeTab]);


  const handleLogout = async () => {
    logout();
    navigate('/admin-login');
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
            Comprehensive business management system
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-9 text-xs">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="licenses">Licenses</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="website">Website</TabsTrigger>
          <TabsTrigger value="emailjs">EmailJS</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="supabase">Supabase</TabsTrigger>
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
          <SupabaseApplicationsManager />
        </TabsContent>

        <TabsContent value="licenses" className="space-y-6">
          <LicenseManager />
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <LicenseCategoriesManager />
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <PaymentAddressManager />
        </TabsContent>

        <TabsContent value="website" className="space-y-6">
          <WebsiteSettingsManager />
        </TabsContent>

        <TabsContent value="emailjs" className="space-y-6">
          <EmailJSManager />
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <SEOManager />
        </TabsContent>

        <TabsContent value="supabase" className="space-y-6">
          <SupabaseManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
