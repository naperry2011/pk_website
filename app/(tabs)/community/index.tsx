import { View, Pressable, useWindowDimensions } from "react-native";
import { Link } from "expo-router";
import Head from "expo-router/head";
import { PageLayout, Section } from "@/components/layout";
import { H1, H2, H3, Body } from "@/components/ui/Typography";
import { FontAwesome } from "@expo/vector-icons";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { useObituaries } from "@/hooks/useObituaries";
import { useWeddings } from "@/hooks/useWeddings";
import { useTowns } from "@/hooks/useTowns";
import { HelpfulResources } from "@/components/community";

export default function CommunityScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

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
      color: "#D4AF37",
    },
    {
      href: "/community/announcements",
      icon: "bullhorn",
      title: "Council Announcements",
      description: "Official news and updates",
      count: (announcements ?? []).length,
      color: "#1B4D3E",
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
      <View className="bg-green-deep py-16 md:py-20 px-4 md:px-8">
        <View className="max-w-4xl mx-auto items-center">
          <H1 className="text-white text-center mb-4">Community Updates</H1>
          <Body className="text-white/90 text-center text-lg">
            Stay connected with announcements, celebrations, and tributes from
            across Akuapem
          </Body>
        </View>
      </View>

      {/* Community Intro */}
      <Section background="warm">
        <View className="max-w-3xl mx-auto">
          <Body className="text-gray-charcoal text-center text-base leading-relaxed">
            Welcome to the Akuapem Community Hub — your central place for staying informed
            about life events across all 17 towns in the Akuapem Traditional Area. Here you
            can find funeral announcements, wedding celebrations, and official council news.
            Community members can also submit their own announcements for review and publication.
          </Body>
        </View>
      </Section>

      {/* Section Cards */}
      <Section background="white">
        <View
          className={`${
            isMobile ? "flex-col" : "flex-row"
          } gap-6 justify-center`}
        >
          {sections.map((section) => (
            <Link key={section.href} href={section.href as any} asChild>
              <Pressable
                className={`${
                  isMobile ? "w-full" : "flex-1 max-w-[350px]"
                } bg-white rounded-xl p-6 border border-brown-earth/10 hover:border-gold/30 hover:shadow-md active:bg-gray-warm`}
              >
                <View
                  className="w-16 h-16 rounded-full items-center justify-center mb-4"
                  style={{ backgroundColor: section.color + "20" }}
                >
                  <FontAwesome
                    name={section.icon as any}
                    size={28}
                    color={section.color}
                  />
                </View>
                <H3 className="mb-2">{section.title}</H3>
                <Body className="text-gray-charcoal/70 mb-4">
                  {section.description}
                </Body>
                <View className="flex-row items-center justify-between">
                  <Body className="text-sm text-gray-charcoal/50">
                    {section.count} recent
                  </Body>
                  <FontAwesome name="arrow-right" size={16} color="#D4AF37" />
                </View>
              </Pressable>
            </Link>
          ))}
        </View>
      </Section>

      {/* Recent Updates */}
      <Section background="warm">
        <View className="max-w-3xl mx-auto">
          <View className="items-center mb-10">
            <H2 className="text-center mb-2">Recent Updates</H2>
            <View className="w-16 h-1 bg-gold rounded-full mt-1" />
          </View>

          {!latestObituary && !latestWedding && !latestAnnouncement ? (
            <View className="bg-white rounded-2xl p-10 items-center border border-brown-earth/10">
              <View className="w-20 h-20 bg-gold/10 rounded-full items-center justify-center mb-5">
                <FontAwesome name="newspaper-o" size={36} color="#D4AF37" />
              </View>
              <H3 className="text-center mb-2">No Updates Yet</H3>
              <Body className="text-gray-charcoal/60 text-center max-w-md">
                Community updates will appear here as they are published. Check back soon for obituaries, wedding announcements, and council news.
              </Body>
            </View>
          ) : (
            <View className="gap-5">
              {/* Recent Obituary */}
              {latestObituary && (
                <View className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-brown-earth/5" style={{ borderLeftWidth: 4, borderLeftColor: "#8B0000" }}>
                  <View className="p-5">
                    <View className={`${isMobile ? "flex-col gap-3" : "flex-row items-start gap-4"}`}>
                      <View className="w-12 h-12 bg-red-kente/10 rounded-full items-center justify-center shrink-0">
                        <FontAwesome name="heart" size={20} color="#8B0000" />
                      </View>
                      <View className="flex-1">
                        <View className="flex-row items-center gap-2 mb-2 flex-wrap">
                          <View className="px-3 py-1 rounded-full" style={{ backgroundColor: "#8B000018" }}>
                            <Body className="text-xs font-body-semibold" style={{ color: "#8B0000" }}>Funeral</Body>
                          </View>
                          <View className="px-3 py-1 bg-gray-warm rounded-full flex-row items-center gap-1">
                            <FontAwesome name="calendar-o" size={10} color="#2C3E50" />
                            <Body className="text-xs text-gray-charcoal/70">
                              {new Date(latestObituary.funeral_date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
                            </Body>
                          </View>
                        </View>
                        <Body className="font-body-semibold text-base mb-1">{latestObituary.name}</Body>
                        <Body className="text-sm text-gray-charcoal/60">
                          <FontAwesome name="map-marker" size={12} color="#8B4513" /> {getTownName(latestObituary.town_id)}
                        </Body>
                      </View>
                      <Link href="/community/obituaries" asChild>
                        <Pressable className="flex-row items-center gap-1 px-3 py-2 rounded-lg hover:bg-red-kente/5 active:bg-red-kente/10">
                          <Body className="text-sm font-body-semibold" style={{ color: "#8B0000" }}>View All</Body>
                          <FontAwesome name="chevron-right" size={10} color="#8B0000" />
                        </Pressable>
                      </Link>
                    </View>
                  </View>
                </View>
              )}

              {/* Recent Wedding */}
              {latestWedding && (
                <View className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-brown-earth/5" style={{ borderLeftWidth: 4, borderLeftColor: "#D4AF37" }}>
                  <View className="p-5">
                    <View className={`${isMobile ? "flex-col gap-3" : "flex-row items-start gap-4"}`}>
                      <View className="w-12 h-12 bg-gold/10 rounded-full items-center justify-center shrink-0">
                        <FontAwesome name="bell" size={20} color="#D4AF37" />
                      </View>
                      <View className="flex-1">
                        <View className="flex-row items-center gap-2 mb-2 flex-wrap">
                          <View className="px-3 py-1 rounded-full" style={{ backgroundColor: "#D4AF3718" }}>
                            <Body className="text-xs font-body-semibold" style={{ color: "#B8960F" }}>Wedding</Body>
                          </View>
                          <View className="px-3 py-1 bg-gray-warm rounded-full flex-row items-center gap-1">
                            <FontAwesome name="calendar-o" size={10} color="#2C3E50" />
                            <Body className="text-xs text-gray-charcoal/70">
                              {new Date(latestWedding.date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
                            </Body>
                          </View>
                        </View>
                        <Body className="font-body-semibold text-base mb-1">
                          {latestWedding.bride} & {latestWedding.groom}
                        </Body>
                        <Body className="text-sm text-gray-charcoal/60">
                          <FontAwesome name="map-marker" size={12} color="#8B4513" /> {latestWedding.venue}
                        </Body>
                      </View>
                      <Link href="/community/weddings" asChild>
                        <Pressable className="flex-row items-center gap-1 px-3 py-2 rounded-lg hover:bg-gold/5 active:bg-gold/10">
                          <Body className="text-sm font-body-semibold" style={{ color: "#B8960F" }}>View All</Body>
                          <FontAwesome name="chevron-right" size={10} color="#B8960F" />
                        </Pressable>
                      </Link>
                    </View>
                  </View>
                </View>
              )}

              {/* Recent Announcement */}
              {latestAnnouncement && (
                <View className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-brown-earth/5" style={{ borderLeftWidth: 4, borderLeftColor: "#1B4D3E" }}>
                  <View className="p-5">
                    <View className={`${isMobile ? "flex-col gap-3" : "flex-row items-start gap-4"}`}>
                      <View className="w-12 h-12 bg-green-deep/10 rounded-full items-center justify-center shrink-0">
                        <FontAwesome name="bullhorn" size={20} color="#1B4D3E" />
                      </View>
                      <View className="flex-1">
                        <View className="flex-row items-center gap-2 mb-2 flex-wrap">
                          <View className="px-3 py-1 rounded-full" style={{ backgroundColor: "#1B4D3E18" }}>
                            <Body className="text-xs font-body-semibold" style={{ color: "#1B4D3E" }}>Announcement</Body>
                          </View>
                          <View className="px-3 py-1 bg-gray-warm rounded-full flex-row items-center gap-1">
                            <FontAwesome name="calendar-o" size={10} color="#2C3E50" />
                            <Body className="text-xs text-gray-charcoal/70">
                              {new Date(latestAnnouncement.date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
                            </Body>
                          </View>
                        </View>
                        <Body className="font-body-semibold text-base mb-1">
                          {latestAnnouncement.title}
                        </Body>
                      </View>
                      <Link href="/community/announcements" asChild>
                        <Pressable className="flex-row items-center gap-1 px-3 py-2 rounded-lg hover:bg-green-deep/5 active:bg-green-deep/10">
                          <Body className="text-sm font-body-semibold" style={{ color: "#1B4D3E" }}>View All</Body>
                          <FontAwesome name="chevron-right" size={10} color="#1B4D3E" />
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
            <View className="items-center mt-10">
              <Link href="/community/announcements" asChild>
                <Pressable className="bg-green-deep hover:bg-green-deep/90 active:bg-green-deep/80 px-8 py-4 rounded-xl flex-row items-center gap-3 shadow-sm hover:shadow-md">
                  <FontAwesome name="th-large" size={16} color="#FFFFFF" />
                  <Body className="text-white font-body-semibold text-base">See All Community Updates</Body>
                  <FontAwesome name="arrow-right" size={14} color="#D4AF37" />
                </Pressable>
              </Link>
            </View>
          )}
        </View>
      </Section>

      {/* Helpful Resources */}
      <Section background="white">
        <View className={`max-w-4xl mx-auto ${isMobile ? "" : "max-w-sm"}`}>
          <HelpfulResources />
        </View>
      </Section>
    </PageLayout>
  );
}
