import { View, Text, Pressable, Platform } from "react-native";
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
import { BodyLarge, Display, Title } from "@/components/ui";
import { useResponsive } from "@/hooks/useResponsive";
import { tokens } from "@/constants/tokens";

const isWeb = Platform.OS === "web";

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
      {/* Page title band — quiet, respectful, no accent color */}
      <Section background="ink" className="pb-10 md:pb-16">
        <View className="max-w-4xl">
          <Text className="font-body-medium text-label uppercase tracking-[3px] text-ivory/40 mb-6">
            In Memoriam
          </Text>
          <Display className="mb-8">Obituaries</Display>
          <BodyLarge className="text-ivory/60 max-w-xl">
            Honoring the memory of our departed community members.
          </BodyLarge>
        </View>
      </Section>

      {/* Content */}
      <Section background="ink">
        <View className="flex-row flex-wrap gap-6 justify-between items-center mb-12 md:mb-16 border-t border-white/10 pt-10">
          <Title>{showForm ? "Submit an Obituary" : "Recent Obituaries"}</Title>
          <Button
            title={showForm ? "View Listings" : "Submit Obituary"}
            onPress={() => setShowForm(!showForm)}
            variant="secondary"
          />
        </View>

        {showForm ? (
          /* Submission Form — muted panel */
          <View className="max-w-2xl w-full">
            <View className="bg-ink-raised p-8 md:p-12 border-t border-white/10">
              <Text className="font-body-medium text-label uppercase tracking-[3px] text-ivory/50 mb-8">
                Submission Form
              </Text>

              <Input
                variant="underline"
                label="Full Name of Deceased *"
                placeholder="Enter full name"
                value={obitForm.name}
                onChangeText={(text) => {
                  setObitForm({ ...obitForm, name: text });
                  if (obitErrors.name) setObitErrors((prev) => ({ ...prev, name: "" }));
                }}
                error={obitErrors.name}
              />

              <View className={isMobile ? undefined : "flex-row gap-8"}>
                <View className={isMobile ? undefined : "flex-1"}>
                  <Input
                    variant="underline"
                    label="Date of Birth"
                    placeholder="YYYY-MM-DD"
                    value={obitForm.birthDate}
                    onChangeText={(text) => setObitForm({ ...obitForm, birthDate: text })}
                  />
                </View>
                <View className={isMobile ? undefined : "flex-1"}>
                  <Input
                    variant="underline"
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

              <View className={isMobile ? undefined : "flex-row gap-8"}>
                <View className={isMobile ? undefined : "flex-1"}>
                  <Input
                    variant="underline"
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
                    variant="underline"
                    label="Funeral End Date"
                    placeholder="YYYY-MM-DD"
                    value={obitForm.funeralEndDate}
                    onChangeText={(text) => setObitForm({ ...obitForm, funeralEndDate: text })}
                  />
                </View>
              </View>

              {/* Town — hairline toggle rows, muted */}
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
                          className={`font-body text-sm ${active ? "text-ivory" : "text-ivory/60"}`}
                        >
                          {town.name}
                        </Text>
                        <Text
                          className={`font-body-medium text-label uppercase tracking-[3px] ${
                            active ? "text-ivory" : "text-ivory/30"
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
                label="Brief Biography (Optional)"
                placeholder="Share a few words about the deceased..."
                value={obitForm.biography}
                onChangeText={(text) => setObitForm({ ...obitForm, biography: text })}
              />

              {/* Photo */}
              <View className="mb-8">
                <Text className="font-body-medium text-label uppercase tracking-[3px] text-ivory/60 mb-4">
                  Photo
                </Text>
                <Pressable
                  className="border border-white/15 p-8 items-center min-h-[44px]"
                  style={isWeb ? ({ cursor: "pointer" } as any) : undefined}
                  accessibilityRole="button"
                  accessibilityLabel="Upload photo"
                  accessibilityHint="Tap to upload a photo of the deceased"
                >
                  <FontAwesome name="camera" size={24} color={tokens.colors.ivory} style={{ opacity: 0.4 }} />
                  <Text className="font-body text-sm text-ivory/60 mt-3">Tap to upload photo</Text>
                  <Text className="font-body text-xs text-ivory/35 mt-1">Max 5MB, JPG or PNG</Text>
                </Pressable>
              </View>

              <Input
                variant="underline"
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
              <View className="border-t border-white/10 pt-8 mt-6">
                <Text className="font-body-medium text-label uppercase tracking-[3px] text-ivory/50 mb-6">
                  Your Information
                </Text>
                <Input
                  variant="underline"
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
                  variant="underline"
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
                  variant="underline"
                  label="Your Phone Number"
                  placeholder="+233 XX XXX XXXX"
                  keyboardType="phone-pad"
                  value={obitForm.submittedByPhone}
                  onChangeText={(text) => setObitForm({ ...obitForm, submittedByPhone: text })}
                />
              </View>

              {submitError ? (
                <View className="border-l-2 border-red-kente pl-4 py-2 mb-6">
                  <Text className="font-body text-sm text-red-kente">{submitError}</Text>
                </View>
              ) : null}

              {formSubmitted ? (
                <View className="border-t border-white/25 pt-8 mt-2">
                  <FontAwesome name="check" size={20} color={tokens.colors.ivory} />
                  <Text className="font-display text-xl text-ivory mt-4 mb-2">
                    Thank you for your submission.
                  </Text>
                  <Text className="font-body text-sm text-ivory/60 leading-relaxed">
                    Your obituary has been received. It will be reviewed and published with care and respect.
                  </Text>
                </View>
              ) : (
                <Button
                  title="Submit for Review"
                  onPress={handleObitSubmit}
                  fullWidth
                  variant="secondary"
                  loading={createObituary.isPending}
                  accessibilityHint="Submits the obituary for review"
                />
              )}

              <Text className="font-body text-xs text-ivory/40 text-center mt-6">
                All submissions are reviewed before publishing
              </Text>
            </View>
          </View>
        ) : isLoading ? (
          <LoadingState message="Loading obituaries..." />
        ) : error ? (
          <ErrorState message="Failed to load obituaries." onRetry={refetch} />
        ) : (
          <View className={isMobile ? undefined : "flex-row gap-20"}>
            {/* Main list — quiet editorial index, no accent color */}
            <View className={isMobile ? undefined : "flex-1"}>
              <TownFilterDropdown selectedTown={filterTown} onSelectTown={setFilterTown} />

              <View className="max-w-3xl">
                {filteredObituaries.map((obituary) => (
                  <Pressable
                    key={obituary.id}
                    accessibilityLabel={`Obituary of ${obituary.name}`}
                    className="py-10 border-b border-white/10"
                    style={isWeb ? ({ cursor: "default" } as any) : undefined}
                  >
                    {({ hovered }: any) => (
                      <>
                        <View className="flex-row flex-wrap items-baseline gap-x-5 gap-y-2 mb-4">
                          <Text className="font-body-medium text-label uppercase tracking-[3px] text-ivory/40">
                            {obituary.birth_date ? new Date(obituary.birth_date).getFullYear() : "?"} –{" "}
                            {new Date(obituary.passed_date).getFullYear()}
                          </Text>
                          <Text className="font-body-medium text-label uppercase tracking-[3px] text-ivory/40">
                            {getTownName(obituary.town_id)}
                          </Text>
                        </View>

                        <Text
                          className={`font-display text-xl md:text-2xl mb-3 ${
                            hovered && isWeb ? "text-white" : "text-ivory"
                          }`}
                          style={isWeb ? ({ transition: "color 0.25s ease" } as any) : undefined}
                        >
                          {obituary.name}
                        </Text>

                        <Text className="font-body text-sm text-ivory/50">
                          Funeral: {formatDateRange(obituary.funeral_date, obituary.funeral_end_date)}
                        </Text>

                        {obituary.biography ? (
                          <Text className="font-body text-base leading-relaxed text-ivory/50 mt-3 max-w-2xl" numberOfLines={3}>
                            {obituary.biography}
                          </Text>
                        ) : null}

                        {obituary.submitted_by_name && (
                          <Text className="font-body text-xs text-ivory/35 mt-4">
                            Submitted by: {obituary.submitted_by_name}
                            {obituary.submitted_by_email ? ` · ${obituary.submitted_by_email}` : ""}
                            {obituary.submitted_by_phone ? ` · ${obituary.submitted_by_phone}` : ""}
                          </Text>
                        )}
                      </>
                    )}
                  </Pressable>
                ))}

                {filteredObituaries.length === 0 && (
                  <View className="py-20 border-b border-white/10">
                    <Text className="font-display-italic text-lg text-ivory/40">
                      No obituaries at this time.
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
