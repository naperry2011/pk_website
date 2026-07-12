import { useState } from "react";
import { View, Text, Pressable, Platform, Image } from "react-native";
import { Link } from "expo-router";
import Head from "expo-router/head";
import { LinearGradient } from "expo-linear-gradient";
import { PageLayout, Section } from "@/components/layout";
import { useTowns } from "@/hooks/useTowns";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Display, Label, Body } from "@/components/ui/Typography";
import { useResponsive } from "@/hooks/useResponsive";

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

function TownTile({
  town,
  division,
  index,
  width,
}: {
  town: any;
  division: string;
  index: number;
  width: any;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <AnimateOnScroll delay={(index % 3) * 80} style={{ width }}>
      <Link href={`/towns/${town.id}`} asChild>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={`View ${town.name}, ${division} division`}
          onHoverIn={() => setHovered(true)}
          onHoverOut={() => setHovered(false)}
          style={isWeb ? ({ cursor: "pointer" } as any) : undefined}
        >
          <View
            className="relative overflow-hidden bg-ink-raised"
            style={{ aspectRatio: 4 / 5 }}
          >
            {town.image_url ? (
              <Image
                source={{ uri: town.image_url }}
                className="absolute inset-0 w-full h-full"
                resizeMode="cover"
                style={
                  isWeb
                    ? ({
                        transform: hovered ? "scale(1.03)" : "scale(1)",
                        transition:
                          "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
                      } as any)
                    : undefined
                }
              />
            ) : (
              <View className="absolute inset-0 items-center justify-center">
                <Text
                  className="font-display text-champagne/20"
                  style={{ fontSize: 200, lineHeight: 220 }}
                  accessibilityElementsHidden
                  importantForAccessibility="no"
                >
                  {town.name.charAt(0)}
                </Text>
              </View>
            )}

            {/* Bottom scrim + name bar — always visible */}
            <LinearGradient
              colors={["transparent", "rgba(11,15,13,0.95)"]}
              locations={[0.35, 1]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "55%",
              }}
            />
            <View className="absolute bottom-0 left-0 right-0 px-6 pb-6">
              <Text
                className={`font-display text-2xl mb-1 ${
                  hovered ? "text-champagne" : "text-ivory"
                }`}
                style={
                  isWeb ? ({ transition: "color 0.3s ease" } as any) : undefined
                }
              >
                {town.name}
              </Text>
              <Label className="text-[10px]">{division} Division</Label>
            </View>
          </View>
        </Pressable>
      </Link>
    </AnimateOnScroll>
  );
}

export default function TownsScreen() {
  const { isMobile, isTablet } = useResponsive();
  const { data: towns, isLoading, error, refetch } = useTowns();
  const [selectedDivision, setSelectedDivision] = useState<string>("All");

  const tileWidth = isMobile
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
    <PageLayout heroUnderHeader>
      <Head>
        <title>Towns & Communities - Akuapem Traditional Council</title>
        <meta name="description" content="Explore the 17 principal towns of the Akuapem Traditional Area including Akropong, Aburi, Mampong, Larteh, and more." />
        <meta property="og:title" content="Towns & Communities - Akuapem Traditional Council" />
        <meta property="og:description" content="Explore the 17 principal towns of the Akuapem Traditional Area." />
      </Head>

      {/* Intro band */}
      <View className="bg-ink px-[6%] pt-40 md:pt-56 pb-8 md:pb-12">
        <View className="max-w-[1280px] mx-auto w-full">
          <AnimateOnScroll variant="fade">
            <Label className="mb-6">Our Communities</Label>
            <Display className="mb-8" accessibilityLabel="Seventeen Towns">
              Seventeen{" "}
              <Text className="font-display-italic text-champagne">Towns</Text>
            </Display>
            <Body className="text-ivory/60 text-lg max-w-[520px]">
              From the foothills to the ridge of the Akuapem Range — each town
              with its own chief, traditions, and identity within the Akuapem
              state.
            </Body>
          </AnimateOnScroll>
        </View>
      </View>

      {/* Division filter — underline text tabs on a single hairline */}
      <View className="bg-ink px-[6%] pt-10 md:pt-16">
        <View className="max-w-[1280px] mx-auto w-full">
          <View
            className="flex-row flex-wrap border-b border-white/10"
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
                  className="relative pb-4 mr-8 md:mr-12"
                  style={
                    isWeb ? ({ cursor: "pointer" } as any) : undefined
                  }
                >
                  {({ hovered }: any) => (
                    <>
                      <Text
                        className={`font-body-medium text-label uppercase tracking-[3px] ${
                          selected
                            ? "text-champagne"
                            : hovered
                            ? "text-ivory"
                            : "text-ivory/40"
                        }`}
                        style={
                          isWeb
                            ? ({ transition: "color 0.25s ease" } as any)
                            : undefined
                        }
                      >
                        {division}
                      </Text>
                      {selected && (
                        <View
                          className="absolute bottom-0 left-0 right-0 bg-champagne"
                          style={{ height: 1, marginBottom: -0.5 }}
                        />
                      )}
                    </>
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>

      {/* Towns grid */}
      <Section background="ink" animate={false} className="pt-12 md:pt-16">
        {isLoading ? (
          <LoadingState message="Loading towns..." />
        ) : error ? (
          <ErrorState message="Failed to load towns." onRetry={refetch} />
        ) : (
          <View className={`gap-6 ${isMobile ? "" : "flex-row flex-wrap"}`}>
            {filteredTowns.map((town, index) => (
              <TownTile
                key={town.id}
                town={town}
                division={townDivisions[town.name] || "Gyase"}
                index={index}
                width={tileWidth}
              />
            ))}
          </View>
        )}
      </Section>

      {/* Territory — map in a hairline tile */}
      {isWeb && (
        <Section background="ink-raised" number="02" label="Territory" animate={false}>
          <AnimateOnScroll>
            <SectionHeading
              tone="dark"
              label="The Akuapem Ridge"
              title="Location & boundaries"
              subtitle="The traditional area spans the Akuapem South and Akuapem North districts of Ghana's Eastern Region, from the foothills to the ridge."
            />
            <View
              className="border border-white/10 p-2 md:p-3"
              style={{ height: 480 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63614.94!2d-0.1!3d5.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf834e45f6bbd7%3A0x3a10a41b21e4f06f!2sAkropong%2C%20Ghana!5e0!3m2!1sen!2sus!4v1710000000000"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(1) contrast(0.95)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map of Akuapem Traditional Area"
              />
            </View>
          </AnimateOnScroll>
        </Section>
      )}
    </PageLayout>
  );
}
