/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./script.js"],
  theme: {
    extend: {
      colors: {
        "soft-pink": "#FFD1DC",
        "deep-pink": "#FF69B4",
      },
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "bounce-subtle": "bounceSubtle 2s infinite ease-in-out",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(-5%)" },
          "50%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}
