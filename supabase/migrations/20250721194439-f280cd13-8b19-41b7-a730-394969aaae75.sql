-- Fix Supabase security issues by implementing proper RLS policies

-- Update applications table policies to require authentication for modifications
DROP POLICY IF EXISTS "Allow public application submission" ON public.applications;
DROP POLICY IF EXISTS "Allow public update of applications" ON public.applications;

CREATE POLICY "Allow authenticated application submission" 
ON public.applications 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated update of applications" 
ON public.applications 
FOR UPDATE 
TO authenticated
USING (true);

-- Update contacts table to require authentication for modifications
DROP POLICY IF EXISTS "Allow full access to contacts" ON public.contacts;

CREATE POLICY "Authenticated users can view contacts" 
ON public.contacts 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can submit contacts" 
ON public.contacts 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update contacts" 
ON public.contacts 
FOR UPDATE 
TO authenticated
USING (true);

-- Update content table policies
DROP POLICY IF EXISTS "Allow full access to content" ON public.content;

CREATE POLICY "Public can read content" 
ON public.content 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can modify content" 
ON public.content 
FOR ALL 
TO authenticated
USING (true);

-- Update payment_addresses table policies
DROP POLICY IF EXISTS "Allow full access to payment addresses" ON public.payment_addresses;

CREATE POLICY "Authenticated users can manage payment addresses" 
ON public.payment_addresses 
FOR ALL 
TO authenticated
USING (true);

-- Update settings table policies
DROP POLICY IF EXISTS "Allow full access to settings" ON public.settings;

CREATE POLICY "Authenticated users can manage settings" 
ON public.settings 
FOR ALL 
TO authenticated
USING (true);

-- Add comprehensive license categories data
INSERT INTO public.settings (key, category, value, description) VALUES
('license_categories', 'licenses', '{
  "basic_crypto_trader": {
    "name": "Basic Crypto Trader",
    "price": "€2,500",
    "minVolume": "€50,000",
    "available": true,
    "features": [
      "Trade major cryptocurrencies",
      "Basic compliance framework",
      "Standard reporting requirements",
      "Email support"
    ],
    "requirements": [
      "Clean criminal record",
      "Minimum €10,000 capital",
      "Basic financial knowledge test"
    ],
    "description": "Perfect for individuals starting their cryptocurrency trading journey with essential regulatory compliance."
  },
  "premium_crypto_trader": {
    "name": "Premium Crypto Trader",
    "price": "€5,000",
    "minVolume": "€100,000",
    "available": true,
    "features": [
      "Trade all cryptocurrencies",
      "Advanced compliance tools",
      "Priority support",
      "Risk management framework"
    ],
    "requirements": [
      "2+ years trading experience",
      "€25,000 minimum capital",
      "Advanced financial certification"
    ],
    "description": "Enhanced trading capabilities with comprehensive regulatory framework for experienced traders."
  },
  "institutional_trader": {
    "name": "Institutional Trader",
    "price": "€10,000",
    "minVolume": "€500,000",
    "available": true,
    "features": [
      "Institutional-grade platform",
      "Custom compliance solutions",
      "Dedicated account manager",
      "Advanced analytics"
    ],
    "requirements": [
      "Institutional background",
      "€100,000 minimum capital",
      "Professional certifications"
    ],
    "description": "Designed for institutions requiring sophisticated trading infrastructure and compliance."
  },
  "market_maker": {
    "name": "Market Maker",
    "price": "€15,000",
    "minVolume": "€1,000,000",
    "available": false,
    "features": [
      "Market making privileges",
      "Liquidity provision tools",
      "Reduced trading fees",
      "Priority order execution"
    ],
    "requirements": [
      "Market making experience",
      "€250,000 minimum capital",
      "Advanced risk management"
    ],
    "description": "Exclusive license for market makers providing liquidity to cryptocurrency markets."
  },
  "exchange_operator": {
    "name": "Exchange Operator",
    "price": "€25,000",
    "minVolume": "€2,000,000",
    "available": true,
    "features": [
      "Operate cryptocurrency exchange",
      "White-label solutions",
      "Regulatory compliance suite",
      "24/7 support"
    ],
    "requirements": [
      "Exchange operation experience",
      "€500,000 minimum capital",
      "Comprehensive compliance team"
    ],
    "description": "Complete licensing solution for operating cryptocurrency exchanges with full regulatory compliance."
  },
  "executive_trader": {
    "name": "Executive Trader",
    "price": "€50,000",
    "minVolume": "€5,000,000",
    "available": false,
    "features": [
      "Unlimited trading privileges",
      "Global regulatory coverage",
      "Executive support team",
      "Custom regulatory solutions"
    ],
    "requirements": [
      "C-level executive experience",
      "€1,000,000 minimum capital",
      "Board approval required"
    ],
    "description": "Premier licensing solution for high-net-worth individuals and corporate executives."
  }
}', 'Comprehensive license categories with detailed features and requirements')
ON CONFLICT (key) DO UPDATE SET
value = EXCLUDED.value,
updated_at = now();

