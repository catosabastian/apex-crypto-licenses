
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Edit, Save, Eye, Plus, Trash, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { unifiedDataManager } from '@/utils/unifiedDataManager';

export const ContentManager = () => {
  const [content, setContent] = useState(unifiedDataManager.getContent());
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    const handleContentUpdate = () => {
      const newContent = unifiedDataManager.getContent();
      setContent(newContent);
      setHasUnsavedChanges(false);
    };

    unifiedDataManager.addEventListener('content_updated', handleContentUpdate);
    
    return () => {
      unifiedDataManager.removeEventListener('content_updated', handleContentUpdate);
    };
  }, []);

  const contentSections = [
    { 
      key: 'hero', 
      title: 'Hero Section', 
      description: 'Main landing page header and call-to-action',
      status: 'active',
      lastUpdated: 'Today'
    },
    { 
      key: 'about', 
      title: 'About Section', 
      description: 'Company authority and credentials information',
      status: 'active',
      lastUpdated: '2 days ago'
    },
    { 
      key: 'features', 
      title: 'Features Section', 
      description: 'Service features and key benefits',
      status: 'active',
      lastUpdated: '1 week ago'
    },
    { 
      key: 'stats', 
      title: 'Statistics Section', 
      description: 'Company metrics and performance data',
      status: 'active',
      lastUpdated: '3 days ago'
    },
    { 
      key: 'process', 
      title: 'Process Section', 
      description: 'Application process steps and timeline',
      status: 'updated',
      lastUpdated: 'Just now'
    },
    { 
      key: 'verification', 
      title: 'Verification Section', 
      description: 'License verification process and tools',
      status: 'active',
      lastUpdated: '1 week ago'
    },
    { 
      key: 'whatIsLicense', 
      title: 'License Information Section', 
      description: 'Educational content about crypto trading licenses',
      status: 'active',
      lastUpdated: '5 days ago'
    }
  ];

  const handleUpdateContent = (sectionKey: string, newContent: any) => {
    try {
      const updates = { [sectionKey]: newContent };
      unifiedDataManager.updateContent(updates);
      
      toast({
        title: "Content Updated Successfully",
        description: `${sectionKey} section has been updated and is live on the website`,
      });
      
      setIsEditDialogOpen(false);
      setSelectedSection(null);
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "There was an error updating the content. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'updated':
        return <Badge className="bg-green-100 text-green-800">Recently Updated</Badge>;
      case 'active':
        return <Badge variant="outline">Active</Badge>;
      default:
        return <Badge variant="secondary">Draft</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold">Content Management System</h2>
          <p className="text-muted-foreground mt-2">Manage all website content with real-time updates and live preview</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setIsPreviewMode(!isPreviewMode)}>
            <Eye className="h-4 w-4 mr-2" />
            {isPreviewMode ? 'Exit Preview' : 'Live Preview'}
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Content
          </Button>
        </div>
      </div>

      {/* Status Bar */}
      {hasUnsavedChanges && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              <CardTitle className="text-amber-800">Unsaved Changes</CardTitle>
            </div>
            <CardDescription className="text-amber-700">
              You have unsaved changes. Make sure to save before leaving this page.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      <Tabs defaultValue="sections" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sections">Content Sections</TabsTrigger>
          <TabsTrigger value="quick-edit">Quick Edit</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="sections" className="space-y-6">
          <div className="grid gap-6">
            {contentSections.map((section) => (
              <Card key={section.key} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                      {getStatusBadge(section.status)}
                    </div>
                    <CardDescription className="text-base">{section.description}</CardDescription>
                    <p className="text-sm text-muted-foreground">Last updated: {section.lastUpdated}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Dialog open={isEditDialogOpen && selectedSection === section.key} onOpenChange={(open) => {
                      setIsEditDialogOpen(open);
                      if (!open) setSelectedSection(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm"
                          onClick={() => setSelectedSection(section.key)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Content
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Edit className="h-5 w-5" />
                            Edit {section.title}
                          </DialogTitle>
                          <DialogDescription>
                            Make changes to this content section. Changes will be applied immediately to the live website.
                          </DialogDescription>
                        </DialogHeader>
                        {selectedSection && (
                          <ContentEditForm 
                            sectionKey={selectedSection}
                            content={content[selectedSection as keyof typeof content]}
                            onUpdate={(newContent) => handleUpdateContent(selectedSection, newContent)}
                            onCancel={() => {
                              setIsEditDialogOpen(false);
                              setSelectedSection(null);
                            }}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className="text-foreground">Content Preview:</strong>
                      <div className="mt-1 text-muted-foreground">
                        {section.key === 'hero' && (
                          <p>Headline: {content.hero?.headline?.substring(0, 50)}...</p>
                        )}
                        {section.key === 'about' && (
                          <p>Title: {content.about?.title}</p>
                        )}
                        {section.key === 'features' && (
                          <p>Features: {content.features?.items?.length || 0} items</p>
                        )}
                        {section.key === 'stats' && (
                          <p>Statistics: {content.stats?.items?.length || 0} metrics</p>
                        )}
                        {section.key === 'process' && (
                          <p>Steps: {content.process?.steps?.length || 0} process steps</p>
                        )}
                        {section.key === 'verification' && (
                          <p>Title: {content.verification?.title}</p>
                        )}
                        {section.key === 'whatIsLicense' && (
                          <p>Title: {content.whatIsLicense?.title}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <strong className="text-foreground">Section Status:</strong>
                      <div className="mt-1 flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Published and live</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quick-edit" className="space-y-6">
          <QuickEditPanel content={content} onUpdate={handleUpdateContent} />
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <TemplatesPanel />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <AnalyticsPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ContentEditForm = ({ 
  sectionKey, 
  content, 
  onUpdate,
  onCancel
}: { 
  sectionKey: string; 
  content: any;
  onUpdate: (content: any) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState(content || {});
  const [hasChanges, setHasChanges] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {sectionKey === 'hero' && (
        <div className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="headline">Main Headline</Label>
              <Input
                id="headline"
                value={formData.headline || ''}
                onChange={(e) => updateField('headline', e.target.value)}
                placeholder="Enter main headline"
              />
            </div>
            <div>
              <Label htmlFor="ctaText">Primary CTA Text</Label>
              <Input
                id="ctaText"
                value={formData.ctaText || ''}
                onChange={(e) => updateField('ctaText', e.target.value)}
                placeholder="Enter CTA button text"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="subheadline">Subheadline</Label>
            <Textarea
              id="subheadline"
              value={formData.subheadline || ''}
              onChange={(e) => updateField('subheadline', e.target.value)}
              rows={4}
              placeholder="Enter subheadline text"
            />
          </div>
        </div>
      )}

      {sectionKey === 'process' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
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
              <Label htmlFor="subtitle">Section Subtitle</Label>
              <Input
                id="subtitle"
                value={formData.subtitle || ''}
                onChange={(e) => updateField('subtitle', e.target.value)}
                placeholder="Enter section subtitle"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="description">Section Description</Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => updateField('description', e.target.value)}
              rows={3}
              placeholder="Enter section description"
            />
          </div>
        </div>
      )}

      <DialogFooter className="flex gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={!hasChanges}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </DialogFooter>
    </form>
  );
};

const QuickEditPanel = ({ content, onUpdate }: { content: any; onUpdate: (key: string, content: any) => void }) => {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Quick Text Updates</CardTitle>
          <CardDescription>Make quick changes to commonly updated content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Hero Headline</Label>
            <Input 
              value={content.hero?.headline || ''} 
              onChange={(e) => onUpdate('hero', { ...content.hero, headline: e.target.value })}
            />
          </div>
          <div>
            <Label>Main CTA Button Text</Label>
            <Input 
              value={content.hero?.ctaText || ''} 
              onChange={(e) => onUpdate('hero', { ...content.hero, ctaText: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const TemplatesPanel = () => {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Content Templates</CardTitle>
          <CardDescription>Pre-designed content layouts and templates</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Content templates coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

const AnalyticsPanel = () => {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Content Analytics</CardTitle>
          <CardDescription>Track content performance and engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Content analytics coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};
