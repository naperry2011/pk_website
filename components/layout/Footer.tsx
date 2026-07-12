import { View, Text, Pressable, Linking, Platform } from "react-native";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { tokens } from "@/constants/tokens";

const quickLinks = [
  { href: "/about", label: "About" },
  { href: "/towns", label: "Towns" },
  { href: "/community", label: "Community" },
  { href: "/contact", label: "Contact" },
  { href: "/subscribe", label: "Subscribe" },
  { href: "/admin", label: "Admin Portal" },
];

const socialLinks = [
  { icon: "facebook", url: "https://facebook.com" },
  { icon: "instagram", url: "https://instagram.com" },
];

const isWeb = Platform.OS === "web";
const webCursor = isWeb
  ? ({ cursor: "pointer", transition: "opacity 0.25s ease" } as any)
  : undefined;

export function Footer({ onBackToTop }: { onBackToTop?: () => void }) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    if (onBackToTop) {
      onBackToTop();
    } else if (isWeb) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <View
      className="bg-ink border-t border-white/10 pt-20 pb-8"
      accessibilityRole={"contentinfo" as any}
      accessibilityLabel="Site footer"
    >
      <View className="px-[6%] max-w-[1280px] mx-auto w-full">
        {/* Oversized sign-off */}
        <Text className="font-display text-4xl md:text-7xl text-ivory mb-3 tracking-tight">
          The Kingdom of Akuapem
        </Text>
        <Text className="font-body-medium text-label uppercase tracking-[3px] text-champagne mb-16">
          Seventeen towns, one heritage — since time immemorial
        </Text>

        {/* Columns */}
        <View className="flex-row flex-wrap gap-12 border-t border-white/10 pt-12 mb-16">
          {/* Navigate */}
          <View className="min-w-[150px]" accessibilityRole={"navigation" as any}>
            <Text className="font-body-medium text-label uppercase tracking-[3px] text-ivory/40 mb-5">
              Navigate
            </Text>
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href as any} asChild>
                <Pressable className="py-1.5" style={webCursor} accessibilityRole="link">
                  {({ hovered }: any) => (
                    <Text
                      className={`font-body text-sm ${
                        hovered ? "text-champagne" : "text-ivory/70"
                      }`}
                      style={
                        isWeb
                          ? ({ transition: "color 0.25s ease" } as any)
                          : undefined
                      }
                    >
                      {link.label}
                    </Text>
                  )}
                </Pressable>
              </Link>
            ))}
          </View>

          {/* Visit */}
          <View className="min-w-[200px]">
            <Text className="font-body-medium text-label uppercase tracking-[3px] text-ivory/40 mb-5">
              Visit
            </Text>
            <Text className="font-body text-sm text-ivory/70 leading-6">
              Ahenfie (Palace){"\n"}Akropong-Akuapem{"\n"}Eastern Region, Ghana
            </Text>
          </View>

          {/* Contact */}
          <View className="min-w-[200px]">
            <Text className="font-body-medium text-label uppercase tracking-[3px] text-ivory/40 mb-5">
              Contact
            </Text>
            <Text className="font-body text-sm text-ivory/70 leading-6">
              +233 302 401 234{"\n"}info@akuapemcouncil.org
            </Text>
            <View className="flex-row gap-3 mt-5">
              {socialLinks.map((social) => (
                <Pressable
                  key={social.icon}
                  onPress={() => Linking.openURL(social.url)}
                  className="w-11 h-11 items-center justify-center border border-white/15 active:bg-white/10"
                  style={webCursor}
                  accessibilityRole="link"
                  accessibilityLabel={`Visit our ${social.icon} page`}
                >
                  <FontAwesome
                    name={social.icon as any}
                    size={16}
                    color={tokens.colors.champagne}
                  />
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        {/* Bottom bar */}
        <View className="border-t border-white/10 pt-5 flex-row flex-wrap items-center justify-between gap-4">
          <Text className="font-body text-xs text-ivory/40">
            © {currentYear} Akuapem Traditional Council. All rights reserved.
          </Text>
          <Pressable
            onPress={scrollToTop}
            className="flex-row items-center gap-2"
            style={webCursor}
            accessibilityRole="button"
            accessibilityLabel="Back to top"
          >
            <Text className="font-body-medium text-label uppercase tracking-[3px] text-champagne">
              Top
            </Text>
            <FontAwesome name="arrow-up" size={10} color={tokens.colors.champagne} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
