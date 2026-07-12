import { View, Text, Pressable, Platform } from "react-native";
import { Link } from "expo-router";
import Head from "expo-router/head";
import { PageLayout, Section } from "@/components/layout";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { useObituaries } from "@/hooks/useObituaries";
import { useWeddings } from "@/hooks/useWeddings";
import { HelpfulResources } from "@/components/community";
import { BodyLarge, Display, Label, Title, AnimateOnScroll } from "@/components/ui";
import { useResponsive } from "@/hooks/useResponsive";

const isWeb = Platform.OS === "web";

export default function CommunityScreen() {
  const { isMobile } = useResponsive();

  const { data: obituaries } = useObituaries({ status: "approved" });
  const { data: weddings } = useWeddings({ status: "approved" });
  const { data: announcements } = useAnnouncements();

  const sections = [
    {
      href: "/community/obituaries",
      index: "01",
      title: "Obituaries",
      description: "Tributes honoring departed members of the community.",
      count: (obituaries ?? []).length,
      muted: true,
    },
    {
      href: "/community/weddings",
      index: "02",
      title: "Weddings",
      description: "Celebrations of union from across the seventeen towns.",
      count: (weddings ?? []).length,
      muted: false,
    },
    {
      href: "/community/announcements",
      index: "03",
      title: "Announcements",
      description: "Official news and resolutions from the Traditional Council.",
      count: (announcements ?? []).length,
      muted: false,
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

      {/* Page title band */}
      <Section background="ink" className="pb-10 md:pb-16">
        <View className="max-w-4xl">
          <Label className="mb-6">Community</Label>
          <Display className="mb-8">Life of the Kingdom</Display>
          <BodyLarge className="text-ivory/60 max-w-xl">
            Announcements, celebrations, and tributes from across the seventeen
            towns of the Akuapem Traditional Area.
          </BodyLarge>
        </View>
      </Section>

      {/* Index bands */}
      <Section background="ink" className="pt-0 md:pt-0">
        <View className="border-b border-white/10">
          {sections.map((section, i) => (
            <AnimateOnScroll key={section.href} delay={i * 120}>
              <Link href={section.href as any} asChild>
                <Pressable
                  accessibilityRole="link"
                  accessibilityLabel={`${section.title}, ${section.count} recent entries`}
                  className="border-t border-white/10"
                  style={
                    isWeb
                      ? ({
                          cursor: "pointer",
                          transition: "background-color 0.35s ease",
                        } as any)
                      : undefined
                  }
                >
                  {({ hovered }: any) => (
                    <View
                      className={`py-12 md:py-16 px-2 md:px-6 min-h-[160px] md:min-h-[200px] ${
                        isMobile ? "" : "flex-row items-center"
                      } ${hovered && isWeb ? "bg-ink-raised" : ""}`}
                      style={
                        isWeb
                          ? ({ transition: "background-color 0.35s ease" } as any)
                          : undefined
                      }
                    >
                      {/* Left: index + title + description */}
                      <View className={isMobile ? "mb-8" : "flex-1 flex-row items-start gap-8"}>
                        <Text
                          className={`font-display text-base mb-4 ${
                            section.muted ? "text-ivory/40" : "text-champagne"
                          }`}
                        >
                          {section.index}
                        </Text>
                        <View className="flex-1">
                          <Title className="mb-3">{section.title}</Title>
                          <Text className="font-body text-base text-ivory/50 max-w-md">
                            {section.description}
                          </Text>
                        </View>
                      </View>

                      {/* Right: live count + arrow */}
                      <View className={`flex-row items-center ${isMobile ? "justify-between" : "gap-10 md:gap-16"}`}>
                        <Text className="font-display text-6xl md:text-8xl text-ivory/30">
                          {section.count}
                        </Text>
                        <Text
                          className={`text-2xl ${
                            hovered && isWeb
                              ? section.muted
                                ? "text-ivory"
                                : "text-champagne"
                              : "text-ivory/40"
                          }`}
                          style={
                            isWeb
                              ? ({
                                  transition: "transform 0.3s ease, color 0.3s ease",
                                  transform: hovered
                                    ? "translateX(8px)"
                                    : "translateX(0)",
                                } as any)
                              : undefined
                          }
                        >
                          →
                        </Text>
                      </View>
                    </View>
                  )}
                </Pressable>
              </Link>
            </AnimateOnScroll>
          ))}
        </View>
      </Section>

      {/* Helpful Resources */}
      <Section background="ink-raised" number="02" label="Guidance">
        <View className="max-w-xl">
          <HelpfulResources />
        </View>
      </Section>
    </PageLayout>
  );
}
