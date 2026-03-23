import { View, Text, StyleSheet } from "react-native";

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
}

export function SectionHeading({ label, title, subtitle }: SectionHeadingProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 40,
  },
  label: {
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 3,
    color: "#d4a843",
    fontWeight: "700",
    fontFamily: "Inter_600SemiBold, sans-serif",
    marginBottom: 12,
  },
  title: {
    fontSize: 36,
    fontFamily: "PlayfairDisplay_700Bold, serif",
    color: "#2d2d2d",
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 47,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b6b6b",
    textAlign: "center",
    fontFamily: "Inter_400Regular, sans-serif",
    maxWidth: 500,
    lineHeight: 24,
  },
});
