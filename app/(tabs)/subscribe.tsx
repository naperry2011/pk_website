import { View, Text, Pressable, Switch, StyleSheet } from "react-native";
import { useState } from "react";
import Head from "expo-router/head";
import { PageLayout } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FontAwesome } from "@expo/vector-icons";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { useResponsive } from "@/hooks/useResponsive";

const ALL_TOWNS = [
  "Akropong", "Abiriw", "Amanokrom", "Awukugua", "Berekuso",
  "Tutu", "Mamfe", "Larteh", "Adukrom", "Mampong",
  "Obosomase", "Apirede", "Aseseeso", "Dawu", "Koforidua",
  "Nsawam", "Suhum",
];

const subscriptionOptions = [
  {
    id: "obituaries",
    icon: "heart",
    title: "Obituaries",
    description: "Funeral announcements from all towns",
    color: "#8B0000",
  },
  {
    id: "weddings",
    icon: "bell",
    title: "Weddings",
    description: "Wedding announcements and celebrations",
    color: "#d4a843",
  },
  {
    id: "council",
    icon: "gavel",
    title: "Council Business",
    description: "Official announcements and resolutions",
    color: "#1a5632",
  },
  {
    id: "events",
    icon: "calendar",
    title: "Events & Festivals",
    description: "Cultural events and festival dates",
    color: "#1E4D8B",
  },
];

