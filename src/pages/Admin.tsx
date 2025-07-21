
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Copy, Search, Download, Filter, LogOut, BarChart3, FileText, Settings, Mail, Globe, Layers, Wallet } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabaseDataManager } from '@/utils/supabaseDataManager';
import { ApplicationsManager } from '@/components/admin/ApplicationsManager';
import { ContactsManager } from '@/components/admin/ContactsManager';
import { SettingsManager } from '@/components/admin/SettingsManager';
import { LicenseManager } from '@/components/admin/LicenseManager';
import { ContentManager } from '@/components/admin/ContentManager';
import { PaymentAddressManager } from '@/components/admin/PaymentAddressManager';

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [analytics, setAnalytics] = useState({ totalApplications: 0, pendingApplications: 0, activeLicenses: 0, approvedApplications: 0, totalRevenue: 0, newContacts: 0 });
  const [legacyLicenses, setLegacyLicenses] = useState<any[]>([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Load analytics and legacy licenses
  useEffect(() => {
    const loadData = async () => {
      try {
        const applications = await supabaseDataManager.getApplications();
        const licenses = await supabaseDataManager.getLicenses();
        const contacts = await supabaseDataManager.getContacts();
        
        // Calculate analytics from database
        const totalApplications = applications.length;
        const pendingApplications = applications.filter(app => app.status === 'pending').length;
        const activeLicenses = licenses.filter(license => license.status === 'active').length;
        const approvedApplications = applications.filter(app => app.status === 'approved').length;
        const totalRevenue = applications
          .filter(app => app.status === 'approved' && app.amount)
          .reduce((sum, app) => sum + parseFloat(app.amount || '0'), 0);
        const newContacts = contacts.filter(contact => contact.status === 'unread').length;
        
        setAnalytics({
          totalApplications,
          pendingApplications,
          activeLicenses,
          approvedApplications,
          totalRevenue,
          newContacts
        });
        
        // Set legacy licenses for the legacy tab
        setLegacyLicenses(licenses);
      } catch (error) {
        console.error('Error loading admin data:', error);
      }
    };

    loadData();
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
  const filteredLicenses = legacyLicenses.filter(license => {
    const matchesSearch = searchTerm === '' || license.license_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = filterTier === null || getLicenseTier(license.license_id) === filterTier;
    return matchesSearch && matchesTier;
  });
  
  // Generate CSV of licenses
  const exportCsv = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "License ID,Tier,Holder,Type,Status\n" 
      + legacyLicenses.map(license => `${license.license_id},${getLicenseTier(license.license_id)},${license.holder_name},${license.license_type},${license.status}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "apex_crypto_licenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Exported!",
      description: "Licenses exported as CSV",
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
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
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            Payments
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
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

        <TabsContent value="payments" className="space-y-6">
          <PaymentAddressManager />
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
              {[1, 2, 3, 4, 5, 6].map((tier) => (
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
                Showing {filteredLicenses.length} of {legacyLicenses.length} total licenses
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>License ID</TableHead>
                  <TableHead>Holder</TableHead>
                  <TableHead className="w-[100px]">Tier</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLicenses.map((license, index) => (
                  <TableRow key={license.license_id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-mono">{license.license_id}</TableCell>
                    <TableCell>{license.holder_name}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        getLicenseTier(license.license_id) === 1 ? 'bg-blue-100 text-blue-800' : 
                        getLicenseTier(license.license_id) === 2 ? 'bg-purple-100 text-purple-800' : 
                        getLicenseTier(license.license_id) === 3 ? 'bg-amber-100 text-amber-800' :
                        getLicenseTier(license.license_id) === 4 ? 'bg-green-100 text-green-800' :
                        getLicenseTier(license.license_id) === 5 ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        Tier {getLicenseTier(license.license_id)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={license.status === 'active' ? 'default' : 'secondary'}>
                        {license.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleCopy(license.license_id)}
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

export default Admin;
