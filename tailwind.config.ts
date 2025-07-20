
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				display: ['Inter', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'Consolas', 'monospace'],
			},
			fontSize: {
				'display': ['clamp(3rem, 8vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
				'hero': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
				'section': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					amber: 'hsl(var(--accent-amber))',
					emerald: 'hsl(var(--accent-emerald))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				xl: 'calc(var(--radius) + 4px)',
				'2xl': 'calc(var(--radius) + 8px)',
				'3xl': 'calc(var(--radius) + 12px)',
			},
			backdropBlur: {
				xs: '2px',
				sm: '4px',
				md: '8px',
				lg: '16px',
				xl: '24px',
				'2xl': '32px',
				'3xl': '48px',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(40px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-up': {
					'0%': { opacity: '0', transform: 'translateY(50px) scale(0.95)' },
					'100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.9)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'33%': { transform: 'translateY(-10px) rotate(120deg)' },
					'66%': { transform: 'translateY(-20px) rotate(240deg)' }
				},
				'float-particle': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: '0.3' },
					'50%': { transform: 'translateY(-30px) rotate(180deg)', opacity: '0.8' }
				},
				'glow': {
					'0%': { boxShadow: '0 0 20px hsl(var(--primary) / 0.3)' },
					'100%': { boxShadow: '0 0 40px hsl(var(--primary) / 0.6), 0 0 60px hsl(var(--primary) / 0.4)' }
				},
				'pulse-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 20px hsl(var(--primary) / 0.2)',
						transform: 'scale(1)'
					},
					'50%': { 
						boxShadow: '0 0 40px hsl(var(--primary) / 0.4), 0 0 60px hsl(var(--primary) / 0.2)',
						transform: 'scale(1.02)'
					}
				},
				'shimmer': {
					'0%': { left: '-100%' },
					'100%': { left: '100%' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.8s ease-out forwards',
				'fade-in-up': 'fade-in-up 1s ease-out forwards',
				'slide-up': 'slide-up 1s ease-out forwards',
				'scale-in': 'scale-in 0.6s ease-out forwards',
				'float': 'float 6s ease-in-out infinite',
				'float-particle': 'float-particle 8s ease-in-out infinite',
				'glow': 'glow 3s ease-in-out infinite alternate',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
				'shimmer': 'shimmer 2s infinite'
			},
			boxShadow: {
				'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
				'glass-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
				'glass-xl': '0 35px 60px -12px rgba(0, 0, 0, 0.35)',
				'glow': '0 0 20px hsl(var(--primary) / 0.3)',
				'glow-lg': '0 0 40px hsl(var(--primary) / 0.4), 0 0 60px hsl(var(--primary) / 0.2)',
			},
			blur: {
				xs: '2px',
			},
			spacing: {
				'18': '4.5rem',
				'22': '5.5rem',
				'26': '6.5rem',
				'30': '7.5rem',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
