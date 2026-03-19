import { View, Pressable, useWindowDimensions } from "react-native";
import { useState } from "react";
import { PageLayout, Section } from "@/components/layout";
import { H1, H2, H3, Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Input, TextArea } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { FontAwesome } from "@expo/vector-icons";
import { useWeddings, useCreateWedding } from "@/hooks/useWeddings";
import { useTowns } from "@/hooks/useTowns";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { TownFilterDropdown, HelpfulResources } from "@/components/community";

export default function WeddingsScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [showForm, setShowForm] = useState(false);
  const [selectedTown, setSelectedTown] = useState("");
  const [filterTown, setFilterTown] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [weddingForm, setWeddingForm] = useState({
    brideName: "",
    groomName: "",
    weddingDate: "",
    weddingEndDate: "",
    venue: "",
    message: "",
    contactEmail: "",
    submittedByName: "",
    submittedByEmail: "",
    submittedByPhone: "",
  });
  const [weddingErrors, setWeddingErrors] = useState<Record<string, string>>({});

  const { data: weddings, isLoading, error, refetch } = useWeddings({ status: "approved" });
  const { data: towns } = useTowns();
  const createWedding = useCreateWedding();

  const getTownName = (townId: string) => {
    const town = (towns ?? []).find((t) => t.id === townId);
    return town?.name || townId;
  };

  const filteredWeddings = filterTown
    ? (weddings ?? []).filter((w) => getTownName(w.town_id).toLowerCase() === filterTown.toLowerCase())
    : (weddings ?? []);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const formatDateRange = (start: string, end?: string | null) => {
    const opts: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
    const startStr = new Date(start).toLocaleDateString("en-GB", opts);
    if (end) {
      const endStr = new Date(end).toLocaleDateString("en-GB", opts);
      return `${startStr} - ${endStr}`;
    }
    return startStr;
  };

  const handleWeddingSubmit = async () => {
    const newErrors: Record<string, string> = {};
    if (!weddingForm.brideName.trim()) newErrors.brideName = "Bride's name is required";
    if (!weddingForm.groomName.trim()) newErrors.groomName = "Groom's name is required";
    if (!weddingForm.weddingDate.trim()) newErrors.weddingDate = "Wedding date is required";
    if (!weddingForm.venue.trim()) newErrors.venue = "Venue is required";
    if (!weddingForm.submittedByName.trim()) newErrors.submittedByName = "Your name is required";
    if (!weddingForm.submittedByEmail.trim()) newErrors.submittedByEmail = "Your email is required";
    if (weddingForm.submittedByEmail.trim() && !validateEmail(weddingForm.submittedByEmail)) {
      newErrors.submittedByEmail = "Please enter a valid email address";
    }
    if (weddingForm.contactEmail.trim() && !validateEmail(weddingForm.contactEmail)) {
      newErrors.contactEmail = "Please enter a valid email address";
    }

    setWeddingErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitError("");
    try {
      await createWedding.mutateAsync({
        bride: weddingForm.brideName,
        groom: weddingForm.groomName,
        date: weddingForm.weddingDate,
        end_date: weddingForm.weddingEndDate || null,
        town_id: selectedTown || "akropong",
        venue: weddingForm.venue,
        message: weddingForm.message || null,
        photos: [],
        contact_email: weddingForm.contactEmail || null,
        submitted_by_name: weddingForm.submittedByName || null,
        submitted_by_email: weddingForm.submittedByEmail || null,
        submitted_by_phone: weddingForm.submittedByPhone || null,
        status: "pending",
        submitted_by: null,
        reviewed_by: null,
        review_notes: null,
      });
      setFormSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || "Failed to submit. Please try again.");
    }
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

                <View className="flex-row gap-4 flex-wrap">
                  <View className="flex-1 min-w-[200px]">
                    <Input
                      label="Wedding Start Date *"
                      placeholder="YYYY-MM-DD"
                      value={weddingForm.weddingDate}
                      onChangeText={(text) => {
                        setWeddingForm({ ...weddingForm, weddingDate: text });
                        if (weddingErrors.weddingDate) setWeddingErrors((prev) => ({ ...prev, weddingDate: "" }));
                      }}
                      error={weddingErrors.weddingDate}
                    />
                  </View>
                  <View className="flex-1 min-w-[200px]">
                    <Input
                      label="Wedding End Date"
                      placeholder="YYYY-MM-DD"
                      value={weddingForm.weddingEndDate}
                      onChangeText={(text) => setWeddingForm({ ...weddingForm, weddingEndDate: text })}
                    />
                  </View>
                </View>

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
                    {(towns ?? []).map((town) => (
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

                {/* Submitted By Section */}
                <View className="border-t border-brown-earth/20 pt-4 mt-4">
                  <H3 className="mb-4 text-base">Your Information (Submitter)</H3>
                  <Input
                    label="Your Name *"
                    placeholder="Full name"
                    value={weddingForm.submittedByName}
                    onChangeText={(text) => {
                      setWeddingForm({ ...weddingForm, submittedByName: text });
                      if (weddingErrors.submittedByName) setWeddingErrors((prev) => ({ ...prev, submittedByName: "" }));
                    }}
                    error={weddingErrors.submittedByName}
                  />
                  <Input
                    label="Your Email *"
                    placeholder="email@example.com"
                    keyboardType="email-address"
                    value={weddingForm.submittedByEmail}
                    onChangeText={(text) => {
                      setWeddingForm({ ...weddingForm, submittedByEmail: text });
                      if (weddingErrors.submittedByEmail) setWeddingErrors((prev) => ({ ...prev, submittedByEmail: "" }));
                    }}
                    error={weddingErrors.submittedByEmail}
                  />
                  <Input
                    label="Your Phone Number"
                    placeholder="+233 XX XXX XXXX"
                    keyboardType="phone-pad"
                    value={weddingForm.submittedByPhone}
                    onChangeText={(text) => setWeddingForm({ ...weddingForm, submittedByPhone: text })}
                  />
                </View>

                {submitError ? (
                  <View className="bg-red-kente/10 border border-red-kente/30 rounded-lg p-3 mb-4">
                    <Body className="text-red-kente text-center text-sm">{submitError}</Body>
                  </View>
                ) : null}

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
                    loading={createWedding.isPending}
                    accessibilityHint="Submits the wedding announcement for review"
                  />
                )}

                <Body className="text-sm text-gray-charcoal/60 text-center mt-4">
                  All submissions are reviewed before publishing
                </Body>
              </CardContent>
            </Card>
          </View>
        ) : isLoading ? (
          <LoadingState message="Loading weddings..." />
        ) : error ? (
          <ErrorState message="Failed to load weddings." onRetry={refetch} />
        ) : (
          <View className={isMobile ? "" : "flex-row gap-8"}>
            {/* Main Content */}
            <View className={isMobile ? "" : "flex-1"}>
              {/* Town Filter */}
              <TownFilterDropdown selectedTown={filterTown} onSelectTown={setFilterTown} />

              {/* Wedding Listings */}
              <View className="max-w-3xl">
                {filteredWeddings.map((wedding) => (
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
                          <Body>{formatDateRange(wedding.date, wedding.end_date)}</Body>
                        </View>

                        <View className="flex-row items-center gap-2 mb-1">
                          <FontAwesome name="map-marker" size={14} color="#1B4D3E" />
                          <Body className="text-gray-charcoal/70">{wedding.venue}</Body>
                        </View>

                        <Body className="text-sm text-gold mt-2">{getTownName(wedding.town_id)}</Body>

                        {/* Submitted By Info */}
                        {wedding.submitted_by_name && (
                          <View className="mt-3 pt-3 border-t border-brown-earth/10 w-full items-center">
                            <Body className="text-xs text-gray-charcoal/50">
                              Submitted by: {wedding.submitted_by_name}
                            </Body>
                            {wedding.submitted_by_email && (
                              <Body className="text-xs text-gray-charcoal/50">
                                {wedding.submitted_by_email}
                              </Body>
                            )}
                            {wedding.submitted_by_phone && (
                              <Body className="text-xs text-gray-charcoal/50">
                                {wedding.submitted_by_phone}
                              </Body>
                            )}
                          </View>
                        )}
                      </View>
                    </CardContent>
                  </Card>
                ))}

                {filteredWeddings.length === 0 && (
                  <View className="py-12 items-center">
                    <FontAwesome name="inbox" size={48} color="#2C3E5030" />
                    <Body className="text-gray-charcoal/50 mt-4">
                      No wedding announcements at this time
                    </Body>
                  </View>
                )}
              </View>
            </View>

            {/* Sidebar - Helpful Resources */}
            <View className={isMobile ? "mt-8" : "w-[300px]"}>
              <HelpfulResources />
            </View>
          </View>
        )}
      </Section>
    </PageLayout>
  );
}
