import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#1B2A4A',
          midnight: '#0F1B33',
          'midnight-deep': '#050B14',
          gold: '#D4AF37',
          'gold-hover': '#C5A028',
          'gold-rule': '#B8972A',
          crimson: '#9B1B30',
        },
        canvas: {
          DEFAULT: 'var(--color-bg-canvas)',
        },
        surface: {
          DEFAULT: 'var(--color-bg-surface)',
          elevated: 'var(--color-bg-surface-elevated)',
        },
        content: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          gold: 'var(--color-text-gold)',
        },
        rule: {
          subtle: 'var(--color-border-subtle)',
          gold: 'var(--color-border-gold)',
        },
        status: {
          success: 'var(--color-status-success)',
          warning: 'var(--color-status-warning)',
          danger: 'var(--color-status-danger)',
        },
      },
      fontFamily: {
        brand: ['var(--font-benahia)', 'serif'],
        serif: ['var(--font-benahia)', 'serif'],
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};

export default config;

