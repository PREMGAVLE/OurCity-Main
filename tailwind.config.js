/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      
      keyframes: {
        shine: {
          "0%": { backgroundPosition: "200% 0" },
          "25%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        gradientFlow: {
          "0%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "100%": { "background-position": "0% 50%" },
        },
      },
      colors: {
        ternary: "#E7A100",
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        digital: ['"Share Tech Mono"', 'monospace'],
        inter: ['"Plus Jakarta Sans"', "sans-serif"],
      },

      animation: {
        shine: "shine 3s ease-out infinite",
        "gradient-flow":
          "gradientFlow 10s ease 0s infinite normal none running",
      },
      keyframes: {
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-out-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "slide-in-left": "slide-in-left 0.3s ease-out forwards",
        "slide-out-left": "slide-out-left 0.3s ease-in forwards",
      },
    },
  },
  plugins: [],
};


