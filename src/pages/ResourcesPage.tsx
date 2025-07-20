import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download, FileText, Video, BookOpen, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ResourcesPage = () => {
  const resourceCategories = [
    {
      title: "Trading Guides",
      icon: BookOpen,
      resources: [
        {
          title: "Complete Guide to Trading Licenses",
          type: "PDF",
          size: "2.5 MB",
          description: "Comprehensive overview of license types and requirements"
        },
        {
          title: "International Trading Regulations",
          type: "PDF", 
          size: "1.8 MB",
          description: "Navigate global compliance requirements"
        },
        {
          title: "Risk Management Framework",
          type: "PDF",
          size: "3.2 MB",
          description: "Essential risk management strategies for licensed traders"
        }
      ]
    },
    {
      title: "Legal Documents",
      icon: FileText,
      resources: [
        {
          title: "Terms & Conditions Template",
          type: "DOCX",
          size: "150 KB",
          description: "Customizable legal framework for your trading business"
        },
        {
          title: "Privacy Policy Template",
          type: "DOCX",
          size: "120 KB",
          description: "GDPR-compliant privacy policy template"
        },
        {
          title: "Compliance Checklist",
          type: "PDF",
          size: "800 KB",
          description: "Step-by-step compliance verification checklist"
        }
      ]
    },
    {
      title: "Video Tutorials",
      icon: Video,
      resources: [
        {
          title: "License Application Walkthrough",
          type: "Video",
          duration: "15 min",
          description: "Complete step-by-step application process"
        },
        {
          title: "Platform Navigation Guide",
          type: "Video", 
          duration: "8 min",
          description: "How to use our verification and management tools"
        },
        {
          title: "Best Practices Webinar",
          type: "Video",
          duration: "45 min",
          description: "Expert insights on trading license optimization"
        }
      ]
    }
  ];

  const webinars = [
    {
      title: "The Future of Digital Trading Licenses",
      date: "August 15, 2024",
      time: "2:00 PM EST",
      speaker: "Dr. Sarah Williams, Regulatory Expert",
      status: "upcoming"
    },
    {
      title: "Navigating International Compliance",
      date: "July 25, 2024", 
      time: "11:00 AM EST",
      speaker: "Michael Chen, Legal Advisor",
      status: "recorded"
    },
    {
      title: "Building a Profitable Trading Business",
      date: "July 10, 2024",
      time: "3:00 PM EST", 
      speaker: "Alex Rodriguez, Portfolio Manager",
      status: "recorded"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Resources & Downloads - Trading License Authority</title>
        <meta name="description" content="Access comprehensive trading guides, legal documents, video tutorials, and webinars to maximize your trading license value." />
        <meta name="keywords" content="trading guides, legal documents, video tutorials, webinars, trading resources" />
      </Helmet>
      
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Resources & Downloads
              </h1>
              <p className="text-xl text-muted-foreground">
                Everything you need to succeed with your trading license - guides, templates, and expert insights
              </p>
            </div>
          </div>
        </section>

        {/* Resource Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {resourceCategories.map((category, categoryIndex) => {
              const IconComponent = category.icon;
              return (
                <div key={categoryIndex} className="mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <IconComponent className="h-8 w-8 text-primary" />
                    <h2 className="text-3xl font-bold">{category.title}</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {category.resources.map((resource, resourceIndex) => (
                      <Card key={resourceIndex} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-lg">{resource.title}</CardTitle>
                            <Badge variant="secondary">
                              {resource.type}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground text-sm mb-4">
                            {resource.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              {resource.size || resource.duration}
                            </span>
                            <Button size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Webinars Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Expert Webinars</h2>
            
            <div className="max-w-4xl mx-auto space-y-6">
              {webinars.map((webinar, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold">{webinar.title}</h3>
                          <Badge variant={webinar.status === "upcoming" ? "default" : "outline"}>
                            {webinar.status === "upcoming" ? "Upcoming" : "Recorded"}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-2">{webinar.speaker}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{webinar.date}</span>
                          <span>{webinar.time}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {webinar.status === "upcoming" ? (
                          <Button>Register Now</Button>
                        ) : (
                          <>
                            <Button variant="outline">
                              <Video className="h-4 w-4 mr-2" />
                              Watch
                            </Button>
                            <Button variant="outline">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Quick Links</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <ExternalLink className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Regulatory Database</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Access global trading regulations
                  </p>
                  <Button variant="outline" size="sm">Visit</Button>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <FileText className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Form Library</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Download application forms
                  </p>
                  <Button variant="outline" size="sm">Browse</Button>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <BookOpen className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Knowledge Base</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Comprehensive FAQ and guides
                  </p>
                  <Button variant="outline" size="sm">Explore</Button>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Video className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Video Library</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Complete tutorial collection
                  </p>
                  <Button variant="outline" size="sm">Watch</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="bg-card p-8 rounded-lg text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-muted-foreground mb-6">
                Get notified when new resources and webinars become available
              </p>
              <div className="flex gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResourcesPage;