/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          primary: '#06b6d4', // Cyan-500
          primaryDim: 'rgba(6, 182, 212, 0.1)',
          dark: '#020617', // Slate-950
          card: '#0f172a', // Slate-900
          text: '#94a3b8', // Slate-400
          white: '#f8fafc', // Slate-50
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          mono: ['JetBrains Mono', 'SFMono-Regular', 'monospace'],
        }
      },
      animation: {
        'flicker': 'flicker 3s linear forwards',
        'spotlight-on': 'turnOn 2s ease-out forwards',
        'scan': 'scan 4s linear infinite',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': { opacity: '0.99' },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { opacity: '0.4' },
        },
        turnOn: {
          '0%': { opacity: 0, transform: 'scale(0.9)' },
          '10%': { opacity: 0.1 },
          '20%': { opacity: 0 },
          '30%': { opacity: 0.4 },
          '40%': { opacity: 0.1 },
          '50%': { opacity: 1, transform: 'scale(1)' },
          '100%': { opacity: 1, transform: 'scale(1)' }
        },
        scan: {
          '0%': { top: '0%', opacity: 0 },
          '10%': { opacity: 1 },
          '90%': { opacity: 1 },
          '100%': { top: '100%', opacity: 0 },
        }
      }
    },
  },
  plugins: [],
}