/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', 'Inter', 'sans-serif'],
      },
      fontWeight: {
        'extralight': '200',
        'light': '300',
        'regular': '400',
      },
      colors: {
        yellow: {
          600: '#ffb91a',
        }
      },
      animation: {
        'fadeIn': 'fadeIn 0.6s ease-out forwards',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
};