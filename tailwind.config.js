/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif', 'Poppins'],
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
