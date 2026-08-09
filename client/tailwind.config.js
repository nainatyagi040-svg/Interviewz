/** @type {import('tailwindcss').Config} */

/*
 * Design tokens sourced verbatim from /design-system (tokens.json, variables.css).
 * This project runs Tailwind v3, so the v4 `@theme` block is mapped here instead.
 * The legacy `brand` scale is intentionally retained so not-yet-migrated components
 * keep rendering during the incremental migration.
 */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        /* ── Design system palette ─────────────────────────────── */
        'midnight-canvas': '#05060f',
        'steel-plate': '#2f343e',
        'fog-veil': '#9da7ba',
        'moon-mist': '#c7d3ea',
        'frost-glow': '#d1e4fa',
        'ice-highlight': '#d8ecf8',
        'pure-white': '#ffffff',
        'void-violet': '#663af3',
        'blueprint-blue': '#b6d9fc',
        'ember-glow': '#e46d4c',
        'signal-blue': '#027dea',
        'deep-teal': '#269684',
        'gridline-blue': '#3f4959',
        'glass-edge': 'rgba(186, 215, 247, 0.12)',
        'luminous-fill': 'rgba(199, 211, 234, 0.12)',

        /* Semantic aliases mapping onto the palette above */
        canvas: '#05060f',
        surface: '#2f343e',
        accent: {
          DEFAULT: '#663af3',
          soft: 'rgba(102, 58, 243, 0.16)',
          glow: 'rgba(102, 58, 243, 0.40)',
        },

        /* ── Legacy scale (kept for un-migrated components) ────── */
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },

      fontFamily: {
        /* Untitled Sans → body, UI, buttons, inputs, badges, small headings */
        sans: [
          'Untitled Sans',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        /* aeonikPro → display headings + wordmark only */
        display: [
          'aeonikPro',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        /* dotDigital → all-caps tracked eyebrow labels */
        eyebrow: [
          'dotDigital',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },

      fontSize: {
        /* Type scale from tokens.json — [size, { lineHeight, letterSpacing }] */
        caption: ['12px', { lineHeight: '1.33' }],
        'body-sm': ['14px', { lineHeight: '1.43' }],
        body: ['16px', { lineHeight: '1.5', letterSpacing: '-0.16px' }],
        subheading: ['18px', { lineHeight: '1.33' }],
        'heading-sm': ['24px', { lineHeight: '1.17', letterSpacing: '-0.24px' }],
        heading: ['28px', { lineHeight: '1.14' }],
        'heading-lg': ['44px', { lineHeight: '1.16' }],
        display: ['48px', { lineHeight: '1.17' }],
      },

      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },

      letterSpacing: {
        eyebrow: '0.10em',
      },

      spacing: {
        /* Layout-scale rhythm values not already in Tailwind's default scale */
        18: '4.5rem', // 72px, mid-step used by nav offsets
        36: '9rem', // 144px
        section: '120px',
        'section-sm': '100px',
        'section-lg': '200px',
      },

      maxWidth: {
        page: '1200px',
        tight: '72rem',
      },

      borderRadius: {
        /* Named radii from tokens.json */
        badge: '6px',
        input: '6px',
        card: '16px',
        modal: '16px',
        lg: '10px',
        '2xl': '16px',
        '3xl': '24px',
        '3.5xl': '28px',
        '4xl': '44px',
        pill: '999px',
      },

      boxShadow: {
        /* Shadow tokens — cool-tinted glows + inset frosted hairlines */
        'ds-sm': 'rgba(186, 207, 247, 0.32) 0px 0px 6px 0px',
        'ds-md': 'rgba(238, 186, 247, 0.24) 0px 0px 12px 0px',
        subtle: 'rgba(186, 215, 247, 0.12) 0px 0px 0px 1px inset',
        'subtle-2':
          'rgba(199, 211, 234, 0.12) -0.5px 0.5px 1px 0px inset, rgba(186, 215, 247, 0.08) 0px 0px 96px 0px inset',
        'subtle-3': 'rgba(186, 214, 247, 0.06) 0px 0px 0px 1px inset',
        'subtle-4':
          'rgba(199, 211, 234, 0.12) 0px 1px 1px 0px inset, rgba(199, 211, 234, 0.05) 0px 24px 48px 0px inset, rgba(6, 6, 14, 0.7) 0px 24px 32px 0px',
        'subtle-5': 'rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset',
        'subtle-6':
          'rgba(216, 236, 248, 0.2) 0px 1px 1px 0px inset, rgba(168, 216, 245, 0.06) 0px 24px 48px 0px inset, rgba(0, 0, 0, 0.3) 0px 16px 32px 0px',
        'subtle-7':
          'rgba(216, 236, 248, 0.2) 0px 1px 1px 0px inset, rgba(168, 216, 245, 0.06) 0px 24px 48px 0px inset',
        'subtle-8':
          'rgba(216, 236, 248, 0.2) 0px 1px 1px 0px inset, rgba(168, 216, 245, 0.06) 0px 24px 48px 0px inset, rgba(199, 211, 234, 0.08) 0px 0px 0px 1px inset',
        'subtle-9': 'rgba(186, 214, 247, 0.24) 0px 0px 0px 1px inset',
        /* Card / modal presets composed from the tokens above */
        card: 'rgba(216, 236, 248, 0.2) 0px 1px 1px 0px inset, rgba(168, 216, 245, 0.06) 0px 24px 48px 0px inset, rgba(63, 73, 89, 0.35) 0px 16px 40px 0px',
        modal:
          'rgba(199, 211, 234, 0.12) 0px 1px 1px 0px inset, rgba(199, 211, 234, 0.05) 0px 24px 48px 0px inset, rgba(6, 6, 14, 0.7) 0px 24px 32px 0px',
        'glow-violet': '0 0 40px rgba(102, 58, 243, 0.35)',

        /* Legacy shadows (kept for un-migrated components) */
        soft: '0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)',
        lift: '0 12px 40px rgba(79,70,229,0.15)',
      },

      backgroundImage: {
        'gradient-ice': 'linear-gradient(0deg, #d8ecf8 0%, #98c0ef 100%)',
        'gradient-headline':
          'linear-gradient(180deg, #d8ecf8 0%, #b6d9fc 55%, #98c0ef 100%)',
        'glow-violet':
          'radial-gradient(closest-side, rgba(102, 58, 243, 0.30), transparent)',
        'glow-frost':
          'radial-gradient(closest-side, rgba(182, 217, 252, 0.18), transparent)',
        'grid-lines':
          'linear-gradient(to right, rgba(63, 73, 89, 0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(63, 73, 89, 0.35) 1px, transparent 1px)',
      },

      backdropBlur: {
        glass: '18px',
      },

      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'border-flow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },

      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        float: 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin-slow 22s linear infinite',
        'border-flow': 'border-flow 3.5s ease-in-out infinite',
      },

      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
