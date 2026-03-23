// Brand tokens from redesign spec

export const theme = {
  colors: {
    primaryGreen: "#1a5632",
    midGreen: "#22703f",
    goldAccent: "#d4a843",
    lightGold: "#f0e6c8",
    darkGold: "#b8922e",
    offWhiteBg: "#f5f2eb",
    white: "#ffffff",
    darkText: "#2d2d2d",
    mutedText: "#6b6b6b",
    greenOverlay: "rgba(26, 86, 50, 0.6)",
    goldOverlay: "rgba(212, 168, 67, 0.75)",
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
