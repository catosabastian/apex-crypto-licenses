import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - APEX Crypto Licensing</title>
        <meta name="description" content="Privacy Policy for APEX Crypto Licensing - How we collect, use, and protect your personal information." />
      </Helmet>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto py-8 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-lg border p-6 md:p-8">
              <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-foreground">Privacy Policy</h1>
              <p className="text-xs md:text-sm text-muted-foreground mb-6 md:mb-8">Last updated: {new Date().toLocaleDateString()}</p>
              
              <div className="space-y-6 md:space-y-8 text-foreground">
                <section className="border-b pb-6 mb-6">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">1. Information We Collect</h2>
                  <p className="mb-4 text-sm md:text-base leading-relaxed">
                    APEX Crypto Licensing ("we," "our," or "us") collects information necessary to provide cryptocurrency licensing services and ensure regulatory compliance. We collect the following categories of information:
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold mb-3 text-sm md:text-base">Personal Information:</h3>
                    <ul className="list-disc pl-6 mb-4 space-y-1 text-sm">
                      <li>Full legal name, date of birth, and nationality</li>
                      <li>Contact information (email address, phone number, physical address)</li>
                      <li>Government-issued identification documents (passport, driver's license)</li>
                      <li>Professional qualifications and employment history</li>
                      <li>Financial status and source of funds documentation</li>
                    </ul>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold mb-3 text-sm md:text-base">Business Information:</h3>
                    <ul className="list-disc pl-6 mb-4 space-y-1 text-sm">
                      <li>Company registration details and corporate structure</li>
                      <li>Trading volume, transaction history, and business model</li>
                      <li>Anti-money laundering (AML) and Know Your Customer (KYC) documentation</li>
                      <li>Financial statements and audit reports</li>
                      <li>Details of directors, shareholders, and beneficial owners</li>
                    </ul>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3 text-sm md:text-base">Technical Information:</h3>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>IP address, browser type, and device information</li>
                      <li>Website usage patterns and navigation data</li>
                      <li>Cookies and similar tracking technologies</li>
                      <li>Login credentials and session information</li>
                    </ul>
                  </div>
                </section>

                <section className="border-b pb-6 mb-6">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">2. How We Use Your Information</h2>
                  <p className="mb-4 text-sm md:text-base leading-relaxed">We process your personal information for the following purposes based on legitimate business interests and legal requirements:</p>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base">License Processing:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs">
                        <li>Application review and assessment</li>
                        <li>Due diligence and background checks</li>
                        <li>Regulatory compliance verification</li>
                        <li>License issuance and maintenance</li>
                      </ul>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base">Communication:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs">
                        <li>Application status updates</li>
                        <li>Regulatory change notifications</li>
                        <li>License renewal reminders</li>
                        <li>Customer support services</li>
                      </ul>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base">Legal Compliance:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs">
                        <li>Anti-money laundering (AML) requirements</li>
                        <li>Know Your Customer (KYC) procedures</li>
                        <li>Regulatory reporting obligations</li>
                        <li>Court orders and legal requests</li>
                      </ul>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base">Security & Fraud Prevention:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs">
                        <li>Identity verification and authentication</li>
                        <li>Suspicious activity monitoring</li>
                        <li>System security and integrity</li>
                        <li>Risk assessment and management</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="border-b pb-6 mb-6">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">3. Information Sharing and Disclosure</h2>
                  <p className="mb-4 text-sm md:text-base leading-relaxed">
                    We may share your personal information in the following circumstances, always in accordance with applicable data protection laws:
                  </p>
                  <div className="space-y-4">
                    <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2 text-sm md:text-base text-red-800 dark:text-red-200">Regulatory and Legal Requirements:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs text-red-700 dark:text-red-300">
                        <li>Financial regulatory authorities (SEC, CFTC, FinCEN, etc.)</li>
                        <li>Tax authorities and revenue services</li>
                        <li>Law enforcement agencies upon lawful request</li>
                        <li>Court orders, subpoenas, and legal proceedings</li>
                        <li>Anti-money laundering compliance organizations</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2 text-sm md:text-base text-blue-800 dark:text-blue-200">Service Providers:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs text-blue-700 dark:text-blue-300">
                        <li>Payment processors and financial institutions</li>
                        <li>Identity verification and KYC service providers</li>
                        <li>Legal and compliance consulting firms</li>
                        <li>IT services and cloud hosting providers</li>
                        <li>Document storage and management services</li>
                      </ul>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2 text-sm md:text-base text-amber-800 dark:text-amber-200">Business Transfers:</h3>
                      <p className="text-xs text-amber-700 dark:text-amber-300">In the event of merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.</p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-xs md:text-sm font-semibold text-green-800 dark:text-green-200">
                      We do NOT sell, rent, or trade your personal information to third parties for marketing purposes.
                    </p>
                  </div>
                </section>

                <section className="border-b pb-6 mb-6">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">4. Data Security and Protection</h2>
                  <p className="mb-4 text-sm md:text-base leading-relaxed">
                    We implement comprehensive security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <h3 className="font-semibold mb-2 text-sm">Technical Safeguards:</h3>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>AES-256 encryption for data at rest</li>
                          <li>TLS 1.3 encryption for data in transit</li>
                          <li>Multi-factor authentication (MFA)</li>
                          <li>Regular security audits and penetration testing</li>
                          <li>Intrusion detection and prevention systems</li>
                        </ul>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <h3 className="font-semibold mb-2 text-sm">Physical Safeguards:</h3>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Secure data centers with biometric access</li>
                          <li>24/7 physical security monitoring</li>
                          <li>Environmental controls and fire suppression</li>
                          <li>Secure document storage and destruction</li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <h3 className="font-semibold mb-2 text-sm">Administrative Safeguards:</h3>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>Role-based access controls</li>
                          <li>Regular employee security training</li>
                          <li>Background checks for all staff</li>
                          <li>Incident response and breach notification procedures</li>
                          <li>Data retention and disposal policies</li>
                        </ul>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <h3 className="font-semibold mb-2 text-sm">Compliance Standards:</h3>
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          <li>ISO 27001 certified security management</li>
                          <li>SOC 2 Type II compliance</li>
                          <li>GDPR and CCPA compliance frameworks</li>
                          <li>Regular third-party security assessments</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="border-b pb-6 mb-6">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">5. Your Rights and Choices</h2>
                  <p className="mb-4 text-sm md:text-base leading-relaxed">Under applicable data protection laws (GDPR, CCPA, etc.), you have the following rights:</p>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base">Access and Portability:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs">
                        <li>Request a copy of your personal data</li>
                        <li>Obtain data in a portable format</li>
                        <li>Transfer data to another service provider</li>
                      </ul>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base">Correction and Deletion:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs">
                        <li>Correct inaccurate or incomplete data</li>
                        <li>Request deletion (right to be forgotten)</li>
                        <li>Restrict processing in certain circumstances</li>
                      </ul>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base">Communication Preferences:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs">
                        <li>Opt-out of marketing communications</li>
                        <li>Update contact preferences</li>
                        <li>Withdraw consent where applicable</li>
                      </ul>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base">Legal Protections:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs">
                        <li>Object to processing for legitimate interests</li>
                        <li>File complaints with supervisory authorities</li>
                        <li>Seek judicial remedies</li>
                      </ul>
                    </div>
                  </div>
                  <div className="text-xs bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 rounded">
                    <strong>Important:</strong> Some rights may be limited by legal and regulatory requirements, particularly in financial services. We will inform you of any limitations when you make a request.
                  </div>
                </section>

                <section className="border-b pb-6 mb-6">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">6. Data Retention</h2>
                  <p className="mb-4 text-sm md:text-base leading-relaxed">We retain personal information for different periods based on the purpose and legal requirements:</p>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <ul className="space-y-2 text-xs">
                      <li><strong>Active licenses:</strong> Duration of license plus 2 years after expiration</li>
                      <li><strong>Financial records:</strong> 3 years from transaction date</li>
                      <li><strong>Website analytics:</strong> 26 months maximum</li>
                      <li><strong>Marketing data:</strong> Until opt-out or 3 years of inactivity</li>
                    </ul>
                  </div>
                </section>

                <section className="border-b pb-6 mb-6">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">7. International Transfers</h2>
                  <p className="mb-4 text-sm md:text-base leading-relaxed">Your data may be transferred to and processed in countries outside your residence. We ensure appropriate safeguards through:</p>
                  <ul className="list-disc pl-6 space-y-1 text-xs mb-4">
                    <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
                    <li>Adequacy decisions for countries with equivalent data protection</li>
                    <li>Binding Corporate Rules for intra-group transfers</li>
                    <li>Industry certification programs and codes of conduct</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">8. Contact Information</h2>
                  <p className="mb-4 text-sm md:text-base leading-relaxed">
                    For questions about this Privacy Policy or to exercise your rights, contact our Data Protection Officer:
                  </p>
                  <div className="bg-card border rounded-lg p-4">
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>General Inquiries:</strong></p>
                        <p className="mb-1">Email: privacy@apexregulations.com</p>
                        <p>Response time: 72 hours maximum</p>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Data Protection Officer:</strong></p>
                        <p className="mb-1">Email: dpo@apexregulations.com</p>
                        <p>Response time: 24 hours maximum</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;