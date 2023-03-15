const defaultTheme = require("tailwindcss/defaultTheme");
// const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--aw-color-primary)",
        secondary: "var(--aw-color-secondary)",
        accent: "var(--aw-color-accent)",
      },
      fontFamily: {
        sans: ["'InterVariable'", ...defaultTheme.fontFamily.sans],
        abel: ["'Abel'", ...defaultTheme.fontFamily.sans],
        blinker: ["'Blinker'", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
};
