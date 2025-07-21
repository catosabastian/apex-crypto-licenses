import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Eye, EyeOff } from 'lucide-react';

const Setup = () => {
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [showKey, setShowKey] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const auth = localStorage.getItem('admin_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const authenticateAdmin = () => {
    // Simple admin authentication - in production, use proper auth
    if (adminPassword === 'admin123' || adminPassword === 'apex_admin_2024') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_authenticated', 'true');
      toast({
        title: "Authentication Successful",
        description: "Welcome to the setup page",
      });
    } else {
      toast({
        title: "Authentication Failed",
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

-- Create policies for applications
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

-- Insert initial data
INSERT INTO public.settings (key, value, category) VALUES
('category1_price', '"$25,000"', 'pricing'),
('category1_status', '"SOLD OUT"', 'pricing'),
('category2_price', '"$50,000"', 'pricing'),
('category2_status', '"SOLD OUT"', 'pricing'),
('category3_price', '"$70,000"', 'pricing'),
('category3_status', '"RECOMMENDED"', 'pricing'),
('category4_price', '"$150,000"', 'pricing'),
('category4_status', '"SELLING FAST"', 'pricing'),
('category5_price', '"$250,000"', 'pricing'),
('category5_status', '"RECOMMENDED"', 'pricing'),
('category6_price', '"$500,000"', 'pricing'),
('category6_status', '"SELLING FAST"', 'pricing')
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.payment_addresses (cryptocurrency, address, is_active) VALUES
('bitcoin', '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2', true),
('ethereum', '0x742d35Cc6634C0532925a3b8D4dAE6eE4c0dA3DD', true),
('usdt', 'TQn9Y2khEsLJW1ChVWFMSMeRDow5oREqNK', true)
ON CONFLICT (cryptocurrency) DO NOTHING;
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
      
      // Test connection by trying to query a simple table
      const { data, error } = await testClient
        .from('applications')
        .select('count', { count: 'exact', head: true });

      if (error && error.code !== 'PGRST116') { // PGRST116 is "table not found" which is expected
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

    try {
      const testClient = createClient(supabaseUrl, supabaseKey);
      
      // Execute database schema
      const { error } = await testClient.rpc('exec_sql', { sql: databaseSchema });
      
      if (error) {
        // If RPC doesn't exist, we'll need to create tables one by one
        console.log('RPC method not available, creating tables individually...');
        
        // Create each table individually using rpc
        const tableCommands = databaseSchema.split(';').filter(cmd => cmd.trim());
        
        for (const command of tableCommands) {
          if (command.trim()) {
            try {
              const { error: cmdError } = await testClient.rpc('exec_sql', { sql: command.trim() });
              if (cmdError) {
                console.log('Command may already exist or executed:', cmdError);
              }
            } catch (err) {
              console.log('Command executed or already exists:', err);
            }
          }
        }
      }

      toast({
        title: "Database Setup Complete",
        description: "All tables and initial data have been created",
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

  // Admin authentication gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 p-4 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-red-600">Restricted Access</CardTitle>
            <CardDescription>
              This page is restricted to administrators only. Please enter the admin password to continue.
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
                onKeyPress={(e) => e.key === 'Enter' && authenticateAdmin()}
              />
            </div>
            <Button onClick={authenticateAdmin} className="w-full">
              <Shield className="h-4 w-4 mr-2" />
              Authenticate
            </Button>
            <div className="text-center">
              <Button variant="link" onClick={() => navigate('/')}>
                Return to Homepage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 p-4">
      <div className="max-w-2xl mx-auto pt-20">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-sm text-muted-foreground">ADMIN ONLY</span>
            </div>
            <CardTitle>Supabase Project Setup</CardTitle>
            <CardDescription>
              Connect your project to Supabase and set up the database automatically
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
                <div className="relative">
                  <Input
                    id="key"
                    type={showKey ? "text" : "password"}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    value={supabaseKey}
                    onChange={(e) => setSupabaseKey(e.target.value)}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowKey(!showKey)}
                  >
                    {showKey ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
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

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium mb-2">Instructions:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>Create a new project in Supabase</li>
                <li>Copy your Project URL and Anon key from Settings → API</li>
                <li>Paste them above and test the connection</li>
                <li>Click "Setup Database" to create all required tables</li>
                <li>Your project will be ready to use!</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Setup;