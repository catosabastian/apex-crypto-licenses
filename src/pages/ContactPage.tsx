import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contact Us - Trading License Authority</title>
        <meta name="description" content="Get in touch with our expert team. Multiple contact options available including phone, email, and live chat support." />
        <meta name="keywords" content="contact, support, help, trading license support, customer service" />
      </Helmet>
      
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Contact Our Experts
              </h1>
              <p className="text-xl text-muted-foreground">
                Get personalized assistance with your trading license application and regulatory questions
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Send us a message</h2>
                <Card>
                  <CardContent className="p-6">
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">First Name</label>
                          <Input placeholder="John" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Last Name</label>
                          <Input placeholder="Doe" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <Input type="email" placeholder="john@example.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <Input placeholder="+1 (555) 123-4567" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">License Type</label>
                        <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                          <option>Select license type</option>
                          <option>Category 1 - Basic Trading</option>
                          <option>Category 2 - Advanced Trading</option>
                          <option>Category 3 - International Trading</option>
                          <option>Category 4 - Premium Trading</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Message</label>
                        <Textarea 
                          placeholder="Tell us about your requirements..." 
                          rows={4}
                        />
                      </div>
                      <Button className="w-full">Send Message</Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Get in touch</h2>
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-primary" />
                        Phone Support
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg font-semibold">+1 (555) 123-4567</p>
                      <p className="text-muted-foreground">Monday - Friday, 9:00 AM - 6:00 PM EST</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-primary" />
                        Email Support
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg font-semibold">support@tradingauthority.com</p>
                      <p className="text-muted-foreground">Typical response within 2 hours</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        Office Location
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg font-semibold">123 Financial District</p>
                      <p className="text-muted-foreground">New York, NY 10004</p>
                      <p className="text-muted-foreground">United States</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        Business Hours
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Monday - Friday</span>
                          <span>9:00 AM - 6:00 PM EST</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Saturday</span>
                          <span>10:00 AM - 2:00 PM EST</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sunday</span>
                          <span>Closed</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Emergency Support</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                For urgent license verification or critical issues outside business hours
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-destructive hover:bg-destructive/90">
                  Emergency Hotline: +1 (555) 911-HELP
                </Button>
                <Button size="lg" variant="outline">
                  Live Chat Support
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;