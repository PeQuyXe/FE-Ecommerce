/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif', 'Poppins'],
      },
      fontSize: {
        xs: '0.75rem', // 12px
        sm: '0.875rem', // 14px
        base: '1rem', // 16px
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem', // 48px
        '6xl': '3.75rem', // 60px
        '7xl': '4.5rem', // 72px
      },
      colors: {
        dark: {
          primary: '#333',
          secondary: '#555',
        },
        light: {
          primary: '#fff',
          secondary: '#eee',
        },
      },
      animation: {
        wave1: 'wave 1s ease-in-out infinite',
        wave2: 'wave 1s ease-in-out infinite 0.2s',
        wave3: 'wave 1s ease-in-out infinite 0.4s',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(0.5)' },
        },
      },
    },
  },
  plugins: [],
};
