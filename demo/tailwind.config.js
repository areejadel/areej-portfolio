/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b1b33',
        panel: '#0f2542',
        accent: '#2f7ed8',
      },
      fontFamily: {
        sans: ['system-ui', 'Segoe UI', 'Tahoma', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
