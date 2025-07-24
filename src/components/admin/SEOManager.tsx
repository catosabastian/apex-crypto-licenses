import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, Plus, Edit, Eye, Globe, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface SEOSetting {
  id: string;
  page_path: string;
  title: string;
  description: string;
  keywords: string;
  og_title: string;
  og_description: string;
  og_image: string;
  twitter_title: string;
  twitter_description: string;
  twitter_image: string;
  canonical_url: string;
  robots: string;
  schema_markup: any;
  created_at: string;
  updated_at: string;
}

const SEOManager = () => {
  const [seoSettings, setSeoSettings] = useState<SEOSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingItem, setEditingItem] = useState<SEOSetting | null>(null);
  const { toast } = useToast();

  const [newSetting, setNewSetting] = useState({
    page_path: '',
    title: '',
    description: '',
    keywords: '',
    og_title: '',
    og_description: '',
    og_image: '',
    twitter_title: '',
    twitter_description: '',
    twitter_image: '',
    canonical_url: '',
    robots: 'index, follow',
    schema_markup: '{}'
  });

  useEffect(() => {
    loadSEOSettings();
  }, []);

  const loadSEOSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('seo_settings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setSeoSettings(data);
    } catch (error) {
      console.error('Error loading SEO settings:', error);
      toast({
        title: "Error",
        description: "Failed to load SEO settings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const saveSetting = async () => {
    try {
      let schemaMarkup;
      try {
        schemaMarkup = JSON.parse(newSetting.schema_markup);
      } catch {
        schemaMarkup = {};
      }

      const settingData = {
        ...newSetting,
        schema_markup: schemaMarkup
      };

      if (editingItem) {
        await supabase
          .from('seo_settings')
          .update(settingData)
          .eq('id', editingItem.id);
        
        toast({
          title: "Success",
          description: "SEO settings updated successfully"
        });
      } else {
        await supabase
          .from('seo_settings')
          .insert([settingData]);
        
        toast({
          title: "Success",
          description: "SEO settings created successfully"
        });
      }

      setIsCreating(false);
      setEditingItem(null);
      resetForm();
      loadSEOSettings();
    } catch (error) {
      console.error('Error saving SEO setting:', error);
      toast({
        title: "Error",
        description: "Failed to save SEO settings",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setNewSetting({
      page_path: '',
      title: '',
      description: '',
      keywords: '',
      og_title: '',
      og_description: '',
      og_image: '',
      twitter_title: '',
      twitter_description: '',
      twitter_image: '',
      canonical_url: '',
      robots: 'index, follow',
      schema_markup: '{}'
    });
  };

  const editSetting = (setting: SEOSetting) => {
    setEditingItem(setting);
    setNewSetting({
      page_path: setting.page_path,
      title: setting.title,
      description: setting.description,
      keywords: setting.keywords || '',
      og_title: setting.og_title || '',
      og_description: setting.og_description || '',
      og_image: setting.og_image || '',
      twitter_title: setting.twitter_title || '',
      twitter_description: setting.twitter_description || '',
      twitter_image: setting.twitter_image || '',
      canonical_url: setting.canonical_url || '',
      robots: setting.robots || 'index, follow',
      schema_markup: JSON.stringify(setting.schema_markup || {}, null, 2)
    });
    setIsCreating(true);
  };

  const deleteSetting = async (id: string) => {
    try {
      await supabase
        .from('seo_settings')
        .delete()
        .eq('id', id);

      toast({
        title: "Success",
        description: "SEO setting deleted successfully"
      });

      loadSEOSettings();
    } catch (error) {
      console.error('Error deleting SEO setting:', error);
      toast({
        title: "Error",
        description: "Failed to delete SEO setting",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading SEO settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Search className="text-primary" />
            SEO Management
          </h2>
          <p className="text-muted-foreground">Manage meta tags, OpenGraph, and schema markup for all pages</p>
        </div>
        <Dialog open={isCreating} onOpenChange={(open) => {
          setIsCreating(open);
          if (!open) {
            setEditingItem(null);
            resetForm();
          }
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add SEO Page
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit' : 'Create'} SEO Settings</DialogTitle>
              <DialogDescription>
                Configure SEO meta tags and schema markup for a specific page
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic SEO */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Basic SEO</h3>
                <div>
                  <Label htmlFor="page_path">Page Path</Label>
                  <Input
                    id="page_path"
                    value={newSetting.page_path}
                    onChange={(e) => setNewSetting({ ...newSetting, page_path: e.target.value })}
                    placeholder="/services/crypto"
                  />
                </div>
                <div>
                  <Label htmlFor="title">Title Tag</Label>
                  <Input
                    id="title"
                    value={newSetting.title}
                    onChange={(e) => setNewSetting({ ...newSetting, title: e.target.value })}
                    placeholder="Crypto Licensing Services"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Meta Description</Label>
                  <Textarea
                    id="description"
                    value={newSetting.description}
                    onChange={(e) => setNewSetting({ ...newSetting, description: e.target.value })}
                    placeholder="Professional cryptocurrency licensing services..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="keywords">Keywords</Label>
                  <Input
                    id="keywords"
                    value={newSetting.keywords}
                    onChange={(e) => setNewSetting({ ...newSetting, keywords: e.target.value })}
                    placeholder="crypto license, bitcoin, blockchain"
                  />
                </div>
                <div>
                  <Label htmlFor="robots">Robots</Label>
                  <Select value={newSetting.robots} onValueChange={(value) => setNewSetting({ ...newSetting, robots: value })}>
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
                <div>
                  <Label htmlFor="canonical_url">Canonical URL</Label>
                  <Input
                    id="canonical_url"
                    value={newSetting.canonical_url}
                    onChange={(e) => setNewSetting({ ...newSetting, canonical_url: e.target.value })}
                    placeholder="https://example.com/services/crypto"
                  />
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Social Media (OpenGraph & Twitter)</h3>
                <div>
                  <Label htmlFor="og_title">OpenGraph Title</Label>
                  <Input
                    id="og_title"
                    value={newSetting.og_title}
                    onChange={(e) => setNewSetting({ ...newSetting, og_title: e.target.value })}
                    placeholder="Professional Crypto Licensing"
                  />
                </div>
                <div>
                  <Label htmlFor="og_description">OpenGraph Description</Label>
                  <Textarea
                    id="og_description"
                    value={newSetting.og_description}
                    onChange={(e) => setNewSetting({ ...newSetting, og_description: e.target.value })}
                    placeholder="Get your cryptocurrency license with our expert services..."
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="og_image">OpenGraph Image URL</Label>
                  <Input
                    id="og_image"
                    value={newSetting.og_image}
                    onChange={(e) => setNewSetting({ ...newSetting, og_image: e.target.value })}
                    placeholder="https://example.com/images/crypto-og.jpg"
                  />
                </div>
                <div>
                  <Label htmlFor="twitter_title">Twitter Title</Label>
                  <Input
                    id="twitter_title"
                    value={newSetting.twitter_title}
                    onChange={(e) => setNewSetting({ ...newSetting, twitter_title: e.target.value })}
                    placeholder="Crypto Licensing Services"
                  />
                </div>
                <div>
                  <Label htmlFor="twitter_description">Twitter Description</Label>
                  <Textarea
                    id="twitter_description"
                    value={newSetting.twitter_description}
                    onChange={(e) => setNewSetting({ ...newSetting, twitter_description: e.target.value })}
                    placeholder="Professional cryptocurrency licensing services..."
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="twitter_image">Twitter Image URL</Label>
                  <Input
                    id="twitter_image"
                    value={newSetting.twitter_image}
                    onChange={(e) => setNewSetting({ ...newSetting, twitter_image: e.target.value })}
                    placeholder="https://example.com/images/crypto-twitter.jpg"
                  />
                </div>
              </div>

              {/* Schema Markup */}
              <div className="md:col-span-2 space-y-4">
                <h3 className="font-semibold text-lg">Schema Markup (JSON-LD)</h3>
                <div>
                  <Label htmlFor="schema_markup">Schema JSON</Label>
                  <Textarea
                    id="schema_markup"
                    value={newSetting.schema_markup}
                    onChange={(e) => setNewSetting({ ...newSetting, schema_markup: e.target.value })}
                    placeholder='{"@context": "https://schema.org", "@type": "Service", "name": "Crypto Licensing"}'
                    rows={6}
                    className="font-mono text-sm"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 mt-6">
              <Button onClick={saveSetting} className="flex-1">
                <CheckCircle className="h-4 w-4 mr-2" />
                {editingItem ? 'Update' : 'Create'} SEO Settings
              </Button>
              <Button variant="outline" onClick={() => {
                setIsCreating(false);
                setEditingItem(null);
                resetForm();
              }}>
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* SEO Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{seoSettings.length}</div>
            <p className="text-xs text-muted-foreground">Pages with SEO configured</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">With OpenGraph</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {seoSettings.filter(s => s.og_title && s.og_description).length}
            </div>
            <p className="text-xs text-muted-foreground">Pages with social media tags</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">With Schema</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {seoSettings.filter(s => s.schema_markup && Object.keys(s.schema_markup).length > 0).length}
            </div>
            <p className="text-xs text-muted-foreground">Pages with structured data</p>
          </CardContent>
        </Card>
      </div>

      {/* SEO Settings Table */}
      <Card>
        <CardHeader>
          <CardTitle>SEO Settings by Page</CardTitle>
          <CardDescription>
            Manage SEO configuration for each page of your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          {seoSettings.length === 0 ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No SEO settings configured. Add your first page to get started with SEO optimization.
              </AlertDescription>
            </Alert>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page Path</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Features</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {seoSettings.map((setting) => (
                  <TableRow key={setting.id}>
                    <TableCell className="font-mono text-sm">{setting.page_path}</TableCell>
                    <TableCell className="font-medium">{setting.title}</TableCell>
                    <TableCell>
                      <Badge variant={setting.robots.includes('index') ? "default" : "secondary"}>
                        {setting.robots.includes('index') ? 'Indexed' : 'No Index'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {setting.og_title && <Badge variant="outline" className="text-xs">OG</Badge>}
                        {setting.twitter_title && <Badge variant="outline" className="text-xs">Twitter</Badge>}
                        {setting.schema_markup && Object.keys(setting.schema_markup).length > 0 && 
                          <Badge variant="outline" className="text-xs">Schema</Badge>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => editSetting(setting)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteSetting(setting.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOManager;