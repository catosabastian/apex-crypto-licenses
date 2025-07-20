
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { EnhancedCard, EnhancedCardHeader, EnhancedCardContent, EnhancedCardFooter } from '@/components/ui/enhanced-card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash, Eye, Copy, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  content: any;
  createdAt: string;
  lastUsed?: string;
  usageCount: number;
}

export const ContentTemplateManager = () => {
  const [templates, setTemplates] = useState<ContentTemplate[]>([
    {
      id: '1',
      name: 'Hero Section - Crypto Focus',
      description: 'Professional hero section template focused on cryptocurrency trading',
      category: 'Hero',
      content: {
        headline: 'Professional Cryptocurrency Trading Licenses',
        subheadline: 'Get certified with our comprehensive trading license program',
        ctaText: 'Apply Now'
      },
      createdAt: '2024-01-15',
      usageCount: 12
    },
    {
      id: '2',
      name: 'Features - Premium Benefits',
      description: 'Premium feature list template highlighting key benefits',
      category: 'Features',
      content: {
        title: 'Premium Trading Benefits',
        subtitle: 'Unlock professional trading capabilities',
        items: [
          { title: 'Regulatory Compliance', description: 'Full regulatory coverage' },
          { title: 'Global Recognition', description: 'Internationally accepted' },
          { title: 'Priority Support', description: '24/7 dedicated support' }
        ]
      },
      createdAt: '2024-01-10',
      usageCount: 8
    },
    {
      id: '3',
      name: 'Process Steps - 4 Step Flow',
      description: 'Clean 4-step process template for license applications',
      category: 'Process',
      content: {
        title: 'Simple Application Process',
        subtitle: 'Get licensed in 4 easy steps',
        steps: [
          { title: 'Choose License', description: 'Select your license type' },
          { title: 'Submit Application', description: 'Complete application form' },
          { title: 'Document Review', description: 'We review your documents' },
          { title: 'License Issued', description: 'Receive your license' }
        ]
      },
      createdAt: '2024-01-05',
      usageCount: 15
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ContentTemplate | null>(null);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    category: 'Hero',
    content: '{}'
  });

  const categories = ['Hero', 'Features', 'Process', 'About', 'Stats', 'Custom'];

  const handleCreateTemplate = () => {
    try {
      const template: ContentTemplate = {
        id: Date.now().toString(),
        name: newTemplate.name,
        description: newTemplate.description,
        category: newTemplate.category,
        content: JSON.parse(newTemplate.content),
        createdAt: new Date().toISOString().split('T')[0],
        usageCount: 0
      };
      
      setTemplates(prev => [...prev, template]);
      setIsCreateDialogOpen(false);
      setNewTemplate({ name: '', description: '', category: 'Hero', content: '{}' });
      
      toast({
        title: "Template Created",
        description: `${template.name} has been created successfully`,
      });
    } catch (error) {
      toast({
        title: "Invalid Content",
        description: "Please provide valid JSON content",
        variant: "destructive",
      });
    }
  };

  const handleUseTemplate = (template: ContentTemplate) => {
    // Simulate applying template to content
    setTemplates(prev => prev.map(t => 
      t.id === template.id 
        ? { ...t, usageCount: t.usageCount + 1, lastUsed: new Date().toISOString().split('T')[0] }
        : t
    ));
    
    toast({
      title: "Template Applied",
      description: `${template.name} has been applied to your content`,
    });
  };

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
    toast({
      title: "Template Deleted",
      description: "Template has been removed successfully",
    });
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      Hero: 'bg-blue-100 text-blue-800',
      Features: 'bg-green-100 text-green-800',
      Process: 'bg-purple-100 text-purple-800',
      About: 'bg-orange-100 text-orange-800',
      Stats: 'bg-red-100 text-red-800',
      Custom: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <Badge className={colors[category as keyof typeof colors] || colors.Custom}>
        {category}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">Content Templates</h3>
          <p className="text-muted-foreground">Manage and apply pre-designed content templates</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Template</DialogTitle>
              <DialogDescription>
                Create a reusable content template for your website sections
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Template Name</Label>
                  <Input
                    id="name"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter template name"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    className="w-full px-3 py-2 border border-input rounded-md"
                    value={newTemplate.category}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, category: e.target.value }))}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe this template"
                />
              </div>
              <div>
                <Label htmlFor="content">Content (JSON)</Label>
                <Textarea
                  id="content"
                  value={newTemplate.content}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, content: e.target.value }))}
                  rows={8}
                  placeholder='{"title": "Sample Title", "description": "Sample Description"}'
                  className="font-mono text-sm"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateTemplate}
                  disabled={!newTemplate.name || !newTemplate.description}
                >
                  Create Template
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <EnhancedCard key={template.id} variant="elevated" className="group">
            <EnhancedCardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-1">{template.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                </div>
                {getCategoryBadge(template.category)}
              </div>
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Created: {template.createdAt}</span>
                <span>Used: {template.usageCount} times</span>
                {template.lastUsed && <span>Last: {template.lastUsed}</span>}
              </div>
            </EnhancedCardHeader>

            <EnhancedCardContent>
              <div className="bg-muted/50 rounded p-3 text-xs">
                <strong>Preview:</strong>
                <pre className="mt-1 text-muted-foreground overflow-hidden">
                  {JSON.stringify(template.content, null, 2).substring(0, 100)}...
                </pre>
              </div>
            </EnhancedCardContent>

            <EnhancedCardFooter>
              <div className="flex gap-2 w-full">
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleUseTemplate(template)}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Use
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setSelectedTemplate(template)}
                >
                  <Eye className="h-3 w-3" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleDeleteTemplate(template.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash className="h-3 w-3" />
                </Button>
              </div>
            </EnhancedCardFooter>
          </EnhancedCard>
        ))}
      </div>

      {/* Template Preview Dialog */}
      {selectedTemplate && (
        <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                {selectedTemplate.name}
              </DialogTitle>
              <DialogDescription>
                {selectedTemplate.description}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Template Content:</h4>
                <pre className="text-sm overflow-x-auto">
                  {JSON.stringify(selectedTemplate.content, null, 2)}
                </pre>
              </div>
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline"
                  onClick={() => handleUseTemplate(selectedTemplate)}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Use This Template
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
