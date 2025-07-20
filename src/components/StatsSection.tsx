
import { Card, CardContent } from '@/components/ui/card';

const StatsSection = () => {
  const stats = [
    {
      number: "60+",
      label: "Support Countries",
      description: "Global regulatory coverage"
    },
    {
      number: "30K+",
      label: "Certifications",
      description: "Successfully issued licenses"
    },
    {
      number: "15K+",
      label: "Businesses",
      description: "Trusted by companies worldwide"
    },
    {
      number: "24+",
      label: "Years of Experience",
      description: "Industry expertise and knowledge"
    }
  ];

  return (
    <section className="py-20 bg-primary/5">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Trusted Globally
            </h2>
            <p className="text-lg text-muted-foreground">
              Our track record speaks for itself
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="stats-card">
                <CardContent className="p-6">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
