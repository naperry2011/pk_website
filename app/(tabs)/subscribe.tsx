import { View, Text, Pressable, Switch } from "react-native";
import { useState } from "react";
import Head from "expo-router/head";
import { PageLayout, Section } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FontAwesome } from "@expo/vector-icons";
import { Body, BodyLarge, Card, Display, Eyebrow, H2 } from "@/components/ui";
import { useResponsive } from "@/hooks/useResponsive";
import { theme } from "@/constants/theme";

const ALL_TOWNS = [
  "Akropong", "Abiriw", "Amanokrom", "Awukugua", "Berekuso",
  "Tutu", "Mamfe", "Larteh", "Adukrom", "Mampong",
  "Obosomase", "Apirede", "Aseseeso", "Dawu", "Koforidua",
  "Nsawam", "Suhum",
];

const subscriptionOptions = [
  {
    id: "obituaries",
    icon: "heart" as const,
    title: "Obituaries",
    description: "Funeral announcements from all towns",
  },
  {
    id: "weddings",
    icon: "bell" as const,
    title: "Weddings",
    description: "Wedding announcements and celebrations",
  },
  {
    id: "council",
    icon: "gavel" as const,
    title: "Council Business",
    description: "Official announcements and resolutions",
  },
  {
    id: "events",
    icon: "calendar" as const,
    title: "Events & Festivals",
    description: "Cultural events and festival dates",
  },
];

