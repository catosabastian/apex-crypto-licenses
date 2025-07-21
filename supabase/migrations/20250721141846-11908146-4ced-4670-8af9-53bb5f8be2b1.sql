
-- Create hero section content in the database
INSERT INTO public.content (section, key, value) VALUES
('hero', 'badge', '"🚀 New License Platform Available"'),
('hero', 'title', '{"line1": "Get Your", "line2": "Digital License", "line3": "Today"}'),
('hero', 'subtitle', '"Streamlined licensing process with blockchain verification and instant approval for modern businesses."'),
('hero', 'primaryCTA', '"Apply Now"'),
('hero', 'secondaryCTA', '"Watch Demo"'),
('hero', 'trustIndicators', '["Blockchain Verified", "Instant Approval", "Global Recognition", "24/7 Support"]'),
('hero', 'statsTitle', '"Platform Statistics"'),
('hero', 'stats', '[
  {
    "number": "10,000+",
    "label": "Active Licenses",
    "description": "Issued worldwide"
  },
  {
    "number": "99.9%",
    "label": "Uptime",
    "description": "Platform reliability"
  },
  {
    "number": "150+",
    "label": "Countries",
    "description": "Global coverage"
  },
  {
    "number": "24/7",
    "label": "Support",
    "description": "Always available"
  }
]')
ON CONFLICT (section, key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = now();
