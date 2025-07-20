import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { EnhancedCard, EnhancedCardHeader, EnhancedCardContent } from '@/components/ui/enhanced-card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Edit, Save, Eye, RefreshCw, CheckCircle, AlertCircle, Activity, BarChart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { unifiedDataManager } from '@/utils/unifiedDataManager';
import { ContentTemplateManager } from './ContentTemplateManager';

export const ContentManager = () => {
  const [content, setContent] = useState(unifiedDataManager.getContent());
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [liveUpdates, setLiveUpdates] = useState(true);

  useEffect(() => {
    const handleContentUpdate = () => {
      if (!liveUpdates) return;
      const newContent = unifiedDataManager.getContent();
      setContent(newContent);
      setHasUnsavedChanges(false);
      
      toast({
        title: "Content Synchronized",
        description: "Content has been updated from another source",
      });
    };

    unifiedDataManager.addEventListener('content_updated', handleContentUpdate);
    
    return () => {
      unifiedDataManager.removeEventListener('content_updated', handleContentUpdate);
    };
  }, [liveUpdates]);

  const contentSections = [
    { 
      key: 'hero', 
      title: 'Hero Section', 
      description: 'Main landing page header and call-to-action',
      status: 'active',
      lastUpdated: 'Today',
      priority: 'high'
    },
    { 
      key: 'about', 
      title: 'About Section', 
      description: 'Company authority and credentials information',
      status: 'active',
      lastUpdated: '2 days ago',
      priority: 'medium'
    },
    { 
      key: 'features', 
      title: 'Features Section', 
      description: 'Service features and key benefits',
      status: 'active',
      lastUpdated: '1 week ago',
      priority: 'high'
    },
    { 
      key: 'stats', 
      title: 'Statistics Section', 
      description: 'Company metrics and performance data',
      status: 'active',
      lastUpdated: '3 days ago',
      priority: 'medium'
    },
    { 
      key: 'process', 
      title: 'Process Section', 
      description: 'Application process steps and timeline',
      status: 'updated',
      lastUpdated: 'Just now',
      priority: 'high'
    },
    { 
      key: 'verification', 
      title: 'Verification Section', 
      description: 'License verification process and tools',
      status: 'active',
      lastUpdated: '1 week ago',
      priority: 'low'
    },
    { 
      key: 'whatIsLicense', 
      title: 'License Information Section', 
      description: 'Educational content about crypto trading licenses',
      status: 'active',
      lastUpdated: '5 days ago',
      priority: 'medium'
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
      setHasUnsavedChanges(false);
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "There was an error updating the content. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (section: any) => {
    const statusConfig = {
      updated: { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'Recently Updated' },
      active: { color: 'bg-blue-100 text-blue-800', icon: Activity, text: 'Active' },
      draft: { color: 'bg-gray-100 text-gray-800', icon: AlertCircle, text: 'Draft' }
    };
    
    const config = statusConfig[section.status as keyof typeof statusConfig] || statusConfig.active;
    const Icon = config.icon;
    
    return (
      <Badge className={config.color}>
        <Icon className="h-3 w-3 mr-1" />
        {config.text}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-green-100 text-green-800 border-green-200'
    };
    
    return (
      <Badge variant="outline" className={colors[priority as keyof typeof colors]}>
        {priority.toUpperCase()}
      </Badge>
    );
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
          <Button 
            variant="outline" 
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={isPreviewMode ? 'bg-primary text-primary-foreground' : ''}
          >
            <Eye className="h-4 w-4 mr-2" />
            {isPreviewMode ? 'Exit Preview' : 'Live Preview'}
          </Button>
          <Button 
            variant="outline"
            onClick={() => setLiveUpdates(!liveUpdates)}
            className={liveUpdates ? 'bg-green-100 text-green-800' : ''}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${liveUpdates ? 'animate-spin' : ''}`} />
            Live Updates {liveUpdates ? 'ON' : 'OFF'}
          </Button>
        </div>
      </div>

      {/* Status Bar */}
      {hasUnsavedChanges && (
        <EnhancedCard variant="glass" className="border-amber-200 bg-amber-50/50">
          <EnhancedCardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              <h3 className="font-semibold text-amber-800">Unsaved Changes</h3>
            </div>
            <p className="text-amber-700 text-sm">
              You have unsaved changes. Make sure to save before leaving this page.
            </p>
          </EnhancedCardHeader>
        </EnhancedCard>
      )}

      <Tabs defaultValue="sections" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sections">Content Sections</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="sections" className="space-y-6">
          <div className="grid gap-6">
            {contentSections.map((section) => (
              <EnhancedCard key={section.key} variant="elevated" className="group hover:shadow-lg transition-all">
                <EnhancedCardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-semibold">{section.title}</h3>
                        {getStatusBadge(section)}
                        {getPriorityBadge(section.priority)}
                      </div>
                      <p className="text-muted-foreground">{section.description}</p>
                      <p className="text-sm text-muted-foreground">Last updated: {section.lastUpdated}</p>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
                  </div>
                </EnhancedCardHeader>
                
                <EnhancedCardContent>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className="text-foreground">Content Preview:</strong>
                      <div className="mt-1 text-muted-foreground bg-muted/50 rounded p-2">
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
                </EnhancedCardContent>
              </EnhancedCard>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <ContentTemplateManager />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <AnalyticsPanel />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <ContentSettingsPanel 
            liveUpdates={liveUpdates}
            onLiveUpdatesChange={setLiveUpdates}
          />
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

const AnalyticsPanel = () => {
  const [analytics] = useState({
    pageViews: 12450,
    engagementRate: 67,
    topSections: [
      { name: 'Hero Section', views: 12450, engagement: 89 },
      { name: 'License Categories', views: 8930, engagement: 76 },
      { name: 'Process Steps', views: 7560, engagement: 82 },
      { name: 'Features', views: 6890, engagement: 71 }
    ]
  });

  return (
    <div className="grid gap-6">
      <div className="grid md:grid-cols-3 gap-4">
        <EnhancedCard>
          <EnhancedCardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Total Page Views</h4>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </div>
          </EnhancedCardHeader>
          <EnhancedCardContent>
            <div className="text-2xl font-bold">{analytics.pageViews.toLocaleString()}</div>
            <p className="text-xs text-green-600">+12% from last month</p>
          </EnhancedCardContent>
        </EnhancedCard>
        
        <EnhancedCard>
          <EnhancedCardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Engagement Rate</h4>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
          </EnhancedCardHeader>
          <EnhancedCardContent>
            <div className="text-2xl font-bold">{analytics.engagementRate}%</div>
            <p className="text-xs text-green-600">+5% from last month</p>
          </EnhancedCardContent>
        </EnhancedCard>
        
        <EnhancedCard>
          <EnhancedCardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Active Sections</h4>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </div>
          </EnhancedCardHeader>
          <EnhancedCardContent>
            <div className="text-2xl font-bold">{analytics.topSections.length}</div>
            <p className="text-xs text-muted-foreground">All sections active</p>
          </EnhancedCardContent>
        </EnhancedCard>
      </div>
      
      <EnhancedCard>
        <EnhancedCardHeader>
          <h4 className="text-lg font-semibold">Section Performance</h4>
          <p className="text-sm text-muted-foreground">View and engagement metrics by content section</p>
        </EnhancedCardHeader>
        <EnhancedCardContent>
          <div className="space-y-4">
            {analytics.topSections.map((section) => (
              <div key={section.name} className="flex items-center justify-between p-3 bg-muted/50 rounded">
                <div>
                  <h5 className="font-medium">{section.name}</h5>
                  <p className="text-sm text-muted-foreground">{section.views.toLocaleString()} views</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{section.engagement}%</p>
                  <p className="text-xs text-muted-foreground">engagement</p>
                </div>
              </div>
            ))}
          </div>
        </EnhancedCardContent>
      </EnhancedCard>
    </div>
  );
};

const ContentSettingsPanel = ({ 
  liveUpdates, 
  onLiveUpdatesChange 
}: { 
  liveUpdates: boolean; 
  onLiveUpdatesChange: (enabled: boolean) => void; 
}) => {
  return (
    <div className="grid gap-6">
      <EnhancedCard>
        <EnhancedCardHeader>
          <h4 className="text-lg font-semibold">Content Management Settings</h4>
          <p className="text-sm text-muted-foreground">Configure how content updates are handled</p>
        </EnhancedCardHeader>
        <EnhancedCardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium">Live Updates</h5>
              <p className="text-sm text-muted-foreground">Automatically sync content changes across all admin sessions</p>
            </div>
            <Button
              variant={liveUpdates ? "default" : "outline"}
              onClick={() => onLiveUpdatesChange(!liveUpdates)}
            >
              {liveUpdates ? 'Enabled' : 'Disabled'}
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium">Auto-save</h5>
              <p className="text-sm text-muted-foreground">Automatically save changes as you type</p>
            </div>
            <Button variant="outline">
              Configure
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium">Version History</h5>
              <p className="text-sm text-muted-foreground">Keep track of content changes over time</p>
            </div>
            <Button variant="outline">
              View History
            </Button>
          </div>
        </EnhancedCardContent>
      </EnhancedCard>
    </div>
  );
};
