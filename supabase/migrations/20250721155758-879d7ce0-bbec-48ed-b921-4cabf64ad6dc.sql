
-- Insert features section content
INSERT INTO public.content (section, key, value) VALUES 
('features', 'title', '"Comprehensive Licensing Solutions"'),
('features', 'subtitle', '"Our Services"'),
('features', 'description', '"We provide end-to-end cryptocurrency licensing solutions designed to meet the evolving needs of digital asset businesses worldwide."'),
('features', 'items', '[
  {
    "title": "Fast Processing",
    "description": "Get your cryptocurrency license quickly with our streamlined application process and expert guidance.",
    "icon": "Zap"
  },
  {
    "title": "Regulatory Compliance",
    "description": "Ensure full compliance with international cryptocurrency regulations and standards.",
    "icon": "Shield"
  },
  {
    "title": "Expert Support",
    "description": "Access our team of experienced professionals for guidance throughout the licensing process.",
    "icon": "Users"
  },
  {
    "title": "Secure Framework",
    "description": "Built on secure, tested frameworks that meet the highest industry security standards.",
    "icon": "Lock"
  },
  {
    "title": "Global Recognition",
    "description": "Our licenses are recognized and accepted by major financial institutions worldwide.",
    "icon": "Building"
  },
  {
    "title": "24/7 Support",
    "description": "Round-the-clock customer support to assist you with any questions or concerns.",
    "icon": "HeadphonesIcon"
  }
]'::jsonb);

-- Insert about section content
INSERT INTO public.content (section, key, value) VALUES 
('about', 'title', '"Your Trusted Partner in Cryptocurrency Licensing"'),
('about', 'subtitle', '"About APEX"'),
('about', 'description', '["APEX is a leading provider of cryptocurrency licensing solutions, helping businesses navigate the complex regulatory landscape of digital assets. Our team of experts has years of experience in financial regulations and cryptocurrency compliance.", "We understand that obtaining the right licenses is crucial for your business success. That''s why we''ve developed a comprehensive platform that simplifies the licensing process while ensuring full regulatory compliance."]'::jsonb),
('about', 'features', '[
  {
    "title": "Regulatory Expertise",
    "description": "Deep understanding of global cryptocurrency regulations and compliance requirements.",
    "icon": "Shield"
  },
  {
    "title": "Proven Track Record",
    "description": "Successfully helped hundreds of businesses obtain their cryptocurrency licenses.",
    "icon": "CheckCircle"
  },
  {
    "title": "Comprehensive Documentation",
    "description": "Complete documentation and support throughout the entire licensing process.",
    "icon": "FileCheck"
  }
]'::jsonb),
('about', 'legalNotice', '"This service is provided for informational purposes. Please consult with legal professionals for specific regulatory advice in your jurisdiction."');

-- Insert stats section content
INSERT INTO public.content (section, key, value) VALUES 
('stats', 'title', '"Trusted by Industry Leaders"'),
('stats', 'subtitle', '"Our Impact"'),
('stats', 'description', '"Join thousands of satisfied clients who have successfully obtained their cryptocurrency licenses through our platform."'),
('stats', 'items', '[
  {
    "number": "500+",
    "label": "Licenses Issued",
    "description": "Successfully processed applications"
  },
  {
    "number": "50+",
    "label": "Countries Served",
    "description": "Global regulatory coverage"
  },
  {
    "number": "99%",
    "label": "Success Rate",
    "description": "Application approval rate"
  },
  {
    "number": "24/7",
    "label": "Support Available",
    "description": "Round-the-clock assistance"
  }
]'::jsonb);

-- Insert whatIsLicense section content
INSERT INTO public.content (section, key, value) VALUES 
('whatIsLicense', 'title', '"What is a Cryptocurrency License?"'),
('whatIsLicense', 'subtitle', '"Understanding Licensing"'),
('whatIsLicense', 'description', '"A cryptocurrency license is a legal authorization that allows businesses to operate in the digital asset space while maintaining compliance with local and international regulations."'),
('whatIsLicense', 'content', '"Our comprehensive licensing solutions ensure your business operates within legal frameworks while providing the flexibility to grow and expand in the cryptocurrency market. We handle all aspects of the licensing process, from initial application to final approval."'),
('whatIsLicense', 'benefits', '[
  "Legal compliance with cryptocurrency regulations",
  "Access to banking services and financial institutions",
  "Enhanced credibility with customers and partners",
  "Protection against regulatory penalties",
  "Ability to operate in multiple jurisdictions"
]'::jsonb);

-- Insert hero section content
INSERT INTO public.content (section, key, value) VALUES 
('hero', 'headline', '"Get Your Cryptocurrency License Fast & Secure"'),
('hero', 'subheadline', '"Join thousands of successful businesses who have obtained their cryptocurrency licenses through our expert-guided process. Fast, secure, and fully compliant with international regulations."'),
('hero', 'ctaText', '"Start Your Application"'),
('hero', 'ctaSecondaryText', '"Learn More"');

-- Insert process section content
INSERT INTO public.content (section, key, value) VALUES 
('process', 'title', '"How to Get Your License"'),
('process', 'subtitle', '"Simple Process"'),
('process', 'description', '"Follow our streamlined process to obtain your cryptocurrency license quickly and efficiently."'),
('process', 'cta_text', '"Start Your Application"'),
('process', 'steps', '[
  {
    "number": "01",
    "title": "Choose Your License",
    "description": "Select the appropriate license category based on your business needs and trading volume."
  },
  {
    "number": "02",
    "title": "Submit Application",
    "description": "Complete our comprehensive application form with all required business and personal information."
  },
  {
    "number": "03",
    "title": "Document Review",
    "description": "Our experts review your application and guide you through any additional requirements."
  },
  {
    "number": "04",
    "title": "Payment Processing",
    "description": "Complete the payment process using our secure cryptocurrency payment system."
  },
  {
    "number": "05",
    "title": "License Issued",
    "description": "Receive your official cryptocurrency license and begin operating legally."
  }
]'::jsonb);

-- Insert verification section content
INSERT INTO public.content (section, key, value) VALUES 
('verification', 'title', '"Verify Your License"'),
('verification', 'subtitle', '"License Verification"'),
('verification', 'description', '"Instantly verify the authenticity of any cryptocurrency license issued through our platform. Enter the license ID below to check its status and validity."'),
('verification', 'placeholder', '"Enter license ID (e.g., APEX-T3-2024-001234)"'),
('verification', 'buttonText', '"Verify License"');
