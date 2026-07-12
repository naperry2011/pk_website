// Brand tokens — "modern luxury" system.
// Derived from constants/tokens.ts (single source of truth).

import { tokens } from "./tokens";

export const theme = {
  colors: {
    ink: tokens.colors.ink,
    inkRaised: tokens.colors.inkRaised,
    ivory: tokens.colors.ivory,
    champagne: tokens.colors.champagne,
    champagneDim: tokens.colors.champagneDim,
    inkOverlay: tokens.colors.inkOverlay,
    inkOverlayHeavy: tokens.colors.inkOverlayHeavy,
    redKente: tokens.colors.redKente,
    // Legacy aliases still referenced by admin-adjacent components
    primaryGreen: tokens.colors.greenDeep,
    midGreen: tokens.colors.greenMid,
    darkGreen: tokens.colors.greenDark,
    goldAccent: tokens.colors.champagne,
    lightGold: "#f0e6c8",
    darkGold: tokens.colors.champagneDim,
    offWhiteBg: tokens.colors.grayWarm,
    cream: tokens.colors.ivory,
    white: tokens.colors.white,
    darkText: tokens.colors.grayCharcoal,
    mutedText: tokens.colors.grayMuted,
    greenOverlay: tokens.colors.inkOverlay,
    greenDarkOverlay: tokens.colors.inkOverlayHeavy,
    goldOverlay: "rgba(201, 169, 106, 0.75)",
  },
  spacing: {
    sectionVerticalDesktop: 140,
    sectionVerticalMobile: 80,
    maxContentWidth: 1280,
    cardGridGap: 24,
    cardBorderRadius: 4,
  },
  typography: {
    sectionLabel: {
      fontSize: 11,
      textTransform: "uppercase" as const,
      letterSpacing: 3,
      fontWeight: "500" as const,
    },
  },
};
