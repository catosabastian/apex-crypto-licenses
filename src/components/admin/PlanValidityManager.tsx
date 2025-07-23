import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, Edit, RefreshCw, Calendar, DollarSign } from 'lucide-react';

interface PlanValiditySetting {
  id: string;
  license_type: string;
  validity_period_months: number;
  renewal_reminder_days: number;
  grace_period_days: number;
  auto_renewal_enabled: boolean;
  price_per_period: number;
}

const PlanValidityManager = () => {
  const [planSettings, setPlanSettings] = useState<PlanValiditySetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingSetting, setEditingSetting] = useState<PlanValiditySetting | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadPlanSettings();
  }, []);

  const loadPlanSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('plan_validity_settings')
        .select('*')
        .order('license_type');

      if (error) {
        console.error('Error loading plan validity settings:', error);
        toast({
          title: "Error",
          description: "Failed to load plan validity settings",
          variant: "destructive",
        });
      } else {
        setPlanSettings(data || []);
      }
    } catch (error) {
      console.error('Error loading plan validity settings:', error);
      toast({
        title: "Error",
        description: "Failed to load plan validity settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (setting: PlanValiditySetting) => {
    try {
      setSaving(true);
      
      const { error } = await supabase
        .from('plan_validity_settings')
        .update(setting)
        .eq('id', setting.id);

      if (error) {
        console.error('Error saving plan validity setting:', error);
        toast({
          title: "Error",
          description: "Failed to save plan validity setting",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Plan validity setting saved successfully",
        });
        setIsDialogOpen(false);
        setEditingSetting(null);
        loadPlanSettings();
      }
    } catch (error) {
      console.error('Error saving plan validity setting:', error);
      toast({
        title: "Error",
        description: "Failed to save plan validity setting",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Plan Validity Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Plan Validity Settings
        </CardTitle>
        <CardDescription>
          Manage license validity periods, renewal settings, and pricing for different license types
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-end">
            <Button onClick={loadPlanSettings} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>License Type</TableHead>
                  <TableHead>Validity Period</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Renewal Reminder</TableHead>
                  <TableHead>Auto Renewal</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {planSettings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No plan validity settings found
                    </TableCell>
                  </TableRow>
                ) : (
                  planSettings.map((setting) => (
                    <TableRow key={setting.id}>
                      <TableCell className="font-medium">{setting.license_type}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {setting.validity_period_months} months
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatPrice(setting.price_per_period)}
                      </TableCell>
                      <TableCell>
                        {setting.renewal_reminder_days} days before
                      </TableCell>
                      <TableCell>
                        <Badge variant={setting.auto_renewal_enabled ? 'default' : 'secondary'}>
                          {setting.auto_renewal_enabled ? 'Enabled' : 'Disabled'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingSetting(setting);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Plan Validity Settings</DialogTitle>
              <DialogDescription>
                Configure validity period, pricing, and renewal settings for {editingSetting?.license_type}
              </DialogDescription>
            </DialogHeader>

            {editingSetting && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="validity_period_months">Validity Period (Months)</Label>
                    <Input
                      id="validity_period_months"
                      type="number"
                      min="1"
                      max="60"
                      value={editingSetting.validity_period_months}
                      onChange={(e) => setEditingSetting({ 
                        ...editingSetting, 
                        validity_period_months: parseInt(e.target.value) || 1 
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price_per_period" className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Price per Period (USD)
                    </Label>
                    <Input
                      id="price_per_period"
                      type="number"
                      min="0"
                      step="0.01"
                      value={editingSetting.price_per_period}
                      onChange={(e) => setEditingSetting({ 
                        ...editingSetting, 
                        price_per_period: parseFloat(e.target.value) || 0 
                      })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="renewal_reminder_days">Renewal Reminder (Days Before)</Label>
                    <Input
                      id="renewal_reminder_days"
                      type="number"
                      min="1"
                      max="365"
                      value={editingSetting.renewal_reminder_days}
                      onChange={(e) => setEditingSetting({ 
                        ...editingSetting, 
                        renewal_reminder_days: parseInt(e.target.value) || 30 
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grace_period_days">Grace Period (Days)</Label>
                    <Input
                      id="grace_period_days"
                      type="number"
                      min="0"
                      max="30"
                      value={editingSetting.grace_period_days}
                      onChange={(e) => setEditingSetting({ 
                        ...editingSetting, 
                        grace_period_days: parseInt(e.target.value) || 7 
                      })}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label>Auto Renewal</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically renew licenses before expiration
                    </p>
                  </div>
                  <Switch
                    checked={editingSetting.auto_renewal_enabled}
                    onCheckedChange={(checked) => setEditingSetting({ 
                      ...editingSetting, 
                      auto_renewal_enabled: checked 
                    })}
                  />
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Summary</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• License valid for {editingSetting.validity_period_months} months</li>
                    <li>• Price: {formatPrice(editingSetting.price_per_period)} per {editingSetting.validity_period_months} month period</li>
                    <li>• Renewal reminder sent {editingSetting.renewal_reminder_days} days before expiration</li>
                    <li>• Grace period: {editingSetting.grace_period_days} days after expiration</li>
                    <li>• Auto renewal: {editingSetting.auto_renewal_enabled ? 'Enabled' : 'Disabled'}</li>
                  </ul>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleSave(editingSetting)}
                    disabled={saving}
                  >
                    {saving ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Save Settings
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default PlanValidityManager;