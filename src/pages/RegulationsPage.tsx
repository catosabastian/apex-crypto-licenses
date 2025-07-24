import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Scale, 
  Shield, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Globe, 
  Clock, 
  Phone,
  Mail,
  Download,
  ExternalLink,
  BookOpen,
  Gavel,
  Building,
  Users
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const RegulationsPage = () => {
  const [activeCompliance, setActiveCompliance] = useState<string | null>(null);

  const jurisdictions = [
    { name: 'United States', status: 'Active', coverage: '50 States + DC', code: 'US' },
    { name: 'European Union', status: 'Active', coverage: '27 Member States', code: 'EU' },
    { name: 'United Kingdom', status: 'Active', coverage: 'England, Scotland, Wales, NI', code: 'UK' },
    { name: 'Canada', status: 'Active', coverage: '10 Provinces + 3 Territories', code: 'CA' },
    { name: 'Australia', status: 'Active', coverage: '6 States + 2 Territories', code: 'AU' },
    { name: 'Singapore', status: 'Active', coverage: 'Republic of Singapore', code: 'SG' },
    { name: 'Hong Kong', status: 'Active', coverage: 'Hong Kong SAR', code: 'HK' },
    { name: 'Switzerland', status: 'Active', coverage: '26 Cantons', code: 'CH' }
  ];

  const complianceRequirements = [
    {
      id: 'kyc',
      title: 'Know Your Customer (KYC)',
      description: 'Identity verification and customer due diligence',
      status: 'mandatory',
      progress: 100,
      details: [
        'Identity document verification',
        'Address confirmation',
        'Source of funds documentation',
        'Enhanced due diligence for high-risk customers'
      ]
    },
    {
      id: 'aml',
      title: 'Anti-Money Laundering (AML)',
      description: 'Policies and procedures to prevent money laundering',
      status: 'mandatory',
      progress: 100,
      details: [
        'Transaction monitoring systems',
        'Suspicious activity reporting',
        'Risk assessment frameworks',
        'Staff training programs'
      ]
    },
    {
      id: 'cft',
      title: 'Combating Financing of Terrorism (CFT)',
      description: 'Measures to prevent terrorist financing',
      status: 'mandatory',
      progress: 100,
      details: [
        'Sanctions screening',
        'Politically exposed persons (PEP) checks',
        'Terrorist financing indicators',
        'Regular compliance audits'
      ]
    },
    {
      id: 'gdpr',
      title: 'Data Protection (GDPR/CCPA)',
      description: 'Privacy and data protection compliance',
      status: 'conditional',
      progress: 85,
      details: [
        'Data minimization principles',
        'Consent management',
        'Right to erasure',
        'Data breach notification'
      ]
    }
  ];

  const legalFrameworks = [
    {
      title: 'APEX Regulatory Authority Act',
      year: '2023',
      status: 'In Force',
      description: 'Establishes APEX as the primary regulatory authority for cryptocurrency licensing',
      downloadUrl: '#'
    },
    {
      title: 'Digital Asset Licensing Regulations',
      year: '2023',
      status: 'In Force',
      description: 'Comprehensive regulations governing digital asset service providers',
      downloadUrl: '#'
    },
    {
      title: 'Cross-Border Digital Asset Guidelines',
      year: '2024',
      status: 'In Force',
      description: 'Guidelines for international cryptocurrency operations',
      downloadUrl: '#'
    },
    {
      title: 'Compliance Enforcement Protocol',
      year: '2024',
      status: 'In Force',
      description: 'Enforcement procedures and penalty frameworks',
      downloadUrl: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="flex flex-col items-center justify-center gap-6 mb-8">
            <div className="p-4 rounded-full bg-primary/10 border border-primary/20">
              <Scale className="h-12 w-12 text-primary" />
            </div>
            <div className="text-center space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                APEX Regulations
              </h1>
              <p className="text-lg text-muted-foreground">
                Comprehensive Regulatory Framework for Digital Assets
              </p>
            </div>
          </div>
          
          <Alert className="max-w-4xl mx-auto">
            <Shield className="h-4 w-4" />
            <AlertDescription className="text-left">
              <strong>Regulatory Authority:</strong> APEX operates under international regulatory frameworks, 
              providing legitimate cryptocurrency licensing services across multiple jurisdictions. 
              All licenses are legally binding and recognized by partnering regulatory bodies.
            </AlertDescription>
          </Alert>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="framework" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="framework">Legal Framework</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="jurisdictions">Jurisdictions</TabsTrigger>
            <TabsTrigger value="appeals">Appeals</TabsTrigger>
          </TabsList>

          {/* Legal Framework Tab */}
          <TabsContent value="framework" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gavel className="h-5 w-5" />
                  Regulatory Authority
                </CardTitle>
                <CardDescription>
                  APEX Regulatory Framework and Legal Foundation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Governing Legislation</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                        <span>International Digital Asset Regulation Act (IDARA)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                        <span>Cross-Border Financial Services Treaty</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                        <span>APEX Regulatory Authority Mandate</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Regulatory Powers</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-primary mt-0.5" />
                        <span>License issuance and revocation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-primary mt-0.5" />
                        <span>Compliance monitoring and enforcement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-primary mt-0.5" />
                        <span>Cross-border coordination</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {legalFrameworks.map((framework, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{framework.title}</CardTitle>
                        <CardDescription>Year: {framework.year}</CardDescription>
                      </div>
                      <Badge variant={framework.status === 'In Force' ? 'default' : 'secondary'}>
                        {framework.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{framework.description}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Document
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Compliance Requirements
                </CardTitle>
                <CardDescription>
                  Mandatory and conditional requirements for all license holders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {complianceRequirements.map((requirement) => (
                    <Card key={requirement.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              requirement.status === 'mandatory' 
                                ? 'bg-destructive/10 text-destructive' 
                                : 'bg-warning/10 text-warning'
                            }`}>
                              {requirement.status === 'mandatory' ? 
                                <AlertTriangle className="h-4 w-4" /> : 
                                <Clock className="h-4 w-4" />
                              }
                            </div>
                            <div>
                              <CardTitle className="text-lg">{requirement.title}</CardTitle>
                              <CardDescription>{requirement.description}</CardDescription>
                            </div>
                          </div>
                          <Badge variant={requirement.status === 'mandatory' ? 'destructive' : 'secondary'}>
                            {requirement.status === 'mandatory' ? 'MANDATORY' : 'CONDITIONAL'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Implementation Progress</span>
                              <span>{requirement.progress}%</span>
                            </div>
                            <Progress value={requirement.progress} className="h-2" />
                          </div>
                          
                          <Accordion type="single" collapsible>
                            <AccordionItem value={requirement.id}>
                              <AccordionTrigger>View Details</AccordionTrigger>
                              <AccordionContent>
                                <ul className="space-y-2">
                                  {requirement.details.map((detail, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm">
                                      <CheckCircle className="h-3 w-3 text-success mt-1 flex-shrink-0" />
                                      <span>{detail}</span>
                                    </li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Jurisdictions Tab */}
          <TabsContent value="jurisdictions" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Jurisdictional Coverage
                </CardTitle>
                <CardDescription>
                  Countries and regions where APEX licenses are recognized
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {jurisdictions.map((jurisdiction, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold text-primary">{jurisdiction.code}</span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm">{jurisdiction.name}</h3>
                              <p className="text-xs text-muted-foreground">{jurisdiction.coverage}</p>
                            </div>
                          </div>
                          <Badge variant="default" className="text-xs">
                            {jurisdiction.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appeals Tab */}
          <TabsContent value="appeals" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Appeals Process
                </CardTitle>
                <CardDescription>
                  Dispute resolution and appeals procedures
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Accordion type="single" collapsible>
                  <AccordionItem value="initial-review">
                    <AccordionTrigger>Initial Review Process</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        All appeals begin with an initial review by the APEX Appeals Department.
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-success mt-1" />
                          <span>Submit appeal within 30 days of decision</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-success mt-1" />
                          <span>Provide detailed grounds for appeal</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-success mt-1" />
                          <span>Include supporting documentation</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="tribunal">
                    <AccordionTrigger>Independent Tribunal</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        If the initial review is unsuccessful, appeals proceed to an independent tribunal.
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-success mt-1" />
                          <span>Independent panel of legal and industry experts</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-success mt-1" />
                          <span>Right to legal representation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-success mt-1" />
                          <span>Oral hearings available upon request</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="judicial">
                    <AccordionTrigger>Judicial Review</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Final appeals may be subject to judicial review in competent courts.
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-success mt-1" />
                          <span>Review on points of law only</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-success mt-1" />
                          <span>Must demonstrate legal error or procedural irregularity</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-success mt-1" />
                          <span>Time limits apply for judicial review applications</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Appeals Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>appeals@apexregulations.org</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>+1 (555) 123-APEX (2739)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span>APEX Appeals Department, 123 Regulatory Plaza, Suite 500</span>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default RegulationsPage;