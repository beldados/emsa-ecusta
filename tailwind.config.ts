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
          gold: '#5CB3FF',          // Primary Blue Accent (replaces yellow)
          'gold-hover': '#007FFF',    // Interactive Hover Blue
          'gold-rule': '#007FFF',     // Border Rule Blue
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
        serif: ['var(--font-benaiah)', 'serif'],
        heading: ['var(--font-benaiah)', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
