/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        dropdownFade: {
          '0%': { 
            opacity: 0, 
            transform: 'scale(0.95) translateY(-10px)',
            pointerEvents: 'none'
          },
          '100%': { 
            opacity: 1, 
            transform: 'scale(1) translateY(0)',
            pointerEvents: 'auto'
          }
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      animation: {
        'dropdownFade': 'dropdownFade 0.3s ease-out forwards',
        'wiggle': 'wiggle 0.3s ease-in-out',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}

