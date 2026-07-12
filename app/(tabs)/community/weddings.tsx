import { View, Text, Pressable, Platform } from "react-native";
import { useState } from "react";
import { PageLayout, Section } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { Input, TextArea } from "@/components/ui/Input";
import { FontAwesome } from "@expo/vector-icons";
import { useWeddings, useCreateWedding } from "@/hooks/useWeddings";
import { useTowns } from "@/hooks/useTowns";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { TownFilterDropdown, HelpfulResources } from "@/components/community";
import { Body, BodyLarge, Card, Display, Eyebrow, H3 } from "@/components/ui";
import { useResponsive } from "@/hooks/useResponsive";
import { theme } from "@/constants/theme";

const isWeb = Platform.OS === "web";

export default function WeddingsScreen() {
  const { isMobile } = useResponsive();
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
      {/* Page header band */}
      <Section background="green-dark" className="py-20 md:py-28">
        <View className="max-w-3xl mx-auto items-center">
          <Eyebrow className="mb-4 text-center">Celebrations</Eyebrow>
          <Display className="text-white text-center mb-5">
            Wedding Announcements
          </Display>
          <View className="w-16 h-[2px] bg-gold mb-6" />
          <BodyLarge className="text-white/80 text-center">
            Celebrating love and union in our community
          </BodyLarge>
        </View>
      </Section>

      {/* Content */}
      <Section background="white">
        <View className="flex-row flex-wrap gap-4 justify-between items-center mb-10">
          <Text className="font-heading-bold text-h2 md:text-h2-desktop text-gray-charcoal">
            Recent Announcements
          </Text>
          <Button
            title={showForm ? "View Announcements" : "Submit Announcement"}
            onPress={() => setShowForm(!showForm)}
            variant={showForm ? "outline" : "primary"}
          />
        </View>

        {showForm ? (
          /* Submission Form */
          <View className="max-w-2xl mx-auto w-full">
            <Card goldBorder className="p-8">
              <H3 className="mb-6">Announce Your Wedding</H3>

              <View className={isMobile ? undefined : "flex-row gap-4"}>
                <View className={isMobile ? undefined : "flex-1"}>
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
                <View className={isMobile ? undefined : "flex-1"}>
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

              <View className={isMobile ? undefined : "flex-row gap-4"}>
                <View className={isMobile ? undefined : "flex-1"}>
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
                <View className={isMobile ? undefined : "flex-1"}>
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
                <Text className="font-body-semibold text-[15px] text-gray-charcoal mb-2">Town</Text>
                <View className="flex-row flex-wrap gap-2">
                  {(towns ?? []).map((town) => (
                    <Pressable
                      key={town.id}
                      onPress={() => setSelectedTown(town.id)}
                      className={`px-3 py-2 min-h-[44px] justify-center rounded-lg border ${
                        selectedTown === town.id
                          ? "bg-green-deep border-green-deep"
                          : "bg-white border-gray-charcoal/20"
                      }`}
                      accessibilityRole="radio"
                      accessibilityLabel={town.name}
                      accessibilityState={{ selected: selectedTown === town.id }}
                    >
                      <Text
                        className={`font-body text-sm ${
                          selectedTown === town.id ? "text-gold-light" : "text-gray-charcoal"
                        }`}
                      >
                        {town.name}
                      </Text>
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
                <Text className="font-body-semibold text-[15px] text-gray-charcoal mb-2">Photos</Text>
                <Pressable
                  className="border-2 border-dashed border-gold/30 rounded-xl p-8 items-center min-h-[44px]"
                  accessibilityRole="button"
                  accessibilityLabel="Upload engagement photos"
                  accessibilityHint="Tap to upload up to 3 engagement photos"
                >
                  <FontAwesome name="camera" size={32} color={theme.colors.goldAccent} style={{ opacity: 0.5 }} />
                  <Body className="text-gray-muted mt-2">Tap to upload engagement photos</Body>
                  <Text className="font-body text-[13px] text-gray-muted/70">Max 5MB each, up to 3 photos</Text>
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
              <View className="border-t border-gray-charcoal/10 pt-5 mt-4">
                <Text className="font-heading-bold text-base text-gray-charcoal mb-4">
                  Your Information (Submitter)
                </Text>
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
                <View className="bg-red-kente/10 border border-red-kente/25 rounded-xl p-3 mb-4">
                  <Text className="font-body text-sm text-red-kente text-center">{submitError}</Text>
                </View>
              ) : null}

              {formSubmitted ? (
                <View className="bg-green-deep/10 border border-green-deep/25 rounded-xl p-5 items-center">
                  <FontAwesome name="check-circle" size={24} color={theme.colors.primaryGreen} />
                  <Text className="font-body-semibold text-base text-green-deep mt-2">
                    Thank you for your submission.
                  </Text>
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

              <Text className="font-body text-[13px] text-gray-muted text-center mt-4">
                All submissions are reviewed before publishing
              </Text>
            </Card>
          </View>
        ) : isLoading ? (
          <LoadingState message="Loading weddings..." />
        ) : error ? (
          <ErrorState message="Failed to load weddings." onRetry={refetch} />
        ) : (
          <View className={isMobile ? undefined : "flex-row gap-12"}>
            {/* Main list */}
            <View className={isMobile ? undefined : "flex-1"}>
              <TownFilterDropdown selectedTown={filterTown} onSelectTown={setFilterTown} />

              <View className="max-w-3xl">
                {filteredWeddings.map((wedding) => (
                  <Pressable
                    key={wedding.id}
                    accessibilityLabel={`Wedding of ${wedding.bride} and ${wedding.groom}`}
                    className="py-8 border-b border-gray-charcoal/10"
                    style={isWeb ? ({ cursor: "default" } as any) : undefined}
                  >
                    {({ hovered }: any) => (
                      <>
                        <View className="flex-row flex-wrap items-center gap-3 mb-3">
                          <Text className="font-body text-sm text-gray-muted">
                            {formatDateRange(wedding.date, wedding.end_date)}
                          </Text>
                          <View className="w-1 h-1 rounded-full bg-gold" />
                          <Text className="font-accent text-xs uppercase tracking-widest text-gold">
                            {getTownName(wedding.town_id)}
                          </Text>
                        </View>

                        <Text
                          className={`font-heading-bold text-xl md:text-2xl mb-2 ${
                            hovered && isWeb ? "text-green-deep" : "text-gray-charcoal"
                          }`}
                          style={isWeb ? ({ transition: "color 0.2s ease" } as any) : undefined}
                        >
                          {wedding.bride} & {wedding.groom}
                        </Text>

                        <View className="flex-row items-center gap-2">
                          <FontAwesome name="map-marker" size={13} color={theme.colors.goldAccent} />
                          <Body className="text-gray-muted text-sm">{wedding.venue}</Body>
                        </View>

                        {wedding.message ? (
                          <Body className="text-gray-muted mt-2 max-w-2xl" numberOfLines={3}>
                            {wedding.message}
                          </Body>
                        ) : null}

                        {wedding.submitted_by_name && (
                          <Text className="font-body text-xs text-gray-muted mt-3">
                            Submitted by: {wedding.submitted_by_name}
                            {wedding.submitted_by_email ? ` · ${wedding.submitted_by_email}` : ""}
                            {wedding.submitted_by_phone ? ` · ${wedding.submitted_by_phone}` : ""}
                          </Text>
                        )}
                      </>
                    )}
                  </Pressable>
                ))}

                {filteredWeddings.length === 0 && (
                  <View className="py-16 items-center">
                    <FontAwesome name="inbox" size={40} color="rgba(45, 45, 45, 0.15)" />
                    <Body className="text-gray-muted mt-4">
                      No wedding announcements at this time
                    </Body>
                  </View>
                )}
              </View>
            </View>

            {/* Sidebar */}
            <View className={isMobile ? "mt-10" : "w-[300px]"}>
              <HelpfulResources />
            </View>
          </View>
        )}
      </Section>
    </PageLayout>
  );
}
