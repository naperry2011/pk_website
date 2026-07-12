import { View, Text, Pressable, Platform } from "react-native";
import { useState } from "react";
import { PageLayout, Section } from "@/components/layout";
import { FontAwesome } from "@expo/vector-icons";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { useTowns } from "@/hooks/useTowns";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { TownFilterDropdown, HelpfulResources } from "@/components/community";
import { Body, BodyLarge, Display, Eyebrow } from "@/components/ui";
import { useResponsive } from "@/hooks/useResponsive";
import { theme } from "@/constants/theme";

const isWeb = Platform.OS === "web";

const typeConfig = {
  event: { label: "Event" },
  council: { label: "Council" },
  development: { label: "Development" },
  urgent: { label: "Urgent" },
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
      {/* Page header band */}
      <Section background="green-dark" className="py-20 md:py-28">
        <View className="max-w-3xl mx-auto items-center">
          <Eyebrow className="mb-4 text-center">Official News</Eyebrow>
          <Display className="text-white text-center mb-5">
            Council Announcements
          </Display>
          <View className="w-16 h-[2px] bg-gold mb-6" />
          <BodyLarge className="text-white/80 text-center">
            Official news, resolutions, and updates from the Akuapem Traditional
            Council
          </BodyLarge>
        </View>
      </Section>

      {/* Filters */}
      <Section background="cream" className="py-10 md:py-12">
        <View className="flex-row flex-wrap gap-2 justify-center">
          {filters.map((filter) => {
            const active = activeFilter === filter;
            return (
              <Pressable
                key={filter}
                onPress={() => setActiveFilter(filter)}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                className={`px-5 py-2.5 min-h-[44px] justify-center rounded-full border ${
                  active
                    ? "bg-green-deep border-green-deep"
                    : "bg-white border-gray-charcoal/15 hover:border-gold/60"
                }`}
                style={isWeb ? ({ cursor: "pointer", transition: "all 0.2s ease" } as any) : undefined}
              >
                <Text
                  className={`font-accent text-xs uppercase tracking-widest ${
                    active ? "text-gold-light" : "text-gray-charcoal"
                  }`}
                >
                  {filter === "all" ? "All" : typeConfig[filter as keyof typeof typeConfig].label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </Section>

      {/* Newsroom list */}
      <Section background="white">
        {isLoading ? (
          <LoadingState message="Loading announcements..." />
        ) : error ? (
          <ErrorState message="Failed to load announcements." onRetry={refetch} />
        ) : (
          <View className={isMobile ? undefined : "flex-row gap-12"}>
            {/* Main list */}
            <View className={isMobile ? undefined : "flex-1"}>
              <TownFilterDropdown selectedTown={filterTown} onSelectTown={setFilterTown} />

              <View className="max-w-3xl">
                {filteredAnnouncements.map((announcement) => {
                  const config = typeConfig[announcement.type];
                  return (
                    <Pressable
                      key={announcement.id}
                      accessibilityRole="button"
                      accessibilityLabel={`${config.label}: ${announcement.title}`}
                      className="py-8 border-b border-gray-charcoal/10"
                      style={isWeb ? ({ cursor: "pointer" } as any) : undefined}
                    >
                      {({ hovered }: any) => (
                        <>
                          <View className="flex-row flex-wrap items-center gap-3 mb-3">
                            <Text className="font-body text-sm text-gray-muted">
                              {new Date(announcement.date).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </Text>
                            <View className="w-1 h-1 rounded-full bg-gold" />
                            <Text className="font-accent text-xs uppercase tracking-widest text-gold">
                              {config.label}
                            </Text>
                            {announcement.town_id && (
                              <>
                                <View className="w-1 h-1 rounded-full bg-gold" />
                                <Text className="font-accent text-xs uppercase tracking-widest text-gold">
                                  {getTownName(announcement.town_id)}
                                </Text>
                              </>
                            )}
                          </View>

                          <Text
                            className={`font-heading-bold text-xl md:text-2xl mb-2 ${
                              hovered && isWeb ? "text-green-deep" : "text-gray-charcoal"
                            }`}
                            style={isWeb ? ({ transition: "color 0.2s ease" } as any) : undefined}
                          >
                            {announcement.title}
                          </Text>

                          <Body className="text-gray-muted max-w-2xl" numberOfLines={3}>
                            {announcement.excerpt}
                          </Body>

                          <View className="flex-row items-center gap-2 mt-4">
                            <Text className="font-accent text-sm uppercase tracking-wide text-gold">
                              Read more
                            </Text>
                            <FontAwesome name="long-arrow-right" size={12} color={theme.colors.goldAccent} />
                          </View>
                        </>
                      )}
                    </Pressable>
                  );
                })}

                {filteredAnnouncements.length === 0 && (
                  <View className="py-16 items-center">
                    <FontAwesome name="inbox" size={40} color="rgba(45, 45, 45, 0.15)" />
                    <Body className="text-gray-muted mt-4">
                      No announcements in this category
                    </Body>
                  </View>
                )}
              </View>
            </View>

            {/* Sidebar */}
            <View className={isMobile ? "mt-10" : "w-[300px]"}>
              <HelpfulResources />
            </View>
          </View>
        )}
      </Section>

      {/* Archive */}
      <Section background="warm" className="py-12 md:py-16">
        <View className="items-center">
          <Body className="text-gray-muted mb-4">
            Looking for older announcements?
          </Body>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="View archive"
            className="flex-row items-center gap-2 hover:opacity-80"
            style={isWeb ? ({ cursor: "pointer", transition: "opacity 0.2s ease" } as any) : undefined}
          >
            <FontAwesome name="archive" size={14} color={theme.colors.primaryGreen} />
            <Text className="font-accent text-sm uppercase tracking-widest text-green-deep">
              View Archive
            </Text>
          </Pressable>
        </View>
      </Section>
    </PageLayout>
  );
}
