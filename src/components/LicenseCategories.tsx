
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ChevronRight, CreditCard, MessageSquareText } from 'lucide-react';
import { useApplicationDialog } from '@/components/ApplicationDialog';

const LicenseCategories = () => {
  const { openApplicationDialog } = useApplicationDialog();
  
  return (
    <section id="licenses" className="py-20 bg-muted/30">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 w-12 bg-primary"></div>
            <span className="text-sm text-muted-foreground uppercase tracking-wider">License Categories</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Regulatory Licensing Categories
              </h2>
              <p className="text-lg text-muted-foreground mt-2">
                Select the appropriate license category based on your trading volume and activity.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <LicenseCategory 
              category={1}
              title="Individual Trader"
              price="20,000 USDT"
              minVolume="$50,000"
              features={[
                "1-year validity period",
                "Individual trader verification",
                "Basic compliance certification",
                "Standard support response",
                "Recognized on all exchanges"
              ]}
              onApplyClick={openApplicationDialog}
            />
            
            <LicenseCategory 
              category={2}
              title="Advanced Trader"
              price="40,000 USDT"
              minVolume="$250,000"
              features={[
                "1-year validity period",
                "Priority verification process",
                "Advanced compliance certification",
                "24/7 support response",
                "Recognized on all exchanges",
                "Trading strategy protection"
              ]}
              popular
              onApplyClick={openApplicationDialog}
            />
            
            <LicenseCategory 
              category={3}
              title="Institutional Trader"
              price="70,000 USDT"
              minVolume="$1,000,000+"
              features={[
                "1-year validity period",
                "Expedited verification process",
                "Comprehensive compliance certification",
                "Dedicated account representative",
                "Global regulatory recognition",
                "Trading strategy protection",
                "Multi-user access controls"
              ]}
              onApplyClick={openApplicationDialog}
            />
          </div>
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquareText className="h-5 w-5" />
                Enterprise Solution
              </CardTitle>
              <CardDescription>For corporate entities and institutional clients requiring customized licensing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Corporate entity verification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Custom compliance framework</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Dedicated legal advisors</span>
                  </div>
                </div>
                <Button variant="outline" className="gap-2" onClick={openApplicationDialog}>
                  Contact Support
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

interface LicenseCategoryProps {
  category: number;
  title: string;
  price: string;
  minVolume: string;
  features: string[];
  popular?: boolean;
  onApplyClick: () => void;
}

const LicenseCategory = ({ category, title, price, minVolume, features, popular, onApplyClick }: LicenseCategoryProps) => {
  return (
    <Card className={`relative h-full ${popular ? 'border-accent shadow-lg' : ''}`}>
      {popular && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <Badge variant="secondary" className="bg-accent text-white border-0">Recommended</Badge>
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="mb-2">Category {category}</Badge>
          {popular && <CheckCircle className="h-5 w-5 text-accent" />}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Monthly Volume: {minVolume} minimum</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="mb-6">
          <div className="text-3xl font-bold">{price}</div>
          <p className="text-sm text-muted-foreground">1-year license validity</p>
        </div>
        
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary mt-1 shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button className="w-full gap-2" variant={popular ? "default" : "outline"} onClick={onApplyClick}>
          Apply Now
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LicenseCategories;
