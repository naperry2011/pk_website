// Single source of truth for brand design tokens.
// tailwind.config.js mirrors these values for NativeWind classes;
// Colors.ts and theme.ts derive from here for JS-level usage
// (navigation theme, tab bar tints, StyleSheet fallbacks).

export const tokens = {
  colors: {
    gold: "#d4a843",
    goldLight: "#f0e6c8",
    goldMuted: "#b8922e",
    greenDeep: "#1a5632",
    greenMid: "#22703f",
    greenDark: "#0e3320",
    redKente: "#8B0000",
    cream: "#faf8f3",
    grayWarm: "#f5f2eb",
    grayCharcoal: "#2d2d2d",
    grayMuted: "#6b6b6b",
    blueHeritage: "#1E4D8B",
    brownEarth: "#8B4513",
    white: "#ffffff",
    greenOverlay: "rgba(26, 86, 50, 0.6)",
    greenDarkOverlay: "rgba(14, 51, 32, 0.65)",
    goldOverlay: "rgba(212, 168, 67, 0.75)",
  },
} as const;
