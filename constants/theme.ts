// Brand tokens from redesign spec
// Derived from constants/tokens.ts (single source of truth).

import { tokens } from "./tokens";

export const theme = {
  colors: {
    primaryGreen: tokens.colors.greenDeep,
    midGreen: tokens.colors.greenMid,
    darkGreen: tokens.colors.greenDark,
    goldAccent: tokens.colors.gold,
    lightGold: tokens.colors.goldLight,
    darkGold: tokens.colors.goldMuted,
    offWhiteBg: tokens.colors.grayWarm,
    cream: tokens.colors.cream,
    white: tokens.colors.white,
    darkText: tokens.colors.grayCharcoal,
    mutedText: tokens.colors.grayMuted,
    greenOverlay: tokens.colors.greenOverlay,
    greenDarkOverlay: tokens.colors.greenDarkOverlay,
    goldOverlay: tokens.colors.goldOverlay,
  },
  spacing: {
    sectionVerticalDesktop: 100,
    sectionVerticalMobile: 60,
    maxContentWidth: 1200,
    cardGridGap: 24,
    cardBorderRadius: 12,
  },
  typography: {
    sectionLabel: {
      fontSize: 13,
      textTransform: "uppercase" as const,
      letterSpacing: 3,
      fontWeight: "700" as const,
    },
  },
};
