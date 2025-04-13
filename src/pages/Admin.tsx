
import { useState } from 'react';
import { validLicenses, generateLicenseId } from '@/utils/licenseData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Shield, Copy, Search, Download, Filter } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState<number | null>(null);
  
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

  return (
    <div className="container mx-auto py-10 px-4">
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="text-primary" />
            License Administration
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage and verify all issued crypto trading licenses
          </p>
        </div>
        
        <Button onClick={exportCsv} className="flex items-center gap-2 md:self-end">
          <Download className="h-4 w-4" />
          Export Licenses
        </Button>
      </header>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
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
            
            {filteredLicenses.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No licenses found matching your filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Admin;
