/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,tsx,ts,jsx}'],
  theme: {
    extend: {},
    screens: {
      'kalendi-sd': { 'max': '800px'},
      'kalendi-md': { 'min': '800px' }
    }
  },
  plugins: [],
}

