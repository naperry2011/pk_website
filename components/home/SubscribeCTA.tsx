import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { Link } from "expo-router";
import { useResponsive } from "@/hooks/useResponsive";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export function SubscribeCTA() {
  const { isMobile } = useResponsive();

  return (
    <View style={styles.container}>
      {/* Background placeholder image */}
      <View style={StyleSheet.absoluteFill}>
        <PlaceholderImage
          height={500}
          label="Community gathering"
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        />
      </View>

      {/* Gold overlay */}
      <View style={[StyleSheet.absoluteFill, styles.overlay]} />

      <AnimateOnScroll>
        <View style={[styles.content, { paddingVertical: isMobile ? 60 : 100 }]}>
          {/* Top divider */}
          <View style={styles.divider} />

          <Text style={[styles.heading, { fontSize: isMobile ? 28 : 36, lineHeight: isMobile ? 36 : 47 }]}>
            Stay Connected with Your Community
          </Text>

          <Text style={styles.description}>
            Festival dates, council decisions, obituaries, wedding announcements
            — delivered to your inbox.
          </Text>

          <Link href="/subscribe" asChild>
            <Pressable
              style={({ hovered }: any) => [
                styles.button,
                hovered && styles.buttonHover,
              ]}
            >
              <Text style={styles.buttonText}>Subscribe Now</Text>
            </Pressable>
          </Link>

          {/* Bottom divider */}
          <View style={styles.divider} />
        </View>
      </AnimateOnScroll>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "hidden",
  },
  overlay: {
    backgroundColor: "rgba(212, 168, 67, 0.80)",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: "8%",
    zIndex: 1,
    maxWidth: 800,
    width: "100%",
    marginHorizontal: "auto",
  },
  divider: {
    width: 60,
    height: 2,
    backgroundColor: "#1a5632",
    marginVertical: 24,
  },
  heading: {
    color: "#ffffff",
    fontFamily: "PlayfairDisplay_700Bold, serif",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    color: "rgba(255, 255, 255, 0.95)",
    fontSize: 16,
    fontFamily: "Inter_400Regular, sans-serif",
    textAlign: "center",
    maxWidth: 550,
    lineHeight: 24,
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#1a5632",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 8,
    ...(Platform.OS === "web"
      ? { transition: "background-color 0.3s ease", cursor: "pointer" }
      : {}),
  } as any,
  buttonHover: {
    backgroundColor: "#143f26",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold, sans-serif",
  },
});
