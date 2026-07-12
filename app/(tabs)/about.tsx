import { View, Text, Image, Platform } from "react-native";
import Head from "expo-router/head";
import { LinearGradient } from "expo-linear-gradient";
import { PageLayout, Section } from "@/components/layout";
import { paramountKing, councilHistory } from "@/constants/mockData";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import {
  Display,
  Title,
  Label,
  Body,
  Accent,
} from "@/components/ui/Typography";
import { tokens } from "@/constants/tokens";
import { useResponsive } from "@/hooks/useResponsive";

const isWeb = Platform.OS === "web";

const STRUCTURE = [
  {
    rank: "Omanhene",
    title: "The Paramount Chief",
    description:
      "Occupant of the Ofori Kuma stool and president of the Traditional Council.",
  },
  {
    rank: "Divisional Chiefs",
    title: "Seventeen Divisions",
    description:
      "Custodians of the towns of Akuapem, each governing under the paramount stool.",
  },
  {
    rank: "Queen Mothers",
    title: "Mothers of the State",
    description:
      "Guardians of lineage and custom, with the authority to nominate heirs to the stool.",
  },
  {
    rank: "Elders",
    title: "Council of Elders",
    description:
      "Advisors on chieftaincy, land, development, and cultural affairs.",
  },
];

export default function AboutScreen() {
  const { isMobile } = useResponsive();

  // Break history text into paragraphs
  const historyText = councilHistory.summary;
  const midPoint =
    historyText.indexOf(". ", Math.floor(historyText.length / 2)) + 2;
  const historyParagraphs = [
    historyText.substring(0, midPoint),
    historyText.substring(midPoint),
  ];

  return (
    <PageLayout heroUnderHeader>
      <Head>
        <title>About the Council - Akuapem Traditional Council</title>
        <meta name="description" content="Learn about the history, leadership, and structure of the Akuapem Traditional Council." />
        <meta property="og:title" content="About the Council - Akuapem Traditional Council" />
        <meta property="og:description" content="Learn about the history, leadership, and structure of the Akuapem Traditional Council." />
      </Head>

      {/* Cinematic sub-hero — full-bleed image, ink gradient, huge Fraunces */}
      <View
        className="relative overflow-hidden justify-end"
        style={{ height: isWeb ? ("70vh" as any) : 520, minHeight: 480 }}
      >
        <Image
          source={require("@/assets/images/about/historic-monument.jpg")}
          className="absolute inset-0 w-full h-full"
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />
        <LinearGradient
          colors={["rgba(11,15,13,0.35)", "rgba(11,15,13,0.15)", tokens.colors.ink]}
          locations={[0, 0.45, 1]}
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        />
        <View className="px-[6%] pb-16 md:pb-24 w-full">
          <View className="max-w-[1280px] mx-auto w-full">
            <AnimateOnScroll variant="fade">
              <Label className="mb-6">The Council</Label>
              <Display accessibilityLabel="About the Council">
                About the{" "}
                <Text className="font-display-italic text-champagne">
                  Council
                </Text>
              </Display>
            </AnimateOnScroll>
          </View>
        </View>
      </View>

      {/* 01 — History: asymmetric image / text splits */}
      <Section background="ink" number="01" label="History" animate={false}>
        <AnimateOnScroll>
          <View
            className={`gap-10 md:gap-20 ${isMobile ? "" : "flex-row items-center"}`}
          >
            <View className={isMobile ? "w-full" : "flex-[5]"}>
              <View className="relative overflow-hidden">
                <Image
                  source={require("@/assets/images/about/historic-monument.jpg")}
                  style={{ width: "100%", height: isMobile ? 320 : 520 }}
                  resizeMode="cover"
                  accessibilityLabel="Historic monument of the Akuapem Traditional Area"
                />
                <LinearGradient
                  colors={["transparent", tokens.colors.ink]}
                  start={{ x: 0.4, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    right: 0,
                    width: "45%",
                    opacity: 0.9,
                  }}
                />
              </View>
            </View>
            <View className={isMobile ? "w-full" : "flex-[6]"}>
              <Title className="mb-8">Centuries of heritage</Title>
              <Body className="text-ivory/80 text-lg leading-8 max-w-[560px]">
                {historyParagraphs[0]}
              </Body>
            </View>
          </View>
        </AnimateOnScroll>

        {/* Second block — reversed */}
        <AnimateOnScroll>
          <View
            className={`mt-20 md:mt-32 gap-10 md:gap-20 ${
              isMobile ? "" : "flex-row-reverse items-center"
            }`}
          >
            <View className={isMobile ? "w-full" : "flex-[5]"}>
              <View
                className="bg-ink-raised items-center justify-center overflow-hidden"
                style={{ height: isMobile ? 320 : 520 }}
              >
                <Text
                  className="font-display text-champagne/20"
                  style={{ fontSize: isMobile ? 160 : 260, lineHeight: isMobile ? 180 : 280 }}
                  accessibilityElementsHidden
                  importantForAccessibility="no"
                >
                  O
                </Text>
                <Label className="text-ivory/40 absolute bottom-8">
                  Odwira Festival
                </Label>
              </View>
            </View>
            <View className={isMobile ? "w-full" : "flex-[6]"}>
              <Title className="mb-8">Bridging past and future</Title>
              <Body className="text-ivory/80 text-lg leading-8 max-w-[560px] mb-12">
                {historyParagraphs[1]}
              </Body>

              {/* Founded / headquarters — hairline facts */}
              <View className="border-t border-white/10">
                <View className="flex-row items-baseline justify-between py-5 border-b border-white/10">
                  <Label className="text-ivory/40">Founded</Label>
                  <Text className="font-display text-ivory text-xl">
                    {councilHistory.founded}
                  </Text>
                </View>
                <View className="flex-row items-baseline justify-between py-5 border-b border-white/10">
                  <Label className="text-ivory/40">Headquarters</Label>
                  <Text className="font-display text-ivory text-xl">
                    {councilHistory.headquarters}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </AnimateOnScroll>
      </Section>

      {/* 02 — Governance: hairline structure list */}
      <Section background="ink-raised" number="02" label="Governance" animate={false}>
        <AnimateOnScroll>
          <Title className="mb-4 max-w-[700px]">
            One stool,{" "}
            <Text className="font-display-italic text-champagne">
              seventeen towns
            </Text>
          </Title>
          <Body className="text-ivory/60 max-w-[560px] mb-16">
            The council is led by the Omanhene, supported by divisional chiefs,
            queen mothers, and elders in an unbroken order of custom.
          </Body>
        </AnimateOnScroll>

        <View className="border-t border-white/10">
          {STRUCTURE.map((row, i) => (
            <AnimateOnScroll key={row.rank} delay={i * 80}>
              <View
                className={`py-8 md:py-10 border-b border-white/10 gap-4 ${
                  isMobile ? "" : "flex-row items-baseline"
                }`}
              >
                <View className={isMobile ? "" : "w-[280px]"}>
                  <Label>{row.rank}</Label>
                </View>
                <View className="flex-1">
                  <Text className="font-display text-ivory text-2xl md:text-3xl mb-2">
                    {row.title}
                  </Text>
                  <Body className="text-ivory/60">{row.description}</Body>
                </View>
              </View>
            </AnimateOnScroll>
          ))}
        </View>
      </Section>

      {/* 03 — The Okuapehene: full-bleed portrait band */}
      <View className="bg-ink px-[6%] pt-20 md:pt-32">
        <View className="max-w-[1280px] mx-auto w-full flex-row items-baseline gap-4 border-t border-white/10 pt-4 pb-10 md:pb-16">
          <Text className="font-display text-base text-champagne">03</Text>
          <Text className="font-body-medium text-label uppercase tracking-[3px] text-ivory/50">
            The Okuapehene
          </Text>
        </View>
      </View>

      <View className="relative bg-ink overflow-hidden">
        {isMobile ? (
          <View className="relative" style={{ height: 440 }}>
            <Image
              source={require("@/assets/images/about/okuapehene-portrait.jpg")}
              className="absolute inset-0 w-full h-full"
              resizeMode="cover"
              accessibilityLabel={`Portrait of ${paramountKing.name}`}
            />
            <LinearGradient
              colors={["transparent", tokens.colors.ink]}
              locations={[0.45, 1]}
              style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
            />
          </View>
        ) : (
          <Image
            source={require("@/assets/images/about/okuapehene-portrait.jpg")}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              width: "58%",
            }}
            resizeMode="cover"
            accessibilityLabel={`Portrait of ${paramountKing.name}`}
          />
        )}
        {!isMobile && (
          <LinearGradient
            colors={[tokens.colors.ink, tokens.colors.ink, "rgba(11,15,13,0)"]}
            locations={[0, 0.45, 0.8]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
          />
        )}

        <View
          className="px-[6%] py-16 md:py-40"
          style={!isMobile ? { minHeight: 680, justifyContent: "center" } : undefined}
        >
          <View className="max-w-[1280px] mx-auto w-full">
            <AnimateOnScroll>
              <View style={{ maxWidth: isMobile ? undefined : 520 }}>
                <Title className="mb-3">{paramountKing.name}</Title>
                <Accent className="text-xl mb-2">{paramountKing.title}</Accent>
                <Body className="text-ivory/50 mb-10">
                  {paramountKing.lineage} · President, Akuapem Traditional
                  Council
                </Body>
                <Body className="text-ivory/70 leading-8 mb-12">
                  {paramountKing.biography}
                </Body>
                <View className="flex-row items-baseline justify-between py-5 border-t border-b border-white/10">
                  <Label className="text-ivory/40">Enstooled</Label>
                  <Text className="font-display text-ivory text-xl">
                    {new Date(paramountKing.enstoolmentDate).toLocaleDateString(
                      "en-GB",
                      { day: "numeric", month: "long", year: "numeric" }
                    )}
                  </Text>
                </View>
              </View>
            </AnimateOnScroll>
          </View>
        </View>
      </View>
    </PageLayout>
  );
}
