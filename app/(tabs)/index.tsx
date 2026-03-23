import { View, Text, Pressable, Image, StyleSheet, Platform } from "react-native";
import { Link } from "expo-router";
import Head from "expo-router/head";
import { PageLayout } from "@/components/layout";
import { Hero, AnnouncementCard, QuickLinks, SubscribeCTA, StatsSection, ImageCarousel } from "@/components/home";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { LoadingState } from "@/components/ui/LoadingState";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { useResponsive } from "@/hooks/useResponsive";
import { paramountKing } from "@/constants/mockData";

export default function HomeScreen() {
  const { data: announcements, isLoading } = useAnnouncements();
  const { isMobile, isDesktop } = useResponsive();

  return (
    <PageLayout>
      <Head>
        <title>Akuapem Traditional Council - Official Website</title>
        <meta name="description" content="Official website of the Akuapem Traditional Council. Discover the heritage, leadership, and community of the Akuapem Traditional Area in Ghana's Eastern Region." />
        <meta property="og:title" content="Akuapem Traditional Council - Official Website" />
        <meta property="og:description" content="Discover the heritage, leadership, and community of the Akuapem Traditional Area in Ghana's Eastern Region." />
        <meta property="og:type" content="website" />
      </Head>

      {/* Hero Section */}
      <Hero />

      {/* Image Carousel */}
      <ImageCarousel />

      {/* Welcome / Introduction Section */}
      <View style={[styles.section, { paddingVertical: isMobile ? 60 : 100 }]}>
        <AnimateOnScroll>
          <View style={styles.sectionInner}>
            <View style={[styles.welcomeRow, isMobile && styles.welcomeRowMobile]}>
              {/* Image column - 55% */}
              <View style={[styles.welcomeImage, isMobile && styles.welcomeImageMobile, { borderRadius: 12, overflow: "hidden" }]}>
                <Image
                  source={require("@/assets/images/hero/akuapem-heritage.jpg")}
                  style={{ width: "100%", height: isMobile ? 300 : 450 }}
                  resizeMode="cover"
                  accessibilityLabel="Akuapem chiefs and community gathered together"
                />
              </View>

              {/* Text column - 45% */}
              <View style={[styles.welcomeText, isMobile && styles.welcomeTextMobile]}>
                <Text style={styles.sectionLabel}>WELCOME</Text>
                <Text style={[styles.welcomeTitle, { fontSize: isMobile ? 28 : 36, lineHeight: isMobile ? 36 : 47 }]}>
                  The Custodians of Akuapem Heritage
                </Text>
                <Text style={styles.bodyText}>
                  The Akuapem Traditional Council serves as the custodian of our
                  rich cultural heritage and the bridge between the government and
                  our people.
                </Text>
                <Text style={[styles.bodyText, { marginBottom: 24 }]}>
                  Under the leadership of {paramountKing.name}, the{" "}
                  {paramountKing.title}, we continue to uphold the traditions of
                  our ancestors while embracing progress for our communities.
                </Text>
                <Link href="/about" asChild>
                  <Pressable
                    style={({ hovered }: any) => [
                      styles.textLink,
                      hovered && styles.textLinkHover,
                    ]}
                  >
                    <Text style={styles.textLinkText}>Meet the Council →</Text>
                  </Pressable>
                </Link>
              </View>
            </View>
          </View>
        </AnimateOnScroll>
      </View>

      {/* Stats Section */}
      <StatsSection />

      {/* Quick Links */}
      <QuickLinks />

      {/* Latest Announcements */}
      <View style={[styles.section, { paddingVertical: isMobile ? 60 : 100, backgroundColor: "#ffffff" }]}>
        <View style={styles.sectionInner}>
          <SectionHeading
            label="LATEST NEWS"
            title="Announcements"
            subtitle="Stay informed with the latest news from the Council."
          />

          {isLoading ? (
            <LoadingState message="Loading announcements..." />
          ) : (
            <>
              <View style={[styles.announcementGrid, isMobile && styles.announcementGridMobile]}>
                {(announcements ?? []).slice(0, 3).map((announcement, index) => (
                  <AnimateOnScroll key={announcement.id} delay={index * 100}>
                    <View style={isMobile ? styles.announcementCardMobile : styles.announcementCard}>
                      <AnnouncementCard announcement={announcement} />
                    </View>
                  </AnimateOnScroll>
                ))}
              </View>
              <View style={styles.viewAllContainer}>
                <Link href="/community/announcements" asChild>
                  <Pressable
                    style={({ hovered }: any) => [
                      styles.textLink,
                      hovered && styles.textLinkHover,
                    ]}
                  >
                    <Text style={styles.textLinkText}>View All Announcements →</Text>
                  </Pressable>
                </Link>
              </View>
            </>
          )}
        </View>
      </View>

      {/* Subscribe CTA */}
      <SubscribeCTA />
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: "8%",
  },
  sectionInner: {
    maxWidth: 1200,
    marginHorizontal: "auto",
    width: "100%",
  },
  sectionLabel: {
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 3,
    color: "#d4a843",
    fontWeight: "700",
    fontFamily: "Inter_600SemiBold, sans-serif",
    marginBottom: 12,
  },
  welcomeRow: {
    flexDirection: "row",
    gap: 48,
    alignItems: "center",
  },
  welcomeRowMobile: {
    flexDirection: "column",
    gap: 32,
  },
  welcomeImage: {
    flex: 55,
    borderRadius: 12,
    overflow: "hidden",
  },
  welcomeImageMobile: {
    flex: 0,
    width: "100%",
  },
  welcomeText: {
    flex: 45,
  },
  welcomeTextMobile: {
    flex: 0,
    width: "100%",
  },
  welcomeTitle: {
    fontFamily: "PlayfairDisplay_700Bold, serif",
    fontWeight: "700",
    color: "#2d2d2d",
    marginBottom: 20,
  },
  bodyText: {
    fontSize: 16,
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
    lineHeight: 26,
    marginBottom: 12,
  },
  textLink: {
    alignSelf: "flex-start",
    ...(Platform.OS === "web"
      ? { cursor: "pointer", transition: "opacity 0.2s ease" }
      : {}),
  } as any,
  textLinkHover: {
    opacity: 0.8,
  },
  textLinkText: {
    color: "#d4a843",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold, sans-serif",
  },
  announcementGrid: {
    flexDirection: "row",
    gap: 24,
  },
  announcementGridMobile: {
    flexDirection: "column",
  },
  announcementCard: {
    flex: 1,
  },
  announcementCardMobile: {
    width: "100%",
    marginBottom: 24,
  },
  viewAllContainer: {
    alignItems: "center",
    marginTop: 32,
  },
});
