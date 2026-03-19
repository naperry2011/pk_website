import { View, Pressable, useWindowDimensions } from "react-native";
import { useState } from "react";
import { PageLayout, Section } from "@/components/layout";
import { H1, H2, H3, Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Input, TextArea } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { FontAwesome } from "@expo/vector-icons";
import { useObituaries, useCreateObituary } from "@/hooks/useObituaries";
import { useTowns } from "@/hooks/useTowns";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { TownFilterDropdown, HelpfulResources } from "@/components/community";

export default function ObituariesScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
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
      {/* Hero */}
      <View className="bg-red-kente/90 py-16 md:py-20 px-4 md:px-8">
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
                  label="Full Name of Deceased *"
                  placeholder="Enter full name"
                  value={obitForm.name}
                  onChangeText={(text) => {
                    setObitForm({ ...obitForm, name: text });
                    if (obitErrors.name) setObitErrors((prev) => ({ ...prev, name: "" }));
                  }}
                  error={obitErrors.name}
                />

                <View className="flex-row gap-4 flex-wrap">
                  <View className="flex-1 min-w-[200px]">
                    <Input
                      label="Date of Birth"
                      placeholder="YYYY-MM-DD"
                      value={obitForm.birthDate}
                      onChangeText={(text) => setObitForm({ ...obitForm, birthDate: text })}
                    />
                  </View>
                  <View className="flex-1 min-w-[200px]">
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

                <View className="flex-row gap-4 flex-wrap">
                  <View className="flex-1 min-w-[200px]">
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
                  <View className="flex-1 min-w-[200px]">
                    <Input
                      label="Funeral End Date"
                      placeholder="YYYY-MM-DD"
                      value={obitForm.funeralEndDate}
                      onChangeText={(text) => setObitForm({ ...obitForm, funeralEndDate: text })}
                    />
                  </View>
                </View>

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
                  label="Brief Biography (Optional)"
                  placeholder="Share a few words about the deceased..."
                  value={obitForm.biography}
                  onChangeText={(text) => setObitForm({ ...obitForm, biography: text })}
                />

                <View className="mb-6">
                  <Body className="font-body-medium text-gray-charcoal mb-2">
                    Photo
                  </Body>
                  <Pressable
                    className="border-2 border-dashed border-brown-earth/30 rounded-lg p-8 items-center min-h-[44px]"
                    accessibilityRole="button"
                    accessibilityLabel="Upload photo"
                    accessibilityHint="Tap to upload a photo of the deceased"
                  >
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
                  value={obitForm.contactEmail}
                  onChangeText={(text) => {
                    setObitForm({ ...obitForm, contactEmail: text });
                    if (obitErrors.contactEmail) setObitErrors((prev) => ({ ...prev, contactEmail: "" }));
                  }}
                  error={obitErrors.contactEmail}
                  accessibilityHint="Enter email for family contact"
                />

                {/* Submitted By Section */}
                <View className="border-t border-brown-earth/20 pt-4 mt-4">
                  <H3 className="mb-4 text-base">Your Information (Submitter)</H3>
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

                <Body className="text-sm text-gray-charcoal/60 text-center mt-4">
                  All submissions are reviewed before publishing
                </Body>
              </CardContent>
            </Card>
          </View>
        ) : isLoading ? (
          <LoadingState message="Loading obituaries..." />
        ) : error ? (
          <ErrorState message="Failed to load obituaries." onRetry={refetch} />
        ) : (
          <View className={isMobile ? "" : "flex-row gap-8"}>
            {/* Main Content */}
            <View className={isMobile ? "" : "flex-1"}>
              {/* Town Filter */}
              <TownFilterDropdown selectedTown={filterTown} onSelectTown={setFilterTown} />

              {/* Obituary Listings */}
              <View className="max-w-3xl">
                {filteredObituaries.map((obituary) => (
                  <Card key={obituary.id} className="mb-4">
                    <CardContent>
                      <View className="flex-row gap-4">
                        {/* Photo placeholder */}
                        <View
                          className="w-24 h-24 bg-gray-warm rounded-lg items-center justify-center"
                          accessibilityLabel={`Photo placeholder for ${obituary.name}`}
                        >
                          {obituary.photo_url ? (
                            <View className="w-full h-full rounded-lg bg-gray-warm" />
                          ) : (
                            <FontAwesome name="user" size={32} color="#2C3E5030" />
                          )}
                        </View>
                        <View className="flex-1">
                          <H3 className="mb-1">{obituary.name}</H3>
                          <Body className="text-sm text-gray-charcoal/70 mb-2">
                            {obituary.birth_date ? new Date(obituary.birth_date).getFullYear() : "?"} -{" "}
                            {new Date(obituary.passed_date).getFullYear()}
                          </Body>
                          <View className="flex-row items-center gap-2 mb-1">
                            <FontAwesome name="map-marker" size={14} color="#D4AF37" />
                            <Body className="text-sm">{getTownName(obituary.town_id)}</Body>
                          </View>
                          <View className="flex-row items-center gap-2 mb-1">
                            <FontAwesome name="calendar" size={14} color="#8B0000" />
                            <Body className="text-sm text-red-kente">
                              Funeral: {formatDateRange(obituary.funeral_date, obituary.funeral_end_date)}
                            </Body>
                          </View>
                          {/* Submitted By Info */}
                          {obituary.submitted_by_name && (
                            <View className="mt-2 pt-2 border-t border-brown-earth/10">
                              <Body className="text-xs text-gray-charcoal/50">
                                Submitted by: {obituary.submitted_by_name}
                              </Body>
                              {obituary.submitted_by_email && (
                                <Body className="text-xs text-gray-charcoal/50">
                                  {obituary.submitted_by_email}
                                </Body>
                              )}
                              {obituary.submitted_by_phone && (
                                <Body className="text-xs text-gray-charcoal/50">
                                  {obituary.submitted_by_phone}
                                </Body>
                              )}
                            </View>
                          )}
                        </View>
                      </View>
                    </CardContent>
                  </Card>
                ))}

                {filteredObituaries.length === 0 && (
                  <View className="py-12 items-center">
                    <FontAwesome name="inbox" size={48} color="#2C3E5030" />
                    <Body className="text-gray-charcoal/50 mt-4">
                      No obituaries at this time
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