const benefits = [
  {
    title: "Direct Updates",
    text: "Announcements delivered straight to your inbox — no need to check back.",
  },
  {
    title: "Personalized",
    text: "Choose only the categories and towns that matter to you.",
  },
  {
    title: "Timely",
    text: "Never miss important community news, festivals, or council resolutions.",
  },
  {
    title: "Free & Flexible",
    text: "Update your preferences or unsubscribe at any time.",
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

      {/* Page header band */}
      <Section background="green-dark" className="py-20 md:py-28">
        <View className="max-w-3xl mx-auto items-center">
          <Eyebrow className="mb-4 text-center">Subscribe</Eyebrow>
          <Display className="text-white text-center mb-5">
            Stay Connected
          </Display>
          <View className="w-16 h-[2px] bg-gold mb-6" />
          <BodyLarge className="text-white/80 text-center">
            Subscribe to receive updates that matter to you from across the
            Akuapem Traditional Area
          </BodyLarge>
        </View>
      </Section>

      {/* Two-column: benefits + form */}
      <Section background="cream">
        <View className={isMobile ? "gap-12" : "flex-row gap-16 items-start"}>
          {/* Left: benefits */}
          <View className={isMobile ? undefined : "flex-1 max-w-md"}>
            <Eyebrow className="mb-3">Why Subscribe</Eyebrow>
            <H2 className="mb-4">A direct line to the Traditional Area</H2>
            <View className="w-16 h-[2px] bg-gold mb-8" />
            <Body className="text-gray-muted mb-8">
              One subscription keeps you informed about life across all
              seventeen towns — from council resolutions to community
              celebrations and remembrances.
            </Body>

            <View className="gap-6">
              {benefits.map((benefit) => (
                <View key={benefit.title} className="flex-row items-start gap-4">
                  <View className="w-6 h-6 rounded-full bg-gold/15 items-center justify-center mt-0.5">
                    <FontAwesome name="check" size={11} color={theme.colors.goldAccent} />
                  </View>
                  <View className="flex-1">
                    <Text className="font-body-semibold text-base text-gray-charcoal mb-1">
                      {benefit.title}
                    </Text>
                    <Body className="text-gray-muted text-sm">{benefit.text}</Body>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Right: form card */}
          <View className={isMobile ? undefined : "flex-1"}>
            <Card goldBorder className="p-8">
              <Eyebrow className="mb-2">Your Details</Eyebrow>
              <Text className="font-heading-bold text-h3 md:text-h3-desktop text-gray-charcoal mb-6">
                Your Information
              </Text>

              <View className={isMobile ? undefined : "flex-row gap-4"}>
                <View className={isMobile ? undefined : "flex-1"}>
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
                <View className={isMobile ? undefined : "flex-1"}>
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
              <View className="border-t border-gray-charcoal/10 pt-6 mt-4 mb-2">
                <Eyebrow className="mb-2">Preferences</Eyebrow>
                <Text className="font-heading-bold text-h4 text-gray-charcoal mb-4">
                  What would you like to receive?
                </Text>
              </View>

              <View className="gap-3 mb-6">
                {subscriptionOptions.map((option) => (
                  <Pressable
                    key={option.id}
                    onPress={() => togglePreference(option.id)}
                    className={`flex-row items-center p-4 min-h-[44px] rounded-xl border ${
                      preferences[option.id]
                        ? "border-gold bg-gold/5"
                        : "border-gray-charcoal/15 bg-white"
                    }`}
                    accessibilityRole="switch"
                    accessibilityLabel={`${option.title}: ${option.description}`}
                    accessibilityState={{ checked: preferences[option.id] }}
                  >
                    <View className={`${isMobile ? "w-9 h-9" : "w-11 h-11"} rounded-full bg-green-deep/10 items-center justify-center mr-3`}>
                      <FontAwesome
                        name={option.icon}
                        size={isMobile ? 15 : 17}
                        color={theme.colors.primaryGreen}
                      />
                    </View>
                    <View className="flex-1">
                      <Text className={`font-body-semibold ${isMobile ? "text-sm" : "text-[15px]"} text-gray-charcoal`}>
                        {option.title}
                      </Text>
                      <Text className={`font-body ${isMobile ? "text-xs" : "text-[13px]"} text-gray-muted`}>
                        {option.description}
                      </Text>
                    </View>
                    <Switch
                      value={preferences[option.id]}
                      onValueChange={() => togglePreference(option.id)}
                      trackColor={{ false: "#E0E0E0", true: theme.colors.goldAccent + "80" }}
                      thumbColor={preferences[option.id] ? theme.colors.goldAccent : "#f4f3f4"}
                      accessibilityLabel={`Toggle ${option.title}`}
                    />
                  </Pressable>
                ))}
              </View>

              {/* Town-based Filtering */}
              {hasAnyContentPref && (
                <View className="mb-6">
                  <Text className="font-body-semibold text-[15px] text-gray-charcoal mb-2">
                    Filter updates by town (optional)
                  </Text>
                  <Body className="text-gray-muted text-sm mb-3">
                    Select specific towns to receive updates from, or leave empty
                    for all towns
                  </Body>
                  <View className="flex-row flex-wrap gap-2">
                    {ALL_TOWNS.map((town) => (
                      <Pressable
                        key={town}
                        onPress={() => toggleTown(town)}
                        className={`px-3 py-2 min-h-[36px] justify-center rounded-lg border ${
                          selectedTowns.includes(town)
                            ? "bg-green-deep border-green-deep"
                            : "bg-white border-gray-charcoal/20"
                        }`}
                        accessibilityRole="checkbox"
                        accessibilityLabel={town}
                        accessibilityState={{ checked: selectedTowns.includes(town) }}
                      >
                        <Text
                          className={`font-body text-sm ${
                            selectedTowns.includes(town) ? "text-gold-light" : "text-gray-charcoal"
                          }`}
                        >
                          {town}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                  {selectedTowns.length > 0 && (
                    <Pressable onPress={() => setSelectedTowns([])} className="mt-2">
                      <Text className="font-body text-sm text-gold">
                        Clear selection ({selectedTowns.length} selected)
                      </Text>
                    </Pressable>
                  )}
                </View>
              )}

              {subSuccess ? (
                <View className="bg-green-deep/10 border border-green-deep/25 rounded-xl p-5 items-center">
                  <FontAwesome name="check-circle" size={24} color={theme.colors.primaryGreen} />
                  <Text className="font-body-semibold text-base text-green-deep mt-2">
                    You have been subscribed.
                  </Text>
                  <Body className="text-green-deep/80 text-sm text-center mt-1">
                    Thank you for subscribing. You will receive updates based on
                    your selected preferences.
                  </Body>
                </View>
              ) : (
                <Button
                  title="Subscribe"
                  onPress={handleSubscribe}
                  fullWidth
                  accessibilityHint="Subscribes you to selected update categories"
                />
              )}

              <Text className="font-body text-[13px] text-gray-muted text-center mt-4">
                You can update your preferences or unsubscribe at any time
              </Text>
            </Card>
          </View>
        </View>
      </Section>
    </PageLayout>
  );
}
