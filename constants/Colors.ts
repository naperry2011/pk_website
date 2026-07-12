// Akuapem Paramount King Council - Color Palette
// Derived from constants/tokens.ts (single source of truth).

import { tokens } from "./tokens";

export const Colors = {
  // Canvas
  ink: {
    DEFAULT: tokens.colors.ink,
    raised: tokens.colors.inkRaised,
  },
  ivory: tokens.colors.ivory,
  champagne: {
    DEFAULT: tokens.colors.champagne,
    dim: tokens.colors.champagneDim,
  },

  // Legacy palette (admin/auth surfaces)
  gold: {
    DEFAULT: "#d4a843",
    light: "#f0e6c8",
    muted: "#b8922e",
  },
  green: {
    deep: tokens.colors.greenDeep,
    mid: tokens.colors.greenMid,
    dark: tokens.colors.greenDark,
  },
  red: {
    kente: tokens.colors.redKente,
  },

  white: tokens.colors.white,
  gray: {
    warm: tokens.colors.grayWarm,
    charcoal: tokens.colors.grayCharcoal,
    muted: tokens.colors.grayMuted,
  },
  blue: {
    heritage: tokens.colors.blueHeritage,
  },
};

// Tab navigation colors — public tab bar (mobile) is ink with champagne tint
export default {
  light: {
    text: tokens.colors.ivory,
    background: tokens.colors.ink,
    tint: tokens.colors.champagne,
    tabIconDefault: "rgba(244, 241, 234, 0.45)",
    tabIconSelected: tokens.colors.champagne,
  },
  dark: {
    text: tokens.colors.ivory,
    background: tokens.colors.ink,
    tint: tokens.colors.champagne,
    tabIconDefault: "rgba(244, 241, 234, 0.45)",
    tabIconSelected: tokens.colors.champagne,
  },
};
