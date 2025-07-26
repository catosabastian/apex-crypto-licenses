
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ChevronRight, MessageSquareText, XCircle, Shield, Star, Crown, Building, Zap, Trophy, Wifi } from 'lucide-react';

import SupportDialog from '@/components/SupportDialog';
import { supabase } from '@/integrations/supabase/client';

interface LicenseCategory {
  id: string;
  category_number: number;
  name: string;
  price: string;
  min_volume: string;
  available: boolean;
  features: string[];
  icon: string;
  color: string;
  popular: boolean;
  exclusive: boolean;
}

const LicenseCategories = () => {
  const [isSupportDialogOpen, setSupportDialogOpen] = useState(false);
  const [categories, setCategories] = useState<LicenseCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('license_categories')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;
        setCategories((data || []).map(item => ({
          ...item,
          features: Array.isArray(item.features) ? item.features.filter(f => typeof f === 'string') as string[] : [],
          color: item.color || 'blue',
          display_order: item.display_order || 0,
          popular: item.popular || false,
          exclusive: item.exclusive || false,
          description: item.description || undefined
        })));
        setLastUpdateTime(new Date());
        setIsConnected(true);
      } catch (error) {
        console.error('Error loading categories:', error);
        setIsConnected(false);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
    
    // Set up real-time subscription for license categories
    const channel = supabase
      .channel('license_categories_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'license_categories'
      }, () => {
        loadCategories();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  
  return (
    <section id="licenses" className="py-24 bg-muted/20">
      <div className="container">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent rounded-full"></div>
            <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">License Categories</span>
            <div className="flex items-center gap-2 ml-auto">
              <Wifi className={`h-4 w-4 ${isConnected ? 'text-green-500' : 'text-red-500'}`} />
              <span className={`text-xs ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                {isConnected ? 'Live Updates' : 'Disconnected'}
              </span>
              <span className="text-xs text-muted-foreground">
                {lastUpdateTime.toLocaleTimeString()}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Comprehensive Licensing
                <span className="block gradient-text">Solutions</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Choose from our six specialized license categories, each designed to meet different trading volumes and regulatory requirements.
              </p>
            </div>
          </div>
          
          {/* Main License Categories - Dynamic from Database */}
          {loading ? (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-12">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="h-96 animate-pulse">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-8 bg-muted rounded w-1/2"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded"></div>
                        <div className="h-3 bg-muted rounded w-5/6"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-12">
              {categories.map((category) => (
                <LicenseCategory 
                  key={category.id}
                  category={category.category_number}
                  title={category.name}
                  price={category.price}
                  minVolume={category.min_volume}
                  icon={getIconComponent(category.icon)}
                  color={category.color}
                  features={category.features}
                  popular={category.popular}
                  exclusive={category.exclusive}
                  soldOut={!category.available}
                  onApplyClick={() => document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })}
                />
              ))}
            </div>
          )}
          
          {/* Enterprise Solution Card */}
          <Card className="border-2 border-accent/30 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <MessageSquareText className="h-6 w-6 text-accent" />
                Enterprise Solution
              </CardTitle>
              <CardDescription className="text-lg">
                Tailored licensing solutions for large corporations and institutional clients requiring customized regulatory frameworks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Corporate entity verification</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Custom compliance framework</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Dedicated legal advisors</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Global regulatory coordination</span>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Button 
                    size="lg"
                    variant="outline" 
                    className="gap-3 border-2 border-accent/30 hover:bg-accent/10 px-8 py-6" 
                    onClick={() => setSupportDialogOpen(true)}
                  >
                    <MessageSquareText className="h-5 w-5" />
                    Contact Enterprise Team
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <SupportDialog open={isSupportDialogOpen} onOpenChange={setSupportDialogOpen} />
        </div>
      </div>
    </section>
  );
};

// Helper function to get icon component from string
const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: any } = {
    Shield,
    CheckCircle,
    Star,
    Crown,
    Building,
    Trophy
  };
  return iconMap[iconName] || Shield;
};

interface LicenseCategoryProps {
  category: number;
  title: string;
  price: string;
  minVolume: string;
  icon: any;
  color: string;
  features: string[];
  popular?: boolean;
  exclusive?: boolean;
  soldOut?: boolean;
  onApplyClick?: () => void;
}

const LicenseCategory = ({ category, title, price, minVolume, icon: Icon, color, features, popular, exclusive, soldOut, onApplyClick }: LicenseCategoryProps) => {
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
      green: 'from-green-500/20 to-green-600/20 border-green-500/30',
      purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
      gold: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30',
      platinum: 'from-gray-400/20 to-gray-600/20 border-gray-500/30',
      diamond: 'from-cyan-500/20 to-purple-500/20 border-cyan-500/30'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <Card className={`relative h-full transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${
      popular ? 'border-2 border-accent shadow-xl' : 
      exclusive ? 'border-2 border-gradient-to-r from-cyan-500 to-purple-500 shadow-2xl' : 
      'border border-border/60'
    } ${soldOut ? 'opacity-70' : ''}`}>
      {popular && !soldOut && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <Badge className="bg-accent text-white border-0 px-4 py-1 text-sm font-semibold">
            <Star className="h-4 w-4 mr-1" />
            Most Popular
          </Badge>
        </div>
      )}
      
      {exclusive && !soldOut && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <Badge className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0 px-4 py-1 text-sm font-semibold">
            <Zap className="h-4 w-4 mr-1" />
            Exclusive
          </Badge>
        </div>
      )}
      
      {soldOut && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <Badge variant="destructive" className="bg-red-500 text-white border-0 px-4 py-1 text-sm font-semibold">
            <XCircle className="h-4 w-4 mr-1" />
            Sold Out
          </Badge>
        </div>
      )}
      
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getColorClasses(color)} border-2 flex items-center justify-center`}>
            <Icon className="h-7 w-7 text-foreground" />
          </div>
          <Badge variant="outline" className="text-sm font-medium">
            Category {category}
          </Badge>
        </div>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription className="text-base">
          Trade Volume: {minVolume} minimum
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="mb-6">
          <div className="text-4xl font-bold text-accent mb-2">{price}</div>
          <p className="text-sm text-muted-foreground font-medium">3-year license validity</p>
        </div>
        
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className={`w-full gap-2 py-3 font-semibold ${
            popular && !soldOut ? 'btn-primary' : 
            exclusive && !soldOut ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600' : 
            'variant-outline'
          }`}
          onClick={onApplyClick}
          disabled={soldOut}
        >
          {soldOut ? (
            <>
              <XCircle className="h-4 w-4" />
              Sold Out
            </>
          ) : (
            <>
              Apply Now
              <ChevronRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LicenseCategories;
