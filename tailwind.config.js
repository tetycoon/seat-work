/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#13293D',
          dark: '#0B1926',
          emerald: '#0F9D76',
          emeraldLight: '#E6F7F2',
          amber: '#F59E0B',
          amberLight: '#FEF3C7',
          surface: '#F4FAF8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-emerald': '0 10px 30px -5px rgba(15, 157, 118, 0.35)',
        'glow-amber': '0 10px 30px -5px rgba(245, 158, 11, 0.35)',
      }
    },
  },
  plugins: [],
}
