
-- Add all 12 license categories with their settings
-- First, let's add the missing categories (7-12) with their pricing, availability, status, and descriptions

-- Category 7: Crypto Wallet License
INSERT INTO public.settings (key, value, category, description) VALUES
('category7_price', '"$75,000"', 'pricing', 'Crypto Wallet License pricing'),
('category7_available', 'true', 'pricing', 'Crypto Wallet License availability'),
('category7_status', '"AVAILABLE"', 'pricing', 'Crypto Wallet License status'),
('category7_description', '"Professional cryptocurrency wallet service license"', 'pricing', 'Crypto Wallet License description'),
('category7_name', '"Crypto Wallet License"', 'pricing', 'Crypto Wallet License name'),
('category7_type', '"crypto"', 'pricing', 'Crypto Wallet License type'),
('category7_minVolume', '"$500K"', 'pricing', 'Crypto Wallet License minimum volume')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Category 8: Fintech EMI License
INSERT INTO public.settings (key, value, category, description) VALUES
('category8_price', '"$120,000"', 'pricing', 'Fintech EMI License pricing'),
('category8_available', 'true', 'pricing', 'Fintech EMI License availability'),
('category8_status', '"SELLING FAST"', 'pricing', 'Fintech EMI License status'),
('category8_description', '"Electronic Money Institution license for payment services"', 'pricing', 'Fintech EMI License description'),
('category8_name', '"Fintech EMI License"', 'pricing', 'Fintech EMI License name'),
('category8_type', '"fintech"', 'pricing', 'Fintech EMI License type'),
('category8_minVolume', '"$1M"', 'pricing', 'Fintech EMI License minimum volume')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Category 9: Fintech MSP License
INSERT INTO public.settings (key, value, category, description) VALUES
('category9_price', '"$85,000"', 'pricing', 'Fintech MSP License pricing'),
('category9_available', 'true', 'pricing', 'Fintech MSP License availability'),
('category9_status', '"AVAILABLE"', 'pricing', 'Fintech MSP License status'),
('category9_description', '"Money Service Provider license for financial services"', 'pricing', 'Fintech MSP License description'),
('category9_name', '"Fintech MSP License"', 'pricing', 'Fintech MSP License name'),
('category9_type', '"fintech"', 'pricing', 'Fintech MSP License type'),
('category9_minVolume', '"$750K"', 'pricing', 'Fintech MSP License minimum volume')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Category 10: Gambling Online License
INSERT INTO public.settings (key, value, category, description) VALUES
('category10_price', '"$200,000"', 'pricing', 'Gambling Online License pricing'),
('category10_available', 'false', 'pricing', 'Gambling Online License availability'),
('category10_status', '"SOLD OUT"', 'pricing', 'Gambling Online License status'),
('category10_description', '"Online gambling and betting operations license"', 'pricing', 'Gambling Online License description'),
('category10_name', '"Gambling Online License"', 'pricing', 'Gambling Online License name'),
('category10_type', '"gambling"', 'pricing', 'Gambling Online License type'),
('category10_minVolume', '"$2M"', 'pricing', 'Gambling Online License minimum volume')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Category 11: Gambling Lottery License
INSERT INTO public.settings (key, value, category, description) VALUES
('category11_price', '"$150,000"', 'pricing', 'Gambling Lottery License pricing'),
('category11_available', 'true', 'pricing', 'Gambling Lottery License availability'),
('category11_status', '"RECOMMENDED"', 'pricing', 'Gambling Lottery License status'),
('category11_description', '"Lottery and gaming operations license"', 'pricing', 'Gambling Lottery License description'),
('category11_name', '"Gambling Lottery License"', 'pricing', 'Gambling Lottery License name'),
('category11_type', '"gambling"', 'pricing', 'Gambling Lottery License type'),
('category11_minVolume', '"$1.5M"', 'pricing', 'Gambling Lottery License minimum volume')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Category 12: Corporate Offshore License
INSERT INTO public.settings (key, value, category, description) VALUES
('category12_price', '"$45,000"', 'pricing', 'Corporate Offshore License pricing'),
('category12_available', 'true', 'pricing', 'Corporate Offshore License availability'),
('category12_status', '"AVAILABLE"', 'pricing', 'Corporate Offshore License status'),
('category12_description', '"Offshore corporate structure and services license"', 'pricing', 'Corporate Offshore License description'),
('category12_name', '"Corporate Offshore License"', 'pricing', 'Corporate Offshore License name'),
('category12_type', '"corporate"', 'pricing', 'Corporate Offshore License type'),
('category12_minVolume', '"$300K"', 'pricing', 'Corporate Offshore License minimum volume')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Update existing categories to include missing fields
-- Category 1: Basic Trader
INSERT INTO public.settings (key, value, category, description) VALUES
('category1_description', '"Entry-level trading license for basic operations"', 'pricing', 'Basic Trader License description'),
('category1_name', '"Basic Trader"', 'pricing', 'Basic Trader License name'),
('category1_type', '"trading"', 'pricing', 'Basic Trader License type'),
('category1_minVolume', '"$100K"', 'pricing', 'Basic Trader License minimum volume')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Category 2: Standard Trader
INSERT INTO public.settings (key, value, category, description) VALUES
('category2_description', '"Standard trading license with expanded capabilities"', 'pricing', 'Standard Trader License description'),
('category2_name', '"Standard Trader"', 'pricing', 'Standard Trader License name'),
('category2_type', '"trading"', 'pricing', 'Standard Trader License type'),
('category2_minVolume', '"$250K"', 'pricing', 'Standard Trader License minimum volume')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Category 3: Advanced Trader
INSERT INTO public.settings (key, value, category, description) VALUES
('category3_description', '"Advanced trading license with premium features"', 'pricing', 'Advanced Trader License description'),
('category3_name', '"Advanced Trader"', 'pricing', 'Advanced Trader License name'),
('category3_type', '"trading"', 'pricing', 'Advanced Trader License type'),
('category3_minVolume', '"$500K"', 'pricing', 'Advanced Trader License minimum volume')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Category 4: Professional Trader
INSERT INTO public.settings (key, value, category, description) VALUES
('category4_description', '"Professional trading license for institutional operations"', 'pricing', 'Professional Trader License description'),
('category4_name', '"Professional Trader"', 'pricing', 'Professional Trader License name'),
('category4_type', '"trading"', 'pricing', 'Professional Trader License type'),
('category4_minVolume', '"$1M"', 'pricing', 'Professional Trader License minimum volume')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Category 5: Institutional Trader
INSERT INTO public.settings (key, value, category, description) VALUES
('category5_description', '"Institutional trading license for large-scale operations"', 'pricing', 'Institutional Trader License description'),
('category5_name', '"Institutional Trader"', 'pricing', 'Institutional Trader License name'),
('category5_type', '"trading"', 'pricing', 'Institutional Trader License type'),
('category5_minVolume', '"$2M"', 'pricing', 'Institutional Trader License minimum volume')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Category 6: Executive Trader
INSERT INTO public.settings (key, value, category, description) VALUES
('category6_description', '"Executive trading license with premium access"', 'pricing', 'Executive Trader License description'),
('category6_name', '"Executive Trader"', 'pricing', 'Executive Trader License name'),
('category6_type', '"trading"', 'pricing', 'Executive Trader License type'),
('category6_minVolume', '"$5M"', 'pricing', 'Executive Trader License minimum volume')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
