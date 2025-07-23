import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, Plus, Edit, Trash2, Search, RefreshCw } from 'lucide-react';

interface SEOSetting {
  id: string;
  page_path: string;
  title: string;
  description: string;
  keywords: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  og_type: string;
  twitter_card: string;
  twitter_title: string | null;
  twitter_description: string | null;
  twitter_image: string | null;
  canonical_url: string | null;
  robots: string;
  schema_markup: any;
}

const SEOSettingsManager = () => {
  const [seoSettings, setSeoSettings] = useState<SEOSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingSetting, setEditingSetting] = useState<SEOSetting | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadSEOSettings();
  }, []);

  const loadSEOSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('seo_settings')
        .select('*')
        .order('page_path');

      if (error) {
        console.error('Error loading SEO settings:', error);
        toast({
          title: "Error",
          description: "Failed to load SEO settings",
          variant: "destructive",
        });
      } else {
        setSeoSettings(data || []);
      }
    } catch (error) {
      console.error('Error loading SEO settings:', error);
      toast({
        title: "Error",
        description: "Failed to load SEO settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (setting: SEOSetting) => {
    try {
      setSaving(true);
      
      const { error } = setting.id === 'new'
        ? await supabase
            .from('seo_settings')
            .insert([{ ...setting, id: undefined }])
        : await supabase
            .from('seo_settings')
            .update(setting)
            .eq('id', setting.id);

      if (error) {
        console.error('Error saving SEO setting:', error);
        toast({
          title: "Error",
          description: "Failed to save SEO setting",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "SEO setting saved successfully",
        });
        setIsDialogOpen(false);
        setEditingSetting(null);
        loadSEOSettings();
      }
    } catch (error) {
      console.error('Error saving SEO setting:', error);
      toast({
        title: "Error",
        description: "Failed to save SEO setting",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this SEO setting?')) return;

    try {
      const { error } = await supabase
        .from('seo_settings')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting SEO setting:', error);
        toast({
          title: "Error",
          description: "Failed to delete SEO setting",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "SEO setting deleted successfully",
        });
        loadSEOSettings();
      }
    } catch (error) {
      console.error('Error deleting SEO setting:', error);
      toast({
        title: "Error",
        description: "Failed to delete SEO setting",
        variant: "destructive",
      });
    }
  };

  const createNewSetting = () => {
    setEditingSetting({
      id: 'new',
      page_path: '',
      title: '',
      description: '',
      keywords: '',
      og_title: '',
      og_description: '',
      og_image: '',
      og_type: 'website',
      twitter_card: 'summary_large_image',
      twitter_title: '',
      twitter_description: '',
      twitter_image: '',
      canonical_url: '',
      robots: 'index, follow',
      schema_markup: null
    });
    setIsDialogOpen(true);
  };

  const filteredSettings = seoSettings.filter(setting =>
    setting.page_path.toLowerCase().includes(searchTerm.toLowerCase()) ||
    setting.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            SEO Settings
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
          <Search className="h-5 w-5" />
          SEO Settings
        </CardTitle>
        <CardDescription>
          Manage SEO metadata for different pages of your website
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={loadSEOSettings} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button onClick={createNewSetting} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Page
              </Button>
            </div>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page Path</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSettings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No SEO settings found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSettings.map((setting) => (
                    <TableRow key={setting.id}>
                      <TableCell className="font-medium">{setting.page_path}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{setting.title}</TableCell>
                      <TableCell className="max-w-[250px] truncate">{setting.description}</TableCell>
                      <TableCell>
                        <Badge variant={setting.robots.includes('noindex') ? 'destructive' : 'default'}>
                          {setting.robots}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
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
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(setting.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingSetting?.id === 'new' ? 'Add New SEO Setting' : 'Edit SEO Setting'}
              </DialogTitle>
              <DialogDescription>
                Configure SEO metadata for this page
              </DialogDescription>
            </DialogHeader>

            {editingSetting && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="page_path">Page Path *</Label>
                    <Input
                      id="page_path"
                      value={editingSetting.page_path}
                      onChange={(e) => setEditingSetting({ ...editingSetting, page_path: e.target.value })}
                      placeholder="/example-page"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="robots">Robots</Label>
                    <Select value={editingSetting.robots} onValueChange={(value) => setEditingSetting({ ...editingSetting, robots: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="index, follow">Index, Follow</SelectItem>
                        <SelectItem value="noindex, follow">No Index, Follow</SelectItem>
                        <SelectItem value="index, nofollow">Index, No Follow</SelectItem>
                        <SelectItem value="noindex, nofollow">No Index, No Follow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={editingSetting.title}
                    onChange={(e) => setEditingSetting({ ...editingSetting, title: e.target.value })}
                    placeholder="Page title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Meta Description *</Label>
                  <Textarea
                    id="description"
                    value={editingSetting.description}
                    onChange={(e) => setEditingSetting({ ...editingSetting, description: e.target.value })}
                    placeholder="Page description for search engines"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords</Label>
                  <Input
                    id="keywords"
                    value={editingSetting.keywords || ''}
                    onChange={(e) => setEditingSetting({ ...editingSetting, keywords: e.target.value })}
                    placeholder="comma, separated, keywords"
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Open Graph Settings</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="og_title">OG Title</Label>
                      <Input
                        id="og_title"
                        value={editingSetting.og_title || ''}
                        onChange={(e) => setEditingSetting({ ...editingSetting, og_title: e.target.value })}
                        placeholder="Title for social sharing"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="og_type">OG Type</Label>
                      <Select value={editingSetting.og_type} onValueChange={(value) => setEditingSetting({ ...editingSetting, og_type: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="website">Website</SelectItem>
                          <SelectItem value="article">Article</SelectItem>
                          <SelectItem value="product">Product</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="og_description">OG Description</Label>
                    <Textarea
                      id="og_description"
                      value={editingSetting.og_description || ''}
                      onChange={(e) => setEditingSetting({ ...editingSetting, og_description: e.target.value })}
                      placeholder="Description for social sharing"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="og_image">OG Image URL</Label>
                    <Input
                      id="og_image"
                      value={editingSetting.og_image || ''}
                      onChange={(e) => setEditingSetting({ ...editingSetting, og_image: e.target.value })}
                      placeholder="Image URL for social sharing"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Twitter Settings</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="twitter_card">Twitter Card</Label>
                      <Select value={editingSetting.twitter_card} onValueChange={(value) => setEditingSetting({ ...editingSetting, twitter_card: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="summary">Summary</SelectItem>
                          <SelectItem value="summary_large_image">Summary Large Image</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter_title">Twitter Title</Label>
                      <Input
                        id="twitter_title"
                        value={editingSetting.twitter_title || ''}
                        onChange={(e) => setEditingSetting({ ...editingSetting, twitter_title: e.target.value })}
                        placeholder="Title for Twitter"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter_description">Twitter Description</Label>
                    <Textarea
                      id="twitter_description"
                      value={editingSetting.twitter_description || ''}
                      onChange={(e) => setEditingSetting({ ...editingSetting, twitter_description: e.target.value })}
                      placeholder="Description for Twitter"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter_image">Twitter Image URL</Label>
                    <Input
                      id="twitter_image"
                      value={editingSetting.twitter_image || ''}
                      onChange={(e) => setEditingSetting({ ...editingSetting, twitter_image: e.target.value })}
                      placeholder="Image URL for Twitter"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="canonical_url">Canonical URL</Label>
                  <Input
                    id="canonical_url"
                    value={editingSetting.canonical_url || ''}
                    onChange={(e) => setEditingSetting({ ...editingSetting, canonical_url: e.target.value })}
                    placeholder="Canonical URL for this page"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleSave(editingSetting)}
                    disabled={saving || !editingSetting.page_path || !editingSetting.title || !editingSetting.description}
                  >
                    {saving ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Save SEO Setting
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

export default SEOSettingsManager;