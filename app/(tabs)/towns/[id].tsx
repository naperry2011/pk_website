import { View, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import { PageLayout, Section } from "@/components/layout";
import { H1, H2, H3, Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { FontAwesome } from "@expo/vector-icons";
import {
  towns,
  getObituariesByTown,
  getWeddingsByTown,
  getAnnouncementsByTown,
} from "@/constants/mockData";

export default function TownDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const town = towns.find((t) => t.id === id);

  // Get town-specific content
  const townObituaries = id ? getObituariesByTown(id) : [];
  const townWeddings = id ? getWeddingsByTown(id) : [];
  const townAnnouncements = id ? getAnnouncementsByTown(id) : [];

  if (!town) {
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

  return (
    <PageLayout>
      {/* Hero */}
      <View className="bg-green-deep py-16 px-4">
        <View className="max-w-4xl mx-auto items-center">
          <Body className="text-gold mb-2">Town of Akuapem</Body>
          <H1 className="text-white text-center mb-4">{town.name}</H1>
          <Body className="text-white/90 text-center text-lg">
            Led by {town.chief}
          </Body>
        </View>
      </View>

      {/* Town Info */}
      <Section background="white">
        <View className="md:flex-row gap-8">
          {/* Main Content */}
          <View className="flex-1">
            <H2 className="mb-4">About {town.name}</H2>
            <Body className="text-lg mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Body>

            <H3 className="mb-4">History</H3>
            <Body className="mb-6">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </Body>

            {/* Photo Gallery Placeholder */}
            <H3 className="mb-4">Photo Gallery</H3>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-6"
            >
              {[1, 2, 3, 4].map((i) => (
                <View
                  key={i}
                  className="w-48 h-36 bg-gray-warm rounded-lg mr-4 items-center justify-center"
                >
                  <FontAwesome name="image" size={30} color="#2C3E5030" />
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Sidebar */}
          <View className="w-full md:w-80">
            <Card className="mb-4">
              <CardContent>
                <H3 className="mb-4">Current Chief</H3>
                <View className="w-20 h-20 bg-gray-warm rounded-full mx-auto mb-4 items-center justify-center">
                  <FontAwesome name="user" size={30} color="#2C3E5050" />
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
                  <View className="flex-row items-center gap-2">
                    <FontAwesome name="map-marker" size={16} color="#D4AF37" />
                    <Body>Chief's Palace</Body>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <FontAwesome name="map-marker" size={16} color="#D4AF37" />
                    <Body>Presbyterian Church</Body>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <FontAwesome name="map-marker" size={16} color="#D4AF37" />
                    <Body>Market Square</Body>
                  </View>
                </View>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <H3 className="mb-4">Contact</H3>
                <View className="gap-2">
                  <View className="flex-row items-center gap-2">
                    <FontAwesome name="phone" size={16} color="#1B4D3E" />
                    <Body>+233 XX XXX XXXX</Body>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <FontAwesome name="envelope" size={16} color="#1B4D3E" />
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
      {townAnnouncements.length > 0 && (
        <Section background="warm">
          <H2 className="mb-6">Events & Announcements in {town.name}</H2>
          <View className="max-w-3xl">
            {townAnnouncements.map((announcement) => (
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
                          color="#D4AF37"
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
      {townObituaries.length > 0 && (
        <Section background="white">
          <View className="flex-row items-center justify-between mb-6">
            <H2>Obituaries in {town.name}</H2>
            <Link href="/community/obituaries" asChild>
              <Pressable className="flex-row items-center gap-1">
                <Body className="text-gold text-sm">View all</Body>
                <FontAwesome name="arrow-right" size={12} color="#D4AF37" />
              </Pressable>
            </Link>
          </View>
          <View className="max-w-3xl">
            {townObituaries.map((obituary) => (
              <Card key={obituary.id} className="mb-4">
                <CardContent>
                  <View className="flex-row gap-4">
                    <View className="w-16 h-16 bg-gray-warm rounded-lg items-center justify-center">
                      <FontAwesome name="user" size={24} color="#2C3E5030" />
                    </View>
                    <View className="flex-1">
                      <Body className="font-body-semibold mb-1">
                        {obituary.name}
                      </Body>
                      <Body className="text-sm text-gray-charcoal/70 mb-1">
                        {new Date(obituary.birthDate).getFullYear()} -{" "}
                        {new Date(obituary.passedDate).getFullYear()}
                      </Body>
                      <View className="flex-row items-center gap-2">
                        <FontAwesome name="calendar" size={12} color="#8B0000" />
                        <Body className="text-sm text-red-kente">
                          Funeral:{" "}
                          {new Date(obituary.funeralDate).toLocaleDateString(
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
      {townWeddings.length > 0 && (
        <Section background="warm">
          <View className="flex-row items-center justify-between mb-6">
            <H2>Weddings in {town.name}</H2>
            <Link href="/community/weddings" asChild>
              <Pressable className="flex-row items-center gap-1">
                <Body className="text-gold text-sm">View all</Body>
                <FontAwesome name="arrow-right" size={12} color="#D4AF37" />
              </Pressable>
            </Link>
          </View>
          <View className="max-w-3xl">
            {townWeddings.map((wedding) => (
              <Card key={wedding.id} className="mb-4">
                <CardContent>
                  <View className="flex-row items-center gap-4">
                    <View className="flex-row items-center gap-2">
                      <View className="w-12 h-12 bg-gold/10 rounded-full items-center justify-center">
                        <FontAwesome name="heart" size={18} color="#D4AF37" />
                      </View>
                    </View>
                    <View className="flex-1">
                      <Body className="font-body-semibold mb-1">
                        {wedding.bride} & {wedding.groom}
                      </Body>
                      <View className="flex-row items-center gap-2 mb-1">
                        <FontAwesome name="calendar" size={12} color="#D4AF37" />
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
                          color="#1B4D3E"
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
      {townObituaries.length === 0 &&
        townWeddings.length === 0 &&
        townAnnouncements.length === 0 && (
          <Section background="warm">
            <View className="items-center py-8">
              <FontAwesome name="calendar-o" size={48} color="#2C3E5030" />
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
