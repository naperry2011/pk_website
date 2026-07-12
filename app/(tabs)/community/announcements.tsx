import { View, Text, Pressable, Platform } from "react-native";
import { useState } from "react";
import { PageLayout, Section } from "@/components/layout";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { useTowns } from "@/hooks/useTowns";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { TownFilterDropdown, HelpfulResources } from "@/components/community";
import { BodyLarge, Display, Label } from "@/components/ui";
import { useResponsive } from "@/hooks/useResponsive";

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
      {/* Page title band */}
      <Section background="ink" className="pb-10 md:pb-16">
        <View className="max-w-4xl">
          <Label className="mb-6">Official News</Label>
          <Display className="mb-8">Announcements</Display>
          <BodyLarge className="text-ivory/60 max-w-xl">
            Official news, resolutions, and updates from the Akuapem Traditional
            Council.
          </BodyLarge>
        </View>
      </Section>

      {/* Filters — underline text-tabs */}
      <Section background="ink" className="py-0 md:py-0" animate={false}>
        <View className="flex-row flex-wrap gap-x-8 gap-y-3 border-b border-white/10 pb-0">
          {filters.map((filter) => {
            const active = activeFilter === filter;
            return (
              <Pressable
                key={filter}
                onPress={() => setActiveFilter(filter)}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                className={`pb-4 min-h-[44px] justify-end border-b-2 ${
                  active ? "border-champagne" : "border-transparent"
                }`}
                style={isWeb ? ({ cursor: "pointer", transition: "border-color 0.25s ease" } as any) : undefined}
              >
                {({ hovered }: any) => (
                  <Text
                    className={`font-body-medium text-label uppercase tracking-[3px] ${
                      active
                        ? "text-champagne"
                        : hovered && isWeb
                        ? "text-ivory"
                        : "text-ivory/50"
                    }`}
                    style={isWeb ? ({ transition: "color 0.25s ease" } as any) : undefined}
                  >
                    {filter === "all" ? "All" : typeConfig[filter as keyof typeof typeConfig].label}
                  </Text>
                )}
              </Pressable>
            );
          })}
        </View>
      </Section>

      {/* Editorial index */}
      <Section background="ink" number="01" label="The Record">
        {isLoading ? (
          <LoadingState message="Loading announcements..." />
        ) : error ? (
          <ErrorState message="Failed to load announcements." onRetry={refetch} />
        ) : (
          <View className={isMobile ? undefined : "flex-row gap-20"}>
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
                      className="py-10 border-b border-white/10"
                      style={isWeb ? ({ cursor: "pointer" } as any) : undefined}
                    >
                      {({ hovered }: any) => (
                        <>
                          <View className="flex-row flex-wrap items-baseline gap-x-5 gap-y-2 mb-4">
                            <Text className="font-body-medium text-label uppercase tracking-[3px] text-ivory/40">
                              {new Date(announcement.date).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </Text>
                            <Text className="font-body-medium text-label uppercase tracking-[3px] text-champagne">
                              {config.label}
                            </Text>
                            {announcement.town_id && (
                              <Text className="font-body-medium text-label uppercase tracking-[3px] text-champagne">
                                {getTownName(announcement.town_id)}
                              </Text>
                            )}
                          </View>

                          <Text
                            className={`font-display text-xl md:text-2xl mb-3 ${
                              hovered && isWeb ? "text-champagne" : "text-ivory"
                            }`}
                            style={isWeb ? ({ transition: "color 0.25s ease" } as any) : undefined}
                          >
                            {announcement.title}
                          </Text>

                          <Text className="font-body text-base leading-relaxed text-ivory/50 max-w-2xl" numberOfLines={3}>
                            {announcement.excerpt}
                          </Text>
                        </>
                      )}
                    </Pressable>
                  );
                })}

                {filteredAnnouncements.length === 0 && (
                  <View className="py-20 border-b border-white/10">
                    <Text className="font-display-italic text-lg text-ivory/40">
                      No announcements in this category.
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* Sidebar */}
            <View className={isMobile ? "mt-16" : "w-[300px]"}>
              <HelpfulResources />
            </View>
          </View>
        )}
      </Section>

      {/* Archive */}
      <Section background="ink-raised" className="py-16 md:py-20">
        <View className="flex-row flex-wrap items-center justify-between gap-6">
          <Text className="font-display text-lg text-ivory/70">
            Looking for older announcements?
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="View archive"
            className="flex-row items-center gap-3 min-h-[44px]"
            style={isWeb ? ({ cursor: "pointer" } as any) : undefined}
          >
            {({ hovered }: any) => (
              <>
                <Text className="font-body-medium text-label uppercase tracking-[3px] text-champagne">
                  View Archive
                </Text>
                <Text
                  className="text-champagne text-base"
                  style={
                    isWeb
                      ? ({
                          transition: "transform 0.3s ease",
                          transform: hovered ? "translateX(4px)" : "translateX(0)",
                        } as any)
                      : undefined
                  }
                >
                  →
                </Text>
              </>
            )}
          </Pressable>
        </View>
      </Section>
    </PageLayout>
  );
}
