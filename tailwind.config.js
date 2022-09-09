/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#211F1C',
          800: '#484543',
          700: '#393D45',
          600: '#616467',
          500: '#ACACAC',
          300: '#F8F8F8',
          200: '#FEFDFB'
        },
      }
    },
  },
  plugins: [],
}
