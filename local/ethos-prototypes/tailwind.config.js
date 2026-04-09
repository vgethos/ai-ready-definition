/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cambon: ['Cambon', 'Georgia', 'serif'],
        sans: ['NewTheinhardt', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      maxWidth: {
        phone: '390px',
      },
      minWidth: {
        phone: '320px',
      },
    },
  },
  plugins: [],
};
