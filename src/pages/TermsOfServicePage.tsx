import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TermsOfServicePage = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - APEX Crypto Licensing</title>
        <meta name="description" content="Terms of Service for APEX Crypto Licensing - Legal terms and conditions for using our cryptocurrency licensing services." />
      </Helmet>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto py-8 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-lg border p-6 md:p-8">
              <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-foreground">Terms of Service</h1>
              <p className="text-xs md:text-sm text-muted-foreground mb-6 md:mb-8">Last updated: {new Date().toLocaleDateString()}</p>
              
              <div className="space-y-6 md:space-y-8 text-foreground">
                <section className="border-b pb-6 mb-6">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">1. Agreement to Terms</h2>
                  <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 rounded-lg mb-4">
                    <p className="text-sm md:text-base leading-relaxed font-semibold text-red-800 dark:text-red-200">
                      IMPORTANT: By accessing, using, or registering for APEX Crypto Licensing services, you acknowledge that you have read, understood, and agree to be legally bound by these Terms of Service.
                    </p>
                  </div>
                  <p className="mb-4 text-sm md:text-base leading-relaxed">
                    These terms constitute a legally binding agreement between you and APEX Crypto Licensing. If you do not agree with any provision, you must discontinue use immediately. Continued use constitutes acceptance of any modifications to these terms.
                  </p>
                  <div className="text-xs bg-muted/50 p-3 rounded">
                    <strong>Effective Date:</strong> These terms are effective immediately upon publication and supersede all prior agreements.
                  </div>
                </section>

                <section className="border-b pb-6 mb-6">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">2. Service Description and Scope</h2>
                  <p className="mb-4 text-sm md:text-base leading-relaxed">
                    APEX Crypto Licensing is a specialized regulatory compliance service provider offering comprehensive cryptocurrency and digital asset licensing solutions across multiple jurisdictions.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base">Core Services:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs">
                        <li>Cryptocurrency trading license applications</li>
                        <li>Digital asset exchange licensing</li>
                        <li>DeFi protocol compliance consulting</li>
                        <li>Cross-border regulatory guidance</li>
                        <li>AML/KYC compliance implementation</li>
                        <li>Ongoing regulatory monitoring</li>
                      </ul>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base">Additional Services:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs">
                        <li>License verification and authentication</li>
                        <li>Regulatory change notifications</li>
                        <li>Compliance audit support</li>
                        <li>Legal documentation preparation</li>
                        <li>Relationship management with regulators</li>
                        <li>Business continuity planning</li>
                      </ul>
                    </div>
                  </div>
                  <div className="text-xs bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 rounded">
                    <strong>Service Limitations:</strong> Services are subject to regulatory approval, jurisdiction-specific requirements, and may not be available in all regions. Processing times vary by complexity and regulatory workload.
                  </div>
                </section>

                <section className="border-b pb-6 mb-6">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">3. Eligibility and Requirements</h2>
                  <p className="mb-4 text-sm md:text-base leading-relaxed">To access our services, all applicants must meet stringent eligibility criteria:</p>
                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base text-blue-800 dark:text-blue-200">Individual Requirements:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs text-blue-700 dark:text-blue-300">
                        <li>Minimum age of 18 years (21+ in certain jurisdictions)</li>
                        <li>Legal capacity to enter binding agreements</li>
                        <li>Clean criminal background (financial crimes disqualify)</li>
                        <li>Verified identity with government-issued documentation</li>
                        <li>Professional qualifications in finance or related field (for certain licenses)</li>
                      </ul>
                    </div>
          
                    <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base text-purple-800 dark:text-purple-200">Financial Requirements:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs text-purple-700 dark:text-purple-300">
                        <li>Minimum trading volume thresholds (see license categories)</li>
                        <li>Source of funds documentation</li>
                        <li>Credit checks and financial stability assessment</li>
                        <li>Ongoing capital adequacy requirements</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="border-b pb-6 mb-6">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">4. License Terms and Conditions</h2>
                  <p className="mb-4 text-sm md:text-base leading-relaxed">
                    All cryptocurrency trading licenses issued through our platform are subject to the following terms and regulatory conditions:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base">License Validity:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs">
                        <li><strong>Duration:</strong> 3 years from issuance date</li>
                        <li><strong>Renewal:</strong> Required 30 days before expiration</li>
                        <li><strong>Grace Period:</strong> 30 days post-expiration</li>
                        <li><strong>Retroactive Renewal:</strong> Not permitted</li>
                        <li><strong>Suspension:</strong> May occur for non-compliance</li>
                      </ul>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base">Usage Restrictions:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs">
                        <li>Non-transferable between entities</li>
                        <li>Jurisdiction-specific authorization</li>
                        <li>Activity limitations per license type</li>
                        <li>Volume caps where applicable</li>
                        <li>Prohibited asset restrictions</li>
                      </ul>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base">Compliance Obligations:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs">
                        <li>Quarterly compliance reporting</li>
                        <li>Annual regulatory filings</li>
                        <li>AML/KYC policy maintenance</li>
                        <li>Customer funds segregation</li>
                        <li>Transaction monitoring and reporting</li>
                      </ul>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base">Monitoring and Audits:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs">
                        <li>Periodic regulatory examinations</li>
                        <li>Unannounced compliance inspections</li>
                        <li>Third-party audit requirements</li>
                        <li>Document production obligations</li>
                        <li>Cooperation with investigations</li>
                      </ul>
                    </div>
                  </div>
                  <div className="text-xs bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-3 rounded">
                    <strong>Important:</strong> License violations may result in suspension, revocation, monetary penalties, or criminal prosecution. Ensure full compliance with all terms and applicable regulations.
                  </div>
                </section>

                <section className="border-b pb-6 mb-6">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">5. Fees, Payment Terms, and Refund Policy</h2>
                  <p className="mb-4 text-sm md:text-base leading-relaxed">
                    All fees are clearly disclosed upfront and must be paid according to the specified payment schedule:
                  </p>
                  <div className="space-y-4">
                    <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base text-green-800 dark:text-green-200">Payment Requirements:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs text-green-700 dark:text-green-300">
                        <li>Application fee: Due upon submission (non-refundable)</li>
                        <li>Processing fee: 50% upfront, 50% upon approval</li>
                        <li>Annual compliance fee: Due at license issuance and annually thereafter</li>
                        <li>Consultation fees: Billed into application fee /li>
                      </ul>
                    </div>
                    <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base text-red-800 dark:text-red-200">Refund Policy:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs text-red-700 dark:text-red-300">
                        <li>Application fees: Non-refundable except application for license is denied</li>
                        <li>Processing fees: Refundable only if application is rejected due to our error</li>
                        <li>Service cancellation: 30-day written notice required, no refund for work completed</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="border-b pb-6 mb-6">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">6. Prohibited Activities and Conduct</h2>
                  <p className="mb-4 text-sm md:text-base leading-relaxed">The following activities are strictly prohibited and will result in immediate account termination:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base text-red-800 dark:text-red-200">Financial Crimes:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs text-red-700 dark:text-red-300">
                        <li>Money laundering or terrorist financing</li>
                        <li>Fraudulent transactions or documentation</li>
                        <li>Market manipulation or insider trading</li>
                        <li>Sanctions evasion or embargo violations</li>
                        <li>Tax evasion or unreported income</li>
                      </ul>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base text-orange-800 dark:text-orange-200">Service Abuse:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs text-orange-700 dark:text-orange-300">
                        <li>Providing false or misleading information</li>
                        <li>Identity theft or impersonation</li>
                        <li>Unauthorized use of licenses</li>
                        <li>System interference or security breaches</li>
                        <li>Circumventing compliance measures</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="border-b pb-6 mb-6">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">7. Disclaimers and Limitation of Liability</h2>
                  <div className="space-y-4">
                    <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base text-amber-800 dark:text-amber-200">Service Disclaimers:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs text-amber-700 dark:text-amber-300">
                        <li>No guarantee of license approval or regulatory acceptance</li>
                        <li>Services provided "as is" without warranties</li>
                        <li>Regulatory changes may affect license validity</li>
                        <li>Processing times are estimates and not guaranteed</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base text-red-800 dark:text-red-200">Liability Limitations:</h3>
                      <p className="text-xs text-red-700 dark:text-red-300 mb-2">
                        Our total liability is limited to the amount paid for services in the 12 months preceding the claim. We are not liable for:
                      </p>
                      <ul className="list-disc pl-6 space-y-1 text-xs text-red-700 dark:text-red-300">
                        <li>Indirect, incidental, or consequential damages</li>
                        <li>Lost profits, business interruption, or reputation damage</li>
                        <li>Regulatory penalties or enforcement actions</li>
                        <li>Third-party actions or government decisions</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="border-b pb-6 mb-6">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">8. Termination and Suspension</h2>
                  <p className="mb-4 text-sm md:text-base leading-relaxed">
                    We reserve the right to terminate or suspend access under the following circumstances:
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <ul className="space-y-2 text-xs">
                      <li><strong>Immediate Termination:</strong> Violation of prohibited activities, fraudulent conduct, or legal non-compliance</li>
                      <li><strong>Voluntary Termination:</strong> Licensed party may terminate with 30 days written notice</li>
                      <li><strong>Effect of Termination:</strong> Immediate cessation of services, no refund of fees, data retention per legal requirements</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">9. Contact Information and Dispute Resolution</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-card border rounded-lg p-4">
                      <h3 className="font-semibold mb-3 text-sm md:text-base">General Contact:</h3>
                      <div className="text-sm space-y-1">
                        <p>Email: support@apexregulations.com</p>
                        <p>Phone: +1 (609) 918-3047</p>
                        <p className="text-xs text-muted-foreground">Business Hours: Mon-Fri 9AM-6PM EST</p>
                      </div>
                    </div>
                    <div className="bg-card border rounded-lg p-4">
                      <h3 className="font-semibold mb-3 text-sm md:text-base">Legal and Disputes:</h3>
                      <div className="text-sm space-y-1">
                        <p>Email: legal@apexregulations.com</p>
                        <p>Governing Law: Delaware, United States</p>
                        <p>Dispute Resolution: Binding arbitration</p>
                        <p className="text-xs text-muted-foreground">All disputes subject to Delaware courts and US federal law</p>
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

export default TermsOfServicePage;