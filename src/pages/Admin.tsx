
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
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

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Login Successful",
        description: "Welcome back, admin!",
      });
      
      // Refresh to update auth state
      setTimeout(() => window.location.reload(), 1000);
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>
            Enter your admin credentials to access the admin panel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter admin email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter admin password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const AdminSetup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCreateFirstAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // First, create the user account
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`
        }
      });

      if (signUpError) {
        throw signUpError;
      }

      if (signUpData.user) {
        // Now make them admin using the create first admin function
        const { data, error: adminError } = await supabase.rpc('create_first_admin');

        if (adminError) {
          throw adminError;
        }

        if (data) {
          toast({
            title: "Admin Created Successfully",
            description: "You can now access the admin panel. Please check your email to verify your account.",
          });
          // Refresh the page to update authentication state
          setTimeout(() => window.location.reload(), 2000);
        } else {
          throw new Error("Failed to create admin user");
        }
      }
    } catch (error: any) {
      toast({
        title: "Error Creating Admin",
        description: error.message || "Failed to create admin user",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Setup Required</CardTitle>
          <CardDescription>
            No admin users found. Create the first admin account to access the admin panel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateFirstAdmin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Admin Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter a secure password"
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create First Admin
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
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
            <PaymentAddressManager />
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

const Admin = () => {
  const [hasAdminUsers, setHasAdminUsers] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, isAdmin } = useSupabaseAuth();

  useEffect(() => {
    const checkAdminUsers = async () => {
      try {
        console.log('[Admin] Checking admin users...');
        
        // Add timeout to prevent infinite loading
        const timeoutId = setTimeout(() => {
          console.log('[Admin] Timeout reached, setting hasAdminUsers to true');
          setHasAdminUsers(true);
          setIsLoading(false);
        }, 5000);
        
        const { data, error } = await supabase.rpc('has_admin_users');
        clearTimeout(timeoutId);
        
        if (error) {
          console.error('Error checking admin users:', error);
          setHasAdminUsers(false);
        } else {
          console.log('[Admin] Admin users check result:', data);
          setHasAdminUsers(data);
        }
      } catch (error) {
        console.error('Error checking admin users:', error);
        setHasAdminUsers(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminUsers();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // If no admin users exist, show setup
  if (!hasAdminUsers) {
    return <AdminSetup />;
  }

  // If user is not authenticated, show a login form instead of setup
  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  // If user is authenticated but not admin, show setup to become admin
  if (!isAdmin) {
    return <AdminSetup />;
  }

  // Show admin panel
  return <AdminPanel />;
};

export default Admin;
