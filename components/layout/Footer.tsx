import { View, Text, Pressable, Linking, StyleSheet, Platform, ScrollView } from "react-native";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

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

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    if (Platform.OS === "web") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <View style={styles.container} accessibilityRole={"contentinfo" as any} accessibilityLabel="Site footer">
      <View style={styles.inner}>
        {/* Top Section */}
        <View style={styles.topRow}>
          {/* Logo & About */}
          <View style={styles.aboutColumn}>
            <View style={styles.logoRow}>
              <View style={styles.logoBadge}>
                <Text style={styles.logoText}>AK</Text>
              </View>
              <Text style={styles.siteName}>Akuapem Traditional Council</Text>
            </View>
            <Text style={styles.aboutText}>
              Serving the people of Akuapem since time immemorial. Bridging
              tradition and progress for our communities.
            </Text>
          </View>

          {/* Quick Links */}
          <View style={styles.linksColumn} accessibilityRole={"navigation" as any}>
            <Text style={styles.columnTitle}>Quick Links</Text>
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href as any} asChild>
                <Pressable
                  style={({ hovered }: any) => [
                    styles.linkItem,
                    hovered && styles.linkItemHover,
                  ]}
                  accessibilityRole="link"
                >
                  <Text style={styles.linkText}>{link.label}</Text>
                </Pressable>
              </Link>
            ))}
          </View>

          {/* Contact Info */}
          <View style={styles.contactColumn}>
            <Text style={styles.columnTitle}>Contact Us</Text>
            <View style={styles.contactItem}>
              <FontAwesome name="map-marker" size={16} color="#d4a843" />
              <Text style={styles.contactText}>Akropong-Akuapem, Ghana</Text>
            </View>
            <View style={styles.contactItem}>
              <FontAwesome name="phone" size={16} color="#d4a843" />
              <Text style={styles.contactText}>+233 302 401 234</Text>
            </View>
            <View style={styles.contactItem}>
              <FontAwesome name="envelope" size={16} color="#d4a843" />
              <Text style={styles.contactText}>info@akuapemcouncil.org</Text>
            </View>
          </View>
        </View>

        {/* Social Links */}
        <View style={styles.socialRow}>
          {socialLinks.map((social) => (
            <Pressable
              key={social.icon}
              onPress={() => Linking.openURL(social.url)}
              style={({ hovered }: any) => [
                styles.socialButton,
                hovered && styles.socialButtonHover,
              ]}
              accessibilityRole="link"
              accessibilityLabel={`Visit our ${social.icon} page`}
            >
              <FontAwesome name={social.icon as any} size={20} color="#d4a843" />
            </Pressable>
          ))}
        </View>

        {/* Back to Top */}
        <Pressable
          onPress={scrollToTop}
          style={({ hovered }: any) => [
            styles.backToTop,
            hovered && styles.backToTopHover,
          ]}
        >
          <FontAwesome name="chevron-up" size={12} color="#d4a843" />
          <Text style={styles.backToTopText}>Back to Top</Text>
        </Pressable>

        {/* Bottom Bar */}
        <View style={styles.bottomBar}>
          <Text style={styles.copyright}>
            © {currentYear} Akuapem Traditional Council. All rights reserved.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a5632",
    paddingTop: 48,
    paddingBottom: 24,
  },
  inner: {
    paddingHorizontal: "8%",
    maxWidth: 1200,
    marginHorizontal: "auto",
    width: "100%",
  },
  topRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 32,
    marginBottom: 32,
  },
  aboutColumn: {
    flex: 1,
    minWidth: 250,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  logoBadge: {
    width: 44,
    height: 44,
    backgroundColor: "#d4a843",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  logoText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 18,
  },
  siteName: {
    color: "#ffffff",
    fontFamily: "Cinzel_400Regular, serif",
    fontSize: 16,
  },
  aboutText: {
    color: "rgba(255, 255, 255, 0.75)",
    fontFamily: "Inter_400Regular, sans-serif",
    fontSize: 14,
    lineHeight: 22,
  },
  linksColumn: {
    minWidth: 150,
  },
  columnTitle: {
    fontFamily: "PlayfairDisplay_700Bold, serif",
    fontSize: 18,
    color: "#d4a843",
    marginBottom: 16,
  },
  linkItem: {
    paddingVertical: 6,
    ...(Platform.OS === "web"
      ? { cursor: "pointer", transition: "opacity 0.2s ease" }
      : {}),
  } as any,
  linkItemHover: {
    opacity: 1,
  },
  linkText: {
    fontFamily: "Inter_400Regular, sans-serif",
    color: "rgba(255, 255, 255, 0.75)",
    fontSize: 14,
  },
  contactColumn: {
    minWidth: 200,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  contactText: {
    fontFamily: "Inter_400Regular, sans-serif",
    color: "rgba(255, 255, 255, 0.75)",
    fontSize: 14,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 20,
  },
  socialButton: {
    width: 44,
    height: 44,
    backgroundColor: "rgba(212, 168, 67, 0.15)",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    ...(Platform.OS === "web"
      ? { cursor: "pointer", transition: "background-color 0.3s ease" }
      : {}),
  } as any,
  socialButtonHover: {
    backgroundColor: "rgba(212, 168, 67, 0.35)",
  },
  backToTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginBottom: 20,
    ...(Platform.OS === "web"
      ? { cursor: "pointer", transition: "opacity 0.2s ease" }
      : {}),
  } as any,
  backToTopHover: {
    opacity: 0.8,
  },
  backToTopText: {
    color: "#d4a843",
    fontSize: 13,
    fontFamily: "Inter_500Medium, sans-serif",
  },
  bottomBar: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.15)",
    paddingTop: 16,
  },
  copyright: {
    fontFamily: "Inter_400Regular, sans-serif",
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.5)",
    textAlign: "center",
  },
});
