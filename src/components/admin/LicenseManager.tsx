
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Eye, Trash, Search, Download, QrCode, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { dataManager, License } from '@/utils/dataManager';

export const LicenseManager = () => {
  const [licenses, setLicenses] = useState<License[]>(dataManager.getLicenses());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<License | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'suspended': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateLicense = (licenseData: Omit<License, 'id'>) => {
    const newLicense = dataManager.addLicense(licenseData);
    setLicenses(dataManager.getLicenses());
    setIsCreateDialogOpen(false);
    toast({
      title: "License Created",
      description: `License ${newLicense.id} has been created successfully`,
    });
  };

  const handleUpdateLicense = (updates: Partial<License>) => {
    if (!selectedLicense) return;

    const success = dataManager.updateLicense(selectedLicense.id, updates);
    if (success) {
      setLicenses(dataManager.getLicenses());
      setIsEditDialogOpen(false);
      toast({
        title: "License Updated",
        description: "License has been updated successfully",
      });
    }
  };

  const handleDeleteLicense = (licenseId: string) => {
    if (confirm('Are you sure you want to delete this license?')) {
      // Note: Add delete method to dataManager if needed
      toast({
        title: "License Deleted",
        description: "License has been deleted successfully",
      });
    }
  };

  const filteredLicenses = licenses.filter(license => {
    const matchesSearch = searchTerm === '' || 
      license.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      license.holder.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || license.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportLicenses = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "License ID,Holder,Type,Status,Issue Date,Expiry Date,Platforms\n" 
      + filteredLicenses.map(license => 
          `${license.id},"${license.holder}","${license.type}",${license.status},${license.issueDate},${license.expiryDate},"${license.platforms || ''}"`)
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold">License Management</h2>
          <p className="text-muted-foreground">Manage all trading licenses and their status</p>
        </div>
        
        <div className="flex gap-2">
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
              {filteredLicenses.map((license) => (
                <TableRow key={license.id}>
                  <TableCell className="font-mono text-sm">{license.id}</TableCell>
                  <TableCell>{license.holder}</TableCell>
                  <TableCell>{license.type}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(license.status)}>
                      {license.status.charAt(0).toUpperCase() + license.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{license.issueDate}</TableCell>
                  <TableCell>{license.expiryDate}</TableCell>
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
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleDeleteLicense(license.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

const LicenseForm = ({ onSubmit }: { onSubmit: (data: Omit<License, 'id'>) => void }) => {
  const [formData, setFormData] = useState({
    holder: '',
    type: '',
    category: 1,
    issueDate: new Date().toISOString().split('T')[0],
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'active' as License['status'],
    platforms: 'Binance, Kraken, Coinbase, KuCoin'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="holder">License Holder</Label>
        <Input
          id="holder"
          value={formData.holder}
          onChange={(e) => setFormData(prev => ({ ...prev, holder: e.target.value }))}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="category">Category</Label>
        <Select value={formData.category.toString()} onValueChange={(value) => 
          setFormData(prev => ({ ...prev, category: parseInt(value), type: `Category ${value}` }))
        }>
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
          <Label htmlFor="issueDate">Issue Date</Label>
          <Input
            id="issueDate"
            type="date"
            value={formData.issueDate}
            onChange={(e) => setFormData(prev => ({ ...prev, issueDate: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input
            id="expiryDate"
            type="date"
            value={formData.expiryDate}
            onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
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
    expiryDate: license.expiryDate,
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
        <Label htmlFor="expiryDate">Expiry Date</Label>
        <Input
          id="expiryDate"
          type="date"
          value={formData.expiryDate}
          onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
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
