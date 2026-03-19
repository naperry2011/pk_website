import { View, Pressable, useWindowDimensions } from "react-native";
import { useState } from "react";
import { PageLayout, Section } from "@/components/layout";
import { H1, H2, H3, Body } from "@/components/ui/Typography";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { FontAwesome } from "@expo/vector-icons";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { useTowns } from "@/hooks/useTowns";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { TownFilterDropdown, HelpfulResources } from "@/components/community";
import type { Announcement } from "@/lib/database.types";

const typeConfig = {
  event: { icon: "calendar", color: "#D4AF37", label: "Event" },
  council: { icon: "gavel", color: "#1B4D3E", label: "Council" },
  development: { icon: "building", color: "#1E4D8B", label: "Development" },
  urgent: { icon: "exclamation-circle", color: "#8B0000", label: "Urgent" },
};

const filters = ["all", "event", "council", "development", "urgent"] as const;

export default function AnnouncementsScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
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
      <View className="bg-green-deep py-16 md:py-20 px-4 md:px-8">
        <View className="max-w-4xl mx-auto items-center">
          <H1 className="text-white text-center mb-4">Council Announcements</H1>
          <Body className="text-white/90 text-center text-lg">
            Official news, resolutions, and updates from the Akuapem Traditional
            Council
          </Body>
        </View>
      </View>

      {/* Filters */}
      <Section background="warm">
        <View className="flex-row flex-wrap gap-2 justify-center">
          {filters.map((filter) => (
            <Pressable
              key={filter}
              onPress={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full min-h-[44px] justify-center ${
                activeFilter === filter
                  ? "bg-gold"
                  : "bg-white border border-brown-earth/20 hover:border-gold/40"
              }`}
            >
              <Body
                className={`capitalize ${
                  activeFilter === filter ? "text-white" : "text-gray-charcoal"
                }`}
              >
                {filter === "all" ? "All" : typeConfig[filter as keyof typeof typeConfig].label}
              </Body>
            </Pressable>
          ))}
        </View>
      </Section>

      {/* Announcements List */}
      <Section background="white">
        {isLoading ? (
          <LoadingState message="Loading announcements..." />
        ) : error ? (
          <ErrorState message="Failed to load announcements." onRetry={refetch} />
        ) : (
          <View className={isMobile ? "" : "flex-row gap-8"}>
            {/* Main Content */}
            <View className={isMobile ? "" : "flex-1"}>
              {/* Town Filter */}
              <TownFilterDropdown selectedTown={filterTown} onSelectTown={setFilterTown} />

              <View className="max-w-3xl">
                {filteredAnnouncements.map((announcement) => {
                  const config = typeConfig[announcement.type];
                  return (
                    <Card key={announcement.id} className="mb-4">
                      <CardContent>
                        {/* Type Badge */}
                        <View className="flex-row items-center gap-2 mb-3">
                          <View
                            className="px-3 py-1 rounded-full flex-row items-center gap-2"
                            style={{ backgroundColor: config.color + "15" }}
                          >
                            <FontAwesome
                              name={config.icon as any}
                              size={12}
                              color={config.color}
                            />
                            <Body
                              className="text-xs font-body-semibold uppercase"
                              style={{ color: config.color }}
                            >
                              {config.label}
                            </Body>
                          </View>
                          <Body className="text-sm text-gray-charcoal/50">
                            {new Date(announcement.date).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </Body>
                          {announcement.town_id && (
                            <View className="flex-row items-center gap-1">
                              <FontAwesome name="map-marker" size={10} color="#D4AF37" />
                              <Body className="text-xs text-gray-charcoal/50">
                                {getTownName(announcement.town_id)}
                              </Body>
                            </View>
                          )}
                        </View>

                        {/* Content */}
                        <H3 className="mb-2">{announcement.title}</H3>
                        <Body className="text-gray-charcoal/80">
                          {announcement.excerpt}
                        </Body>
                      </CardContent>
                      <CardFooter>
                        <Pressable className="flex-row items-center gap-2">
                          <Body className="text-gold font-body-semibold">
                            Read more
                          </Body>
                          <FontAwesome name="arrow-right" size={12} color="#D4AF37" />
                        </Pressable>
                      </CardFooter>
                    </Card>
                  );
                })}

                {filteredAnnouncements.length === 0 && (
                  <View className="py-12 items-center">
                    <FontAwesome name="inbox" size={48} color="#2C3E5030" />
                    <Body className="text-gray-charcoal/50 mt-4">
                      No announcements in this category
                    </Body>
                  </View>
                )}
              </View>
            </View>

            {/* Sidebar - Helpful Resources */}
            <View className={isMobile ? "mt-8" : "w-[300px]"}>
              <HelpfulResources />
            </View>
          </View>
        )}
      </Section>

      {/* Archive Link */}
      <Section background="warm">
        <View className="items-center">
          <Body className="text-gray-charcoal/70 mb-4">
            Looking for older announcements?
          </Body>
          <Pressable className="flex-row items-center gap-2">
            <FontAwesome name="archive" size={16} color="#1E4D8B" />
            <Body className="text-blue-heritage font-body-semibold">
              View Archive
            </Body>
          </Pressable>
        </View>
      </Section>
    </PageLayout>
  );
}
