import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Image, Upload, Save, RotateCcw } from 'lucide-react';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

const LogoManager = () => {
  const [logoUrl, setLogoUrl] = useState('');
  const [originalLogo, setOriginalLogo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadLogo = async () => {
      setIsLoading(true);
      try {
        const settings = await supabaseDataManager.getSettings();
        const currentLogo = settings.websiteLogo || '/lovable-uploads/294fecc6-7027-4dcd-adc8-c71f110e7314.png';
        setLogoUrl(currentLogo);
        setOriginalLogo(currentLogo);
      } catch (error) {
        console.error('Error loading logo:', error);
        toast({
          title: "Loading Error",
          description: "Failed to load current logo settings.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadLogo();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await supabaseDataManager.updateSetting('websiteLogo', logoUrl);
      setOriginalLogo(logoUrl);
      
      toast({
        title: "Logo Updated",
        description: "Website logo has been updated successfully.",
      });
    } catch (error) {
      console.error('Error saving logo:', error);
      toast({
        title: "Save Error",
        description: "Failed to save logo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setLogoUrl(originalLogo);
  };

  const hasChanges = logoUrl !== originalLogo;

  return (
    <Card className="border-2 transition-all duration-300 hover:shadow-xl">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/20 rounded-xl">
            <Image className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Website Logo Management
            </CardTitle>
            <p className="text-muted-foreground mt-1">
              Manage the logo displayed in the website header
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6 p-6">
        {/* Current Logo Preview */}
        <div className="space-y-4">
          <Label className="text-base font-semibold">Current Logo Preview</Label>
          <div className="border-2 border-dashed border-muted rounded-xl p-8 bg-muted/20">
            {logoUrl ? (
              <div className="flex items-center justify-center">
                <img 
                  src={logoUrl}
                  alt="Website Logo"
                  className="h-16 w-auto max-w-md rounded-lg shadow-sm"
                  onError={() => {
                    toast({
                      title: "Image Error",
                      description: "Failed to load the logo image. Please check the URL.",
                      variant: "destructive",
                    });
                  }}
                />
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <Image className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No logo configured</p>
              </div>
            )}
          </div>
        </div>

        {/* Logo URL Input */}
        <div className="space-y-2">
          <Label htmlFor="logoUrl" className="text-base font-semibold">
            Logo URL
          </Label>
          <Input
            id="logoUrl"
            type="url"
            placeholder="https://example.com/logo.png or /path/to/logo.png"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            className="font-mono"
          />
          <p className="text-sm text-muted-foreground">
            Enter a URL to an image file or a path to an uploaded file in the public directory.
          </p>
        </div>

        {/* Upload Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Upload className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">How to Upload a New Logo</h4>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Save your logo image to the <code className="bg-blue-100 px-1 rounded">public/</code> directory</li>
                <li>Use a path like <code className="bg-blue-100 px-1 rounded">/your-logo.png</code></li>
                <li>Or use an external URL starting with <code className="bg-blue-100 px-1 rounded">https://</code></li>
                <li>Recommended size: 200x60 pixels or similar aspect ratio</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            onClick={handleSave}
            disabled={!hasChanges || isSaving || isLoading}
            className="flex-1"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Logo
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={!hasChanges || isLoading}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        {hasChanges && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm text-amber-800">
              <strong>Note:</strong> You have unsaved changes. Click "Save Logo" to apply them.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LogoManager;