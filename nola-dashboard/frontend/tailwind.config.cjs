/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'], // 👈 ESSA LINHA É FUNDAMENTAL!
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,html}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
