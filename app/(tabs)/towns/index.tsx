import { View, Pressable, useWindowDimensions } from "react-native";
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

      {/* Map Section Placeholder */}
      <Section background="warm">
        <H3 className="text-center mb-6">Akuapem Ridge Map</H3>
        <View className="h-80 bg-green-deep/5 rounded-xl items-center justify-center border-2 border-dashed border-green-deep/20">
          <View className="w-16 h-16 bg-green-deep/10 rounded-full items-center justify-center mb-4">
            <FontAwesome name="map" size={28} color="#1B4D3E" />
          </View>
          <Body className="font-body-semibold text-green-deep mb-1">
            Map Coming Soon
          </Body>
          <Body className="text-sm text-gray-charcoal/60 text-center px-4">
            An interactive map of the Akuapem Ridge and its 17 principal towns is being developed.
          </Body>
        </View>
      </Section>
    </PageLayout>
  );
}
