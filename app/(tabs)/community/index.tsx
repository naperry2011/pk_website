import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { Link } from "expo-router";
import Head from "expo-router/head";
import { PageLayout } from "@/components/layout";
import { FontAwesome } from "@expo/vector-icons";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { useObituaries } from "@/hooks/useObituaries";
import { useWeddings } from "@/hooks/useWeddings";
import { useTowns } from "@/hooks/useTowns";
import { HelpfulResources } from "@/components/community";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { useResponsive } from "@/hooks/useResponsive";

export default function CommunityScreen() {
  const { isMobile } = useResponsive();

  const { data: obituaries } = useObituaries({ status: "approved" });
  const { data: weddings } = useWeddings({ status: "approved" });
  const { data: announcements } = useAnnouncements();
  const { data: towns } = useTowns();

  const getTownName = (townId: string) => {
    const town = (towns ?? []).find((t) => t.id === townId);
    return town?.name || townId;
  };

  const sections = [
    {
      href: "/community/obituaries",
      icon: "heart",
      title: "Obituaries",
      description: "Funeral announcements and tributes",
      count: (obituaries ?? []).length,
      color: "#8B0000",
    },
    {
      href: "/community/weddings",
      icon: "bell",
      title: "Weddings",
      description: "Wedding announcements and celebrations",
      count: (weddings ?? []).length,
      color: "#d4a843",
    },
    {
      href: "/community/announcements",
      icon: "bullhorn",
      title: "Council Announcements",
      description: "Official news and updates",
      count: (announcements ?? []).length,
      color: "#1a5632",
    },
  ];

  const latestObituary = (obituaries ?? [])[0];
  const latestWedding = (weddings ?? [])[0];
  const latestAnnouncement = (announcements ?? [])[0];

  return (
    <PageLayout>
      <Head>
        <title>Community Updates - Akuapem Paramount King Council</title>
        <meta name="description" content="Stay connected with community updates from across the Akuapem Traditional Area. View obituaries, wedding announcements, and official council news." />
        <meta property="og:title" content="Community Updates - Akuapem Paramount King Council" />
        <meta property="og:description" content="Community announcements, celebrations, and tributes from across the Akuapem Traditional Area." />
      </Head>

      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.heroInner}>
          <Text style={styles.heroLabel}>COMMUNITY</Text>
          <Text style={[styles.heroTitle, { fontSize: isMobile ? 36 : 48 }]}>
            Community Updates
          </Text>
          <Text style={styles.heroSubtitle}>
            Stay connected with announcements, celebrations, and tributes from
            across Akuapem
          </Text>
        </View>
      </View>

      {/* Community Intro */}
      <View style={[styles.section, { paddingVertical: isMobile ? 40 : 60, backgroundColor: "#f5f2eb" }]}>
        <AnimateOnScroll>
          <View style={styles.sectionInner}>
            <View style={{ maxWidth: 700, marginHorizontal: "auto" }}>
              <Text style={styles.introText}>
                Welcome to the Akuapem Community Hub — your central place for staying informed
                about life events across all 17 towns in the Akuapem Traditional Area. Here you
                can find funeral announcements, wedding celebrations, and official council news.
                Community members can also submit their own announcements for review and publication.
              </Text>
            </View>
          </View>
        </AnimateOnScroll>
      </View>

      {/* Section Cards */}
      <View style={[styles.section, { paddingVertical: isMobile ? 60 : 100 }]}>
        <AnimateOnScroll>
          <View style={styles.sectionInner}>
            <View style={[styles.cardsRow, isMobile && styles.cardsRowMobile]}>
              {sections.map((section, index) => (
                <AnimateOnScroll key={section.href} delay={index * 100}>
                  <Link href={section.href as any} asChild>
                    <Pressable
                      style={({ hovered }: any) => [
                        styles.sectionCard,
                        isMobile && styles.sectionCardMobile,
                        hovered && styles.sectionCardHover,
                      ]}
                    >
                      <View
                        style={[
                          styles.cardIcon,
                          { backgroundColor: section.color + "18" },
                        ]}
                      >
                        <FontAwesome
                          name={section.icon as any}
                          size={28}
                          color={section.color}
                        />
                      </View>
                      <Text style={styles.cardTitle}>{section.title}</Text>
                      <Text style={styles.cardDesc}>{section.description}</Text>
                      <View style={styles.cardFooter}>
                        <Text style={styles.cardCount}>
                          {section.count} recent
                        </Text>
                        <FontAwesome name="arrow-right" size={16} color="#d4a843" />
                      </View>
                    </Pressable>
                  </Link>
                </AnimateOnScroll>
              ))}
            </View>
          </View>
        </AnimateOnScroll>
      </View>

      {/* Recent Updates */}
      <View style={[styles.section, { paddingVertical: isMobile ? 60 : 100, backgroundColor: "#f5f2eb" }]}>
        <AnimateOnScroll>
          <View style={styles.sectionInner}>
            <View style={{ maxWidth: 800, marginHorizontal: "auto", width: "100%" }}>
              <View style={styles.centeredHeading}>
                <Text style={styles.sectionLabel}>LATEST</Text>
                <Text style={[styles.sectionTitleCentered, { fontSize: isMobile ? 28 : 36 }]}>
                  Recent Updates
                </Text>
                <View style={styles.goldBar} />
              </View>

              {!latestObituary && !latestWedding && !latestAnnouncement ? (
                <View style={styles.emptyState}>
                  <View style={styles.emptyIcon}>
                    <FontAwesome name="newspaper-o" size={36} color="#d4a843" />
                  </View>
                  <Text style={styles.emptyTitle}>No Updates Yet</Text>
                  <Text style={styles.emptyText}>
                    Community updates will appear here as they are published. Check back soon for obituaries, wedding announcements, and council news.
                  </Text>
                </View>
              ) : (
                <View style={{ gap: 20 }}>
                  {/* Recent Obituary */}
                  {latestObituary && (
                    <View style={[styles.updateCard, { borderLeftColor: "#8B0000" }]}>
                      <View style={styles.updateCardInner}>
                        <View style={[styles.updateRow, isMobile && styles.updateRowMobile]}>
                          <View style={[styles.updateIcon, { backgroundColor: "rgba(139, 0, 0, 0.08)" }]}>
                            <FontAwesome name="heart" size={20} color="#8B0000" />
                          </View>
                          <View style={{ flex: 1 }}>
                            <View style={styles.badgeRow}>
                              <View style={[styles.badge, { backgroundColor: "rgba(139, 0, 0, 0.08)" }]}>
                                <Text style={[styles.badgeText, { color: "#8B0000" }]}>Funeral</Text>
                              </View>
                              <View style={styles.dateBadge}>
                                <FontAwesome name="calendar-o" size={10} color="#2d2d2d" />
                                <Text style={styles.dateText}>
                                  {new Date(latestObituary.funeral_date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
                                </Text>
                              </View>
                            </View>
                            <Text style={styles.updateName}>{latestObituary.name}</Text>
                            <View style={styles.locationRow}>
                              <FontAwesome name="map-marker" size={12} color="#8B4513" />
                              <Text style={styles.locationText}>{getTownName(latestObituary.town_id)}</Text>
                            </View>
                          </View>
                          <Link href="/community/obituaries" asChild>
                            <Pressable style={({ hovered }: any) => [styles.viewAllBtn, hovered && { backgroundColor: "rgba(139, 0, 0, 0.06)" }]}>
                              <Text style={[styles.viewAllText, { color: "#8B0000" }]}>View All</Text>
                              <FontAwesome name="chevron-right" size={10} color="#8B0000" />
                            </Pressable>
                          </Link>
                        </View>
                      </View>
                    </View>
                  )}

                  {/* Recent Wedding */}
                  {latestWedding && (
                    <View style={[styles.updateCard, { borderLeftColor: "#d4a843" }]}>
                      <View style={styles.updateCardInner}>
                        <View style={[styles.updateRow, isMobile && styles.updateRowMobile]}>
                          <View style={[styles.updateIcon, { backgroundColor: "rgba(212, 168, 67, 0.1)" }]}>
                            <FontAwesome name="bell" size={20} color="#d4a843" />
                          </View>
                          <View style={{ flex: 1 }}>
                            <View style={styles.badgeRow}>
                              <View style={[styles.badge, { backgroundColor: "rgba(212, 168, 67, 0.1)" }]}>
                                <Text style={[styles.badgeText, { color: "#b8922e" }]}>Wedding</Text>
                              </View>
                              <View style={styles.dateBadge}>
                                <FontAwesome name="calendar-o" size={10} color="#2d2d2d" />
                                <Text style={styles.dateText}>
                                  {new Date(latestWedding.date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
                                </Text>
                              </View>
                            </View>
                            <Text style={styles.updateName}>
                              {latestWedding.bride} & {latestWedding.groom}
                            </Text>
                            <View style={styles.locationRow}>
                              <FontAwesome name="map-marker" size={12} color="#8B4513" />
                              <Text style={styles.locationText}>{latestWedding.venue}</Text>
                            </View>
                          </View>
                          <Link href="/community/weddings" asChild>
                            <Pressable style={({ hovered }: any) => [styles.viewAllBtn, hovered && { backgroundColor: "rgba(212, 168, 67, 0.06)" }]}>
                              <Text style={[styles.viewAllText, { color: "#b8922e" }]}>View All</Text>
                              <FontAwesome name="chevron-right" size={10} color="#b8922e" />
                            </Pressable>
                          </Link>
                        </View>
                      </View>
                    </View>
                  )}

                  {/* Recent Announcement */}
                  {latestAnnouncement && (
                    <View style={[styles.updateCard, { borderLeftColor: "#1a5632" }]}>
                      <View style={styles.updateCardInner}>
                        <View style={[styles.updateRow, isMobile && styles.updateRowMobile]}>
                          <View style={[styles.updateIcon, { backgroundColor: "rgba(26, 86, 50, 0.08)" }]}>
                            <FontAwesome name="bullhorn" size={20} color="#1a5632" />
                          </View>
                          <View style={{ flex: 1 }}>
                            <View style={styles.badgeRow}>
                              <View style={[styles.badge, { backgroundColor: "rgba(26, 86, 50, 0.08)" }]}>
                                <Text style={[styles.badgeText, { color: "#1a5632" }]}>Announcement</Text>
                              </View>
                              <View style={styles.dateBadge}>
                                <FontAwesome name="calendar-o" size={10} color="#2d2d2d" />
                                <Text style={styles.dateText}>
                                  {new Date(latestAnnouncement.date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
                                </Text>
                              </View>
                            </View>
                            <Text style={styles.updateName}>
                              {latestAnnouncement.title}
                            </Text>
                          </View>
                          <Link href="/community/announcements" asChild>
                            <Pressable style={({ hovered }: any) => [styles.viewAllBtn, hovered && { backgroundColor: "rgba(26, 86, 50, 0.06)" }]}>
                              <Text style={[styles.viewAllText, { color: "#1a5632" }]}>View All</Text>
                              <FontAwesome name="chevron-right" size={10} color="#1a5632" />
                            </Pressable>
                          </Link>
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              )}

              {/* See All Community Updates Button */}
              {(latestObituary || latestWedding || latestAnnouncement) && (
                <View style={{ alignItems: "center", marginTop: 40 }}>
                  <Link href="/community/announcements" asChild>
                    <Pressable
                      style={({ hovered }: any) => [
                        styles.seeAllBtn,
                        hovered && styles.seeAllBtnHover,
                      ]}
                    >
                      <FontAwesome name="th-large" size={16} color="#ffffff" />
                      <Text style={styles.seeAllBtnText}>See All Community Updates</Text>
                      <FontAwesome name="arrow-right" size={14} color="#d4a843" />
                    </Pressable>
                  </Link>
                </View>
              )}
            </View>
          </View>
        </AnimateOnScroll>
      </View>

      {/* Helpful Resources */}
      <View style={[styles.section, { paddingVertical: isMobile ? 60 : 100 }]}>
        <AnimateOnScroll>
          <View style={styles.sectionInner}>
            <View style={{ maxWidth: 400, marginHorizontal: "auto", width: "100%" }}>
              <HelpfulResources />
            </View>
          </View>
        </AnimateOnScroll>
      </View>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: "#1a5632",
    paddingVertical: 80,
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
    backgroundColor: "#ffffff",
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
  centeredHeading: {
    alignItems: "center",
    marginBottom: 40,
  },
  sectionTitleCentered: {
    fontFamily: "PlayfairDisplay_700Bold, serif",
    color: "#2d2d2d",
    textAlign: "center",
    marginBottom: 12,
  },
  goldBar: {
    width: 64,
    height: 3,
    backgroundColor: "#d4a843",
    borderRadius: 2,
  },
  introText: {
    fontSize: 16,
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
    textAlign: "center",
    lineHeight: 26,
  },
  cardsRow: {
    flexDirection: "row",
    gap: 24,
    justifyContent: "center",
  },
  cardsRowMobile: {
    flexDirection: "column",
  },
  sectionCard: {
    flex: 1,
    maxWidth: 350,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(212, 168, 67, 0.12)",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.04)",
    ...(Platform.OS === "web"
      ? { cursor: "pointer", transition: "all 0.25s ease" }
      : {}),
  } as any,
  sectionCardMobile: {
    maxWidth: "100%",
    marginBottom: 16,
  },
  sectionCardHover: {
    borderColor: "rgba(212, 168, 67, 0.3)",
    boxShadow: "0px 2px 16px rgba(0, 0, 0, 0.1)",
  },
  cardIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontFamily: "PlayfairDisplay_700Bold, serif",
    fontSize: 20,
    color: "#2d2d2d",
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 14,
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
    lineHeight: 22,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardCount: {
    fontSize: 13,
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
  },
  updateCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.04)",
    borderWidth: 1,
    borderColor: "rgba(212, 168, 67, 0.08)",
    borderLeftWidth: 4,
  },
  updateCardInner: {
    padding: 20,
  },
  updateRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },
  updateRowMobile: {
    flexDirection: "column",
    gap: 12,
  },
  updateIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
    flexWrap: "wrap",
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold, sans-serif",
    fontWeight: "600",
  },
  dateBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#f5f2eb",
    borderRadius: 100,
  },
  dateText: {
    fontSize: 12,
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
  },
  updateName: {
    fontFamily: "Inter_600SemiBold, sans-serif",
    fontWeight: "600",
    fontSize: 16,
    color: "#2d2d2d",
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  locationText: {
    fontSize: 14,
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
  },
  viewAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    ...(Platform.OS === "web"
      ? { cursor: "pointer", transition: "background-color 0.2s ease" }
      : {}),
  } as any,
  viewAllText: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold, sans-serif",
    fontWeight: "600",
  },
  seeAllBtn: {
    backgroundColor: "#1a5632",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
    ...(Platform.OS === "web"
      ? { cursor: "pointer", transition: "all 0.2s ease" }
      : {}),
  } as any,
  seeAllBtnHover: {
    backgroundColor: "#22703f",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
  },
  seeAllBtnText: {
    color: "#ffffff",
    fontFamily: "Inter_600SemiBold, sans-serif",
    fontWeight: "600",
    fontSize: 16,
  },
  emptyState: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 40,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(212, 168, 67, 0.12)",
  },
  emptyIcon: {
    width: 80,
    height: 80,
    backgroundColor: "rgba(212, 168, 67, 0.1)",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  emptyTitle: {
    fontFamily: "PlayfairDisplay_700Bold, serif",
    fontSize: 22,
    color: "#2d2d2d",
    textAlign: "center",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
    textAlign: "center",
    maxWidth: 400,
    lineHeight: 24,
  },
});
