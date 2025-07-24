import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, XCircle, Search, Shield, Clock, FileText, Copy, QrCode, Globe, Calendar, Award, Lock, Database, Users } from 'lucide-react';
import { toast } from 'sonner';
import { supabaseDataManager } from '@/utils/supabaseDataManager';
import QRCode from 'react-qr-code';
import LicenseCard from '@/components/LicenseCard';

const VerifyPage = () => {
  const [licenseId, setLicenseId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  
  const sampleLicense = {
    id: 'CTL-2024-001',
    holder_name: 'APEX Digital Trading Ltd.',
    license_type: 'Tier 3 - Institutional Trading',
    issue_date: '2024-01-15',
    expiry_date: '2025-01-15',
    status: 'active',
    platforms: 'Exchange, Wallet, Trading Platform'
  };

  const handleVerify = async () => {
    if (!licenseId.trim()) {
      toast.error('Please enter a license ID');
      return;
    }
    
    setIsVerifying(true);
    
    try {
      const result = await supabaseDataManager.verifyLicense(licenseId);
      setVerificationResult(result);
      
      if (result) {
        toast.success('License verified successfully!');
        setVerificationResult({ isValid: true, license: result });
      } else {
        toast.error('License not found or invalid');
        setVerificationResult({ isValid: false });
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Verification failed. Please try again.');
      setVerificationResult({ isValid: false });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSampleVerify = (sampleId: string) => {
    setLicenseId(sampleId);
    setTimeout(() => handleVerify(), 100);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('License ID copied to clipboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Helmet>
        <title>Official License Verification Portal - APEX Global</title>
        <meta name="description" content="Official government-grade license verification system. Verify cryptocurrency trading licenses issued by APEX Global with our secure database." />
        <meta name="keywords" content="license verification, crypto license check, trading license validity, official verification" />
      </Helmet>
      
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.15)_1px,_transparent_0)] bg-[length:20px_20px] opacity-20"></div>
          <div className="container relative mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className="mb-8">
                <Badge variant="outline" className="mb-4 px-4 py-2 bg-background/50 backdrop-blur-sm">
                  <Lock className="w-4 h-4 mr-2" />
                  Official Verification Portal
                </Badge>
              </div>
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <Shield className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                License Verification Portal
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Official government-grade verification system for cryptocurrency trading licenses. 
                Our secure database ensures authentic license validation with real-time status checking.
              </p>
              <div className="flex justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-primary" />
                  <span>Real-time Database</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Secure Verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Instant Results</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Features */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Verification Security Features</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="text-center border-primary/20 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <Database className="w-12 h-12 text-primary mx-auto mb-4" />
                    <CardTitle>Real-time Database</CardTitle>
                    <CardDescription>
                      Connected to live licensing database for instant verification
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="text-center border-primary/20 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
                    <CardTitle>Encrypted Security</CardTitle>
                    <CardDescription>
                      All verification requests are encrypted and secure
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="text-center border-primary/20 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                    <CardTitle>Public Access</CardTitle>
                    <CardDescription>
                      Open verification system for transparency and trust
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Verification Form */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card className="shadow-2xl border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
                <CardHeader className="text-center bg-gradient-to-r from-primary/10 to-accent/10 border-b border-primary/20">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-3xl font-bold">Official License Verification</CardTitle>
                  <CardDescription className="text-lg">
                    Enter the license ID to verify its authenticity and view detailed information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-8">
                  <div className="space-y-3">
                    <Label htmlFor="licenseId" className="text-lg font-medium">License ID</Label>
                    <Input
                      id="licenseId"
                      type="text"
                      placeholder="Enter license ID (e.g., CTL-2024-001)"
                      value={licenseId}
                      onChange={(e) => setLicenseId(e.target.value)}
                      className="text-lg h-12 border-2 border-primary/20 focus:border-primary"
                    />
                    <p className="text-sm text-muted-foreground">
                      License IDs are case-sensitive. Please enter the exact ID as shown on your certificate.
                    </p>
                  </div>
                  <Button 
                    onClick={handleVerify} 
                    className="w-full h-12" 
                    size="lg"
                    disabled={!licenseId.trim() || isVerifying}
                  >
                    {isVerifying ? (
                      <>
                        <Clock className="mr-2 h-5 w-5 animate-spin" />
                        Verifying License...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-5 w-5" />
                        Verify License
                      </>
                    )}
                  </Button>

                  {/* Verification Results */}
                  {verificationResult && (
                    <Card className="mt-8 border-2 border-primary/20">
                      <CardContent className="pt-8">
                        {verificationResult.isValid ? (
                          <div className="text-center space-y-6">
                            <div className="flex items-center justify-center gap-3">
                              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="h-8 w-8 text-green-600" />
                              </div>
                              <div>
                                <h3 className="text-3xl font-bold text-green-600">License Verified</h3>
                                <p className="text-lg text-muted-foreground">This license is valid and authentic</p>
                              </div>
                            </div>
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                              <div className="flex items-center justify-center gap-2 text-green-700">
                                <Shield className="w-5 h-5" />
                                <span className="font-medium">Verified by APEX Global Official Database</span>
                              </div>
                            </div>
                            {verificationResult.license && (
                              <div className="mt-8">
                                <h4 className="text-xl font-semibold mb-6">Official License Certificate</h4>
                                <LicenseCard license={verificationResult.license} />
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-center space-y-6">
                            <div className="flex items-center justify-center gap-3">
                              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                <XCircle className="h-8 w-8 text-red-600" />
                              </div>
                              <div>
                                <h3 className="text-3xl font-bold text-red-600">License Not Found</h3>
                                <p className="text-lg text-muted-foreground">Invalid or non-existent license ID</p>
                              </div>
                            </div>
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                              <p className="text-red-700 font-medium">
                                The license ID you entered could not be found in our official database.
                              </p>
                              <p className="text-red-600 text-sm mt-2">
                                Please verify the license ID is correct and try again.
                              </p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Sample License */}
        <section className="py-20 bg-gradient-to-br from-muted/50 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-6">Sample Verified License</h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Experience our verification system with this sample license. See how authenticated licenses 
                  appear with our secure certificate display and verification features.
                </p>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => handleSampleVerify(sampleLicense.id)}
                  className="mb-8 px-8 py-3 text-lg"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Verify Sample License: {sampleLicense.id}
                </Button>
              </div>
              <div className="max-w-3xl mx-auto">
                <LicenseCard license={sampleLicense} />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-16">How Our Verification System Works</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Enter License ID</h3>
                  <p className="text-primary-foreground/80 leading-relaxed">
                    Input the unique license identifier found on your official certificate. 
                    Our system accepts all APEX Global license formats.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Secure Database Query</h3>
                  <p className="text-primary-foreground/80 leading-relaxed">
                    Our encrypted system securely queries the official government-grade 
                    licensing database for real-time verification.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Instant Verification</h3>
                  <p className="text-primary-foreground/80 leading-relaxed">
                    Receive immediate verification results with detailed license information, 
                    status, and official certificate display.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default VerifyPage;