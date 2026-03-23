import { View, Text, StyleSheet } from "react-native";

interface PlaceholderImageProps {
  height: number;
  label?: string;
  style?: any;
  borderRadius?: number;
}

export function PlaceholderImage({
  height,
  label = "Photo coming soon",
  style,
  borderRadius = 0,
}: PlaceholderImageProps) {
  return (
    <View
      style={[
        styles.container,
        { height, borderRadius },
        style,
      ]}
    >
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a5632",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    overflow: "hidden",
  },
  text: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 14,
    letterSpacing: 1,
    textTransform: "uppercase",
    fontFamily: "Inter_400Regular, sans-serif",
  },
});
