
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash, Search, Download, QrCode, FileText, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabaseDataManager, License } from '@/utils/supabaseDataManager';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';

export const LicenseManager = () => {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<License | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAdmin } = useSupabaseAuth();

  useEffect(() => {
    if (isAdmin) {
      loadLicenses();
    }
  }, [isAdmin]);

  const loadLicenses = async () => {
    try {
      setIsLoading(true);
      const licenseData = await supabaseDataManager.getLicenses();
      setLicenses(licenseData);
    } catch (error) {
      console.error('Error loading licenses:', error);
      toast({
        title: "Error",
        description: "Failed to load licenses",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'suspended': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateLicense = async (licenseData: Omit<License, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newLicense = await supabaseDataManager.createLicense(licenseData);
      if (newLicense) {
        setIsCreateDialogOpen(false);
        toast({
          title: "License Created",
          description: `License ${newLicense.license_id} has been created successfully`,
        });
        loadLicenses();
      } else {
        toast({
          title: "Error",
          description: "Failed to create license",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error creating license:', error);
      toast({
        title: "Error",
        description: "Failed to create license",
        variant: "destructive",
      });
    }
  };

  const handleUpdateLicense = async (updates: Partial<License>) => {
    if (!selectedLicense) return;

    try {
      const success = await supabaseDataManager.updateLicense(selectedLicense.id, updates);
      if (success) {
        setIsEditDialogOpen(false);
        toast({
          title: "License Updated",
          description: "License has been updated successfully",
        });
        loadLicenses();
      } else {
        toast({
          title: "Error",
          description: "Failed to update license",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error updating license:', error);
      toast({
        title: "Error",
        description: "Failed to update license",
        variant: "destructive",
      });
    }
  };

  const filteredLicenses = licenses.filter(license => {
    const matchesSearch = searchTerm === '' || 
      license.license_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      license.holder_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || license.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportLicenses = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "License ID,Holder,Type,Status,Issue Date,Expiry Date,Platforms\n" 
      + filteredLicenses.map(license => 
          `${license.license_id},"${license.holder_name}","${license.license_type}",${license.status},${license.issue_date},${license.expiry_date},"${license.platforms || ''}"`)
        .join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "licenses_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Complete",
      description: "Licenses exported successfully",
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">License Management</h2>
            <p className="text-muted-foreground">Loading licenses...</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-8">
          <RefreshCw className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold">License Management</h2>
          <p className="text-muted-foreground">Manage all trading licenses and their status</p>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={loadLicenses} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={exportLicenses} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create License
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New License</DialogTitle>
                <DialogDescription>
                  Generate a new trading license
                </DialogDescription>
              </DialogHeader>
              <LicenseForm onSubmit={handleCreateLicense} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search licenses by ID or holder name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Licenses Table */}
      <Card>
        <CardHeader>
          <CardTitle>Licenses ({filteredLicenses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>License ID</TableHead>
                <TableHead>Holder</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLicenses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No licenses found
                  </TableCell>
                </TableRow>
              ) : (
                filteredLicenses.map((license) => (
                  <TableRow key={license.id}>
                    <TableCell className="font-mono text-sm">{license.license_id}</TableCell>
                    <TableCell>{license.holder_name}</TableCell>
                    <TableCell>{license.license_type}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(license.status)}>
                        {license.status.charAt(0).toUpperCase() + license.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{license.issue_date}</TableCell>
                    <TableCell>{license.expiry_date}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost">
                          <QrCode className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => setSelectedLicense(license)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit License</DialogTitle>
                              <DialogDescription>
                                Update license information
                              </DialogDescription>
                            </DialogHeader>
                            {selectedLicense && (
                              <LicenseEditForm 
                                license={selectedLicense}
                                onSubmit={handleUpdateLicense}
                              />
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

const LicenseForm = ({ onSubmit }: { onSubmit: (data: Omit<License, 'id' | 'created_at' | 'updated_at'>) => void }) => {
  const [formData, setFormData] = useState({
    holder_name: '',
    license_type: '',
    category: 1,
    issue_date: new Date().toISOString().split('T')[0],
    expiry_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'active' as License['status'],
    platforms: 'Binance, Kraken, Coinbase, KuCoin',
    license_id: `CL-${new Date().getFullYear()}-${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}-T1`
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="holder_name">License Holder</Label>
        <Input
          id="holder_name"
          value={formData.holder_name}
          onChange={(e) => setFormData(prev => ({ ...prev, holder_name: e.target.value }))}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="category">Category</Label>
        <Select value={formData.category.toString()} onValueChange={(value) => {
          const tier = parseInt(value);
          const licenseId = `CL-${new Date().getFullYear()}-${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}-T${tier}`;
          setFormData(prev => ({ 
            ...prev, 
            category: tier, 
            license_type: `Category ${value}`,
            license_id: licenseId
          }));
        }}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Category 1 - Basic Trading</SelectItem>
            <SelectItem value="2">Category 2 - Standard Trading</SelectItem>
            <SelectItem value="3">Category 3 - Advanced Trading</SelectItem>
            <SelectItem value="4">Category 4 - Professional Trading</SelectItem>
            <SelectItem value="5">Category 5 - Institutional Trading</SelectItem>
            <SelectItem value="6">Category 6 - Executive Trading</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="issue_date">Issue Date</Label>
          <Input
            id="issue_date"
            type="date"
            value={formData.issue_date}
            onChange={(e) => setFormData(prev => ({ ...prev, issue_date: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="expiry_date">Expiry Date</Label>
          <Input
            id="expiry_date"
            type="date"
            value={formData.expiry_date}
            onChange={(e) => setFormData(prev => ({ ...prev, expiry_date: e.target.value }))}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="platforms">Supported Platforms</Label>
        <Input
          id="platforms"
          value={formData.platforms}
          onChange={(e) => setFormData(prev => ({ ...prev, platforms: e.target.value }))}
          placeholder="e.g., Binance, Kraken, Coinbase"
        />
      </div>

      <DialogFooter>
        <Button type="submit">Create License</Button>
      </DialogFooter>
    </form>
  );
};

const LicenseEditForm = ({ 
  license, 
  onSubmit 
}: { 
  license: License; 
  onSubmit: (updates: Partial<License>) => void;
}) => {
  const [formData, setFormData] = useState({
    status: license.status,
    expiry_date: license.expiry_date,
    platforms: license.platforms || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value: License['status']) => 
          setFormData(prev => ({ ...prev, status: value }))
        }>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="expiry_date">Expiry Date</Label>
        <Input
          id="expiry_date"
          type="date"
          value={formData.expiry_date}
          onChange={(e) => setFormData(prev => ({ ...prev, expiry_date: e.target.value }))}
          required
        />
      </div>

      <div>
        <Label htmlFor="platforms">Supported Platforms</Label>
        <Input
          id="platforms"
          value={formData.platforms}
          onChange={(e) => setFormData(prev => ({ ...prev, platforms: e.target.value }))}
          placeholder="e.g., Binance, Kraken, Coinbase"
        />
      </div>

      <DialogFooter>
        <Button type="submit">Update License</Button>
      </DialogFooter>
    </form>
  );
};
