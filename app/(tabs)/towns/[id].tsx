import { View, Text, Pressable, Image, Platform } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { PageLayout, Section } from "@/components/layout";
import {
  Display,
  Title,
  Label,
  Body,
} from "@/components/ui/Typography";
import { tokens } from "@/constants/tokens";
import { Button } from "@/components/ui/Button";
import { useTown } from "@/hooks/useTowns";
import { useObituaries } from "@/hooks/useObituaries";
import { useWeddings } from "@/hooks/useWeddings";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { useTownPhotos } from "@/hooks/useTownPhotos";
import { useResponsive } from "@/hooks/useResponsive";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const isWeb = Platform.OS === "web";

// Town → division mapping (mirrors towns/index.tsx; to be verified by site owner)
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

/** Hairline key/value row — label ivory/40 left, value ivory right. */
function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-baseline justify-between gap-6 py-5 border-b border-white/10">
      <Label className="text-ivory/40">{label}</Label>
      <Body className="text-ivory text-right flex-1">{value}</Body>
    </View>
  );
}

export default function TownDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: town, isLoading, error, refetch } = useTown(id!);
  const { data: townObituaries } = useObituaries({ townId: id, status: "approved" });
  const { data: townWeddings } = useWeddings({ townId: id, status: "approved" });
  const { data: townAnnouncements } = useAnnouncements(id);
  const { data: townPhotos } = useTownPhotos(id);
  const { isMobile } = useResponsive();

  if (isLoading) {
    return (
      <PageLayout>
        <LoadingState message="Loading town details..." />
      </PageLayout>
    );
  }

  if (error || !town) {
    return (
      <PageLayout>
        <Section background="ink">
          <Title className="mb-8">Town not found</Title>
          <Link href="/towns" asChild>
            <Button title="Back to Towns" variant="link-arrow" onPress={() => {}} />
          </Link>
        </Section>
      </PageLayout>
    );
  }

  const obituaries = townObituaries ?? [];
  const weddings = townWeddings ?? [];
  const announcements = townAnnouncements ?? [];
  const photos = townPhotos ?? [];

  const heroImageUrl =
    town.image_url || (photos.length > 0 ? photos[0].image_url : null);
  const numColumns = isMobile ? 2 : 3;

  const division = townDivisions[town.name] || "Gyase";

  // Sequential section numbering after 01 — Profile
  let sectionIndex = 1;
  const nextNumber = () => `0${++sectionIndex}`;

  return (
    <PageLayout heroUnderHeader>
      {/* Full-bleed hero — photo or ink field with giant initial */}
      <View
        className="relative overflow-hidden justify-end bg-ink-raised"
        style={{ height: isWeb ? ("60vh" as any) : 460, minHeight: 420 }}
      >
        {heroImageUrl ? (
          <Image
            source={{ uri: heroImageUrl }}
            className="absolute inset-0 w-full h-full"
            resizeMode="cover"
            accessibilityIgnoresInvertColors
          />
        ) : (
          <View className="absolute inset-0 items-center justify-center">
            <Text
              className="font-display text-champagne/15"
              style={{ fontSize: isMobile ? 220 : 380, lineHeight: isMobile ? 240 : 400 }}
              accessibilityElementsHidden
              importantForAccessibility="no"
            >
              {town.name.charAt(0)}
            </Text>
          </View>
        )}
        <LinearGradient
          colors={["rgba(11,15,13,0.4)", "rgba(11,15,13,0.1)", tokens.colors.ink]}
          locations={[0, 0.4, 1]}
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        />
        <View className="px-[6%] pb-14 md:pb-20 w-full">
          <View className="max-w-[1280px] mx-auto w-full">
            <AnimateOnScroll variant="fade">
              <Label className="mb-5">
                {division} Division · Town of Akuapem
              </Label>
              <Display>{town.name}</Display>
            </AnimateOnScroll>
          </View>
        </View>
      </View>

      {/* 01 — Profile */}
      <Section background="ink" number="01" label="Profile" animate={false}>
        <View className={`gap-14 md:gap-24 ${isMobile ? "" : "flex-row"}`}>
          {/* Main content */}
          <View className={isMobile ? "w-full" : "flex-[7]"}>
            <AnimateOnScroll>
              <Title className="mb-8">About {town.name}</Title>
              <Body className="text-ivory/80 text-lg leading-8 mb-10 max-w-[600px]">
                {town.description ||
                  `${town.name} is one of the 17 principal towns of the Akuapem Traditional Area, situated along the historic Akuapem Ridge in the Eastern Region of Ghana.`}
              </Body>

              <Label className="mb-4 text-ivory/40">
                Heritage & Traditions
              </Label>
              <Body className="text-ivory/70 leading-8 mb-14 max-w-[600px]">
                As part of the Akuapem Traditional Area, {town.name}{" "}
                participates in the annual Odwira Festival and other cultural
                celebrations that honour the heritage of the Akuapem people.
                The town maintains its traditional governance under the
                leadership of {town.chief} and contributes to the collective
                stewardship of the Akuapem state.
              </Body>
            </AnimateOnScroll>

            {/* Photo gallery */}
            <AnimateOnScroll>
              <Label className="mb-6 text-ivory/40">Photographs</Label>
              {photos.length > 0 ? (
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginHorizontal: -6,
                  }}
                >
                  {photos.map((photo: any, index: number) => (
                    <AnimateOnScroll
                      key={photo.id || index}
                      delay={index * 80}
                      style={{
                        width: `${100 / numColumns}%`,
                        paddingHorizontal: 6,
                        marginBottom: 12,
                      }}
                    >
                      <Image
                        source={{ uri: photo.image_url }}
                        style={{ width: "100%", height: 200 }}
                        resizeMode="cover"
                      />
                      {photo.caption ? (
                        <Body className="text-xs text-ivory/40 mt-2">
                          {photo.caption}
                        </Body>
                      ) : null}
                    </AnimateOnScroll>
                  ))}
                </View>
              ) : (
                <Body className="text-ivory/40 py-4 border-b border-white/10">
                  Photographs coming soon
                </Body>
              )}
            </AnimateOnScroll>
          </View>

          {/* Facts — hairline rows */}
          <View className={isMobile ? "w-full" : "flex-[4]"}>
            <AnimateOnScroll delay={120}>
              <View className="border-t border-white/10">
                <FactRow label="Chief" value={town.chief} />
                <FactRow label="Division" value={`${division} Division`} />
                <FactRow label="Region" value="Eastern Region, Ghana" />
                {(town.landmarks && town.landmarks.length > 0
                  ? town.landmarks
                  : ["Chief's Palace", "Presbyterian Church", "Market Square"]
                ).map((landmark: string, index: number) => (
                  <FactRow
                    key={index}
                    label={index === 0 ? "Landmarks" : ""}
                    value={landmark}
                  />
                ))}
                <FactRow label="Contact" value={`${town.id}@akuapemcouncil.org`} />
                <FactRow label="Telephone" value="Contact Palace for details" />
              </View>
            </AnimateOnScroll>
          </View>
        </View>
      </Section>

      {/* Happenings */}
      {announcements.length > 0 && (
        <Section
          background="ink-raised"
          number={nextNumber()}
          label="Happenings"
          animate={false}
        >
          <AnimateOnScroll>
            <Title className="mb-14">
              Events & announcements in{" "}
              <Text className="font-display-italic text-champagne">
                {town.name}
              </Text>
            </Title>
          </AnimateOnScroll>
          <View className="border-t border-white/10">
            {announcements.map((announcement, i) => (
              <AnimateOnScroll key={announcement.id} delay={i * 80}>
                <View
                  className={`py-8 border-b border-white/10 gap-3 ${
                    isMobile ? "" : "flex-row items-baseline gap-10"
                  }`}
                >
                  <View className={isMobile ? "" : "w-[220px]"}>
                    <Label>
                      {new Date(announcement.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      · {announcement.type}
                    </Label>
                  </View>
                  <View className="flex-1">
                    <Text className="font-display text-ivory text-2xl mb-2">
                      {announcement.title}
                    </Text>
                    <Body className="text-ivory/60">
                      {announcement.excerpt}
                    </Body>
                  </View>
                </View>
              </AnimateOnScroll>
            ))}
          </View>
        </Section>
      )}

      {/* In Memoriam — restrained, no champagne */}
      {obituaries.length > 0 && (
        <Section
          background="ink"
          number={nextNumber()}
          label="In Memoriam"
          animate={false}
        >
          <AnimateOnScroll>
            <Title className="mb-14">Obituaries in {town.name}</Title>
          </AnimateOnScroll>
          <View className="border-t border-white/10">
            {obituaries.map((obituary, i) => (
              <AnimateOnScroll key={obituary.id} delay={i * 80}>
                <View
                  className={`py-8 border-b border-white/10 gap-3 ${
                    isMobile ? "" : "flex-row items-baseline gap-10"
                  }`}
                >
                  <View className={isMobile ? "" : "w-[220px]"}>
                    <Text className="font-body-medium text-label uppercase tracking-[3px] text-ivory/40">
                      {obituary.birth_date
                        ? new Date(obituary.birth_date).getFullYear()
                        : "?"}{" "}
                      — {new Date(obituary.passed_date).getFullYear()}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-display text-ivory text-2xl mb-2">
                      {obituary.name}
                    </Text>
                    <Body className="text-ivory/40">
                      Funeral ·{" "}
                      {new Date(obituary.funeral_date).toLocaleDateString(
                        "en-GB",
                        { day: "numeric", month: "long", year: "numeric" }
                      )}
                    </Body>
                  </View>
                </View>
              </AnimateOnScroll>
            ))}
          </View>
          <Link href="/community/obituaries" asChild>
            <Pressable
              accessibilityRole="link"
              className="mt-10 self-start"
              style={isWeb ? ({ cursor: "pointer" } as any) : undefined}
            >
              <Text className="font-body-medium text-label uppercase tracking-[3px] text-ivory/60">
                View all obituaries →
              </Text>
            </Pressable>
          </Link>
        </Section>
      )}

      {/* Celebrations */}
      {weddings.length > 0 && (
        <Section
          background="ink-raised"
          number={nextNumber()}
          label="Celebrations"
          animate={false}
        >
          <AnimateOnScroll>
            <Title className="mb-14">
              Weddings in{" "}
              <Text className="font-display-italic text-champagne">
                {town.name}
              </Text>
            </Title>
          </AnimateOnScroll>
          <View className="border-t border-white/10">
            {weddings.map((wedding, i) => (
              <AnimateOnScroll key={wedding.id} delay={i * 80}>
                <View
                  className={`py-8 border-b border-white/10 gap-3 ${
                    isMobile ? "" : "flex-row items-baseline gap-10"
                  }`}
                >
                  <View className={isMobile ? "" : "w-[220px]"}>
                    <Label>
                      {new Date(wedding.date).toLocaleDateString("en-GB", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </Label>
                  </View>
                  <View className="flex-1">
                    <Text className="font-display text-ivory text-2xl mb-2">
                      {wedding.bride}{" "}
                      <Text className="font-display-italic text-champagne">
                        &
                      </Text>{" "}
                      {wedding.groom}
                    </Text>
                    <Body className="text-ivory/60">{wedding.venue}</Body>
                  </View>
                </View>
              </AnimateOnScroll>
            ))}
          </View>
          <View className="mt-10 self-start">
            <Link href="/community/weddings" asChild>
              <Button
                title="View all weddings"
                variant="link-arrow"
                onPress={() => {}}
              />
            </Link>
          </View>
        </Section>
      )}

      {/* Empty state */}
      {obituaries.length === 0 &&
        weddings.length === 0 &&
        announcements.length === 0 && (
          <Section background="ink-raised" animate={false}>
            <View className="border-t border-b border-white/10 py-14 items-center">
              <Body className="text-ivory/50 text-center mb-2">
                No current announcements, obituaries, or weddings in{" "}
                {town.name}
              </Body>
              <Body className="text-sm text-ivory/30 text-center">
                Check back soon for updates
              </Body>
            </View>
          </Section>
        )}
    </PageLayout>
  );
}
