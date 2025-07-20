import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, Quote, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TestimonialsPage = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Hedge Fund Manager",
      company: "Pacific Capital",
      image: "/placeholder.svg",
      rating: 5,
      text: "The Category 4 license completely transformed our operations. The expedited processing and dedicated support made the difference between launching on time and missing our window.",
      results: "300% increase in trading volume within 6 months"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      title: "Independent Trader",
      company: "Rodriguez Trading LLC",
      image: "/placeholder.svg",
      rating: 5,
      text: "As a solo trader, I was intimidated by the licensing process. The Category 1 license was perfect for my needs, and the support team guided me through every step.",
      results: "Opened 5 new broker accounts immediately"
    },
    {
      id: 3,
      name: "David Thompson",
      title: "CEO",
      company: "Global Futures Group",
      image: "/placeholder.svg",
      rating: 5,
      text: "The international compliance framework saved us months of legal work. Now we're operating in 12 countries with complete regulatory confidence.",
      results: "Expanded to 12 international markets"
    }
  ];

  const stats = [
    { label: "Success Rate", value: "99.8%", description: "License approval rate" },
    { label: "Client Satisfaction", value: "4.9/5", description: "Average rating" },
    { label: "Processing Time", value: "7 days", description: "Average for Category 4" },
    { label: "Global Reach", value: "50+", description: "Countries served" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Success Stories & Testimonials - Trading License Authority</title>
        <meta name="description" content="Read success stories from traders who transformed their business with our trading licenses. Real results from real clients." />
        <meta name="keywords" content="trading license testimonials, success stories, client reviews, trading results" />
      </Helmet>
      
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Success Stories
              </h1>
              <p className="text-xl text-muted-foreground">
                See how our trading licenses have transformed businesses and careers worldwide
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="bg-card p-6 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="font-semibold mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Testimonials */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="h-full">
                  <CardContent className="p-8">
                    <Quote className="h-8 w-8 text-primary mb-4" />
                    
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    
                    <p className="text-muted-foreground mb-6 italic">
                      "{testimonial.text}"
                    </p>
                    
                    <div className="bg-primary/10 p-4 rounded-lg mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <span className="font-semibold text-sm">Results Achieved</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{testimonial.results}</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Video Testimonials */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Video Testimonials</h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-card rounded-lg overflow-hidden">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="text-muted-foreground">Play Video Testimonial</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold mb-2">Emma Williams - Portfolio Manager</h3>
                  <p className="text-muted-foreground text-sm">
                    "How the Category 3 license enabled international expansion"
                  </p>
                </div>
              </div>
              
              <div className="bg-card rounded-lg overflow-hidden">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="text-muted-foreground">Play Video Testimonial</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold mb-2">James Kumar - Crypto Trader</h3>
                  <p className="text-muted-foreground text-sm">
                    "From struggling trader to profitable business owner"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies Preview */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Detailed Case Studies</h2>
            
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">
                        From $10K to $1M: A Category 4 Success Story
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Follow the journey of Alex Morrison, who transformed a small trading account 
                        into a million-dollar operation using our premium licensing platform.
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <div className="text-2xl font-bold text-primary">1000%</div>
                          <div className="text-sm text-muted-foreground">Return on Investment</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">18 months</div>
                          <div className="text-sm text-muted-foreground">Time to $1M</div>
                        </div>
                      </div>
                      <button className="text-primary font-semibold hover:underline">
                        Read Full Case Study →
                      </button>
                    </div>
                    <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-8 rounded-lg">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Starting Capital</span>
                          <span className="font-semibold">$10,000</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>License Type</span>
                          <span className="font-semibold">Category 4 Premium</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Current Portfolio</span>
                          <span className="font-semibold text-primary">$1,200,000</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Markets Accessed</span>
                          <span className="font-semibold">15 Countries</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Ready to Write Your Success Story?</h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of successful traders who have transformed their careers with our licensing platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90">
                  Start Your Application
                </button>
                <button className="border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/5">
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TestimonialsPage;