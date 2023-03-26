/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./lib/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      ...colors,
      palette: {
        orange1: "#FFAD62",
        orange2: "#E5855B",
        orange3: "#E8632B",
        pink: "#E82BAF",
        yellow: "#EAD72C",
        blue: "#2BAFE8",
      },
      darkPalette: {
        1: "#F4F4F4",
        2: "#C0C0C0",
        3: "#393939",
        4: "#212121",
        5: "#141414",
      },
      overlay: {
        blackStrong: "rgba(0,0,0,0.6)",
        blackMedium: "rgba(0,0,0,0.4)",
        blackLight: "rgba(0,0,0,0.2)",
      },
    },
    extend: {},
  },
  plugins: [],
};
