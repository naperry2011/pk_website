import { View, Text, Pressable, Platform } from "react-native";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useResponsive } from "@/hooks/useResponsive";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { theme } from "@/constants/theme";

const links = [
  {
    href: "/community/obituaries",
    icon: "heart",
    title: "Obituaries",
    description: "View and submit funeral announcements for the community.",
  },
  {
    href: "/community/weddings",
    icon: "bell",
    title: "Weddings",
    description: "Share and celebrate wedding announcements.",
  },
  {
    href: "/towns",
    icon: "map-marker",
    title: "Our Towns",
    description: "Explore the 17 principal towns of Akuapem.",
  },
  {
    href: "/contact",
    icon: "envelope",
    title: "Contact Us",
    description: "Reach out to the Traditional Council directly.",
  },
];

const isWeb = Platform.OS === "web";

export function QuickLinks() {
  const { isMobile } = useResponsive();

  return (
    <View className="bg-gray-warm px-[8%] py-16 md:py-24">
      <View className="max-w-7xl mx-auto w-full">
        <SectionHeading label="QUICK ACCESS" title="How Can We Help?" />

        <View className={`gap-6 ${isMobile ? "flex-col" : "flex-row flex-wrap"}`}>
          {links.map((link, index) => (
            <AnimateOnScroll key={link.href} delay={index * 100}>
              <Link href={link.href as any} asChild>
                <Pressable
                  className={`bg-green-dark rounded-xl overflow-hidden border border-gold/20 ${
                    isMobile ? "w-full" : "flex-1 min-w-[220px] max-w-[282px]"
                  }`}
                  style={({ hovered }: any) => [
                    isWeb
                      ? ({
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                        } as any)
                      : null,
                    isWeb && hovered
                      ? ({
                          transform: [{ translateY: -6 }],
                          boxShadow: "0px 12px 24px rgba(14, 51, 32, 0.35)",
                          borderColor: "rgba(212, 168, 67, 0.5)",
                        } as any)
                      : null,
                  ]}
                  accessibilityRole="link"
                  accessibilityLabel={link.title}
                >
                  {/* Card body */}
                  <View className="p-8 pb-6 items-start">
                    <View className="mb-5">
                      <FontAwesome
                        name={link.icon as any}
                        size={28}
                        color={theme.colors.goldAccent}
                      />
                    </View>
                    <Text className="font-body text-sm text-white/70 leading-6">
                      {link.description}
                    </Text>
                  </View>

                  {/* Overlay-style footer label */}
                  <View className="flex-row items-center justify-between px-8 py-4 bg-black/20 border-t border-gold/20">
                    <Text className="font-heading-bold text-lg text-white">
                      {link.title}
                    </Text>
                    <Text className="font-body-semibold text-lg text-gold">
                      →
                    </Text>
                  </View>
                </Pressable>
              </Link>
            </AnimateOnScroll>
          ))}
        </View>
      </View>
    </View>
  );
}
