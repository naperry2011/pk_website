import { View, useWindowDimensions } from "react-native";
import Head from "expo-router/head";
import { PageLayout, Section } from "@/components/layout";
import { H1, H2, H3, Body, Accent } from "@/components/ui/Typography";
import { Card, CardContent } from "@/components/ui/Card";
import { FontAwesome } from "@expo/vector-icons";
import { paramountKing, councilHistory } from "@/constants/mockData";

export default function AboutScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <PageLayout>
      <Head>
        <title>About the Council - Akuapem Paramount King Council</title>
        <meta name="description" content="Learn about the history, leadership, and structure of the Akuapem Traditional Council. Meet the Okuapehene and the divisional chiefs of the 17 principal towns." />
        <meta property="og:title" content="About the Council - Akuapem Paramount King Council" />
        <meta property="og:description" content="Learn about the history, leadership, and structure of the Akuapem Traditional Council." />
      </Head>
      {/* Hero */}
      <View className="bg-green-deep py-16 md:py-20 px-4 md:px-8">
        <View className="max-w-4xl mx-auto items-center">
          <H1 className="text-white text-center mb-4">About the Council</H1>
          <Body className="text-white/90 text-center text-lg">
            Discover the rich history and leadership of the Akuapem Traditional
            Council
          </Body>
        </View>
      </View>

      {/* History Section */}
      <Section background="white">
        <H2 className="mb-6">Our History</H2>
        <Body className="text-base mb-4">{councilHistory.summary}</Body>
        <View className="flex-row flex-wrap gap-6 mt-8">
          <View className="bg-gray-warm p-4 rounded-lg min-w-[150px]">
            <Body className="text-sm text-gray-charcoal/60 mb-1">Founded</Body>
            <Body className="font-body-semibold">{councilHistory.founded}</Body>
          </View>
          <View className="bg-gray-warm p-4 rounded-lg min-w-[150px]">
            <Body className="text-sm text-gray-charcoal/60 mb-1">
              Headquarters
            </Body>
            <Body className="font-body-semibold">
              {councilHistory.headquarters}
            </Body>
          </View>
          <View className="bg-gray-warm p-4 rounded-lg min-w-[150px]">
            <Body className="text-sm text-gray-charcoal/60 mb-1">
              Principal Towns
            </Body>
            <Body className="font-body-semibold">17</Body>
          </View>
        </View>
      </Section>

      {/* Our Structure */}
      <Section background="warm">
        <H2 className="text-center mb-6">Our Structure</H2>
        <View className="max-w-3xl mx-auto mb-8">
          <Body className="text-base text-center leading-relaxed">
            The council is led by the Omanhene (Paramount Chief), supported by 17
            divisional and sub-divisional chiefs, queen mothers, and elders. It
            operates through traditional committees and councils that address
            chieftaincy, land, development, and cultural affairs.
          </Body>
        </View>

        {/* Visual Hierarchy */}
        <View className="items-center">
          {/* Omanhene */}
          <View className="bg-gold px-8 py-4 rounded-xl mb-2">
            <Body className="text-white font-body-semibold text-center text-lg">
              Omanhene
            </Body>
            <Body className="text-white/80 text-sm text-center">
              Paramount Chief
            </Body>
          </View>

          <View className="h-8 w-0.5 bg-gold" />

          {/* Second Level */}
          <View className={`${isMobile ? "flex-col items-center" : "flex-row"} gap-4 mb-2`}>
            <View className="bg-green-deep px-6 py-3 rounded-xl">
              <Body className="text-white font-body-semibold text-center">
                Divisional Chiefs
              </Body>
            </View>
            <View className="bg-green-deep px-6 py-3 rounded-xl">
              <Body className="text-white font-body-semibold text-center">
                Queen Mothers
              </Body>
            </View>
          </View>

          <View className="h-8 w-0.5 bg-gold" />

          {/* Elders */}
          <View className="bg-blue-heritage px-6 py-3 rounded-xl mb-2">
            <Body className="text-white font-body-semibold text-center">
              Elders
            </Body>
          </View>

          <View className="h-8 w-0.5 bg-gold" />

          {/* Committees */}
          <View className={`${isMobile ? "flex-col items-center" : "flex-row flex-wrap justify-center"} gap-3`}>
            {["Chieftaincy", "Land", "Development", "Cultural Affairs"].map((committee) => (
              <View key={committee} className="bg-white border-2 border-gold px-5 py-3 rounded-xl">
                <Body className="text-gold font-body-semibold text-center">
                  {committee}
                </Body>
              </View>
            ))}
          </View>
        </View>
      </Section>

      {/* Paramount King Section */}
      <Section background="white">
        <View className="max-w-3xl mx-auto items-center">
          {/* Photo placeholder */}
          <View className="w-full max-w-sm h-96 bg-gold/5 rounded-xl items-center justify-center border-4 border-gold mb-6">
            <View className="w-20 h-20 bg-gold/15 rounded-full items-center justify-center mb-4">
              <FontAwesome name="user" size={36} color="#D4AF37" />
            </View>
            <Body className="text-gold font-body-semibold">Royal Portrait</Body>
            <Body className="text-xs text-gray-charcoal/40 mt-1">Photo forthcoming</Body>
          </View>

          <Accent className="mb-2">His Royal Majesty</Accent>
          <H2 className="text-center mb-2">{paramountKing.name}</H2>
          <Body className="text-gold font-body-semibold text-lg text-center mb-4">
            {paramountKing.title} | {paramountKing.lineage}
          </Body>
          <Body className="text-base text-center mb-6">{paramountKing.biography}</Body>
          <View className="bg-gray-warm p-4 rounded-lg">
            <Body className="text-sm text-gray-charcoal/60 mb-1 text-center">
              Enstooled
            </Body>
            <Body className="font-body-semibold text-center">
              {new Date(paramountKing.enstoolmentDate).toLocaleDateString(
                "en-GB",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            </Body>
          </View>
        </View>
      </Section>

      {/* Our Role */}
      <Section background="green">
        <H2 className="text-white text-center mb-8">Our Role</H2>
        <View className="max-w-3xl mx-auto">
          <Body className="text-white/90 text-base text-center mb-6">
            The Akuapem Traditional Council serves as the vital interface
            between the government of Ghana and the people of Akuapem. Our
            responsibilities include:
          </Body>
          <View className="gap-4">
            {[
              "Preserving and promoting Akuapem culture and traditions",
              "Settling disputes and maintaining peace in our communities",
              "Overseeing land administration within the traditional area",
              "Coordinating development initiatives with government agencies",
              "Representing the interests of Akuapem people at all levels",
            ].map((role, index) => (
              <View key={index} className="flex-row items-start gap-3">
                <View className="w-6 h-6 bg-gold rounded-full items-center justify-center mt-1">
                  <Body className="text-white text-sm">{index + 1}</Body>
                </View>
                <Body className="text-white flex-1">{role}</Body>
              </View>
            ))}
          </View>
        </View>
      </Section>
    </PageLayout>
  );
}
