// Single source of truth for brand design tokens — "modern luxury" system.
// tailwind.config.js mirrors these values for NativeWind classes;
// Colors.ts and theme.ts derive from here for JS-level usage
// (navigation theme, tab bar tints, gradient/overlay colors).

export const tokens = {
  colors: {
    // Canvas
    ink: "#0B0F0D",
    inkRaised: "#121814",
    ivory: "#F4F1EA",
    // Accent
    champagne: "#C9A96A",
    champagneDim: "#8A7448",
    // Legacy greens kept for admin/auth surfaces (unchanged scope)
    greenDeep: "#1a5632",
    greenMid: "#22703f",
    greenDark: "#0e3320",
    // Context
    redKente: "#7A2E2E",
    blueHeritage: "#1E4D8B",
    // Neutrals
    white: "#ffffff",
    grayWarm: "#f5f2eb",
    grayCharcoal: "#2d2d2d",
    grayMuted: "#6b6b6b",
    // Overlays
    inkOverlay: "rgba(11, 15, 13, 0.55)",
    inkOverlayHeavy: "rgba(11, 15, 13, 0.85)",
  },
} as const;
