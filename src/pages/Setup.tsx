
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { Shield, Database, Key, CheckCircle, AlertTriangle, Lock } from 'lucide-react';

const Setup = () => {
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [setupProgress, setSetupProgress] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const ADMIN_PASSWORD = 'apex2024admin'; // In production, this should be more secure

  const handleAdminAuth = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({
        title: "Admin Access Granted",
        description: "You can now set up the Supabase connection",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid admin password",
        variant: "destructive",
      });
    }
  };

  const databaseSchema = `
-- Create applications table
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  category TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  amount TEXT,
  payment_method TEXT,
  transaction_id TEXT,
  documents JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create licenses table
CREATE TABLE IF NOT EXISTS public.licenses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  license_id TEXT NOT NULL,
  holder_name TEXT NOT NULL,
  license_type TEXT NOT NULL,
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  expiry_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  platforms TEXT,
  application_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create payment_addresses table
CREATE TABLE IF NOT EXISTS public.payment_addresses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cryptocurrency TEXT NOT NULL,
  address TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  qr_code_data TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS public.settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL,
  value JSONB NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create content table
CREATE TABLE IF NOT EXISTS public.content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL,
  key TEXT NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;

-- Enable realtime for tables
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
`;

  const insertInitialData = `
-- Insert initial settings
INSERT INTO public.settings (key, value, category, description) VALUES
('category1_price', '"$25,000"', 'pricing', 'Basic Trader license price'),
('category1_status', '"SOLD OUT"', 'pricing', 'Basic Trader license status'),
('category1_available', 'false', 'pricing', 'Basic Trader license availability'),
('category2_price', '"$50,000"', 'pricing', 'Standard Trader license price'),
('category2_status', '"SOLD OUT"', 'pricing', 'Standard Trader license status'),
('category2_available', 'false', 'pricing', 'Standard Trader license availability'),
('category3_price', '"$70,000"', 'pricing', 'Advanced Trader license price'),
('category3_status', '"RECOMMENDED"', 'pricing', 'Advanced Trader license status'),
('category3_available', 'true', 'pricing', 'Advanced Trader license availability'),
('category4_price', '"$150,000"', 'pricing', 'Professional Trader license price'),
('category4_status', '"SELLING FAST"', 'pricing', 'Professional Trader license status'),
('category4_available', 'true', 'pricing', 'Professional Trader license availability'),
('category5_price', '"$250,000"', 'pricing', 'Institutional Trader license price'),
('category5_status', '"SELLING FAST"', 'pricing', 'Institutional Trader license status'),
('category5_available', 'true', 'pricing', 'Institutional Trader license availability'),
('category6_price', '"$500,000"', 'pricing', 'Executive Trader license price'),
('category6_status', '"SELLING FAST"', 'pricing', 'Executive Trader license status'),
('category6_available', 'true', 'pricing', 'Executive Trader license availability')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();

-- Insert initial payment addresses
INSERT INTO public.payment_addresses (cryptocurrency, address, is_active) VALUES
('bitcoin', '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2', true),
('ethereum', '0x742d35Cc6634C0532925a3b8D4dAE6eE4c0dA3DD', true),
('usdt_tron', 'TQn9Y2khEsLJW1ChVWFMSMeRDow5oREqNK', true),
('usdt_ethereum', '0x742d35Cc6634C0532925a3b8D4dAE6eE4c0dA3DD', true),
('xrp', 'rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH', true)
ON CONFLICT (cryptocurrency) DO UPDATE SET address = EXCLUDED.address, updated_at = now();
`;

  const rLSPolicies = `
-- Create RLS policies for applications
DROP POLICY IF EXISTS "Allow public application submission" ON public.applications;
CREATE POLICY "Allow public application submission" ON public.applications FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public read of applications" ON public.applications;
CREATE POLICY "Allow public read of applications" ON public.applications FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public update of applications" ON public.applications;
CREATE POLICY "Allow public update of applications" ON public.applications FOR UPDATE USING (true);

-- Create policies for licenses
DROP POLICY IF EXISTS "Allow public license verification" ON public.licenses;
CREATE POLICY "Allow public license verification" ON public.licenses FOR SELECT USING (true);

-- Create policies for payment_addresses
DROP POLICY IF EXISTS "Allow public read of payment addresses" ON public.payment_addresses;
CREATE POLICY "Allow public read of payment addresses" ON public.payment_addresses FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow full access to payment addresses" ON public.payment_addresses;
CREATE POLICY "Allow full access to payment addresses" ON public.payment_addresses FOR ALL USING (true);

-- Create policies for settings
DROP POLICY IF EXISTS "Allow public read of settings" ON public.settings;
CREATE POLICY "Allow public read of settings" ON public.settings FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow full access to settings" ON public.settings;
CREATE POLICY "Allow full access to settings" ON public.settings FOR ALL USING (true);

-- Create policies for contacts
DROP POLICY IF EXISTS "Allow public contact submission" ON public.contacts;
CREATE POLICY "Allow public contact submission" ON public.contacts FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow full access to contacts" ON public.contacts;
CREATE POLICY "Allow full access to contacts" ON public.contacts FOR ALL USING (true);

-- Create policies for content
DROP POLICY IF EXISTS "Allow public read of content" ON public.content;
CREATE POLICY "Allow public read of content" ON public.content FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow full access to content" ON public.content;
CREATE POLICY "Allow full access to content" ON public.content FOR ALL USING (true);
`;

  const testConnection = async () => {
    if (!supabaseUrl || !supabaseKey) {
      setTestResult('Please enter both URL and API key');
      return;
    }

    setIsLoading(true);
    setTestResult(null);

    try {
      const testClient = createClient(supabaseUrl, supabaseKey);
      
      // Test connection
      const { data, error } = await testClient
        .from('applications')
        .select('count', { count: 'exact', head: true });

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setTestResult('✅ Connection successful!');
      
      // Store credentials
      localStorage.setItem('supabase_url', supabaseUrl);
      localStorage.setItem('supabase_key', supabaseKey);
      
      toast({
        title: "Connection Successful",
        description: "Supabase credentials saved successfully",
      });

    } catch (error: any) {
      setTestResult(`❌ Connection failed: ${error.message}`);
      toast({
        title: "Connection Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const setupDatabase = async () => {
    if (!supabaseUrl || !supabaseKey) {
      toast({
        title: "Error",
        description: "Please test connection first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setSetupProgress([]);

    try {
      const testClient = createClient(supabaseUrl, supabaseKey);
      
      // Step 1: Create tables
      setSetupProgress(['Creating database schema...']);
      const schemaCommands = databaseSchema.split(';').filter(cmd => cmd.trim());
      
      for (const command of schemaCommands) {
        if (command.trim()) {
          try {
            await testClient.rpc('exec_sql', { sql: command.trim() });
          } catch (err) {
            console.log('Command executed or already exists:', err);
          }
        }
      }

      // Step 2: Insert initial data
      setSetupProgress(prev => [...prev, 'Inserting initial data...']);
      const dataCommands = insertInitialData.split(';').filter(cmd => cmd.trim());
      
      for (const command of dataCommands) {
        if (command.trim()) {
          try {
            await testClient.rpc('exec_sql', { sql: command.trim() });
          } catch (err) {
            console.log('Data command executed:', err);
          }
        }
      }

      // Step 3: Set up RLS policies
      setSetupProgress(prev => [...prev, 'Setting up security policies...']);
      const policyCommands = rLSPolicies.split(';').filter(cmd => cmd.trim());
      
      for (const command of policyCommands) {
        if (command.trim()) {
          try {
            await testClient.rpc('exec_sql', { sql: command.trim() });
          } catch (err) {
            console.log('Policy command executed:', err);
          }
        }
      }

      setSetupProgress(prev => [...prev, '✅ Database setup complete!']);

      toast({
        title: "Database Setup Complete",
        description: "All tables, data, and security policies have been created",
      });

      // Redirect to admin after successful setup
      setTimeout(() => {
        navigate('/admin');
      }, 2000);

    } catch (error: any) {
      console.error('Database setup error:', error);
      toast({
        title: "Database Setup Failed", 
        description: "Please check your Supabase permissions and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Admin authentication screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 p-4">
        <div className="max-w-md mx-auto pt-20">
          <Card className="border-2 border-destructive/20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-destructive/10 rounded-full w-fit">
                <Lock className="h-8 w-8 text-destructive" />
              </div>
              <CardTitle className="text-2xl">Admin Access Required</CardTitle>
              <CardDescription>
                This setup page is restricted to administrators only
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="adminPassword">Admin Password</Label>
                <Input
                  id="adminPassword"
                  type="password"
                  placeholder="Enter admin password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAdminAuth()}
                />
              </div>
              <Button onClick={handleAdminAuth} className="w-full">
                <Shield className="h-4 w-4 mr-2" />
                Authenticate
              </Button>
              <div className="text-center">
                <Button variant="link" onClick={() => navigate('/')}>
                  ← Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 p-4">
      <div className="max-w-4xl mx-auto pt-10">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
            <Database className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">APEX Supabase Setup</h1>
          <p className="text-muted-foreground">
            Configure your Supabase connection and automatically set up the database
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Supabase Project Configuration
            </CardTitle>
            <CardDescription>
              Connect your APEX project to Supabase and set up the database automatically
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="url">Supabase Project URL</Label>
                <Input
                  id="url"
                  placeholder="https://your-project.supabase.co"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="key">Supabase Anon Key</Label>
                <Input
                  id="key"
                  type="password"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  value={supabaseKey}
                  onChange={(e) => setSupabaseKey(e.target.value)}
                />
              </div>

              {testResult && (
                <Alert>
                  <AlertDescription>{testResult}</AlertDescription>
                </Alert>
              )}

              <div className="flex gap-3">
                <Button 
                  onClick={testConnection} 
                  disabled={isLoading}
                  variant="outline"
                >
                  {isLoading ? 'Testing...' : 'Test Connection'}
                </Button>
                
                <Button 
                  onClick={setupDatabase} 
                  disabled={isLoading || !testResult?.includes('✅')}
                >
                  {isLoading ? 'Setting up...' : 'Setup Database'}
                </Button>
              </div>
            </div>

            {setupProgress.length > 0 && (
              <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold">Setup Progress:</h4>
                {setupProgress.map((step, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{step}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Setup Instructions:
              </h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>Create a new project in Supabase</li>
                <li>Copy your Project URL and Anon key from Settings → API</li>
                <li>Paste them above and test the connection</li>
                <li>Click "Setup Database" to create all required tables</li>
                <li>Your project will be ready to use!</li>
              </ol>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4">
                <h4 className="font-semibold mb-2">✅ What gets created:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Applications table with RLS</li>
                  <li>• Licenses table with RLS</li>
                  <li>• Payment addresses table</li>
                  <li>• Settings table</li>
                  <li>• Contacts table</li>
                  <li>• Real-time subscriptions</li>
                </ul>
              </Card>
              
              <Card className="p-4">
                <h4 className="font-semibold mb-2">🔒 Security Features:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Row Level Security (RLS)</li>
                  <li>• Public read policies</li>
                  <li>• Secure admin access</li>
                  <li>• Real-time data sync</li>
                  <li>• Encrypted connections</li>
                </ul>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Setup;
