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
        <div className="container mx-auto py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Legal Notice</h1>
            <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Company Information</h2>
                <p className="mb-4">
                  <strong>APEX Crypto Licensing</strong><br />
                  123 Business District<br />
                  Financial City, FC 12345<br />
                  United States<br />
                  Email: support@apexregulations.com<br />
                  Phone: +1 (609) 918-3047
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Regulatory Status</h2>
                <p className="mb-4">
                  APEX Crypto Licensing operates as a regulatory compliance service provider in the cryptocurrency and digital asset sector. Our services are designed to help clients navigate complex regulatory requirements across multiple jurisdictions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Important Disclaimers</h2>
                
                <h3 className="text-xl font-semibold mb-3">No Legal Advice</h3>
                <p className="mb-4">
                  The information provided on this website and through our services does not constitute legal advice. Clients should consult with qualified legal counsel for specific legal matters related to their cryptocurrency operations.
                </p>

                <h3 className="text-xl font-semibold mb-3">Regulatory Compliance</h3>
                <p className="mb-4">
                  Cryptocurrency regulations vary by jurisdiction and are subject to frequent changes. Clients are responsible for ensuring ongoing compliance with all applicable laws and regulations in their operating jurisdictions.
                </p>

                <h3 className="text-xl font-semibold mb-3">Risk Warnings</h3>
                <p className="mb-4">
                  Cryptocurrency trading involves significant financial risk. Past performance does not guarantee future results. Clients should carefully consider their risk tolerance and seek professional financial advice before engaging in cryptocurrency trading activities.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
                <p className="mb-4">
                  All content on this website, including text, graphics, logos, and software, is the property of APEX Crypto Licensing or its content suppliers and is protected by intellectual property laws. Unauthorized use is prohibited.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>
                <p className="mb-4">
                  We are committed to protecting your personal data in accordance with applicable data protection laws, including GDPR where applicable. For detailed information about how we collect, use, and protect your data, please refer to our Privacy Policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Anti-Money Laundering (AML)</h2>
                <p className="mb-4">
                  APEX Crypto Licensing maintains strict anti-money laundering policies and procedures. We reserve the right to verify customer identity and report suspicious activities to relevant authorities as required by law.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Jurisdiction and Governing Law</h2>
                <p className="mb-4">
                  These terms and any disputes arising from the use of our services shall be governed by the laws of the United States. Any legal proceedings shall be conducted in the courts of the jurisdiction where our company is registered.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Website Availability</h2>
                <p className="mb-4">
                  While we strive to ensure continuous availability of our website and services, we cannot guarantee uninterrupted access. We reserve the right to suspend or modify our services for maintenance, updates, or other operational reasons.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Contact for Legal Matters</h2>
                <p className="mb-4">
                  For legal inquiries or notices, please contact us at:
                </p>
                <p className="mb-2">Email: legal@apexregulations.com</p>
                <p className="mb-2">Phone: +1 (609) 918-3047</p>
                <p>Address: 123 Business District, Financial City, FC 12345, United States</p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LegalNoticePage;