/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
export default {
  content: [, "./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      textColor: {
        skin: {
          base: "var(--color-text-base)",
          primary: "var(--color-text-primary)",
        },
      },
      backgroundColor: {
        skin: {
          fill: "var(--color-fill)",
          "button-accent": "var(--color-button-accent)",
          "button-accent-hover": "var(--color-button-accent-hover)",
        },
      },
      fill: {
        skin: {
          fill: "var(--color-fill)",
        },
      },
    },
    fontFamily: {
      sans: ["var(--font-family)", ...fontFamily.sans],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
