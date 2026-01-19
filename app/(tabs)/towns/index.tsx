import { View, Pressable, useWindowDimensions } from "react-native";
import { Link } from "expo-router";
import { PageLayout, Section } from "@/components/layout";
import { H1, H3, Body } from "@/components/ui/Typography";
import { Card, CardContent } from "@/components/ui/Card";
import { FontAwesome } from "@expo/vector-icons";
import { towns } from "@/constants/mockData";

export default function TownsScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <PageLayout>
      {/* Hero */}
      <View className="bg-green-deep py-16 px-4">
        <View className="max-w-4xl mx-auto items-center">
          <H1 className="text-white text-center mb-4">Towns & Communities</H1>
          <Body className="text-white/90 text-center text-lg">
            Explore the 17 principal towns of the Akuapem Traditional Area
          </Body>
        </View>
      </View>

      {/* Towns Grid */}
      <Section background="white">
        <View
          className={`${
            isMobile ? "flex-col" : "flex-row flex-wrap"
          } gap-4 justify-center`}
        >
          {towns.map((town) => (
            <Link key={town.id} href={`/towns/${town.id}`} asChild>
              <Pressable
                className={`${
                  isMobile ? "w-full" : "w-[280px]"
                } bg-white rounded-xl overflow-hidden border border-brown-earth/10 active:bg-gray-warm`}
              >
                {/* Image placeholder */}
                <View className="h-40 bg-gray-warm items-center justify-center">
                  <FontAwesome name="image" size={40} color="#2C3E5050" />
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
      </Section>

      {/* Map Section Placeholder */}
      <Section background="warm">
        <H3 className="text-center mb-6">Akuapem Ridge Map</H3>
        <View className="h-80 bg-white rounded-xl items-center justify-center border border-brown-earth/20">
          <FontAwesome name="map" size={60} color="#2C3E5030" />
          <Body className="text-gray-charcoal/50 mt-4">
            Interactive map coming soon
          </Body>
        </View>
      </Section>
    </PageLayout>
  );
}
