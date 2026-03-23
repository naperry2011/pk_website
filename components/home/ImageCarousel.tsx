import { View, Pressable, Image, StyleSheet, Platform } from "react-native";
import { useState, useEffect, useRef, useCallback } from "react";
import { Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useResponsive } from "@/hooks/useResponsive";
import { LinearGradient } from "expo-linear-gradient";

const slides = [
  {
    image: require("@/assets/images/community/traditional-drumming.jpg"),
    caption: "Celebrating Our Heritage — Traditional Drumming",
  },
  {
    image: require("@/assets/images/community/traditional-dance.jpg"),
    caption: "Traditional Dance — Keeping Culture Alive",
  },
  {
    image: require("@/assets/images/community/cultural-dancer.jpg"),
    caption: "Our Cultural Identity — The Heart of Akuapem",
  },
  {
    image: require("@/assets/images/hero/sunset-scene.jpg"),
    caption: "The Akuapem Spirit — Rooted in Tradition",
  },
  {
    image: require("@/assets/images/hero/akuapem-ridge.jpg"),
    caption: "The Akuapem Ridge — Lush and Beautiful",
  },
];

export function ImageCarousel() {
  const { isMobile, isDesktop } = useResponsive();
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const height = isMobile ? 300 : 500;

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const goTo = (index: number) => {
    setActiveIndex(index);
    startTimer();
  };

  const goNext = () => goTo((activeIndex + 1) % slides.length);
  const goPrev = () => goTo((activeIndex - 1 + slides.length) % slides.length);

  return (
    <View style={[styles.container, { height }]}>
      {/* Image */}
      <Image
        source={slides[activeIndex].image}
        style={[styles.image, { height }]}
        resizeMode="cover"
        accessibilityLabel={slides[activeIndex].caption}
      />

      {/* Gradient overlay at bottom */}
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.65)"]}
        style={styles.gradient}
      >
        <Text style={styles.caption}>{slides[activeIndex].caption}</Text>
      </LinearGradient>

      {/* Arrow buttons (desktop only) */}
      {isDesktop && (
        <>
          <Pressable
            onPress={goPrev}
            style={({ pressed }) => [
              styles.arrowButton,
              styles.arrowLeft,
              pressed && styles.arrowPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Previous slide"
          >
            <FontAwesome name="chevron-left" size={18} color="#ffffff" />
          </Pressable>
          <Pressable
            onPress={goNext}
            style={({ pressed }) => [
              styles.arrowButton,
              styles.arrowRight,
              pressed && styles.arrowPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Next slide"
          >
            <FontAwesome name="chevron-right" size={18} color="#ffffff" />
          </Pressable>
        </>
      )}

      {/* Dot indicators */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <Pressable
            key={index}
            onPress={() => goTo(index)}
            accessibilityRole="button"
            accessibilityLabel={`Go to slide ${index + 1}`}
            style={styles.dotTouchArea}
          >
            <View
              style={[
                styles.dot,
                index === activeIndex ? styles.dotActive : styles.dotInactive,
              ]}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#2d2d2d",
  },
  image: {
    width: "100%",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 48,
    paddingTop: 80,
  },
  caption: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold, sans-serif",
    textAlign: "center",
    lineHeight: 24,
  },
  arrowButton: {
    position: "absolute",
    top: "50%",
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateY: -22 }],
    ...(Platform.OS === "web"
      ? { cursor: "pointer", transition: "background-color 0.2s ease" }
      : {}),
  } as any,
  arrowLeft: {
    left: 16,
  },
  arrowRight: {
    right: 16,
  },
  arrowPressed: {
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  dotsContainer: {
    position: "absolute",
    bottom: 14,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  dotTouchArea: {
    padding: 4,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 24,
    backgroundColor: "#d4a843",
  },
  dotInactive: {
    width: 8,
    backgroundColor: "rgba(255,255,255,0.6)",
  },
});
