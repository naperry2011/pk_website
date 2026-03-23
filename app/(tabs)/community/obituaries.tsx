import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { useState } from "react";
import { PageLayout } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { Input, TextArea } from "@/components/ui/Input";
import { FontAwesome } from "@expo/vector-icons";
import { useObituaries, useCreateObituary } from "@/hooks/useObituaries";
import { useTowns } from "@/hooks/useTowns";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { TownFilterDropdown, HelpfulResources } from "@/components/community";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { useResponsive } from "@/hooks/useResponsive";

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
      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.heroInner}>
          <Text style={styles.heroLabel}>IN MEMORIAM</Text>
          <Text style={[styles.heroTitle, { fontSize: isMobile ? 36 : 48 }]}>
            Obituaries
          </Text>
          <Text style={styles.heroSubtitle}>
            Honoring the memory of our departed community members
          </Text>
        </View>
      </View>

      {/* Actions & Content */}
      <View style={[styles.section, { paddingVertical: isMobile ? 60 : 100 }]}>
        <AnimateOnScroll>
          <View style={styles.sectionInner}>
            <View style={styles.actionsRow}>
              <Text style={[styles.actionsTitle, { fontSize: isMobile ? 24 : 30 }]}>
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
              <View style={{ maxWidth: 700, marginHorizontal: "auto", width: "100%" }}>
                <View style={styles.formCard}>
                  <Text style={styles.formTitle}>Submit an Obituary</Text>

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

                  <View style={[styles.formRow, isMobile && styles.formRowMobile]}>
                    <View style={[styles.formField, !isMobile && { flex: 1 }]}>
                      <Input
                        label="Date of Birth"
                        placeholder="YYYY-MM-DD"
                        value={obitForm.birthDate}
                        onChangeText={(text) => setObitForm({ ...obitForm, birthDate: text })}
                      />
                    </View>
                    <View style={[styles.formField, !isMobile && { flex: 1 }]}>
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

                  <View style={[styles.formRow, isMobile && styles.formRowMobile]}>
                    <View style={[styles.formField, !isMobile && { flex: 1 }]}>
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
                    <View style={[styles.formField, !isMobile && { flex: 1 }]}>
                      <Input
                        label="Funeral End Date"
                        placeholder="YYYY-MM-DD"
                        value={obitForm.funeralEndDate}
                        onChangeText={(text) => setObitForm({ ...obitForm, funeralEndDate: text })}
                      />
                    </View>
                  </View>

                  <View style={{ marginBottom: 16 }}>
                    <Text style={styles.fieldLabel}>Town</Text>
                    <View style={styles.townGrid}>
                      {(towns ?? []).map((town) => (
                        <Pressable
                          key={town.id}
                          onPress={() => setSelectedTown(town.id)}
                          style={[
                            styles.townChip,
                            selectedTown === town.id && styles.townChipActive,
                          ]}
                          accessibilityRole="radio"
                          accessibilityLabel={town.name}
                          accessibilityState={{ selected: selectedTown === town.id }}
                        >
                          <Text
                            style={[
                              styles.townChipText,
                              selectedTown === town.id && styles.townChipTextActive,
                            ]}
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

                  <View style={{ marginBottom: 24 }}>
                    <Text style={styles.fieldLabel}>Photo</Text>
                    <Pressable
                      style={styles.uploadBox}
                      accessibilityRole="button"
                      accessibilityLabel="Upload photo"
                      accessibilityHint="Tap to upload a photo of the deceased"
                    >
                      <FontAwesome name="camera" size={32} color="rgba(139, 69, 19, 0.3)" />
                      <Text style={styles.uploadText}>Tap to upload photo</Text>
                      <Text style={styles.uploadHint}>Max 5MB, JPG or PNG</Text>
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
                  <View style={styles.divider}>
                    <Text style={styles.submitterTitle}>Your Information (Submitter)</Text>
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
                    <View style={styles.errorBox}>
                      <Text style={styles.errorText}>{submitError}</Text>
                    </View>
                  ) : null}

                  {formSubmitted ? (
                    <View style={styles.successBox}>
                      <FontAwesome name="check-circle" size={24} color="#1a5632" />
                      <Text style={styles.successTitle}>Thank you for your submission.</Text>
                      <Text style={styles.successText}>
                        Your obituary has been received. It will be reviewed and published with care and respect.
                      </Text>
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

                  <Text style={styles.disclaimerText}>
                    All submissions are reviewed before publishing
                  </Text>
                </View>
              </View>
            ) : isLoading ? (
              <LoadingState message="Loading obituaries..." />
            ) : error ? (
              <ErrorState message="Failed to load obituaries." onRetry={refetch} />
            ) : (
              <View style={[styles.contentRow, isMobile && styles.contentRowMobile]}>
                {/* Main Content */}
                <View style={!isMobile ? { flex: 1 } : undefined}>
                  {/* Town Filter */}
                  <TownFilterDropdown selectedTown={filterTown} onSelectTown={setFilterTown} />

                  {/* Obituary Listings */}
                  <View style={{ maxWidth: 800 }}>
                    {filteredObituaries.map((obituary) => (
                      <View key={obituary.id} style={styles.listingCard}>
                        <View style={styles.listingRow}>
                          {/* Photo placeholder */}
                          <View
                            style={styles.photoPlaceholder}
                            accessibilityLabel={`Photo placeholder for ${obituary.name}`}
                          >
                            {obituary.photo_url ? (
                              <View style={{ width: "100%", height: "100%", borderRadius: 8, backgroundColor: "#f5f2eb" }} />
                            ) : (
                              <FontAwesome name="user" size={32} color="rgba(45, 45, 45, 0.15)" />
                            )}
                          </View>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.listingName}>{obituary.name}</Text>
                            <Text style={styles.listingDates}>
                              {obituary.birth_date ? new Date(obituary.birth_date).getFullYear() : "?"} -{" "}
                              {new Date(obituary.passed_date).getFullYear()}
                            </Text>
                            <View style={styles.listingDetail}>
                              <FontAwesome name="map-marker" size={14} color="#d4a843" />
                              <Text style={styles.listingDetailText}>{getTownName(obituary.town_id)}</Text>
                            </View>
                            <View style={styles.listingDetail}>
                              <FontAwesome name="calendar" size={14} color="#8B0000" />
                              <Text style={[styles.listingDetailText, { color: "#8B0000" }]}>
                                Funeral: {formatDateRange(obituary.funeral_date, obituary.funeral_end_date)}
                              </Text>
                            </View>
                            {/* Submitted By Info */}
                            {obituary.submitted_by_name && (
                              <View style={styles.submittedByBox}>
                                <Text style={styles.submittedByText}>
                                  Submitted by: {obituary.submitted_by_name}
                                </Text>
                                {obituary.submitted_by_email && (
                                  <Text style={styles.submittedByText}>
                                    {obituary.submitted_by_email}
                                  </Text>
                                )}
                                {obituary.submitted_by_phone && (
                                  <Text style={styles.submittedByText}>
                                    {obituary.submitted_by_phone}
                                  </Text>
                                )}
                              </View>
                            )}
                          </View>
                        </View>
                      </View>
                    ))}

                    {filteredObituaries.length === 0 && (
                      <View style={styles.emptyState}>
                        <FontAwesome name="inbox" size={48} color="rgba(45, 45, 45, 0.15)" />
                        <Text style={styles.emptyText}>No obituaries at this time</Text>
                      </View>
                    )}
                  </View>
                </View>

                {/* Sidebar - Helpful Resources */}
                <View style={isMobile ? { marginTop: 32 } : { width: 300 }}>
                  <HelpfulResources />
                </View>
              </View>
            )}
          </View>
        </AnimateOnScroll>
      </View>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: "#1a5632",
    paddingVertical: 80,
    paddingHorizontal: "8%",
  },
  heroInner: {
    maxWidth: 700,
    marginHorizontal: "auto",
    alignItems: "center",
  },
  heroLabel: {
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 3,
    color: "#d4a843",
    fontWeight: "700",
    fontFamily: "Inter_600SemiBold, sans-serif",
    marginBottom: 16,
  },
  heroTitle: {
    color: "#ffffff",
    fontFamily: "PlayfairDisplay_700Bold, serif",
    textAlign: "center",
    marginBottom: 16,
  },
  heroSubtitle: {
    color: "rgba(255, 255, 255, 0.85)",
    fontSize: 18,
    fontFamily: "Inter_400Regular, sans-serif",
    textAlign: "center",
    lineHeight: 28,
  },
  section: {
    paddingHorizontal: "8%",
    backgroundColor: "#ffffff",
  },
  sectionInner: {
    maxWidth: 1200,
    marginHorizontal: "auto",
    width: "100%",
  },
  actionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  actionsTitle: {
    fontFamily: "PlayfairDisplay_700Bold, serif",
    color: "#2d2d2d",
  },
  formCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(212, 168, 67, 0.15)",
    padding: 32,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
  },
  formTitle: {
    fontFamily: "PlayfairDisplay_700Bold, serif",
    fontSize: 22,
    color: "#2d2d2d",
    marginBottom: 24,
  },
  formRow: {
    flexDirection: "row",
    gap: 16,
  },
  formRowMobile: {
    flexDirection: "column",
    gap: 0,
  },
  formField: {
    minWidth: 200,
  },
  fieldLabel: {
    fontFamily: "Inter_600SemiBold, sans-serif",
    fontWeight: "600",
    color: "#2d2d2d",
    fontSize: 15,
    marginBottom: 8,
  },
  townGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  townChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(139, 69, 19, 0.25)",
    backgroundColor: "#ffffff",
    minHeight: 44,
    justifyContent: "center",
  },
  townChipActive: {
    backgroundColor: "#d4a843",
    borderColor: "#d4a843",
  },
  townChipText: {
    fontSize: 14,
    color: "#2d2d2d",
    fontFamily: "Inter_400Regular, sans-serif",
  },
  townChipTextActive: {
    color: "#ffffff",
  },
  uploadBox: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "rgba(139, 69, 19, 0.2)",
    borderRadius: 12,
    padding: 32,
    alignItems: "center",
    minHeight: 44,
  },
  uploadText: {
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
    marginTop: 8,
  },
  uploadHint: {
    fontSize: 13,
    color: "rgba(107, 107, 107, 0.7)",
    fontFamily: "Inter_400Regular, sans-serif",
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: "rgba(139, 69, 19, 0.15)",
    paddingTop: 16,
    marginTop: 16,
  },
  submitterTitle: {
    fontFamily: "PlayfairDisplay_700Bold, serif",
    fontSize: 16,
    color: "#2d2d2d",
    marginBottom: 16,
  },
  errorBox: {
    backgroundColor: "rgba(139, 0, 0, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(139, 0, 0, 0.25)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: "#8B0000",
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Inter_400Regular, sans-serif",
  },
  successBox: {
    backgroundColor: "rgba(26, 86, 50, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(26, 86, 50, 0.25)",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  successTitle: {
    color: "#1a5632",
    fontFamily: "Inter_600SemiBold, sans-serif",
    fontWeight: "600",
    fontSize: 16,
    marginTop: 8,
  },
  successText: {
    color: "rgba(26, 86, 50, 0.8)",
    fontSize: 14,
    fontFamily: "Inter_400Regular, sans-serif",
    textAlign: "center",
    marginTop: 4,
    lineHeight: 22,
  },
  disclaimerText: {
    fontSize: 13,
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
    textAlign: "center",
    marginTop: 16,
  },
  contentRow: {
    flexDirection: "row",
    gap: 32,
  },
  contentRowMobile: {
    flexDirection: "column",
  },
  listingCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(212, 168, 67, 0.12)",
    padding: 20,
    marginBottom: 16,
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.04)",
  },
  listingRow: {
    flexDirection: "row",
    gap: 16,
  },
  photoPlaceholder: {
    width: 96,
    height: 96,
    backgroundColor: "#f5f2eb",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  listingName: {
    fontFamily: "PlayfairDisplay_700Bold, serif",
    fontSize: 18,
    color: "#2d2d2d",
    marginBottom: 4,
  },
  listingDates: {
    fontSize: 14,
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
    marginBottom: 8,
  },
  listingDetail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  listingDetailText: {
    fontSize: 14,
    color: "#2d2d2d",
    fontFamily: "Inter_400Regular, sans-serif",
  },
  submittedByBox: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(212, 168, 67, 0.1)",
  },
  submittedByText: {
    fontSize: 12,
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
  },
  emptyState: {
    paddingVertical: 48,
    alignItems: "center",
  },
  emptyText: {
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
    marginTop: 16,
  },
});
