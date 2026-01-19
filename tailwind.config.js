/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        gold: {
          DEFAULT: "#D4AF37",
          light: "#FFF8DC",
        },
        green: {
          deep: "#1B4D3E",
        },
        red: {
          kente: "#8B0000",
        },
        // Secondary Colors
        gray: {
          warm: "#F5F5F0",
          charcoal: "#2C3E50",
        },
        // Accent Colors
        blue: {
          heritage: "#1E4D8B",
        },
        brown: {
          earth: "#8B4513",
        },
      },
      fontFamily: {
        heading: ["PlayfairDisplay_400Regular", "serif"],
        "heading-bold": ["PlayfairDisplay_700Bold", "serif"],
        body: ["Inter_400Regular", "sans-serif"],
        "body-medium": ["Inter_500Medium", "sans-serif"],
        "body-semibold": ["Inter_600SemiBold", "sans-serif"],
        accent: ["Cinzel_400Regular", "serif"],
      },
      fontSize: {
        // Mobile-first sizes
        h1: ["36px", { lineHeight: "1.2" }],
        h2: ["28px", { lineHeight: "1.3" }],
        h3: ["24px", { lineHeight: "1.4" }],
        h4: ["20px", { lineHeight: "1.4" }],
        body: ["16px", { lineHeight: "1.6" }],
        "body-lg": ["18px", { lineHeight: "1.7" }],
      },
    },
  },
  plugins: [],
};
