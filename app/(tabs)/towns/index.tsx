import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { Link } from "expo-router";
import Head from "expo-router/head";
import { PageLayout } from "@/components/layout";
import { FontAwesome } from "@expo/vector-icons";
import { useTowns } from "@/hooks/useTowns";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useResponsive } from "@/hooks/useResponsive";

// Division colors for town badges
const divisionColors: Record<string, { bg: string; text: string }> = {
  Benkum: { bg: "#1a5632", text: "#ffffff" },
  Nifa: { bg: "#d4a843", text: "#ffffff" },
  Adonten: { bg: "#1E4D8B", text: "#ffffff" },
  Kyidom: { bg: "#8B0000", text: "#ffffff" },
  Gyase: { bg: "#6B3FA0", text: "#ffffff" },
};

// Map town names to divisions (to be verified by site owner)
const townDivisions: Record<string, string> = {
  Akropong: "Gyase",
  Abiriw: "Benkum",
  Amanokrom: "Nifa",
  Awukugua: "Benkum",
  Berekuso: "Adonten",
  Tutu: "Nifa",
  Mamfe: "Adonten",
  Larteh: "Benkum",
  Adukrom: "Kyidom",
  Mampong: "Nifa",
  Obosomase: "Kyidom",
  Apirede: "Benkum",
  Aseseeso: "Adonten",
  Dawu: "Nifa",
  Koforidua: "Adonten",
  Nsawam: "Kyidom",
  Suhum: "Kyidom",
};

