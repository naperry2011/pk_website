import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useResponsive } from "@/hooks/useResponsive";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";

const links = [
  {
    href: "/community/obituaries",
    icon: "heart",
    title: "Obituaries",
    description: "View and submit funeral announcements for the community.",
    color: "#d4a843",
  },
  {
    href: "/community/weddings",
    icon: "bell",
    title: "Weddings",
    description: "Share and celebrate wedding announcements.",
    color: "#d4a843",
  },
  {
    href: "/towns",
    icon: "map-marker",
    title: "Our Towns",
    description: "Explore the 17 principal towns of Akuapem.",
    color: "#d4a843",
  },
  {
    href: "/contact",
    icon: "envelope",
    title: "Contact Us",
    description: "Reach out to the Traditional Council directly.",
    color: "#d4a843",
  },
];

export function QuickLinks() {
  const { isMobile } = useResponsive();

  return (
    <View style={[styles.container, { paddingVertical: isMobile ? 60 : 100 }]}>
      <View style={styles.inner}>
        <SectionHeading
          label="QUICK ACCESS"
          title="How Can We Help?"
        />

        <View style={[styles.grid, isMobile && styles.gridMobile]}>
          {links.map((link, index) => (
            <AnimateOnScroll key={link.href} delay={index * 100}>
              <Link href={link.href as any} asChild>
                <Pressable
                  style={({ hovered }: any) => [
                    styles.card,
                    isMobile ? styles.cardMobile : styles.cardDesktop,
                    hovered && styles.cardHover,
                  ]}
                >
                  <View style={styles.iconContainer}>
                    <FontAwesome
                      name={link.icon as any}
                      size={32}
                      color="#d4a843"
                    />
                  </View>
                  <Text style={styles.cardTitle}>{link.title}</Text>
                  <Text style={styles.cardDescription}>{link.description}</Text>
                  <Text style={styles.arrow}>→</Text>
                </Pressable>
              </Link>
            </AnimateOnScroll>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f2eb",
    paddingHorizontal: "8%",
  },
  inner: {
    maxWidth: 1200,
    marginHorizontal: "auto",
    width: "100%",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
  },
  gridMobile: {
    flexDirection: "column",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 32,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    alignItems: "flex-start",
    ...(Platform.OS === "web"
      ? {
          transition: "all 0.3s ease",
          cursor: "pointer",
        }
      : {}),
  } as any,
  cardDesktop: {
    flex: 1,
    minWidth: 220,
    maxWidth: 282,
  },
  cardMobile: {
    width: "100%",
  },
  cardHover: {
    transform: [{ translateY: -6 }],
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.15)",
    borderColor: "rgba(212, 168, 67, 0.3)",
  },
  iconContainer: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: "PlayfairDisplay_700Bold, serif",
    fontWeight: "700",
    color: "#2d2d2d",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 15,
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
    lineHeight: 22,
    marginBottom: 16,
  },
  arrow: {
    fontSize: 20,
    color: "#d4a843",
    fontWeight: "600",
  },
});
