import { useState, useEffect } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { 
  Shield, 
  Plus, 
  Edit, 
  Check, 
  X, 
  Eye, 
  Calendar,
  User,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  Search
} from 'lucide-react';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

interface License {
  id: string;
  license_id: string;
  holder_name: string;
  license_type: string;
  status: 'active' | 'pending' | 'expired' | 'rejected' | 'suspended';
  issue_date: string;
  expiry_date: string;
  platforms?: string;
  application_id?: string;
  created_at: string;
  updated_at: string;
}

interface LicenseFormData {
  license_id: string;
  holder_name: string;
  license_type: string;
  status: 'active' | 'pending' | 'expired' | 'rejected' | 'suspended';
  issue_date: string;
  expiry_date: string;
  platforms: string;
  application_id: string;
}

const LicenseManager = () => {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLicense, setEditingLicense] = useState<License | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [formData, setFormData] = useState<LicenseFormData>({
    license_id: '',
    holder_name: '',
    license_type: '',
    status: 'pending' as const,
    issue_date: new Date().toISOString().split('T')[0],
    expiry_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    platforms: '',
    application_id: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [licensesData, applicationsData] = await Promise.all([
        supabaseDataManager.getLicenses(),
        supabaseDataManager.getApplications()
      ]);
      setLicenses(licensesData || []);
      setApplications(applicationsData || []);
    } catch (error) {
      toast({
        title: "Error Loading Data",
        description: "Failed to load licenses and applications",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateLicenseId = () => {
    const prefix = 'LIC';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  };

  const handleCreateLicense = () => {
    setEditingLicense(null);
    setFormData({
      license_id: generateLicenseId(),
      holder_name: '',
      license_type: '',
      status: 'pending' as const,
      issue_date: new Date().toISOString().split('T')[0],
      expiry_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      platforms: '',
      application_id: ''
    });
    setIsDialogOpen(true);
  };

  const handleEditLicense = (license: License) => {
    setEditingLicense(license);
    setFormData({
      license_id: license?.license_id,
      holder_name: license?.holder_name,
      license_type: license?.license_type,
      status: license?.status as LicenseFormData['status'],
      issue_date: license?.issue_date,
      expiry_date: license?.expiry_date,
      platforms: license?.platforms || '',
      application_id: license?.application_id || ''
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData?.holder_name || !formData?.license_type) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const licenseData = {
        license_id: formData?.license_id,
        holder_name: formData?.holder_name,
        license_type: formData?.license_type,
        status: formData?.status,
        issue_date: formData?.issue_date,
        expiry_date: formData?.expiry_date,
        platforms: formData?.platforms || null,
        application_id: formData?.application_id || null
      };

      if (editingLicense) {
        await supabaseDataManager.updateLicense(editingLicense?.id, licenseData);
        toast({
          title: "License Updated",
          description: `License ${formData.license_id} has been updated successfully`,
        });
      } else {
        await supabaseDataManager.createLicense(licenseData);
        toast({
          title: "License Created",
          description: `License ${formData.license_id} has been created successfully`,
        });
      }

      setIsDialogOpen(false);
      loadData();
    } catch (error) {
      toast({
        title: "Error",
        description: editingLicense ? "Failed to update license" : "Failed to create license",
        variant: "destructive",
      });
    }
  };

  const handleApprove = async (license: License) => {
    try {
      await supabaseDataManager.updateLicense(license?.id, { status: 'active' });
      toast({
        title: "License Approved",
        description: `License ${license?.license_id} has been approved and is now active`,
      });
      loadData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve license",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (license: License) => {
    try {
      await supabaseDataManager.updateLicense(license?.id, { status: 'rejected' as const });
      toast({
        title: "License Rejected",
        description: `License ${license?.license_id} has been rejected`,
        variant: "destructive",
      });
      loadData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject license",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: 'default' as const, icon: CheckCircle, color: 'text-green-500' },
      pending: { variant: 'secondary' as const, icon: Clock, color: 'text-yellow-500' },
      expired: { variant: 'destructive' as const, icon: AlertCircle, color: 'text-red-500' },
      rejected: { variant: 'destructive' as const, icon: X, color: 'text-red-500' },
      suspended: { variant: 'outline' as const, icon: AlertCircle, color: 'text-orange-500' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const IconComponent = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <IconComponent className={`h-3 w-3 ${config.color}`} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filteredLicenses = licenses.filter(license => {
    const matchesSearch = 
      license?.license_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      license?.holder_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      license?.license_type?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || license?.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            License Management
          </h2>
          <p className="text-muted-foreground">
            Create, manage, and track cryptocurrency trading licenses
          </p>
        </div>
        
        <Button onClick={handleCreateLicense} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create New License
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Licenses', value: licenses.length, icon: Shield, color: 'text-blue-500' },
          { label: 'Active', value: licenses.filter(l => l.status === 'active').length, icon: CheckCircle, color: 'text-green-500' },
          { label: 'Pending', value: licenses.filter(l => l.status === 'pending').length, icon: Clock, color: 'text-yellow-500' },
          { label: 'Expired', value: licenses.filter(l => l.status === 'expired').length, icon: AlertCircle, color: 'text-red-500' }
        ].map((stat, index) => (
          <Card key={index}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search licenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Licenses Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Licenses ({filteredLicenses?.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>License ID</TableHead>
                  <TableHead>Holder Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLicenses.map((license) => (
                  <TableRow key={license?.id}>
                    <TableCell className="font-mono">{license?.license_id}</TableCell>
                    <TableCell className="font-medium">{license?.holder_name}</TableCell>
                    <TableCell>{license.license_type}</TableCell>
                    <TableCell>{getStatusBadge(license.status)}</TableCell>
                    <TableCell>{new Date(license.issue_date).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(license.expiry_date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditLicense(license)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        {license.status === 'pending' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApprove(license)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReject(license)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredLicenses.length === 0 && (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No licenses found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

     {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingLicense ? 'Edit License' : 'Create New License'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="license_id">License ID</Label>
                <Input
                  id="license_id"
                  value={formData?.license_id}
                  onChange={(e) => setFormData(prev => ({ ...prev, license_id: e.target.value }))}
                  disabled={!!editingLicense}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="holder_name">Holder Name</Label>
                <Input
                  id="holder_name"
                  value={formData?.holder_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, holder_name: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="license_type">License Type</Label>
                <Select 
                  value={formData?.license_type} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, license_type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select license type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic Trader">Basic Trader</SelectItem>
                    <SelectItem value="Standard Trader">Standard Trader</SelectItem>
                    <SelectItem value="Advanced Trader">Advanced Trader</SelectItem>
                    <SelectItem value="Professional Trader">Professional Trader</SelectItem>
                    <SelectItem value="Institutional Trader">Institutional Trader</SelectItem>
                    <SelectItem value="Executive Trader">Executive Trader</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData?.status} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as LicenseFormData['status'] }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="issue_date">Issue Date</Label>
                <Input
                  id="issue_date"
                  type="date"
                  value={formData?.issue_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, issue_date: e.target.value }))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expiry_date">Expiry Date</Label>
                <Input
                  id="expiry_date"
                  type="date"
                  value={formData?.expiry_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, expiry_date: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="platforms">Platforms (Optional)</Label>
              <Textarea
                id="platforms"
                value={formData?.platforms}
                onChange={(e) => setFormData(prev => ({ ...prev, platforms: e.target.value }))}
                placeholder="List approved trading platforms..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="application_id">Link to Application (Optional)</Label>
              <Select 
                value={formData?.application_id} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, application_id: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an application" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NoApplication">No Application</SelectItem>
                  {applications?.map((app) => (
                    <SelectItem key={app?.id} value={app?.id}>
                      {app?.name} - {app?.email} ({app?.category})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingLicense ? 'Update License' : 'Create License'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      </div>
    </ErrorBoundary>
  );
};

export default LicenseManager;