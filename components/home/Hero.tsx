import { View, Text, ImageBackground, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useResponsive } from "@/hooks/useResponsive";
import { Button, Display, Eyebrow } from "@/components/ui";
import { theme } from "@/constants/theme";
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
  const router = useRouter();
  const { height } = useWindowDimensions();

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

  const minHeight = Math.max(isMobile ? height * 0.7 : height * 0.85, isMobile ? 520 : 640);

  return (
    <View className="relative bg-green-dark" style={{ minHeight }}>
      <ImageBackground
        source={require("@/assets/images/hero/akuapem-ridge.jpg")}
        resizeMode="cover"
        className="flex-1"
        style={{ minHeight }}
        accessibilityLabel="The Akuapem ridge landscape"
      >
        {/* Green-dark scrim gradient */}
        <LinearGradient
          colors={[
            theme.colors.greenDarkOverlay,
            "rgba(14, 51, 32, 0.55)",
            theme.colors.darkGreen,
          ]}
          locations={[0, 0.55, 1]}
          className="absolute inset-0"
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        />

        {/* Content */}
        <View
          className="flex-1 items-center justify-center px-[8%] pb-20 pt-24 md:pt-32 z-10 w-full max-w-4xl mx-auto"
        >
          <Eyebrow className="mb-5 text-center">
            The Akuapem Traditional Area
          </Eyebrow>

          {/* Gold hairline */}
          <View className="w-16 h-[2px] bg-gold mb-7" />

          <Display className="text-white text-center mb-6">
            Akuapem Traditional Council
          </Display>

          <Text className="font-body text-base md:text-lg text-white/90 text-center max-w-xl leading-7 mb-10">
            Preserving our heritage, serving our communities, and building a
            prosperous future for the people of Akuapem.
          </Text>

          <View
            className={`items-center gap-4 ${isMobile ? "w-full px-4" : "flex-row"}`}
          >
            <Button
              title="Learn About Us"
              variant="primary"
              fullWidth={isMobile}
              onPress={() => router.push("/about")}
            />
            <Button
              title="Subscribe for Updates"
              variant="ghost-light"
              fullWidth={isMobile}
              onPress={() => router.push("/subscribe")}
            />
          </View>
        </View>

        {/* Scroll chevron */}
        <Animated.View
          className="absolute bottom-8 self-center z-10"
          style={chevronStyle}
        >
          <FontAwesome
            name="chevron-down"
            size={20}
            color="rgba(212, 168, 67, 0.7)"
          />
        </Animated.View>
      </ImageBackground>
    </View>
  );
}
