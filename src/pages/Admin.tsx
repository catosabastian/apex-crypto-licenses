import { useState } from 'react';
import { validLicenses, generateLicenseId } from '@/utils/licenseData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Copy, Search, Download, Filter, LogOut, Users, FileText, Settings, BarChart3, Mail, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('licenses');
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  // Mock wallet addresses data
  const WALLET_ADDRESSES = {
    Bitcoin: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    Ethereum: "0x742d35Cc6663C65C926d75d60e3B3d97c8a0e0e0",
    USDT: "TG3XXyExBkPp9nzdajDGFahC9nyKERJpUN"
  };
  
  // Mock data for demonstration
  const [applications] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', category: '3', status: 'pending', date: '2024-01-15', amount: '70,000 USDT' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', category: '4', status: 'approved', date: '2024-01-14', amount: '150,000 USDT' },
    { id: 3, name: 'Acme Corp', email: 'admin@acme.com', category: '5', status: 'review', date: '2024-01-13', amount: '250,000 USDT' },
  ]);

  const [contacts] = useState([
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', subject: 'License Inquiry', message: 'I need help with my application...', date: '2024-01-15', status: 'new' },
    { id: 2, name: 'Bob Wilson', email: 'bob@example.com', subject: 'Payment Issue', message: 'My payment was not processed...', date: '2024-01-14', status: 'replied' },
  ]);

  const [websiteSettings] = useState({
    category1Price: '25,000 USDT',
    category2Price: '50,000 USDT',
    category3Price: '70,000 USDT',
    category4Price: '150,000 USDT',
    category5Price: '250,000 USDT',
    category1Available: false,
    category2Available: false,
    category3Available: true,
    category4Available: true,
    category5Available: true,
  });

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
  
  // Generate CSV of licenses
  const exportCsv = () => {
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
    
    toast({
      title: "Exported!",
      description: "Licenses exported as CSV",
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'review': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'new': return 'bg-purple-100 text-purple-800';
      case 'replied': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
            Comprehensive license and application management system
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
        <TabsList className="grid w-full grid-cols-5">
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
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="licenses" className="space-y-6">
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

        <TabsContent value="applications" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">License Applications</h2>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Application
            </Button>
          </div>

          <div className="grid gap-4">
            {applications.map((app) => (
              <Card key={app.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg">{app.name}</CardTitle>
                    <CardDescription>{app.email}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(app.status)}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Category</p>
                      <p className="text-muted-foreground">Category {app.category}</p>
                    </div>
                    <div>
                      <p className="font-medium">Amount</p>
                      <p className="text-muted-foreground">{app.amount}</p>
                    </div>
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-muted-foreground">{app.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Contact Messages</h2>
            <Button variant="outline" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Compose Email
            </Button>
          </div>

          <div className="grid gap-4">
            {contacts.map((contact) => (
              <Card key={contact.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg">{contact.name}</CardTitle>
                    <CardDescription>{contact.email}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(contact.status)}>
                    {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium">{contact.subject}</p>
                    <p className="text-muted-foreground text-sm">{contact.message}</p>
                    <p className="text-xs text-muted-foreground">{contact.date}</p>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="flex gap-2">
                    <Button size="sm" className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      Reply
                    </Button>
                    <Button size="sm" variant="outline">
                      Mark Read
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <h2 className="text-2xl font-semibold">Website Settings</h2>
          
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>License Pricing</CardTitle>
                <CardDescription>Manage license pricing and availability</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3, 4, 5].map((category) => (
                  <div key={category} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Category {category}</p>
                      <p className="text-sm text-muted-foreground">
                        {websiteSettings[`category${category}Price` as keyof typeof websiteSettings]}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={websiteSettings[`category${category}Available` as keyof typeof websiteSettings] ? "default" : "secondary"}>
                        {websiteSettings[`category${category}Available` as keyof typeof websiteSettings] ? "Available" : "Sold Out"}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Addresses</CardTitle>
                <CardDescription>Manage cryptocurrency wallet addresses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(WALLET_ADDRESSES).map(([crypto, address]) => (
                  <div key={crypto} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{crypto}</p>
                      <p className="text-sm text-muted-foreground font-mono">{address as string}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <h2 className="text-2xl font-semibold">Analytics Dashboard</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">126</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Licenses</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2.4M</div>
                <p className="text-xs text-muted-foreground">+18% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">-8% from last month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
