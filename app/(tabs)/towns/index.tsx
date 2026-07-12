import { useState } from "react";
import { View, Pressable, Platform, Image } from "react-native";
import { Link } from "expo-router";
import Head from "expo-router/head";
import { PageLayout, Section } from "@/components/layout";
import { FontAwesome } from "@expo/vector-icons";
import { useTowns } from "@/hooks/useTowns";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  Display,
  Eyebrow,
  H3,
  Body,
  BodyLarge,
} from "@/components/ui/Typography";
import { theme } from "@/constants/theme";
import { tokens } from "@/constants/tokens";
import { useResponsive } from "@/hooks/useResponsive";

// Division colors for town badges
const divisionColors: Record<string, { bg: string; text: string }> = {
  Benkum: { bg: tokens.colors.greenDeep, text: tokens.colors.white },
  Nifa: { bg: tokens.colors.gold, text: tokens.colors.white },
  Adonten: { bg: tokens.colors.blueHeritage, text: tokens.colors.white },
  Kyidom: { bg: tokens.colors.redKente, text: tokens.colors.white },
  Gyase: { bg: "#6B3FA0", text: tokens.colors.white },
};

const DIVISIONS = ["Benkum", "Nifa", "Adonten", "Kyidom", "Gyase"] as const;

// Map town names to divisions (to be verified by site owner)
const townDivisions: Record<string, string> = {
  Akropong: "Gyase",
  Abiriw: "Benkum",
  Amanokrom: "Nifa",
  Awukugua: "Benkum",
  Berekuso: "Adonten",
  Tutu: "Nifa",
  Mamfe: "Adonten",
  Larteh: "Benkum",
  Adukrom: "Kyidom",
  Mampong: "Nifa",
  Obosomase: "Kyidom",
  Apirede: "Benkum",
  Aseseeso: "Adonten",
  Dawu: "Nifa",
  Koforidua: "Adonten",
  Nsawam: "Kyidom",
  Suhum: "Kyidom",
};

const isWeb = Platform.OS === "web";

