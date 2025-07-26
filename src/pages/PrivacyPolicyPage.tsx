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
        <div className="container mx-auto py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                <p className="mb-4">
                  APEX Crypto Licensing ("we," "our," or "us") collects information necessary to provide cryptocurrency licensing services and ensure regulatory compliance. We collect:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Personal identification information (name, email, phone number, address)</li>
                  <li>Business information (company name, registration details, trading volume)</li>
                  <li>Financial information (payment details, transaction history)</li>
                  <li>Technical information (IP address, browser type, device information)</li>
                  <li>Documentation required for licensing compliance and verification</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                <p className="mb-4">We use collected information to:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Process license applications and provide regulatory compliance services</li>
                  <li>Verify identity and conduct due diligence as required by law</li>
                  <li>Communicate with you about your license status and regulatory updates</li>
                  <li>Improve our services and website functionality</li>
                  <li>Comply with legal and regulatory obligations</li>
                  <li>Prevent fraud and ensure platform security</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
                <p className="mb-4">
                  We may share your information with:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Regulatory authorities and government agencies as required by law</li>
                  <li>Third-party service providers who assist in our operations</li>
                  <li>Legal counsel and compliance advisors</li>
                  <li>Financial institutions for payment processing</li>
                </ul>
                <p className="mb-4">
                  We do not sell, rent, or trade your personal information to third parties for marketing purposes.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
                <p className="mb-4">
                  We implement industry-standard security measures to protect your information, including:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Encryption of sensitive data in transit and at rest</li>
                  <li>Secure servers and regular security audits</li>
                  <li>Access controls and employee training</li>
                  <li>Regular monitoring for security breaches</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
                <p className="mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Access and review your personal information</li>
                  <li>Request corrections to inaccurate data</li>
                  <li>Request deletion of your data (subject to legal requirements)</li>
                  <li>Opt-out of marketing communications</li>
                  <li>File complaints with relevant data protection authorities</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
                <p className="mb-4">
                  For questions about this Privacy Policy or to exercise your rights, contact us at:
                </p>
                <p className="mb-2">Email: support@apexregulations.com</p>
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

export default PrivacyPolicyPage;