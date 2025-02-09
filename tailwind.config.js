/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/*.{html,js,jsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        "custom-primary": "#1D5506",
        "custom-secondary": {
          50: "#322E29",
          100: "#2C393F",
        },
        "custom-gray": {
          50: "#C8C8C8",
          100: "#C7C7C7",
        },
        primary: "#1D5506",
        footer: "#322E29",
        nav: "#0D011E",
      },
      fontFamily: {
        Lex: ["Lexend", "sans-serif"],
        Lato: ["Lato", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        mont: ["Montserrat", "sans-serif"],
        lex: ["Lexend", "sans-serif"],
      },
    },
  },
  plugins: [],
};