export default function TownsScreen() {
  const { isMobile, isTablet } = useResponsive();
  const { data: towns, isLoading, error, refetch } = useTowns();
  const [selectedDivision, setSelectedDivision] = useState<string>("All");

  const getColumnCount = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  const cardWidth = isMobile
    ? ("100%" as const)
    : isTablet
    ? ("calc(50% - 12px)" as any)
    : ("calc(33.333% - 16px)" as any);

  const filteredTowns = (towns ?? []).filter(
    (town) =>
      selectedDivision === "All" ||
      (townDivisions[town.name] || "Gyase") === selectedDivision
  );

  return (
    <PageLayout>
      <Head>
        <title>Towns & Communities - Akuapem Traditional Council</title>
        <meta name="description" content="Explore the 17 principal towns of the Akuapem Traditional Area including Akropong, Aburi, Mampong, Larteh, and more." />
        <meta property="og:title" content="Towns & Communities - Akuapem Traditional Council" />
        <meta property="og:description" content="Explore the 17 principal towns of the Akuapem Traditional Area." />
      </Head>

      {/* Hero */}
      <View className="bg-green-dark py-20 md:py-28 px-[8%]">
        <View className="max-w-7xl mx-auto w-full items-center">
          <Eyebrow className="mb-4">Our Communities</Eyebrow>
          <Display className="text-white text-center mb-4">
            Towns & Communities
          </Display>
          <BodyLarge className="text-white/85 text-center max-w-2xl">
            Explore the 17 principal towns of the Akuapem Traditional Area
          </BodyLarge>
        </View>
      </View>

      {/* Location & Boundaries */}
      <Section background="warm" animate={false}>
        <View className={`gap-8 mb-10 ${isMobile ? "" : "flex-row"}`}>
          <View className="flex-1">
            <View className="w-10 h-10 bg-green-deep/10 rounded-full items-center justify-center mb-3">
              <FontAwesome name="globe" size={18} color={theme.colors.primaryGreen} />
            </View>
            <H3 className="mb-2">Location & Boundaries</H3>
            <Body className="text-gray-muted">
              The Akuapem Traditional Area spans from the foothills to the ridge
              of the Akuapem Range in the Eastern Region of Ghana.
            </Body>
          </View>
          <View className="flex-1">
            <View className="w-10 h-10 bg-green-deep/10 rounded-full items-center justify-center mb-3">
              <FontAwesome name="institution" size={16} color={theme.colors.primaryGreen} />
            </View>
            <H3 className="mb-2">Districts</H3>
            <Body className="text-gray-muted">
              The traditional area forms part of the Akuapem South and Akuapem
              North districts.
            </Body>
          </View>
        </View>

        {/* Map */}
        {isWeb && (
          <AnimateOnScroll>
            <H3 className="text-center mb-4">Map of Akuapem Traditional Area</H3>
            <View className="h-96 rounded-xl overflow-hidden border border-green-deep/15">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63614.94!2d-0.1!3d5.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf834e45f6bbd7%3A0x3a10a41b21e4f06f!2sAkropong%2C%20Ghana!5e0!3m2!1sen!2sus!4v1710000000000"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: 12 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map of Akuapem Traditional Area"
              />
            </View>
          </AnimateOnScroll>
        )}
      </Section>

      {/* Towns Grid */}
      <Section background="white" animate={false}>
        <SectionHeading
          label="THE 17 TOWNS"
          title="Our Principal Towns"
          subtitle="Each town has its own chief, traditions, and unique identity within the Akuapem state."
        />

        {/* Division filter chips */}
        <View
          className="flex-row flex-wrap justify-center gap-3 mb-10"
          accessibilityRole="tablist"
        >
          {["All", ...DIVISIONS].map((division) => {
            const selected = selectedDivision === division;
            return (
              <Pressable
                key={division}
                onPress={() => setSelectedDivision(division)}
                accessibilityRole="tab"
                accessibilityState={{ selected }}
                accessibilityLabel={`Filter towns by ${division}`}
                className={`py-2 px-5 rounded-full border ${
                  selected
                    ? "bg-gold border-gold"
                    : "bg-white border-gold/40"
                }`}
                style={isWeb ? ({ transition: "all 0.2s ease", cursor: "pointer" } as any) : undefined}
              >
                <Body
                  className={`font-accent uppercase tracking-widest text-xs ${
                    selected ? "text-white" : "text-gray-charcoal"
                  }`}
                >
                  {division}
                </Body>
              </Pressable>
            );
          })}
        </View>

        {isLoading ? (
          <LoadingState message="Loading towns..." />
        ) : error ? (
          <ErrorState message="Failed to load towns." onRetry={refetch} />
        ) : (
          <View
            className={`gap-6 justify-center ${
              isMobile ? "" : "flex-row flex-wrap"
            }`}
          >
            {filteredTowns.map((town, index) => {
              const division = townDivisions[town.name] || "Gyase";
              const divColor = divisionColors[division] || divisionColors.Gyase;

              return (
                <AnimateOnScroll
                  key={town.id}
                  delay={(index % getColumnCount()) * 100}
                  style={{ width: cardWidth }}
                >
                  <Link href={`/towns/${town.id}`} asChild>
                    <Pressable
                      accessibilityRole="link"
                      accessibilityLabel={`View ${town.name}, ${division} division`}
                      className="rounded-xl overflow-hidden"
                      style={({ hovered }: any) => [
                        isWeb &&
                          ({
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            cursor: "pointer",
                          } as any),
                        hovered && {
                          transform: [{ translateY: -6 }],
                          boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.15)",
                        },
                      ]}
                    >
                      <View className="relative h-64">
                        {/* Photo or division-tinted placeholder */}
                        {(town as any).image_url ? (
                          <Image
                            source={{ uri: (town as any).image_url }}
                            className="absolute inset-0 w-full h-full"
                            resizeMode="cover"
                          />
                        ) : (
                          <PlaceholderImage
                            height={256}
                            label={town.name}
                            style={{ backgroundColor: divColor.bg }}
                          />
                        )}

                        {/* Dark overlay footer */}
                        <View className="absolute bottom-0 left-0 right-0 bg-green-dark/80 px-4 py-3 flex-row items-center justify-between">
                          <View className="flex-1 mr-2">
                            <Body className="font-heading-bold text-white text-lg">
                              {town.name}
                            </Body>
                            <Body className="text-white/70 text-xs" numberOfLines={1}>
                              {town.chief}
                            </Body>
                          </View>
                          <View
                            className="py-1 px-2.5 rounded-full"
                            style={{ backgroundColor: divColor.bg }}
                          >
                            <Body
                              className="font-accent uppercase tracking-widest text-[10px]"
                              style={{ color: divColor.text }}
                            >
                              {division}
                            </Body>
                          </View>
                        </View>
                      </View>
                    </Pressable>
                  </Link>
                </AnimateOnScroll>
              );
            })}
          </View>
        )}
      </Section>
    </PageLayout>
  );
}
