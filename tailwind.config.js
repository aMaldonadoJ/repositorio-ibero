/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        blue400: "#276685",
        blue300: "#779FB3",
        blue200: "#9EBAC8",
        blue100: "#D4E0E7",
        redBase: "#E00034",
        greenBase: "#04AFA0",
        gray300: "#ACA49F",
        gray200: "#D5D1CF",
        gray100: "#F3F3F3",
        darkblue:"#03344F",
        mustard: "#FF9800",
        redlight: "#EF4044",

      },

      fontFamily: {
        noto: ['Noto Sans', 'sans-serif'],
      },
      
    },
  },
  plugins: [],
};