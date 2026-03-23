// Akuapem Paramount King Council - Color Palette

export const Colors = {
  // Primary Colors
  gold: {
    DEFAULT: "#d4a843",
    light: "#f0e6c8",
  },
  green: {
    deep: "#1a5632",
  },
  red: {
    kente: "#8B0000",
  },

  // Secondary Colors
  white: "#FFFFFF",
  gray: {
    warm: "#f5f2eb",
    charcoal: "#2d2d2d",
    muted: "#6b6b6b",
  },

  // Accent Colors
  blue: {
    heritage: "#1E4D8B",
  },
  brown: {
    earth: "#8B4513",
  },
};

// Tab navigation colors
export default {
  light: {
    text: Colors.gray.charcoal,
    background: Colors.white,
    tint: Colors.gold.DEFAULT,
    tabIconDefault: Colors.gray.charcoal,
    tabIconSelected: Colors.gold.DEFAULT,
  },
  dark: {
    text: Colors.white,
    background: Colors.gray.charcoal,
    tint: Colors.gold.DEFAULT,
    tabIconDefault: Colors.gray.warm,
    tabIconSelected: Colors.gold.DEFAULT,
  },
};
