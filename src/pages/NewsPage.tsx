import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NewsPage = () => {
  const newsArticles = [
    {
      id: 1,
      title: "New Trading License Categories Introduced",
      excerpt: "We've expanded our license offerings to include cryptocurrency trading and DeFi protocols.",
      date: "2024-07-15",
      readTime: "3 min read",
      category: "Product Updates"
    },
    {
      id: 2,
      title: "Enhanced Security Measures Implemented",
      excerpt: "Advanced encryption and multi-factor authentication now standard across all applications.",
      date: "2024-07-10",
      readTime: "2 min read",
      category: "Security"
    },
    {
      id: 3,
      title: "Partnership with Global Regulatory Body",
      excerpt: "Strategic partnership to streamline international license recognition and compliance.",
      date: "2024-07-05",
      readTime: "4 min read",
      category: "Partnerships"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>News & Updates - Trading License Authority</title>
        <meta name="description" content="Stay updated with the latest news, product updates, and industry insights from Trading License Authority." />
        <meta name="keywords" content="trading license news, updates, announcements, industry insights" />
      </Helmet>
      
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                News & Updates
              </h1>
              <p className="text-xl text-muted-foreground">
                Stay informed with the latest developments in trading license regulations and our platform updates
              </p>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-card rounded-lg overflow-hidden shadow-lg">
              <div className="md:flex">
                <div className="md:w-1/2 bg-gradient-to-br from-primary to-primary/80 p-8 text-white">
                  <span className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-sm mb-4">
                    Featured Article
                  </span>
                  <h2 className="text-3xl font-bold mb-4">
                    The Future of Digital Trading Licenses
                  </h2>
                  <p className="text-white/90 mb-6">
                    Exploring how blockchain technology and smart contracts are revolutionizing 
                    the trading license industry and what it means for traders worldwide.
                  </p>
                  <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                    Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>July 20, 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>8 min read</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Key Highlights</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Blockchain-based license verification</li>
                    <li>• Smart contract automation</li>
                    <li>• Enhanced security protocols</li>
                    <li>• Global regulatory alignment</li>
                    <li>• Instant license issuance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Articles */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Recent Articles</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {newsArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-primary font-medium">{article.category}</span>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(article.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{article.readTime}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        Read More <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-card p-8 rounded-lg text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-muted-foreground mb-6">
                Subscribe to our newsletter for the latest updates on trading licenses and regulatory changes
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

export default NewsPage;