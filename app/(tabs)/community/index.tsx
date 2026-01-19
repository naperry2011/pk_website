import { View, Pressable, useWindowDimensions } from "react-native";
import { Link } from "expo-router";
import { PageLayout, Section } from "@/components/layout";
import { H1, H2, H3, Body } from "@/components/ui/Typography";
import { FontAwesome } from "@expo/vector-icons";
import { obituaries, weddings, announcements, getTownName } from "@/constants/mockData";

const sections = [
  {
    href: "/community/obituaries",
    icon: "heart",
    title: "Obituaries",
    description: "Funeral announcements and tributes",
    count: obituaries.length,
    color: "#8B0000",
  },
  {
    href: "/community/weddings",
    icon: "bell",
    title: "Weddings",
    description: "Wedding announcements and celebrations",
    count: weddings.length,
    color: "#D4AF37",
  },
  {
    href: "/community/announcements",
    icon: "bullhorn",
    title: "Council Announcements",
    description: "Official news and updates",
    count: announcements.length,
    color: "#1B4D3E",
  },
];

export default function CommunityScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <PageLayout>
      {/* Hero */}
      <View className="bg-green-deep py-16 px-4">
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
                } bg-white rounded-xl p-6 border border-brown-earth/10 active:bg-gray-warm`}
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
          {obituaries[0] && (
            <View className="bg-white rounded-xl p-4 mb-4 flex-row items-center gap-4">
              <View className="w-12 h-12 bg-red-kente/10 rounded-full items-center justify-center">
                <FontAwesome name="heart" size={20} color="#8B0000" />
              </View>
              <View className="flex-1">
                <Body className="font-body-semibold">{obituaries[0].name}</Body>
                <Body className="text-sm text-gray-charcoal/70">
                  Funeral: {obituaries[0].funeralDate} • {getTownName(obituaries[0].townId)}
                </Body>
              </View>
            </View>
          )}

          {/* Recent Wedding */}
          {weddings[0] && (
            <View className="bg-white rounded-xl p-4 mb-4 flex-row items-center gap-4">
              <View className="w-12 h-12 bg-gold/10 rounded-full items-center justify-center">
                <FontAwesome name="bell" size={20} color="#D4AF37" />
              </View>
              <View className="flex-1">
                <Body className="font-body-semibold">
                  {weddings[0].bride} & {weddings[0].groom}
                </Body>
                <Body className="text-sm text-gray-charcoal/70">
                  {weddings[0].date} • {weddings[0].venue}
                </Body>
              </View>
            </View>
          )}

          {/* Recent Announcement */}
          {announcements[0] && (
            <View className="bg-white rounded-xl p-4 flex-row items-center gap-4">
              <View className="w-12 h-12 bg-green-deep/10 rounded-full items-center justify-center">
                <FontAwesome name="bullhorn" size={20} color="#1B4D3E" />
              </View>
              <View className="flex-1">
                <Body className="font-body-semibold">
                  {announcements[0].title}
                </Body>
                <Body className="text-sm text-gray-charcoal/70">
                  {announcements[0].date}
                </Body>
              </View>
            </View>
          )}
        </View>
      </Section>
    </PageLayout>
  );
}
