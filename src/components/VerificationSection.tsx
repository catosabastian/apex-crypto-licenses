import { Shield, Search, Clock, Check, ArrowRight, QrCode } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const VerificationSection = () => {
  const [licenseId, setLicenseId] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = () => {
    // In a real application, this would make an API call to verify the license
    // For demo purposes, we'll just simulate a successful verification
    setIsVerified(true);
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
            <Dialog>
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
                </div>
                <DialogFooter>
                  <Button onClick={handleVerify}>Verify License</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-4">
            <Card className="license-card w-full max-w-md overflow-hidden relative">
              <div className="flex items-center justify-between p-4 bg-primary">
                <div className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-white" />
                  <h3 className="text-lg font-bold text-white">APEX CRYPTO LICENSE</h3>
                </div>
                <Badge className="bg-accent border-0">VALID</Badge>
              </div>
              
              <CardContent className="p-6 relative">
                <div className="stamp">VERIFIED</div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm text-muted-foreground">License Holder</h4>
                    <p className="font-semibold">Thomas A. Anderson</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm text-muted-foreground">License Type</h4>
                      <p className="font-semibold">Category 2 - Advanced</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-muted-foreground">License ID</h4>
                      <p className="font-semibold">CL-2023-8294-T2</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm text-muted-foreground">Issue Date</h4>
                      <p className="font-semibold">01/15/2023</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-muted-foreground">Expiry Date</h4>
                      <p className="font-semibold">01/15/2024</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-muted-foreground">Trading Platforms</h4>
                    <p className="font-semibold">Binance, Kraken, Coinbase</p>
                  </div>
                  
                  <div className="pt-4 flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">Verify at verify.apexcrypto.auth</div>
                    <div className="border border-black h-16 w-16 flex items-center justify-center">
                      <QrCode className="h-12 w-12" />
                    </div>
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
