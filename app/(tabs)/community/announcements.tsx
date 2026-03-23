import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { useState } from "react";
import { PageLayout } from "@/components/layout";
import { FontAwesome } from "@expo/vector-icons";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { useTowns } from "@/hooks/useTowns";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { TownFilterDropdown, HelpfulResources } from "@/components/community";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { useResponsive } from "@/hooks/useResponsive";

const typeConfig = {
  event: { icon: "calendar", color: "#d4a843", label: "Event" },
  council: { icon: "gavel", color: "#1a5632", label: "Council" },
  development: { icon: "building", color: "#1E4D8B", label: "Development" },
  urgent: { icon: "exclamation-circle", color: "#8B0000", label: "Urgent" },
};

const filters = ["all", "event", "council", "development", "urgent"] as const;

export default function AnnouncementsScreen() {
  const { isMobile } = useResponsive();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [filterTown, setFilterTown] = useState("");
  const { data: announcements, isLoading, error, refetch } = useAnnouncements();
  const { data: towns } = useTowns();

  const getTownName = (townId: string | null) => {
    if (!townId) return "Council-wide";
    const town = (towns ?? []).find((t) => t.id === townId);
    return town?.name || townId;
  };

  const filteredAnnouncements = (announcements ?? []).filter((a) => {
    const matchesType = activeFilter === "all" || a.type === activeFilter;
    const matchesTown = !filterTown || getTownName(a.town_id).toLowerCase() === filterTown.toLowerCase();
    return matchesType && matchesTown;
  });

  return (
    <PageLayout>
      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.heroInner}>
          <Text style={styles.heroLabel}>OFFICIAL NEWS</Text>
          <Text style={[styles.heroTitle, { fontSize: isMobile ? 36 : 48 }]}>
            Council Announcements
          </Text>
          <Text style={styles.heroSubtitle}>
            Official news, resolutions, and updates from the Akuapem Traditional Council
          </Text>
        </View>
      </View>

      {/* Filters */}
      <View style={[styles.section, { paddingVertical: isMobile ? 40 : 60, backgroundColor: "#f5f2eb" }]}>
        <AnimateOnScroll>
          <View style={styles.sectionInner}>
            <View style={styles.filterRow}>
              {filters.map((filter) => (
                <Pressable
                  key={filter}
                  onPress={() => setActiveFilter(filter)}
                  style={[
                    styles.filterChip,
                    activeFilter === filter && styles.filterChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterText,
                      activeFilter === filter && styles.filterTextActive,
                    ]}
                  >
                    {filter === "all" ? "All" : typeConfig[filter as keyof typeof typeConfig].label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </AnimateOnScroll>
      </View>

      {/* Announcements List */}
      <View style={[styles.section, { paddingVertical: isMobile ? 60 : 100 }]}>
        <AnimateOnScroll>
          <View style={styles.sectionInner}>
            {isLoading ? (
              <LoadingState message="Loading announcements..." />
            ) : error ? (
              <ErrorState message="Failed to load announcements." onRetry={refetch} />
            ) : (
              <View style={[styles.contentRow, isMobile && styles.contentRowMobile]}>
                {/* Main Content */}
                <View style={!isMobile ? { flex: 1 } : undefined}>
                  {/* Town Filter */}
                  <TownFilterDropdown selectedTown={filterTown} onSelectTown={setFilterTown} />

                  <View style={{ maxWidth: 800 }}>
                    {filteredAnnouncements.map((announcement) => {
                      const config = typeConfig[announcement.type];
                      return (
                        <View key={announcement.id} style={styles.listingCard}>
                          {/* Type Badge */}
                          <View style={styles.badgeRow}>
                            <View
                              style={[styles.badge, { backgroundColor: config.color + "15" }]}
                            >
                              <FontAwesome
                                name={config.icon as any}
                                size={12}
                                color={config.color}
                              />
                              <Text
                                style={[styles.badgeText, { color: config.color }]}
                              >
                                {config.label}
                              </Text>
                            </View>
                            <Text style={styles.dateText}>
                              {new Date(announcement.date).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </Text>
                            {announcement.town_id && (
                              <View style={styles.locationBadge}>
                                <FontAwesome name="map-marker" size={10} color="#d4a843" />
                                <Text style={styles.locationBadgeText}>
                                  {getTownName(announcement.town_id)}
                                </Text>
                              </View>
                            )}
                          </View>

                          {/* Content */}
                          <Text style={styles.cardTitle}>{announcement.title}</Text>
                          <Text style={styles.cardExcerpt}>{announcement.excerpt}</Text>

                          {/* Footer */}
                          <View style={styles.cardFooter}>
                            <Pressable
                              style={({ hovered }: any) => [
                                styles.readMoreBtn,
                                hovered && styles.readMoreBtnHover,
                              ]}
                            >
                              <Text style={styles.readMoreText}>Read more</Text>
                              <FontAwesome name="arrow-right" size={12} color="#d4a843" />
                            </Pressable>
                          </View>
                        </View>
                      );
                    })}

                    {filteredAnnouncements.length === 0 && (
                      <View style={styles.emptyState}>
                        <FontAwesome name="inbox" size={48} color="rgba(45, 45, 45, 0.15)" />
                        <Text style={styles.emptyText}>
                          No announcements in this category
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                {/* Sidebar - Helpful Resources */}
                <View style={isMobile ? { marginTop: 32 } : { width: 300 }}>
                  <HelpfulResources />
                </View>
              </View>
            )}
          </View>
        </AnimateOnScroll>
      </View>

      {/* Archive Link */}
      <View style={[styles.section, { paddingVertical: isMobile ? 60 : 100, backgroundColor: "#f5f2eb" }]}>
        <AnimateOnScroll>
          <View style={styles.sectionInner}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.archivePrompt}>
                Looking for older announcements?
              </Text>
              <Pressable
                style={({ hovered }: any) => [
                  styles.archiveLink,
                  hovered && styles.archiveLinkHover,
                ]}
              >
                <FontAwesome name="archive" size={16} color="#1E4D8B" />
                <Text style={styles.archiveLinkText}>View Archive</Text>
              </Pressable>
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
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    minHeight: 44,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "rgba(139, 69, 19, 0.15)",
    ...(Platform.OS === "web"
      ? { cursor: "pointer", transition: "all 0.2s ease" }
      : {}),
  } as any,
  filterChipActive: {
    backgroundColor: "#d4a843",
    borderColor: "#d4a843",
  },
  filterText: {
    fontSize: 14,
    color: "#2d2d2d",
    fontFamily: "Inter_400Regular, sans-serif",
    textTransform: "capitalize",
  },
  filterTextActive: {
    color: "#ffffff",
    fontFamily: "Inter_600SemiBold, sans-serif",
    fontWeight: "600",
  },
  contentRow: {
    flexDirection: "row",
    gap: 32,
  },
  contentRowMobile: {
    flexDirection: "column",
  },
  listingCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(212, 168, 67, 0.12)",
    padding: 24,
    marginBottom: 16,
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.04)",
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
    flexWrap: "wrap",
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold, sans-serif",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  dateText: {
    fontSize: 13,
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
  },
  locationBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationBadgeText: {
    fontSize: 12,
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
  },
  cardTitle: {
    fontFamily: "PlayfairDisplay_700Bold, serif",
    fontSize: 20,
    color: "#2d2d2d",
    marginBottom: 8,
  },
  cardExcerpt: {
    fontSize: 15,
    color: "rgba(45, 45, 45, 0.8)",
    fontFamily: "Inter_400Regular, sans-serif",
    lineHeight: 24,
    marginBottom: 16,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: "rgba(212, 168, 67, 0.1)",
    paddingTop: 12,
  },
  readMoreBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    ...(Platform.OS === "web"
      ? { cursor: "pointer", transition: "opacity 0.2s ease" }
      : {}),
  } as any,
  readMoreBtnHover: {
    opacity: 0.8,
  },
  readMoreText: {
    color: "#d4a843",
    fontFamily: "Inter_600SemiBold, sans-serif",
    fontWeight: "600",
    fontSize: 15,
  },
  emptyState: {
    paddingVertical: 48,
    alignItems: "center",
  },
  emptyText: {
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
    marginTop: 16,
  },
  archivePrompt: {
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
    fontSize: 15,
    marginBottom: 16,
  },
  archiveLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    ...(Platform.OS === "web"
      ? { cursor: "pointer", transition: "opacity 0.2s ease" }
      : {}),
  } as any,
  archiveLinkHover: {
    opacity: 0.8,
  },
  archiveLinkText: {
    color: "#1E4D8B",
    fontFamily: "Inter_600SemiBold, sans-serif",
    fontWeight: "600",
    fontSize: 15,
  },
});