export default function TownsScreen() {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const { data: towns, isLoading, error, refetch } = useTowns();

  const getColumnCount = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 4;
  };

  return (
    <PageLayout>
      <Head>
        <title>Towns & Communities - Akuapem Traditional Council</title>
        <meta name="description" content="Explore the 17 principal towns of the Akuapem Traditional Area including Akropong, Aburi, Mampong, Larteh, and more." />
        <meta property="og:title" content="Towns & Communities - Akuapem Traditional Council" />
        <meta property="og:description" content="Explore the 17 principal towns of the Akuapem Traditional Area." />
      </Head>

      {/* Hero */}
      <View style={[styles.hero, { paddingVertical: isMobile ? 60 : 100 }]}>
        <View style={styles.heroInner}>
          <Text style={styles.heroLabel}>OUR COMMUNITIES</Text>
          <Text style={[styles.heroTitle, { fontSize: isMobile ? 36 : 48, lineHeight: isMobile ? 44 : 58 }]}>
            Towns & Communities
          </Text>
          <Text style={styles.heroSubtitle}>
            Explore the 17 principal towns of the Akuapem Traditional Area
          </Text>
        </View>
      </View>

      {/* Location & Boundaries */}
      <View style={[styles.section, { paddingVertical: isMobile ? 60 : 100, backgroundColor: "#f5f2eb" }]}>
        <View style={styles.sectionInner}>
          <View style={[styles.infoRow, isMobile && styles.infoRowMobile]}>
            <View style={styles.infoCard}>
              <View style={styles.infoIconWrapper}>
                <FontAwesome name="globe" size={18} color="#1a5632" />
              </View>
              <Text style={styles.infoTitle}>Location & Boundaries</Text>
              <Text style={styles.infoText}>
                The Akuapem Traditional Area spans from the foothills to the ridge
                of the Akuapem Range in the Eastern Region of Ghana.
              </Text>
            </View>
            <View style={styles.infoCard}>
              <View style={styles.infoIconWrapper}>
                <FontAwesome name="institution" size={16} color="#1a5632" />
              </View>
              <Text style={styles.infoTitle}>Districts</Text>
              <Text style={styles.infoText}>
                The traditional area forms part of the Akuapem South and Akuapem
                North districts.
              </Text>
            </View>
          </View>

          {/* Map */}
          {Platform.OS === "web" && (
            <AnimateOnScroll>
              <Text style={styles.mapHeading}>Map of Akuapem Traditional Area</Text>
              <View style={styles.mapContainer}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63614.94!2d-0.1!3d5.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf834e45f6bbd7%3A0x3a10a41b21e4f06f!2sAkropong%2C%20Ghana!5e0!3m2!1sen!2sus!4v1710000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: 12 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Map of Akuapem Traditional Area"
                />
              </View>
            </AnimateOnScroll>
          )}
        </View>
      </View>

      {/* Towns Grid */}
      <View style={[styles.section, { paddingVertical: isMobile ? 60 : 100, backgroundColor: "#ffffff" }]}>
        <View style={styles.sectionInner}>
          <SectionHeading
            label="THE 17 TOWNS"
            title="Our Principal Towns"
            subtitle="Each town has its own chief, traditions, and unique identity within the Akuapem state."
          />

          {isLoading ? (
            <LoadingState message="Loading towns..." />
          ) : error ? (
            <ErrorState message="Failed to load towns." onRetry={refetch} />
          ) : (
            <View style={[
              styles.townGrid,
              {
                flexDirection: isMobile ? "column" : "row",
              },
            ]}>
              {(towns ?? []).map((town, index) => {
                const division = townDivisions[town.name] || "Gyase";
                const divColor = divisionColors[division] || divisionColors.Gyase;

                return (
                  <AnimateOnScroll key={town.id} delay={(index % getColumnCount()) * 100}>
                    <Link href={`/towns/${town.id}`} asChild>
                      <Pressable
                        style={({ hovered }: any) => [
                          styles.townCard,
                          isMobile ? styles.townCardMobile : (isTablet ? styles.townCardTablet : styles.townCardDesktop),
                          hovered && styles.townCardHover,
                        ]}
                      >
                        {/* Town image */}
                        <PlaceholderImage height={160} label={town.name} />

                        {/* Division badge */}
                        <View style={[styles.divisionBadge, { backgroundColor: divColor.bg }]}>
                          <Text style={[styles.divisionText, { color: divColor.text }]}>
                            {division}
                          </Text>
                        </View>

                        {/* Content */}
                        <View style={styles.townContent}>
                          <Text style={styles.townName}>{town.name}</Text>
                          <Text style={styles.townChief}>{town.chief}</Text>
                          <View style={styles.learnMore}>
                            <FontAwesome name="arrow-right" size={12} color="#d4a843" />
                            <Text style={styles.learnMoreText}>Learn more</Text>
                          </View>
                        </View>
                      </Pressable>
                    </Link>
                  </AnimateOnScroll>
                );
              })}
            </View>
          )}
        </View>
      </View>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: "#1a5632",
    paddingHorizontal: "8%",
  },
  heroInner: {
    maxWidth: 700,
    marginHorizontal: "auto",
    alignItems: "center",
  },
  heroLabel: {
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 3,
    color: "#d4a843",
    fontWeight: "700",
    fontFamily: "Inter_600SemiBold, sans-serif",
    marginBottom: 16,
  },
  heroTitle: {
    color: "#ffffff",
    fontFamily: "PlayfairDisplay_700Bold, serif",
    textAlign: "center",
    marginBottom: 16,
  },
  heroSubtitle: {
    color: "rgba(255, 255, 255, 0.85)",
    fontSize: 18,
    fontFamily: "Inter_400Regular, sans-serif",
    textAlign: "center",
    lineHeight: 28,
  },
  section: {
    paddingHorizontal: "8%",
  },
  sectionInner: {
    maxWidth: 1200,
    marginHorizontal: "auto",
    width: "100%",
  },
  infoRow: {
    flexDirection: "row",
    gap: 32,
    marginBottom: 40,
  },
  infoRowMobile: {
    flexDirection: "column",
  },
  infoCard: {
    flex: 1,
  },
  infoIconWrapper: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(26, 86, 50, 0.1)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 22,
    fontFamily: "PlayfairDisplay_700Bold, serif",
    color: "#2d2d2d",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
    lineHeight: 26,
  },
  mapHeading: {
    fontSize: 22,
    fontFamily: "PlayfairDisplay_700Bold, serif",
    color: "#2d2d2d",
    textAlign: "center",
    marginBottom: 16,
  },
  mapContainer: {
    height: 384,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(26, 86, 50, 0.15)",
  },
  townGrid: {
    flexWrap: "wrap",
    gap: 24,
    justifyContent: "center",
  },
  townCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e8e8e8",
    position: "relative",
    ...(Platform.OS === "web"
      ? { transition: "all 0.3s ease", cursor: "pointer" }
      : {}),
  } as any,
  townCardDesktop: {
    width: 270,
  },
  townCardTablet: {
    width: "calc(50% - 12px)" as any,
  },
  townCardMobile: {
    width: "100%",
  },
  townCardHover: {
    transform: [{ translateY: -6 }],
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.15)",
    borderColor: "rgba(212, 168, 67, 0.3)",
  },
  divisionBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  divisionText: {
    fontSize: 11,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold, sans-serif",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  townContent: {
    padding: 16,
  },
  townName: {
    fontSize: 20,
    fontFamily: "PlayfairDisplay_700Bold, serif",
    color: "#2d2d2d",
    marginBottom: 4,
  },
  townChief: {
    fontSize: 14,
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
    marginBottom: 12,
  },
  learnMore: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  learnMoreText: {
    color: "#d4a843",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold, sans-serif",
  },
});
