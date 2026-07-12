import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import { PageLayout, Section } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { Input, TextArea } from "@/components/ui/Input";
import { FontAwesome } from "@expo/vector-icons";
import { useObituaries, useCreateObituary } from "@/hooks/useObituaries";
import { useTowns } from "@/hooks/useTowns";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { TownFilterDropdown, HelpfulResources } from "@/components/community";
import { Body, BodyLarge, Card, Display, H3 } from "@/components/ui";
import { useResponsive } from "@/hooks/useResponsive";
import { theme } from "@/constants/theme";

export default function ObituariesScreen() {
  const { isMobile } = useResponsive();
  const [showForm, setShowForm] = useState(false);
  const [selectedTown, setSelectedTown] = useState("");
  const [filterTown, setFilterTown] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [obitForm, setObitForm] = useState({
    name: "",
    birthDate: "",
    passedDate: "",
    funeralDate: "",
    funeralEndDate: "",
    biography: "",
    contactEmail: "",
    submittedByName: "",
    submittedByEmail: "",
    submittedByPhone: "",
  });
  const [obitErrors, setObitErrors] = useState<Record<string, string>>({});

  const { data: obituaries, isLoading, error, refetch } = useObituaries({ status: "approved" });
  const { data: towns } = useTowns();
  const createObituary = useCreateObituary();

  const getTownName = (townId: string) => {
    const town = (towns ?? []).find((t) => t.id === townId);
    return town?.name || townId;
  };

  const filteredObituaries = filterTown
    ? (obituaries ?? []).filter((o) => getTownName(o.town_id).toLowerCase() === filterTown.toLowerCase())
    : (obituaries ?? []);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleObitSubmit = async () => {
    const newErrors: Record<string, string> = {};
    if (!obitForm.name.trim()) newErrors.name = "Name of deceased is required";
    if (!obitForm.passedDate.trim()) newErrors.passedDate = "Date of passing is required";
    if (!obitForm.funeralDate.trim()) newErrors.funeralDate = "Funeral date is required";
    if (!obitForm.submittedByName.trim()) newErrors.submittedByName = "Your name is required";
    if (!obitForm.submittedByEmail.trim()) newErrors.submittedByEmail = "Your email is required";
    if (obitForm.submittedByEmail.trim() && !validateEmail(obitForm.submittedByEmail)) {
      newErrors.submittedByEmail = "Please enter a valid email address";
    }
    if (obitForm.contactEmail.trim() && !validateEmail(obitForm.contactEmail)) {
      newErrors.contactEmail = "Please enter a valid email address";
    }

    setObitErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitError("");
    try {
      await createObituary.mutateAsync({
        name: obitForm.name,
        birth_date: obitForm.birthDate || null,
        passed_date: obitForm.passedDate,
        funeral_date: obitForm.funeralDate,
        funeral_end_date: obitForm.funeralEndDate || null,
        town_id: selectedTown || "akropong",
        biography: obitForm.biography || null,
        family_contact: obitForm.contactEmail || null,
        photo_url: null,
        submitted_by_name: obitForm.submittedByName || null,
        submitted_by_email: obitForm.submittedByEmail || null,
        submitted_by_phone: obitForm.submittedByPhone || null,
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

  const formatDateRange = (start: string, end?: string | null) => {
    const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
    const startStr = new Date(start).toLocaleDateString("en-GB", opts);
    if (end) {
      const endStr = new Date(end).toLocaleDateString("en-GB", opts);
      return `${startStr} - ${endStr}`;
    }
    return startStr;
  };

  return (
    <PageLayout>
      {/* Page header band — quiet, respectful */}
      <Section background="green-dark" className="py-20 md:py-28">
        <View className="max-w-3xl mx-auto items-center">
          <Text className="font-accent text-eyebrow uppercase tracking-widest text-white/60 mb-4 text-center">
            In Memoriam
          </Text>
          <Display className="text-white text-center mb-5">Obituaries</Display>
          <View className="w-16 h-[2px] bg-white/30 mb-6" />
          <BodyLarge className="text-white/80 text-center">
            Honoring the memory of our departed community members
          </BodyLarge>
        </View>
      </Section>

      {/* Actions & Content */}
      <Section background="white">
        <View className="flex-row flex-wrap gap-4 justify-between items-center mb-10">
          <Text className="font-heading-bold text-h2 md:text-h2-desktop text-gray-charcoal">
            Recent Obituaries
          </Text>
          <Button
            title={showForm ? "View Listings" : "Submit Obituary"}
            onPress={() => setShowForm(!showForm)}
            variant={showForm ? "outline" : "primary"}
          />
        </View>

        {showForm ? (
          /* Submission Form */
          <View className="max-w-2xl mx-auto w-full">
            <Card className="p-8">
              <H3 className="mb-6">Submit an Obituary</H3>

              <Input
                label="Full Name of Deceased *"
                placeholder="Enter full name"
                value={obitForm.name}
                onChangeText={(text) => {
                  setObitForm({ ...obitForm, name: text });
                  if (obitErrors.name) setObitErrors((prev) => ({ ...prev, name: "" }));
                }}
                error={obitErrors.name}
              />

              <View className={isMobile ? undefined : "flex-row gap-4"}>
                <View className={isMobile ? undefined : "flex-1"}>
                  <Input
                    label="Date of Birth"
                    placeholder="YYYY-MM-DD"
                    value={obitForm.birthDate}
                    onChangeText={(text) => setObitForm({ ...obitForm, birthDate: text })}
                  />
                </View>
                <View className={isMobile ? undefined : "flex-1"}>
                  <Input
                    label="Date of Passing *"
                    placeholder="YYYY-MM-DD"
                    value={obitForm.passedDate}
                    onChangeText={(text) => {
                      setObitForm({ ...obitForm, passedDate: text });
                      if (obitErrors.passedDate) setObitErrors((prev) => ({ ...prev, passedDate: "" }));
                    }}
                    error={obitErrors.passedDate}
                  />
                </View>
              </View>

              <View className={isMobile ? undefined : "flex-row gap-4"}>
                <View className={isMobile ? undefined : "flex-1"}>
                  <Input
                    label="Funeral Start Date *"
                    placeholder="YYYY-MM-DD"
                    value={obitForm.funeralDate}
                    onChangeText={(text) => {
                      setObitForm({ ...obitForm, funeralDate: text });
                      if (obitErrors.funeralDate) setObitErrors((prev) => ({ ...prev, funeralDate: "" }));
                    }}
                    error={obitErrors.funeralDate}
                  />
                </View>
                <View className={isMobile ? undefined : "flex-1"}>
                  <Input
                    label="Funeral End Date"
                    placeholder="YYYY-MM-DD"
                    value={obitForm.funeralEndDate}
                    onChangeText={(text) => setObitForm({ ...obitForm, funeralEndDate: text })}
                  />
                </View>
              </View>

              <View className="mb-4">
                <Text className="font-body-semibold text-[15px] text-gray-charcoal mb-2">Town</Text>
                <View className="flex-row flex-wrap gap-2">
                  {(towns ?? []).map((town) => (
                    <Pressable
                      key={town.id}
                      onPress={() => setSelectedTown(town.id)}
                      className={`px-3 py-2 min-h-[44px] justify-center rounded-lg border ${
                        selectedTown === town.id
                          ? "bg-gray-charcoal border-gray-charcoal"
                          : "bg-white border-gray-charcoal/20"
                      }`}
                      accessibilityRole="radio"
                      accessibilityLabel={town.name}
                      accessibilityState={{ selected: selectedTown === town.id }}
                    >
                      <Text
                        className={`font-body text-sm ${
                          selectedTown === town.id ? "text-white" : "text-gray-charcoal"
                        }`}
                      >
                        {town.name}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <TextArea
                label="Brief Biography (Optional)"
                placeholder="Share a few words about the deceased..."
                value={obitForm.biography}
                onChangeText={(text) => setObitForm({ ...obitForm, biography: text })}
              />

              <View className="mb-6">
                <Text className="font-body-semibold text-[15px] text-gray-charcoal mb-2">Photo</Text>
                <Pressable
                  className="border-2 border-dashed border-gray-charcoal/20 rounded-xl p-8 items-center min-h-[44px]"
                  accessibilityRole="button"
                  accessibilityLabel="Upload photo"
                  accessibilityHint="Tap to upload a photo of the deceased"
                >
                  <FontAwesome name="camera" size={32} color="rgba(45, 45, 45, 0.25)" />
                  <Body className="text-gray-muted mt-2">Tap to upload photo</Body>
                  <Text className="font-body text-[13px] text-gray-muted/70">Max 5MB, JPG or PNG</Text>
                </Pressable>
              </View>

              <Input
                label="Family Contact Email"
                placeholder="email@example.com"
                keyboardType="email-address"
                value={obitForm.contactEmail}
                onChangeText={(text) => {
                  setObitForm({ ...obitForm, contactEmail: text });
                  if (obitErrors.contactEmail) setObitErrors((prev) => ({ ...prev, contactEmail: "" }));
                }}
                error={obitErrors.contactEmail}
                accessibilityHint="Enter email for family contact"
              />

              {/* Submitted By Section */}
              <View className="border-t border-gray-charcoal/10 pt-5 mt-4">
                <Text className="font-heading-bold text-base text-gray-charcoal mb-4">
                  Your Information (Submitter)
                </Text>
                <Input
                  label="Your Name *"
                  placeholder="Full name"
                  value={obitForm.submittedByName}
                  onChangeText={(text) => {
                    setObitForm({ ...obitForm, submittedByName: text });
                    if (obitErrors.submittedByName) setObitErrors((prev) => ({ ...prev, submittedByName: "" }));
                  }}
                  error={obitErrors.submittedByName}
                />
                <Input
                  label="Your Email *"
                  placeholder="email@example.com"
                  keyboardType="email-address"
                  value={obitForm.submittedByEmail}
                  onChangeText={(text) => {
                    setObitForm({ ...obitForm, submittedByEmail: text });
                    if (obitErrors.submittedByEmail) setObitErrors((prev) => ({ ...prev, submittedByEmail: "" }));
                  }}
                  error={obitErrors.submittedByEmail}
                />
                <Input
                  label="Your Phone Number"
                  placeholder="+233 XX XXX XXXX"
                  keyboardType="phone-pad"
                  value={obitForm.submittedByPhone}
                  onChangeText={(text) => setObitForm({ ...obitForm, submittedByPhone: text })}
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
                    Your obituary has been received. It will be reviewed and published with care and respect.
                  </Body>
                </View>
              ) : (
                <Button
                  title="Submit for Review"
                  onPress={handleObitSubmit}
                  fullWidth
                  loading={createObituary.isPending}
                  accessibilityHint="Submits the obituary for review"
                />
              )}

              <Text className="font-body text-[13px] text-gray-muted text-center mt-4">
                All submissions are reviewed before publishing
              </Text>
            </Card>
          </View>
        ) : isLoading ? (
          <LoadingState message="Loading obituaries..." />
        ) : error ? (
          <ErrorState message="Failed to load obituaries." onRetry={refetch} />
        ) : (
          <View className={isMobile ? undefined : "flex-row gap-12"}>
            {/* Main list — quiet, muted rows */}
            <View className={isMobile ? undefined : "flex-1"}>
              <TownFilterDropdown selectedTown={filterTown} onSelectTown={setFilterTown} />

              <View className="max-w-3xl">
                {filteredObituaries.map((obituary) => (
                  <View
                    key={obituary.id}
                    className="py-8 border-b border-gray-charcoal/10"
                    accessibilityLabel={`Obituary of ${obituary.name}`}
                  >
                    <View className="flex-row flex-wrap items-center gap-3 mb-3">
                      <Text className="font-body text-sm text-gray-muted">
                        {obituary.birth_date ? new Date(obituary.birth_date).getFullYear() : "?"} –{" "}
                        {new Date(obituary.passed_date).getFullYear()}
                      </Text>
                      <View className="w-1 h-1 rounded-full bg-gray-muted/50" />
                      <Text className="font-accent text-xs uppercase tracking-widest text-gray-muted">
                        {getTownName(obituary.town_id)}
                      </Text>
                    </View>

                    <Text className="font-heading text-xl md:text-2xl text-gray-charcoal mb-2">
                      {obituary.name}
                    </Text>

                    <Body className="text-gray-muted text-sm">
                      Funeral: {formatDateRange(obituary.funeral_date, obituary.funeral_end_date)}
                    </Body>

                    {obituary.biography ? (
                      <Body className="text-gray-muted mt-2 max-w-2xl" numberOfLines={3}>
                        {obituary.biography}
                      </Body>
                    ) : null}

                    {obituary.submitted_by_name && (
                      <Text className="font-body text-xs text-gray-muted mt-3">
                        Submitted by: {obituary.submitted_by_name}
                        {obituary.submitted_by_email ? ` · ${obituary.submitted_by_email}` : ""}
                        {obituary.submitted_by_phone ? ` · ${obituary.submitted_by_phone}` : ""}
                      </Text>
                    )}
                  </View>
                ))}

                {filteredObituaries.length === 0 && (
                  <View className="py-16 items-center">
                    <FontAwesome name="inbox" size={40} color="rgba(45, 45, 45, 0.15)" />
                    <Body className="text-gray-muted mt-4">No obituaries at this time</Body>
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
