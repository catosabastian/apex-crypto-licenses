
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, Search, CheckCircle2, AlertCircle, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VerificationSection = () => {
  const [licenseId, setLicenseId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<"success" | "error" | null>(null);
  const { toast } = useToast();

  // Mock license database
  const validLicenses = [
    { id: "APEX-12345-BTC", name: "John Smith", type: "Individual Trader", expiry: "2024-11-30" },
    { id: "APEX-67890-ETH", name: "Sarah Johnson", type: "Advanced Trader", expiry: "2024-12-15" },
    { id: "APEX-54321-XRP", name: "Crypto Ventures LLC", type: "Institutional Trader", expiry: "2025-01-10" }
  ];

  const handleVerify = () => {
    if (!licenseId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a license ID",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);

    // Simulate API call
    setTimeout(() => {
      const foundLicense = validLicenses.find(license => 
        license.id.toLowerCase() === licenseId.toLowerCase()
      );
      
      setVerificationResult(foundLicense ? "success" : "error");
      setIsVerifying(false);
    }, 1500);
  };

  const resetVerification = () => {
    setLicenseId("");
    setVerificationResult(null);
  };

  return (
    <section id="verification" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-base px-4 py-1">Verification Portal</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Verify License Authenticity</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enter a license ID to verify its authenticity and current status within our regulatory database.
            </p>
          </div>

          {!verificationResult ? (
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-6">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="licenseId">License Verification ID</Label>
                    <Input
                      id="licenseId"
                      placeholder="e.g., APEX-12345-BTC"
                      value={licenseId}
                      onChange={(e) => setLicenseId(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      Enter the unique ID found on the cryptocurrency trading license
                    </p>
                  </div>
                  <Button 
                    className="w-full md:w-auto md:ml-auto gap-2" 
                    disabled={isVerifying}
                    onClick={handleVerify}
                  >
                    {isVerifying ? "Verifying..." : "Verify License"}
                    {!isVerifying && <Search className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : verificationResult === "success" ? (
            <Card className="max-w-3xl mx-auto border-green-500/50 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6 text-green-600">
                  <CheckCircle2 className="h-6 w-6" />
                  <h3 className="text-xl font-semibold">License Verified Successfully</h3>
                </div>

                <div className="grid md:grid-cols-5 gap-6">
                  <div className="md:col-span-3 space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">License ID</p>
                      <p className="font-medium">{validLicenses[0].id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">License Holder</p>
                      <p className="font-medium">{validLicenses[0].name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">License Type</p>
                      <p className="font-medium">{validLicenses[0].type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Expiry Date</p>
                      <p className="font-medium">{validLicenses[0].expiry}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Verification Status</p>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <p className="font-medium text-green-600">Active and Valid</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Verification</p>
                      <p className="font-medium">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="md:col-span-2 flex flex-col justify-center items-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="bg-muted/50 p-4 rounded-lg border cursor-pointer hover:bg-muted transition-colors">
                          <div className="aspect-square relative flex items-center justify-center">
                            <QrCode className="h-24 w-24 text-primary" />
                            <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-md opacity-0 hover:opacity-100 transition-opacity">
                              <p className="text-xs font-medium">View License</p>
                            </div>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Apex Crypto License</DialogTitle>
                          <DialogDescription>Official trading license #{validLicenses[0].id}</DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col items-center p-4">
                          <div className="bg-white p-5 rounded-lg mb-4">
                            <QrCode size={200} className="text-black" />
                          </div>
                          <p className="text-center text-sm text-muted-foreground">
                            Scan this QR code to verify license #{validLicenses[0].id}
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <p className="text-xs text-muted-foreground mt-2">Click to view license</p>
                  </div>
                </div>

                <div className="border-t pt-4 mt-6 flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    This license has been verified against our regulatory compliance database
                  </p>
                  <Button variant="outline" size="sm" onClick={resetVerification}>
                    Verify Another
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="max-w-2xl mx-auto border-red-500/50 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6 text-red-600">
                  <AlertCircle className="h-6 w-6" />
                  <h3 className="text-xl font-semibold">License Verification Failed</h3>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  We couldn't verify license ID "{licenseId}". Please check the ID and try again.
                </p>
                
                <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                  <p className="text-sm text-red-800">
                    If you believe this is an error, please contact our support team for assistance.
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline" onClick={resetVerification}>
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="max-w-3xl mx-auto mt-16">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card rounded-lg border p-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Fast Verification</h3>
                <p className="text-sm text-muted-foreground">
                  Our verification system confirms license status in real-time with immediate results.
                </p>
              </div>
              
              <div className="bg-card rounded-lg border p-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Global Recognition</h3>
                <p className="text-sm text-muted-foreground">
                  All licenses are recognized by major exchanges and regulatory authorities worldwide.
                </p>
              </div>
              
              <div className="bg-card rounded-lg border p-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <ArrowRight className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Quick Application</h3>
                <p className="text-sm text-muted-foreground">
                  Apply today and receive your license in just 3 business days after approval.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerificationSection;
