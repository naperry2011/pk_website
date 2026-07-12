import { View, Text, Pressable, Platform } from "react-native";
import { Link } from "expo-router";
import Head from "expo-router/head";
import { PageLayout, Section } from "@/components/layout";
import { FontAwesome } from "@expo/vector-icons";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { useObituaries } from "@/hooks/useObituaries";
import { useWeddings } from "@/hooks/useWeddings";
import { useTowns } from "@/hooks/useTowns";
import { HelpfulResources } from "@/components/community";
import { Body, BodyLarge, Display, Eyebrow } from "@/components/ui";
import { useResponsive } from "@/hooks/useResponsive";
import { theme } from "@/constants/theme";

const isWeb = Platform.OS === "web";

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

  const latestObituary = (obituaries ?? [])[0];
  const latestWedding = (weddings ?? [])[0];
  const latestAnnouncement = (announcements ?? [])[0];

  const sections = [
    {
      href: "/community/obituaries",
      icon: "heart" as const,
      eyebrow: "In Memoriam",
      title: "Obituaries",
      description: "Funeral announcements and tributes honoring departed members of the community.",
      count: (obituaries ?? []).length,
      latest: latestObituary ? latestObituary.name : null,
    },
    {
      href: "/community/weddings",
      icon: "bell" as const,
      eyebrow: "Celebrations",
      title: "Weddings",
      description: "Wedding announcements and celebrations of union from across the seventeen towns.",
      count: (weddings ?? []).length,
      latest: latestWedding ? `${latestWedding.bride} & ${latestWedding.groom}` : null,
    },
    {
      href: "/community/announcements",
      icon: "bullhorn" as const,
      eyebrow: "Official News",
      title: "Council Announcements",
      description: "Official news, resolutions, and updates from the Traditional Council.",
      count: (announcements ?? []).length,
      latest: latestAnnouncement ? latestAnnouncement.title : null,
    },
  ];

  return (
    <PageLayout>
      <Head>
        <title>Community Updates - Akuapem Paramount King Council</title>
        <meta name="description" content="Stay connected with community updates from across the Akuapem Traditional Area. View obituaries, wedding announcements, and official council news." />
        <meta property="og:title" content="Community Updates - Akuapem Paramount King Council" />
        <meta property="og:description" content="Community announcements, celebrations, and tributes from across the Akuapem Traditional Area." />
      </Head>

      {/* Page header band */}
      <Section background="green-dark" className="py-20 md:py-28">
        <View className="max-w-3xl mx-auto items-center">
          <Eyebrow className="mb-4 text-center">Community</Eyebrow>
          <Display className="text-white text-center mb-5">
            Community Updates
          </Display>
          <View className="w-16 h-[2px] bg-gold mb-6" />
          <BodyLarge className="text-white/80 text-center">
            Announcements, celebrations, and tributes from across the Akuapem
            Traditional Area
          </BodyLarge>
        </View>
      </Section>

      {/* Intro */}
      <Section background="cream" className="py-12 md:py-16">
        <View className="max-w-2xl mx-auto">
          <Body className="text-gray-muted text-center">
            Welcome to the Akuapem Community Hub — your central place for staying
            informed about life events across all 17 towns in the Akuapem
            Traditional Area. Community members may also submit their own
            announcements for review and publication.
          </Body>
        </View>
      </Section>

      {/* Editorial section cards */}
      <Section background="white">
        <View className={isMobile ? "gap-6" : "flex-row gap-8"}>
          {sections.map((section) => (
            <View key={section.href} className={isMobile ? undefined : "flex-1"}>
              <Link href={section.href as any} asChild>
                <Pressable
                  accessibilityRole="link"
                  accessibilityLabel={`${section.title}, ${section.count} recent`}
                  style={isWeb ? ({ cursor: "pointer", transition: "transform 0.25s ease, box-shadow 0.25s ease" } as any) : undefined}
                  className="rounded-xl overflow-hidden bg-white border border-gray-charcoal/10 hover:border-gold/40"
                >
                  {({ hovered }: any) => (
                    <>
                      {/* Media panel with dark overlay */}
                      <View className="h-52 bg-green-deep items-center justify-center relative overflow-hidden">
                        <View className="absolute inset-0 bg-green-dark/65" />
                        <FontAwesome
                          name={section.icon}
                          size={40}
                          color={theme.colors.goldAccent}
                          style={{ opacity: 0.85 }}
                        />
                        <View className="absolute bottom-0 left-0 right-0 px-6 pb-5">
                          <Text className="font-accent text-eyebrow uppercase tracking-widest text-gold mb-1">
                            {section.eyebrow}
                          </Text>
                          <Text
                            className={`font-heading-bold text-2xl ${hovered && isWeb ? "text-gold-light" : "text-white"}`}
                            style={isWeb ? ({ transition: "color 0.2s ease" } as any) : undefined}
                          >
                            {section.title}
                          </Text>
                        </View>
                      </View>

                      {/* Body */}
                      <View className="p-6">
                        <Body className="text-gray-muted mb-4">
                          {section.description}
                        </Body>
                        <View className="flex-row items-center justify-between pt-4 border-t border-gray-charcoal/10">
                          <Text className="font-body text-sm text-gray-muted">
                            {section.count} recent {section.count === 1 ? "entry" : "entries"}
                          </Text>
                          <View className="flex-row items-center gap-2">
                            <Text className="font-accent text-sm uppercase tracking-wide text-gold">
                              View
                            </Text>
                            <FontAwesome name="long-arrow-right" size={14} color={theme.colors.goldAccent} />
                          </View>
                        </View>
                      </View>
                    </>
                  )}
                </Pressable>
              </Link>
            </View>
          ))}
        </View>
      </Section>

      {/* Latest updates strip */}
      <Section background="warm">
        <View className="max-w-3xl mx-auto w-full">
          <View className="items-center mb-10">
            <Eyebrow className="mb-3 text-center">Latest</Eyebrow>
            <Text className="font-heading-bold text-h2 md:text-h2-desktop text-gray-charcoal text-center mb-4">
              Recent Updates
            </Text>
            <View className="w-16 h-[2px] bg-gold" />
          </View>

          {!latestObituary && !latestWedding && !latestAnnouncement ? (
            <View className="bg-white rounded-xl border border-gray-charcoal/10 items-center p-10">
              <FontAwesome name="newspaper-o" size={32} color={theme.colors.goldAccent} />
              <Text className="font-heading text-h3 text-gray-charcoal mt-4 mb-2 text-center">
                No Updates Yet
              </Text>
              <Body className="text-gray-muted text-center max-w-md">
                Community updates will appear here as they are published. Check
                back soon for obituaries, wedding announcements, and council news.
              </Body>
            </View>
          ) : (
            <View className="bg-white rounded-xl border border-gray-charcoal/10 px-6 md:px-8">
              {latestObituary && (
                <Link href="/community/obituaries" asChild>
                  <Pressable
                    accessibilityRole="link"
                    accessibilityLabel={`Latest obituary: ${latestObituary.name}. View all obituaries`}
                    className="py-5 border-b border-gray-charcoal/10 flex-row items-center gap-4"
                    style={isWeb ? ({ cursor: "pointer" } as any) : undefined}
                  >
                    <View className="flex-1">
                      <Text className="font-accent text-xs uppercase tracking-widest text-gray-muted mb-1">
                        In Memoriam · {getTownName(latestObituary.town_id)}
                      </Text>
                      <Text className="font-heading text-lg text-gray-charcoal">
                        {latestObituary.name}
                      </Text>
                      <Text className="font-body text-sm text-gray-muted mt-1">
                        Funeral: {new Date(latestObituary.funeral_date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
                      </Text>
                    </View>
                    <FontAwesome name="long-arrow-right" size={14} color={theme.colors.mutedText} />
                  </Pressable>
                </Link>
              )}

              {latestWedding && (
                <Link href="/community/weddings" asChild>
                  <Pressable
                    accessibilityRole="link"
                    accessibilityLabel={`Latest wedding: ${latestWedding.bride} and ${latestWedding.groom}. View all weddings`}
                    className="py-5 border-b border-gray-charcoal/10 flex-row items-center gap-4"
                    style={isWeb ? ({ cursor: "pointer" } as any) : undefined}
                  >
                    <View className="flex-1">
                      <Text className="font-accent text-xs uppercase tracking-widest text-gold mb-1">
                        Wedding · {latestWedding.venue}
                      </Text>
                      <Text className="font-heading text-lg text-gray-charcoal">
                        {latestWedding.bride} & {latestWedding.groom}
                      </Text>
                      <Text className="font-body text-sm text-gray-muted mt-1">
                        {new Date(latestWedding.date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
                      </Text>
                    </View>
                    <FontAwesome name="long-arrow-right" size={14} color={theme.colors.goldAccent} />
                  </Pressable>
                </Link>
              )}

              {latestAnnouncement && (
                <Link href="/community/announcements" asChild>
                  <Pressable
                    accessibilityRole="link"
                    accessibilityLabel={`Latest announcement: ${latestAnnouncement.title}. View all announcements`}
                    className="py-5 flex-row items-center gap-4"
                    style={isWeb ? ({ cursor: "pointer" } as any) : undefined}
                  >
                    <View className="flex-1">
                      <Text className="font-accent text-xs uppercase tracking-widest text-gold mb-1">
                        Council Announcement
                      </Text>
                      <Text className="font-heading text-lg text-gray-charcoal">
                        {latestAnnouncement.title}
                      </Text>
                      <Text className="font-body text-sm text-gray-muted mt-1">
                        {new Date(latestAnnouncement.date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
                      </Text>
                    </View>
                    <FontAwesome name="long-arrow-right" size={14} color={theme.colors.goldAccent} />
                  </Pressable>
                </Link>
              )}
            </View>
          )}
        </View>
      </Section>

      {/* Helpful Resources */}
      <Section background="white">
        <View className="max-w-md mx-auto w-full">
          <HelpfulResources />
        </View>
      </Section>
    </PageLayout>
  );
}
