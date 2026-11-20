/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: '#08080a',
        panel: '#0f0f12',
        line: 'rgba(255,255,255,0.08)',
        fg: '#ededed',
        muted: '#8b8b94',
        accent: { DEFAULT: '#c8ff4d', dim: 'rgba(200,255,77,0.12)' },
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'SFMono-Regular', 'monospace'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      animation: {
        marquee: 'marquee 45s linear infinite',
        'marquee-rev': 'marquee 45s linear infinite reverse',
        aurora: 'aurora 18s ease-in-out infinite alternate',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        bob: 'bob 1.6s ease-in-out infinite',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        aurora: {
          '0%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(8%,-6%) scale(1.15)' },
          '100%': { transform: 'translate(-6%,4%) scale(0.95)' },
        },
        bob: { '0%,100%': { transform: 'translateY(-3px)' }, '50%': { transform: 'translateY(3px)' } },
        pulseDot: { '0%,100%': { boxShadow: '0 0 0 0 rgba(200,255,77,0.6)' }, '50%': { boxShadow: '0 0 0 6px rgba(200,255,77,0)' } },
      },
    },
  },
  plugins: [],
}
