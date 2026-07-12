import { View, Text, Pressable, Linking, Platform } from "react-native";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { tokens } from "@/constants/tokens";

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/towns", label: "Our Towns" },
  { href: "/community", label: "Community Updates" },
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
  ? ({ cursor: "pointer", transition: "opacity 0.2s ease" } as any)
  : undefined;

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    if (isWeb) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <View
      className="bg-green-dark border-t-2 border-gold pt-14 pb-6"
      accessibilityRole={"contentinfo" as any}
      accessibilityLabel="Site footer"
    >
      <View className="px-[8%] max-w-7xl mx-auto w-full">
        {/* Top Section */}
        <View className="flex-row flex-wrap gap-10 mb-10">
          {/* Identity */}
          <View className="flex-1 min-w-[250px]">
            <View className="flex-row items-center mb-4">
              <View className="w-11 h-11 border border-gold rounded-full items-center justify-center mr-3">
                <Text className="text-gold font-accent text-base">AK</Text>
              </View>
              <View>
                <Text className="text-gold font-accent text-base tracking-widest">
                  AKUAPEM
                </Text>
                <Text className="text-white/60 font-body text-xs uppercase tracking-[2px]">
                  Traditional Council
                </Text>
              </View>
            </View>
            <Text className="text-white/70 font-body text-sm leading-6">
              Serving the people of Akuapem since time immemorial. Bridging
              tradition and progress for our communities.
            </Text>
          </View>

          {/* Quick Links */}
          <View className="min-w-[150px]" accessibilityRole={"navigation" as any}>
            <Text className="font-heading-bold text-lg text-gold mb-4">
              Quick Links
            </Text>
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href as any} asChild>
                <Pressable className="py-1.5" style={webCursor} accessibilityRole="link">
                  {({ hovered }: any) => (
                    <Text
                      className={`font-body text-sm ${
                        hovered ? "text-gold" : "text-white/70"
                      }`}
                      style={isWeb ? ({ transition: "color 0.2s ease" } as any) : undefined}
                    >
                      {link.label}
                    </Text>
                  )}
                </Pressable>
              </Link>
            ))}
          </View>

          {/* Contact Info */}
          <View className="min-w-[200px]">
            <Text className="font-heading-bold text-lg text-gold mb-4">
              Contact Us
            </Text>
            <View className="flex-row items-center gap-2.5 mb-2.5">
              <FontAwesome name="map-marker" size={16} color={tokens.colors.gold} />
              <Text className="font-body text-sm text-white/70">
                Akropong-Akuapem, Ghana
              </Text>
            </View>
            <View className="flex-row items-center gap-2.5 mb-2.5">
              <FontAwesome name="phone" size={16} color={tokens.colors.gold} />
              <Text className="font-body text-sm text-white/70">
                +233 302 401 234
              </Text>
            </View>
            <View className="flex-row items-center gap-2.5 mb-2.5">
              <FontAwesome name="envelope" size={16} color={tokens.colors.gold} />
              <Text className="font-body text-sm text-white/70">
                info@akuapemcouncil.org
              </Text>
            </View>
          </View>

          {/* Socials */}
          <View className="min-w-[120px]">
            <Text className="font-heading-bold text-lg text-gold mb-4">
              Follow Us
            </Text>
            <View className="flex-row gap-3">
              {socialLinks.map((social) => (
                <Pressable
                  key={social.icon}
                  onPress={() => Linking.openURL(social.url)}
                  className="w-11 h-11 rounded-full items-center justify-center border border-gold/40 bg-gold/10 active:bg-gold/30"
                  style={webCursor}
                  accessibilityRole="link"
                  accessibilityLabel={`Visit our ${social.icon} page`}
                >
                  <FontAwesome
                    name={social.icon as any}
                    size={18}
                    color={tokens.colors.gold}
                  />
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        {/* Back to Top */}
        <Pressable
          onPress={scrollToTop}
          className="flex-row items-center justify-center gap-1.5 mb-5"
          style={webCursor}
          accessibilityRole="button"
          accessibilityLabel="Back to top"
        >
          <FontAwesome name="chevron-up" size={12} color={tokens.colors.gold} />
          <Text className="font-body-medium text-[13px] text-gold uppercase tracking-[2px]">
            Back to Top
          </Text>
        </Pressable>

        {/* Bottom Bar */}
        <View className="border-t border-white/15 pt-4">
          <Text className="font-body text-[13px] text-white/50 text-center">
            © {currentYear} Akuapem Traditional Council. All rights reserved.
          </Text>
        </View>
      </View>
    </View>
  );
}
