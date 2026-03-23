import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { useState } from "react";
import { PageLayout } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { Input, TextArea } from "@/components/ui/Input";
import { FontAwesome } from "@expo/vector-icons";
import { useWeddings, useCreateWedding } from "@/hooks/useWeddings";
import { useTowns } from "@/hooks/useTowns";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { TownFilterDropdown, HelpfulResources } from "@/components/community";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { useResponsive } from "@/hooks/useResponsive";

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
      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.heroInner}>
          <Text style={styles.heroLabel}>CELEBRATIONS</Text>
          <Text style={[styles.heroTitle, { fontSize: isMobile ? 36 : 48 }]}>
            Wedding Announcements
          </Text>
          <Text style={styles.heroSubtitle}>
            Celebrating love and union in our community
          </Text>
        </View>
      </View>

      {/* Actions & Content */}
      <View style={[styles.section, { paddingVertical: isMobile ? 60 : 100 }]}>
        <AnimateOnScroll>
          <View style={styles.sectionInner}>
            <View style={styles.actionsRow}>
              <Text style={[styles.actionsTitle, { fontSize: isMobile ? 24 : 30 }]}>
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
              <View style={{ maxWidth: 700, marginHorizontal: "auto", width: "100%" }}>
                <View style={styles.formCard}>
                  <Text style={styles.formTitle}>Announce Your Wedding</Text>

                  <View style={[styles.formRow, isMobile && styles.formRowMobile]}>
                    <View style={[styles.formField, !isMobile && { flex: 1 }]}>
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
                    <View style={[styles.formField, !isMobile && { flex: 1 }]}>
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

                  <View style={[styles.formRow, isMobile && styles.formRowMobile]}>
                    <View style={[styles.formField, !isMobile && { flex: 1 }]}>
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
                    <View style={[styles.formField, !isMobile && { flex: 1 }]}>
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
                    label="Message (Optional)"
                    placeholder="Share a message with the community..."
                    value={weddingForm.message}
                    onChangeText={(text) => setWeddingForm({ ...weddingForm, message: text })}
                  />

                  <View style={{ marginBottom: 24 }}>
                    <Text style={styles.fieldLabel}>Photos</Text>
                    <Pressable
                      style={styles.uploadBox}
                      accessibilityRole="button"
                      accessibilityLabel="Upload engagement photos"
                      accessibilityHint="Tap to upload up to 3 engagement photos"
                    >
                      <FontAwesome name="camera" size={32} color="rgba(139, 69, 19, 0.3)" />
                      <Text style={styles.uploadText}>Tap to upload engagement photos</Text>
                      <Text style={styles.uploadHint}>Max 5MB each, up to 3 photos</Text>
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
                  <View style={styles.divider}>
                    <Text style={styles.submitterTitle}>Your Information (Submitter)</Text>
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
                    <View style={styles.errorBox}>
                      <Text style={styles.errorText}>{submitError}</Text>
                    </View>
                  ) : null}

                  {formSubmitted ? (
                    <View style={styles.successBox}>
                      <FontAwesome name="check-circle" size={24} color="#1a5632" />
                      <Text style={styles.successTitle}>Thank you for your submission.</Text>
                      <Text style={styles.successText}>
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

                  <Text style={styles.disclaimerText}>
                    All submissions are reviewed before publishing
                  </Text>
                </View>
              </View>
            ) : isLoading ? (
              <LoadingState message="Loading weddings..." />
            ) : error ? (
              <ErrorState message="Failed to load weddings." onRetry={refetch} />
            ) : (
              <View style={[styles.contentRow, isMobile && styles.contentRowMobile]}>
                {/* Main Content */}
                <View style={!isMobile ? { flex: 1 } : undefined}>
                  {/* Town Filter */}
                  <TownFilterDropdown selectedTown={filterTown} onSelectTown={setFilterTown} />

                  {/* Wedding Listings */}
                  <View style={{ maxWidth: 800 }}>
                    {filteredWeddings.map((wedding) => (
                      <View key={wedding.id} style={styles.listingCard}>
                        <View style={{ alignItems: "center", paddingVertical: 16 }}>
                          {/* Couple icons */}
                          <View
                            style={styles.coupleRow}
                            accessibilityLabel={`Wedding of ${wedding.bride} and ${wedding.groom}`}
                          >
                            <View style={styles.coupleIcon}>
                              <FontAwesome name="user" size={24} color="#d4a843" />
                            </View>
                            <FontAwesome name="heart" size={24} color="#8B0000" />
                            <View style={styles.coupleIcon}>
                              <FontAwesome name="user" size={24} color="#d4a843" />
                            </View>
                          </View>

                          <Text style={styles.coupleName}>
                            {wedding.bride} & {wedding.groom}
                          </Text>

                          <View style={styles.weddingDetail}>
                            <FontAwesome name="calendar" size={14} color="#d4a843" />
                            <Text style={styles.weddingDetailText}>
                              {formatDateRange(wedding.date, wedding.end_date)}
                            </Text>
                          </View>

                          <View style={styles.weddingDetail}>
                            <FontAwesome name="map-marker" size={14} color="#1a5632" />
                            <Text style={[styles.weddingDetailText, { color: "#6b6b6b" }]}>
                              {wedding.venue}
                            </Text>
                          </View>

                          <Text style={styles.weddingTown}>{getTownName(wedding.town_id)}</Text>

                          {/* Submitted By Info */}
                          {wedding.submitted_by_name && (
                            <View style={styles.submittedByBox}>
                              <Text style={styles.submittedByText}>
                                Submitted by: {wedding.submitted_by_name}
                              </Text>
                              {wedding.submitted_by_email && (
                                <Text style={styles.submittedByText}>
                                  {wedding.submitted_by_email}
                                </Text>
                              )}
                              {wedding.submitted_by_phone && (
                                <Text style={styles.submittedByText}>
                                  {wedding.submitted_by_phone}
                                </Text>
                              )}
                            </View>
                          )}
                        </View>
                      </View>
                    ))}

                    {filteredWeddings.length === 0 && (
                      <View style={styles.emptyState}>
                        <FontAwesome name="inbox" size={48} color="rgba(45, 45, 45, 0.15)" />
                        <Text style={styles.emptyText}>
                          No wedding announcements at this time
                        </Text>
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
  coupleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  coupleIcon: {
    width: 64,
    height: 64,
    backgroundColor: "rgba(212, 168, 67, 0.1)",
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  coupleName: {
    fontFamily: "PlayfairDisplay_700Bold, serif",
    fontSize: 20,
    color: "#2d2d2d",
    textAlign: "center",
    marginBottom: 8,
  },
  weddingDetail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  weddingDetailText: {
    fontSize: 14,
    color: "#2d2d2d",
    fontFamily: "Inter_400Regular, sans-serif",
  },
  weddingTown: {
    fontSize: 14,
    color: "#d4a843",
    fontFamily: "Inter_600SemiBold, sans-serif",
    fontWeight: "600",
    marginTop: 8,
  },
  submittedByBox: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(212, 168, 67, 0.1)",
    width: "100%",
    alignItems: "center",
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
