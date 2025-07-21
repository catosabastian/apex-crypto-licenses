
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Globe, Award, CheckCircle, Clock } from 'lucide-react';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

const StatsSection = () => {
  const [content, setContent] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await supabaseDataManager.getContent('stats');
        console.log('Stats content loaded:', data);
        setContent(data || {});
      } catch (error) {
        console.error('Failed to load stats content:', error);
        setContent({});
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  const iconMap: Record<string, any> = {
    TrendingUp,
    Users,
    Globe,
    Award,
    CheckCircle,
    Clock
  };

  if (loading) {
    return (
      <div className="py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-foreground mx-auto"></div>
        </div>
      </div>
    );
  }

  const stats = content.stats || [];

  return (
    <section className="py-24 bg-primary text-primary-foreground vibrant-glow">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="secondary" className="mb-6">
            {content.badge || 'Our Impact'}
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {content.title || 'Trusted by Thousands Worldwide'}
          </h2>
          
          <p className="text-xl text-primary-foreground/80">
            {content.subtitle || 'Join the growing community of licensed crypto professionals'}
          </p>
        </div>

        {stats.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = iconMap[stat.icon] || TrendingUp;
              
              return (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-center group hover:bg-white/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {stat.number}
                      </div>
                      
                      <div className="text-sm text-white/80">
                        {stat.label}
                      </div>
                      
                      {stat.description && (
                        <div className="text-xs text-white/60 mt-1">
                          {stat.description}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          // Default stats when no content is loaded
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center group hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    25,000+
                  </div>
                  
                  <div className="text-sm text-white/80">
                    Licensed Traders
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center group hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    180+
                  </div>
                  
                  <div className="text-sm text-white/80">
                    Countries Served
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center group hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    99.8%
                  </div>
                  
                  <div className="text-sm text-white/80">
                    Success Rate
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center group hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    $2.5B+
                  </div>
                  
                  <div className="text-sm text-white/80">
                    Volume Licensed
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default StatsSection;
