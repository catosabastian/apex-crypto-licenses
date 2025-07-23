
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Wallet, Mail, Globe } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabaseDataManager } from '@/utils/supabaseDataManager';
import { SettingsManager } from './SettingsManager';
import { PaymentAddressManager } from './PaymentAddressManager';
import { ContactSettingsManager } from './ContactSettingsManager';

export const UnifiedSettingsManager = () => {
  const [activeSettingsTab, setActiveSettingsTab] = useState('pricing');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeSettings = async () => {
      try {
        setIsLoading(true);
        await supabaseDataManager.getSettings();
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing settings:', error);
        toast({
          title: "Settings Error",
          description: "Failed to load settings. Using defaults.",
          variant: "destructive",
        });
        setIsInitialized(true); // Still show the UI
      } finally {
        setIsLoading(false);
      }
    };

    initializeSettings();
  }, []);

  const refreshAllSettings = async () => {
    try {
      setIsLoading(true);
      // Reload all settings data
      await Promise.all([
        supabaseDataManager.getSettings(),
        supabaseDataManager.getPaymentAddresses()
      ]);
      
      toast({
        title: "Settings Refreshed",
        description: "All settings have been reloaded",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh settings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isInitialized) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">Settings Management</h2>
            <p className="text-muted-foreground">Loading settings...</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Settings Management</h2>
          <p className="text-muted-foreground">Configure all system settings and preferences</p>
        </div>
        <Button onClick={refreshAllSettings} disabled={isLoading}>
          <Settings className="h-4 w-4 mr-2" />
          {isLoading ? 'Refreshing...' : 'Refresh All'}
        </Button>
      </div>

      <Tabs value={activeSettingsTab} onValueChange={setActiveSettingsTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pricing" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Pricing
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            Payments
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Contact Info
          </TabsTrigger>
          <TabsTrigger value="website" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Website
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pricing" className="space-y-6">
          <SettingsManager />
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <PaymentAddressManager />
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <ContactSettingsManager />
        </TabsContent>

        <TabsContent value="website" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Website Settings</CardTitle>
              <CardDescription>
                Configure website-wide settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Website settings management will be available in a future update.
                  Use the Content Management section to update website content.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
