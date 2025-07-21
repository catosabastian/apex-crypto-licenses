
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Search, CheckCircle, AlertCircle, Copy, QrCode } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { isValidLicense, sampleLicense } from '@/utils/licenseData';

const VerifyPage = () => {
  const [licenseId, setLicenseId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  
  const handleVerify = async () => {
    if (!licenseId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a license ID",
        variant: "destructive"
      });
      return;
    }
    
    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      const isValid = isValidLicense(licenseId);
      
      if (isValid) {
        setVerificationResult({
          valid: true,
          license: {
            id: licenseId,
            holder: sampleLicense.holder,
            type: sampleLicense.type,
            issueDate: sampleLicense.issueDate,
            expiryDate: sampleLicense.expiryDate,
            status: "Active",
            platforms: sampleLicense.platforms
          }
        });
      } else {
        setVerificationResult({
          valid: false,
          message: "License ID not found or invalid"
        });
      }
      
      setIsVerifying(false);
    }, 2000);
  };
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "License ID copied to clipboard"
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Verify Trading License - APEX License Verification Portal</title>
        <meta name="description" content="Verify the authenticity of cryptocurrency trading licenses issued by APEX. Instant verification with comprehensive license details." />
        <meta name="keywords" content="verify crypto license, trading license verification, APEX license check, cryptocurrency certification verification" />
        <link rel="canonical" href="https://apexregulations.com/verify" />
      </Helmet>
      
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-accent/20 text-accent border-accent/30">License Verification</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Verify Trading License
                <span className="block text-accent">Authenticity</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Instantly verify the authenticity of any APEX cryptocurrency trading license. 
                Enter the license ID below to check its validity and view detailed information.
              </p>
            </div>
          </div>
        </section>

        {/* Verification Form */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <Card className="shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl flex items-center justify-center gap-2">
                    <Shield className="h-6 w-6 text-accent" />
                    License Verification Portal
                  </CardTitle>
                  <CardDescription>
                    Enter a license ID to verify its authenticity and view details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="license-id" className="text-sm font-medium">License ID</label>
                    <div className="flex gap-2">
                      <Input
                        id="license-id"
                        placeholder="Enter license ID (e.g., CL-2024-0001-T3)"
                        value={licenseId}
                        onChange={(e) => setLicenseId(e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        onClick={handleVerify}
                        disabled={isVerifying}
                        className="gap-2"
                      >
                        {isVerifying ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Verifying...
                          </>
                        ) : (
                          <>
                            <Search className="h-4 w-4" />
                            Verify
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  {verificationResult && (
                    <div className="mt-6 space-y-6">
                      {verificationResult.valid ? (
                        <div>
                          <Card className="border-green-200 bg-green-50">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                                <CheckCircle className="h-5 w-5" />
                                Valid License
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-green-800">License ID</p>
                                  <div className="flex items-center gap-2">
                                    <p className="text-green-700 font-mono">{verificationResult.license.id}</p>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleCopy(verificationResult.license.id)}
                                    >
                                      <Copy className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-green-800">Status</p>
                                  <Badge className="bg-green-100 text-green-800">{verificationResult.license.status}</Badge>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-green-800">License Holder</p>
                                  <p className="text-green-700">{verificationResult.license.holder}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-green-800">License Type</p>
                                  <p className="text-green-700">{verificationResult.license.type}</p>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-green-800">Issue Date</p>
                                  <p className="text-green-700">{verificationResult.license.issueDate}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-green-800">Expiry Date</p>
                                  <p className="text-green-700">{verificationResult.license.expiryDate}</p>
                                </div>
                              </div>
                              
                              <div>
                                <p className="text-sm font-medium text-green-800">Authorized Platforms</p>
                                <p className="text-green-700">{verificationResult.license.platforms}</p>
                              </div>
                            </CardContent>
                          </Card>
                          
                          {/* Enhanced License Visual Display */}
                          <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-4 text-center">Official License Certificate</h3>
                            <LicenseVisualCard license={verificationResult.license} />
                          </div>
                        </div>
                      ) : (
                        <Card className="border-red-200 bg-red-50">
                          <CardHeader>
                            <CardTitle className="text-lg text-red-800 flex items-center gap-2">
                              <AlertCircle className="h-5 w-5" />
                              Invalid License
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-red-700">{verificationResult.message}</p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Sample License */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Sample License Verification</h2>
                <p className="text-lg text-muted-foreground">
                  Try verifying this sample license to see how the system works
                </p>
              </div>
              
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-center">Sample License</CardTitle>
                  <CardDescription className="text-center">
                    Use this sample license ID to test the verification system
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-muted p-3 rounded-lg">
                      <code className="text-lg font-mono">{sampleLicense.id}</code>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleCopy(sampleLicense.id)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Holder:</p>
                      <p className="text-muted-foreground">{sampleLicense.holder}</p>
                    </div>
                    <div>
                      <p className="font-medium">Type:</p>
                      <p className="text-muted-foreground">{sampleLicense.type}</p>
                    </div>
                    <div>
                      <p className="font-medium">Issue Date:</p>
                      <p className="text-muted-foreground">{sampleLicense.issueDate}</p>
                    </div>
                    <div>
                      <p className="font-medium">Expiry Date:</p>
                      <p className="text-muted-foreground">{sampleLicense.expiryDate}</p>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setLicenseId(sampleLicense.id);
                      handleVerify();
                    }}
                  >
                    Verify Sample License
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">How License Verification Works</h2>
                <p className="text-lg text-muted-foreground">
                  Our verification system provides instant, secure validation of all APEX licenses
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Search className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle>Enter License ID</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground">
                      Input the license ID you want to verify in the format CL-YYYY-XXXX-TX
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle>Secure Verification</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground">
                      Our system instantly checks the license against our secure database
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle>Instant Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground">
                      Get immediate verification results with complete license details and visual certificate
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

// Enhanced License Visual Card Component
const LicenseVisualCard = ({ license }: { license: any }) => {
  return (
    <Card className="license-card w-full max-w-md mx-auto relative border-2 border-green-200 bg-green-50">
      <div className="watermark">VERIFIED</div>
      
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-600 to-green-500">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-white" />
          <h3 className="text-lg font-bold text-white">APEX CRYPTO LICENSE</h3>
        </div>
        <Badge className="bg-white/20 text-white border-white/30">{license.status}</Badge>
      </div>
      
      <CardContent className="p-6 content">
        <div className="stamp text-green-600">VERIFIED</div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h4 className="text-sm text-green-700">License Holder</h4>
              <p className="font-bold text-lg text-green-800">{license.holder}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <h4 className="text-xs text-green-700 uppercase tracking-wider">Category</h4>
              <p className="font-bold text-green-800">{license.type}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <h4 className="text-xs text-green-700 uppercase tracking-wider">License ID</h4>
              <p className="font-bold font-mono text-sm text-green-800">{license.id}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs text-green-700 uppercase tracking-wider">Issue Date</h4>
              <p className="font-semibold text-green-800">{license.issueDate}</p>
            </div>
            <div>
              <h4 className="text-xs text-green-700 uppercase tracking-wider">Expiry Date</h4>
              <p className="font-semibold text-green-800">{license.expiryDate}</p>
            </div>
          </div>
          
          <div className="p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
            <h4 className="text-xs text-green-700 uppercase tracking-wider mb-2">Authorized Platforms</h4>
            <p className="font-medium text-sm text-green-800">{license.platforms}</p>
          </div>
          
          <div className="pt-4 flex items-center justify-between">
            <div className="text-xs text-green-700">
              <p>Verify at:</p>
              <p className="font-mono">verify.apexcrypto.auth</p>
            </div>
            <div className="qr-section">
              <QrCode className="h-12 w-12 text-green-600" />
            </div>
          </div>
          
          <div className="flex items-center justify-center pt-2">
            <div className="h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent w-full"></div>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-green-700">
              ✓ This license is valid and registered in the APEX regulatory database
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerifyPage;
