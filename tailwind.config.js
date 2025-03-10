/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
        Abril: ["Abril Fatface", "serif"],
        Ubuntu: ["Ubuntu", "sans-serif"],
        Galada: ["Galada", "cursive"],
        RockSalt: ["Rock Salt", "cursive"],
        DmSerif: ["DM Serif Display", "serif"],
      },
      colors: {
        text: "#eaf6f3",
        background: "#2E073F",
        background2: "#5a316a",
        primary: "#FFFFF0",
        secondary: "#763663",
        accent: "#b76961",
        lightText: "#0b0e19",
        lightBackground: "#F4F6FF",
        lightBackground2: "#F4F6FF",
        lightPrimary: "#5c69b9",
        lightSecondary: "#bba1d6",
        lightAccent: "#b87ec7",
      },
    },
  },
  plugins: [],
};
