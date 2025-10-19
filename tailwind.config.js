/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        senegal: {
          green: "#00ffc5",
          yellow: "#eaf27c",
          red: "#ad2831",
        },
      },
    },
  },
  plugins: [],
};
