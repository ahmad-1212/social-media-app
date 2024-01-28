/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        blue: {
          100: "#cee0ff",
          200: "#9cc2ff",
          300: "#6ba3ff",
          400: "#3985ff",
          500: "#0866ff",
          600: "#0652cc",
          700: "#053d99",
          800: "#032966",
          900: "#021433",
        },
        gray: {
          100: "#fcfcfd",
          200: "#f9fafb",
          300: "#f6f7f9",
          400: "#f3f5f7",
          500: "#f0f2f5",
          600: "#c0c2c4",
          700: "#909193",
          800: "#575757",
          900: "#242526",
        },
      },
    },
  },
  plugins: [],
};
