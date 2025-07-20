
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, Save, Eye, Plus, Trash } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { dataManager } from '@/utils/dataManager';

interface ContentSection {
  id: string;
  type: 'hero' | 'about' | 'faq' | 'process' | 'stats';
  title: string;
  content: any;
}

export const ContentManager = () => {
  const [contentSections, setContentSections] = useState<ContentSection[]>([
    {
      id: 'hero',
      type: 'hero',
      title: 'Hero Section',
      content: {
        headline: 'Professional Trading Licenses',
        subheadline: 'Get certified to trade on major cryptocurrency exchanges with our internationally recognized licenses',
        ctaText: 'Apply Now',
        backgroundImage: '/placeholder.svg'
      }
    },
    {
      id: 'about',
      type: 'about',
      title: 'About Section',
      content: {
        title: 'About Our Trading Authority',
        description: 'We are a leading regulatory body providing comprehensive trading licenses...',
        features: [
          'Internationally Recognized',
          'Fast Processing',
          'Expert Support'
        ]
      }
    }
  ]);

  const [selectedSection, setSelectedSection] = useState<ContentSection | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [faqItems, setFaqItems] = useState([
    { id: '1', question: 'How long does the licensing process take?', answer: 'Typically 2-4 weeks...' },
    { id: '2', question: 'What documents do I need?', answer: 'You will need...' }
  ]);

  const handleUpdateContent = (sectionId: string, newContent: any) => {
    setContentSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, content: newContent }
          : section
      )
    );
    
    // Save to dataManager or localStorage
    localStorage.setItem('website_content', JSON.stringify(contentSections));
    
    toast({
      title: "Content Updated",
      description: "Website content has been updated successfully",
    });
    
    setIsEditDialogOpen(false);
  };

  const addFaqItem = () => {
    const newFaq = {
      id: Date.now().toString(),
      question: 'New Question',
      answer: 'New Answer'
    };
    setFaqItems(prev => [...prev, newFaq]);
  };

  const deleteFaqItem = (id: string) => {
    setFaqItems(prev => prev.filter(item => item.id !== id));
  };

  const updateFaqItem = (id: string, field: 'question' | 'answer', value: string) => {
    setFaqItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Content Management</h2>
          <p className="text-muted-foreground">Manage website content and copy</p>
        </div>
        <Button variant="outline">
          <Eye className="h-4 w-4 mr-2" />
          Preview Changes
        </Button>
      </div>

      <Tabs defaultValue="sections" className="space-y-6">
        <TabsList>
          <TabsTrigger value="sections">Page Sections</TabsTrigger>
          <TabsTrigger value="faq">FAQ Management</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="sections" className="space-y-4">
          <div className="grid gap-4">
            {contentSections.map((section) => (
              <Card key={section.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>
                      Manage content for the {section.type} section
                    </CardDescription>
                  </div>
                  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedSection(section)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Edit {selectedSection?.title}</DialogTitle>
                        <DialogDescription>
                          Update the content for this section
                        </DialogDescription>
                      </DialogHeader>
                      {selectedSection && (
                        <ContentEditForm 
                          section={selectedSection}
                          onUpdate={(content) => handleUpdateContent(selectedSection.id, content)}
                        />
                      )}
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    {section.type === 'hero' && (
                      <div>
                        <p><strong>Headline:</strong> {section.content.headline}</p>
                        <p><strong>Subheadline:</strong> {section.content.subheadline}</p>
                      </div>
                    )}
                    {section.type === 'about' && (
                      <div>
                        <p><strong>Title:</strong> {section.content.title}</p>
                        <p><strong>Description:</strong> {section.content.description.substring(0, 100)}...</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="faq" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">FAQ Items</h3>
            <Button onClick={addFaqItem} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add FAQ
            </Button>
          </div>
          
          <div className="space-y-4">
            {faqItems.map((faq) => (
              <Card key={faq.id}>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <Label>Question</Label>
                      <Input
                        value={faq.question}
                        onChange={(e) => updateFaqItem(faq.id, 'question', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Answer</Label>
                      <Textarea
                        value={faq.answer}
                        onChange={(e) => updateFaqItem(faq.id, 'answer', e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteFaqItem(faq.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <StatisticsManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ContentEditForm = ({ 
  section, 
  onUpdate 
}: { 
  section: ContentSection; 
  onUpdate: (content: any) => void;
}) => {
  const [formData, setFormData] = useState(section.content);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {section.type === 'hero' && (
        <>
          <div>
            <Label htmlFor="headline">Headline</Label>
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
          <div>
            <Label htmlFor="ctaText">CTA Button Text</Label>
            <Input
              id="ctaText"
              value={formData.ctaText}
              onChange={(e) => updateField('ctaText', e.target.value)}
            />
          </div>
        </>
      )}

      {section.type === 'about' && (
        <>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              rows={4}
            />
          </div>
        </>
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

const StatisticsManager = () => {
  const [stats, setStats] = useState([
    { id: 'licenses', label: 'Active Licenses', value: '2,500+' },
    { id: 'countries', label: 'Countries Served', value: '85+' },
    { id: 'satisfaction', label: 'Client Satisfaction', value: '98%' },
    { id: 'processing', label: 'Avg Processing Time', value: '3 Days' }
  ]);

  const updateStat = (id: string, field: 'label' | 'value', newValue: string) => {
    setStats(prev => 
      prev.map(stat => 
        stat.id === id 
          ? { ...stat, [field]: newValue }
          : stat
      )
    );
  };

  const saveStat = () => {
    localStorage.setItem('website_stats', JSON.stringify(stats));
    toast({
      title: "Statistics Updated",
      description: "Website statistics have been updated",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Website Statistics</h3>
        <Button onClick={saveStat} size="sm">
          <Save className="h-4 w-4 mr-2" />
          Save All
        </Button>
      </div>
      
      <div className="grid gap-4">
        {stats.map((stat) => (
          <Card key={stat.id}>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Label</Label>
                  <Input
                    value={stat.label}
                    onChange={(e) => updateStat(stat.id, 'label', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Value</Label>
                  <Input
                    value={stat.value}
                    onChange={(e) => updateStat(stat.id, 'value', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
