import { useState, useEffect } from 'react';
import { supabaseDataManager } from '@/utils/supabaseDataManager';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Save, 
  RefreshCw, 
  Eye, 
  Edit3, 
  Plus, 
  Trash2,
  Image,
  Sparkles
} from 'lucide-react';

const EnhancedContentManager = () => {
  const [contents, setContents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingContent, setEditingContent] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadContents();
  }, []);

  const loadContents = async () => {
    try {
      setLoading(true);
      const data = await supabaseDataManager.exportAllData();
      setContents(data.content || []);
    } catch (error) {
      console.error('Error loading contents:', error);
      toast({
        title: "Error",
        description: "Failed to load content data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async (content: any) => {
    try {
      setSaving(true);
      await supabaseDataManager.updateContent(content.key, content.value);
      
      toast({
        title: "Success",
        description: "Content updated successfully",
      });
      
      await loadContents();
      setEditingContent(null);
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Error",
        description: "Failed to save content",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const createNewContent = () => {
    setEditingContent({
      section: '',
      key: '',
      value: {},
      isNew: true
    });
  };

  const handleContentValueUpdate = (path: string, value: any) => {
    if (!editingContent) return;
    
    const keys = path.split('.');
    const updatedValue = { ...editingContent.value };
    let current = updatedValue;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    
    setEditingContent({
      ...editingContent,
      value: updatedValue
    });
  };

  const renderContentEditor = (content: any) => {
    if (!content) return null;

    const contentValue = content.value;
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Section</label>
            <Input
              value={content.section}
              onChange={(e) => setEditingContent({...content, section: e.target.value})}
              placeholder="e.g., about, whatIsLicense"
              disabled={!content.isNew}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Key</label>
            <Input
              value={content.key}
              onChange={(e) => setEditingContent({...content, key: e.target.value})}
              placeholder="e.g., apex_services, comprehensive_guide"
              disabled={!content.isNew}
            />
          </div>
        </div>

        {/* Dynamic Content Fields */}
        {contentValue.title && (
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input
              value={contentValue.title || ''}
              onChange={(e) => handleContentValueUpdate('title', e.target.value)}
              placeholder="Enter title"
            />
          </div>
        )}

        {contentValue.subtitle && (
          <div>
            <label className="text-sm font-medium">Subtitle</label>
            <Input
              value={contentValue.subtitle || ''}
              onChange={(e) => handleContentValueUpdate('subtitle', e.target.value)}
              placeholder="Enter subtitle"
            />
          </div>
        )}

        {contentValue.description && (
          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={contentValue.description || ''}
              onChange={(e) => handleContentValueUpdate('description', e.target.value)}
              placeholder="Enter description"
              rows={4}
            />
          </div>
        )}

        {contentValue.introduction && (
          <div>
            <label className="text-sm font-medium">Introduction</label>
            <Textarea
              value={contentValue.introduction || ''}
              onChange={(e) => handleContentValueUpdate('introduction', e.target.value)}
              placeholder="Enter introduction"
              rows={3}
            />
          </div>
        )}

        {/* Services Array Editor */}
        {contentValue.services && Array.isArray(contentValue.services) && (
          <div>
            <label className="text-sm font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Services
            </label>
            <div className="space-y-4">
              {contentValue.services.map((service: any, index: number) => (
                <Card key={index} className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      value={service.title || ''}
                      onChange={(e) => {
                        const updated = [...contentValue.services];
                        updated[index] = {...updated[index], title: e.target.value};
                        handleContentValueUpdate('services', updated);
                      }}
                      placeholder="Service title"
                    />
                    <Input
                      value={service.icon || ''}
                      onChange={(e) => {
                        const updated = [...contentValue.services];
                        updated[index] = {...updated[index], icon: e.target.value};
                        handleContentValueUpdate('services', updated);
                      }}
                      placeholder="Icon name (e.g., Shield)"
                    />
                  </div>
                  <Textarea
                    value={service.description || ''}
                    onChange={(e) => {
                      const updated = [...contentValue.services];
                      updated[index] = {...updated[index], description: e.target.value};
                      handleContentValueUpdate('services', updated);
                    }}
                    placeholder="Service description"
                    rows={2}
                    className="mt-2"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const updated = contentValue.services.filter((_: any, i: number) => i !== index);
                      handleContentValueUpdate('services', updated);
                    }}
                    className="mt-2"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </Card>
              ))}
              <Button
                variant="outline"
                onClick={() => {
                  const updated = [...contentValue.services, { title: '', description: '', icon: 'Shield' }];
                  handleContentValueUpdate('services', updated);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </div>
          </div>
        )}

        {/* Raw JSON Editor for Complex Content */}
        <div>
          <label className="text-sm font-medium">Raw Content (JSON)</label>
          <Textarea
            value={JSON.stringify(contentValue, null, 2)}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                setEditingContent({...content, value: parsed});
              } catch (error) {
                // Invalid JSON, don't update
              }
            }}
            rows={15}
            className="font-mono text-sm"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={() => saveContent(content)} disabled={saving}>
            {saving ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Save Content
          </Button>
          <Button variant="outline" onClick={() => setEditingContent(null)}>
            Cancel
          </Button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Enhanced Content Manager</h2>
        </div>
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-muted rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Edit3 className="h-6 w-6" />
          Enhanced Content Manager
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadContents} disabled={loading}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={createNewContent}>
            <Plus className="h-4 w-4 mr-2" />
            New Content
          </Button>
        </div>
      </div>

      {editingContent ? (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingContent.isNew ? 'Create New Content' : `Edit: ${editingContent.section}/${editingContent.key}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderContentEditor(editingContent)}
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="about">About Section</TabsTrigger>
            <TabsTrigger value="licensing">Licensing Section</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="space-y-4">
            <div className="grid gap-4">
              {contents.filter(c => c.section === 'about').map((content, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{content.section}/{content.key}</CardTitle>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">{content.section}</Badge>
                          <Badge variant="secondary">{content.key}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingContent(content)}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {content.value?.title || content.value?.description || 'No preview available'}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="licensing" className="space-y-4">
            <div className="grid gap-4">
              {contents.filter(c => c.section === 'whatIsLicense').map((content, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{content.section}/{content.key}</CardTitle>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">{content.section}</Badge>
                          <Badge variant="secondary">{content.key}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingContent(content)}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {content.value?.title || content.value?.description || 'No preview available'}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default EnhancedContentManager;