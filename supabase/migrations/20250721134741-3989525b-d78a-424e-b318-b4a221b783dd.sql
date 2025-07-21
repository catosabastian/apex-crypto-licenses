-- Insert demo license data for verification testing
INSERT INTO public.licenses (license_id, holder_name, license_type, issue_date, expiry_date, status, platforms) VALUES
('CL-2024-8294-T2', 'APEX Trading Solutions Ltd.', 'Professional Trader', '2024-01-15', '2025-01-15', 'active', 'Binance, Coinbase Pro, Kraken, Bybit'),
('CL-2024-7293-T1', 'Global Crypto Ventures Inc.', 'Standard Trader', '2024-02-20', '2025-02-20', 'active', 'Binance, Coinbase Pro'),
('CL-2024-9184-T3', 'Institutional Trading Corp.', 'Institutional Trader', '2024-03-10', '2025-03-10', 'active', 'All Major Exchanges'),
('CL-2024-5672-T4', 'Elite Digital Assets LLC', 'Executive Trader', '2024-03-25', '2025-03-25', 'active', 'All exchanges, Private markets'),
('CL-2024-3498-T1', 'Crypto Horizon Ltd.', 'Basic Trader', '2024-04-10', '2025-04-10', 'active', 'Binance, Coinbase'),
('CL-2024-8821-T3', 'Quantum Trading Group', 'Advanced Trader', '2024-05-15', '2025-05-15', 'active', 'Binance, Coinbase, Kraken, KuCoin')
ON CONFLICT (license_id) DO NOTHING;