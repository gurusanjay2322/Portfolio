/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", "sans-serif"],
        serif: ["Cinzel", "serif"], // For headers/lore
        rune: ["Cinzel Decorative", "cursive"], // For special accents
      },
      colors: {
        void: "#0a0a0c", // Deepest background
        voidLight: "#15151a", // Lighter background
        paper: "#f5f5f5", // Light mode background (Bone/White Palace)
        ink: "#1a1a1a", // Light mode text
        silk: "#ed213a", // Hornet Red
        silkDark: "#93291e",
        gold: "#f8b500", // Brass/Gold accents
        goldDim: "#b38800",
        mist: "#bdc3c7", // Silver/Mist
        mistDark: "#2c3e50",
        text: "#ecf0f1",
        textDim: "#95a5a6",
      },
      backgroundImage: {
        'noise': "url('https://grainy-gradients.vercel.app/noise.svg')", // Subtle texture if needed
      },
      cursor: {
        'none': 'none',
      }
    },
  },
  plugins: [],
};
