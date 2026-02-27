/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        senegal: {
          green: "#00ffc5",
          yellow: "#eaf27c",
          red: "#ad2831",
        },
        galsendev: {
          blue: "#5271ff",
          "blue-light": "#869cff",
          "blue-dark": "#293980",
        },
      },
      animation: {
        blob: 'blob 3s infinite',
        'fade-in-up': 'fadeInUp 0.7s ease both',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.8)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
