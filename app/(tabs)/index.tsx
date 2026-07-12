import { View, Text, Image, Platform } from "react-native";
import { useRouter } from "expo-router";
import Head from "expo-router/head";
import { PageLayout, Section } from "@/components/layout";
import {
  Hero,
  Marquee,
  AnnouncementCard,
  QuickLinks,
  SubscribeCTA,
  StatsSection,
} from "@/components/home";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { LoadingState } from "@/components/ui/LoadingState";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Button, BodyLarge } from "@/components/ui";
import { useResponsive } from "@/hooks/useResponsive";
import { paramountKing } from "@/constants/mockData";

const isWeb = Platform.OS === "web";

export default function HomeScreen() {
  const { data: announcements, isLoading } = useAnnouncements();
  const { isMobile } = useResponsive();
  const router = useRouter();

  const latest = announcements ?? [];
  const featured = latest[0];
  const rest = latest.slice(1, 4);

  return (
    <PageLayout heroUnderHeader>
      <Head>
        <title>Akuapem Traditional Council - Official Website</title>
        <meta name="description" content="Official website of the Akuapem Traditional Council. Discover the heritage, leadership, and community of the Akuapem Traditional Area in Ghana's Eastern Region." />
        <meta property="og:title" content="Akuapem Traditional Council - Official Website" />
        <meta property="og:description" content="Discover the heritage, leadership, and community of the Akuapem Traditional Area in Ghana's Eastern Region." />
        <meta property="og:type" content="website" />
      </Head>

      {/* Cinematic full-viewport hero */}
      <Hero />

      {/* Marquee of the 17 principal towns */}
      <Marquee />

      {/* 01 — The Council: asymmetric split */}
      <Section background="ink" number="01" label="The Council">
        <View className={isMobile ? "flex-col gap-14" : "flex-row gap-20"}>
          {/* Left: large intro copy */}
          <View className={isMobile ? "w-full" : "flex-[55]"}>
            <BodyLarge className="text-ivory/80 text-xl md:text-2xl leading-relaxed mb-8">
              The Akuapem Traditional Council is the custodian of a living
              heritage — the bridge between government and the people of the
              ridge, from Akropong to the farthest of the seventeen towns.
            </BodyLarge>
            <BodyLarge className="text-ivory/60 mb-12">
              Under the leadership of {paramountKing.name}, the{" "}
              {paramountKing.title} and {paramountKing.lineage.toLowerCase()},
              the Council upholds the traditions of the ancestors while
              building a prosperous future for every community it serves.
            </BodyLarge>
            <View className="self-start">
              <Button
                title="Meet the Council"
                variant="link-arrow"
                onPress={() => router.push("/about")}
              />
            </View>
          </View>

          {/* Right: offset portrait, breaking section rhythm on desktop */}
          <View
            className={isMobile ? "w-full" : "flex-[40]"}
            style={!isMobile ? { marginTop: -96 } : undefined}
          >
            <AnimateOnScroll variant="fade-up" delay={150}>
              <View
                className="overflow-hidden"
                style={
                  isWeb
                    ? ({
                        filter: "grayscale(100%)",
                        transition: "filter 0.8s ease",
                      } as any)
                    : undefined
                }
                // @ts-expect-error web-only hover handlers on View
                onMouseEnter={
                  isWeb
                    ? (e: any) => {
                        e.currentTarget.style.filter = "grayscale(0%)";
                      }
                    : undefined
                }
                onMouseLeave={
                  isWeb
                    ? (e: any) => {
                        e.currentTarget.style.filter = "grayscale(100%)";
                      }
                    : undefined
                }
              >
                <Image
                  source={require("@/assets/images/about/okuapehene-portrait.jpg")}
                  style={{ width: "100%", height: isMobile ? 420 : 560 }}
                  resizeMode="cover"
                  accessibilityLabel={`Portrait of ${paramountKing.name}, the ${paramountKing.title}`}
                />
              </View>
              <Text className="font-body-medium text-label uppercase tracking-[3px] text-ivory/40 mt-4">
                {paramountKing.name} — {paramountKing.title}
              </Text>
            </AnimateOnScroll>
          </View>
        </View>
      </Section>

      {/* Hairline-bounded stats row */}
      <StatsSection />

      {/* 02 — Latest from the Council */}
      <Section background="ink" number="02" label="Latest from the Council" animate={false}>
        {isLoading ? (
          <LoadingState message="Loading announcements..." />
        ) : (
          <>
            {featured && (
              <AnimateOnScroll>
                <View className="mb-2">
                  <AnnouncementCard announcement={featured} featured />
                </View>
              </AnimateOnScroll>
            )}

            <View className="w-full border-t border-white/10">
              {rest.map((announcement, index) => (
                <AnimateOnScroll key={announcement.id} delay={index * 100}>
                  <AnnouncementCard
                    announcement={announcement}
                    isLast={index === rest.length - 1}
                  />
                </AnimateOnScroll>
              ))}
            </View>

            <View className="self-start mt-12">
              <Button
                title="All announcements"
                variant="link-arrow"
                onPress={() => router.push("/community/announcements")}
              />
            </View>
          </>
        )}
      </Section>

      {/* 03 — Explore */}
      <Section background="ink" number="03" label="Explore">
        <QuickLinks />
      </Section>

      {/* Ivory contrast band */}
      <SubscribeCTA />
    </PageLayout>
  );
}
