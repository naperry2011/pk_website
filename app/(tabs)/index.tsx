import { View, Text, Pressable, Image, Platform } from "react-native";
import { Link, useRouter } from "expo-router";
import Head from "expo-router/head";
import { PageLayout, Section } from "@/components/layout";
import { Hero, AnnouncementCard, QuickLinks, SubscribeCTA, StatsSection, ImageCarousel } from "@/components/home";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { LoadingState } from "@/components/ui/LoadingState";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button, Eyebrow, H2, Body } from "@/components/ui";
import { useResponsive } from "@/hooks/useResponsive";
import { paramountKing } from "@/constants/mockData";

const isWeb = Platform.OS === "web";

export default function HomeScreen() {
  const { data: announcements, isLoading } = useAnnouncements();
  const { isMobile } = useResponsive();
  const router = useRouter();

  const latest = (announcements ?? []).slice(0, 4);

  return (
    <PageLayout>
      <Head>
        <title>Akuapem Traditional Council - Official Website</title>
        <meta name="description" content="Official website of the Akuapem Traditional Council. Discover the heritage, leadership, and community of the Akuapem Traditional Area in Ghana's Eastern Region." />
        <meta property="og:title" content="Akuapem Traditional Council - Official Website" />
        <meta property="og:description" content="Discover the heritage, leadership, and community of the Akuapem Traditional Area in Ghana's Eastern Region." />
        <meta property="og:type" content="website" />
      </Head>

      {/* Hero Section */}
      <Hero />

      {/* Image Carousel */}
      <ImageCarousel />

      {/* Welcome / Introduction Section */}
      <Section background="white">
        <View className={`items-center ${isMobile ? "flex-col gap-10" : "flex-row gap-16"}`}>
          {/* Image column with offset gold frame */}
          <View className={isMobile ? "w-full" : "flex-[55]"}>
            <View className="relative" style={{ paddingBottom: 12, paddingRight: 12 }}>
              {/* Offset gold frame behind the photo */}
              <View
                className="absolute border-2 border-gold rounded-xl"
                style={{ top: 12, left: 12, right: 0, bottom: 0 }}
              />
              <View className="rounded-xl overflow-hidden">
                <Image
                  source={require("@/assets/images/hero/akuapem-heritage.jpg")}
                  style={{ width: "100%", height: isMobile ? 300 : 450 }}
                  resizeMode="cover"
                  accessibilityLabel="Akuapem chiefs and community gathered together"
                />
              </View>
            </View>
          </View>

          {/* Text column */}
          <View className={isMobile ? "w-full" : "flex-[45]"}>
            <Eyebrow className="mb-3">Welcome</Eyebrow>
            <H2 className="mb-5">The Custodians of Akuapem Heritage</H2>
            <Body className="text-gray-muted mb-4">
              The Akuapem Traditional Council serves as the custodian of our
              rich cultural heritage and the bridge between the government and
              our people.
            </Body>
            <Body className="text-gray-muted mb-8">
              Under the leadership of {paramountKing.name}, the{" "}
              {paramountKing.title}, we continue to uphold the traditions of
              our ancestors while embracing progress for our communities.
            </Body>
            <View className="self-start">
              <Button
                title="Meet the Council"
                variant="outline"
                onPress={() => router.push("/about")}
              />
            </View>
          </View>
        </View>
      </Section>

      {/* Stats Section */}
      <StatsSection />

      {/* Quick Links */}
      <QuickLinks />

      {/* Latest Announcements */}
      <Section background="white" animate={false}>
        <SectionHeading
          label="LATEST NEWS"
          title="Announcements"
          subtitle="Stay informed with the latest news from the Council."
        />

        {isLoading ? (
          <LoadingState message="Loading announcements..." />
        ) : (
          <>
            {/* Newsroom-style list rows */}
            <View className="w-full max-w-3xl mx-auto border-t border-gray-charcoal/10">
              {latest.map((announcement, index) => (
                <AnimateOnScroll key={announcement.id} delay={index * 100}>
                  <AnnouncementCard
                    announcement={announcement}
                    isLast={index === latest.length - 1}
                  />
                </AnimateOnScroll>
              ))}
            </View>

            <View className="items-center mt-10">
              <Link href="/community/announcements" asChild>
                <Pressable
                  className="self-center"
                  style={({ hovered }: any) => [
                    isWeb
                      ? ({ cursor: "pointer", transition: "opacity 0.2s ease" } as any)
                      : null,
                    isWeb && hovered ? { opacity: 0.8 } : null,
                  ]}
                  accessibilityRole="link"
                >
                  <Text className="font-body-semibold text-base text-gold">
                    View All Announcements →
                  </Text>
                </Pressable>
              </Link>
            </View>
          </>
        )}
      </Section>

      {/* Subscribe CTA */}
      <SubscribeCTA />
    </PageLayout>
  );
}
