
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, CheckCircle, Settings, User, Database } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Setup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [setupStep, setSetupStep] = useState<'check' | 'create' | 'complete'>('check');
  const [hasAdminUsers, setHasAdminUsers] = useState(false);
  const [error, setError] = useState('');
  const { createFirstAdmin, login } = useSupabaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminUsers();
  }, []);

  const checkAdminUsers = async () => {
    try {
      const { data, error } = await supabase.rpc('has_admin_users');
      if (error) {
        console.error('Error checking admin users:', error);
        setError('Failed to check admin users');
        return;
      }
      
      setHasAdminUsers(data === true);
      setSetupStep(data === true ? 'complete' : 'create');
    } catch (error) {
      console.error('Error checking admin users:', error);
      setError('Failed to check admin users');
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      // First, create the user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/setup`
        }
      });

      if (authError) {
        throw authError;
      }

      if (!authData.user) {
        throw new Error('Failed to create user account');
      }

      // If email confirmation is disabled, the user will be automatically signed in
      // If email confirmation is enabled, we need to handle that case
      if (authData.user && !authData.session) {
        setError('Please check your email to confirm your account, then return to complete setup');
        setIsLoading(false);
        return;
      }

      // Create the admin role for this user
      const adminCreated = await createFirstAdmin();
      
      if (!adminCreated) {
        throw new Error('Failed to create admin user');
      }

      toast({
        title: "Setup Complete",
        description: "Admin account created successfully",
      });

      setSetupStep('complete');
      
      // Redirect to admin panel after a short delay
      setTimeout(() => {
        navigate('/admin');
      }, 2000);

    } catch (error: any) {
      console.error('Setup error:', error);
      setError(error.message || 'Failed to create admin account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToAdmin = () => {
    navigate('/admin');
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  if (setupStep === 'check') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Database className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>System Setup</CardTitle>
            <CardDescription>Checking system configuration...</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (setupStep === 'complete') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <CardTitle>Setup Complete</CardTitle>
            <CardDescription>
              {hasAdminUsers ? 'Admin system is already configured' : 'Admin account created successfully'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleGoToAdmin} className="w-full">
              <Settings className="w-4 h-4 mr-2" />
              Go to Admin Panel
            </Button>
            <Button onClick={handleGoToLogin} variant="outline" className="w-full">
              <User className="w-4 h-4 mr-2" />
              Login Page
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-primary" />
          </div>
          <CardTitle>Create Admin Account</CardTitle>
          <CardDescription>
            Set up the first administrator account for your system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateAdmin} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                disabled={isLoading}
                minLength={6}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                required
                disabled={isLoading}
                minLength={6}
              />
            </div>
            
            <Separator />
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Admin Account...
                </>
              ) : (
                'Create Admin Account'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
