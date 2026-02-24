import { View, Text, Pressable, Linking } from "react-native";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { Accent, Body } from "../ui/Typography";

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/towns", label: "Our Towns" },
  { href: "/community", label: "Community Updates" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { icon: "facebook", url: "https://facebook.com" },
  { icon: "twitter", url: "https://twitter.com" },
  { icon: "instagram", url: "https://instagram.com" },
  { icon: "youtube", url: "https://youtube.com" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <View className="bg-green-deep pt-10 pb-6" accessibilityRole={"contentinfo" as any} accessibilityLabel="Site footer">
      <View className="px-4 max-w-7xl mx-auto w-full">
        {/* Top Section */}
        <View className="flex-row flex-wrap gap-8 mb-8">
          {/* Logo & About */}
          <View className="flex-1 min-w-[250px]">
            <View className="flex-row items-center mb-4">
              <View className="w-12 h-12 bg-gold rounded-full items-center justify-center mr-3">
                <Text className="text-white font-bold text-xl">AK</Text>
              </View>
              <Accent className="text-white">Akuapem Traditional Council</Accent>
            </View>
            <Body className="text-white/80">
              Serving the people of Akuapem since time immemorial. Bridging
              tradition and progress for our communities.
            </Body>
          </View>

          {/* Quick Links */}
          <View className="min-w-[150px]" accessibilityRole={"navigation" as any} accessibilityLabel="Footer navigation">
            <Text className="font-heading-bold text-lg text-gold mb-4" accessibilityRole="header">
              Quick Links
            </Text>
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href as any} asChild>
                <Pressable
                  className="py-2 min-h-[44px] justify-center"
                  accessibilityRole="link"
                  accessibilityLabel={link.label}
                >
                  <Text className="font-body text-white/80 hover:text-white">{link.label}</Text>
                </Pressable>
              </Link>
            ))}
          </View>

          {/* Contact Info */}
          <View className="min-w-[200px]">
            <Text className="font-heading-bold text-lg text-gold mb-4" accessibilityRole="header">
              Contact Us
            </Text>
            <View className="gap-2">
              <View className="flex-row items-center gap-2" accessibilityLabel="Address: Akropong-Akuapem, Ghana">
                <FontAwesome name="map-marker" size={16} color="#D4AF37" />
                <Text className="font-body text-white/80">
                  Akropong-Akuapem, Ghana
                </Text>
              </View>
              <View className="flex-row items-center gap-2" accessibilityLabel="Phone: +233 302 401 234">
                <FontAwesome name="phone" size={16} color="#D4AF37" />
                <Text className="font-body text-white/80">+233 302 401 234</Text>
              </View>
              <View className="flex-row items-center gap-2" accessibilityLabel="Email: info@akuapemcouncil.org">
                <FontAwesome name="envelope" size={16} color="#D4AF37" />
                <Text className="font-body text-white/80">
                  info@akuapemcouncil.org
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Social Links */}
        <View className="flex-row justify-center gap-4 mb-6">
          {socialLinks.map((social) => (
            <Pressable
              key={social.icon}
              onPress={() => Linking.openURL(social.url)}
              className="w-11 h-11 bg-gold/20 hover:bg-gold/40 active:bg-gold/60 rounded-full items-center justify-center"
              accessibilityRole="link"
              accessibilityLabel={`Visit our ${social.icon} page`}
            >
              <FontAwesome
                name={social.icon as any}
                size={20}
                color="#D4AF37"
              />
            </Pressable>
          ))}
        </View>

        {/* Bottom Bar */}
        <View className="border-t border-white/20 pt-4">
          <Text className="font-body text-sm text-white/60 text-center">
            © {currentYear} Akuapem Traditional Council. All rights reserved.
          </Text>
          <Link href="/admin" asChild>
            <Pressable className="mt-2 items-center">
              <Text className="font-body text-xs text-white/30">Admin</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}
