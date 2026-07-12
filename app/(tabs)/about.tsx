import { View, Image } from "react-native";
import Head from "expo-router/head";
import { PageLayout, Section } from "@/components/layout";
import { FontAwesome } from "@expo/vector-icons";
import { paramountKing, councilHistory } from "@/constants/mockData";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import {
  Display,
  Eyebrow,
  H2,
  H3,
  Body,
  BodyLarge,
  Accent,
} from "@/components/ui/Typography";
import { theme } from "@/constants/theme";
import { tokens } from "@/constants/tokens";
import { useResponsive } from "@/hooks/useResponsive";

/** Photo with an offset gold hairline frame sitting behind it. */
function FramedImage({
  source,
  placeholderLabel,
  heightClass,
}: {
  source?: any;
  placeholderLabel?: string;
  heightClass: string;
}) {
  return (
    <View className="relative mr-3 mb-3">
      <View
        className="absolute top-3 left-3 -right-3 -bottom-3 border-2 border-gold rounded-xl"
        pointerEvents="none"
      />
      <View className="rounded-xl overflow-hidden">
        {source ? (
          <Image
            source={source}
            className={`w-full ${heightClass}`}
            resizeMode="cover"
          />
        ) : (
          <PlaceholderImage height={320} label={placeholderLabel} borderRadius={12} />
        )}
      </View>
    </View>
  );
}