export default function SubscribeScreen() {
  const { isMobile } = useResponsive();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [birthday, setBirthday] = useState("");
  const [selectedTowns, setSelectedTowns] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<Record<string, boolean>>({
    obituaries: true,
    weddings: true,
    council: true,
    events: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [subSuccess, setSubSuccess] = useState(false);

  const togglePreference = (id: string) => {
    setPreferences((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleTown = (town: string) => {
    setSelectedTowns((prev) =>
      prev.includes(town) ? prev.filter((t) => t !== town) : [...prev, town]
    );
  };

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const validateBirthday = (value: string) =>
    /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/.test(value);

  const handleSubscribe = () => {
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) newErrors.email = "Email address is required";
    else if (!validateEmail(email)) newErrors.email = "Please enter a valid email address";
    if (birthday.trim() && !validateBirthday(birthday)) {
      newErrors.birthday = "Please use MM/DD format";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubSuccess(true);
  };

  const hasAnyContentPref = preferences.obituaries || preferences.weddings || preferences.events;

  return (
    <PageLayout>
      <Head>
        <title>Subscribe - Akuapem Paramount King Council</title>
        <meta name="description" content="Subscribe to receive updates from the Akuapem Paramount King Council. Choose to get notifications for obituaries, weddings, council business, and cultural events." />
        <meta property="og:title" content="Subscribe - Akuapem Paramount King Council" />
        <meta property="og:description" content="Subscribe to receive community updates from the Akuapem Traditional Area." />
      </Head>

      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.heroInner}>
          <Text style={styles.heroLabel}>SUBSCRIBE</Text>
          <Text style={[styles.heroTitle, { fontSize: isMobile ? 36 : 48 }]}>
            Stay Connected
          </Text>
          <Text style={styles.heroSubtitle}>
            Subscribe to receive updates that matter to you from across the
            Akuapem Traditional Area
          </Text>
        </View>
      </View>

      {/* Benefits */}
      <View style={[styles.section, { paddingVertical: isMobile ? 60 : 100, backgroundColor: "#f5f2eb" }]}>
        <AnimateOnScroll>
          <View style={styles.sectionInner}>
            <View style={styles.centeredHeading}>
              <Text style={styles.sectionLabel}>WHY SUBSCRIBE</Text>
              <Text style={[styles.sectionTitle, { textAlign: "center", fontSize: isMobile ? 28 : 36 }]}>
                Benefits of Subscribing
              </Text>
            </View>

            <View style={[styles.benefitsRow, isMobile && styles.benefitsRowMobile]}>
              {[
                {
                  icon: "envelope",
                  title: "Direct Updates",
                  text: "Get announcements delivered to your inbox",
                },
                {
                  icon: "filter",
                  title: "Personalized",
                  text: "Only receive what matters to you",
                },
                {
                  icon: "clock-o",
                  title: "Timely",
                  text: "Never miss important community news",
                },
              ].map((benefit, index) => (
                <AnimateOnScroll key={index} delay={index * 100}>
                  <View style={styles.benefitItem}>
                    <View style={styles.benefitIcon}>
                      <FontAwesome
                        name={benefit.icon as any}
                        size={24}
                        color="#d4a843"
                      />
                    </View>
                    <Text style={styles.benefitTitle}>{benefit.title}</Text>
                    <Text style={styles.benefitText}>{benefit.text}</Text>
                  </View>
                </AnimateOnScroll>
              ))}
            </View>
          </View>
        </AnimateOnScroll>
      </View>

      {/* Subscription Form */}
      <View style={[styles.section, { paddingVertical: isMobile ? 60 : 100 }]}>
        <AnimateOnScroll>
          <View style={styles.sectionInner}>
            <View style={{ maxWidth: 700, marginHorizontal: "auto", width: "100%" }}>
              <View style={styles.formCard}>
                {/* Personal Information */}
                <View style={styles.centeredHeading}>
                  <Text style={styles.sectionLabel}>YOUR DETAILS</Text>
                  <Text style={[styles.sectionTitle, { textAlign: "center", fontSize: isMobile ? 24 : 30 }]}>
                    Your Information
                  </Text>
                </View>

                <View style={[styles.formRow, isMobile && styles.formRowMobile]}>
                  <View style={[styles.formField, !isMobile && { flex: 1 }]}>
                    <Input
                      label="First Name *"
                      placeholder="First name"
                      value={firstName}
                      onChangeText={(text) => {
                        setFirstName(text);
                        if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: "" }));
                      }}
                      error={errors.firstName}
                    />
                  </View>
                  <View style={[styles.formField, !isMobile && { flex: 1 }]}>
                    <Input
                      label="Last Name *"
                      placeholder="Last name"
                      value={lastName}
                      onChangeText={(text) => {
                        setLastName(text);
                        if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: "" }));
                      }}
                      error={errors.lastName}
                    />
                  </View>
                </View>

                <Input
                  label="Email Address *"
                  placeholder="your.email@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  error={errors.email}
                />

                <Input
                  label="Phone Number"
                  placeholder="+233 XX XXX XXXX"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />

                <Input
                  label="Current Location"
                  placeholder="City, Country"
                  value={currentLocation}
                  onChangeText={setCurrentLocation}
                />

                <Input
                  label="Birthday (MM/DD)"
                  placeholder="MM/DD"
                  value={birthday}
                  onChangeText={(text) => {
                    setBirthday(text);
                    if (errors.birthday) setErrors((prev) => ({ ...prev, birthday: "" }));
                  }}
                  error={errors.birthday}
                  accessibilityHint="Enter your birthday in MM/DD format, no year"
                />

                {/* Preferences */}
                <View style={[styles.centeredHeading, { marginTop: 32 }]}>
                  <Text style={styles.sectionLabel}>PREFERENCES</Text>
                  <Text style={[styles.sectionTitle, { textAlign: "center", fontSize: isMobile ? 24 : 30 }]}>
                    Choose Your Preferences
                  </Text>
                </View>

                <Text style={styles.prefLabel}>What would you like to receive?</Text>

                <View style={{ gap: 12, marginBottom: 24 }}>
                  {subscriptionOptions.map((option) => (
                    <Pressable
                      key={option.id}
                      onPress={() => togglePreference(option.id)}
                      style={[
                        styles.preferenceCard,
                        preferences[option.id] && styles.preferenceCardActive,
                        isMobile && styles.preferenceCardMobile,
                      ]}
                      accessibilityRole="switch"
                      accessibilityLabel={`${option.title}: ${option.description}`}
                      accessibilityState={{ checked: preferences[option.id] }}
                    >
                      <View style={[
                        styles.prefTopRow,
                        isMobile && styles.prefTopRowMobile,
                      ]}>
                        <View
                          style={[
                            styles.prefIconWrap,
                            isMobile && styles.prefIconWrapMobile,
                            { backgroundColor: option.color + "15" },
                          ]}
                        >
                          <FontAwesome
                            name={option.icon as any}
                            size={isMobile ? 18 : 20}
                            color={option.color}
                          />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={[styles.prefTitle, isMobile && { fontSize: 14 }]}>{option.title}</Text>
                          <Text style={[styles.prefDesc, isMobile && { fontSize: 12 }]}>{option.description}</Text>
                        </View>
                        <Switch
                          value={preferences[option.id]}
                          onValueChange={() => togglePreference(option.id)}
                          trackColor={{ false: "#E0E0E0", true: "#d4a84380" }}
                          thumbColor={preferences[option.id] ? "#d4a843" : "#f4f3f4"}
                          accessibilityLabel={`Toggle ${option.title}`}
                        />
                      </View>
                    </Pressable>
                  ))}
                </View>

                {/* Town-based Filtering */}
                {hasAnyContentPref && (
                  <View style={{ marginBottom: 24 }}>
                    <Text style={styles.prefLabel}>Filter updates by town (optional)</Text>
                    <Text style={styles.prefHint}>
                      Select specific towns to receive updates from, or leave empty for all towns
                    </Text>
                    <View style={styles.townGrid}>
                      {ALL_TOWNS.map((town) => (
                        <Pressable
                          key={town}
                          onPress={() => toggleTown(town)}
                          style={[
                            styles.townChip,
                            selectedTowns.includes(town) && styles.townChipActive,
                          ]}
                          accessibilityRole="checkbox"
                          accessibilityLabel={town}
                          accessibilityState={{ checked: selectedTowns.includes(town) }}
                        >
                          <Text
                            style={[
                              styles.townChipText,
                              selectedTowns.includes(town) && styles.townChipTextActive,
                            ]}
                          >
                            {town}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                    {selectedTowns.length > 0 && (
                      <Pressable onPress={() => setSelectedTowns([])} style={{ marginTop: 8 }}>
                        <Text style={styles.clearText}>
                          Clear selection ({selectedTowns.length} selected)
                        </Text>
                      </Pressable>
                    )}
                  </View>
                )}

                {subSuccess ? (
                  <View style={styles.successBox}>
                    <FontAwesome name="check-circle" size={24} color="#1a5632" />
                    <Text style={styles.successTitle}>You have been subscribed.</Text>
                    <Text style={styles.successText}>
                      Thank you for subscribing. You will receive updates based on your selected preferences.
                    </Text>
                  </View>
                ) : (
                  <Button
                    title="Subscribe"
                    onPress={handleSubscribe}
                    fullWidth
                    accessibilityHint="Subscribes you to selected update categories"
                  />
                )}

                <Text style={styles.disclaimerText}>
                  You can update your preferences or unsubscribe at any time
                </Text>
              </View>
            </View>
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
  sectionLabel: {
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 3,
    color: "#d4a843",
    fontWeight: "700",
    fontFamily: "Inter_600SemiBold, sans-serif",
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: "PlayfairDisplay_700Bold, serif",
    color: "#2d2d2d",
    marginBottom: 20,
    lineHeight: 1.3,
  },
  centeredHeading: {
    alignItems: "center",
    marginBottom: 40,
  },
  benefitsRow: {
    flexDirection: "row",
    gap: 24,
    justifyContent: "center",
  },
  benefitsRowMobile: {
    flexDirection: "column",
    alignItems: "center",
  },
  benefitItem: {
    alignItems: "center",
    width: 240,
  },
  benefitIcon: {
    width: 64,
    height: 64,
    backgroundColor: "rgba(212, 168, 67, 0.1)",
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  benefitTitle: {
    fontFamily: "Inter_600SemiBold, sans-serif",
    fontWeight: "600",
    fontSize: 16,
    color: "#2d2d2d",
    textAlign: "center",
    marginBottom: 4,
  },
  benefitText: {
    fontSize: 14,
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
    textAlign: "center",
    lineHeight: 22,
  },
  formCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(212, 168, 67, 0.15)",
    padding: 32,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
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
  prefLabel: {
    fontFamily: "Inter_600SemiBold, sans-serif",
    fontWeight: "600",
    color: "#2d2d2d",
    fontSize: 15,
    marginBottom: 12,
  },
  prefHint: {
    fontSize: 14,
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
    marginBottom: 12,
  },
  preferenceCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(139, 69, 19, 0.15)",
    backgroundColor: "#ffffff",
    minHeight: 44,
  },
  preferenceCardActive: {
    borderColor: "#d4a843",
    backgroundColor: "rgba(212, 168, 67, 0.04)",
  },
  preferenceCardMobile: {
    padding: 12,
  },
  prefTopRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  prefTopRowMobile: {
    gap: 8,
  },
  prefIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  prefIconWrapMobile: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  prefTitle: {
    fontFamily: "Inter_600SemiBold, sans-serif",
    fontWeight: "600",
    fontSize: 15,
    color: "#2d2d2d",
  },
  prefDesc: {
    fontSize: 13,
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
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
    minHeight: 36,
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
  clearText: {
    fontSize: 14,
    color: "#d4a843",
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
});
