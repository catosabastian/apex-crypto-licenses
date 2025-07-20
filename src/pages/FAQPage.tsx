
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HelpCircle, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const FAQPage = () => {
  const faqCategories = [
    {
      category: "General Questions",
      faqs: [
        {
          question: "What is APEX and what do you do?",
          answer: "APEX is a leading cryptocurrency trading license authority with over 24 years of experience in financial regulation. We provide comprehensive trading licenses that ensure regulatory compliance for individual and institutional cryptocurrency traders across 150+ countries."
        },
        {
          question: "Why do I need a cryptocurrency trading license?",
          answer: "A cryptocurrency trading license provides legal protection, regulatory compliance, and credibility in the digital asset marketplace. It's often required by exchanges, improves trading limits, and demonstrates your commitment to professional trading standards."
        },
        {
          question: "Are APEX licenses recognized internationally?",
          answer: "Yes, APEX licenses are recognized and accepted by major cryptocurrency exchanges and regulatory bodies worldwide. Our licenses comply with international standards and are valid across 150+ countries."
        },
        {
          question: "How long are APEX licenses valid?",
          answer: "All APEX licenses are valid for one year from the date of issuance. You can renew your license before expiration to maintain continuous compliance and trading authorization."
        }
      ]
    },
    {
      category: "License Categories",
      faqs: [
        {
          question: "What are the different license categories available?",
          answer: "APEX offers 5 license categories: Category 1 (Basic Trader - $25K), Category 2 (Standard Trader - $50K), Category 3 (Advanced Trader - $70K), Category 4 (Professional Trader - $150K), and Category 5 (Institutional Trader - $250K). Each category is designed for different trading volumes and requirements."
        },
        {
          question: "Which license category is right for me?",
          answer: "The right license depends on your trading volume and needs. Category 1-2 are ideal for individual traders, Category 3-4 for active professional traders, and Category 5 for institutional organizations. We recommend Category 4 for most professional traders as it offers the best value."
        },
        {
          question: "Why are Category 1 and 2 licenses sold out?",
          answer: "Due to overwhelming demand and limited availability, Category 1 and 2 licenses are currently sold out. We recommend Category 3 or higher for new applicants, which offer enhanced features and faster processing times."
        },
        {
          question: "Can I upgrade my license category later?",
          answer: "Yes, you can upgrade your license category at any time during the validity period. The upgrade fee is calculated as the difference between your current license and the new category, prorated for the remaining validity period."
        }
      ]
    },
    {
      category: "Application Process",
      faqs: [
        {
          question: "How long does the application process take?",
          answer: "Processing times vary by category: Category 5 (24 hours), Category 4 (24-48 hours), Category 3 (48-72 hours), and Categories 1-2 (72 hours). Fast-track processing is available for professional and institutional licenses."
        },
        {
          question: "What documents do I need to apply?",
          answer: "Required documents include: government-issued photo ID, proof of address (utility bill or bank statement), bank statements from the last 3 months, and proof of trading history/volume. Additional documents may be required for institutional applications."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept major cryptocurrencies including Bitcoin (BTC), Ethereum (ETH), and USDT. All payments are processed through secure wallet-to-wallet transfers with immediate confirmation and receipt generation."
        },
        {
          question: "Can I get a refund if my application is rejected?",
          answer: "Yes, if your application is rejected due to incomplete documentation or eligibility issues, we offer a full refund minus processing fees. However, refunds are not available once a license has been successfully issued."
        }
      ]
    },
    {
      category: "Technical & Support",
      faqs: [
        {
          question: "How do I verify a license?",
          answer: "You can verify any APEX license using our online verification portal at /verify. Simply enter the license ID in the format CL-YYYY-XXXX-TX to instantly check its authenticity and view detailed information."
        },
        {
          question: "What support is available after getting my license?",
          answer: "Support varies by license category: Basic (email support), Standard (email + phone), Advanced (24/7 support), Professional (dedicated support line), and Institutional (dedicated account representative). All license holders receive comprehensive documentation and resources."
        },
        {
          question: "Can I use my license on multiple exchanges?",
          answer: "Yes, APEX licenses are accepted by all major cryptocurrency exchanges including Binance, Coinbase, Kraken, KuCoin, and others. Your license provides universal recognition across the cryptocurrency trading ecosystem."
        },
        {
          question: "What happens if I lose my license certificate?",
          answer: "If you lose your license certificate, you can request a replacement through your account dashboard or by contacting our support team. Replacement certificates are issued with the same license ID and validity period."
        }
      ]
    },
    {
      category: "Compliance & Legal",
      faqs: [
        {
          question: "Are APEX licenses legally binding?",
          answer: "Yes, APEX licenses are legally binding documents that demonstrate your commitment to regulatory compliance. They are recognized by financial institutions, exchanges, and regulatory authorities worldwide."
        },
        {
          question: "Do I need to report my license to local authorities?",
          answer: "Reporting requirements vary by jurisdiction. While APEX licenses are internationally recognized, you should consult with local legal counsel to understand specific reporting obligations in your country of residence or business operation."
        },
        {
          question: "What happens if regulations change?",
          answer: "APEX continuously monitors regulatory changes worldwide and updates our licensing framework accordingly. License holders receive notifications about relevant regulatory updates and guidance on compliance requirements."
        },
        {
          question: "Can my license be revoked?",
          answer: "Licenses can be revoked only in cases of fraudulent activity, violation of terms of service, or failure to maintain compliance standards. We provide due process and appeal procedures for any revocation proceedings."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Frequently Asked Questions - APEX Crypto Trading License FAQ</title>
        <meta name="description" content="Find answers to common questions about APEX cryptocurrency trading licenses, application process, requirements, and regulatory compliance." />
        <meta name="keywords" content="crypto trading license FAQ, cryptocurrency certification questions, APEX license help, trading license support" />
        <link rel="canonical" href="https://apexregulations.com/faq" />
      </Helmet>
      
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-accent/20 text-accent border-accent/30">FAQ</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Frequently Asked
                <span className="block text-accent">Questions</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Find answers to common questions about APEX cryptocurrency trading licenses, 
                application processes, and regulatory compliance requirements.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">
                {faqCategories.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <HelpCircle className="h-6 w-6 text-accent" />
                      {category.category}
                    </h2>
                    
                    <Accordion type="single" collapsible className="space-y-4">
                      {category.faqs.map((faq, faqIndex) => (
                        <AccordionItem 
                          key={faqIndex} 
                          value={`${categoryIndex}-${faqIndex}`}
                          className="border border-border rounded-lg px-6"
                        >
                          <AccordionTrigger className="text-left hover:no-underline">
                            <span className="font-semibold">{faq.question}</span>
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Still Have Questions?</CardTitle>
                  <CardDescription>
                    Our support team is here to help with any additional questions you may have
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <h3 className="font-semibold mb-2">Email Support</h3>
                      <p className="text-muted-foreground text-sm">support@apexregulations.com</p>
                      <p className="text-muted-foreground text-sm">24-48 hour response time</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Live Chat</h3>
                      <p className="text-muted-foreground text-sm">Available 24/7</p>
                      <p className="text-muted-foreground text-sm">Instant responses</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Phone Support</h3>
                      <p className="text-muted-foreground text-sm">+1 (555) 123-4567</p>
                      <p className="text-muted-foreground text-sm">Business hours: 9AM-6PM EST</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQPage;
