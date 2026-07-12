/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./lib/**/*.{js,jsx,ts,tsx}", "./context/**/*.{js,jsx,ts,tsx}", "./hooks/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Canvas (mirrors constants/tokens.ts)
        ink: {
          DEFAULT: "#0B0F0D",
          raised: "#121814",
        },
        ivory: "#F4F1EA",
        champagne: {
          DEFAULT: "#C9A96A",
          dim: "#8A7448",
        },
        // Legacy palette kept for admin/auth surfaces
        gold: {
          DEFAULT: "#d4a843",
          light: "#f0e6c8",
          muted: "#b8922e",
        },
        green: {
          deep: "#1a5632",
          mid: "#22703f",
          dark: "#0e3320",
        },
        cream: "#faf8f3",
        red: {
          kente: "#7A2E2E",
        },
        gray: {
          warm: "#f5f2eb",
          charcoal: "#2d2d2d",
          muted: "#6b6b6b",
        },
        blue: {
          heritage: "#1E4D8B",
        },
        brown: {
          earth: "#8B4513",
        },
      },
      fontFamily: {
        display: ["Fraunces_600SemiBold", "serif"],
        "display-light": ["Fraunces_400Regular", "serif"],
        "display-italic": ["Fraunces_400Regular_Italic", "serif"],
        heading: ["Fraunces_600SemiBold", "serif"],
        "heading-bold": ["Fraunces_600SemiBold", "serif"],
        body: ["Inter_400Regular", "sans-serif"],
        "body-medium": ["Inter_500Medium", "sans-serif"],
        "body-semibold": ["Inter_600SemiBold", "sans-serif"],
        accent: ["Fraunces_400Regular_Italic", "serif"],
      },
      fontSize: {
        display: ["56px", { lineHeight: "1.04", letterSpacing: "-1px" }],
        "display-desktop": ["112px", { lineHeight: "1.0", letterSpacing: "-3px" }],
        title: ["36px", { lineHeight: "1.1", letterSpacing: "-0.5px" }],
        "title-desktop": ["60px", { lineHeight: "1.05", letterSpacing: "-1.5px" }],
        label: ["11px", { lineHeight: "1.4", letterSpacing: "3px" }],
        h1: ["36px", { lineHeight: "1.15" }],
        "h1-desktop": ["56px", { lineHeight: "1.1" }],
        h2: ["28px", { lineHeight: "1.2" }],
        "h2-desktop": ["40px", { lineHeight: "1.15" }],
        h3: ["22px", { lineHeight: "1.3" }],
        "h3-desktop": ["28px", { lineHeight: "1.25" }],
        h4: ["18px", { lineHeight: "1.4" }],
        "h4-desktop": ["22px", { lineHeight: "1.35" }],
        body: ["16px", { lineHeight: "1.7" }],
        "body-lg": ["18px", { lineHeight: "1.8" }],
      },
    },
  },
  plugins: [],
};
