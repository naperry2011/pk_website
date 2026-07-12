import { View, Text, ImageBackground, useWindowDimensions, Platform } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useResponsive } from "@/hooks/useResponsive";
import { Button, Label } from "@/components/ui";
import { tokens } from "@/constants/tokens";
import { useEffect, useState } from "react";

const isWeb = Platform.OS === "web";

export function Hero() {
  const { isMobile } = useResponsive();
  const router = useRouter();
  const { height } = useWindowDimensions();

  // Slow Ken-Burns zoom on web: mount at scale 1.08, ease down to 1 over 14s.
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    if (!isWeb) return;
    const id = requestAnimationFrame(() => setSettled(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const minHeight = Math.max(height, isMobile ? 620 : 720);

  return (
    <View className="relative bg-ink overflow-hidden" style={{ minHeight }}>
      {/* Full-bleed imagery with Ken-Burns drift (web only) */}
      <View
        className="absolute inset-0"
        style={[
          { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
          isWeb
            ? ({
                transform: settled ? "scale(1)" : "scale(1.08)",
                transition: "transform 14s cubic-bezier(0.16, 1, 0.3, 1)",
                transformOrigin: "50% 30%",
              } as any)
            : null,
        ]}
      >
        <ImageBackground
          source={require("@/assets/images/hero/akuapem-ridge.jpg")}
          resizeMode="cover"
          style={{ flex: 1 }}
          accessibilityLabel="The Akuapem ridge landscape at dusk"
        />
      </View>

      {/* Heavy ink gradient — page blends seamlessly into the ink canvas below */}
      <LinearGradient
        colors={[
          tokens.colors.inkOverlay,
          "rgba(11, 15, 13, 0.35)",
          "rgba(11, 15, 13, 0.78)",
          tokens.colors.ink,
        ]}
        locations={[0, 0.4, 0.78, 1]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />

      {/* Content — extra top padding since the header floats over the hero */}
      <View
        className="flex-1 justify-end px-[6%] z-10 w-full"
        style={{ paddingTop: 120, paddingBottom: isMobile ? 96 : 128, minHeight }}
      >
        <View className="max-w-[1280px] mx-auto w-full">
          <Label className="mb-8 text-champagne">
            Est. time immemorial — Eastern Region, Ghana
          </Label>

          <Text
            accessibilityRole="header"
            className="font-display text-display md:text-display-desktop text-ivory"
          >
            Custodians of
          </Text>
          <Text className="font-display-italic text-display md:text-display-desktop text-ivory mb-10">
            Akuapem Heritage
          </Text>

          <View className="self-start">
            <Button
              title="Discover the Council"
              variant="link-arrow"
              onPress={() => router.push("/about")}
              accessibilityHint="Navigates to the About page"
            />
          </View>
        </View>
      </View>

      {/* Minimal scroll cue: thin vertical hairline + label */}
      <View className="absolute bottom-0 right-[6%] items-center z-10" style={{ gap: 12 }}>
        <Text className="font-body-medium text-label uppercase tracking-[3px] text-ivory/40">
          Scroll
        </Text>
        <View className="w-[1px] h-16 bg-white/20" />
      </View>
    </View>
  );
}
