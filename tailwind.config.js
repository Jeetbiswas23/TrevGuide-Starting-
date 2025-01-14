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
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'flag-wave': {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
        mobileMenuIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        mobileMenuOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        'dropdownFade': 'dropdownFade 0.3s ease-out forwards',
        'wiggle': 'wiggle 0.3s ease-in-out',
        'fade-in': 'fadeIn 1s ease-out',
        'flag-wave': 'flag-wave 2s ease-in-out infinite',
        'mobile-menu-in': 'mobileMenuIn 0.3s ease-out',
        'mobile-menu-out': 'mobileMenuOut 0.3s ease-in'
      },
      backdropBlur: {
        'xs': '2px',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'menu': 'transform, opacity, visibility',
      },
      scale: {
        '102': '1.02',
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
      screens: {
        'xs': '475px',
      },
      transitionTimingFunction: {
        'menu': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

