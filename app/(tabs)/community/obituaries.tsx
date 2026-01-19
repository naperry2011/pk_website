import { View, Pressable } from "react-native";
import { useState } from "react";
import { PageLayout, Section } from "@/components/layout";
import { H1, H2, H3, Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Input, TextArea } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { FontAwesome } from "@expo/vector-icons";
import { obituaries, towns, getTownName } from "@/constants/mockData";

export default function ObituariesScreen() {
  const [showForm, setShowForm] = useState(false);
  const [selectedTown, setSelectedTown] = useState("");

  return (
    <PageLayout>
      {/* Hero */}
      <View className="bg-red-kente/90 py-16 px-4">
        <View className="max-w-4xl mx-auto items-center">
          <H1 className="text-white text-center mb-4">Obituaries</H1>
          <Body className="text-white/90 text-center text-lg">
            Honoring the memory of our departed community members
          </Body>
        </View>
      </View>

      {/* Actions */}
      <Section background="white">
        <View className="flex-row flex-wrap gap-4 justify-between items-center mb-8">
          <H2>Recent Obituaries</H2>
          <Button
            title={showForm ? "View Listings" : "Submit Obituary"}
            onPress={() => setShowForm(!showForm)}
            variant={showForm ? "outline" : "primary"}
          />
        </View>

        {showForm ? (
          /* Submission Form */
          <View className="max-w-2xl mx-auto">
            <Card>
              <CardContent>
                <H3 className="mb-6">Submit an Obituary</H3>

                <Input
                  label="Full Name of Deceased"
                  placeholder="Enter full name"
                />

                <View className="flex-row gap-4 flex-wrap">
                  <View className="flex-1 min-w-[200px]">
                    <Input label="Date of Birth" placeholder="DD/MM/YYYY" />
                  </View>
                  <View className="flex-1 min-w-[200px]">
                    <Input label="Date of Passing" placeholder="DD/MM/YYYY" />
                  </View>
                </View>

                <Input label="Funeral Date" placeholder="DD/MM/YYYY" />

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
                  label="Brief Biography (Optional)"
                  placeholder="Share a few words about the deceased..."
                />

                <View className="mb-6">
                  <Body className="font-body-medium text-gray-charcoal mb-2">
                    Photo
                  </Body>
                  <Pressable className="border-2 border-dashed border-brown-earth/30 rounded-lg p-8 items-center">
                    <FontAwesome name="camera" size={32} color="#8B451350" />
                    <Body className="text-gray-charcoal/60 mt-2">
                      Tap to upload photo
                    </Body>
                    <Body className="text-sm text-gray-charcoal/40">
                      Max 5MB, JPG or PNG
                    </Body>
                  </Pressable>
                </View>

                <Input
                  label="Family Contact Email"
                  placeholder="email@example.com"
                  keyboardType="email-address"
                />

                <Button
                  title="Submit for Review"
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
          /* Obituary Listings */
          <View className="max-w-3xl mx-auto">
            {obituaries.map((obituary) => (
              <Card key={obituary.id} className="mb-4">
                <CardContent>
                  <View className="flex-row gap-4">
                    {/* Photo placeholder */}
                    <View className="w-24 h-24 bg-gray-warm rounded-lg items-center justify-center">
                      <FontAwesome name="user" size={32} color="#2C3E5030" />
                    </View>
                    <View className="flex-1">
                      <H3 className="mb-1">{obituary.name}</H3>
                      <Body className="text-sm text-gray-charcoal/70 mb-2">
                        {new Date(obituary.birthDate).getFullYear()} -{" "}
                        {new Date(obituary.passedDate).getFullYear()}
                      </Body>
                      <View className="flex-row items-center gap-2 mb-1">
                        <FontAwesome
                          name="map-marker"
                          size={14}
                          color="#D4AF37"
                        />
                        <Body className="text-sm">{getTownName(obituary.townId)}</Body>
                      </View>
                      <View className="flex-row items-center gap-2">
                        <FontAwesome
                          name="calendar"
                          size={14}
                          color="#8B0000"
                        />
                        <Body className="text-sm text-red-kente">
                          Funeral:{" "}
                          {new Date(obituary.funeralDate).toLocaleDateString(
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
                  </View>
                </CardContent>
              </Card>
            ))}

            {obituaries.length === 0 && (
              <View className="py-12 items-center">
                <FontAwesome name="inbox" size={48} color="#2C3E5030" />
                <Body className="text-gray-charcoal/50 mt-4">
                  No obituaries at this time
                </Body>
              </View>
            )}
          </View>
        )}
      </Section>
    </PageLayout>
  );
}
