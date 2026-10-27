import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FAFAF7',
        ink: '#1A1A1A',
        clay: '#C65D3A',
        'clay-deep': '#A94829',
        'clay-soft': '#E7B7A7',
        sand: '#EFEDE5',
        fog: '#F3F2EC',
        muted: '#68675F',
        line: '#DCDAD0',
        cream: '#F7F3EA',
        olive: '#4A5D3A',
      },
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Inter Tight Variable', 'Inter Tight', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.065em',
        label: '0.16em',
      },
      maxWidth: {
        screen: '1600px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(1.06)' },
          '100%': { transform: 'scale(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 1.2s ease both',
        'scale-in': 'scale-in 1.4s cubic-bezier(0.22, 1, 0.36, 1) both',
        marquee: 'marquee 28s linear infinite',
        'accordion-down': 'accordion-down 0.28s ease-out',
        'accordion-up': 'accordion-up 0.22s ease-out',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config
