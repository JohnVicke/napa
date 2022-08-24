/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "Playfair-Display": ["Playfair Display", "serif"],
        "Source-Sans-Pro": ["Source Sans Pro", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#8ebbff",
          secondary: "#EAB0E7",
          accent: "#37CDBE",
          neutral: "#3D4451",
          "base-100": "#FFFFFF",
          info: "#8A99EC",
          success: "#A7F2A0",
          warning: "#F3F1B7",
          error: "#F39C9C",
        },
      },
      {
        dark: {
          primary: "#8ebbff",
          secondary: "#EAB0E7",
          accent: "#1FB2A6",
          neutral: "#2F3855",
          "base-100": "#24293e",
          info: "#8A99EC",
          success: "#A7F2A0",
          warning: "#F3F1B7",
          error: "#F39C9C",
        },
      },
    ],
  },
};
