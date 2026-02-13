/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kaal: {
          bg: '#0B0E12', // Deep Void
          surface: '#111722', // Subtle Elevation
          surface2: '#141C28', // Card Surface
          accent: '#FF4D1A', // Electric Orange
          text: '#EAF0FF', // Ice White
          muted: '#A9B4C7', // Cool Grey
          success: '#34D399',
          error: '#FB7185',
          border: 'rgba(255,255,255,0.08)'
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        sora: ['Sora', 'sans-serif']
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