export default function AboutScreen() {
  const { isMobile } = useResponsive();

  // Break history text into paragraphs
  const historyText = councilHistory.summary;
  const midPoint = historyText.indexOf(". ", Math.floor(historyText.length / 2)) + 2;
  const historyParagraphs = [
    historyText.substring(0, midPoint),
    historyText.substring(midPoint),
  ];

  const historyBlocks = [
    {
      eyebrow: "Our History",
      title: "Centuries of Heritage",
      body: historyParagraphs[0],
      image: require("@/assets/images/about/historic-monument.jpg"),
    },
    {
      eyebrow: "Continuity",
      title: "Bridging Past and Future",
      body: historyParagraphs[1],
      image: null,
      placeholderLabel: "Odwira Festival",
    },
  ];

  return (
    <PageLayout>
      <Head>
        <title>About the Council - Akuapem Traditional Council</title>
        <meta name="description" content="Learn about the history, leadership, and structure of the Akuapem Traditional Council." />
        <meta property="og:title" content="About the Council - Akuapem Traditional Council" />
        <meta property="og:description" content="Learn about the history, leadership, and structure of the Akuapem Traditional Council." />
      </Head>

      {/* Editorial page header — image band with green-dark scrim */}
      <View className="relative overflow-hidden">
        <Image
          source={require("@/assets/images/about/historic-monument.jpg")}
          className="absolute inset-0 w-full h-full"
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />
        <View className="absolute inset-0 bg-green-dark/80" />
        <View className="py-20 md:py-32 px-[8%]">
          <View className="max-w-7xl mx-auto w-full items-center">
            <Eyebrow className="mb-4">About Us</Eyebrow>
            <Display className="text-white text-center mb-4">
              About the Council
            </Display>
            <BodyLarge className="text-white/85 text-center max-w-2xl">
              Discover the rich history and leadership of the Akuapem
              Traditional Council
            </BodyLarge>
          </View>
        </View>
      </View>

      {/* History — alternating editorial blocks */}
      <Section background="white" animate={false}>
        <View className="gap-16 md:gap-24">
          {historyBlocks.map((block, i) => (
            <AnimateOnScroll key={block.title}>
              <View
                className={`items-center gap-10 md:gap-16 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <View className="flex-1 w-full">
                  <FramedImage
                    source={block.image}
                    placeholderLabel={block.placeholderLabel}
                    heightClass={isMobile ? "h-[280px]" : "h-[400px]"}
                  />
                </View>
                <View className="flex-1 w-full">
                  <Eyebrow className="mb-3">{block.eyebrow}</Eyebrow>
                  <H2 className="mb-5">{block.title}</H2>
                  <Body className="text-gray-muted">{block.body}</Body>
                </View>
              </View>
            </AnimateOnScroll>
          ))}
        </View>

        {/* Founded / headquarters — Cinzel accent facts */}
        <AnimateOnScroll>
          <View className="md:flex-row justify-center gap-8 md:gap-24 mt-16 md:mt-24 border-t border-gold/30 pt-10">
            <View className="items-center">
              <Eyebrow className="mb-2">Founded</Eyebrow>
              <Accent className="text-gray-charcoal text-xl">
                {councilHistory.founded}
              </Accent>
            </View>
            <View className="items-center">
              <Eyebrow className="mb-2">Headquarters</Eyebrow>
              <Accent className="text-gray-charcoal text-xl">
                {councilHistory.headquarters}
              </Accent>
            </View>
          </View>
        </AnimateOnScroll>
      </Section>

      {/* Our Structure */}
      <Section background="warm">
        <View className="items-center mb-10">
          <Eyebrow className="mb-3">Governance</Eyebrow>
          <H2 className="text-center mb-5">Our Structure</H2>
          <Body className="text-gray-muted text-center max-w-xl">
            The council is led by the Omanhene (Paramount Chief), supported by
            17 divisional and sub-divisional chiefs, queen mothers, and elders.
          </Body>
        </View>

        {/* Visual Hierarchy */}
        <View className="items-center">
          <View className="bg-gold py-4 px-8 rounded-xl shadow-md">
            <Body className="text-white font-body-semibold text-lg text-center">
              Omanhene
            </Body>
            <Body className="text-white/85 text-sm text-center">
              Paramount Chief
            </Body>
          </View>

          <View className="w-0.5 h-8 bg-gold" />

          <View className={`gap-4 ${isMobile ? "items-center" : "flex-row"}`}>
            <View className="bg-green-deep py-3.5 px-6 rounded-xl shadow-sm">
              <Body className="text-white font-body-semibold text-center">
                Divisional Chiefs
              </Body>
            </View>
            <View className="bg-green-deep py-3.5 px-6 rounded-xl shadow-sm">
              <Body className="text-white font-body-semibold text-center">
                Queen Mothers
              </Body>
            </View>
          </View>

          <View className="w-0.5 h-8 bg-gold" />

          <View className="bg-blue-heritage py-3.5 px-6 rounded-xl shadow-sm">
            <Body className="text-white font-body-semibold text-center">
              Elders
            </Body>
          </View>

          <View className="w-0.5 h-8 bg-gold" />

          <View
            className={`gap-3 justify-center ${
              isMobile ? "items-center" : "flex-row flex-wrap"
            }`}
          >
            {["Chieftaincy", "Land", "Development", "Cultural Affairs"].map(
              (committee) => (
                <View
                  key={committee}
                  className="bg-white border-2 border-gold py-3.5 px-5 rounded-xl"
                >
                  <Body className="text-gold font-body-semibold text-center">
                    {committee}
                  </Body>
                </View>
              )
            )}
          </View>
        </View>
      </Section>

      {/* Leadership — royal portrait */}
      <Section background="cream">
        <View className={`items-center gap-10 md:gap-16 ${isMobile ? "" : "flex-row"}`}>
          {/* Portrait with gold hairline frame */}
          <View className="flex-1 w-full">
            <View className="border border-gold rounded-xl p-2 bg-white">
              <View className="rounded-lg overflow-hidden">
                <Image
                  source={require("@/assets/images/about/okuapehene-portrait.jpg")}
                  className={`w-full ${isMobile ? "h-[350px]" : "h-[480px]"}`}
                  resizeMode="cover"
                  accessibilityLabel={`Portrait of ${paramountKing.name}`}
                />
              </View>
            </View>
          </View>

          {/* Bio */}
          <View className="flex-1 w-full">
            <Eyebrow className="mb-3">Okuapehene</Eyebrow>
            <Accent className="text-gray-charcoal text-2xl md:text-3xl mb-2">
              {paramountKing.name}
            </Accent>
            <Accent className="text-gold-muted text-base mb-4">
              President, Akuapem Traditional Council
            </Accent>
            <View className="w-16 h-0.5 bg-gold mb-5" />
            <Body className="text-gray-muted mb-4">
              {paramountKing.biography}
            </Body>
            <View className="bg-gray-warm py-3 px-5 rounded-lg self-start mt-2 border border-gold/20">
              <Eyebrow className="text-xs mb-1">Enstooled</Eyebrow>
              <Body className="font-body-semibold">
                {new Date(paramountKing.enstoolmentDate).toLocaleDateString(
                  "en-GB",
                  { day: "numeric", month: "long", year: "numeric" }
                )}
              </Body>
            </View>
          </View>
        </View>
      </Section>

      {/* Our Role, Vision & Mission */}
      <Section background="warm">
        <View className="items-center mb-10">
          <Eyebrow className="mb-3">Our Purpose</Eyebrow>
          <H2 className="text-center">Role, Vision & Mission</H2>
        </View>

        <View className={`gap-6 ${isMobile ? "" : "flex-row"}`}>
          <AnimateOnScroll delay={0} style={{ flex: isMobile ? undefined : 1 }}>
            <View className="flex-1 bg-white rounded-xl border border-gold/20 p-7 items-center">
              <View className="w-14 h-14 rounded-full bg-green-deep/10 items-center justify-center mb-4">
                <FontAwesome
                  name="balance-scale"
                  size={24}
                  color={theme.colors.primaryGreen}
                />
              </View>
              <H3 className="text-center mb-3">Our Role</H3>
              <Body className="text-gray-muted text-center text-sm leading-6">
                The governing traditional institution responsible for
                installation of chiefs, dispute resolution, land
                administration, and unifying all towns under its jurisdiction.
              </Body>
            </View>
          </AnimateOnScroll>

          <AnimateOnScroll delay={100} style={{ flex: isMobile ? undefined : 1 }}>
            <View className="flex-1 bg-white rounded-xl border border-gold/20 p-7 items-center">
              <View className="w-14 h-14 rounded-full bg-gold/10 items-center justify-center mb-4">
                <FontAwesome name="eye" size={24} color={theme.colors.goldAccent} />
              </View>
              <H3 className="text-center mb-3">Our Vision</H3>
              <Body className="text-gray-muted text-center text-sm leading-6">
                To preserve and promote our cultural identity, peace, and unity
                while fostering development and progress for future generations.
              </Body>
            </View>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200} style={{ flex: isMobile ? undefined : 1 }}>
            <View className="flex-1 bg-white rounded-xl border border-gold/20 p-7 items-center">
              <View className="w-14 h-14 rounded-full bg-blue-heritage/10 items-center justify-center mb-4">
                <FontAwesome
                  name="flag"
                  size={24}
                  color={tokens.colors.blueHeritage}
                />
              </View>
              <H3 className="text-center mb-3">Our Mission</H3>
              <View className="gap-2">
                {[
                  "Uphold customs and traditions",
                  "Promote peaceful coexistence and justice",
                  "Collaborate with government and stakeholders for community development",
                ].map((item) => (
                  <View key={item} className="flex-row items-start gap-2">
                    <View className="w-2 h-2 rounded-full bg-gold mt-1.5" />
                    <Body className="flex-1 text-gray-muted text-sm leading-6">
                      {item}
                    </Body>
                  </View>
                ))}
              </View>
            </View>
          </AnimateOnScroll>
        </View>
      </Section>
    </PageLayout>
  );
}
