
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, Save, Eye, Plus, Trash } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

export const ContentManager = () => {
  const [content, setContent] = useState<any>({});
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      try {
        // Load all content sections
        const sections = ['hero', 'about', 'features', 'stats', 'process', 'verification', 'license-info'];
        const contentData = {};
        for (const section of sections) {
          try {
            const data = await supabaseDataManager.getContent(section);
            contentData[section] = data;
          } catch (error) {
            console.error(`Failed to load ${section} content:`, error);
          }
        }
        setContent(contentData);
      } catch (error) {
        console.error('Failed to load content:', error);
      }
    };

    loadContent();
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

  const handleUpdateContent = async (sectionKey: string, newContent: any) => {
    try {
      // This would need to be implemented in supabaseDataManager
      // For now, just update the local state
      setContent(prev => ({ ...prev, [sectionKey]: newContent }));
      
      toast({
        title: "Content Updated",
        description: `${sectionKey} section has been updated successfully`,
      });
      
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error('Failed to update content:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update content. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Content Management</h2>
          <p className="text-muted-foreground">Manage website content with real-time updates</p>
        </div>
        <Button variant="outline">
          <Eye className="h-4 w-4 mr-2" />
          Preview Changes
        </Button>
      </div>

      <Tabs defaultValue="sections" className="space-y-6">
        <TabsList>
          <TabsTrigger value="sections">Content Sections</TabsTrigger>
          <TabsTrigger value="hero">Hero Content</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
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
                          onUpdate={(newContent) => handleUpdateContent(selectedSection, newContent)}
                        />
                      )}
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    {section.key === 'hero' && (
                      <div>
                        <p><strong>Headline:</strong> {content.hero.headline}</p>
                        <p><strong>Subheadline:</strong> {content.hero.subheadline.substring(0, 100)}...</p>
                      </div>
                    )}
                    {section.key === 'about' && (
                      <div>
                        <p><strong>Title:</strong> {content.about.title}</p>
                        <p><strong>Description:</strong> {content.about.description[0]?.substring(0, 100)}...</p>
                      </div>
                    )}
                    {section.key === 'features' && (
                      <div>
                        <p><strong>Title:</strong> {content.features.title}</p>
                        <p><strong>Features:</strong> {content.features.items.length} items</p>
                      </div>
                    )}
                    {section.key === 'stats' && (
                      <div>
                        <p><strong>Title:</strong> {content.stats.title}</p>
                        <p><strong>Statistics:</strong> {content.stats.items.length} items</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hero" className="space-y-4">
          <HeroContentManager content={content.hero} onUpdate={(newContent) => handleUpdateContent('hero', newContent)} />
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <FeaturesContentManager content={content.features} onUpdate={(newContent) => handleUpdateContent('features', newContent)} />
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <StatsContentManager content={content.stats} onUpdate={(newContent) => handleUpdateContent('stats', newContent)} />
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
  onUpdate: (content: any) => void;
}) => {
  const [formData, setFormData] = useState(content);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const updateArrayItem = (arrayName: string, index: number, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item: any, i: number) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {sectionKey === 'hero' && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="headline">Main Headline</Label>
            <Input
              id="headline"
              value={formData.headline}
              onChange={(e) => updateField('headline', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="subheadline">Subheadline</Label>
            <Textarea
              id="subheadline"
              value={formData.subheadline}
              onChange={(e) => updateField('subheadline', e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ctaText">Primary CTA Text</Label>
              <Input
                id="ctaText"
                value={formData.ctaText}
                onChange={(e) => updateField('ctaText', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="ctaSecondaryText">Secondary CTA Text</Label>
              <Input
                id="ctaSecondaryText"
                value={formData.ctaSecondaryText}
                onChange={(e) => updateField('ctaSecondaryText', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {sectionKey === 'about' && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Section Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
            />
          </div>
          <div>
            <Label>Description Paragraphs</Label>
            {formData.description.map((desc: string, index: number) => (
              <Textarea
                key={index}
                value={desc}
                onChange={(e) => {
                  const newDesc = [...formData.description];
                  newDesc[index] = e.target.value;
                  updateField('description', newDesc);
                }}
                rows={3}
                className="mb-2"
              />
            ))}
          </div>
        </div>
      )}

      <DialogFooter>
        <Button type="submit">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </DialogFooter>
    </form>
  );
};

const HeroContentManager = ({ content, onUpdate }: { content: any; onUpdate: (content: any) => void }) => {
  const [formData, setFormData] = useState(content);

  const handleSave = () => {
    onUpdate(formData);
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
              value={formData.headline}
              onChange={(e) => setFormData(prev => ({ ...prev, headline: e.target.value }))}
            />
          </div>
          <div>
            <Label>Subheadline</Label>
            <Textarea
              value={formData.subheadline}
              onChange={(e) => setFormData(prev => ({ ...prev, subheadline: e.target.value }))}
              rows={3}
            />
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

const FeaturesContentManager = ({ content, onUpdate }: { content: any; onUpdate: (content: any) => void }) => {
  const [formData, setFormData] = useState(content);

  const handleSave = () => {
    onUpdate(formData);
    toast({
      title: "Features Updated",
      description: "Features section has been updated successfully",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Features Section</CardTitle>
          <CardDescription>Manage service features and benefits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Section Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />
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

const StatsContentManager = ({ content, onUpdate }: { content: any; onUpdate: (content: any) => void }) => {
  const [formData, setFormData] = useState(content);

  const handleSave = () => {
    onUpdate(formData);
    toast({
      title: "Statistics Updated",
      description: "Statistics section has been updated successfully",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Statistics Section</CardTitle>
          <CardDescription>Manage company statistics and metrics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Section Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />
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
