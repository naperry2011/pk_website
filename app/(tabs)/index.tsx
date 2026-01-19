import { View } from "react-native";
import { PageLayout, Section } from "@/components/layout";
import { Hero, AnnouncementCard, QuickLinks, SubscribeCTA } from "@/components/home";
import { H2, Body } from "@/components/ui/Typography";
import { announcements, paramountKing } from "@/constants/mockData";

export default function HomeScreen() {
  return (
    <PageLayout>
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
          <View className="w-full md:w-80 h-64 bg-gray-warm rounded-xl items-center justify-center">
            <Body className="text-gray-charcoal/50">Council Image</Body>
          </View>
        </View>
      </Section>

      {/* Quick Links */}
      <QuickLinks />

      {/* Latest Announcements */}
      <Section background="white">
        <H2 className="text-center mb-8">Latest Announcements</H2>
        <View className="max-w-2xl mx-auto">
          {announcements.slice(0, 3).map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </View>
      </Section>

      {/* Subscribe CTA */}
      <SubscribeCTA />

      {/* Council Stats */}
      <Section background="warm">
        <View className="flex-row flex-wrap justify-center gap-8">
          <View className="items-center min-w-[150px]">
            <Body className="text-5xl font-heading-bold text-gold mb-2">17</Body>
            <Body className="text-gray-charcoal/70">Principal Towns</Body>
          </View>
          <View className="items-center min-w-[150px]">
            <Body className="text-5xl font-heading-bold text-gold mb-2">100+</Body>
            <Body className="text-gray-charcoal/70">Years of Heritage</Body>
          </View>
          <View className="items-center min-w-[150px]">
            <Body className="text-5xl font-heading-bold text-gold mb-2">1</Body>
            <Body className="text-gray-charcoal/70">United Kingdom</Body>
          </View>
        </View>
      </Section>
    </PageLayout>
  );
}
