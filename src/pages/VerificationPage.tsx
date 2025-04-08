
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Search, XCircle, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const VerificationPage = () => {
  const [licenseId, setLicenseId] = useState("");
  const [verificationStatus, setVerificationStatus] = useState<null | "valid" | "invalid" | "processing">(null);
  const [verificationDetails, setVerificationDetails] = useState<any>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!licenseId.trim()) return;
    
    // For demo purposes, specific IDs will return different statuses
    if (licenseId === "GCCA-123456") {
      setVerificationStatus("valid");
      setVerificationDetails({
        name: "John Smith Trading LLC",
        type: "Tier 2 License",
        issuedDate: "2024-03-15",
        expiryDate: "2025-03-14",
        tradingVolume: "$250,000 monthly",
        status: "Active",
      });
    } else if (licenseId === "GCCA-654321") {
      setVerificationStatus("processing");
      setVerificationDetails({
        name: "Crypto Investments Inc.",
        type: "Tier 1 License",
        issuedDate: "2024-04-01",
        status: "Payment Verification",
      });
    } else {
      setVerificationStatus("invalid");
      setVerificationDetails(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container">
          <div className="max-w-3xl mx-auto mb-10 text-center">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm mb-4">
              <Shield className="h-4 w-4" />
              <span>Trust & Verification</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-5">Verify License Authenticity</h1>
            
            <p className="text-lg text-muted-foreground">
              Enter the license ID to instantly verify if it's an authentic certificate issued by the Global Crypto Compliance Authority.
            </p>
          </div>
          
          <Card className="max-w-2xl mx-auto shadow-sm">
            <CardHeader>
              <CardTitle>License Verification Portal</CardTitle>
              <CardDescription>Enter the full license ID (format: GCCA-XXXXXX)</CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleVerify} className="flex gap-3">
                <Input
                  placeholder="Enter license ID (e.g. GCCA-123456)"
                  value={licenseId}
                  onChange={(e) => setLicenseId(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" className="gap-2">
                  <Search className="h-4 w-4" />
                  Verify
                </Button>
              </form>
              
              {verificationStatus && (
                <div className="mt-8">
                  {verificationStatus === "valid" && (
                    <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <h3 className="text-lg font-semibold text-green-700">Valid License</h3>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between border-b border-green-200 pb-2">
                          <span className="font-medium">License Holder:</span>
                          <span>{verificationDetails.name}</span>
                        </div>
                        <div className="flex justify-between border-b border-green-200 pb-2">
                          <span className="font-medium">License Type:</span>
                          <span>{verificationDetails.type}</span>
                        </div>
                        <div className="flex justify-between border-b border-green-200 pb-2">
                          <span className="font-medium">Issued Date:</span>
                          <span>{verificationDetails.issuedDate}</span>
                        </div>
                        <div className="flex justify-between border-b border-green-200 pb-2">
                          <span className="font-medium">Expiry Date:</span>
                          <span>{verificationDetails.expiryDate}</span>
                        </div>
                        <div className="flex justify-between border-b border-green-200 pb-2">
                          <span className="font-medium">Trading Volume:</span>
                          <span>{verificationDetails.tradingVolume}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Current Status:</span>
                          <span className="text-green-700 font-medium">{verificationDetails.status}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {verificationStatus === "processing" && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <Clock className="h-5 w-5 text-amber-600" />
                        <h3 className="text-lg font-semibold text-amber-700">License Processing</h3>
                      </div>
                      
                      <p className="text-amber-700 mb-4">This license application is currently being processed.</p>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between border-b border-amber-200 pb-2">
                          <span className="font-medium">Applicant Name:</span>
                          <span>{verificationDetails.name}</span>
                        </div>
                        <div className="flex justify-between border-b border-amber-200 pb-2">
                          <span className="font-medium">License Type:</span>
                          <span>{verificationDetails.type}</span>
                        </div>
                        <div className="flex justify-between border-b border-amber-200 pb-2">
                          <span className="font-medium">Application Date:</span>
                          <span>{verificationDetails.issuedDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Current Stage:</span>
                          <span className="text-amber-700 font-medium">{verificationDetails.status}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {verificationStatus === "invalid" && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                      <div className="flex items-center gap-3">
                        <XCircle className="h-5 w-5 text-red-600" />
                        <h3 className="text-lg font-semibold text-red-700">Invalid License ID</h3>
                      </div>
                      
                      <p className="mt-2 text-red-700">
                        The license ID you entered does not match any records in our system. Please verify the ID and try again.
                      </p>
                      
                      <div className="mt-4 text-sm text-red-600">
                        <p>For testing, try these IDs:</p>
                        <ul className="list-disc list-inside mt-1">
                          <li>GCCA-123456 (Valid license)</li>
                          <li>GCCA-654321 (Processing license)</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col items-start">
              <p className="text-xs text-muted-foreground">
                All licenses can be verified 24/7 through this portal. For additional verification methods, 
                contact our support team at verify@gcca.global
              </p>
            </CardFooter>
          </Card>
          
          <div className="max-w-2xl mx-auto mt-8 bg-muted/50 rounded-lg p-5 border border-border">
            <h3 className="font-semibold mb-2">Why Verify?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              License verification is essential for ensuring you're dealing with compliant traders. Counterparties, exchanges, and financial institutions often require verification before engaging in significant transactions.
            </p>
            
            <h3 className="font-semibold mb-2">Verification Methods</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Online portal verification (fastest)</li>
              <li>QR code scanning from physical or digital certificates</li>
              <li>Email verification requests to compliance@gcca.global</li>
              <li>API access for institutional partners</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VerificationPage;
