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
import { BodyLarge, Display, Label, Title } from "@/components/ui";
import { useResponsive } from "@/hooks/useResponsive";
import { tokens } from "@/constants/tokens";

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
      {/* Page title band */}
      <Section background="ink" className="pb-10 md:pb-16">
        <View className="max-w-4xl">
          <Label className="mb-6">Celebrations</Label>
          <Display className="mb-8">Weddings</Display>
          <BodyLarge className="text-ivory/60 max-w-xl">
            Celebrating love and union across the seventeen towns.
          </BodyLarge>
        </View>
      </Section>

      {/* Content */}
      <Section background="ink" number="01" label={showForm ? "Submission" : "The Register"}>
        <View className="flex-row flex-wrap gap-6 justify-between items-center mb-12 md:mb-16">
          <Title>{showForm ? "Announce Your Wedding" : "Recent Announcements"}</Title>
          <Button
            title={showForm ? "View Announcements" : "Submit Announcement"}
            onPress={() => setShowForm(!showForm)}
            variant={showForm ? "secondary" : "primary"}
          />
        </View>

        {showForm ? (
          /* Submission Form */
          <View className="max-w-2xl w-full">
            <View className="bg-ink-raised p-8 md:p-12 border-t border-white/10">
              <Label className="text-ivory/50 mb-8">Submission Form</Label>

              <View className={isMobile ? undefined : "flex-row gap-8"}>
                <View className={isMobile ? undefined : "flex-1"}>
                  <Input
                    variant="underline"
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
                    variant="underline"
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

              <View className={isMobile ? undefined : "flex-row gap-8"}>
                <View className={isMobile ? undefined : "flex-1"}>
                  <Input
                    variant="underline"
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
                    variant="underline"
                    label="Wedding End Date"
                    placeholder="YYYY-MM-DD"
                    value={weddingForm.weddingEndDate}
                    onChangeText={(text) => setWeddingForm({ ...weddingForm, weddingEndDate: text })}
                  />
                </View>
              </View>

              <Input
                variant="underline"
                label="Venue *"
                placeholder="Church or location name"
                value={weddingForm.venue}
                onChangeText={(text) => {
                  setWeddingForm({ ...weddingForm, venue: text });
                  if (weddingErrors.venue) setWeddingErrors((prev) => ({ ...prev, venue: "" }));
                }}
                error={weddingErrors.venue}
              />

              {/* Town — hairline toggle rows */}
              <View className="mb-8 mt-4">
                <Text className="font-body-medium text-label uppercase tracking-[3px] text-ivory/60 mb-4">
                  Town
                </Text>
                <View className="border-t border-white/10">
                  {(towns ?? []).map((town) => {
                    const active = selectedTown === town.id;
                    return (
                      <Pressable
                        key={town.id}
                        onPress={() => setSelectedTown(town.id)}
                        className="flex-row items-center justify-between py-3 border-b border-white/10 min-h-[44px]"
                        style={isWeb ? ({ cursor: "pointer" } as any) : undefined}
                        accessibilityRole="radio"
                        accessibilityLabel={town.name}
                        accessibilityState={{ selected: active }}
                      >
                        <Text
                          className={`font-body text-sm ${active ? "text-champagne" : "text-ivory/70"}`}
                        >
                          {town.name}
                        </Text>
                        <Text
                          className={`font-body-medium text-label uppercase tracking-[3px] ${
                            active ? "text-champagne" : "text-ivory/30"
                          }`}
                        >
                          {active ? "Selected" : "Select"}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <TextArea
                variant="underline"
                label="Message (Optional)"
                placeholder="Share a message with the community..."
                value={weddingForm.message}
                onChangeText={(text) => setWeddingForm({ ...weddingForm, message: text })}
              />

              {/* Photos */}
              <View className="mb-8">
                <Text className="font-body-medium text-label uppercase tracking-[3px] text-ivory/60 mb-4">
                  Photos
                </Text>
                <Pressable
                  className="border border-white/15 p-8 items-center min-h-[44px]"
                  style={isWeb ? ({ cursor: "pointer" } as any) : undefined}
                  accessibilityRole="button"
                  accessibilityLabel="Upload engagement photos"
                  accessibilityHint="Tap to upload up to 3 engagement photos"
                >
                  <FontAwesome name="camera" size={24} color={tokens.colors.champagne} style={{ opacity: 0.6 }} />
                  <Text className="font-body text-sm text-ivory/60 mt-3">
                    Tap to upload engagement photos
                  </Text>
                  <Text className="font-body text-xs text-ivory/35 mt-1">
                    Max 5MB each, up to 3 photos
                  </Text>
                </Pressable>
              </View>

              <Input
                variant="underline"
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
              <View className="border-t border-white/10 pt-8 mt-6">
                <Label className="text-ivory/50 mb-6">Your Information</Label>
                <Input
                  variant="underline"
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
                  variant="underline"
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
                  variant="underline"
                  label="Your Phone Number"
                  placeholder="+233 XX XXX XXXX"
                  keyboardType="phone-pad"
                  value={weddingForm.submittedByPhone}
                  onChangeText={(text) => setWeddingForm({ ...weddingForm, submittedByPhone: text })}
                />
              </View>

              {submitError ? (
                <View className="border-l-2 border-red-kente pl-4 py-2 mb-6">
                  <Text className="font-body text-sm text-red-kente">{submitError}</Text>
                </View>
              ) : null}

              {formSubmitted ? (
                <View className="border-t border-champagne/40 pt-8 mt-2">
                  <FontAwesome name="check" size={20} color={tokens.colors.champagne} />
                  <Text className="font-display text-xl text-ivory mt-4 mb-2">
                    Thank you for your submission.
                  </Text>
                  <Text className="font-body text-sm text-ivory/60 leading-relaxed">
                    Your wedding announcement has been received and will be reviewed before publishing.
                  </Text>
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

              <Text className="font-body text-xs text-ivory/40 text-center mt-6">
                All submissions are reviewed before publishing
              </Text>
            </View>
          </View>
        ) : isLoading ? (
          <LoadingState message="Loading weddings..." />
        ) : error ? (
          <ErrorState message="Failed to load weddings." onRetry={refetch} />
        ) : (
          <View className={isMobile ? undefined : "flex-row gap-20"}>
            {/* Main list — editorial index */}
            <View className={isMobile ? undefined : "flex-1"}>
              <TownFilterDropdown selectedTown={filterTown} onSelectTown={setFilterTown} />

              <View className="max-w-3xl">
                {filteredWeddings.map((wedding) => (
                  <Pressable
                    key={wedding.id}
                    accessibilityLabel={`Wedding of ${wedding.bride} and ${wedding.groom}`}
                    className="py-10 border-b border-white/10"
                    style={isWeb ? ({ cursor: "default" } as any) : undefined}
                  >
                    {({ hovered }: any) => (
                      <>
                        <View className="flex-row flex-wrap items-baseline gap-x-5 gap-y-2 mb-4">
                          <Text className="font-body-medium text-label uppercase tracking-[3px] text-ivory/40">
                            {formatDateRange(wedding.date, wedding.end_date)}
                          </Text>
                          <Text className="font-body-medium text-label uppercase tracking-[3px] text-champagne">
                            {getTownName(wedding.town_id)}
                          </Text>
                        </View>

                        <Text
                          className={`font-display text-xl md:text-2xl mb-3 ${
                            hovered && isWeb ? "text-champagne" : "text-ivory"
                          }`}
                          style={isWeb ? ({ transition: "color 0.25s ease" } as any) : undefined}
                        >
                          {wedding.bride} & {wedding.groom}
                        </Text>

                        <Text className="font-body text-sm text-ivory/50">
                          {wedding.venue}
                        </Text>

                        {wedding.message ? (
                          <Text className="font-body text-base leading-relaxed text-ivory/50 mt-3 max-w-2xl" numberOfLines={3}>
                            {wedding.message}
                          </Text>
                        ) : null}

                        {wedding.submitted_by_name && (
                          <Text className="font-body text-xs text-ivory/35 mt-4">
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
                  <View className="py-20 border-b border-white/10">
                    <Text className="font-display-italic text-lg text-ivory/40">
                      No wedding announcements at this time.
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* Sidebar */}
            <View className={isMobile ? "mt-16" : "w-[300px]"}>
              <HelpfulResources />
            </View>
          </View>
        )}
      </Section>
    </PageLayout>
  );
}
