import { View, Pressable } from "react-native";
import { useState } from "react";
import { PageLayout, Section } from "@/components/layout";
import { H1, H2, H3, Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Input, TextArea } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { FontAwesome } from "@expo/vector-icons";
import { weddings, towns, getTownName } from "@/constants/mockData";

export default function WeddingsScreen() {
  const [showForm, setShowForm] = useState(false);
  const [selectedTown, setSelectedTown] = useState("");

  return (
    <PageLayout>
      {/* Hero */}
      <View className="bg-gold py-16 px-4">
        <View className="max-w-4xl mx-auto items-center">
          <H1 className="text-white text-center mb-4">Wedding Announcements</H1>
          <Body className="text-white/90 text-center text-lg">
            Celebrating love and union in our community
          </Body>
        </View>
      </View>

      {/* Actions */}
      <Section background="white">
        <View className="flex-row flex-wrap gap-4 justify-between items-center mb-8">
          <H2>Recent Announcements</H2>
          <Button
            title={showForm ? "View Announcements" : "Submit Announcement"}
            onPress={() => setShowForm(!showForm)}
            variant={showForm ? "outline" : "primary"}
          />
        </View>

        {showForm ? (
          /* Submission Form */
          <View className="max-w-2xl mx-auto">
            <Card>
              <CardContent>
                <H3 className="mb-6">Announce Your Wedding</H3>

                <View className="flex-row gap-4 flex-wrap">
                  <View className="flex-1 min-w-[200px]">
                    <Input label="Bride's Name" placeholder="Full name" />
                  </View>
                  <View className="flex-1 min-w-[200px]">
                    <Input label="Groom's Name" placeholder="Full name" />
                  </View>
                </View>

                <Input label="Wedding Date" placeholder="DD/MM/YYYY" />

                <Input label="Venue" placeholder="Church or location name" />

                <View className="mb-4">
                  <Body className="font-body-medium text-gray-charcoal mb-2">
                    Town
                  </Body>
                  <View className="flex-row flex-wrap gap-2">
                    {towns.slice(0, 8).map((town) => (
                      <Pressable
                        key={town.id}
                        onPress={() => setSelectedTown(town.id)}
                        className={`px-3 py-2 rounded-lg border ${
                          selectedTown === town.id
                            ? "bg-gold border-gold"
                            : "bg-white border-brown-earth/30"
                        }`}
                      >
                        <Body
                          className={
                            selectedTown === town.id
                              ? "text-white"
                              : "text-gray-charcoal"
                          }
                        >
                          {town.name}
                        </Body>
                      </Pressable>
                    ))}
                  </View>
                </View>

                <TextArea
                  label="Message (Optional)"
                  placeholder="Share a message with the community..."
                />

                <View className="mb-6">
                  <Body className="font-body-medium text-gray-charcoal mb-2">
                    Photos
                  </Body>
                  <Pressable className="border-2 border-dashed border-brown-earth/30 rounded-lg p-8 items-center">
                    <FontAwesome name="camera" size={32} color="#8B451350" />
                    <Body className="text-gray-charcoal/60 mt-2">
                      Tap to upload engagement photos
                    </Body>
                    <Body className="text-sm text-gray-charcoal/40">
                      Max 5MB each, up to 3 photos
                    </Body>
                  </Pressable>
                </View>

                <Input
                  label="Contact Email"
                  placeholder="email@example.com"
                  keyboardType="email-address"
                />

                <Button
                  title="Submit Announcement"
                  onPress={() => alert("Form submitted (demo)")}
                  fullWidth
                />

                <Body className="text-sm text-gray-charcoal/60 text-center mt-4">
                  All submissions are reviewed before publishing
                </Body>
              </CardContent>
            </Card>
          </View>
        ) : (
          /* Wedding Listings */
          <View className="max-w-3xl mx-auto">
            {weddings.map((wedding) => (
              <Card key={wedding.id} className="mb-4">
                <CardContent>
                  <View className="items-center py-4">
                    {/* Couple icons */}
                    <View className="flex-row items-center gap-4 mb-4">
                      <View className="w-16 h-16 bg-gold/10 rounded-full items-center justify-center">
                        <FontAwesome name="user" size={24} color="#D4AF37" />
                      </View>
                      <FontAwesome name="heart" size={24} color="#8B0000" />
                      <View className="w-16 h-16 bg-gold/10 rounded-full items-center justify-center">
                        <FontAwesome name="user" size={24} color="#D4AF37" />
                      </View>
                    </View>

                    <H3 className="text-center mb-2">
                      {wedding.bride} & {wedding.groom}
                    </H3>

                    <View className="flex-row items-center gap-2 mb-1">
                      <FontAwesome name="calendar" size={14} color="#D4AF37" />
                      <Body>
                        {new Date(wedding.date).toLocaleDateString("en-GB", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </Body>
                    </View>

                    <View className="flex-row items-center gap-2 mb-1">
                      <FontAwesome
                        name="map-marker"
                        size={14}
                        color="#1B4D3E"
                      />
                      <Body className="text-gray-charcoal/70">
                        {wedding.venue}
                      </Body>
                    </View>

                    <Body className="text-sm text-gold mt-2">{getTownName(wedding.townId)}</Body>
                  </View>
                </CardContent>
              </Card>
            ))}

            {weddings.length === 0 && (
              <View className="py-12 items-center">
                <FontAwesome name="inbox" size={48} color="#2C3E5030" />
                <Body className="text-gray-charcoal/50 mt-4">
                  No wedding announcements at this time
                </Body>
              </View>
            )}
          </View>
        )}
      </Section>
    </PageLayout>
  );
}
