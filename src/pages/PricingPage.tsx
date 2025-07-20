import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, Star, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const PricingPage = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [calculatorValues, setCalculatorValues] = useState({
    licenseType: "category-4",
    expedited: false,
    additionalServices: []
  });

  const pricingPlans = [
    {
      id: "category-1",
      name: "Category 1 - Basic Trading",
      price: { USD: 2999, EUR: 2799, GBP: 2399 },
      description: "Perfect for individual traders and small operations",
      features: [
        "Individual trading authorization",
        "Basic compliance framework",
        "Standard verification process",
        "Email support",
        "30-day processing time"
      ],
      popular: false
    },
    {
      id: "category-2", 
      name: "Category 2 - Advanced Trading",
      price: { USD: 7999, EUR: 7499, GBP: 6399 },
      description: "Ideal for growing trading operations",
      features: [
        "Enhanced trading privileges",
        "Advanced compliance tools",
        "Priority verification",
        "Phone & email support",
        "21-day processing time",
        "Risk management framework"
      ],
      popular: false
    },
    {
      id: "category-3",
      name: "Category 3 - International Trading", 
      price: { USD: 15999, EUR: 14999, GBP: 12999 },
      description: "For international trading operations",
      features: [
        "Global trading authorization",
        "Multi-jurisdiction compliance",
        "Expedited verification",
        "24/7 priority support",
        "14-day processing time",
        "International banking access",
        "Regulatory liaison services"
      ],
      popular: false
    },
    {
      id: "category-4",
      name: "Category 4 - Premium Trading",
      price: { USD: 29999, EUR: 27999, GBP: 23999 },
      description: "The ultimate trading license package",
      features: [
        "Unlimited trading authorization",
        "White-glove compliance service",
        "Instant verification",
        "Dedicated account manager",
        "7-day processing time",
        "Premium banking relationships",
        "Custom regulatory solutions",
        "API access for verification"
      ],
      popular: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Pricing - Trading License Authority</title>
        <meta name="description" content="Transparent pricing for all trading license categories. Calculate your costs with our interactive pricing calculator." />
        <meta name="keywords" content="trading license cost, pricing, fees, license calculator" />
      </Helmet>
      
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Transparent Pricing
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Choose the perfect trading license for your needs with our clear, competitive pricing
              </p>
              
              {/* Currency Selector */}
              <div className="flex justify-center gap-2 mb-8">
                {["USD", "EUR", "GBP"].map((currency) => (
                  <Button
                    key={currency}
                    variant={selectedCurrency === currency ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCurrency(currency)}
                  >
                    {currency}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pricingPlans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                      <Star className="h-3 w-3 mr-1" />
                      Recommended
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold text-primary">
                      {selectedCurrency === "USD" && "$"}
                      {selectedCurrency === "EUR" && "€"}
                      {selectedCurrency === "GBP" && "£"}
                      {plan.price[selectedCurrency].toLocaleString()}
                    </div>
                    <p className="text-muted-foreground text-sm">{plan.description}</p>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Calculator */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Calculator className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">Pricing Calculator</h2>
                <p className="text-muted-foreground">
                  Calculate your total cost including optional services and expedited processing
                </p>
              </div>
              
              <Card>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">License Type</label>
                        <select 
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          value={calculatorValues.licenseType}
                          onChange={(e) => setCalculatorValues({...calculatorValues, licenseType: e.target.value})}
                        >
                          {pricingPlans.map((plan) => (
                            <option key={plan.id} value={plan.id}>
                              {plan.name} - {selectedCurrency === "USD" && "$"}{selectedCurrency === "EUR" && "€"}{selectedCurrency === "GBP" && "£"}{plan.price[selectedCurrency].toLocaleString()}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            className="rounded"
                            checked={calculatorValues.expedited}
                            onChange={(e) => setCalculatorValues({...calculatorValues, expedited: e.target.checked})}
                          />
                          <span>Expedited Processing (+50%)</span>
                        </label>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Additional Services</label>
                        <div className="space-y-2">
                          <label className="flex items-center gap-3">
                            <input type="checkbox" className="rounded" />
                            <span>Legal consultation ($500)</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input type="checkbox" className="rounded" />
                            <span>Document preparation ($300)</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input type="checkbox" className="rounded" />
                            <span>Ongoing compliance ($200/month)</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-primary/5 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold mb-4">Cost Breakdown</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Base License Fee</span>
                          <span className="font-semibold">
                            {selectedCurrency === "USD" && "$"}
                            {selectedCurrency === "EUR" && "€"}
                            {selectedCurrency === "GBP" && "£"}
                            {pricingPlans.find(p => p.id === calculatorValues.licenseType)?.price[selectedCurrency].toLocaleString()}
                          </span>
                        </div>
                        {calculatorValues.expedited && (
                          <div className="flex justify-between">
                            <span>Expedited Processing</span>
                            <span className="font-semibold">
                              {selectedCurrency === "USD" && "$"}
                              {selectedCurrency === "EUR" && "€"}
                              {selectedCurrency === "GBP" && "£"}
                              {Math.round(pricingPlans.find(p => p.id === calculatorValues.licenseType)?.price[selectedCurrency] * 0.5).toLocaleString()}
                            </span>
                          </div>
                        )}
                        <div className="border-t pt-3">
                          <div className="flex justify-between text-lg font-bold">
                            <span>Total Cost</span>
                            <span className="text-primary">
                              {selectedCurrency === "USD" && "$"}
                              {selectedCurrency === "EUR" && "€"}
                              {selectedCurrency === "GBP" && "£"}
                              {(() => {
                                const base = pricingPlans.find(p => p.id === calculatorValues.licenseType)?.price[selectedCurrency] || 0;
                                const expedited = calculatorValues.expedited ? base * 0.5 : 0;
                                return Math.round(base + expedited).toLocaleString();
                              })()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full mt-6">Get Started</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Pricing FAQ</h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div>
                <h3 className="font-semibold mb-2">Are there any hidden fees?</h3>
                <p className="text-muted-foreground">No, our pricing is completely transparent. The only additional costs are optional expedited processing and extra services you choose.</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Do you offer payment plans?</h3>
                <p className="text-muted-foreground">Yes, we offer flexible payment plans for Category 3 and Category 4 licenses with 0% interest for qualified applicants.</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">What's included in the price?</h3>
                <p className="text-muted-foreground">All license fees include application processing, verification, compliance review, and certificate issuance.</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Can I upgrade my license later?</h3>
                <p className="text-muted-foreground">Yes, you can upgrade at any time. We'll credit the difference between your current license and the new one.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PricingPage;