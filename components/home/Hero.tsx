import { View, Text, StyleSheet, Platform, Pressable } from "react-native";
import { Link } from "expo-router";
import { useResponsive } from "@/hooks/useResponsive";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

export function Hero() {
  const { isMobile } = useResponsive();

  // Animated scroll chevron
  const chevronY = useSharedValue(0);
  useEffect(() => {
    chevronY.value = withRepeat(
      withTiming(10, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [chevronY]);

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: chevronY.value }],
  }));

  return (
    <View style={[styles.heroContainer, { minHeight: isMobile ? 500 : 700 }]}>
      {/* Dark green background */}
      <View style={[StyleSheet.absoluteFill, styles.overlay]} />

      {/* Content */}
      <View style={[styles.content, { paddingTop: isMobile ? 80 : 120 }]}>
        {/* Gold uppercase tagline */}
        <Text style={styles.tagline}>Heritage. Unity. Progress.</Text>

        {/* Gold divider */}
        <View style={styles.divider} />

        {/* Title */}
        <Text style={[styles.title, { fontSize: isMobile ? 36 : 56, lineHeight: isMobile ? 42 : 64 }]}>
          Akuapem Traditional Council
        </Text>

        {/* Subtitle */}
        <Text style={[styles.subtitle, { fontSize: isMobile ? 16 : 18 }]}>
          Preserving our heritage, serving our communities, and building a
          prosperous future for the people of Akuapem.
        </Text>

        {/* Buttons */}
        <View style={[styles.buttonRow, isMobile && styles.buttonRowMobile]}>
          <Link href="/about" asChild>
            <Pressable
              style={({ hovered }: any) => [
                styles.primaryButton,
                hovered && styles.primaryButtonHover,
              ]}
            >
              <Text style={styles.primaryButtonText}>Learn About Us</Text>
            </Pressable>
          </Link>
          <Link href="/subscribe" asChild>
            <Pressable
              style={({ hovered }: any) => [
                styles.outlineButton,
                hovered && styles.outlineButtonHover,
              ]}
            >
              <Text style={styles.outlineButtonText}>Subscribe for Updates</Text>
            </Pressable>
          </Link>
        </View>
      </View>

      {/* Scroll chevron */}
      <Animated.View style={[styles.chevronContainer, chevronStyle]}>
        <FontAwesome name="chevron-down" size={20} color="rgba(212, 168, 67, 0.7)" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(26, 86, 50, 0.7)",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "8%",
    paddingBottom: 80,
    zIndex: 1,
    maxWidth: 900,
  },
  tagline: {
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 3,
    color: "#d4a843",
    fontWeight: "700",
    fontFamily: "Inter_600SemiBold, sans-serif",
    marginBottom: 20,
  },
  divider: {
    width: 60,
    height: 2,
    backgroundColor: "#d4a843",
    marginBottom: 24,
  },
  title: {
    color: "#ffffff",
    fontFamily: "PlayfairDisplay_700Bold, serif",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    fontFamily: "Inter_400Regular, sans-serif",
    maxWidth: 600,
    marginBottom: 40,
    lineHeight: 28,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  buttonRowMobile: {
    flexDirection: "column",
    width: "100%",
    paddingHorizontal: 16,
  },
  primaryButton: {
    backgroundColor: "#d4a843",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    minWidth: 200,
    alignItems: "center",
  },
  primaryButtonHover: {
    backgroundColor: "#b8922e",
  },
  primaryButtonText: {
    color: "#1a5632",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold, sans-serif",
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: "#d4a843",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    minWidth: 200,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  outlineButtonHover: {
    backgroundColor: "rgba(212, 168, 67, 0.15)",
  },
  outlineButtonText: {
    color: "#d4a843",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold, sans-serif",
  },
  chevronContainer: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    zIndex: 1,
  },
});
