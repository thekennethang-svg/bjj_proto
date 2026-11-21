/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0A',
        surface: '#141414',
        'surface-hover': '#1c1c1c',
        'surface-raised': '#1A1A1A',
        accent: '#E8C547',
        border: '#2A2A2A',
        'text-secondary': '#A0A0A0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 8s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '0.04' },
          '50%': { opacity: '0.08' },
        },
      },
    },
  },
  plugins: [],
};
