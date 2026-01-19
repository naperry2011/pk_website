// Akuapem Paramount King Council - Color Palette

export const Colors = {
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
  white: "#FFFFFF",
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
