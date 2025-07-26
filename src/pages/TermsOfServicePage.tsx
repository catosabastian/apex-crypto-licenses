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
        <div className="container mx-auto py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
                <p className="mb-4">
                  By accessing and using APEX Crypto Licensing services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
                <p className="mb-4">
                  APEX Crypto Licensing provides regulatory licensing services for cryptocurrency trading and digital asset operations. Our services include:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Cryptocurrency trading license applications and processing</li>
                  <li>Regulatory compliance consulting</li>
                  <li>License verification and authentication services</li>
                  <li>Ongoing compliance support and updates</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Eligibility Requirements</h2>
                <p className="mb-4">To use our services, you must:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Be at least 18 years of age</li>
                  <li>Have legal capacity to enter into binding agreements</li>
                  <li>Provide accurate and complete information</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Meet minimum trading volume requirements for your chosen license category</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. License Terms</h2>
                <p className="mb-4">
                  Cryptocurrency trading licenses issued through our platform:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Are valid for 3 years from the date of issuance</li>
                  <li>Require renewal before expiration to maintain validity</li>
                  <li>Are non-transferable and specific to the licensed entity</li>
                  <li>Must be used in compliance with all applicable regulations</li>
                  <li>May be subject to periodic review and compliance audits</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Fees and Payment</h2>
                <p className="mb-4">
                  License fees are clearly stated for each category and must be paid in full before license processing begins. All fees are non-refundable unless otherwise stated. We reserve the right to modify fees with 30 days' notice.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Prohibited Activities</h2>
                <p className="mb-4">You may not use our services to:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Engage in illegal activities or money laundering</li>
                  <li>Provide false or misleading information</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Interfere with the security or integrity of our systems</li>
                  <li>Use licenses for unauthorized purposes</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
                <p className="mb-4">
                  APEX Crypto Licensing's liability is limited to the amount paid for services. We are not liable for indirect, incidental, or consequential damages arising from the use of our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
                <p className="mb-4">
                  We may terminate or suspend access to our services immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users or us.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
                <p className="mb-4">
                  For questions about these Terms of Service, contact us at:
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

export default TermsOfServicePage;