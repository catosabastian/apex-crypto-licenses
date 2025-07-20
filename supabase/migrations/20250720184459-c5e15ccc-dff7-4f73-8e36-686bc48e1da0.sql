
-- Create applications table for license applications
CREATE TABLE public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  category TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'processing')),
  amount TEXT,
  payment_method TEXT,
  transaction_id TEXT,
  documents JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create licenses table for issued licenses
CREATE TABLE public.licenses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  license_id TEXT NOT NULL UNIQUE,
  holder_name TEXT NOT NULL,
  license_type TEXT NOT NULL,
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  expiry_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'suspended', 'revoked')),
  platforms TEXT,
  application_id UUID REFERENCES public.applications(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create payment_addresses table for cryptocurrency wallet addresses
CREATE TABLE public.payment_addresses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cryptocurrency TEXT NOT NULL,
  address TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  qr_code_data TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(cryptocurrency)
);

-- Create settings table for admin-configurable content
CREATE TABLE public.settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contacts table for contact form submissions
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'responded', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create content table for dynamic website content
CREATE TABLE public.content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL,
  key TEXT NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(section, key)
);

-- Enable Row Level Security (RLS) - since only admins will manage this data, we'll make it public for now
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access (since frontend users need to read this data)
-- and full access for authenticated users (admin functionality)

-- Applications: Public can insert, read own data; all can read for admin
CREATE POLICY "Allow public application submission" ON public.applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read of applications" ON public.applications FOR SELECT USING (true);
CREATE POLICY "Allow public update of applications" ON public.applications FOR UPDATE USING (true);

-- Licenses: Public read access for verification
CREATE POLICY "Allow public license verification" ON public.licenses FOR SELECT USING (true);

-- Payment addresses: Public read access
CREATE POLICY "Allow public read of payment addresses" ON public.payment_addresses FOR SELECT USING (true);
CREATE POLICY "Allow full access to payment addresses" ON public.payment_addresses FOR ALL USING (true);

-- Settings: Public read access
CREATE POLICY "Allow public read of settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Allow full access to settings" ON public.settings FOR ALL USING (true);

-- Contacts: Public can insert, full access for admin
CREATE POLICY "Allow public contact submission" ON public.contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow full access to contacts" ON public.contacts FOR ALL USING (true);

-- Content: Public read access
CREATE POLICY "Allow public read of content" ON public.content FOR SELECT USING (true);
CREATE POLICY "Allow full access to content" ON public.content FOR ALL USING (true);

-- Insert default payment addresses from current settings
INSERT INTO public.payment_addresses (cryptocurrency, address, is_active) VALUES
('BTC', 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', true),
('ETH', '0x742d35Cc6663C65C926d75d60e3B3d97c8a0e0e0', true),
('USDT_TRON', 'TG3XXyExBkPp9nzdajDGFahC9nyKERJpUN', true),
('USDT_ETH', '0x742d35Cc6663C65C926d75d60e3B3d97c8a0e0e0', true),
('XRP', 'rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH', true);

-- Insert default settings for license categories
INSERT INTO public.settings (key, value, category, description) VALUES
('category1_price', '"50,000 USDT"', 'pricing', 'Basic Trader license price'),
('category1_available', 'true', 'pricing', 'Basic Trader availability'),
('category2_price', '"85,000 USDT"', 'pricing', 'Standard Trader license price'),
('category2_available', 'true', 'pricing', 'Standard Trader availability'),
('category3_price', '"120,000 USDT"', 'pricing', 'Advanced Trader license price'),
('category3_available', 'true', 'pricing', 'Advanced Trader availability'),
('category4_price', '"200,000 USDT"', 'pricing', 'Professional Trader license price'),
('category4_available', 'true', 'pricing', 'Professional Trader availability'),
('category5_price', '"350,000 USDT"', 'pricing', 'Institutional Trader license price'),
('category5_available', 'true', 'pricing', 'Institutional Trader availability'),
('category6_price', '"500,000 USDT"', 'pricing', 'Executive Trader license price'),
('category6_available', 'true', 'pricing', 'Executive Trader availability');

-- Insert default process steps content
INSERT INTO public.content (section, key, value) VALUES
('process', 'title', '"How to Get Your License"'),
('process', 'subtitle', 'Simple Process'),
('process', 'description', '"Follow our streamlined 3-step process to obtain your cryptocurrency trading license quickly and efficiently."'),
('process', 'steps', '[
  {
    "number": "01",
    "title": "Submit Application",
    "description": "Complete our comprehensive application form with your trading details and business information.",
    "icon": "CreditCard"
  },
  {
    "number": "02", 
    "title": "Document Review",
    "description": "Our compliance team reviews your application and supporting documents within 24-48 hours.",
    "icon": "Upload"
  },
  {
    "number": "03",
    "title": "License Issued",
    "description": "Once approved, receive your digital trading license and start trading on approved platforms.",
    "icon": "Award"
  }
]'),
('process', 'cta_text', '"Start Your Application"');

-- Insert sample license for verification testing
INSERT INTO public.licenses (license_id, holder_name, license_type, issue_date, expiry_date, platforms) VALUES
('CL-2023-8294-T2', 'APEX Trading Solutions Ltd.', 'Professional Trader', '2023-11-15', '2024-11-15', 'Binance, Coinbase Pro, Kraken, FTX');

-- Create indexes for better performance
CREATE INDEX idx_applications_status ON public.applications(status);
CREATE INDEX idx_applications_email ON public.applications(email);
CREATE INDEX idx_licenses_license_id ON public.licenses(license_id);
CREATE INDEX idx_licenses_status ON public.licenses(status);
CREATE INDEX idx_settings_key ON public.settings(key);
CREATE INDEX idx_content_section_key ON public.content(section, key);

-- Enable realtime for live updates
ALTER TABLE public.applications REPLICA IDENTITY FULL;
ALTER TABLE public.licenses REPLICA IDENTITY FULL;
ALTER TABLE public.payment_addresses REPLICA IDENTITY FULL;
ALTER TABLE public.settings REPLICA IDENTITY FULL;
ALTER TABLE public.contacts REPLICA IDENTITY FULL;
ALTER TABLE public.content REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.applications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.licenses;
ALTER PUBLICATION supabase_realtime ADD TABLE public.payment_addresses;
ALTER PUBLICATION supabase_realtime ADD TABLE public.settings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.contacts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.content;
