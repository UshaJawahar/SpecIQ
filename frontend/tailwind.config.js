/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0a0a0a',
          secondary: '#1a1a1a',
          tertiary: '#2a2a2a',
        },
        primary: {
          DEFAULT: '#00d4ff',
          dark: '#0099cc',
          light: '#33ddff',
        },
        accent: {
          green: '#00ff88',
          purple: '#8b5cf6',
          orange: '#ff6b35',
        },
        text: {
          primary: '#ffffff',
          secondary: '#a0a0a0',
          muted: '#666666',
        },
        border: {
          DEFAULT: '#333333',
          light: '#444444',
        },
        glow: {
          blue: '#00d4ff',
          green: '#00ff88',
          purple: '#8b5cf6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(0, 212, 255, 0.3)',
        'glow-green': '0 0 20px rgba(0, 255, 136, 0.3)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.3)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 212, 255, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.6)' },
        }
      }
    },
  },
  plugins: [],
} 