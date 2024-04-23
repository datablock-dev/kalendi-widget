/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,tsx,ts,jsx}'],
  theme: {
    extend: {},
    screens: {
      'sd': { 'max': '800px'},
      'md': { 'min': '800px' }
    }
  },
  plugins: [],
}

