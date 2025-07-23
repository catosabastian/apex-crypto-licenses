
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabaseDataManager } from '@/utils/supabaseDataManager';
import { Loader2, Save, FileText, Home, Info, Settings } from 'lucide-react';

interface ContentSection {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    cta_text: string;
    stats: Array<{ value: string; label: string }>;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    services: Array<{ icon: string; title: string; description: string }>;
  };
  process: {
    title: string;
    subtitle: string;
    description: string;
    cta_text: string;
    steps: Array<{ number: string; title: string; description: string }>;
  };
}

export function DynamicContentManager() {
  const [content, setContent] = useState<ContentSection>({
    hero: {
      title: '',
      subtitle: '',
      description: '',
      cta_text: '',
      stats: []
    },
    about: {
      title: '',
      subtitle: '',
      description: '',
      services: []
    },
    process: {
      title: '',
      subtitle: '',
      description: '',
      cta_text: '',
      steps: []
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true);
        const allContent = await supabaseDataManager.getContent();
        
        setContent({
          hero: {
            title: allContent.hero_title || 'Professional Trading License Services',
            subtitle: allContent.hero_subtitle || 'Secure Your Trading Future',
            description: allContent.hero_description || 'Get licensed to trade across major cryptocurrency exchanges with our comprehensive licensing services.',
            cta_text: allContent.hero_cta_text || 'Get Licensed Now',
            stats: allContent.hero_stats || [
              { value: '2000+', label: 'Licensed Traders' },
              { value: '15+', label: 'Supported Exchanges' },
              { value: '99.9%', label: 'Approval Rate' }
            ]
          },
          about: {
            title: allContent.about_title || 'Why Choose Our Licensing Services?',
            subtitle: allContent.about_subtitle || 'Industry Leading Expertise',
            description: allContent.about_description || 'With years of experience in cryptocurrency regulation and compliance, we provide the most comprehensive licensing services in the industry.',
            services: allContent.about_services || [
              { icon: 'Shield', title: 'Regulatory Compliance', description: 'Full compliance with international trading regulations and standards.' },
              { icon: 'Clock', title: 'Fast Processing', description: 'Quick turnaround times with our streamlined application process.' },
              { icon: 'Users', title: 'Expert Support', description: '24/7 support from our team of regulatory experts.' }
            ]
          },
          process: {
            title: allContent.process_title || 'How to Get Your License',
            subtitle: allContent.process_subtitle || 'Simple Process',
            description: allContent.process_description || 'Follow our streamlined process to get your trading license quickly and efficiently.',
            cta_text: allContent.process_cta_text || 'Start Your Application',
            steps: allContent.process_steps || [
              { number: '01', title: 'Choose Your License Category', description: 'Select the appropriate license category based on your trading needs and volume requirements.' },
              { number: '02', title: 'Submit Application', description: 'Fill out our comprehensive application form with all required documentation.' },
              { number: '03', title: 'Payment & Verification', description: 'Complete secure payment and undergo our verification process.' },
              { number: '04', title: 'Receive Your License', description: 'Get your official trading license and start trading on supported exchanges.' }
            ]
          }
        });
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

    loadContent();
  }, [toast]);

  const handleSaveSection = async (section: keyof ContentSection) => {
    try {
      setIsSaving(true);
      const sectionContent = content[section];
      
      for (const [key, value] of Object.entries(sectionContent)) {
        await supabaseDataManager.updateContent(section, key, value);
      }
      
      toast({
        title: "Success",
        description: `${section.charAt(0).toUpperCase() + section.slice(1)} section updated successfully`,
      });
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Error",
        description: "Failed to save content",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const updateContent = (section: keyof ContentSection, field: string, value: any) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const updateArrayItem = (section: keyof ContentSection, field: string, index: number, itemField: string, value: any) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field as keyof typeof prev[section]].map((item: any, i: number) => 
          i === index ? { ...item, [itemField]: value } : item
        )
      }
    }));
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Dynamic Content Manager
          </CardTitle>
          <CardDescription>Loading content...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>Loading content...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Dynamic Content Manager
        </CardTitle>
        <CardDescription>
          Manage all website content dynamically from the database
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="hero" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Hero Section
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              About Section
            </TabsTrigger>
            <TabsTrigger value="process" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Process Section
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hero-title">Title</Label>
                  <Input
                    id="hero-title"
                    value={content.hero.title}
                    onChange={(e) => updateContent('hero', 'title', e.target.value)}
                    placeholder="Hero title"
                  />
                </div>
                <div>
                  <Label htmlFor="hero-subtitle">Subtitle</Label>
                  <Input
                    id="hero-subtitle"
                    value={content.hero.subtitle}
                    onChange={(e) => updateContent('hero', 'subtitle', e.target.value)}
                    placeholder="Hero subtitle"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="hero-description">Description</Label>
                <Textarea
                  id="hero-description"
                  value={content.hero.description}
                  onChange={(e) => updateContent('hero', 'description', e.target.value)}
                  placeholder="Hero description"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="hero-cta">Call to Action Text</Label>
                <Input
                  id="hero-cta"
                  value={content.hero.cta_text}
                  onChange={(e) => updateContent('hero', 'cta_text', e.target.value)}
                  placeholder="CTA button text"
                />
              </div>
              
              <div className="space-y-3">
                <Label>Statistics</Label>
                {content.hero.stats.map((stat, index) => (
                  <div key={index} className="grid grid-cols-2 gap-2 p-3 border rounded">
                    <Input
                      value={stat.value}
                      onChange={(e) => updateArrayItem('hero', 'stats', index, 'value', e.target.value)}
                      placeholder="Value (e.g., 2000+)"
                    />
                    <Input
                      value={stat.label}
                      onChange={(e) => updateArrayItem('hero', 'stats', index, 'label', e.target.value)}
                      placeholder="Label (e.g., Licensed Traders)"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
              onClick={() => handleSaveSection('hero')}
              disabled={isSaving}
              className="w-full"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Hero Section
                </>
              )}
            </Button>
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="about-title">Title</Label>
                  <Input
                    id="about-title"
                    value={content.about.title}
                    onChange={(e) => updateContent('about', 'title', e.target.value)}
                    placeholder="About title"
                  />
                </div>
                <div>
                  <Label htmlFor="about-subtitle">Subtitle</Label>
                  <Input
                    id="about-subtitle"
                    value={content.about.subtitle}
                    onChange={(e) => updateContent('about', 'subtitle', e.target.value)}
                    placeholder="About subtitle"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="about-description">Description</Label>
                <Textarea
                  id="about-description"
                  value={content.about.description}
                  onChange={(e) => updateContent('about', 'description', e.target.value)}
                  placeholder="About description"
                  rows={3}
                />
              </div>
              
              <div className="space-y-3">
                <Label>Services</Label>
                {content.about.services.map((service, index) => (
                  <div key={index} className="space-y-2 p-3 border rounded">
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        value={service.icon}
                        onChange={(e) => updateArrayItem('about', 'services', index, 'icon', e.target.value)}
                        placeholder="Icon name (Shield, Clock, Users)"
                      />
                      <Input
                        value={service.title}
                        onChange={(e) => updateArrayItem('about', 'services', index, 'title', e.target.value)}
                        placeholder="Service title"
                      />
                    </div>
                    <Textarea
                      value={service.description}
                      onChange={(e) => updateArrayItem('about', 'services', index, 'description', e.target.value)}
                      placeholder="Service description"
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
              onClick={() => handleSaveSection('about')}
              disabled={isSaving}
              className="w-full"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save About Section
                </>
              )}
            </Button>
          </TabsContent>

          <TabsContent value="process" className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="process-title">Title</Label>
                  <Input
                    id="process-title"
                    value={content.process.title}
                    onChange={(e) => updateContent('process', 'title', e.target.value)}
                    placeholder="Process title"
                  />
                </div>
                <div>
                  <Label htmlFor="process-subtitle">Subtitle</Label>
                  <Input
                    id="process-subtitle"
                    value={content.process.subtitle}
                    onChange={(e) => updateContent('process', 'subtitle', e.target.value)}
                    placeholder="Process subtitle"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="process-description">Description</Label>
                <Textarea
                  id="process-description"
                  value={content.process.description}
                  onChange={(e) => updateContent('process', 'description', e.target.value)}
                  placeholder="Process description"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="process-cta">Call to Action Text</Label>
                <Input
                  id="process-cta"
                  value={content.process.cta_text}
                  onChange={(e) => updateContent('process', 'cta_text', e.target.value)}
                  placeholder="CTA button text"
                />
              </div>
              
              <div className="space-y-3">
                <Label>Process Steps</Label>
                {content.process.steps.map((step, index) => (
                  <div key={index} className="space-y-2 p-3 border rounded">
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        value={step.number}
                        onChange={(e) => updateArrayItem('process', 'steps', index, 'number', e.target.value)}
                        placeholder="Step number (01, 02, etc.)"
                      />
                      <Input
                        value={step.title}
                        onChange={(e) => updateArrayItem('process', 'steps', index, 'title', e.target.value)}
                        placeholder="Step title"
                      />
                    </div>
                    <Textarea
                      value={step.description}
                      onChange={(e) => updateArrayItem('process', 'steps', index, 'description', e.target.value)}
                      placeholder="Step description"
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
              onClick={() => handleSaveSection('process')}
              disabled={isSaving}
              className="w-full"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Process Section
                </>
              )}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
