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
        <H2 className="text-center mb-8">Recent Updates</H2>

        <View className="max-w-3xl mx-auto">
          {/* Recent Obituary */}
          {latestObituary && (
            <View className="bg-white rounded-xl p-4 mb-4 flex-row items-center gap-4">
              <View className="w-12 h-12 bg-red-kente/10 rounded-full items-center justify-center">
                <FontAwesome name="heart" size={20} color="#8B0000" />
              </View>
              <View className="flex-1">
                <Body className="font-body-semibold">{latestObituary.name}</Body>
                <Body className="text-sm text-gray-charcoal/70">
                  Funeral: {new Date(latestObituary.funeral_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} • {getTownName(latestObituary.town_id)}
                </Body>
              </View>
            </View>
          )}

          {/* Recent Wedding */}
          {latestWedding && (
            <View className="bg-white rounded-xl p-4 mb-4 flex-row items-center gap-4">
              <View className="w-12 h-12 bg-gold/10 rounded-full items-center justify-center">
                <FontAwesome name="bell" size={20} color="#D4AF37" />
              </View>
              <View className="flex-1">
                <Body className="font-body-semibold">
                  {latestWedding.bride} & {latestWedding.groom}
                </Body>
                <Body className="text-sm text-gray-charcoal/70">
                  {new Date(latestWedding.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} • {latestWedding.venue}
                </Body>
              </View>
            </View>
          )}

          {/* Recent Announcement */}
          {latestAnnouncement && (
            <View className="bg-white rounded-xl p-4 flex-row items-center gap-4">
              <View className="w-12 h-12 bg-green-deep/10 rounded-full items-center justify-center">
                <FontAwesome name="bullhorn" size={20} color="#1B4D3E" />
              </View>
              <View className="flex-1">
                <Body className="font-body-semibold">
                  {latestAnnouncement.title}
                </Body>
                <Body className="text-sm text-gray-charcoal/70">
                  {new Date(latestAnnouncement.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </Body>
              </View>
            </View>
          )}
        </View>
      </Section>
    </PageLayout>
  );
}
