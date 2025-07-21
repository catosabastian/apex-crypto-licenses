
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, Save, Eye, RefreshCw, Globe } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

export const ContentManager = () => {
  const [content, setContent] = useState<Record<string, any>>({});
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true);
        const contentData = await supabaseDataManager.getContent();
        setContent(contentData);
      } catch (error) {
        console.error('Error loading content:', error);
        toast({
          title: "Error",
          description: "Failed to load content",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    const handleContentUpdate = () => {
      loadContent();
    };

    supabaseDataManager.addEventListener('content_updated', handleContentUpdate);
    loadContent();
    
    return () => {
      supabaseDataManager.removeEventListener('content_updated', handleContentUpdate);
    };
  }, []);

  const sections = [
    { key: 'hero', title: 'Hero Section', description: 'Main landing page content' },
    { key: 'about', title: 'About Section', description: 'Company and authority information' },
    { key: 'features', title: 'Features Section', description: 'Service features and benefits' },
    { key: 'stats', title: 'Statistics Section', description: 'Company statistics and metrics' },
    { key: 'process', title: 'Process Section', description: 'Application process steps' },
    { key: 'verification', title: 'Verification Section', description: 'Verification process information' },
    { key: 'whatIsLicense', title: 'What is License Section', description: 'License explanation content' }
  ];

  const handleUpdateContent = async (sectionKey: string, key: string, newContent: any) => {
    try {
      await supabaseDataManager.updateContent(sectionKey, key, newContent);
      
      toast({
        title: "Content Updated",
        description: `${sectionKey} section has been updated successfully`,
      });
      
      setIsEditDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update content",
        variant: "destructive",
      });
    }
  };

  const refreshContent = async () => {
    try {
      const contentData = await supabaseDataManager.getContent();
      setContent(contentData);
      toast({
        title: "Content Refreshed",
        description: "Content data has been reloaded",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh content",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Content Management</h2>
        <div className="text-center py-8">Loading content...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Content Management</h2>
          <p className="text-muted-foreground">Manage website content with real-time updates</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={refreshContent} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="sections" className="space-y-6">
        <TabsList>
          <TabsTrigger value="sections">Content Sections</TabsTrigger>
          <TabsTrigger value="hero">Hero Content</TabsTrigger>
          <TabsTrigger value="quick-edit">Quick Edit</TabsTrigger>
        </TabsList>

        <TabsContent value="sections" className="space-y-4">
          <div className="grid gap-4">
            {sections.map((section) => (
              <Card key={section.key}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </div>
                  <Dialog open={isEditDialogOpen && selectedSection === section.key} onOpenChange={(open) => {
                    setIsEditDialogOpen(open);
                    if (!open) setSelectedSection(null);
                  }}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedSection(section.key)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit {section.title}</DialogTitle>
                        <DialogDescription>
                          Update the content for this section
                        </DialogDescription>
                      </DialogHeader>
                      {selectedSection && (
                        <ContentEditForm 
                          sectionKey={selectedSection}
                          content={content[selectedSection]}
                          onUpdate={(key, newContent) => handleUpdateContent(selectedSection, key, newContent)}
                        />
                      )}
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    {section.key === 'hero' && content.hero && (
                      <div>
                        <p><strong>Current content:</strong> Hero section configured</p>
                        <p className="text-xs mt-1">Click Edit to modify hero content</p>
                      </div>
                    )}
                    {section.key !== 'hero' && (
                      <div>
                        <p><strong>Section:</strong> {section.title}</p>
                        <p className="text-xs mt-1">Click Edit to modify this section</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hero" className="space-y-4">
          <HeroContentManager 
            content={content.hero || {}} 
            onUpdate={(key, newContent) => handleUpdateContent('hero', key, newContent)} 
          />
        </TabsContent>

        <TabsContent value="quick-edit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Quick Content Updates
              </CardTitle>
              <CardDescription>Make quick updates to common content elements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Quick edit functionality will be available in a future update.
                Use the section editors above for detailed content management.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ContentEditForm = ({ 
  sectionKey, 
  content, 
  onUpdate 
}: { 
  sectionKey: string; 
  content: any;
  onUpdate: (key: string, content: any) => void;
}) => {
  const [formData, setFormData] = useState(content || {});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update each field individually
    Object.keys(formData).forEach(key => {
      onUpdate(key, formData[key]);
    });
  };

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Section Title</Label>
          <Input
            id="title"
            value={formData.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Enter section title"
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description || ''}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="Enter section description"
            rows={3}
          />
        </div>
        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={formData.content || ''}
            onChange={(e) => updateField('content', e.target.value)}
            placeholder="Enter section content"
            rows={5}
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="submit">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </DialogFooter>
    </form>
  );
};

const HeroContentManager = ({ content, onUpdate }: { content: any; onUpdate: (key: string, content: any) => void }) => {
  const [formData, setFormData] = useState(content || {});

  const handleSave = () => {
    Object.keys(formData).forEach(key => {
      onUpdate(key, formData[key]);
    });
    toast({
      title: "Hero Content Updated",
      description: "Hero section content has been updated successfully",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hero Content</CardTitle>
          <CardDescription>Main landing page content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Main Headline</Label>
            <Input
              value={formData.headline || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, headline: e.target.value }))}
              placeholder="Enter main headline"
            />
          </div>
          <div>
            <Label>Subheadline</Label>
            <Textarea
              value={formData.subheadline || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, subheadline: e.target.value }))}
              placeholder="Enter subheadline"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Primary CTA Text</Label>
              <Input
                value={formData.ctaText || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, ctaText: e.target.value }))}
                placeholder="Primary button text"
              />
            </div>
            <div>
              <Label>Secondary CTA Text</Label>
              <Input
                value={formData.ctaSecondaryText || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, ctaSecondaryText: e.target.value }))}
                placeholder="Secondary button text"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