-- Add enhanced About APEX content
INSERT INTO public.content (section, key, value) VALUES
('about', 'apex_services', '{
  "title": "APEX Trading Regulations",
  "subtitle": "World-Class Cryptocurrency Licensing Solutions",
  "description": "APEX Trading Regulations stands as the premier global authority in cryptocurrency licensing, providing comprehensive regulatory solutions that enable businesses and individuals to operate legally and confidently in the digital asset ecosystem.",
  "services": [
    {
      "icon": "Shield",
      "title": "Regulatory Compliance",
      "description": "Complete regulatory framework ensuring full compliance with international cryptocurrency trading laws and regulations across multiple jurisdictions."
    },
    {
      "icon": "Globe",
      "title": "Global Licensing",
      "description": "Comprehensive licensing solutions covering major financial centers worldwide, enabling seamless cross-border cryptocurrency operations."
    },
    {
      "icon": "Users",
      "title": "Expert Consultation",
      "description": "Access to world-class regulatory experts with decades of experience in financial services and cryptocurrency compliance."
    },
    {
      "icon": "BookOpen",
      "title": "Educational Programs",
      "description": "Comprehensive training and certification programs to ensure your team understands regulatory requirements and best practices."
    },
    {
      "icon": "TrendingUp",
      "title": "Risk Management",
      "description": "Advanced risk assessment and management frameworks tailored for cryptocurrency trading operations and market volatility."
    },
    {
      "icon": "Headphones",
      "title": "24/7 Support",
      "description": "Round-the-clock support from our expert team to address regulatory questions and compliance challenges as they arise."
    }
  ],
  "worldclass_features": [
    {
      "title": "Regulatory Excellence",
      "description": "Our licenses are recognized and respected by regulatory authorities worldwide, providing unmatched credibility."
    },
    {
      "title": "Proven Track Record",
      "description": "Over 10,000 successful licenses issued with a 99.8% regulatory approval rate across all jurisdictions."
    },
    {
      "title": "Industry Leadership",
      "description": "Setting the gold standard for cryptocurrency regulatory compliance with innovative solutions and expert guidance."
    },
    {
      "title": "Global Network",
      "description": "Extensive network of regulatory partners and legal experts across 50+ countries ensuring comprehensive coverage."
    }
  ],
  "legal_notice": "⚠️ **Important Legal Notice**: Trading digital assets without proper licensing is illegal in most jurisdictions and can result in severe penalties, including criminal charges and substantial fines. APEX Trading Regulations ensures your complete regulatory compliance and legal protection."
}')
ON CONFLICT (section, key) DO UPDATE SET
value = EXCLUDED.value,
updated_at = now();

