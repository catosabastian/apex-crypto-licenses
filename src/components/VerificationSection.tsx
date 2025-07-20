import { Shield, Search, Clock, Check, ArrowRight, QrCode, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useState } from 'react';
import { isValidLicense, sampleLicense } from '@/utils/licenseData';
import { toast } from '@/components/ui/use-toast';

const VerificationSection = () => {
  const [licenseId, setLicenseId] = useState('');
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleVerify = () => {
    if (!licenseId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a license ID",
        variant: "destructive",
      });
      return;
    }

    const verified = isValidLicense(licenseId.trim());
    setIsVerified(verified);
    
    if (verified) {
      toast({
        title: "License Verified",
        description: "The license is valid and in our database.",
      });
    } else {
      toast({
        title: "Verification Failed",
        description: "This license ID was not found in our database.",
        variant: "destructive",
      });
    }
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setIsVerified(null);
      setLicenseId('');
    }
  };

  return (
    <section id="verification" className="py-20 bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 w-12 bg-primary"></div>
            <span className="text-sm text-muted-foreground uppercase tracking-wider">Verification Process</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Rigorous Verification Standards
          </h2>
          
          <p className="text-lg text-muted-foreground mb-10">
            Our comprehensive verification process ensures only qualified traders receive official licensing, maintaining the integrity of the regulatory framework.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <VerificationCard 
              icon={<Shield className="h-6 w-6" />}
              title="Identity Verification"
              description="Secure multi-factor identity verification using governmental databases and biometric verification systems."
            />
            
            <VerificationCard 
              icon={<Search className="h-6 w-6" />}
              title="Trading History Analysis"
              description="Comprehensive review of trading history, volume, and patterns to determine appropriate licensing category."
            />
            
            <VerificationCard 
              icon={<Clock className="h-6 w-6" />}
              title="Compliance Review"
              description="Assessment of trading practices against regulatory standards to ensure alignment with legal requirements."
            />
          </div>
          
          <div className="bg-muted/30 border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Verification Timeline</h3>
            
            <div className="space-y-6">
              <VerificationStep 
                number={1}
                title="Application Submission"
                description="Complete the application form with all required documentation and submit payment."
                badge="Day 1"
                isCompleted={true}
              />
              
              <VerificationStep 
                number={2}
                title="Initial Review"
                description="Our system performs automated checks on submitted information and documentation."
                badge="Day 1"
                isCompleted={true}
              />
              
              <VerificationStep 
                number={3}
                title="Detailed Verification"
                description="Our compliance team manually reviews your application, trading history, and identity documentation."
                badge="Day 2"
                isCompleted={false}
              />
              
              <VerificationStep 
                number={4}
                title="License Issuance"
                description="Upon successful verification, your official license is generated and sent via email."
                badge="Day 3"
                isCompleted={false}
              />
            </div>
          </div>
          
          <div className="mt-12">
            <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
              <DialogTrigger asChild>
                <Button className="mx-auto block">Verify a License</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>License Verification</DialogTitle>
                  <DialogDescription>
                    Enter the license ID to verify its authenticity.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="licenseId" className="text-right">
                      License ID
                    </Label>
                    <Input 
                      id="licenseId" 
                      value={licenseId} 
                      onChange={(e) => setLicenseId(e.target.value)} 
                      placeholder="e.g. CL-2023-8294-T2"
                      className="col-span-3"
                    />
                  </div>
                  
                  {isVerified !== null && (
                    <Alert variant={isVerified ? "default" : "destructive"} className={isVerified ? "bg-green-50 border-green-200" : ""}>
                      <div className="flex items-center gap-2">
                        {isVerified ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                        <AlertDescription>
                          {isVerified ? "License verified successfully." : "License verification failed. No matching license found."}
                        </AlertDescription>
                      </div>
                    </Alert>
                  )}
                </div>
                <DialogFooter>
                  <Button onClick={handleVerify} type="button">Verify License</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-4">
            <Card className="license-card w-full max-w-md relative">
              <div className="watermark">APEX</div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary to-accent">
                <div className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-white" />
                  <h3 className="text-lg font-bold text-white">APEX CRYPTO LICENSE</h3>
                </div>
                <Badge className="bg-white/20 text-white border-white/30">VERIFIED</Badge>
              </div>
              
              <CardContent className="p-6 content">
                <div className="stamp">AUTHENTIC</div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm text-muted-foreground">License Holder</h4>
                      <p className="font-bold text-lg">{sampleLicense.holder}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <h4 className="text-xs text-muted-foreground uppercase tracking-wider">Category</h4>
                      <p className="font-bold text-primary">{sampleLicense.type}</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <h4 className="text-xs text-muted-foreground uppercase tracking-wider">License ID</h4>
                      <p className="font-bold font-mono text-sm">{sampleLicense.id}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs text-muted-foreground uppercase tracking-wider">Issue Date</h4>
                      <p className="font-semibold">{sampleLicense.issueDate}</p>
                    </div>
                    <div>
                      <h4 className="text-xs text-muted-foreground uppercase tracking-wider">Expiry Date</h4>
                      <p className="font-semibold">{sampleLicense.expiryDate}</p>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20">
                    <h4 className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Authorized Platforms</h4>
                    <p className="font-medium text-sm">{sampleLicense.platforms}</p>
                  </div>
                  
                  <div className="pt-4 flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      <p>Verify at:</p>
                      <p className="font-mono">verify.apexcrypto.auth</p>
                    </div>
                    <div className="qr-section">
                      <QrCode className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center pt-2">
                    <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent w-full"></div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">
                      This license is valid and registered in the APEX regulatory database
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

interface VerificationCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const VerificationCard = ({ icon, title, description }: VerificationCardProps) => {
  return (
    <div className="bg-card p-6 rounded-lg border shadow-sm">
      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

interface VerificationStepProps {
  number: number;
  title: string;
  description: string;
  badge: string;
  isCompleted: boolean;
}

const VerificationStep = ({ number, title, description, badge, isCompleted }: VerificationStepProps) => {
  return (
    <div className="flex gap-4">
      <div className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${isCompleted ? 'bg-primary text-white' : 'bg-muted border'}`}>
        {isCompleted ? <Check className="h-4 w-4" /> : number}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-semibold">{title}</h4>
          <Badge variant="secondary">{badge}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        
        <Separator className="mt-4" />
      </div>
    </div>
  );
};

export default VerificationSection;
