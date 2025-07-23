import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Search, Shield, Calendar, User, Building } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { validLicenses, sampleLicense } from '@/utils/licenseData';

const VerifyPage = () => {
  const [licenseId, setLicenseId] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleVerification = async () => {
    if (!licenseId.trim()) {
      toast({
        title: "License ID Required",
        description: "Please enter a license ID to verify",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const isValid = validLicenses.includes(licenseId);
    
    if (isValid) {
      setVerificationResult({
        valid: true,
        license: {
          ...sampleLicense,
          id: licenseId
        }
      });
      toast({
        title: "License Verified",
        description: "This license is valid and active",
      });
    } else {
      setVerificationResult({
        valid: false,
        message: "License not found or invalid"
      });
      toast({
        title: "Verification Failed",
        description: "This license ID is not valid",
        variant: "destructive"
      });
    }
    
    setIsSearching(false);
  };

  const handleReset = () => {
    setLicenseId('');
    setVerificationResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="p-3 bg-primary/20 rounded-xl">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  License Verification
                </h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Verify the authenticity and status of any cryptocurrency trading license
              </p>
            </div>

            {/* Verification Form */}
            <Card className="mb-8 border-2 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Search className="h-6 w-6 text-primary" />
                  License ID Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="licenseId" className="text-lg font-medium">
                      Enter License ID
                    </Label>
                    <div className="flex gap-4">
                      <Input
                        id="licenseId"
                        value={licenseId}
                        onChange={(e) => setLicenseId(e.target.value)}
                        placeholder="CL-2024-XXXX-TX"
                        className="text-lg h-14 border-2"
                        onKeyPress={(e) => e.key === 'Enter' && handleVerification()}
                      />
                      <Button 
                        onClick={handleVerification}
                        disabled={isSearching}
                        size="lg"
                        className="h-14 px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                      >
                        {isSearching ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Verifying...
                          </>
                        ) : (
                          <>
                            <Search className="h-5 w-5 mr-2" />
                            Verify
                          </>
                        )}
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      License IDs follow the format: CL-YYYY-XXXX-TX (e.g., CL-2024-8294-T3)
                    </p>
                  </div>

                  {/* Sample License for Demo */}
                  <div className="p-4 bg-muted/50 rounded-lg border">
                    <p className="text-sm font-medium mb-2">Try a sample license ID:</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setLicenseId(sampleLicense.id)}
                      className="text-xs"
                    >
                      Use Sample: {sampleLicense.id}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Verification Results */}
            {verificationResult && (
              <Card className={`border-2 shadow-xl ${verificationResult.valid ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50/50'}`}>
                <CardHeader className={`${verificationResult.valid ? 'bg-green-100/50' : 'bg-red-100/50'}`}>
                  <CardTitle className="flex items-center gap-3">
                    {verificationResult.valid ? (
                      <>
                        <CheckCircle className="h-8 w-8 text-green-600" />
                        <span className="text-green-800">License Verified Successfully</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-8 w-8 text-red-600" />
                        <span className="text-red-800">License Verification Failed</span>
                      </>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {verificationResult.valid ? (
                    <div className="space-y-6">
                      {/* License Details */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <Shield className="h-5 w-5 text-green-600" />
                            <div>
                              <p className="text-sm text-muted-foreground">License ID</p>
                              <p className="font-mono font-bold text-lg">{verificationResult.license.id}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <User className="h-5 w-5 text-blue-600" />
                            <div>
                              <p className="text-sm text-muted-foreground">License Holder</p>
                              <p className="font-semibold">{verificationResult.license.holder}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Building className="h-5 w-5 text-purple-600" />
                            <div>
                              <p className="text-sm text-muted-foreground">License Type</p>
                              <Badge variant="secondary" className="mt-1">
                                {verificationResult.license.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-orange-600" />
                            <div>
                              <p className="text-sm text-muted-foreground">Issue Date</p>
                              <p className="font-semibold">{verificationResult.license.issueDate}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-red-600" />
                            <div>
                              <p className="text-sm text-muted-foreground">Expiry Date</p>
                              <p className="font-semibold">{verificationResult.license.expiryDate}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <div>
                              <p className="text-sm text-muted-foreground">Status</p>
                              <Badge className="mt-1 bg-green-600">
                                Active & Valid
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Approved Platforms */}
                      <div className="border-t pt-6">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Shield className="h-5 w-5 text-primary" />
                          Approved Trading Platforms
                        </h4>
                        <p className="text-muted-foreground">{verificationResult.license.platforms}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-lg text-red-700 font-medium">{verificationResult.message}</p>
                      <p className="text-muted-foreground mt-2">
                        Please check the license ID and try again, or contact support if you believe this is an error.
                      </p>
                    </div>
                  )}
                  
                  <div className="flex justify-center mt-8">
                    <Button 
                      onClick={handleReset}
                      variant="outline"
                      className="px-8"
                    >
                      Verify Another License
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Information Section */}
            <Card className="mt-8 border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-primary" />
                  About License Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Why Verify?</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Confirm license authenticity</li>
                      <li>• Check active status</li>
                      <li>• Verify holder information</li>
                      <li>• Validate trading permissions</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">License Format</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• CL: Crypto License prefix</li>
                      <li>• YYYY: Issue year</li>
                      <li>• XXXX: Unique identifier</li>
                      <li>• TX: Tier level (T1-T5)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default VerifyPage;