
-- Insert company information settings
INSERT INTO public.settings (key, value, category, description) VALUES 
('companyName', '"CryptoLicense Pro"', 'company', 'Company name displayed in footer and throughout the site'),
('companyTagline', '"Crypto Licensing Regulatory"', 'company', 'Company tagline or subtitle'),
('companyDescription', '"CryptoLicense Pro provides official regulatory licensing for cryptocurrency traders and institutions. Our mission is to ensure compliance and security in digital asset trading."', 'company', 'Company description text in footer');

-- Insert contact information settings
INSERT INTO public.settings (key, value, category, description) VALUES 
('supportEmail', '"support@cryptolicensepro.com"', 'contact', 'Primary support email address'),
('salesEmail', '"sales@cryptolicensepro.com"', 'contact', 'Sales contact email address'),
('phoneNumber', '"+1 (555) 123-4567"', 'contact', 'Primary phone number'),
('contactPhone', '"+1 (555) 123-4567"', 'contact', 'Alternative contact phone field'),
('website', '""', 'contact', 'Company website URL');

-- Insert address information settings
INSERT INTO public.settings (key, value, category, description) VALUES 
('address', '"123 Business Ave"', 'address', 'Company street address'),
('companyAddress', '"123 Business Ave"', 'address', 'Alternative company address field'),
('city', '"New York, NY 10001"', 'address', 'City and postal code'),
('country', '"United States"', 'address', 'Country location');

-- Insert footer display settings
INSERT INTO public.settings (key, value, category, description) VALUES 
('showSupportEmail', 'true', 'footer_display', 'Show support email in footer contact section'),
('showPhoneNumber', 'true', 'footer_display', 'Show phone number in footer contact section'),
('showAddress', 'true', 'footer_display', 'Show address in footer contact section'),
('showWebsite', 'false', 'footer_display', 'Show website link in footer (only if website URL is set)'),
('copyrightText', '""', 'footer_display', 'Custom copyright text (leave empty for auto-generated)');

-- Insert footer link settings
INSERT INTO public.settings (key, value, category, description) VALUES 
('privacyPolicyUrl', '""', 'footer_links', 'URL for Privacy Policy page'),
('termsOfServiceUrl', '""', 'footer_links', 'URL for Terms of Service page'),
('legalNoticeUrl', '""', 'footer_links', 'URL for Legal Notice page'),
('showFooterLinks', 'true', 'footer_links', 'Show footer legal links section');
