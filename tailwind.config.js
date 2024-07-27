/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
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
    },
  },
  plugins: [],
};
