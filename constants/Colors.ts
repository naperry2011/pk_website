// Akuapem Paramount King Council - Color Palette
// Derived from constants/tokens.ts (single source of truth).

import { tokens } from "./tokens";

export const Colors = {
  // Primary Colors
  gold: {
    DEFAULT: tokens.colors.gold,
    light: tokens.colors.goldLight,
    muted: tokens.colors.goldMuted,
  },
  green: {
    deep: tokens.colors.greenDeep,
    mid: tokens.colors.greenMid,
    dark: tokens.colors.greenDark,
  },
  red: {
    kente: tokens.colors.redKente,
  },

  // Secondary Colors
  white: tokens.colors.white,
  cream: tokens.colors.cream,
  gray: {
    warm: tokens.colors.grayWarm,
    charcoal: tokens.colors.grayCharcoal,
    muted: tokens.colors.grayMuted,
  },

  // Accent Colors
  blue: {
    heritage: tokens.colors.blueHeritage,
  },
  brown: {
    earth: tokens.colors.brownEarth,
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
