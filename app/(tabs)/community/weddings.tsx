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
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [weddingForm, setWeddingForm] = useState({
    brideName: "",
    groomName: "",
    weddingDate: "",
    venue: "",
    message: "",
    contactEmail: "",
  });
  const [weddingErrors, setWeddingErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleWeddingSubmit = () => {
    const newErrors: Record<string, string> = {};
    if (!weddingForm.brideName.trim()) newErrors.brideName = "Bride's name is required";
    if (!weddingForm.groomName.trim()) newErrors.groomName = "Groom's name is required";
    if (!weddingForm.weddingDate.trim()) newErrors.weddingDate = "Wedding date is required";
    if (!weddingForm.venue.trim()) newErrors.venue = "Venue is required";
    if (weddingForm.contactEmail.trim() && !validateEmail(weddingForm.contactEmail)) {
      newErrors.contactEmail = "Please enter a valid email address";
    }

    setWeddingErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setFormSubmitted(true);
  };

  return (
    <PageLayout>
      {/* Hero */}
      <View className="bg-gold py-16 md:py-20 px-4 md:px-8">
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
                    <Input
                      label="Bride's Name *"
                      placeholder="Full name"
                      value={weddingForm.brideName}
                      onChangeText={(text) => {
                        setWeddingForm({ ...weddingForm, brideName: text });
                        if (weddingErrors.brideName) setWeddingErrors((prev) => ({ ...prev, brideName: "" }));
                      }}
                      error={weddingErrors.brideName}
                    />
                  </View>
                  <View className="flex-1 min-w-[200px]">
                    <Input
                      label="Groom's Name *"
                      placeholder="Full name"
                      value={weddingForm.groomName}
                      onChangeText={(text) => {
                        setWeddingForm({ ...weddingForm, groomName: text });
                        if (weddingErrors.groomName) setWeddingErrors((prev) => ({ ...prev, groomName: "" }));
                      }}
                      error={weddingErrors.groomName}
                    />
                  </View>
                </View>

                <Input
                  label="Wedding Date *"
                  placeholder="DD/MM/YYYY"
                  value={weddingForm.weddingDate}
                  onChangeText={(text) => {
                    setWeddingForm({ ...weddingForm, weddingDate: text });
                    if (weddingErrors.weddingDate) setWeddingErrors((prev) => ({ ...prev, weddingDate: "" }));
                  }}
                  error={weddingErrors.weddingDate}
                />

                <Input
                  label="Venue *"
                  placeholder="Church or location name"
                  value={weddingForm.venue}
                  onChangeText={(text) => {
                    setWeddingForm({ ...weddingForm, venue: text });
                    if (weddingErrors.venue) setWeddingErrors((prev) => ({ ...prev, venue: "" }));
                  }}
                  error={weddingErrors.venue}
                />

                <View className="mb-4">
                  <Body className="font-body-medium text-gray-charcoal mb-2">
                    Town
                  </Body>
                  <View className="flex-row flex-wrap gap-2">
                    {towns.slice(0, 8).map((town) => (
                      <Pressable
                        key={town.id}
                        onPress={() => setSelectedTown(town.id)}
                        className={`px-3 py-2 rounded-lg border min-h-[44px] justify-center ${
                          selectedTown === town.id
                            ? "bg-gold border-gold"
                            : "bg-white border-brown-earth/30"
                        }`}
                        accessibilityRole="radio"
                        accessibilityLabel={town.name}
                        accessibilityState={{ selected: selectedTown === town.id }}
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
                  value={weddingForm.message}
                  onChangeText={(text) => setWeddingForm({ ...weddingForm, message: text })}
                />

                <View className="mb-6">
                  <Body className="font-body-medium text-gray-charcoal mb-2">
                    Photos
                  </Body>
                  <Pressable
                    className="border-2 border-dashed border-brown-earth/30 rounded-lg p-8 items-center min-h-[44px]"
                    accessibilityRole="button"
                    accessibilityLabel="Upload engagement photos"
                    accessibilityHint="Tap to upload up to 3 engagement photos"
                  >
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
                  value={weddingForm.contactEmail}
                  onChangeText={(text) => {
                    setWeddingForm({ ...weddingForm, contactEmail: text });
                    if (weddingErrors.contactEmail) setWeddingErrors((prev) => ({ ...prev, contactEmail: "" }));
                  }}
                  error={weddingErrors.contactEmail}
                  accessibilityHint="Enter contact email address"
                />

                {formSubmitted ? (
                  <View className="bg-green-deep/10 border border-green-deep/30 rounded-lg p-4 items-center">
                    <FontAwesome name="check-circle" size={24} color="#1B4D3E" />
                    <Body className="text-green-deep font-body-semibold mt-2">
                      Thank you for your submission.
                    </Body>
                    <Body className="text-green-deep/80 text-sm text-center mt-1">
                      Your wedding announcement has been received and will be reviewed before publishing.
                    </Body>
                  </View>
                ) : (
                  <Button
                    title="Submit Announcement"
                    onPress={handleWeddingSubmit}
                    fullWidth
                    accessibilityHint="Submits the wedding announcement for review"
                  />
                )}

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
                    <View
                      className="flex-row items-center gap-4 mb-4"
                      accessibilityLabel={`Wedding of ${wedding.bride} and ${wedding.groom}`}
                    >
                      <View className="w-16 h-16 bg-gold/10 rounded-full items-center justify-center" accessibilityLabel="Bride">
                        <FontAwesome name="user" size={24} color="#D4AF37" />
                      </View>
                      <FontAwesome name="heart" size={24} color="#8B0000" />
                      <View className="w-16 h-16 bg-gold/10 rounded-full items-center justify-center" accessibilityLabel="Groom">
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
