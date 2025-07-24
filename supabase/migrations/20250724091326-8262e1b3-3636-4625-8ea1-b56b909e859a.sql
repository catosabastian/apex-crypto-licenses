-- Create license categories management table
CREATE TABLE public.license_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_number INTEGER NOT NULL UNIQUE,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  min_volume TEXT NOT NULL,
  validity_period_months INTEGER NOT NULL DEFAULT 12,
  available BOOLEAN NOT NULL DEFAULT true,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  icon TEXT DEFAULT 'Shield',
  color TEXT DEFAULT 'blue',
  display_order INTEGER DEFAULT 0,
  popular BOOLEAN DEFAULT false,
  exclusive BOOLEAN DEFAULT false,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.license_categories ENABLE ROW LEVEL SECURITY;

-- Create policies for license categories
CREATE POLICY "Public can read license categories" 
ON public.license_categories 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can manage license categories" 
ON public.license_categories 
FOR ALL 
USING (is_admin())
WITH CHECK (is_admin());

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_license_categories_updated_at
BEFORE UPDATE ON public.license_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default license categories
INSERT INTO public.license_categories (category_number, name, price, min_volume, features, icon, color, display_order, available) VALUES
(1, 'Basic Trader', '10,000 USDT', '$50,000', '[
  "1-year validity period",
  "Individual trader verification", 
  "Basic compliance certification",
  "Standard support response",
  "Recognized on major exchanges",
  "Email support during business hours"
]'::jsonb, 'Shield', 'blue', 1, false),

(2, 'Standard Trader', '25,000 USDT', '$100,000', '[
  "1-year validity period",
  "Enhanced verification process",
  "Standard compliance certification", 
  "Priority support response",
  "Recognized on major exchanges",
  "Basic trading protection coverage",
  "Phone support during business hours"
]'::jsonb, 'CheckCircle', 'green', 2, false),

(3, 'Advanced Trader', '50,000 USDT', '$250,000', '[
  "1-year validity period",
  "Priority verification process",
  "Advanced compliance certification",
  "24/7 support response", 
  "Recognized on major exchanges",
  "Trading strategy protection",
  "Dedicated account manager",
  "Advanced risk management tools"
]'::jsonb, 'Star', 'purple', 3, true),

(4, 'Professional Trader', '100,000 USDT', '$500,000', '[
  "1-year validity period",
  "Fast-track verification",
  "Professional compliance cert",
  "Dedicated support line",
  "Global regulatory recognition",
  "Advanced trading protection", 
  "Multi-exchange access privileges",
  "Custom compliance framework",
  "Premium trading tools access"
]'::jsonb, 'Crown', 'gold', 4, true),

(5, 'Institutional Trader', '250,000 USDT', '$1,000,000+', '[
  "1-year validity period",
  "Expedited verification process",
  "Comprehensive compliance cert",
  "Dedicated account representative",
  "Global regulatory recognition",
  "Full trading strategy protection",
  "Multi-user access controls", 
  "Custom compliance framework",
  "White-label solutions available",
  "API access for system integration"
]'::jsonb, 'Building', 'platinum', 5, true),

(6, 'Executive Trader', '500,000 USDT', '$2,500,000+', '[
  "1-year validity period",
  "Instant verification process",
  "Executive compliance certification",
  "Personal account executive",
  "Worldwide regulatory recognition",
  "Complete trading ecosystem protection",
  "Unlimited user access controls",
  "Bespoke compliance framework", 
  "Private trading infrastructure",
  "Direct regulatory liaison",
  "Custom integration solutions"
]'::jsonb, 'Trophy', 'diamond', 6, true);

-- Update Professional Trader to be popular
UPDATE public.license_categories SET popular = true WHERE category_number = 4;

-- Update Executive Trader to be exclusive  
UPDATE public.license_categories SET exclusive = true WHERE category_number = 6;