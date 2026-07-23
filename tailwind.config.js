/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#111111',
        primary: {
          light: '#fde68a', // amber-200
          DEFAULT: '#d97706', // amber-600
          dark: '#92400e', // amber-800
        },
        gold: {
          light: '#fef08a', // yellow-200
          DEFAULT: '#eab308', // yellow-500
          dark: '#a16207', // yellow-800
        },
        aurora: {
          green: '#10b981', // emerald-500
          blue: '#3b82f6', // blue-500
          purple: '#8b5cf6', // violet-500
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        cursive: ['"Alex Brush"', '"Dancing Script"', 'cursive'],
        quote: ['"Playfair Display"', 'serif'],
        numbers: ['"Playfair Display"', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'aurora': 'aurora 15s ease infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        aurora: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      }
    },
  },
  plugins: [],
}
