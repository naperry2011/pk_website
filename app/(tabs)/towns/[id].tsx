import { View, ScrollView, Pressable, Image } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import { PageLayout, Section } from "@/components/layout";
import { H1, H2, H3, Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { FontAwesome } from "@expo/vector-icons";
import { useTown } from "@/hooks/useTowns";
import { useObituaries } from "@/hooks/useObituaries";
import { useWeddings } from "@/hooks/useWeddings";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { useTownPhotos } from "@/hooks/useTownPhotos";
import { useResponsive } from "@/hooks/useResponsive";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

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
        <Section>
          <H2>Town not found</H2>
          <Link href="/towns" asChild>
            <Button title="Back to Towns" onPress={() => {}} />
          </Link>
        </Section>
      </PageLayout>
    );
  }

  const obituaries = townObituaries ?? [];
  const weddings = townWeddings ?? [];
  const announcements = townAnnouncements ?? [];
  const photos = townPhotos ?? [];

  const heroImageUrl = town.image_url || (photos.length > 0 ? photos[0].url : null);
  const numColumns = isMobile ? 2 : 3;

  return (
    <PageLayout>
      {/* Hero */}
      <View className="bg-green-deep py-16 md:py-20 px-4 md:px-8">
        <View className="max-w-4xl mx-auto items-center">
          <Body className="text-gold mb-2">Town of Akuapem</Body>
          <H1 className="text-white text-center mb-4">{town.name}</H1>
          <Body className="text-white/90 text-center text-lg">
            Led by {town.chief}
          </Body>
        </View>
      </View>

      {/* Town Hero Photo */}
      <Section background="warm">
        {heroImageUrl ? (
          <Image
            source={{ uri: heroImageUrl }}
            style={{
              width: "100%",
              height: isMobile ? 300 : 400,
              borderRadius: 12,
            }}
            resizeMode="cover"
          />
        ) : (
          <View className="h-72 md:h-96 bg-gray-warm rounded-xl items-center justify-center border-2 border-dashed border-green-deep/20">
            <View className="w-20 h-20 bg-green-deep/10 rounded-full items-center justify-center mb-4">
              <FontAwesome name="camera" size={36} color="#1a5632" />
            </View>
            <H3 className="mb-2 text-center">Town photos coming soon</H3>
            <Body className="text-gray-charcoal/60 text-center px-4">
              Photos of {town.name} and its landmarks will be added here
            </Body>
          </View>
        )}
      </Section>

      {/* Town Info */}
      <Section background="white">
        <View className="md:flex-row gap-8">
          {/* Main Content */}
          <View className="flex-1">
            <H2 className="mb-4">About {town.name}</H2>
            <Body className="text-lg mb-6">
              {town.description ||
                `${town.name} is one of the 17 principal towns of the Akuapem Traditional Area, situated along the historic Akuapem Ridge in the Eastern Region of Ghana.`}
            </Body>

            <H3 className="mb-4">Heritage & Traditions</H3>
            <Body className="mb-6">
              As part of the Akuapem Traditional Area, {town.name} participates
              in the annual Odwira Festival and other cultural celebrations that
              honour the heritage of the Akuapem people. The town maintains its
              traditional governance under the leadership of {town.chief} and
              contributes to the collective stewardship of the Akuapem state.
            </Body>

            {/* Photo Gallery */}
            <H3 className="mb-4">Photo Gallery</H3>
            {photos.length > 0 ? (
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginHorizontal: -6,
                  marginBottom: 24,
                }}
              >
                {photos.map((photo: any, index: number) => (
                  <AnimateOnScroll
                    key={photo.id || index}
                    delay={index * 100}
                    style={{
                      width: `${100 / numColumns}%`,
                      paddingHorizontal: 6,
                      marginBottom: 16,
                    }}
                  >
                    <Image
                      source={{ uri: photo.url }}
                      style={{
                        width: "100%",
                        height: 200,
                        borderRadius: 12,
                      }}
                      resizeMode="cover"
                    />
                    {photo.caption ? (
                      <Body className="text-xs text-gray-charcoal/50 mt-1">
                        {photo.caption}
                      </Body>
                    ) : null}
                  </AnimateOnScroll>
                ))}
              </View>
            ) : (
              <View className="py-6 items-center mb-6">
                <FontAwesome name="camera" size={20} color="#2d2d2d50" />
                <Body className="text-sm text-gray-charcoal/40 mt-2">
                  Photos coming soon
                </Body>
              </View>
            )}
          </View>

          {/* Sidebar */}
          <View className="w-full md:w-80">
            <Card className="mb-4">
              <CardContent>
                <H3 className="mb-4">Current Chief</H3>
                <View className="w-20 h-20 bg-gray-warm rounded-full mx-auto mb-4 items-center justify-center">
                  <FontAwesome name="user" size={30} color="#2d2d2d50" />
                </View>
                <Body className="font-body-semibold text-center">
                  {town.chief}
                </Body>
                <Body className="text-sm text-gray-charcoal/70 text-center">
                  Divisional Chief of {town.name}
                </Body>
              </CardContent>
            </Card>

            <Card className="mb-4">
              <CardContent>
                <H3 className="mb-4">Key Landmarks</H3>
                <View className="gap-2">
                  {(town.landmarks && town.landmarks.length > 0
                    ? town.landmarks
                    : ["Chief's Palace", "Presbyterian Church", "Market Square"]
                  ).map((landmark: string, index: number) => (
                    <View key={index} className="flex-row items-center gap-2">
                      <FontAwesome name="map-marker" size={16} color="#d4a843" />
                      <Body>{landmark}</Body>
                    </View>
                  ))}
                </View>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <H3 className="mb-4">Contact</H3>
                <View className="gap-2">
                  <View className="flex-row items-center gap-2">
                    <FontAwesome name="phone" size={16} color="#1a5632" />
                    <Body>Contact Palace for details</Body>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <FontAwesome name="envelope" size={16} color="#1a5632" />
                    <Body className="text-sm">
                      {town.id}@akuapemcouncil.org
                    </Body>
                  </View>
                </View>
              </CardContent>
            </Card>
          </View>
        </View>
      </Section>

      {/* Town Events & Announcements */}
      {announcements.length > 0 && (
        <Section background="warm">
          <H2 className="mb-6">Events & Announcements in {town.name}</H2>
          <View className="max-w-3xl">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="mb-4">
                <CardContent>
                  <View className="flex-row items-start gap-4">
                    <View className="bg-gold px-3 py-2 rounded-lg items-center min-w-[50px]">
                      <Body className="text-white font-body-semibold">
                        {new Date(announcement.date).getDate()}
                      </Body>
                      <Body className="text-white text-xs uppercase">
                        {new Date(announcement.date).toLocaleDateString(
                          "en-GB",
                          { month: "short" }
                        )}
                      </Body>
                    </View>
                    <View className="flex-1">
                      <View className="flex-row items-center gap-2 mb-1">
                        <FontAwesome
                          name={
                            announcement.type === "event"
                              ? "calendar"
                              : "bullhorn"
                          }
                          size={12}
                          color="#d4a843"
                        />
                        <Body className="text-xs text-gold uppercase font-body-medium">
                          {announcement.type}
                        </Body>
                      </View>
                      <Body className="font-body-semibold mb-1">
                        {announcement.title}
                      </Body>
                      <Body className="text-sm text-gray-charcoal/70">
                        {announcement.excerpt}
                      </Body>
                    </View>
                  </View>
                </CardContent>
              </Card>
            ))}
          </View>
        </Section>
      )}

      {/* Town Obituaries */}
      {obituaries.length > 0 && (
        <Section background="white">
          <View className="flex-row items-center justify-between mb-6">
            <H2>Obituaries in {town.name}</H2>
            <Link href="/community/obituaries" asChild>
              <Pressable className="flex-row items-center gap-1">
                <Body className="text-gold text-sm">View all</Body>
                <FontAwesome name="arrow-right" size={12} color="#d4a843" />
              </Pressable>
            </Link>
          </View>
          <View className="max-w-3xl">
            {obituaries.map((obituary) => (
              <Card key={obituary.id} className="mb-4">
                <CardContent>
                  <View className="flex-row gap-4">
                    <View className="w-16 h-16 bg-gray-warm rounded-lg items-center justify-center">
                      <FontAwesome name="user" size={24} color="#2d2d2d30" />
                    </View>
                    <View className="flex-1">
                      <Body className="font-body-semibold mb-1">
                        {obituary.name}
                      </Body>
                      <Body className="text-sm text-gray-charcoal/70 mb-1">
                        {obituary.birth_date ? new Date(obituary.birth_date).getFullYear() : "?"} -{" "}
                        {new Date(obituary.passed_date).getFullYear()}
                      </Body>
                      <View className="flex-row items-center gap-2">
                        <FontAwesome name="calendar" size={12} color="#8B0000" />
                        <Body className="text-sm text-red-kente">
                          Funeral:{" "}
                          {new Date(obituary.funeral_date).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </Body>
                      </View>
                    </View>
                  </View>
                </CardContent>
              </Card>
            ))}
          </View>
        </Section>
      )}

      {/* Town Weddings */}
      {weddings.length > 0 && (
        <Section background="warm">
          <View className="flex-row items-center justify-between mb-6">
            <H2>Weddings in {town.name}</H2>
            <Link href="/community/weddings" asChild>
              <Pressable className="flex-row items-center gap-1">
                <Body className="text-gold text-sm">View all</Body>
                <FontAwesome name="arrow-right" size={12} color="#d4a843" />
              </Pressable>
            </Link>
          </View>
          <View className="max-w-3xl">
            {weddings.map((wedding) => (
              <Card key={wedding.id} className="mb-4">
                <CardContent>
                  <View className="flex-row items-center gap-4">
                    <View className="flex-row items-center gap-2">
                      <View className="w-12 h-12 bg-gold/10 rounded-full items-center justify-center">
                        <FontAwesome name="heart" size={18} color="#d4a843" />
                      </View>
                    </View>
                    <View className="flex-1">
                      <Body className="font-body-semibold mb-1">
                        {wedding.bride} & {wedding.groom}
                      </Body>
                      <View className="flex-row items-center gap-2 mb-1">
                        <FontAwesome name="calendar" size={12} color="#d4a843" />
                        <Body className="text-sm">
                          {new Date(wedding.date).toLocaleDateString("en-GB", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </Body>
                      </View>
                      <View className="flex-row items-center gap-2">
                        <FontAwesome
                          name="map-marker"
                          size={12}
                          color="#1a5632"
                        />
                        <Body className="text-sm text-gray-charcoal/70">
                          {wedding.venue}
                        </Body>
                      </View>
                    </View>
                  </View>
                </CardContent>
              </Card>
            ))}
          </View>
        </Section>
      )}

      {/* No content message if all sections are empty */}
      {obituaries.length === 0 &&
        weddings.length === 0 &&
        announcements.length === 0 && (
          <Section background="warm">
            <View className="items-center py-8">
              <FontAwesome name="calendar-o" size={48} color="#2d2d2d30" />
              <Body className="text-gray-charcoal/50 mt-4 text-center">
                No current announcements, obituaries, or weddings in {town.name}
              </Body>
              <Body className="text-sm text-gray-charcoal/40 mt-2">
                Check back soon for updates
              </Body>
            </View>
          </Section>
        )}
    </PageLayout>
  );
}