-- Add enhanced Understanding Licensing content
INSERT INTO public.content (section, key, value) VALUES
('whatIsLicense', 'comprehensive_guide', '{
  "title": "Understanding Cryptocurrency Licensing",
  "subtitle": "A Complete Guide for Everyone",
  "introduction": "Cryptocurrency licensing might seem complex, but we will break it down into simple, easy-to-understand concepts that anyone can grasp.",
  "what_is_license": {
    "title": "What is a Cryptocurrency License?",
    "description": "Think of a cryptocurrency license like a driving license, but for trading digital money. Just as you need a driving license to legally drive a car, you need a cryptocurrency license to legally trade digital assets like Bitcoin, Ethereum, and other cryptocurrencies.",
    "simple_explanation": "A cryptocurrency license is official permission from the government that says ''Yes, you are allowed to trade digital money legally and safely.''"
  },
  "why_needed": {
    "title": "Why Do You Need a License?",
    "reasons": [
      {
        "title": "Legal Protection",
        "description": "Without a license, trading cryptocurrencies is illegal in most countries. This means you could face serious legal trouble, including fines and even jail time.",
        "icon": "Shield"
      },
      {
        "title": "Trust and Credibility",
        "description": "Having a license shows your customers and partners that you are a legitimate, trustworthy business that follows all the rules.",
        "icon": "Award"
      },
      {
        "title": "Access to Banking",
        "description": "Banks will only work with licensed cryptocurrency businesses. Without a license, you cannot open business bank accounts or process payments.",
        "icon": "CreditCard"
      },
      {
        "title": "Global Operations",
        "description": "A proper license allows you to operate internationally and serve customers from different countries legally.",
        "icon": "Globe"
      }
    ]
  },
  "how_it_works": {
    "title": "How Does the Licensing Process Work?",
    "steps": [
      {
        "step": 1,
        "title": "Choose Your License Type",
        "description": "Select the type of license that matches your business needs - from basic trading to running a full exchange.",
        "duration": "1-2 days",
        "icon": "CheckCircle"
      },
      {
        "step": 2,
        "title": "Submit Application",
        "description": "Complete our comprehensive application form with your business details, financial information, and compliance requirements.",
        "duration": "3-5 days",
        "icon": "FileText"
      },
      {
        "step": 3,
        "title": "Document Review",
        "description": "Our experts review your application and supporting documents to ensure everything meets regulatory standards.",
        "duration": "7-14 days",
        "icon": "Search"
      },
      {
        "step": 4,
        "title": "Compliance Check",
        "description": "We conduct thorough background checks and verify your business meets all regulatory requirements.",
        "duration": "14-21 days",
        "icon": "Shield"
      },
      {
        "step": 5,
        "title": "License Issuance",
        "description": "Once approved, we issue your official cryptocurrency trading license with all necessary documentation.",
        "duration": "2-3 days",
        "icon": "Award"
      },
      {
        "step": 6,
        "title": "Ongoing Support",
        "description": "Receive continuous support and guidance to maintain compliance and renew your license when needed.",
        "duration": "Ongoing",
        "icon": "Headphones"
      }
    ]
  },
  "benefits": {
    "title": "Benefits of Getting Licensed",
    "list": [
      "Complete legal protection and peace of mind",
      "Access to global cryptocurrency markets",
      "Ability to work with banks and financial institutions",
      "Enhanced business credibility and customer trust",
      "Protection against regulatory changes",
      "Expert guidance and ongoing support",
      "Competitive advantage over unlicensed competitors",
      "Reduced operational and legal risks"
    ]
  },
  "simple_analogy": {
    "title": "Simple Analogy: License as Your Business Passport",
    "description": "Think of your cryptocurrency license as a passport for your business. Just like a passport allows you to travel to different countries legally, a cryptocurrency license allows your business to operate in the digital asset world legally and safely."
  }
}')
ON CONFLICT (section, key) DO UPDATE SET
value = EXCLUDED.value,
updated_at = now();