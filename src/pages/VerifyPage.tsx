
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, CheckCircle, XCircle, Calendar, User, Building, Globe } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface LicenseInfo {
  license_id: string;
  holder_name: string;
  license_type: string;
  issue_date: string;
  expiry_date: string;
  status: 'active' | 'expired' | 'suspended';
  platforms?: string;
}

export default function VerifyPage() {
  const [licenseId, setLicenseId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [licenseInfo, setLicenseInfo] = useState<LicenseInfo | null>(null);
  const [error, setError] = useState('');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLicenseInfo(null);

    if (!licenseId.trim()) {
      setError('Please enter a license ID');
      return;
    }

    setIsSearching(true);

    try {
      console.log('Searching for license:', licenseId);
      
      const { data, error: dbError } = await supabase
        .from('licenses')
        .select('*')
        .eq('license_id', licenseId.toUpperCase())
        .single();

      if (dbError) {
        console.error('Database error:', dbError);
        if (dbError.code === 'PGRST116') {
          setError('License not found. Please check the license ID and try again.');
        } else {
          setError('Error verifying license. Please try again.');
        }
        return;
      }

      if (!data) {
        setError('License not found. Please check the license ID and try again.');
        return;
      }

      console.log('License found:', data);
      setLicenseInfo(data);
      
      toast({
        title: "License Found",
        description: `License ${data.license_id} verified successfully`,
      });

    } catch (error) {
      console.error('Verification error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSearching(false);
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

  const isLicenseValid = (license: LicenseInfo) => {
    const today = new Date();
    const expiryDate = new Date(license.expiry_date);
    return license.status === 'active' && expiryDate > today;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">License Verification</h1>
            <p className="text-muted-foreground">
              Verify the authenticity and status of cryptocurrency trading licenses
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Verify License
              </CardTitle>
              <CardDescription>
                Enter a license ID to verify its authenticity and current status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerify} className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="licenseId">License ID</Label>
                    <Input
                      id="licenseId"
                      type="text"
                      value={licenseId}
                      onChange={(e) => setLicenseId(e.target.value)}
                      placeholder="Enter license ID (e.g., CL-2025-0001-T1)"
                      className="mt-1"
                      disabled={isSearching}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button type="submit" disabled={isSearching}>
                      {isSearching ? (
                        <>
                          <Search className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Verify
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                
                {error && (
                  <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </form>
            </CardContent>
          </Card>

          {licenseInfo && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {isLicenseValid(licenseInfo) ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    License Verification Result
                  </CardTitle>
                  <Badge className={getStatusColor(licenseInfo.status)}>
                    {licenseInfo.status.charAt(0).toUpperCase() + licenseInfo.status.slice(1)}
                  </Badge>
                </div>
                <CardDescription>
                  {isLicenseValid(licenseInfo) 
                    ? 'This license is valid and active' 
                    : 'This license is not currently active'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">License Holder</p>
                        <p className="text-sm text-muted-foreground">{licenseInfo.holder_name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">License Type</p>
                        <p className="text-sm text-muted-foreground">{licenseInfo.license_type}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Issue Date</p>
                        <p className="text-sm text-muted-foreground">{formatDate(licenseInfo.issue_date)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Expiry Date</p>
                        <p className="text-sm text-muted-foreground">{formatDate(licenseInfo.expiry_date)}</p>
                      </div>
                    </div>
                    
                    {licenseInfo.platforms && (
                      <div className="flex items-start gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground mt-1" />
                        <div>
                          <p className="text-sm font-medium">Supported Platforms</p>
                          <p className="text-sm text-muted-foreground">{licenseInfo.platforms}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-1">License ID</p>
                      <p className="text-sm font-mono text-muted-foreground">{licenseInfo.license_id}</p>
                    </div>
                  </div>
                </div>
                
                {isLicenseValid(licenseInfo) && (
                  <Alert className="mt-6">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      This license is currently valid and active. The holder is authorized to engage in cryptocurrency trading activities as specified in the license terms.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Sample License IDs for Testing</CardTitle>
              <CardDescription>
                Use these sample license IDs to test the verification system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-mono text-sm">CL-2025-0001-T1</p>
                  <p className="text-xs text-muted-foreground">John Doe - Category 1</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-mono text-sm">CL-2025-0002-T2</p>
                  <p className="text-xs text-muted-foreground">Jane Smith - Category 2</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-mono text-sm">CL-2025-0003-T3</p>
                  <p className="text-xs text-muted-foreground">APEX Trading Solutions - Category 3</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-mono text-sm">CL-2024-8294-T3</p>
                  <p className="text-xs text-muted-foreground">Thomas A. Anderson - Category 3</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
