import { View, Pressable, useWindowDimensions, Platform } from "react-native";
import { Link } from "expo-router";
import Head from "expo-router/head";
import { PageLayout, Section } from "@/components/layout";
import { H1, H3, Body } from "@/components/ui/Typography";
import { FontAwesome } from "@expo/vector-icons";
import { useTowns } from "@/hooks/useTowns";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";

export default function TownsScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const { data: towns, isLoading, error, refetch } = useTowns();

  return (
    <PageLayout>
      <Head>
        <title>Towns & Communities - Akuapem Paramount King Council</title>
        <meta name="description" content="Explore the 17 principal towns of the Akuapem Traditional Area including Akropong, Aburi, Mampong, Larteh, and more. Learn about the chiefs, history, and culture of each town." />
        <meta property="og:title" content="Towns & Communities - Akuapem Paramount King Council" />
        <meta property="og:description" content="Explore the 17 principal towns of the Akuapem Traditional Area." />
      </Head>
      {/* Hero */}
      <View className="bg-green-deep py-16 md:py-20 px-4 md:px-8">
        <View className="max-w-4xl mx-auto items-center">
          <H1 className="text-white text-center mb-4">Towns & Communities</H1>
          <Body className="text-white/90 text-center text-lg">
            Explore the 17 principal towns of the Akuapem Traditional Area
          </Body>
        </View>
      </View>

      {/* Location & Boundaries */}
      <Section background="warm">
        <View className="max-w-4xl mx-auto">
          <View className="md:flex-row gap-6 md:gap-10 mb-10">
            {/* Location Info */}
            <View className="flex-1">
              <View className="flex-row items-center gap-3 mb-3">
                <View className="w-10 h-10 bg-green-deep/10 rounded-full items-center justify-center">
                  <FontAwesome name="globe" size={18} color="#1B4D3E" />
                </View>
                <H3>Location & Boundaries</H3>
              </View>
              <Body className="text-lg mb-4">
                The Akuapem Traditional Area spans from the foothills to the ridge of the Akuapem Range in the Eastern Region of Ghana.
              </Body>
            </View>

            {/* District Info */}
            <View className="flex-1">
              <View className="flex-row items-center gap-3 mb-3">
                <View className="w-10 h-10 bg-green-deep/10 rounded-full items-center justify-center">
                  <FontAwesome name="institution" size={16} color="#1B4D3E" />
                </View>
                <H3>Districts</H3>
              </View>
              <Body className="text-lg mb-4">
                The traditional area forms part of the Akuapem South and Akuapem North districts.
              </Body>
            </View>
          </View>

          {/* Map */}
          <H3 className="mb-3 text-center">Map of Akuapem Traditional Area</H3>
          {Platform.OS === "web" ? (
            <View className="h-96 rounded-xl overflow-hidden border border-green-deep/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63614.94!2d-0.1!3d5.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf834e45f6bbd7%3A0x3a10a41b21e4f06f!2sAkropong%2C%20Ghana!5e0!3m2!1sen!2sus!4v1710000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map of Akuapem Traditional Area"
              />
            </View>
          ) : (
            <View className="h-96 bg-gray-warm rounded-xl items-center justify-center border-2 border-dashed border-green-deep/20">
              <View className="w-20 h-20 bg-green-deep/10 rounded-full items-center justify-center mb-4">
                <FontAwesome name="map-marker" size={36} color="#1B4D3E" />
              </View>
              <Body className="text-gray-charcoal/60 text-center px-4">
                Map available on web version
              </Body>
            </View>
          )}
        </View>
      </Section>

      {/* Towns Grid */}
      <Section background="white">
        {isLoading ? (
          <LoadingState message="Loading towns..." />
        ) : error ? (
          <ErrorState message="Failed to load towns." onRetry={refetch} />
        ) : (
          <View
            className={`${
              isMobile ? "flex-col" : "flex-row flex-wrap"
            } gap-4 justify-center`}
          >
            {(towns ?? []).map((town) => (
              <Link key={town.id} href={`/towns/${town.id}`} asChild>
                <Pressable
                  className={`${
                    isMobile ? "w-full" : "w-[280px]"
                  } bg-white rounded-xl overflow-hidden border border-brown-earth/10 hover:border-gold/30 hover:shadow-md active:bg-gray-warm`}
                >
                  {/* Town Image Placeholder */}
                  <View className="h-40 bg-green-deep/5 items-center justify-center">
                    <View className="w-14 h-14 bg-green-deep/10 rounded-full items-center justify-center mb-2">
                      <FontAwesome name="home" size={22} color="#1B4D3E" />
                    </View>
                    <Body className="text-xs text-green-deep/50">{town.name}</Body>
                  </View>
                  <View className="p-4">
                    <H3 className="mb-1">{town.name}</H3>
                    <Body className="text-sm text-gray-charcoal/70 mb-2">
                      {town.chief}
                    </Body>
                    <View className="flex-row items-center gap-1">
                      <FontAwesome name="arrow-right" size={12} color="#D4AF37" />
                      <Body className="text-gold text-sm">Learn more</Body>
                    </View>
                  </View>
                </Pressable>
              </Link>
            ))}
          </View>
        )}
      </Section>

    </PageLayout>
  );
}
