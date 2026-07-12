import { View, Text, Pressable, Image, Platform, ImageSourcePropType } from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useResponsive } from "@/hooks/useResponsive";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { tokens } from "@/constants/tokens";

const isWeb = Platform.OS === "web";

interface ExploreTile {
  href: string;
  label: string;
  title: string;
  image: ImageSourcePropType;
  alt: string;
}

const tiles: ExploreTile[] = [
  {
    href: "/towns",
    label: "17 Principal Towns",
    title: "The Towns of Akuapem",
    image: require("@/assets/images/hero/akuapem-heritage.jpg"),
    alt: "Akuapem chiefs and community gathered together",
  },
  {
    href: "/community",
    label: "Life of the Kingdom",
    title: "Community & Culture",
    image: require("@/assets/images/community/traditional-dance.jpg"),
    alt: "Traditional Akuapem dance performance",
  },
];

function Tile({ tile, index }: { tile: ExploreTile; index: number }) {
  const { isMobile } = useResponsive();
  const height = isMobile ? 320 : 420;

  return (
    <AnimateOnScroll delay={index * 150} style={{ flex: isMobile ? undefined : 1 }}>
      <Link href={tile.href as any} asChild>
        <Pressable
          className="relative overflow-hidden w-full"
          style={
            isWeb ? ({ cursor: "pointer" } as any) : undefined
          }
          accessibilityRole="link"
          accessibilityLabel={tile.title}
        >
          {({ hovered }: any) => (
            <View className="relative overflow-hidden" style={{ height }}>
              <Image
                source={tile.image}
                resizeMode="cover"
                accessibilityLabel={tile.alt}
                style={[
                  { width: "100%", height: "100%" },
                  isWeb
                    ? ({
                        transition: "transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
                        transform: hovered ? "scale(1.03)" : "scale(1)",
                      } as any)
                    : null,
                ]}
              />
              <LinearGradient
                colors={["rgba(11, 15, 13, 0)", "rgba(11, 15, 13, 0.45)", tokens.colors.inkOverlayHeavy]}
                locations={[0.35, 0.7, 1]}
                style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
              />
              <View className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <Text className="font-body-medium text-label uppercase tracking-[3px] text-champagne mb-3">
                  {tile.label}
                </Text>
                <View className="flex-row items-center justify-between gap-4">
                  <Text
                    accessibilityRole="header"
                    className="font-display text-2xl md:text-3xl text-ivory flex-shrink"
                  >
                    {tile.title}
                  </Text>
                  <Text
                    className="text-champagne text-xl"
                    style={
                      isWeb
                        ? ({
                            transition: "transform 0.3s ease",
                            transform: hovered ? "translateX(6px)" : "translateX(0)",
                          } as any)
                        : undefined
                    }
                  >
                    →
                  </Text>
                </View>
              </View>
            </View>
          )}
        </Pressable>
      </Link>
    </AnimateOnScroll>
  );
}

/** Explore section body: two large full-bleed image tiles. */
export function QuickLinks() {
  const { isMobile } = useResponsive();

  return (
    <View className={`w-full ${isMobile ? "flex-col gap-6" : "flex-row gap-8"}`}>
      {tiles.map((tile, index) => (
        <Tile key={tile.href} tile={tile} index={index} />
      ))}
    </View>
  );
}
