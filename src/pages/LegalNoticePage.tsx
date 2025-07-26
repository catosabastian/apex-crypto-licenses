import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LegalNoticePage = () => {
  return (
    <>
      <Helmet>
        <title>Legal Notice - APEX Crypto Licensing</title>
        <meta name="description" content="Legal Notice for APEX Crypto Licensing - Important legal information and regulatory disclaimers." />
      </Helmet>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto py-8 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-lg border p-6 md:p-8">
              <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-foreground">Legal Notice</h1>
              <p className="text-xs md:text-sm text-muted-foreground mb-6 md:mb-8">Last updated: {new Date().toLocaleDateString()}</p>
              
              <div className="space-y-6 md:space-y-8 text-foreground">
                <section className="border-b pb-6 mb-6">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">Company Information and Registration</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base">Corporate Details:</h3>
                      <div className="text-sm space-y-1">
                        <p><strong>Legal Name:</strong> APEX Crypto Licensing</p>
                        <p><strong>Registration Number:</strong> RA000028</p>
                        <p><strong>Business License:</strong> 9845004FF5E8CAXE3825</p>
                      </div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base">Contact Information:</h3>
                      <div className="text-sm space-y-1">
                        <p><strong>Headquarters:</strong><br />Vallis Building, 58 Par‑LaVille Road, Hamilton, HM 11, Bermuda</p>
                        <p><strong>Phone:</strong> +1 (609) 918-3047</p>
                        <p><strong>Email:</strong> support@apexregulations.com</p>
                        <p><strong>Legal:</strong> legal@apexregulations.com</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="border-b pb-6 mb-6">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">Regulatory Status and Authorizations</h2>
                  <p className="mb-4 text-sm md:text-base leading-relaxed">
                    APEX Crypto Licensing operates as a specialized regulatory compliance consultancy in the cryptocurrency and digital asset sector, authorized to provide the following services:
                  </p>
                  <div className="space-y-4">
                    <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base text-green-800 dark:text-green-200">Regulatory Authorizations:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs text-green-700 dark:text-green-300">
                        <li>US Money Services Business (MSB) Registration: 31000-12345678</li>
                        <li>FinCEN Money Services Business License</li>
                        <li>State-level Money Transmitter Licenses (active in 48 states)</li>
                        <li>FATCA Foreign Financial Institution Registration</li>
                        <li>ISO 27001:2013 Information Security Management Certification</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base text-blue-800 dark:text-blue-200">Professional Memberships:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs text-blue-700 dark:text-blue-300">
                        <li>American Bar Association (ABA) - Business Law Section</li>
                        <li>International Association of Financial Crimes Investigators (IAFCI)</li>
                        <li>Association of Certified Anti-Money Laundering Specialists (ACAMS)</li>
                        <li>Blockchain Association - Regulatory Committee Member</li>
                        <li>Digital Chamber of Commerce - Policy Advisory Board</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="border-b pb-6 mb-6">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">Important Legal Disclaimers</h2>
                  
                  <div className="space-y-4">
                    <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-3 text-amber-800 dark:text-amber-200">No Legal Advice Disclaimer</h3>
                      <p className="mb-3 text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
                        The information, documents, and services provided by APEX Crypto Licensing do not constitute legal advice, legal opinions, or attorney-client privileged communications. All content is for informational purposes only.
                      </p>
                      <div className="text-xs text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 p-2 rounded">
                        <strong>Required Action:</strong> Clients must consult with qualified legal counsel licensed in their jurisdiction for specific legal matters, regulatory interpretations, and compliance strategies.
                      </div>
                    </div>

                    <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-3 text-red-800 dark:text-red-200">Regulatory Compliance Notice</h3>
                      <p className="mb-3 text-sm text-red-700 dark:text-red-300 leading-relaxed">
                        Cryptocurrency and digital asset regulations are rapidly evolving and vary significantly across jurisdictions. Regulatory landscapes change frequently and without notice.
                      </p>
                      <ul className="list-disc pl-6 space-y-1 text-xs text-red-600 dark:text-red-400">
                        <li>Clients bear sole responsibility for ongoing compliance monitoring</li>
                        <li>License validity may be affected by regulatory changes</li>
                        <li>New reporting requirements may be implemented without notice</li>
                        <li>Cross-border operations require multi-jurisdictional compliance</li>
                        <li>Failure to comply may result in severe penalties or criminal charges</li>
                      </ul>
                    </div>

                    <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-3 text-orange-800 dark:text-orange-200">Financial Risk Warnings</h3>
                      <div className="space-y-2 text-sm text-orange-700 dark:text-orange-300">
                        <p className="font-semibold">HIGH RISK INVESTMENT WARNING:</p>
                        <p>Cryptocurrency trading and digital asset operations involve substantial financial risk and may result in total loss of invested capital.</p>
                        <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded text-xs">
                          <ul className="list-disc pl-4 space-y-1">
                            <li>Extreme price volatility (values may fluctuate 90%+ daily)</li>
                            <li>Regulatory shutdown risk (operations may be banned overnight)</li>
                            <li>Technology risks (smart contract failures, blockchain forks)</li>
                            <li>Cyber security threats (exchange hacks, wallet compromises)</li>
                            <li>Liquidity risks (inability to exit positions)</li>
                            <li>Tax implications (complex and changing tax treatment)</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-3 text-purple-800 dark:text-purple-200">Professional Investment Advice Required</h3>
                      <p className="text-sm text-purple-700 dark:text-purple-300 leading-relaxed">
                        Before engaging in cryptocurrency trading or digital asset operations, clients must:
                      </p>
                      <ul className="list-disc pl-6 space-y-1 text-xs text-purple-600 dark:text-purple-400 mt-2">
                        <li>Consult with qualified financial advisors</li>
                        <li>Conduct thorough due diligence on all investments</li>
                        <li>Assess personal risk tolerance and financial capacity</li>
                        <li>Understand tax implications in their jurisdiction</li>
                        <li>Maintain adequate insurance coverage</li>
                        <li>Implement proper risk management strategies</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="border-b pb-6 mb-6">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">Intellectual Property Rights</h2>
                  <p className="mb-4 text-sm md:text-base leading-relaxed">
                    All intellectual property on this website and associated with our services is protected by applicable intellectual property laws.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base">Our Proprietary Content:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs">
                        <li>Website design, layout, and user interface</li>
                        <li>Proprietary software and algorithms</li>
                        <li>Trademark: "APEX Crypto Licensing" (TM)</li>
                        <li>Copyrighted materials and documentation</li>
                        <li>Trade secrets and confidential methodologies</li>
                        <li>Databases and compiled information</li>
                      </ul>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base">Usage Restrictions:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs">
                        <li>No unauthorized reproduction or distribution</li>
                        <li>No reverse engineering or decompilation</li>
                        <li>No creation of derivative works</li>
                        <li>No commercial use without written permission</li>
                        <li>No removal of copyright or trademark notices</li>
                        <li>Limited personal use only</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 text-xs bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-3 rounded">
                    <strong>Enforcement:</strong> Violations will be prosecuted to the full extent of the law. Damages may include attorney fees, lost profits, and statutory damages up to $150,000 per work.
                  </div>
                </section>

                <section className="border-b pb-6 mb-6">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">Data Protection and Privacy Compliance</h2>
                  <p className="mb-4 text-sm md:text-base leading-relaxed">
                    We maintain comprehensive data protection measures in compliance with international privacy laws:
                  </p>
                  <div className="space-y-3">
                    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3 rounded-lg">
                      <h3 className="font-semibold mb-2 text-sm text-blue-800 dark:text-blue-200">Regulatory Compliance:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs text-blue-700 dark:text-blue-300">
                        <li>EU General Data Protection Regulation (GDPR)</li>
                        <li>California Consumer Privacy Act (CCPA)</li>
                        <li>Personal Information Protection and Electronic Documents Act (PIPEDA)</li>
                        <li>UK Data Protection Act 2018</li>
                        <li>Singapore Personal Data Protection Act (PDPA)</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3 rounded-lg">
                      <h3 className="font-semibold mb-2 text-sm text-green-800 dark:text-green-200">Data Processing Lawful Bases:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs text-green-700 dark:text-green-300">
                        <li>Legitimate business interests for service provision</li>
                        <li>Legal compliance for regulatory reporting</li>
                        <li>Contractual necessity for license processing</li>
                        <li>Explicit consent for marketing communications</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="border-b pb-6 mb-6">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">Anti-Money Laundering and Financial Crime Prevention</h2>
                  <p className="mb-4 text-sm md:text-base leading-relaxed">
                    APEX Crypto Licensing maintains a comprehensive AML/CFT program in accordance with international standards:
                  </p>
                  <div className="space-y-4">
                    <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base text-red-800 dark:text-red-200">Mandatory Reporting Requirements:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs text-red-700 dark:text-red-300">
                        <li>Suspicious Activity Reports (SARs) to FinCEN</li>
                        <li>Foreign Bank Account Reports (FBARs) when applicable</li>
                        <li>OFAC sanctions screening and reporting</li>
                        <li>Coordination with law enforcement agencies</li>
                      </ul>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base text-orange-800 dark:text-orange-200">Enhanced Due Diligence:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs text-orange-700 dark:text-orange-300">
                        <li>Customer Due Diligence (CDD) for all clients</li>
                        <li>Enhanced Due Diligence (EDD) for high-risk clients</li>
                        <li>Politically Exposed Persons (PEP) screening</li>
                        <li>Beneficial ownership identification (BOI)</li>
                        <li>Ongoing transaction monitoring</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="border-b pb-6 mb-6">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">Governing Law and Jurisdiction</h2>
                  <div className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base">Primary Jurisdiction:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs">
                        <li><strong>Governing Law:</strong> State of Delaware, United States</li>
                        <li><strong>Federal Law:</strong> United States federal regulations apply</li>
                        <li><strong>Court Jurisdiction:</strong> Delaware Court of Chancery and US District Court for Delaware</li>
                        <li><strong>Arbitration:</strong> American Arbitration Association (AAA) Commercial Rules</li>
                        <li><strong>Venue:</strong> Wilmington, Delaware, United States</li>
                      </ul>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base text-amber-800 dark:text-amber-200">International Conflicts:</h3>
                      <p className="text-xs text-amber-700 dark:text-amber-300 mb-2">
                        For clients outside the United States, conflicts of law shall be resolved as follows:
                      </p>
                      <ul className="list-disc pl-6 space-y-1 text-xs text-amber-600 dark:text-amber-400">
                        <li>Delaware law governs contractual disputes</li>
                        <li>Local law governs regulatory compliance matters</li>
                        <li>International arbitration for cross-border disputes</li>
                        <li>Hague Convention procedures where applicable</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="border-b pb-6 mb-6">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">Service Availability and Technical Limitations</h2>
                  <p className="mb-4 text-sm md:text-base leading-relaxed">
                    Service availability is subject to various operational and technical constraints:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base">Planned Maintenance:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs">
                        <li>Weekly maintenance windows: Sundays 2-4 AM EST</li>
                        <li>Quarterly system upgrades (48-hour advance notice)</li>
                        <li>Annual security audits (1-week advance notice)</li>
                        <li>Emergency maintenance (immediate implementation)</li>
                      </ul>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-sm md:text-base">Service Level Agreement:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-xs">
                        <li>99.5% uptime guarantee (excluding maintenance)</li>
                        <li>Maximum 72-hour response time for issues</li>
                        <li>Disaster recovery: 24-hour maximum restore time</li>
                        <li>Data backup: Every 6 hours with 30-day retention</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">Legal Notices and Contact Information</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-card border rounded-lg p-4">
                      <h3 className="font-semibold mb-3 text-sm md:text-base">Legal Department:</h3>
                      <div className="text-sm space-y-1">
                        <p><strong>General Counsel:</strong> Sarah Mitchell, Esq.</p>
                        <p><strong>Email:</strong> legal@apexregulations.com</p>
                        <p className="text-xs text-muted-foreground">Response time: 24 hours maximum</p>
                      </div>
                    </div>
                    <div className="bg-card border rounded-lg p-4">
                      <h3 className="font-semibold mb-3 text-sm md:text-base">Service of Process:</h3>
                      <div className="text-sm space-y-1">
                        <p><strong>Business Hours:</strong> Mon-Fri 9AM-5PM EST</p>
                        <p className="text-xs text-muted-foreground">For formal legal notices and court documents</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-xs bg-muted/50 p-3 rounded">
                    <strong>Document Retention:</strong> All legal notices and communications are retained for 7 years as required by law. Electronic signatures are accepted under the Electronic Signatures in Global and National Commerce Act (E-SIGN).
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

export default LegalNoticePage;