import { View } from "react-native";
import Head from "expo-router/head";
import { PageLayout, Section } from "@/components/layout";
import { Hero, AnnouncementCard, QuickLinks, SubscribeCTA } from "@/components/home";
import { H2, Body } from "@/components/ui/Typography";
import { FadeIn } from "@/components/ui/FadeIn";
import { FontAwesome } from "@expo/vector-icons";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { LoadingState } from "@/components/ui/LoadingState";
import { paramountKing } from "@/constants/mockData";

export default function HomeScreen() {
  const { data: announcements, isLoading } = useAnnouncements();

  return (
    <PageLayout>
      <Head>
        <title>Akuapem Paramount King Council - Official Website</title>
        <meta name="description" content="Official website of the Akuapem Paramount King Council. Discover the heritage, leadership, and community of the Akuapem Traditional Area in Ghana's Eastern Region." />
        <meta property="og:title" content="Akuapem Paramount King Council - Official Website" />
        <meta property="og:description" content="Discover the heritage, leadership, and community of the Akuapem Traditional Area in Ghana's Eastern Region." />
      </Head>
      {/* Hero Section */}
      <Hero />

      {/* Welcome Message */}
      <Section background="white">
        <View className="md:flex-row gap-8 items-center">
          <View className="flex-1">
            <H2 className="mb-4">Welcome to the Akuapem Traditional Council</H2>
            <Body className="text-lg mb-4">
              The Akuapem Traditional Council serves as the custodian of our
              rich cultural heritage and the bridge between the government and
              our people.
            </Body>
            <Body>
              Under the leadership of {paramountKing.name}, the{" "}
              {paramountKing.title}, we continue to uphold the traditions of our
              ancestors while embracing progress and development for our
              communities.
            </Body>
          </View>
          {/* Image placeholder */}
          <View className="w-full md:w-80 h-64 bg-green-deep/5 rounded-xl items-center justify-center border border-green-deep/10">
            <View className="w-16 h-16 bg-green-deep/10 rounded-full items-center justify-center mb-3">
              <FontAwesome name="institution" size={28} color="#1B4D3E" />
            </View>
            <Body className="text-green-deep/60 font-body-semibold text-sm">Ahenfie (Royal Palace)</Body>
            <Body className="text-xs text-gray-charcoal/40 mt-1">Akropong-Akuapem</Body>
          </View>
        </View>
      </Section>

      {/* Quick Links */}
      <QuickLinks />

      {/* Latest Announcements */}
      <Section background="white">
        <H2 className="text-center mb-8">Latest Announcements</H2>
        <View className="max-w-2xl mx-auto">
          {isLoading ? (
            <LoadingState message="Loading announcements..." />
          ) : (
            (announcements ?? []).slice(0, 3).map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))
          )}
        </View>
      </Section>

      {/* Subscribe CTA */}
      <SubscribeCTA />

      {/* Council Stats */}
      <Section background="warm">
        <View className="flex-row flex-wrap justify-center gap-8 md:gap-16">
          <FadeIn delay={0}>
            <View className="items-center min-w-[150px]">
              <Body className="text-5xl font-heading-bold text-gold mb-2">17</Body>
              <Body className="text-gray-charcoal/70">Principal Towns</Body>
            </View>
          </FadeIn>
          <FadeIn delay={150}>
            <View className="items-center min-w-[150px]">
              <Body className="text-5xl font-heading-bold text-gold mb-2">100+</Body>
              <Body className="text-gray-charcoal/70">Years of Heritage</Body>
            </View>
          </FadeIn>
          <FadeIn delay={300}>
            <View className="items-center min-w-[150px]">
              <Body className="text-5xl font-heading-bold text-gold mb-2">1</Body>
              <Body className="text-gray-charcoal/70">United Kingdom</Body>
            </View>
          </FadeIn>
        </View>
      </Section>
    </PageLayout>
  );
}
