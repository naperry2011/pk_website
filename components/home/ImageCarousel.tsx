import { View, Pressable, Image, useWindowDimensions } from "react-native";
import { useState, useEffect, useRef, useCallback } from "react";
import { Body } from "../ui/Typography";
import { FontAwesome } from "@expo/vector-icons";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1580746738099-78d6833b3827?w=1200&h=600&fit=crop",
    caption: "The Akuapem Ridge - Heart of our Traditional Area",
  },
  {
    image: "https://images.unsplash.com/photo-1590845947376-2638caa89309?w=1200&h=600&fit=crop",
    caption: "Traditional Festivals - Celebrating our Heritage",
  },
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=600&fit=crop",
    caption: "Our Communities - United in Progress",
  },
  {
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=600&fit=crop",
    caption: "Development & Growth - Building for the Future",
  },
];

export function ImageCarousel() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  const height = isMobile ? 250 : 420;

  return (
    <View className="relative" style={{ height }}>
      {/* Image */}
      <Image
        source={{ uri: slides[activeIndex].image }}
        style={{ width: "100%", height }}
        resizeMode="cover"
        accessibilityLabel={slides[activeIndex].caption}
      />

      {/* Gradient overlay at bottom */}
      <View
        className="absolute bottom-0 left-0 right-0 px-4 pb-12 pt-16"
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      >
        <Body className="text-white text-center font-body-semibold text-base">
          {slides[activeIndex].caption}
        </Body>
      </View>

      {/* Arrow buttons (desktop only) */}
      {!isMobile && (
        <>
          <Pressable
            onPress={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 rounded-full items-center justify-center"
            accessibilityRole="button"
            accessibilityLabel="Previous slide"
          >
            <FontAwesome name="chevron-left" size={16} color="white" />
          </Pressable>
          <Pressable
            onPress={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 rounded-full items-center justify-center"
            accessibilityRole="button"
            accessibilityLabel="Next slide"
          >
            <FontAwesome name="chevron-right" size={16} color="white" />
          </Pressable>
        </>
      )}

      {/* Dots */}
      <View className="absolute bottom-3 left-0 right-0 flex-row justify-center gap-2">
        {slides.map((_, index) => (
          <Pressable
            key={index}
            onPress={() => goTo(index)}
            accessibilityRole="button"
            accessibilityLabel={`Go to slide ${index + 1}`}
          >
            <View
              className={`h-2 rounded-full ${
                index === activeIndex ? "bg-gold w-6" : "bg-white/60 w-2"
              }`}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}
