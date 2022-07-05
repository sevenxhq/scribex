// tailwind.config.js
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: "#0073E5",
      "primary-50": "#E4F2FF",
      secondary: "#151515",
      success: "#40C000",
      error: "#FF4D4D",
      validation: "#FFE5E5",
      white: colors.white,
      light: "#E4F1FF",
      gray: colors.neutral,
      dark: "#333333",
      black: colors.black,
      green: colors.green,
      yellow: colors.amber,
      red: colors.red,
    },
    extend: {
      fontSize: {
        xxs: ".65rem",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      height: {
        editor: "calc(-9rem + 100vh)",
        "audio-editor": "calc(-6.5rem + 100vh)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
